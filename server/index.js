import express from 'express';
import pg from 'pg';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;
const appStateId = 'default';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

app.use(express.json({ limit: '5mb' }));

const shouldUseSsl =
  process.env.DATABASE_URL &&
  process.env.PGSSLMODE !== 'disable' &&
  !process.env.DATABASE_URL.includes('sslmode=disable');

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: shouldUseSsl ? { rejectUnauthorized: false } : false
    })
  : null;

let databaseSetup;

const ensureDatabase = async () => {
  if (!pool) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_state (
      id text PRIMARY KEY,
      data jsonb NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);
};

const getDatabaseSetup = () => {
  if (!databaseSetup) {
    databaseSetup = ensureDatabase();
  }

  return databaseSetup;
};

app.get('/api/health', async (req, res) => {
  try {
    if (pool) {
      await getDatabaseSetup();
    }

    res.json({ ok: true, database: Boolean(pool) });
  } catch (error) {
    console.error('Healthcheck failed', error);
    res.status(503).json({ ok: false, error: 'Database is not ready' });
  }
});

app.get('/api/state', async (req, res) => {
  if (!pool) {
    res.json({ state: null, database: false });
    return;
  }

  try {
    await getDatabaseSetup();
    const result = await pool.query('SELECT data FROM app_state WHERE id = $1', [appStateId]);
    res.json({ state: result.rows[0]?.data || null, database: true });
  } catch (error) {
    console.error('Failed to load app state', error);
    res.status(500).json({ error: 'Failed to load app state' });
  }
});

app.put('/api/state', async (req, res) => {
  if (!pool) {
    res.status(503).json({ error: 'DATABASE_URL is not configured' });
    return;
  }

  const state = req.body?.state;
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    res.status(400).json({ error: 'Expected a state object' });
    return;
  }

  try {
    await getDatabaseSetup();
    await pool.query(
      `
        INSERT INTO app_state (id, data, updated_at)
        VALUES ($1, $2::jsonb, now())
        ON CONFLICT (id)
        DO UPDATE SET data = EXCLUDED.data, updated_at = now()
      `,
      [appStateId, JSON.stringify(state)]
    );

    res.json({ ok: true });
  } catch (error) {
    console.error('Failed to save app state', error);
    res.status(500).json({ error: 'Failed to save app state' });
  }
});

app.use(express.static(distDir));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Ledger app listening on port ${port}`);
});
