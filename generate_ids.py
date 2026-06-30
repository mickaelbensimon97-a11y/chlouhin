#!/usr/bin/env python3
"""
Script pour générer un fichier errors.txt avec des IDs de centres
"""

import requests
import json

# API Chabad.org pour récupérer la liste des centres
list_url = "https://www.chabad.org/api/v2/chabadorg/centers?format=jsonapi&lang=en"

try:
    print("🔍 Récupération de la liste des centres...")
    r = requests.get(list_url, timeout=30)
    r.raise_for_status()
    
    data = r.json()
    
    # Afficher la structure de la réponse
    print(f"📊 Structure de la réponse:")
    print(f"  Clés principales: {list(data.keys())}")
    
    if "data" in data:
        print(f"  Structure de 'data': {type(data['data'])}")
        if isinstance(data["data"], dict):
            print(f"  Clés dans 'data': {list(data['data'].keys())}")
            if "relationships" in data["data"]:
                print(f"  Clés dans 'relationships': {list(data['data']['relationships'].keys())}")
                for rel_name, rel_data in data["data"]["relationships"].items():
                    if "data" in rel_data:
                        rel_ids = [item.get("id") for item in rel_data["data"] if isinstance(item, dict)]
                        print(f"  {rel_name}: {len(rel_ids)} IDs")
                        all_ids = rel_ids
                        
                        if all_ids:
                            print(f"✅ {len(all_ids)} IDs trouvés")
                            
                            # Sauvegarder dans errors.txt
                            with open("errors.txt", "w") as f:
                                for cid in all_ids:
                                    f.write(str(cid) + "\n")
                            
                            print(f"💾 {len(all_ids)} IDs sauvegardés dans errors.txt")
                            
                            # Afficher quelques exemples
                            print("\n📋 Exemples d'IDs:")
                            for i, cid in enumerate(all_ids[:5], 1):
                                print(f"  {i}. {cid}")
                            
                            if len(all_ids) > 5:
                                print(f"  ... et {len(all_ids) - 5} autres")
                            break
        elif isinstance(data["data"], list):
            print(f"  Nombre d'éléments dans 'data': {len(data['data'])}")
            all_ids = [item.get("id") for item in data["data"] if isinstance(item, dict)]
            print(f"✅ {len(all_ids)} IDs trouvés")
            
            # Sauvegarder dans errors.txt
            with open("errors.txt", "w") as f:
                for cid in all_ids:
                    f.write(str(cid) + "\n")
            
            print(f"💾 {len(all_ids)} IDs sauvegardés dans errors.txt")
            
            # Afficher quelques exemples
            print("\n📋 Exemples d'IDs:")
            for i, cid in enumerate(all_ids[:5], 1):
                print(f"  {i}. {cid}")
            
            if len(all_ids) > 5:
                print(f"  ... et {len(all_ids) - 5} autres")
    else:
        print("⚠️  Pas de section 'data' dans la réponse")
        
except Exception as e:
    print(f"❌ Erreur: {str(e)}")
