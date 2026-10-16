-- Deescribble CMS: run this ONCE in Supabase > SQL Editor > New query > Run.
-- Safe to run again: every statement is idempotent.

-- 1. One row per document (events, reels, enquiries).
create table if not exists public.cms_documents (
  key        text primary key check (key ~ '^[a-z0-9-]{1,40}$'),
  data       jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2. Lock the table down: Row Level Security on, and NO policies.
--    The public (anon) and logged-in (authenticated) roles can read or write nothing.
--    Only the server, using the secret/service key, can touch it.
alter table public.cms_documents enable row level security;
revoke all on public.cms_documents from anon, authenticated;

-- 3. Public image bucket for admin uploads (reads are public; writes only via the server).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 5242880, array['image/webp'])
on conflict (id) do update
  set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/webp'];
