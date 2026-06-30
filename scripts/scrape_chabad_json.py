#!/usr/bin/env python3
"""
Script de scraping des Beth Habad depuis l'API chabad.org
Sauvegarde des données dans un fichier JSON
"""

import os
import requests
import json
from typing import List, Dict, Optional
from datetime import datetime, timezone
import sys

# API Chabad.org
CHABAD_API_URL = "https://www.chabad.org/api/v2/chabadorg/centers/search"

class ChabadScraperJSON:
    def __init__(self):
        self.errors = []
        self.success_count = 0
        self.total_fetched = 0
        self.centers_data = []

    def fetch_chabad_centers(self, query: str = "", limit: int = 100, offset: int = 0) -> Optional[Dict]:
        """
        Récupère les centres depuis l'API chabad.org
        """
        try:
            params = {
                "limit": limit,
                "offset": offset,
                "query": query,
                "type": "",
                "format": "jsonapi",
                "lang": "en"
            }
            
            print(f"🔍 Récupération des centres (offset: {offset}, limit: {limit})...")
            response = requests.get(CHABAD_API_URL, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            # Les centres sont dans la section "included" avec type "center"
            centers = [item for item in data.get("included", []) if item.get("type") == "center"]
            self.total_fetched += len(centers)
            print(f"✅ {len(centers)} centres récupérés")
            
            # Remplacer data par la liste des centres
            data["centers"] = centers
            return data
            
        except requests.exceptions.RequestException as e:
            error_msg = f"Erreur lors de la récupération des centres: {str(e)}"
            print(f"❌ {error_msg}")
            self.errors.append(error_msg)
            return None
        except json.JSONDecodeError as e:
            error_msg = f"Erreur lors du parsing JSON: {str(e)}"
            print(f"❌ {error_msg}")
            self.errors.append(error_msg)
            return None

    def extract_center_data(self, center: Dict) -> Dict:
        """
        Extrait les données pertinentes d'un centre
        """
        attributes = center.get("attributes", {})
        
        # Extraction de l'adresse
        address_data = attributes.get("address", {})
        address_line1 = address_data.get("address-line1", "")
        address_line2 = address_data.get("address-line2", "")
        full_address = f"{address_line1}, {address_line2}" if address_line2 else address_line1
        
        # Extraction des coordonnées
        coordinates = attributes.get("coordinates", {})
        latitude = coordinates.get("latitude")
        longitude = coordinates.get("longitude")
        
        # Construction des données
        return {
            "name": attributes.get("name", ""),
            "slug": attributes.get("static-url", ""),
            "address": full_address,
            "city": attributes.get("city", ""),
            "state": address_data.get("state", ""),
            "country": address_data.get("country", ""),
            "zip": address_data.get("zip-code", ""),
            "phone": "",  # Non disponible dans l'API
            "email": "",  # Non disponible dans l'API
            "website": f"https://www.chabad.org/{attributes.get('static-url', '')}" if attributes.get("static-url") else "",
            "latitude": latitude,
            "longitude": longitude,
            "directors": [],  # Non disponible dans l'API
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }

    def scrape_all_centers(self, query: str = "", max_centers: int = 2500):
        """
        Scrape tous les centres avec pagination
        """
        print(f"🚀 Début du scraping (max: {max_centers} centres)...")
        print(f"📍 Recherche: {query if query else 'tous les centres'}")
        print("-" * 50)
        
        offset = 0
        limit = 100
        total_processed = 0
        
        while total_processed < max_centers:
            data = self.fetch_chabad_centers(query, limit, offset)
            
            if not data or "centers" not in data:
                print("⚠️  Plus de données disponibles ou erreur")
                break
            
            centers = data["centers"]
            
            if not centers:
                print("⚠️  Aucun centre trouvé")
                break
            
            # Traitement des centres
            for center in centers:
                try:
                    center_data = self.extract_center_data(center)
                    
                    if center_data["name"]:
                        print(f"📝 Traitement: {center_data['name'][:50]}...")
                        self.centers_data.append(center_data)
                        self.success_count += 1
                        total_processed += 1
                        
                        if total_processed >= max_centers:
                            break
                except Exception as e:
                    error_msg = f"Erreur lors du traitement du centre: {str(e)}"
                    print(f"❌ {error_msg}")
                    self.errors.append(error_msg)
            
            offset += limit
            
            if len(centers) < limit:
                print("⚠️  Fin des données disponibles")
                break
            
            # Pause pour éviter de surcharger l'API
            import time
            time.sleep(1)
        
        self.save_to_json()
        self.print_summary()

    def save_to_json(self):
        """
        Sauvegarde les données dans un fichier JSON
        """
        try:
            filename = f"beth_habad_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(self.centers_data, f, ensure_ascii=False, indent=2)
            print(f"💾 Données sauvegardées dans {filename}")
        except Exception as e:
            print(f"❌ Erreur lors de la sauvegarde JSON: {str(e)}")

    def print_summary(self):
        """
        Affiche le résumé du scraping
        """
        print("\n" + "=" * 50)
        print("📊 RÉSUMÉ DU SCRAPING")
        print("=" * 50)
        print(f"✅ Centres récupérés: {self.total_fetched}")
        print(f"✅ Centres traités: {self.success_count}")
        print(f"❌ Erreurs: {len(self.errors)}")
        
        if self.errors:
            print("\n📋 Liste des erreurs:")
            for i, error in enumerate(self.errors[:10], 1):  # Affiche max 10 erreurs
                print(f"  {i}. {error}")
            if len(self.errors) > 10:
                print(f"  ... et {len(self.errors) - 10} autres erreurs")
        
        print("=" * 50)

def main():
    """
    Fonction principale
    """
    # Vérification des arguments
    query = ""
    max_centers = 2500
    
    if len(sys.argv) > 1:
        query = sys.argv[1]
    if len(sys.argv) > 2:
        max_centers = int(sys.argv[2])
    
    # Création du scraper
    scraper = ChabadScraperJSON()
    
    # Lancement du scraping
    scraper.scrape_all_centers(query, max_centers)

if __name__ == "__main__":
    main()
