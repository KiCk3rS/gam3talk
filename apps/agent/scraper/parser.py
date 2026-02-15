from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
import hashlib
import time

class RawData(BaseModel):
    source_id: str
    origin: str
    url: str
    fetched_at: str
    type: str # 'news', 'match', etc.
    payload: dict

def generate_source_id(url: str) -> str:
    """Generates a unique ID based on the URL."""
    return hashlib.md5(url.encode('utf-8')).hexdigest()

def normalize_rss_entry(entry, source_url: str, content_type: str = "news") -> RawData:
    """
    Converts a feedparser entry into a RawData object.
    """
    # Extract domain from source_url for 'origin'
    from urllib.parse import urlparse
    domain = urlparse(source_url).netloc

    # Extract image if available (media_content, media_thumbnail, or description parsing)
    images = []
    # Extract image if available
    images = []
    
    # Priority 1: media_content (Standard RSS extension)
    if 'media_content' in entry:
        images.extend([m['url'] for m in entry.media_content if 'url' in m])
        
    # Priority 2: media_thumbnail
    if 'media_thumbnail' in entry:
        images.extend([m['url'] for m in entry.media_thumbnail if 'url' in m])
        
    # Priority 3: Extract from content/summary (common for Reddit/some feeds)
    if not images:
        import re
        content_html = entry.get('content', [{'value': ''}])[0]['value'] if 'content' in entry else entry.get('summary', '')
        # Simple regex to find img src
        img_matches = re.findall(r'<img[^>]+src="([^">]+)"', content_html)
        if img_matches:
             images.extend(img_matches)

    # Clean up Dexerto images (often have query params resizing them)
    # Example: .../image.jpg?width=1080&quality=75 -> .../image.jpg
    if domain == "www.dexerto.com":
         cleaned_images = []
         for img in images:
             if '?' in img:
                 cleaned_images.append(img.split('?')[0])
             else:
                 cleaned_images.append(img)
         images = cleaned_images
    
    # Create payload
    payload = {
        "title": entry.get('title', ''),
        "link": entry.get('link', ''),
        "published": entry.get('published', '') or entry.get('updated', ''),
        "summary": entry.get('summary', ''),
        "content": entry.get('content', [{'value': ''}])[0]['value'] if 'content' in entry else '',
        "images": images,
        "author": entry.get('author', '')
    }

    return RawData(
        source_id=generate_source_id(entry.get('link', '')),
        origin=domain,
        url=entry.get('link', ''),
        fetched_at=datetime.utcnow().isoformat() + "Z",
        type=content_type,
        payload=payload
    )

def parse_entries(entries, source_url: str, content_type: str = "news") -> List[RawData]:
    results = []
    for entry in entries:
        try:
            data = normalize_rss_entry(entry, source_url, content_type)
            results.append(data)
        except Exception as e:
            print(f"Error parsing entry {entry.get('link', 'unknown')}: {e}")
    return results
