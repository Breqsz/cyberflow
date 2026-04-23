create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  name         text,
  company_name text,
  email        text,
  phone        text,
  country      text,
  role         text not null default 'customer',
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: own row" on public.profiles
  for all using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'customer')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
