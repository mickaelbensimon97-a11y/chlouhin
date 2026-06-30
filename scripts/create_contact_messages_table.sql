-- À exécuter une seule fois dans Supabase : Dashboard > SQL Editor > New query
-- Crée la table qui stocke les messages du formulaire de contact (/contact)

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Autorise n'importe qui (y compris les visiteurs non connectés, via la clé anon)
-- à insérer un message, mais personne ne peut les lire/modifier/supprimer
-- depuis le site public (seul un accès via la service role key, ex: dashboard
-- Supabase ou un futur back-office, peut les consulter).
create policy "Anyone can submit a contact message"
  on public.contact_messages
  for insert
  to anon
  with check (true);
