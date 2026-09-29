# Sikhwama React frontend

This is the new React and Vite interface for the Sikhwama concept. It includes a homepage, an explanation and contribution calculator, project background, and an interactive demo dashboard.

## Run locally

Requires a current Node.js version supported by Vite.

```bash
cd frontend
npm ci
npm run dev
```

Open the address printed by Vite. Run `npm run build` to create a production bundle and `npm run preview` to inspect that bundle locally.

## Demo behaviour

The calculator and dashboard use local React state. Contributions, balances and goals are simulated and reset on refresh. There is no sign-up, payment, insurance policy, or backend connection in this frontend yet. Do not enter real personal or payment details.

The legacy Django templates remain in the repository while its database migrations and authentication are repaired. The React app runs independently for now. A later integration can connect it to a separate Supabase project through a designed API and access rules.
