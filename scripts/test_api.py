#!/usr/bin/env python3
"""
Script de test pour examiner la structure de l'API chabad.org
"""

import requests
import json

CHABAD_API_URL = "https://www.chabad.org/api/v2/chabadorg/centers/search"

def test_api():
    try:
        params = {
            "limit": 2,
            "offset": 0,
            "query": "bonneuil",
            "type": "",
            "format": "jsonapi",
            "lang": "en"
        }
        
        print("🔍 Test de l'API chabad.org...")
        response = requests.get(CHABAD_API_URL, params=params, timeout=30)
        response.raise_for_status()
        
        data = response.json()
        print(f"✅ Réponse reçue")
        print(f"📊 Structure de la réponse:")
        print(json.dumps(data, indent=2))
        
    except Exception as e:
        print(f"❌ Erreur: {str(e)}")

if __name__ == "__main__":
    test_api()
