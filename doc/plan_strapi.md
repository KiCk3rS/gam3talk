# Plan: Strapi CMS Setup

## Objectif
Mettre en place un Headless CMS robuste pour centraliser toutes les données de Gam3Talk (Articles, Matchs, Jeux). Il servira de source de vérité pour le Frontend et de destination pour les Agents IA.

## Tech Stack
- **Core**: Strapi v5 (Community Edition)
- **Base de données**: PostgreSQL
- **Langage**: TypeScript

## Modèle de Données (Content Types)

### 1. Collection Types
Ces types stockent des listes d'entrées.

**Article**
- `title` (Text, Required, Translatable)
- `slug` (UID, targetField: title, Required)
- `content` (Rich Text / Blocks, Translatable)
- `summary` (Text, Long, Translatable)
- `coverImage` (Media, Single)
- `publishedAt` (Datetime)
- `author` (Relation -> Author)
- `category` (Relation -> Category)
- `game` (Relation -> Game)
- `sourceUrl` (Text, Private) - Pour traçabilité

**Match**
- `teamHome` (Text)
- `teamAway` (Text)
- `scoreHome` (Integer)
- `scoreAway` (Integer)
- `date` (Datetime)
- `tournament` (Text)
- `status` (Enum: Scheduled, Live, Finished)
- `game` (Relation -> Game)

**RawData** (Tampon pour les Agents)
- `sourceId` (Text, Unique)
- `rawContent` (JSON)
- `processed` (Boolean, Default: false)
- `fetchedAt` (Datetime)

### 2. Single Types
Pour les pages uniques ou configurations globales.

**Global**
- `siteName` (Text)
- `defaultSeo` (Component)

### 3. Taxonomies
**Category**
- `name` (Text)
- `slug` (UID)

**Game**
- `name` (Text)
- `slug` (UID)
- `icon` (Media)

**Author**
- `name` (Text)
- `bio` (Text)
- `avatar` (Media)

## Configuration
1.  **Internationalization (i18n)** : Activer l'anglais (défaut), français, et espagnol.
2.  **API Tokens** : Créer un token "Full Access" pour les Agents et un token "Read Only" pour le Frontend.
3.  **Upload Provider** : Local pour le dev, AWS S3/Cloudinary pour la prod.

## Étapes d'Implémentation
1.  Initialiser le projet : `npx create-strapi-app@latest apps/cms --quickstart --typescript`
2.  Créer les Content Types via le Content Type Builder.
3.  Configurer le plugin i18n.
4.  Générer les types TypeScript pour le frontend.
