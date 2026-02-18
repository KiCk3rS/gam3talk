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

def cleanup():
    # 1. Delete all articles in 'en' locale
    try:
        response = requests.get(f"{STRAPI_API_URL}/api/articles?locale=en", headers=headers)
        response.raise_for_status()
        articles = response.json().get("data", [])
        print(f"Deleting {len(articles)} articles in 'en' locale...")
        for article in articles:
            doc_id = article.get("documentId")
            res = requests.delete(f"{STRAPI_API_URL}/api/articles/{doc_id}", headers=headers)
            if res.status_code in [200, 204]:
                print(f"Deleted article {doc_id}")
            else:
                print(f"Failed to delete {doc_id}: {res.text}")
    except Exception as e:
        print(f"Error deleting articles: {e}")

    # 2. Reset AnalyzedNewsItems status to 'approved'
    try:
        response = requests.get(f"{STRAPI_API_URL}/api/analyzed-news-items?filters[status][$eq]=written", headers=headers)
        response.raise_for_status()
        items = response.json().get("data", [])
        print(f"Resetting {len(items)} analyzed news items to 'approved'...")
        for item in items:
            doc_id = item.get("documentId")
            res = requests.put(f"{STRAPI_API_URL}/api/analyzed-news-items/{doc_id}", headers=headers, json={"data": {"status": "approved"}})
            if res.status_code in [200, 204]:
                print(f"Reset item {doc_id}")
            else:
                print(f"Failed to reset {doc_id}: {res.text}")
    except Exception as e:
        print(f"Error resetting news: {e}")

if __name__ == "__main__":
    cleanup()
