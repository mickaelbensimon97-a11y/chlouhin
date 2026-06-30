#!/usr/bin/env python3
"""
Script pour tester les données dans Supabase
"""

import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

try:
    print("🔍 Test de récupération des données depuis Supabase...")
    url = f"{SUPABASE_URL}/rest/v1/shlouhim?select=*&limit=5"
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ {len(data)} enregistrements récupérés")
        
        for i, record in enumerate(data, 1):
            print(f"\n📋 Enregistrement {i}:")
            print(f"  ID: {record.get('id')}")
            print(f"  External ID: {record.get('external_id')}")
            print(f"  Nom: {record.get('beth_habad_name')}")
            print(f"  Ville: {record.get('city')}")
            print(f"  Pays: {record.get('country')}")
            print(f"  Latitude: {record.get('latitude')}")
            print(f"  Longitude: {record.get('longitude')}")
            print(f"  Téléphone: {record.get('phone')}")
    else:
        print(f"❌ Erreur: {response.status_code}")
        print(f"Réponse: {response.text}")
        
except Exception as e:
    print(f"❌ Erreur: {str(e)}")
