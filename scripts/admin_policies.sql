-- À exécuter dans Supabase : Dashboard > SQL Editor > New query
-- Donne à l'admin (ohaleihabad@gmail.com) accès à toutes les données

-- Lire et modifier les inscriptions Chaliah
create policy "Admin can read all chaliah profiles"
  on public.chaliah_profiles
  for select
  to authenticated
  using (auth.email() = 'ohaleihabad@gmail.com');

create policy "Admin can update chaliah profiles"
  on public.chaliah_profiles
  for update
  to authenticated
  using (auth.email() = 'ohaleihabad@gmail.com');

-- Lire les messages de contact
create policy "Admin can read contact messages"
  on public.contact_messages
  for select
  to authenticated
  using (auth.email() = 'ohaleihabad@gmail.com');
