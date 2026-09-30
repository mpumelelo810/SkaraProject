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
| Supabase | Dedicated free project; React authentication and saved demo goals/contributions protected by ownership policies |

The React demo uses in-memory data. Refreshing the page resets it. Django serves the built React landing page at `/`; My account uses Supabase Auth and PostgreSQL. Legacy Django accounts remain separate.

## Run the React frontend

```bash
cd frontend
npm ci
npm run dev
```

Open the URL printed by Vite under `/static/react/`. To rebuild the Django-served interface, run `npm run build`. Then from the repository root run `python manage.py migrate` and `python manage.py runserver`.

For a fresh Django environment, create a Python virtual environment and install `requirements.txt` first. Copy the settings in `.env.example` into your environment as needed. The bundled development secret is only for local use; set a private `DJANGO_SECRET_KEY` and `DJANGO_DEBUG=false` for a real deployment.

## Legacy Django status

The fresh-install migration and account-route blockers have been repaired in this branch. Django authentication hashes new passwords. Existing legacy passwords are disabled by a migration, so existing users need a secure account recovery path before they can sign in. Exposed credentials in repository history must still be rotated. The committed historical SQLite database remains a data-handling concern. React now uses a separate Supabase project; Django remains on SQLite.

## Next milestones

1. Finish account recovery for users of the legacy database and rotate exposed credentials.
2. Test confirmation email delivery and configure redirects for the deployed site.
3. Build goals, history and a provider payment request flow using simulated funds.
4. Add account recovery, pagination and broader account-flow tests.
5. Validate the workflow with potential users and providers before real payment integration.

## Portfolio summary

Sikhwama Health Insurance is an Eswatini-focused health finance concept originally developed as a CSC499 project. I co-developed an early Django prototype and explored predictive modelling with synthetic data. I am rebuilding the interface in React and the product around secure accounts, transparent health savings and traceable transactions before any real payment integration.

## Supabase connection

Dedicated project: Sikhwama Health Insurance (`zqxnxflsbcfacdskfbfz`). My account uses email/password Auth, saved goals and append-only simulated contributions stored as integer cents. Public Explore demo still resets on refresh. No real money is moved.

Only the publishable key is included in browser code. Optional overrides are in `frontend/.env.example`; copy to `.env.local` before rebuilding. Never put a secret/service-role key in the frontend. Signup email delivery can restrict recipients during testing; configure confirmation redirects for the final hosted URL before launch. See `supabase/README.md`.
