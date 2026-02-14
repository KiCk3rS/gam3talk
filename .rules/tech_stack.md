---
description: Tech Stack rules for the Esport AI Automation project.
globs: **/*
---
# Tech Stack Rules

You MUST adhere to the following technology stack when writing code for this project:

## Frontend (apps/web)
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Base UI
- **State Management**: React Context / Zustand (if needed)

## Backend (apps/api)
- **Framework**: FastAPI (Python)
- **Language**: Python 3.10+
- **AI Integration**: LangChain, OpenAI API
- **Database**: PostgreSQL (Local/Docker), SQLAlchemy/asyncpg

## Infrastructure
- **Deployment**: Coolify (VPS)
- **Containerization**: Docker, Docker Compose

## General
- **Monorepo Structure**: `apps/`, `agents/`, `packages/`
- **Documentation**: Maintain `doc/` folder.
