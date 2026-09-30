-- Snapshot of hosted migration create_demo_savings; apply only to an empty project.
create table public.savings_goals (
 user_id uuid primary key references auth.users(id) on delete cascade,
 target_cents integer not null check (target_cents between 1 and 100000000)
);
create table public.demo_contributions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 amount_cents integer not null check (amount_cents between 1 and 10000000),
 created_at timestamptz not null default now()
);
create index demo_contributions_user_created_idx on public.demo_contributions(user_id,created_at desc);
alter table public.savings_goals enable row level security;
alter table public.demo_contributions enable row level security;
revoke all on public.savings_goals, public.demo_contributions from anon, authenticated;
grant select,insert,update on public.savings_goals to authenticated;
grant select,insert on public.demo_contributions to authenticated;
create policy goals_read on public.savings_goals for select to authenticated using ((select auth.uid())=user_id);
create policy goals_insert on public.savings_goals for insert to authenticated with check ((select auth.uid())=user_id);
create policy goals_update on public.savings_goals for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy contributions_read on public.demo_contributions for select to authenticated using ((select auth.uid())=user_id);
create policy contributions_insert on public.demo_contributions for insert to authenticated with check ((select auth.uid())=user_id);
comment on table public.demo_contributions is 'Simulated amounts only; not a real financial ledger or payment record.';
