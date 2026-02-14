# Gam3Talk

Gam3Talk est une plateforme dédiée aux actualités e-sport et aux calendriers de matchs.

## Technologies

### Frontend (`apps/web`)
- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript, React 19
- **Style**: Tailwind CSS v4, Shadcn UI
- **Internationalisation**: next-intl (Support pour EN, FR, ES)
- **Thème**: Light / Dark mode via next-themes

### Backend (`apps/api`)
- **Framework**: FastAPI (Python)
- **IA Integration**: LangChain, OpenAI
- **Scripting**: Python

## Structure du Projet

Le projet est organisé comme un monorepo avec les dossiers suivants :

- `apps/web`: L'application frontend Next.js.
- `apps/api`: Le service backend API.
- `packages`: (Réservé pour les bibliothèques partagées, si applicable).

## Installation et Démarrage

### Prérequis
- Node.js (v20 ou supérieur recommandé)
- Python (v3.10 ou supérieur recommandé)

### Frontend (Web)

1. Naviguez dans le dossier web :
   ```bash
   cd apps/web
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

### Backend (API)

1. Naviguez dans le dossier api :
   ```bash
   cd apps/api
   ```

2. (Optionnel) Créez et activez un environnement virtuel :
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. Installez les dépendances :
   ```bash
   pip install -r requirements.txt
   ```

4. Lancez le serveur API :
   ```bash
   uvicorn main:app --reload
   ```
   L'API sera accessible sur `http://localhost:8000`.

## Fonctionnalités Clés

- **Actualités et Matchs**: Visualisez les dernières nouvelles et les matchs à venir.
- **Internationalisation**: Le site est disponible en plusieurs langues.
- **Thème Sombre**: Interface utilisateur adaptée aux préférences de l'utilisateur.
