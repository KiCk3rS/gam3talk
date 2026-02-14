# Stack Technique - Projet Esport AI Automation

Ce document détaille les choix technologiques pour la plateforme d'actualité esport automatisée. L'objectif est de maximiser la flexibilité, la performance et l'intégration des outils IA.

## 1. Architecture Générale
L'architecture repose sur une approche micro-services / agents autonomes orchestrés.
- **Frontend** : Site web statique/dynamique pour l'affichage des articles.
- **Backend / API** : API centrale pour gérer les contenus, les utilisateurs et les webhooks.
- **Agents AI** : Workers autonomes pour la veille, la rédaction et la création média.
- **Base de Données** : Stockage des articles, métadonnées, logs d'agents.

## 2. Technologies Choisies

### A. Frontend (Site Web)
- **Framework** : **Next.js 14+ (App Router)**.
    - *Pourquoi ?* : Performance (SSR/SSG), SEO excellent, écosystème React riche.
- **Langage** : **TypeScript**.
- **Styling** : **Tailwind CSS v4**.
    - *Pourquoi ?* : Performance accrue, nouvelle syntaxe, standard moderne (demandé explicitement).
- **Composants UI** : **shadcn/ui** avec **Base UI**.
    - *Pourquoi ?* : Primitives robustes et accessibles (Base UI), design premium et personnalisable.

### B. Backend & API
- **Framework** : **FastAPI (Python)**.
    - *Pourquoi ?* : Performance (géré par Starlette), documentation automatique (Swagger), et surtout **intégration native avec l'écosystème IA (Python)**.
- **Alternative** : Node.js (Express/NestJS) si l'équipe préfère le JS full-stack, mais Python est recommandé pour la synergie avec les agents IA.

### C. Agents IA & Automatisation
- **Langage** : **Python**.
- **Framework Orchestration** : **LangChain** ou **CrewAI**.
    - *Pourquoi ?* : Facilite la création de chaines complexes (Veille -> Résumé -> Écriture -> Média).
- **Modèles LLM** :
    - **OpenAI GPT-4o** (pour la qualité rédactionnelle et le raisonnement complexe).
    - **Anthropic Claude 3.5 Sonnet** (pour la rédaction nuancée et le code).
    - **Local LLM (Ollama/Mistral)** (pour les tâches simples de classification ou extraction à moindre coût).

### D. Base de Données
- **Base Principale** : **PostgreSQL** (Local via Docker).
    - *Pourquoi ?* : Solution robuste, standard de l'industrie, idéale pour l'hébergement on-premise/VPS.
- **Vector DB (Optionnel)** : **ChromaDB** ou **pgvector** (extension PostgreSQL).

### E. Outils Média
- **Génération Image** : **DALL-E 3** (via API OpenAI) ou **Midjourney** (via Discord/API officieuse).
- **Génération Voix** : **ElevenLabs**.
- **Montage Vidéo** :
    - **FFmpeg** (piloté par Python).
    - **MoviePy** (librairie Python simple).
    - **Remotion** (si montage via React/JS est préféré).

## 3. Infrastructure & Déploiement
- **Type d'Hébergement** : **Auto-hébergé sur VPS**.
- **Gestionnaire de Déploiement** : **Coolify**.
    - *Pourquoi ?* : Alternative open-source puissante à Vercel/Heroku, gère le CI/CD, les bases de données et les Dockerfiles automatiquement.

## 4. Structure du Projet (Monorepo Simple)
```
/
├── apps/
│   ├── web/            # Next.js Frontend
│   └── api/            # FastAPI Backend
├── packages/           # Code partagé (types, utils)
├── agents/             # Scripts et Agents Python
│   ├── news_scraper/
│   ├── content_writer/
│   └── video_creator/
├── doc/                # Documentation
└── docker-compose.yml  # Pour le dev local
```
