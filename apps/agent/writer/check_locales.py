
import os
from dotenv import load_dotenv
import requests
from strapi_client import StrapiClient

load_dotenv()

def check_locales():
    strapi = StrapiClient()
    
    print("Checking 'fr' locale entities...")
    
    # Check Author
    author_id = strapi.get_document_id_by_name("authors", "Valro", locale="fr")
    print(f"Author 'Valro' (fr): {author_id}")
    
    # List all categories in FR to identify correct names
    print("\n--- Listing all Categories in FR ---")
    try:
        headers = strapi._get_headers()
        url = f"{strapi.api_url}/api/categories?locale=fr"
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json().get("data", [])
            for item in data:
                attr = item.get("attributes", {}) # Strapi 5 might not nest attributes if populated differently, but usually it does for lists
                # Strapi 5 often returns flat data if configured, but let's assume attributes wrapper or check keys
                name = item.get("name") or attr.get("name")
                slug = item.get("slug") or attr.get("slug")
                print(f"Category (fr): Name='{name}', Slug='{slug}', DocID='{item.get('documentId')}'")
        else:
            print(f"Failed to fetch categories. Status: {response.status_code}")
    except Exception as e:
        print(f"Error fetching categories: {e}")
        
    # Check Games
    games_to_check = ["League of Legends", "Valorant", "CS2", "Other"]
    for game in games_to_check:
        game_id = strapi.get_document_id_by_name("games", game, locale="fr")
        print(f"Game '{game}' (fr): {game_id}")

if __name__ == "__main__":
    check_locales()
