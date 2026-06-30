#!/usr/bin/env python3
"""
Script pour créer la table beth_habad dans Supabase via l'API REST
"""

import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

# Configuration Supabase
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise RuntimeError(
        "NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env"
    )

# SQL pour créer la table
sql = """
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

CREATE INDEX IF NOT EXISTS idx_beth_habad_city ON beth_habad(city);
CREATE INDEX IF NOT EXISTS idx_beth_habad_country ON beth_habad(country);
CREATE INDEX IF NOT EXISTS idx_beth_habad_slug ON beth_habad(slug);

ALTER TABLE beth_habad ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read access" ON beth_habad
    FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Allow insert for scraping" ON beth_habad
    FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow update" ON beth_habad
    FOR UPDATE USING (true);
"""

def create_table():
    try:
        print("🔧 Création de la table beth_habad dans Supabase...")
        
        # Utiliser l'endpoint SQL de Supabase
        url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
        headers = {
            "apikey": SUPABASE_SERVICE_KEY,
            "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(url, json={"query": sql}, headers=headers)
        response.raise_for_status()
        
        print("✅ Table créée avec succès!")
        print("📋 Structure de la table:")
        print("  - id (SERIAL PRIMARY KEY)")
        print("  - name (TEXT NOT NULL)")
        print("  - slug (TEXT UNIQUE)")
        print("  - address, city, state, country, zip (TEXT)")
        print("  - phone, email, website (TEXT)")
        print("  - latitude, longitude (DOUBLE PRECISION)")
        print("  - directors (JSONB)")
        print("  - created_at, updated_at (TIMESTAMP WITH TIME ZONE)")
        
    except Exception as e:
        print(f"❌ Erreur lors de la création de la table: {str(e)}")
        print("💡 Alternative: Exécutez le script SQL manuellement dans le dashboard Supabase")
        print("\n📋 Script SQL à exécuter manuellement:")
        print(sql)

if __name__ == "__main__":
    create_table()
