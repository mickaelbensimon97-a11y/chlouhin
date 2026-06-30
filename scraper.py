import requests
from dotenv import load_dotenv
import os
import time

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

def insert_supabase(data):
    """Insertion dans Supabase via API REST"""
    try:
        url = f"{SUPABASE_URL}/rest/v1/shlouhim"
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        return True
    except Exception as e:
        print(f"Erreur insertion Supabase: {e}")
        return False

# 🔹 API liste centres
list_url = "https://www.chabad.org/api/v2/chabadorg/centers?format=jsonapi&lang=en"

r = requests.get(list_url)

data = r.json()

# 🔹 récupération IDs
# 🔹 reprendre uniquement les erreurs
with open("errors.txt", "r") as f:
    center_ids = [line.strip() for line in f.readlines()]

print("IDs erreurs trouvés :", len(center_ids))

# 🔹 stats
ok = 0
errors = 0
missing_phone = 0

# 🔹 stockage erreurs
error_ids = []

# 🔹 boucle centres
for cid in center_ids:

    try:

        url = f"https://www.chabad.org/api/v2/chabadorg/centers/{cid}?format=jsonapi&lang=en"

        r = requests.get(url, timeout=10)

        if r.status_code != 200:
            errors += 1
            error_ids.append(cid)

            print(f"[HTTP ERROR] {cid}")

            continue

        try:
            d = r.json()

        except:
            errors += 1
            error_ids.append(cid)

            print(f"[JSON ERROR] {cid}")

            continue

        attrs = d.get("data", {}).get("attributes")

        if not attrs:
            errors += 1
            error_ids.append(cid)

            print(f"[NO DATA] {cid}")

            continue

        # 🔹 données avec gestion des valeurs None
        name = attrs.get("name") or ""

        description = attrs.get("description") or ""

        phone_number = attrs.get("phone-number")
        phone = phone_number.get("number") if phone_number else ""

        city = attrs.get("city") or ""

        address_obj = attrs.get("address") or {}

        # Extraction correcte de l'adresse
        street = address_obj.get("street", "") if address_obj else ""
        state = address_obj.get("state", "") if address_obj else ""
        postal_code = address_obj.get("postal-code", "") if address_obj else ""
        country = address_obj.get("country", "") if address_obj else ""

        # Construction de l'adresse complète (sans city car déjà stocké séparément)
        address_parts = [part for part in [street, state, postal_code] if part]
        address = ", ".join(address_parts) if address_parts else ""

        coordinates = attrs.get("coordinates") or {}

        latitude = coordinates.get("latitude") if coordinates else None
        longitude = coordinates.get("longitude") if coordinates else None

        website = attrs.get("url") or ""

        static_url = attrs.get("static-url") or ""

        full_url = ""

        if static_url:
            full_url = "https://www.chabad.org/" + static_url

        # 🔹 stats
        if not phone:
            missing_phone += 1

        # 🔹 insert supabase
        insert_supabase({
            "external_id": str(cid),
            "beth_habad_name": name,
            "phone": phone,
            "location": address,
            "city": city,
            "country": country,
            "latitude": latitude,
            "longitude": longitude,
            "website": website,
            "description": description,
            "chabad_url": full_url
        })

        ok += 1

        print(full_url)
        print(cid)
        print(f"[OK] {name}")

        time.sleep(0.4)

    except Exception as e:

        errors += 1
        error_ids.append(cid)

        print(f"[ERROR] {cid} -> {e}")

# 🔹 sauvegarde erreurs
with open("errors.txt", "w") as f:

    for eid in error_ids:
        f.write(str(eid) + "\n")

# 🔹 résumé final
print("\n===== RÉSUMÉ =====")

print("Total traités :", len(center_ids))
print("Succès :", ok)
print("Erreurs :", errors)
print("Sans téléphone :", missing_phone)

print("errors.txt créé")