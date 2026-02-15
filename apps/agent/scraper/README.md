# AI Scraper Agent

This agent scrapes data from configured sources (e.g., Reddit RSS) and stores it as raw JSON data.

## Prerequisites

- Python 3.10+
- `pip` (Python package manager)

## Setup

1.  Navigate to the project root.
2.  Install dependencies:
    ```resh
    pip install -r apps/agent/scraper/requirements.txt
    ```

## Usage

Run the scraper:

```bash
python apps/agent/scraper/main.py
```

## Output

Data is saved to `apps/agent/scraper/data/raw/{source_id}.json`.

## Configuration

Edit `apps/agent/scraper/main.py` to add more sources to the `SOURCES` list.
