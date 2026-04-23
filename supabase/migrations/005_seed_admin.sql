-- Promote the founder's account(s) to admin
update public.profiles
   set role = 'admin'
 where lower(email) in ('guirochabianchini@gmail.com');

-- Update the trigger so future signups with these emails land as admin
create or replace function public.handle_new_user()
returns trigger as $$
declare
  meta_name text;
  assigned_role text;
begin
  meta_name := coalesce(
    nullif(new.raw_user_meta_data ->> 'name', ''),
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    null
  );

  assigned_role := case
    when lower(coalesce(new.email, '')) in ('guirochabianchini@gmail.com') then 'admin'
    else 'customer'
  end;

  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, meta_name, assigned_role)
  on conflict (id) do update
    set email = excluded.email,
        name  = coalesce(public.profiles.name, excluded.name),
        role  = case
                  when public.profiles.role = 'admin' then 'admin'
                  else excluded.role
                end;

  insert into public.customers (id, status, plan)
  values (new.id, 'pending', null)
  on conflict (id) do nothing;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
