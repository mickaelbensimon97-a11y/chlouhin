-- À exécuter une seule fois dans Supabase : Dashboard > SQL Editor > New query
-- Crée la table qui stocke les messages envoyés aux Beth Habad depuis le site

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  sender_id uuid not null references auth.users(id) on delete cascade,
  beth_habad_id bigint not null,
  beth_habad_name text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Un utilisateur connecté peut envoyer un message (insérer)
create policy "Users can send messages"
  on public.messages
  for insert
  to authenticated
  with check (auth.uid() = sender_id);

-- Un utilisateur ne peut voir que ses propres messages
create policy "Users can read their own messages"
  on public.messages
  for select
  to authenticated
  using (auth.uid() = sender_id);
