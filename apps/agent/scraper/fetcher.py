import requests
import feedparser
from tenacity import retry, stop_after_attempt, wait_fixed, retry_if_exception_type

# Default User-Agent to avoid being blocked
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

@retry(stop=stop_after_attempt(3), wait=wait_fixed(2), retry=retry_if_exception_type(requests.RequestException))
def fetch_url(url: str) -> str:
    """
    Fetches raw HTML content from a URL with retries.
    """
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        raise

def fetch_rss(url: str):
    """
    Fetches and parses an RSS feed.
    Returns a list of entries.
    """
    # feedparser handles fetching internally, but we can pass headers if needed via 'agent' parameter or by fetching first
    # To be safe and consistent with headers, we can fetch first.
    try:
        content = fetch_url(url)
        feed = feedparser.parse(content)
        if feed.bozo:
            print(f"Warning: Feed {url} might be malformed. Error: {feed.bozo_exception}")
        return feed.entries
    except Exception as e:
        print(f"Error parsing RSS {url}: {e}")
        return []

if __name__ == "__main__":
    # Test with a sample RSS feed
    test_url = "https://www.reddit.com/r/leagueoflegends/hot/.rss"
    entries = fetch_rss(test_url)
    print(f"Fetched {len(entries)} entries from {test_url}")
    if entries:
        print(f"First entry title: {entries[0].title}")
