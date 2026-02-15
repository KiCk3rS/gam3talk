# Plan: Agent Journaliste (Le Rédacteur)

## Objectif
Transformer les données brutes (`RawData`) stockées par le Scraper en articles de qualité, engageants, traduits et formatés pour le site Gam3Talk.

## Tech Stack
- **Langage**: Python 3.11+
- **IA Core**: LangChain ou appel direct OpenAI API / Anthropic API.
- **Modèles**: GPT-4o (haute qualité) ou GPT-3.5-turbo/Claude-Haiku (coût réduit/rapidité).

## Architecture
1.  **Watcher / Poller** : Surveille Strapi pour de nouvelles entrées dans `RawData` où `processed = false`.
2.  **Editorial Brain (LLM)** :
    - Analyse le contenu brut.
    - Détermine la pertinence (Score 0-100). Si < 50, ignore.
    - IDENTIFICATION : Jeu concerné, Équipes, Joueurs.
3.  **Writer (LLM)** :
    - Rédige un titre "Catchy".
    - Rédige un résumé (chapô).
    - Rédige l'article complet en Markdown structuré.
    - Traduit en Français (et Espagnol plus tard).
4.  **Publisher** :
    - Crée une entrée dans la collection `Article` de Strapi.
    - Upload l'image (ou en génère une via DALL-E si absente).
    - Marque le `RawData` comme `processed = true`.

## Prompts & Persona
> "Tu es un rédacteur Esport expert pour Gam3Talk. Ton ton est dynamique, professionnel mais accessible aux gamers. Tu dois synthétiser cette news pour qu'elle soit lue en 2 minutes. Focus sur l'impact pour la scène compétitive."

## Workflow
1.  `GET /raw-data?filters[processed]=false`
2.  Pour chaque item :
    *   **Step 1 (Analysis)**: "De quoi ça parle ? Est-ce important ?"
    *   **Step 2 (Drafting)**: Génération du contenu EN & FR.
    *   **Step 3 (Tagging)**: Associer aux bonnes catégories (LoL, Valorant...).
    *   **Step 4 (Publishing)**: `POST /articles` (Status: Draft ou Published selon confiance).
    *   **Step 5 (Cleanup)**: `PUT /raw-data/{id}` -> `processed: true`.

## Étapes d'Implémentation
1.  Setup environnement Python (`apps/agent/journalist`).
2.  Configuration des clés API (OpenAI, Strapi).
3.  Développement des Prompts (System Prompts).
4.  Logique de traitement de la queue (Queue processing).
