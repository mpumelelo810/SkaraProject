# Sikhwama Supabase

Dedicated project: zqxnxflsbcfacdskfbfz (Free plan).

Hosted migration: create_demo_savings. schema.sql is a snapshot for an empty project, not a CLI migration.

Tables: savings_goals (one goal per user) and demo_contributions (append-only for clients), referencing auth.users. Amounts are positive integer cents. Both enable RLS. Anonymous users have no access. Users can read/insert their own rows and update their own goal. They cannot update/delete contributions or change ownership.

Rollback-only tests confirmed own insertion/read, rejected cross-user insertion and hidden cross-user reads. Security advisors returned no findings. Test users/records were rolled back. Signup/email confirmation has not been tested end-to-end; configure confirmation redirects and email delivery before public use. These are simulated amounts, never funds.

Django remains on SQLite. No legacy user data was copied.
