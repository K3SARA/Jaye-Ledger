import { Capacitor, registerPlugin } from '@capacitor/core';

const NativeThermalPrinter = registerPlugin('NativeThermalPrinter');

export const isNativeThermalPrinterAvailable = () => (
  Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android'
);

export const listNativeBluetoothPrinters = async () => {
  if (!isNativeThermalPrinterAvailable()) {
    return { printers: [] };
  }

  return NativeThermalPrinter.listBluetoothPrinters();
};

export const printNativeText = async (options) => {
  if (!isNativeThermalPrinterAvailable()) {
    throw new Error('Native Android printer is not available in this browser.');
  }

  return NativeThermalPrinter.print(options);
};
