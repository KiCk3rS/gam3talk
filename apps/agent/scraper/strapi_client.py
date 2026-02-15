import os
import requests
from typing import Optional, Dict, Any

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

    def post_raw_data(self, data: Any) -> Optional[Dict[str, Any]]:
        """
        Posts raw data to Strapi.
        Checks if the source_id already exists to update or skip.
        Currently assuming 'raw-datas' collection.
        """
        if not self.api_token:
            print("Warning: STRAPI_API_TOKEN not set. Skipping Strapi upload.")
            return None

        source_id = data.source_id
        
        # Check if exists
        existing = self._get_existing(source_id)
        if existing:
            print(f"Item {source_id} already exists in Strapi. Skipping.")
            return existing

        # Create new
        payload = {
            "data": {
                "sourceId": source_id,
                "rawContent": data.dict(),
                "processed": False,
                "fetchedAt": data.fetched_at
            }
        }

        try:
            response = requests.post(
                f"{self.api_url}/api/raw-datas",
                headers=self._get_headers(),
                json=payload
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error posting to Strapi: {e}")
            if response is not None:
                print(f"Response content: {response.text}")
            return None

    def _get_existing(self, source_id: str) -> Optional[Dict[str, Any]]:
        try:
            response = requests.get(
                f"{self.api_url}/api/raw-datas",
                headers=self._get_headers(),
                params={
                    "filters[sourceId][$eq]": source_id
                }
            )
            response.raise_for_status()
            results = response.json().get("data", [])
            if results:
                return results[0]
            return None
        except requests.exceptions.RequestException as e:
            print(f"Error checking existing item in Strapi: {e}")
            return None

    def post_batch(self, data_list: list, max_workers: int = 5):
        """
        Posts a batch of data to Strapi in parallel.
        """
        import concurrent.futures
        
        results = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            # Map the post_raw_data function to the data_list
            future_to_data = {executor.submit(self.post_raw_data, item): item for item in data_list}
            
            for future in concurrent.futures.as_completed(future_to_data):
                item = future_to_data[future]
                try:
                    result = future.result()
                    results.append(result)
                except Exception as exc:
                    print(f"Item {item.source_id} generated an exception: {exc}")
        
        return results
