package com.ledgersimple.billing;

import android.Manifest;
import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.os.Build;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@CapacitorPlugin(
    name = "NativeThermalPrinter",
    permissions = {
        @Permission(
            alias = "bluetooth",
            strings = { Manifest.permission.BLUETOOTH_CONNECT }
        )
    }
)
public class NativeThermalPrinterPlugin extends Plugin {
    private static final UUID SPP_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private static final int DEFAULT_CHUNK_SIZE = 128;
    private static final int DEFAULT_CHUNK_DELAY_MS = 25;
    private static final int DEFAULT_CLOSE_DELAY_MS = 350;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @PluginMethod
    public void listBluetoothPrinters(PluginCall call) {
        if (!ensureBluetoothPermission(call)) return;
        listBluetoothPrintersAfterPermission(call);
    }

    @PluginMethod
    public void print(PluginCall call) {
        String connection = call.getString("connection", "bluetooth");
        if ("bluetooth".equalsIgnoreCase(connection) && !ensureBluetoothPermission(call)) return;

        executor.execute(() -> {
            try {
                if ("tcp".equalsIgnoreCase(connection)) {
                    printTcp(call);
                } else {
                    printBluetooth(call);
                }
            } catch (Exception ex) {
                call.reject(ex.getMessage() != null ? ex.getMessage() : "Print failed", ex);
            }
        });
    }

    @PermissionCallback
    private void bluetoothPermissionCallback(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S
            && getPermissionState("bluetooth") != PermissionState.GRANTED) {
            call.reject("Bluetooth permission was denied.");
            return;
        }

