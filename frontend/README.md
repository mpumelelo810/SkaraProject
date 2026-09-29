# Sikhwama React frontend

This is the new React and Vite interface for the Sikhwama concept. It includes a homepage, an explanation and contribution calculator, project background, and an interactive demo dashboard.

## Run locally

Requires a current Node.js version supported by Vite.

```bash
cd frontend
npm ci
npm run dev
```

Open the address printed by Vite (under `/static/react/`). Run `npm run build` to place the production bundle in `../static/react/`. Django serves that build at `/`. Run `npm run preview` to inspect the production bundle locally.

## Demo behaviour

The calculator and dashboard use local React state. Contributions, balances and goals are simulated and reset on refresh. There is no sign-up, payment, insurance policy, or backend connection in this frontend yet. Do not enter real personal or payment details.

The React landing page is served by Django after building. Its interactive data still runs only in memory. The legacy Django account pages remain separate, and a later integration can connect React to an authenticated API and a separate Supabase project.
