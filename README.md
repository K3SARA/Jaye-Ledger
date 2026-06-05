# Ledger Simple Billing

React/Vite billing and ledger app with a small Express API for production hosting.

## Local Development

```powershell
npm install
npm run dev -- --host
```

The dev server uses browser `localStorage`. The database API is available when the app is run through the production server with `DATABASE_URL` configured.

## Production Build

```powershell
npm run build
npm start
```

The production server:

- serves the built React app from `dist`
- exposes `GET /api/health`
- exposes `GET /api/state` and `PUT /api/state`
- stores app state in PostgreSQL when `DATABASE_URL` is set
- falls back to browser storage when no database is configured

## Railway Deployment

This repo includes `railway.toml`:

- build command: `npm run build`
- start command: `npm start`
- healthcheck: `/api/health`

Railway setup:

1. Log in:

   ```powershell
   railway login
   ```

2. Create or link a Railway project:

   ```powershell
   railway init --name ledger-simple-billing
   ```

3. Add PostgreSQL:

   ```powershell
   railway add --database postgres
   ```

4. Add an app service if Railway did not create one:

   ```powershell
   railway add --service ledger-simple-billing
   ```

5. In the app service Variables tab, add:

   ```text
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

   Use the actual Postgres service name if Railway names it differently.

6. Deploy:

   ```powershell
   railway up --service ledger-simple-billing
   ```

7. Generate a public domain:

   ```powershell
   railway domain --service ledger-simple-billing
   ```

Railway can also be configured from the dashboard: create a project from this folder/repository, add a PostgreSQL database, add the `DATABASE_URL` reference variable to the app service, and deploy.
