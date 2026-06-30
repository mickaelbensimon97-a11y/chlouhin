-- Création de la table beth_habad dans Supabase
CREATE TABLE IF NOT EXISTS beth_habad (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    zip TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    directors JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création des index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_beth_habad_city ON beth_habad(city);
CREATE INDEX IF NOT EXISTS idx_beth_habad_country ON beth_habad(country);
CREATE INDEX IF NOT EXISTS idx_beth_habad_slug ON beth_habad(slug);

-- Activation du Row Level Security (RLS)
ALTER TABLE beth_habad ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique
CREATE POLICY "Allow public read access" ON beth_habad
    FOR SELECT USING (true);

-- Politique pour permettre l'insertion (pour le script de scraping)
CREATE POLICY "Allow insert for scraping" ON beth_habad
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la mise à jour
CREATE POLICY "Allow update" ON beth_habad
    FOR UPDATE USING (true);
