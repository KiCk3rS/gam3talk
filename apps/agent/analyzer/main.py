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
        item_id = item.get("id")
        print(f"Analyzing item {item_id}...")
        
        analysis_result = analyzer.analyze(item)
        
        if analysis_result:
            print(f"Analysis successful. Score: {analysis_result.get('importanceScore')}")
            
            # Prepare payload for AnalyzedNews
            # We need to link the originalRawData
            # Strapi relations often expect just the ID or { id: ID }
            analysis_result['originalRawData'] = item_id
            
            # Save to Strapi
            saved = strapi.post_analyzed_news(analysis_result)
            
            if saved:
                print(f"Saved AnalyzedNews for item {item_id}.")
                # Mark raw data as processed
                if strapi.mark_raw_data_processed(item_id):
                    print(f"Marked item {item_id} as processed.")
                else:
                    print(f"Failed to mark item {item_id} as processed.")
            else:
                print(f"Failed to save AnalyzedNews for item {item_id}.")
        else:
            print(f"Analysis failed for item {item_id}.")

    print("Analyzer cycle completed.")

if __name__ == "__main__":
    # You can run this in a loop or via cron
    run_analyzer()
