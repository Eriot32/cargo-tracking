-- Run this file in Supabase SQL Editor before importing data.
create table if not exists public.cargo_tracking (
  id text primary key,
  ponum_pib text not null default '',
  pengirim text not null default '',
  hawb text not null default '',
  mawb text not null default '',
  pieces_weight text not null default '',
  routing text not null default '',
  image_url text not null default '',
  flights jsonb not null default '[]'::jsonb,
  search_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cargo_tracking_search_idx
  on public.cargo_tracking using gin (to_tsvector('simple', search_text));

alter table public.cargo_tracking enable row level security;

-- This site is a public search page, so visitors may read tracking records.
-- No write policy is added: changes stay restricted to the Supabase dashboard.
drop policy if exists "Public can read cargo tracking" on public.cargo_tracking;
create policy "Public can read cargo tracking"
  on public.cargo_tracking for select to anon using (true);
