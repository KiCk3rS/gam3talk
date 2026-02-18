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

def create_item(endpoint, data):
    try:
        response = requests.post(f"{STRAPI_API_URL}/api/{endpoint}", headers=headers, json={"data": data})
        if response.status_code in [200, 201]:
            print(f"Created {data['name']} in {endpoint}")
        else:
            print(f"Failed to create {data['name']} in {endpoint}: {response.text}")
    except Exception as e:
        print(f"Error creating {data['name']}: {e}")

games = ["Valorant", "League of Legends", "CS2", "Other"]
categories = ["Transfer", "Patch Notes", "Match Result", "General News"]

print("Seeding Games...")
for game in games:
    create_item("games", {"name": game, "slug": game.lower().replace(" ", "-")})

print("\nSeeding Categories...")
for cat in categories:
    create_item("categories", {"name": cat, "slug": cat.lower().replace(" ", "-")})
