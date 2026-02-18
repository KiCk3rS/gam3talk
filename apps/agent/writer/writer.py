import os
import json
from typing import List, Dict, Any, Optional
from anthropic import Anthropic
from pydantic import BaseModel, Field

class ArticleOutput(BaseModel):
    title: str
    summary: str
    blocks: List[Dict[str, Any]]

class Writer:
    def __init__(self):
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            print("Warning: ANTHROPIC_API_KEY not found.")
            self.client = None
        else:
            self.client = Anthropic(api_key=api_key)
        
        self.model = "claude-3-haiku-20240307" 

    def write_article(self, analyzed_news: Dict[str, Any], source_data: Dict[str, Any] = None) -> Optional[Dict[str, Any]]:
        """
        Generates a full article based on analyzed news data and original source content.
        """
        if not self.client:
            return None

        attributes = analyzed_news.get("attributes", analyzed_news)
        news_title = attributes.get("title", "")
        news_summary = attributes.get("summary", "")
        game = attributes.get("game", "Other")
        content_type = attributes.get("contentType", "General News")
        
        source_text = ""
        if source_data:
            payload = source_data.get("rawContent", {}).get("payload", {})
            source_url = payload.get("link", "URL non disponible")
            source_content = payload.get("content", "Contenu non disponible")
            source_text = f"\nSOURCE ARTICLE (LINK: {source_url}):\n{source_content[:4000]}" # Limiting to 4000 chars

        prompt = f"""Tu es un rédacteur expert en esport pour le site Gam3Talk. 
Ton objectif est d'écrire un article complet en français basé sur une analyse préliminaire ET le contenu source original.

--- ANALYSE PRÉLIMINAIRE ---
Titre suggéré : {news_title}
Résumé : {news_summary}
Jeu : {game}
Type de contenu : {content_type}

--- SOURCE ORIGINALE ---
{source_text}

--- INSTRUCTIONS ---
1. Vérifie les informations de la source originale pour assurer l'exactitude des faits.
2. L'article doit être structuré de manière fluide avec une introduction, plusieurs paragraphes de corps de texte et une conclusion.
3. Le ton doit être journalistique mais accessible aux fans.

IMPORTANT: Tu dois répondre au format JSON avec les champs suivants :
- "title": Le titre final de l'article (captivant).
- "summary": Un résumé d'un paragraphe (environ 2-3 phrases).
- "blocks": Une liste d'objets au format "Strapi Blocks". 

Format des blocs Strapi attendu (UTILISE UNIQUEMENT CES TYPES) :
- Paragraphe: {{ "type": "paragraph", "children": [ {{ "type": "text", "text": "Le texte ici..." }} ] }}
- Titre (H2): {{ "type": "heading", "level": 2, "children": [ {{ "type": "text", "text": "Mon intertitre" }} ] }}
- Liste: {{ "type": "list", "format": "unordered", "children": [ {{ "type": "list-item", "children": [ {{ "type": "text", "text": "Elément" }} ] }} ] }}

IMPORTANT: N'utilise JAMAIS de types personnalisés comme "conclusion", "intro" ou "image". Tout doit être un "paragraph", "heading" ou "list".

Exemple de structure de "blocks":
[
  {{ "type": "paragraph", "children": [ {{ "type": "text", "text": "L'introduction..." }} ] }},
  {{ "type": "heading", "level": 2, "children": [ {{ "type": "text", "text": "Le coeur du sujet" }} ] }},
  {{ "type": "paragraph", "children": [ {{ "type": "text", "text": "Le détail des informations..." }} ] }}
]

Réponds UNIQUEMENT avec le JSON valide, sans texte additionnel.
"""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=2000,
                temperature=0.7,
                system="Tu es un assistant qui génère uniquement du contenu JSON valide pour Strapi.",
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            response_text = message.content[0].text.strip()
            
            # Cleanup common markdown hurdles
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            data = json.loads(response_text)
            
            # Sanitize blocks to ensure Strapi compatibility
            if "blocks" in data:
                data["blocks"] = self._sanitize_blocks(data["blocks"])
                
            return data
            
        except Exception as e:
            print(f"Error during article writing: {e}")
            return None

    def _sanitize_blocks(self, blocks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Ensures all blocks have valid Strapi types."""
        valid_types = ["paragraph", "heading", "list", "image", "quote", "code"]
        sanitized = []
        
        for block in blocks:
            b_type = block.get("type", "paragraph")
            
            # Remap common hallucinations
            if b_type in ["introduction", "conclusion", "outro"]:
                block["type"] = "paragraph"
            elif b_type not in valid_types:
                # Fallback for unknown types
                block["type"] = "paragraph"
                
            # Ensure children exist for paragraph/heading
            if block["type"] in ["paragraph", "heading"] and "children" not in block:
                block["children"] = [{"type": "text", "text": ""}]
                
            sanitized.append(block)
            
        return sanitized
