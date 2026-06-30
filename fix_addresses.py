import requests
from dotenv import load_dotenv
import os
import ast
import re

load_dotenv()

# Configuration Supabase
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError(
        "NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env"
    )

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

def parse_address_string(address_str):
    """Parse une adresse stockée comme string de dictionnaire Python"""
    if not address_str or address_str == "":
        return ""
    
    # Si c'est déjà une adresse normale (pas un dict), la retourner
    if not address_str.startswith('{'):
        return address_str
    
    try:
        # Essayer de parser comme dictionnaire Python
        address_dict = ast.literal_eval(address_str)
        
        if isinstance(address_dict, dict):
            # Extraire les composants de l'adresse
            parts = []
            
            # address-line1
            if address_dict.get('address-line1'):
                parts.append(address_dict['address-line1'])
            
            # address-line2
            if address_dict.get('address-line2'):
                parts.append(address_dict['address-line2'])
            
            # zip-code
            if address_dict.get('zip-code'):
                parts.append(address_dict['zip-code'])
            
            # city
            if address_dict.get('city'):
                parts.append(address_dict['city'])
            
            # state
            if address_dict.get('state'):
                parts.append(address_dict['state'])
            
            # country
            if address_dict.get('country'):
                parts.append(address_dict['country'])
            
            return ', '.join(parts) if parts else ""
        
        return address_str
    except:
        # Si le parsing échoue, retourner la string originale
        return address_str

def get_all_locations():
    """Récupérer toutes les locations de la base"""
    url = f"{SUPABASE_URL}/rest/v1/shlouhim?select=*"
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def update_location(location_id, address):
    """Mettre à jour l'adresse d'une location"""
    url = f"{SUPABASE_URL}/rest/v1/shlouhim?id=eq.{location_id}"
    response = requests.patch(url, json={"location": address}, headers=headers)
    response.raise_for_status()
    return True

def main():
    print("🔍 Récupération des locations...")
    locations = get_all_locations()
    print(f"📊 {len(locations)} locations trouvées")
    
    fixed_count = 0
    error_count = 0
    
    for location in locations:
        location_id = location.get('id')
        current_address = location.get('location', '')
        
        # Vérifier si l'adresse doit être fixée
        if current_address and current_address.startswith('{'):
            fixed_address = parse_address_string(current_address)
            
            if fixed_address != current_address:
                try:
                    update_location(location_id, fixed_address)
                    print(f"✅ Fixé: {location_id}")
                    print(f"   Avant: {current_address[:100]}...")
                    print(f"   Après: {fixed_address[:100]}...")
                    fixed_count += 1
                except Exception as e:
                    print(f"❌ Erreur mise à jour {location_id}: {e}")
                    error_count += 1
    
    print(f"\n===== RÉSUMÉ =====")
    print(f"Total fixées: {fixed_count}")
    print(f"Erreurs: {error_count}")

if __name__ == "__main__":
    main()
