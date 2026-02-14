# Projet : Plateforme d'Actualité Esport Autonome (AI-Driven)

Ce document définit le contexte, les objectifs et la stratégie éditoriale pour la mise en place d'une plateforme d'actualité esport gérée majoritairement par des agents IA.

## 1. Vision et Mission
Créer un écosystème médiatique 360° sur l'esport capable de produire du contenu haute fréquence et haute qualité avec une intervention humaine minimale, en tirant parti de l'intelligence artificielle pour la veille, la rédaction et la création multimédia.

## 2. Public Cible
- **Cœur de cible** : Fans d'esport (LoL, CS2, Valorant, Rocket League, etc.), Gamers compétitifs.
- **Tranche d'âge** : 15-35 ans (Gen Z & Millennials).
- **Habitudes** : Consommation mobile (verticale), recherche d'info rapide mais fiable, apprécie les résumés hebdomadaires pour "rattraper" l'actu.

## 3. Piliers de Contenu

### A. Site Web (Le Hub Central)
- **Format** : Articles d'actualité, brèves, résultats de matchs, analyses de patchs.
- **Fréquence** : Temps réel / Quotidien (dès qu'une news tombe).
- **Objectif** : SEO, Crédibilité, Source de vérité pour les scripts vidéo.
- **Rôle de l'IA** :
    - Veille automatique sur Reddit, Twitter/X, Sites officiels.
    - Rédaction de brouillons d'articles.
    - Optimisation SEO automatique.

### B. Contenu Short-Form (TikTok / Instagram Reels / YouTube Shorts)
- **Format** : Vidéos verticales 9:16, < 60 secondes.
- **Fréquence** : 1 à 3 fois par jour.
- **Syle** : Dynamique, sous-titres animés, clips de gameplay, "Facecam" AI ou Voix off.
- **Rôle de l'IA** :
    - Résumé d'article en script "punchy".
    - Génération de voix (TTS).
    - Montage automatique (séquencage de clips, ajout de sous-titres).

### C. Contenu Vidéo Hebdo (YouTube / Long-form)
- **Format** : Vidéo horizontale 16:9, durée 10-15 minutes.
- **Fréquence** : 1 fois par semaine (ex: Le Dimanche).
- **Contenu** : Le "Récap de la Semaine", Analyses approfondies, Tops actions.
- **Rôle de l'IA** :
    - Agrégation des top news de la semaine.
    - Écriture de script structuré avec intro/outro.
    - Recherche d'assets média pertinents.

## 4. Ton et Ligne Éditoriale
- **Ton** : Passionné, Expert, Direct, "Insider".
- **Style Visuel** : Cyberpunk, Futuriste, Épuré, "Gamer" mais premium.

## 5. Workflow Technique (Aperçu)
1. **Acquisition** : Agents de veille (Scrapers/APIs) détectent une news.
2. **Traitement** : LLM analyse, vérifie et catégorise l'info.
3. **Production** :
    - Génération Article (Markdown/CMS).
    - Génération Script Vidéo (Short & Long).
    - Génération Assets (Images via DALL-E/Midjourney, Clips via API jeux).
4. **Diffusion** : Publication automatique ou validation humaine 1-clic.
