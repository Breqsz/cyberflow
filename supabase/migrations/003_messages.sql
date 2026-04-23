create table public.messages (
  id           uuid primary key default gen_random_uuid(),
  customer_id  uuid not null references public.profiles(id) on delete cascade,
  sender_role  text not null,
  content      text not null,
  created_at   timestamptz not null default now(),
  read_at      timestamptz
);

alter table public.messages enable row level security;

create policy "messages: customer access own" on public.messages
  for all using (auth.uid() = customer_id)
  with check (auth.uid() = customer_id);

create policy "messages: admin full access" on public.messages
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
