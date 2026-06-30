#!/usr/bin/env python3
"""
Script pour tester l'API liste des centres
"""

import requests
import json

# API Chabad.org pour récupérer la liste des centres
list_url = "https://www.chabad.org/api/v2/chabadorg/centers?format=jsonapi&lang=en"

try:
    print("🔍 Test de l'API liste des centres...")
    r = requests.get(list_url, timeout=30)
    r.raise_for_status()
    
    data = r.json()
    
    print(f"✅ Réponse reçue")
    print(f"📊 Structure de la réponse:")
    print(json.dumps(data, indent=2))
    
except Exception as e:
    print(f"❌ Erreur: {str(e)}")
