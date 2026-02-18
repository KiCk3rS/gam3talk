import time
from datetime import datetime
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from strapi_client import StrapiClient
from writer import Writer

def run_writer():
    print("Starting Writer Agent...")
    
    try:
        strapi = StrapiClient()
        writer = Writer()
    except Exception as e:
        print(f"Failed to initialize agents: {e}")
        return

    # 1. Get Author ID (Valro)
    author_doc_id = strapi.get_document_id_by_name("authors", "Valro", locale="fr")
    if not author_doc_id:
        print("Author 'Valro' not found. Please create it first.")
        return

    # 2. Fetch approved or pending analyzed news
    print("Fetching approved or pending analyzed news...")
    news_items = strapi.get_pending_or_approved_news(limit=5)
    
    if not news_items:
        print("No news items to process.")
        return

    print(f"Found {len(news_items)} items to process.")

    for item in news_items:
        attrs = item.get("attributes", item)
        score = attrs.get("importanceScore", 0)
        
        if score < 7:
            print(f"Skipping item {item.get('id')} (Score: {score} too low)")
            continue

        document_id = item.get("documentId")
        item_id = item.get("id")
        
        print(f"Writing article for item {item_id} (DocID: {document_id})...")
        
        # Original source data from populated relation
        source_data = attrs.get("originalRawData")
        
        # Generate article
        article_data = writer.write_article(item, source_data)
        
        if article_data:
            print(f"Article generated: {article_data.get('title')}")
            
            # Map Game and Category to documentIds (FR)
            game_name = attrs.get("game", "Other")
            content_type = attrs.get("contentType", "General News")
            
            # Mapping English API types to French Strapi names
            CATEGORY_MAPPING = {
                "Transfer": "Transfert",
                "Patch Notes": "Notes de Patch",
                "Match Result": "Résultat de Match",
                "General News": "Actualités Générales"
            }
            
            # Use mapped name or fallback to original
            fr_category_name = CATEGORY_MAPPING.get(content_type, content_type)
            
            # Fetch relations in FR locale
            game_doc_id = strapi.get_document_id_by_name("games", game_name, locale="fr")
            category_doc_id = strapi.get_document_id_by_name("categories", fr_category_name, locale="fr")
            
            if not game_doc_id:
                print(f"Warning: Game '{game_name}' not found in FR. Defaulting to 'Other'...")
                game_doc_id = strapi.get_document_id_by_name("games", "Other", locale="fr")

            if not category_doc_id:
                print(f"Warning: Category '{fr_category_name}' not found in FR.")
                # Could set a valid default if known, or let it fail
            
            # Prepare full article payload
            title = article_data.get("title")
            slug = title.lower().replace(" ", "-").replace("'", "-").replace("\"", "")
            # Basic slug cleanup
            import re
            slug = re.sub(r'[^a-z0-9-]', '', slug)
            slug = re.sub(r'-+', '-', slug).strip('-')

            full_article = {
                "title": title,
                "slug": slug,
                "summary": article_data.get("summary"),
                "content": article_data.get("blocks"),
                "game": game_doc_id,
                "category": category_doc_id,
                "author": author_doc_id,
                "publishedAt": None, 
            }
            
            # Save to Strapi
            saved = strapi.post_article(full_article, locale="fr")
            
            if saved:
                print(f"Article saved successfully for item {item_id}. Response: {json.dumps(saved)}")
                # Update AnalyzedNews status to avoid double processing
                if strapi.update_analyzed_news_status(document_id, "written"):
                    print(f"Marked AnalyzedNews {item_id} as written.")
                else:
                    print(f"Failed to update AnalyzedNews {item_id} status.")
            else:
                print(f"Failed to save article for item {item_id}.")
        else:
            print(f"Failed to generate article for item {item_id}.")

    print("Writer cycle completed.")

if __name__ == "__main__":
    run_writer()
