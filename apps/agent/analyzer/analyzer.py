import os
import json
from typing import Dict, Any, Optional
from anthropic import Anthropic
from pydantic import BaseModel, Field, ValidationError

class AnalysisResult(BaseModel):
    game: str
    contentType: str
    importanceScore: int = Field(ge=1, le=10)
    title: str
    summary: str
    reasoning: str

class Analyzer:
    def __init__(self):
        # We expect ANTHROPIC_API_KEY to be in environment variables (loaded by dotenv in main)
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            # For now, we print a warning, but main.py should handle this.
            print("Warning: ANTHROPIC_API_KEY not found.")
            self.client = None
        else:
            self.client = Anthropic(api_key=api_key)
        
        self.model = "claude-3-haiku-20240307"

    def analyze(self, raw_data_item: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Analyzes a single RawData item (dictionary from Strapi).
        Returns a dictionary matching the AnalysisResult model.
        """
        if not self.client:
            print("Analyzer not initialized (missing API key).")
            return None

        # raw_data_item is the full object from Strapi
        # It has 'attributes' if fetched via standard API, but my strapi_client returns 'data' list items directly?
        # strapi_client.get_unprocessed_raw_data returns response.json().get("data", [])
        # In Strapi v4/v5, data items usually have { id: ..., attributes: { ... } } structure.
        # Let's check strapi_client usage. 
        # Actually, let's include ID for reference but extract payload from attributes.
        
        item_id = raw_data_item.get("id")
        attributes = raw_data_item.get("attributes", raw_data_item) # Fallback if structure is flat
        
        raw_content = attributes.get("rawContent", {})
        # rawContent might be a string (JSON string) or dict depending on how Strapi stores 'json' type.
        # Strapi 'json' type is returned as dict in API.
        
        if isinstance(raw_content, str):
            try:
                raw_content = json.loads(raw_content)
            except json.JSONDecodeError:
                print(f"Failed to parse rawContent JSON for item {item_id}")
                return None

        payload = raw_content.get("payload", {})
        
        # Prepare text for analysis
        title = payload.get("title", "")
        summary = payload.get("summary", "")
        link = payload.get("link", "")
        # content might be HTML, stripping tags could be good but LLM handles it.
        # limit content length to avoid token waste if very long
        content_snippet = str(payload.get("content", ""))[:2000] 
        
        text_to_analyze = f"Title: {title}\nSummary: {summary}\nLink: {link}\nContent Snippet: {content_snippet}"
        
        prompt = f"""You are an expert esports news analyzer for Gam3Talk.
Analyze the following news item and return a JSON object with the following fields:
- game: One of ["Valorant", "League of Legends", "CS2", "Other"] (Infer from content)
- contentType: One of ["Transfer", "Patch Notes", "Match Result", "General News"]
- importanceScore: Integer from 1 to 10 (10 = Major roster move, New Agent/Map, World Championship result; 1 = Minor bug fix, Fluff).
- title: A clean, engaging title in French (translate if necessary). Max 80 chars.
- summary: A concise summary in French (max 2 sentences).
- reasoning: Brief explanation of the score and category (in French or English).

News Item:
{text_to_analyze}

Respond ONLY with the valid JSON object. Do not include markdown code blocks.
"""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                temperature=0,
                system="You are a helpful assistant that outputs only valid JSON.",
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            response_text = message.content[0].text.strip()
            
            # Basic cleanup if markdown format persists
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            data = json.loads(response_text)
            
            # Validate with Pydantic
            validated = AnalysisResult(**data)
            return validated.dict()
            
        except json.JSONDecodeError as e:
            print(f"JSON Parse Error for item {item_id}: {e}")
            print(f"Response was: {response_text}")
            return None
        except ValidationError as e:
            print(f"Validation Error for item {item_id}: {e}")
            return None
        except Exception as e:
            print(f"Analysis Error for item {item_id}: {e}")
            return None
