-- Extend leads with website and challenge fields
alter table leads add column if not exists website text;
alter table leads add column if not exists challenge text;

-- Allow anonymous inserts for lead capture (the form is public)
drop policy if exists "leads_anon_insert" on leads;
create policy "leads_anon_insert" on leads
  for insert
  with check (true);

-- Block reads/updates/deletes for anon (only service role can read)
drop policy if exists "leads_no_select" on leads;
create policy "leads_no_select" on leads
  for select
  using (false);
