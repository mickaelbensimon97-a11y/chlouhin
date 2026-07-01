-- À exécuter une seule fois dans Supabase : Dashboard > SQL Editor > New query
-- Crée la table qui stocke le profil des Chalouhim inscrits via le site

create table if not exists public.chaliah_profiles (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  prenom text not null,
  nom text not null,
  email text not null,
  telephone text,
  pays text not null,
  ville text not null,
  adresse text not null,
  statut text not null default 'en_attente', -- en_attente | valide | rejete
  created_at timestamptz not null default now()
);

alter table public.chaliah_profiles enable row level security;

-- Le chaliah peut créer son propre profil
create policy "Chaliah can insert own profile"
  on public.chaliah_profiles
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Le chaliah peut voir son propre profil
create policy "Chaliah can read own profile"
  on public.chaliah_profiles
  for select
  to authenticated
  using (auth.uid() = user_id);
