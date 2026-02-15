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

    def get_unprocessed_raw_data(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Fetches raw data where processed is false."""
        try:
            response = requests.get(
                f"{self.api_url}/api/raw-datas",
                headers=self._get_headers(),
                params={
                    "filters[processed][$eq]": "false",
                    "pagination[limit]": limit,
                    "sort": "fetchedAt:asc"
                }
            )
            response.raise_for_status()
            return response.json().get("data", [])
        except Exception as e:
            print(f"Error fetching raw data: {e}")
            return []

    def post_analyzed_news(self, analyzed_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Posts analyzed news to Strapi."""
        payload = {"data": analyzed_data}
        try:
            # Note: Endpoint derived from pluralName in schema 'analyzed-news-items'
            response = requests.post(
                f"{self.api_url}/api/analyzed-news-items", 
                headers=self._get_headers(),
                json=payload
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error posting analyzed news: {e}")
            if hasattr(e, 'response') and e.response is not None:
                 print(f"Response: {e.response.text}")
            return None

    def mark_raw_data_processed(self, raw_data_id: int) -> bool:
        """Marks a raw data item as processed."""
        payload = {"data": {"processed": True}}
        try:
            response = requests.put(
                f"{self.api_url}/api/raw-datas/{raw_data_id}",
                headers=self._get_headers(),
                json=payload
            )
            response.raise_for_status()
            return True
        except Exception as e:
            print(f"Error marking raw data as processed: {e}")
            return False
