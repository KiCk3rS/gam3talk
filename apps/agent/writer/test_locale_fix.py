
import os
import time
import requests
from dotenv import load_dotenv
from strapi_client import StrapiClient

load_dotenv()

def test_article_locale():
    print("Testing Article Locale Fix...")
    strapi = StrapiClient()
    
    # 1. Get necessary IDs (using first available or hardcoded if needed, but better to query)
    author_id = strapi.get_document_id_by_name("authors", "Valro", locale="fr")
    if not author_id:
        print("Error: Author 'Valro' (FR) not found.")
        # Fallback to English if necessary but likely won't work for FR article if strict
        author_id = strapi.get_document_id_by_name("authors", "Valro")
        if not author_id:
             print("Error: Author 'Valro' (EN) not found either.")
             return
        print("Warning: Using EN Author for FR article.")

    # We need a game and category. Let's try to find "Other" or similar.
    # Try to find French game and category
    game_id = strapi.get_document_id_by_name("games", "Other", locale="fr") 
    or_game_id = strapi.get_document_id_by_name("games", "Autre", locale="fr") # Try French name if "Other" doesn't exist
    game_id = game_id or or_game_id
    
    if not game_id:
         # Fallback to English if FR not found, but this might fail the relation check
         # Actually, if the relation requires FR, we must find a FR entity.
         print("Warning: French 'Other' game not found. Trying to list FR games...")
         # ...
    
    # Try to find a category safely
    category_id = None
    try:
        # Fetch FR categories
        resp = requests.get(f"{strapi.api_url}/api/categories?locale=fr", headers=strapi._get_headers())
        if resp.status_code == 200:
            cats = resp.json().get("data", [])
            for c in cats:
                # print(f"DEBUG: Category object: {c}")
                name = c.get('attributes', {}).get('name')
                if not name:
                    name = c.get('name') # v5 flattened structure
                
                print(f"Found category: {name}")
                if name and ("ral" in name or "News" in name or "Générales" in name): # Match General/Générales
                     category_id = c.get("documentId")
                     print(f"Selected category: {name} ({category_id})")
                     break
            
            if not category_id and cats:
                 # Fallback to first category
                 first_cat = cats[0]
                 category_id = first_cat.get("documentId")
                 first_name = first_cat.get('attributes', {}).get('name') or first_cat.get('name')
                 print(f"Fallback to first category: {first_name}")
        else:
             print(f"Failed to list categories: {resp.status_code}")
    except Exception as e:
        print(f"Error finding category: {e}")
        return

    if not category_id:
        print("No category found.")
        return
        try:
            resp = requests.get(f"{strapi.api_url}/api/categories", headers=strapi._get_headers())
            if resp.status_code == 200:
                cats = resp.json().get("data", [])
                for c in cats:
                    print(f" - {c['attributes']['name']} (ID: {c.get('documentId')})")
            else:
                 print(f"Failed to list categories: {resp.status_code}")
        except Exception as e:
            print(f"Error listing categories: {e}")
        return

    if not game_id:
        print(f"Error: Game not found. GameID: {game_id}")
        return

    timestamp = int(time.time())
    title = f"Test Article Locale {timestamp}"
    slug = f"test-article-locale-{timestamp}"
    
    article_payload = {
        "title": title,
        "slug": slug,
        "summary": "Ceci est un article de test pour vérifier la locale.",
        "content": [
            {
                "type": "paragraph",
                "children": [{"type": "text", "text": "Contenu de test en français."}]
            }
        ],
        "game": game_id,
        "category": category_id,
        "author": author_id,
        "publishedAt": None
    }

    print(f"Posting article '{title}' with locale='fr'...")
    response = strapi.post_article(article_payload, locale="fr")

    if response:
        data = response.get("data", {})
        attributes = data.get("attributes", data) # Strapi v4 vs v5 structure might vary slightly in response
        
        # Check locale
        created_locale = attributes.get("locale")
        print(f"Article created. ID: {data.get('id')}, Locale: {created_locale}")
        
        if created_locale == "fr":
            print("SUCCESS: Article created with 'fr' locale.")
        else:
            print(f"FAILURE: Article created with '{created_locale}' locale.")
            
        # Cleanup
        # We need the ID to delete. 
        # StrapiClient doesn't have delete_article, we might need to add it or do raw request.
        # checks if we have documentId for v5
        doc_id = data.get("documentId")
        if doc_id:
            # import requests removed
            headers = strapi._get_headers()
            print(f"Cleaning up article {doc_id}...")
            # Note: Deleting usually requires ID or DocumentID depending on version. 
            # Strapi v5 uses documentId for most things, but let's check.
            # actually cleanup_strapi.py might be useful for reference.
            try:
                # Try delete by document ID
                requests.delete(f"{strapi.api_url}/api/articles/{doc_id}", headers=headers)
                print("Cleanup successful.")
            except Exception as e:
                print(f"Cleanup failed: {e}")

    else:
        print("Failed to create article.")

if __name__ == "__main__":
    test_article_locale()
