import os
import requests
from typing import Optional, Dict, Any, List

class StrapiClient:
    def __init__(self, api_url: str = None, api_token: str = None):
        self.api_url = api_url or os.getenv("STRAPI_API_URL", "http://localhost:1337")
        self.api_token = api_token or os.getenv("STRAPI_API_TOKEN")

    def _get_headers(self) -> Dict[str, str]:
        if not self.api_token:
            return {}
        return {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }

    def get_pending_or_approved_news(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Fetches news where status is 'approved' or 'pending'."""
        try:
            response = requests.get(
                f"{self.api_url}/api/analyzed-news-items",
                headers=self._get_headers(),
                params={
                    "filters[status][$in]": ["approved", "pending"],
                    "filters[importanceScore][$gte]": 7,
                    "pagination[limit]": limit,
                    "sort": "createdAt:asc",
                    "populate": "originalRawData"
                }
            )
            response.raise_for_status()
            return response.json().get("data", [])
        except Exception as e:
            print(f"Error fetching news: {e}")
            return []

    def get_document_id_by_name(self, collection: str, name: str, locale: str = None) -> Optional[str]:
        """Helper to find documentId by name (for Author, Game, Category)."""
        try:
            params = {
                "filters[name][$eq]": name,
            }
            if locale:
                params["locale"] = locale
                
            response = requests.get(
                f"{self.api_url}/api/{collection}",
                headers=self._get_headers(),
                params=params
            )
            response.raise_for_status()
            items = response.json().get("data", [])
            if items:
                return items[0].get("documentId")
            return None
        except Exception as e:
            print(f"Error finding documentId for {name} in {collection}: {e}")
            return None

    def post_article(self, article_data: Dict[str, Any], locale: str = "fr") -> Optional[Dict[str, Any]]:
        """Posts a new article to Strapi."""
        payload = {"data": {**article_data, "locale": locale}}
        try:
            response = requests.post(
                f"{self.api_url}/api/articles?locale={locale}", 
                headers=self._get_headers(),
                json=payload
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error posting article: {e}")
            if hasattr(e, 'response') and e.response is not None:
                 print(f"Response: {e.response.text}")
            return None

    def update_analyzed_news_status(self, document_id: str, status: str) -> bool:
        """Updates the status of an analyzed news item."""
        payload = {"data": {"status": status}}
        try:
            response = requests.put(
                f"{self.api_url}/api/analyzed-news-items/{document_id}",
                headers=self._get_headers(),
                json=payload
            )
            response.raise_for_status()
            return True
        except Exception as e:
            print(f"Error updating analyzed news status: {e}")
            return False