        if ("listBluetoothPrinters".equals(call.getMethodName())) {
            listBluetoothPrintersAfterPermission(call);
        } else if ("print".equals(call.getMethodName())) {
            print(call);
        } else {
            call.resolve();
        }
    }

    private boolean ensureBluetoothPermission(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return true;

        if (getPermissionState("bluetooth") == PermissionState.GRANTED) return true;

        requestPermissionForAlias("bluetooth", call, "bluetoothPermissionCallback");
        return false;
    }

    @SuppressLint("MissingPermission")
    private void listBluetoothPrintersAfterPermission(PluginCall call) {
        BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
        if (adapter == null) {
            call.reject("Bluetooth is not available on this device.");
            return;
        }
        if (!adapter.isEnabled()) {
            call.reject("Bluetooth is turned off.");
            return;
        }

        JSArray printers = new JSArray();
        Set<BluetoothDevice> devices = adapter.getBondedDevices();
        for (BluetoothDevice device : devices) {
            JSObject printer = new JSObject();
            printer.put("name", device.getName());
            printer.put("address", device.getAddress());
            printers.put(printer);
        }

        JSObject result = new JSObject();
        result.put("printers", printers);
        call.resolve(result);
    }

    @SuppressLint("MissingPermission")
    private void printBluetooth(PluginCall call) throws IOException {
        String address = call.getString("address", "");
        if (address.trim().isEmpty()) {
            throw new IOException("Bluetooth printer address is required.");
        }

        BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
        if (adapter == null) {
            throw new IOException("Bluetooth is not available on this device.");
        }
        if (!adapter.isEnabled()) {
            throw new IOException("Bluetooth is turned off.");
        }

        BluetoothDevice device;
        try {
            device = adapter.getRemoteDevice(address);
        } catch (IllegalArgumentException ex) {
            throw new IOException("Bluetooth printer address is invalid.", ex);
        }

        byte[] job = buildEscPosJob(call);
        BluetoothSocket socket = null;
        try {
            socket = connectBluetoothSocket(device);
            OutputStream outputStream = socket.getOutputStream();
            writeJob(call, outputStream, job);
            call.resolve(successResult());
        } finally {
            closeQuietly(socket);
        }
    }

    @SuppressLint("MissingPermission")
    private BluetoothSocket connectBluetoothSocket(BluetoothDevice device) throws IOException {
        BluetoothSocket socket = null;
        IOException primaryError = null;

        try {
            socket = device.createRfcommSocketToServiceRecord(SPP_UUID);
            socket.connect();
            return socket;
        } catch (IOException ex) {
            primaryError = ex;
            closeQuietly(socket);
        }

        try {
            socket = device.createInsecureRfcommSocketToServiceRecord(SPP_UUID);
            socket.connect();
            return socket;
        } catch (IOException ex) {
            closeQuietly(socket);
            IOException combined = new IOException("Could not connect to Bluetooth printer.");
            combined.initCause(primaryError != null ? primaryError : ex);
            throw combined;
        }
    }

    private void printTcp(PluginCall call) throws IOException {
        String host = call.getString("host", "");
        int port = call.getInt("port", 9100);
        if (host.trim().isEmpty()) {
            throw new IOException("Printer IP address is required.");
        }

        byte[] job = buildEscPosJob(call);
        Socket socket = new Socket();
        try {
            socket.connect(new InetSocketAddress(host, port), 7000);
            OutputStream outputStream = socket.getOutputStream();
            writeJob(call, outputStream, job);
            call.resolve(successResult());
        } finally {
            closeQuietly(socket);
        }
    }

    private void writeJob(PluginCall call, OutputStream outputStream, byte[] job) throws IOException {
        int chunkSize = Math.max(32, Math.min(call.getInt("chunkSize", DEFAULT_CHUNK_SIZE), 512));
        int chunkDelayMs = Math.max(0, Math.min(call.getInt("chunkDelayMs", DEFAULT_CHUNK_DELAY_MS), 250));
        int closeDelayMs = Math.max(0, Math.min(call.getInt("closeDelayMs", DEFAULT_CLOSE_DELAY_MS), 2000));

        for (int offset = 0; offset < job.length; offset += chunkSize) {
            int length = Math.min(chunkSize, job.length - offset);
            outputStream.write(job, offset, length);
            outputStream.flush();
            sleepQuietly(chunkDelayMs);
        }

        sleepQuietly(closeDelayMs);
    }

    private byte[] buildEscPosJob(PluginCall call) throws IOException {
        String text = call.getString("text", "");
        int feedLines = Math.max(0, Math.min(call.getInt("feedLines", 4), 12));
        boolean cut = Boolean.TRUE.equals(call.getBoolean("cut", false));
        boolean raster = Boolean.TRUE.equals(call.getBoolean("raster", false));
        Charset charset = getCharset(call.getString("encoding", "UTF-8"));

        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        bytes.write(new byte[] { 0x1B, 0x40 });
        if (raster) {
            bytes.write(buildRasterTextJob(call, text));
        } else {
            bytes.write(text.getBytes(charset));
        }
        if (!raster && !text.endsWith("\n")) {
            bytes.write('\n');
        }
        for (int index = 0; index < feedLines; index++) {
            bytes.write('\n');
        }
        if (cut) {
            bytes.write(new byte[] { 0x1D, 0x56, 0x42, 0x00 });
        }

        return bytes.toByteArray();
    }

    private byte[] buildRasterTextJob(PluginCall call, String text) throws IOException {
        int paperWidthMm = Math.max(58, call.getInt("paperWidth", 80));
        int widthDots = paperWidthMm >= 80 ? 576 : 384;
        int horizontalPadding = paperWidthMm >= 80 ? 18 : 12;
        int verticalPadding = 10;
        int textWidth = widthDots - (horizontalPadding * 2);
        int defaultFontSize = paperWidthMm >= 80 ? 24 : 21;
        int fontSize = Math.max(18, Math.min(call.getInt("rasterFontSize", defaultFontSize), 34));
        String printableText = text == null ? "" : text.replace("\r\n", "\n");

        TextPaint paint = new TextPaint(Paint.ANTI_ALIAS_FLAG | Paint.DITHER_FLAG | Paint.SUBPIXEL_TEXT_FLAG);
        paint.setColor(Color.BLACK);
        paint.setTextSize(fontSize);
        paint.setTypeface(Typeface.create(Typeface.MONOSPACE, Typeface.BOLD));

        StaticLayout layout = StaticLayout.Builder
            .obtain(printableText, 0, printableText.length(), paint, textWidth)
            .setAlignment(Layout.Alignment.ALIGN_NORMAL)
            .setLineSpacing(0f, 1.05f)
            .setIncludePad(false)
            .build();

        int height = Math.max(1, layout.getHeight() + (verticalPadding * 2));
        Bitmap bitmap = Bitmap.createBitmap(widthDots, height, Bitmap.Config.ARGB_8888);
        try {
            Canvas canvas = new Canvas(bitmap);
            canvas.drawColor(Color.WHITE);
            canvas.translate(horizontalPadding, verticalPadding);
            layout.draw(canvas);
            return bitmapToEscPosRaster(bitmap);
        } finally {
            bitmap.recycle();
        }
    }

    private byte[] bitmapToEscPosRaster(Bitmap bitmap) throws IOException {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        int widthBytes = (width + 7) / 8;

        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        bytes.write(new byte[] {
            0x1D, 0x76, 0x30, 0x00,
            (byte) (widthBytes & 0xFF),
            (byte) ((widthBytes >> 8) & 0xFF),
            (byte) (height & 0xFF),
            (byte) ((height >> 8) & 0xFF)
        });

        for (int y = 0; y < height; y++) {
            for (int byteX = 0; byteX < widthBytes; byteX++) {
                int value = 0;
                for (int bit = 0; bit < 8; bit++) {
                    int x = (byteX * 8) + bit;
                    if (x >= width) continue;

                    int pixel = bitmap.getPixel(x, y);
                    int luminance = (
                        Color.red(pixel) * 299
                        + Color.green(pixel) * 587
                        + Color.blue(pixel) * 114
                    ) / 1000;
                    if (Color.alpha(pixel) > 127 && luminance < 190) {
                        value |= 0x80 >> bit;
                    }
                }
                bytes.write(value);
            }
        }

        return bytes.toByteArray();
    }

    private Charset getCharset(String encoding) {
        try {
            return Charset.forName(encoding);
        } catch (Exception ex) {
            return StandardCharsets.UTF_8;
        }
    }

    private JSObject successResult() {
        JSObject result = new JSObject();
        result.put("success", true);
        return result;
    }

    private void sleepQuietly(int delayMs) {
        if (delayMs <= 0) return;
        try {
            Thread.sleep(delayMs);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
    }

    private void closeQuietly(BluetoothSocket socket) {
        if (socket == null) return;
        try {
            socket.close();
        } catch (IOException ignored) {
        }
    }

    private void closeQuietly(Socket socket) {
        if (socket == null) return;
        try {
            socket.close();
        } catch (IOException ignored) {
        }
    }

    @Override
    protected void handleOnDestroy() {
        executor.shutdownNow();
        super.handleOnDestroy();
    }
}
