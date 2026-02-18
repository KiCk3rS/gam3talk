import time
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from strapi_client import StrapiClient
from analyzer import Analyzer

def run_analyzer():
    print("Starting Analyzer Agent...")
    
    # Initialize clients
    try:
        strapi = StrapiClient()
        analyzer = Analyzer()
    except Exception as e:
        print(f"Failed to initialize agents: {e}")
        return

    # Fetch unprocessed data
    print("Fetching unprocessed raw data...")
    raw_items = strapi.get_unprocessed_raw_data(limit=5)
    
    if not raw_items:
        print("No unprocessed items found.")
        return

    print(f"Found {len(raw_items)} items to analyze.")

    for item in raw_items:
        # Strapi 5 uses documentId for operations
        document_id = item.get("documentId")
        item_id = item.get("id") # Keep ID for reference/logging if needed, but actions use documentId
        
        if not document_id:
            print(f"Warning: No documentId found for item {item_id}. Skipping processing update.")
            continue

        print(f"Analyzing item {item_id} (DocID: {document_id})...")
        
        analysis_result = analyzer.analyze(item)
        
        if analysis_result:
            score = analysis_result.get('importanceScore', 0)
            print(f"Analysis successful. Score: {score}")
            
            # Prepare payload for AnalyzedNews
            # Link via documentId
            analysis_result['originalRawData'] = document_id
            
            if score >= 7:
                # Save to Strapi only if score is high enough
                saved = strapi.post_analyzed_news(analysis_result)
                
                if saved:
                    print(f"Saved AnalyzedNews for item {item_id}.")
                    # Mark raw data as processed
                    if strapi.mark_raw_data_processed(document_id):
                        print(f"Marked item {item_id} as processed.")
                    else:
                        print(f"Failed to mark item {item_id} as processed.")
                else:
                    print(f"Failed to save AnalyzedNews for item {item_id}.")
            else:
                print(f"Score {score} is too low (< 7). Skipping save for item {item_id}.")
                # Still mark as processed to avoid re-analyzing
                if strapi.mark_raw_data_processed(document_id):
                    print(f"Marked low-score item {item_id} as processed.")
                else:
                    print(f"Failed to mark low-score item {item_id} as processed.")

        else:
            print(f"Analysis failed for item {item_id}.")

    print("Analyzer cycle completed.")

if __name__ == "__main__":
    # You can run this in a loop or via cron
    run_analyzer()
