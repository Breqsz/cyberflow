-- leads
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  phone text,
  created_at timestamptz default now()
);

-- customers
create table if not exists customers (
  id uuid primary key references auth.users on delete cascade,
  stripe_customer_id text unique,
  plan text,
  status text default 'inactive',
  created_at timestamptz default now()
);

-- subscriptions
create table if not exists subscriptions (
  id text primary key,
  customer_id uuid references customers on delete cascade,
  status text,
  price_id text,
  current_period_end timestamptz
);

-- RLS
alter table leads enable row level security;
alter table customers enable row level security;
alter table subscriptions enable row level security;

-- customers: own row only
create policy "customers_own" on customers
  for all using (auth.uid() = id);

-- subscriptions: own only
create policy "subscriptions_own" on subscriptions
  for select using (
    customer_id = auth.uid()
  );
