create table public.projects (
  id             uuid primary key default gen_random_uuid(),
  customer_id    uuid not null unique references public.profiles(id) on delete cascade,
  current_stage  text not null default 'briefing',
  stage_note     text,
  updated_at     timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects: customer read own" on public.projects
  for select using (auth.uid() = customer_id);

create policy "projects: admin full access" on public.projects
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
