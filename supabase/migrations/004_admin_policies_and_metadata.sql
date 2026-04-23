-- Allow admins to read and update any profile
drop policy if exists "profiles: admin full access" on public.profiles;
create policy "profiles: admin full access" on public.profiles
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Allow admins to read/write any customer
drop policy if exists "customers: admin full access" on public.customers;
create policy "customers: admin full access" on public.customers
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

-- Allow admins to read subscriptions
drop policy if exists "subscriptions: admin read" on public.subscriptions;
create policy "subscriptions: admin read" on public.subscriptions
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Improved trigger: capture name and full_name from user metadata
create or replace function public.handle_new_user()
returns trigger as $$
declare
  meta_name text;
begin
  meta_name := coalesce(
    nullif(new.raw_user_meta_data ->> 'name', ''),
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    null
  );

  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, meta_name, 'customer')
  on conflict (id) do update
    set email = excluded.email,
        name  = coalesce(public.profiles.name, excluded.name);

  insert into public.customers (id, status, plan)
  values (new.id, 'pending', null)
  on conflict (id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

-- Re-create trigger to ensure latest definition is wired
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
