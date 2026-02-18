import os
import requests
from dotenv import load_dotenv

load_dotenv()

STRAPI_API_URL = os.getenv("STRAPI_API_URL", "http://localhost:1337")
STRAPI_API_TOKEN = os.getenv("STRAPI_API_TOKEN")

headers = {
    "Authorization": f"Bearer {STRAPI_API_TOKEN}",
    "Content-Type": "application/json"
}

def cleanup_collision(slug):
    """Delete categories with this slug in EN locale (cleanup bad seeds)."""
    if not slug:
        return
    try:
        # Strapi's default locale is 'en' if not specified, but explicitly setting it is safer.
        # We need to query by documentId for deletion, so first find the items.
        response = requests.get(f"{STRAPI_API_URL}/api/categories?filters[slug][$eq]={slug}&locale=en", headers=headers)
        if response.status_code == 200:
            items = response.json().get("data", [])
            for item in items:
                # Strapi v4 uses 'id' for the item identifier, not 'documentId'
                item_id = item['id']
                print(f"Deleting existing EN item matching FR slug: {item['attributes']['name']} ({item_id})")
                delete_response = requests.delete(f"{STRAPI_API_URL}/api/categories/{item_id}", headers=headers)
                if delete_response.status_code == 200:
                    print(f"Successfully deleted item {item_id}.")
                else:
                    print(f"Failed to delete item {item_id}: {delete_response.text}")
        else:
            print(f"Failed to query for cleanup slug {slug}: {response.text}")
    except Exception as e:
        print(f"Error cleaning up {slug}: {e}")

def create_item(endpoint, data):
    # Only for categories now
    
    # 1. Cleanup potential bad data from previous runs (French names in EN locale)
    if endpoint == "categories":
        cleanup_collision(data.get("slug"))
        cleanup_collision(data.get("slug") + "-fr") # Check for potential -fr suffix from previous collision handling

    # 2. Create as new item with locale=fr
    # URL parameter is required to force locale if i18n plugin default detection is tricky
    data["locale"] = "fr"
    
    try:
        response = requests.post(f"{STRAPI_API_URL}/api/{endpoint}?locale=fr", headers=headers, json={"data": data})
        if response.status_code in [200, 201]:
            print(f"Created {data['name']} in {endpoint} (FR)")
        else:
            # If slug collision (400), try appending -fr
            if response.status_code == 400 and "unique" in response.text:
                 print(f"Slug collision for {data['name']}, retrying with -fr suffix...")
                 data["slug"] = f"{data['slug']}-fr"
                 response = requests.post(f"{STRAPI_API_URL}/api/{endpoint}?locale=fr", headers=headers, json={"data": data})
                 if response.status_code in [200, 201]:
                     print(f"Created {data['name']} in {endpoint} (FR) with new slug")
                 else:
                     print(f"Failed to create {data['name']} in {endpoint}: {response.text}")
            else:
                print(f"Failed to create {data['name']} in {endpoint}: {response.text}")

    except Exception as e:
        print(f"Error creating {data['name']}: {e}")

# Games skipped as requested
games = ["Valorant", "League of Legends", "CS2", "Other"]

categories = {
    "Transfer": "Transfert", 
    "Patch Notes": "Notes de Patch", 
    "Match Result": "Résultat de Match", 
    "General News": "Actualités Générales"
}

print("Seeding Games (FR)...")
for game in games:
    create_item("games", {"name": game, "slug": game.lower().replace(" ", "-")})

print("\nSeeding Categories (FR)...")
for en_name, fr_name in categories.items():
    # Use English slug to try to match or just a new slug? 
    # Usually we want same slug or localized slug. Let's use localized slug for now.
    # Actually, for category mapping in frontend, we might rely on English slug or ID. 
    # But let's create them first.
    slug = fr_name.lower().replace(" ", "-").replace("é", "e").replace("è", "e").replace("à", "a")
    create_item("categories", {"name": fr_name, "slug": slug})

print("\nSeeding Author (FR)...")
# Check if Valro exists in FR, if not create
# Note: Author schema might not have slug, just name.
# Let's use create_item but we might need to adjust for Author schema (it has name, bio, avatar).
# For now, just name and bio.
author_data = {
    "name": "Valro",
    "bio": "Rédacteur IA Expert"
}
# We can repurpose create_item but it expects slug for cleanup. 
# Author doesn't seem to have slug based on schema, just Name.
# So we'll just try to create it.
try:
    # First check if exists
    chk = requests.get(f"{STRAPI_API_URL}/api/authors?filters[name][$eq]=Valro&locale=fr", headers=headers)
    if chk.status_code == 200 and not chk.json().get("data"):
         print("Creating Author Valro (FR)...")
         resp = requests.post(f"{STRAPI_API_URL}/api/authors?locale=fr", headers=headers, json={"data": {"name": "Valro", "bio": "Rédacteur IA Expert", "locale": "fr"}})
         if resp.status_code in [200, 201]:
             print("Author Valro created.")
         else:
             print(f"Failed to create Author: {resp.text}")
    else:
        print("Author Valro (FR) already exists or error checking.")
except Exception as e:
    print(f"Error checking/creating author: {e}")
