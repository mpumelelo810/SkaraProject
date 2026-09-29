# Sikhwama Health Insurance

Sikhwama is an Eswatini-focused health finance concept exploring how small, regular contributions could help people prepare for healthcare expenses. The original CSC499 proposal suggested setting aside at least 6% from eligible transactions and, eventually, paying participating healthcare providers from a dedicated health balance.

The name **Sikhwama Health Insurance** is the project brand. The repository is a concept prototype: it does not hold funds, process mobile money, issue insurance cover, quote verified premiums, or pay clinics.

## Project background

The academic project was developed by Mpumelelo Mancoba Dlamini and Mfanwekhaya Jeffrey Dube at the University of Eswatini. It also explored regression-based premium prediction using synthetic data. That experiment is not connected to the current application and is not evidence of real insurance pricing.

## What is in this repository

| Component | Current state |
| --- | --- |
| `frontend/` | React and Vite interface with public pages, a contribution calculator and a simulated savings dashboard |
| Django project | Legacy pages, forms and early user and balance models |
| Payments and insurance | Product ideas only; no live integrations or policies |
| Supabase | Planned as a separate Sikhwama project; not connected yet |

The React demo uses in-memory data. Refreshing the page resets it. It is a safe way to explore the proposed interface without entering real financial information.

## Run the React frontend

```bash
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite. To check a production bundle, run `npm run build` and `npm run preview`.

## Legacy Django status

The existing Django code is not ready for a fresh installation. A local review on 29 September 2026 found an undeclared `mailtrap` dependency, a foreign-key mismatch at migration `user_info.0005`, a registration error after that failed migration, and a missing login redirect target. The repository also contains hard-coded credentials, a committed SQLite database and plain-text password handling. Rotate exposed credentials and repair these issues before processing real user data. A separate Supabase project is planned for PostgreSQL and authentication.

## Next milestones

1. Repair the backend project structure and migrations, remove secrets from current code, and document reproducible setup.
2. Build secure account authentication and protect each user's data.
3. Connect the React interface to a traceable demo contribution ledger, goals and transaction history.
4. Prototype a provider payment request and approval flow with simulated funds.
5. Validate the workflow with potential users and providers before considering real payment integration.

## Portfolio summary

Sikhwama Health Insurance is an Eswatini-focused health finance concept originally developed as a CSC499 project. I co-developed an early Django prototype and explored predictive modelling with synthetic data. I am rebuilding the interface in React and the product around secure accounts, transparent health savings and traceable transactions before any real payment integration.
