import os
import json
from dotenv import load_dotenv
from analyzer import Analyzer

# Load environment variables
load_dotenv()

def test_analyzer():
    print("Testing Analyzer Class...")
    try:
        analyzer = Analyzer()
    except Exception as e:
        print(f"Failed to init analyzer: {e}")
        return

    # Mock RawData item
    mock_item = {
        "id": 999,
        "attributes": {
            "rawContent": {
                "source_id": "test_123",
                "type": "news",
                "payload": {
                    "title": "T1 Feyker signs 3-year contract extension",
                    "link": "https://example.com/feyker",
                    "published": "2026-02-15T12:00:00Z",
                    "summary": "Legendary mid laner Feyker has decided to stay with T1 for another 3 years. This comes after rumors of him leaving for LPL.",
                    "content": "Full article text here..."
                }
            }
        }
    }

    print("Analyzing mock item...")
    result = analyzer.analyze(mock_item)
    
    if result:
        print("Analysis Result:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print("Analysis failed.")

if __name__ == "__main__":
    test_analyzer()
