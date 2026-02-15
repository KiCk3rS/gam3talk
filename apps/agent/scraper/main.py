import time
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
from fetcher import fetch_rss
from parser import parse_entries
from storage import save_batch

# Configuration for sources
SOURCES = [
    {
        "url": "https://www.dexerto.com/league-of-legends/feed",
        "type": "news",
        "interval": 300
    },
    {
        "url": "https://www.dexerto.com/valorant/feed",
        "type": "news",
        "interval": 300
    },
    {
        "url": "https://www.dexerto.com/feed/category/counter-strike-2/",
        "type": "news",
        "interval": 300
    },
    {
        "url": "https://esportimes.com/en/feed/",
        "type": "news",
        "interval": 300
    },
    {
        "url": "https://www.esports.net/feed/",
        "type": "news",
        "interval": 300
    },
    {
        "url": "https://www.global-esports.news/feed/",
        "type": "news",
        "interval": 300
    }
]

def run_scraper():
    print("Starting Scraper Agent...")
    
    for source in SOURCES:
        try:
            print(f"Fetching from {source['url']}...")
            entries = fetch_rss(source['url'])
            
            if not entries:
                print(f"No entries found for {source['url']}")
                continue
                
            print(f"Found {len(entries)} entries. Parsing...")
            data = parse_entries(entries, source['url'], source['type'])
            
            print(f"Saving {len(data)} items...")
            save_batch(data)
            
        except Exception as e:
            print(f"Error processing {source['url']}: {e}")

    print("Scraping cycle completed.")

if __name__ == "__main__":
    # In a real scenario, this might run in a loop with sleep
    # while True:
    #     run_scraper()
    #     time.sleep(600)
    run_scraper()
