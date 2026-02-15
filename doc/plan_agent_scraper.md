# Plan: Agent Scraper (Le Collecteur)

## Objectif
Récupérer automatiquement des données brutes (news, résultats de matchs) depuis des sources externes fiables et les stocker dans Strapi sans altération. Cet agent doit être résilient et "bête".

## Tech Stack
- **Langage**: Python 3.11+
- **Libs**: `requests`, `beautifulsoup4` (ou `playwright` si JS requis), `pydantic` (validation), `python-dotenv`.
- **Scheduling**: script CRON ou boucle infinie avec `time.sleep`.

## Architecture
1.  **Sources Manager** : Liste des URLs et configurations (sélecteurs CSS, type de contenu).
2.  **Fetch Engine** : Télécharge le HTML/JSON. Gère les User-Agents, délais (rate limiting), et proxies si nécessaire.
3.  **Parser** : Extrait les données utiles (Titre, Date, URL originale, Contenu brut).
4.  **Strapi Connector** : Envoie les données vers la collection `RawData` de Strapi.

## Sources Cibles (Exemples)
- **News** : Dexerto (Esport section), DotEsports, sites officiels (Riot Games news).
- **Matchs** : Liquipedia (API ou parsing), Pandascore (Free tier), Strafe.

## Workflow du Script
```python
def main():
    sources = load_sources()
    for source in sources:
        try:
            html = fetch(source.url)
            items = parse(html, source.config)
            for item in items:
                if not exists_in_strapi(item.id):
                    push_to_strapi(item)
                    log(f"New item found: {item.title}")
        except Exception as e:
            log_error(e)
```

## Données de Sortie (JSON Structure)
```json
{
  "source_id": "unique_hash_of_url",
  "origin": "dotesports.com",
  "url": "https://...",
  "fetched_at": "2023-10-27T10:00:00Z",
  "type": "news",
  "payload": {
    "title": "...",
    "raw_text": "...",
    "images": ["..."]
  }
}
```

## Étapes d'Implémentation
1.  Setup environnement Python (`apps/agent/scraper`).
2.  Développer le module `fetcher.py`.
3.  Développer les `parsers` spécifiques pour 2 sources tests.
4.  Connecter à l'API Strapi pour l'écriture.
