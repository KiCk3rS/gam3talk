import json
import os
from typing import List
from parser import RawData
from strapi_client import StrapiClient

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data', 'raw')
strapi_client = StrapiClient()

def ensure_data_dir():
    """Ensures the data directory exists."""
    os.makedirs(DATA_DIR, exist_ok=True)

def save_raw_data(data: RawData):
    """
    Saves the RawData object to a JSON file and Strapi.
    The filename is based on the source_id.
    """
    ensure_data_dir()
    filename = f"{data.source_id}.json"
    filepath = os.path.join(DATA_DIR, filename)
    
    # Save locally
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data.dict(), f, indent=4, ensure_ascii=False)
    
    print(f"Saved {data.url} to {filepath}")

    # Save to Strapi
    try:
        strapi_client.post_raw_data(data)
    except Exception as e:
        print(f"Failed to save to Strapi: {e}")

def save_batch(data_list: List[RawData]):
    """Saves a batch of RawData objects."""
    # 1. First, save all to disk (fast and safe)
    print("Saving to local disk...")
    for item in data_list:
        ensure_data_dir()
        filename = f"{item.source_id}.json"
        filepath = os.path.join(DATA_DIR, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(item.dict(), f, indent=4, ensure_ascii=False)
            
    print(f"Saved {len(data_list)} items to disk.")

    # 2. Then, sync to Strapi in parallel
    print("Syncing to Strapi (parallel)...")
    strapi_client.post_batch(data_list)
