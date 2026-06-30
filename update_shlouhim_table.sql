-- Mise à jour de la table shlouhim pour ajouter les nouvelles colonnes
ALTER TABLE shlouhim 
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS rabbi TEXT,
ADD COLUMN IF NOT EXISTS opening_hours TEXT,
ADD COLUMN IF NOT EXISTS google_maps_url TEXT,
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Mise à jour de la fonction de mise à jour automatique du timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Création du trigger pour la mise à jour automatique
DROP TRIGGER IF EXISTS update_shlouhim_updated_at ON shlouhim;
CREATE TRIGGER update_shlouhim_updated_at
    BEFORE UPDATE ON shlouhim
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Création d'index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_shlouhim_state ON shlouhim(state);
CREATE INDEX IF NOT EXISTS idx_shlouhim_address ON shlouhim USING gin(to_tsvector('french', address));
CREATE INDEX IF NOT EXISTS idx_shlouhim_rabbi ON shlouhim USING gin(to_tsvector('french', rabbi));
CREATE INDEX IF NOT EXISTS idx_shlouhim_beth_habad_name ON shlouhim USING gin(to_tsvector('french', beth_habad_name));
CREATE INDEX IF NOT EXISTS idx_shlouhim_verified ON shlouhim(is_verified);

-- Commentaires sur les nouvelles colonnes
COMMENT ON COLUMN shlouhim.state IS 'État ou région du Beth Habad';
COMMENT ON COLUMN shlouhim.address IS 'Adresse complète du Beth Habad';
COMMENT ON COLUMN shlouhim.postal_code IS 'Code postal';
COMMENT ON COLUMN shlouhim.email IS 'Adresse email de contact';
COMMENT ON COLUMN shlouhim.rabbi IS 'Nom du Rabbi ou responsable';
COMMENT ON COLUMN shlouhim.opening_hours IS 'Horaires d''ouverture';
COMMENT ON COLUMN shlouhim.google_maps_url IS 'URL Google Maps directe';
COMMENT ON COLUMN shlouhim.is_verified IS 'Indique si les informations ont été vérifiées';
COMMENT ON COLUMN shlouhim.last_updated IS 'Dernière mise à jour des informations';
