import os
from dotenv import load_dotenv
from strapi_client import StrapiClient
from parser import RawData
from datetime import datetime

# Load env variables
load_dotenv()

def test_strapi_connection():
    print("Testing Strapi Connection...")
    
    client = StrapiClient()
    if not client.api_token:
        print("Error: STRAPI_API_TOKEN not found in environment variables.")
        return

    # Create a dummy RawData object
    dummy_data = RawData(
        source_id="test_entry_" + str(int(datetime.now().timestamp())),
        origin="test_script",
        url="http://test.com/entry",
        fetched_at=datetime.now().isoformat(),
        type="test",
        payload={
            "title": "Test Entry",
            "summary": "This is a test entry to verify Strapi integration."
        }
    )

    print(f"Attempting to post item: {dummy_data.source_id}")
    result = client.post_raw_data(dummy_data)
    
    if result:
        print("✅ Successfully posted to Strapi!")
        print(f"Response: {result}")
    else:
        print("❌ Failed to post to Strapi.")

if __name__ == "__main__":
    test_strapi_connection()
