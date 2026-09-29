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

The React demo uses in-memory data. Refreshing the page resets it. Django serves the built React landing page at `/`; account pages remain separate until the API is designed.

## Run the React frontend

```bash
cd frontend
npm ci
npm run dev
```

Open the URL printed by Vite under `/static/react/`. To rebuild the Django-served interface, run `npm run build`. Then from the repository root run `python manage.py migrate` and `python manage.py runserver`.

For a fresh Django environment, create a Python virtual environment and install `requirements.txt` first. Copy the settings in `.env.example` into your environment as needed. The bundled development secret is only for local use; set a private `DJANGO_SECRET_KEY` and `DJANGO_DEBUG=false` for a real deployment.

## Legacy Django status

The fresh-install migration and account-route blockers have been repaired in this branch. Django authentication hashes new passwords. Existing legacy passwords are disabled by a migration, so existing users need a secure account recovery path before they can sign in. Exposed credentials in repository history must still be rotated. The committed historical SQLite database remains a data-handling concern. A separate Supabase project is planned, but not connected.

## Next milestones

1. Finish account recovery for users of the legacy database and rotate exposed credentials.
2. Connect the React interface to authenticated backend endpoints and a traceable demo contribution ledger.
3. Build goals, history and a provider payment request flow using simulated funds.
4. Add a separate Supabase project with carefully scoped database access.
5. Validate the workflow with potential users and providers before real payment integration.

## Portfolio summary

Sikhwama Health Insurance is an Eswatini-focused health finance concept originally developed as a CSC499 project. I co-developed an early Django prototype and explored predictive modelling with synthetic data. I am rebuilding the interface in React and the product around secure accounts, transparent health savings and traceable transactions before any real payment integration.
