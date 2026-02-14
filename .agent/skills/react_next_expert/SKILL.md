---
name: React Next Expert
description: Best practices for high-performance React and Next.js development (App Router).
---
# React Next Expert Skill

This skill defines the standards for developing the frontend of the Esport AI Automation platform.

## Core Principles

### 1. Server Components First
- **Default to Server Components (RSC)**: All components are RSC by default.
- **"use client" Usage**: Add `"use client"` *only* when you need:
    - Event listeners (`onClick`, `onChange`).
    - React Hooks (`useState`, `useEffect`).
    - Browser APIs (`window`, `localStorage`).
- **Composition**: Pass Client Components as children to Server Components to avoid de-optimizing the tree.

### 2. Styling with Tailwind CSS v4
- **Utility-First**: Write styles directly in `className`.
- **No Refactoring to @apply**: Avoid extracting classes to CSS files unless reused across *many* unrelated components.
- **Conditional Classes**: ALWAYS use `cn()` (clsx + tailwind-merge) for conditional styling.
  ```tsx
  import { cn } from "@/lib/utils"
  <div className={cn("p-4", isActive && "bg-blue-500")} />
  ```

### 3. Component Architecture (shadcn/ui + Base UI)
- **Composition**: Use smaller, focused components.
- **Base UI Primitives**: When creating custom complex interactive components, use Base UI hooks/components for accessibility.
- **Props**: Define strict TypeScript interfaces for all props.

### 4. Data Fetching & Mutations
- **Fetching**: Fetch data directly in Server Components using `async/await`.
- **Streaming**: Use `<Suspense>` boundaries for slow data fetches to unblock the UI.
- **Mutations**: Use **Server Actions** (`"use server"`) for form submissions and data updates.

### 5. Performance & Optimization
- **Images**: MUST use `next/image` with proper `width`/`height` or `fill`.
- **Fonts**: Use `next/font` (already configured in `layout.tsx`).
- **Dynamic Imports**: Use `next/dynamic` for heavy client components (charts, maps).

## Code Style Example

```tsx
// components/match-card.tsx
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  isLive?: boolean;
}

export function MatchCard({ teamA, teamB, scoreA, scoreB, isLive }: MatchCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 flex justify-between items-center hover:bg-muted/50 transition-colors">
      <div className="flex gap-4 items-center">
        <span className="font-bold">{teamA}</span>
        <span className="text-muted-foreground">vs</span>
        <span className="font-bold">{teamB}</span>
      </div>
      
      <div className="flex gap-2 items-center">
        <span className="text-xl font-mono">{scoreA} - {scoreB}</span>
        {isLive && (
          <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
        )}
      </div>
    </div>
  );
}
```
