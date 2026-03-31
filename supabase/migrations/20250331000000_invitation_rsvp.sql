-- RSVP & ucapan per undangan (filter di app dengan invitation_key, mis. 'syafri')
create table if not exists public.invitation_rsvp (
  id uuid primary key default gen_random_uuid (),
  invitation_key text not null,
  name text not null,
  message text not null default '',
  attendance text not null check (
    attendance in ('hadir', 'tidak')
  ),
  created_at timestamptz not null default now()
);

create index if not exists invitation_rsvp_key_created_idx on public.invitation_rsvp (
  invitation_key,
  created_at desc
);

alter table public.invitation_rsvp enable row level security;

-- Baca & tulis anon (kunci anon di .env). Sesuaikan jika ingin lebih ketat.
create policy "invitation_rsvp_select_public" on public.invitation_rsvp for select using (true);

create policy "invitation_rsvp_insert_public" on public.invitation_rsvp for insert
with
  check (true);
