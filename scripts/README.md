# Scripts de scraping ChlouhIN

## 📋 Description

Ce dossier contient les scripts Python pour récupérer les données des Beth Habad depuis l'API chabad.org et les intégrer dans la base de données Supabase.

## 🚀 Installation

1. Créer l'environnement virtuel :
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Installer les dépendances :
```bash
pip install -r requirements.txt
```

## 📊 Création de la table dans Supabase

L'API REST de Supabase ne permet pas de créer des tables directement. Vous devez créer la table manuellement dans le dashboard Supabase :

1. Connectez-vous à votre dashboard Supabase : https://app.supabase.com
2. Allez dans "SQL Editor" 
3. Exécutez le script SQL suivant :

```sql
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
```

## 🔧 Utilisation du script de scraping

### Option 1 : Sauvegarde locale en JSON (recommandé pour tester)

Si vous n'avez pas encore créé la table dans Supabase, utilisez la version JSON :

```bash
# Pour tester avec quelques centres
python3 scrape_chabad_json.py "bonneuil" 5

# Pour récupérer tous les centres (2500 max)
python3 scrape_chabad_json.py "" 2500
```

Les données seront sauvegardées dans un fichier JSON avec timestamp (ex: `beth_habad_data_20260602_171311.json`).

### Option 2 : Insertion directe dans Supabase

Une fois la table créée, lancez le script de scraping :

```bash
# Pour tester avec quelques centres
python3 scrape_chabad.py "bonneuil" 5

# Pour récupérer tous les centres (2500 max)
python3 scrape_chabad.py "" 2500
```

## 📝 Paramètres

- `query` : Recherche spécifique (ex: "bonneuil", "paris", etc.) ou vide pour tous les centres
- `max_centers` : Nombre maximum de centres à récupérer (max 2500)

## 📊 Données récupérées

Le script récupère les informations suivantes depuis l'API chabad.org :
- Nom du Beth Habad
- Adresse complète
- Ville, État, Pays, Code postal
- Coordonnées GPS (latitude, longitude)
- URL du site web
- Slug pour les URLs

⚠️ **Note** : L'API chabad.org ne fournit pas les informations de contact (téléphone, email) ni les noms des responsables directement.

## 🐛 Dépannage

### Erreur 404 lors de l'insertion
Cela signifie que la table n'existe pas encore dans Supabase. Créez-la manuellement en suivant les instructions ci-dessus.

### Erreur lors de la récupération des données
Vérifiez votre connexion internet et que l'API chabad.org est accessible.

## 📄 Scripts disponibles

- `scrape_chabad.py` : Script principal de scraping avec insertion Supabase
- `scrape_chabad_json.py` : Script de scraping avec sauvegarde JSON locale
- `test_api.py` : Script pour tester l'API chabad.org
- `create_table.py` : Script pour créer la table (nécessite exécution manuelle)
- `create_table.sql` : Script SQL à exécuter manuellement
