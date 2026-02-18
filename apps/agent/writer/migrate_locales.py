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

def migrate_collection(collection_name):
    # 1. Fetch items with locale=en
    try:
        response = requests.get(f"{STRAPI_API_URL}/api/{collection_name}?locale=en", headers=headers)
        response.raise_for_status()
        items = response.json().get("data", [])
        
        print(f"Found {len(items)} items in '{collection_name}' with 'en' locale.")
        
        for item in items:
            doc_id = item.get("documentId")
            name = item.get("name") or item.get("title")
            print(f"Migrating {collection_name} '{name}' (DocID: {doc_id}) to 'fr' locale...")
            
            # 2. Update locale to 'fr'
            update_response = requests.put(
                f"{STRAPI_API_URL}/api/{collection_name}/{doc_id}",
                headers=headers,
                json={"data": {"locale": "fr"}}
            )
            
            if update_response.status_code in [200, 204]:
                print(f"Successfully migrated '{name}'")
            else:
                print(f"Failed to migrate '{name}': {update_response.text}")
                
    except Exception as e:
        print(f"Error during migration of {collection_name}: {e}")

if __name__ == "__main__":
    migrate_collection("articles")
    migrate_collection("categories")
    migrate_collection("games")
    migrate_collection("authors")
