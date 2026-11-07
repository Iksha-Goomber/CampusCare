-- CampusCare database schema (run in Supabase SQL Editor)
create table if not exists public.complaints (
  id uuid primary key default gen_random_uuid(),
  ticket_id text unique not null,
  title text not null,
  description text not null,
  category text not null default 'Other',
  location text not null,
  priority text not null default 'Medium' check (priority in ('Low','Medium','High','Critical')),
  status text not null default 'Submitted' check (status in ('Submitted','In Progress','Resolved')),
  student_name text not null,
  assigned_to text not null default 'Unassigned',
  votes integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists complaints_created_at_idx on public.complaints(created_at desc);
create index if not exists complaints_status_idx on public.complaints(status);
create index if not exists complaints_priority_idx on public.complaints(priority);
alter table public.complaints enable row level security;
-- Starter/demo policy: public read/write for quick evaluation. Replace with authenticated
-- role-based policies before using this system with real student or campus data.
drop policy if exists "public read complaints" on public.complaints;
drop policy if exists "public create complaints" on public.complaints;
drop policy if exists "public update complaints" on public.complaints;
create policy "public read complaints" on public.complaints for select using (true);
create policy "public create complaints" on public.complaints for insert with check (true);
create policy "public update complaints" on public.complaints for update using (true) with check (true);
