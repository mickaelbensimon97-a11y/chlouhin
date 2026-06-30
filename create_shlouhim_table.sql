-- Création de la table shlouhim pour le script scraper.py
CREATE TABLE IF NOT EXISTS shlouhim (
    id SERIAL PRIMARY KEY,
    external_id TEXT UNIQUE,
    beth_habad_name TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    city TEXT,
    country TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    website TEXT,
    description TEXT,
    chabad_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création des index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_shlouhim_external_id ON shlouhim(external_id);
CREATE INDEX IF NOT EXISTS idx_shlouhim_city ON shlouhim(city);
CREATE INDEX IF NOT EXISTS idx_shlouhim_country ON shlouhim(country);

-- Activation du Row Level Security (RLS)
ALTER TABLE shlouhim ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique
DROP POLICY IF EXISTS "Allow public read access" ON shlouhim;
CREATE POLICY "Allow public read access" ON shlouhim
    FOR SELECT USING (true);

-- Politique pour permettre l'insertion (pour le script de scraping)
DROP POLICY IF EXISTS "Allow insert for scraping" ON shlouhim;
CREATE POLICY "Allow insert for scraping" ON shlouhim
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la mise à jour
DROP POLICY IF EXISTS "Allow update" ON shlouhim;
CREATE POLICY "Allow update" ON shlouhim
    FOR UPDATE USING (true);
