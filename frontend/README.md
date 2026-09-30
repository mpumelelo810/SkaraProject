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

## Account and demo behaviour

Explore demo uses local state. My account connects to the dedicated Sikhwama Supabase project for email/password Auth and saved goals and simulated contributions. Legacy Django logins remain separate. No real money is moved.

Working publishable credentials are in src/supabase.js. Optional environment overrides are in .env.example. Never use a secret/service-role key in browser code. Signup requires confirmation; default email delivery can restrict recipients. Configure the final site redirect before launch.
