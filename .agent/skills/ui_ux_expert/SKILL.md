---
name: UI/UX Expert
description: Best practices for responsive, accessible, and clean UI/UX design.
---
# UI/UX Expert Skill

This skill ensures the application is visually appealing, user-friendly, and accessible on all devices.

## Core Principles

### 1. Mobile-First Responsiveness
- **Design for Mobile First**: Start with the mobile layout and use Tailwind's `sm:`, `md:`, `lg:` modifiers for larger screens.
- **Touch Targets**: Ensure buttons and interactive elements are at least 44x44px on mobile.
- **Readable Text**: Font size should be at least 16px on mobile for readability.

### 2. Clean & Standard UI
- **Consistency**: Use the defined design tokens (spacings, colors, typography) from `apps/web/app/globals.css`.
- **Whitespace**: Use generous whitespace (`p-4`, `m-6`, `gap-4`) to separate content and improve readability.
- **Visual Hierarchy**: Use size (`text-xl`, `text-sm`), weight (`font-bold`, `font-medium`), and color (`text-foreground`, `text-muted-foreground`) to guide the user's eye.

### 3. Accessibility (a11y)
- **Semantic HTML**: Use proper tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<button>`).
- **Keyboard Navigation**: Ensure all interactive elements are focusable and usable with a keyboard.
- **Contrast**: Maintain high contrast between text and background colors (check specifically for dark mode).
- **ARIA**: Use ARIA attributes only when semantic HTML is insufficient (e.g., complex custom widgets).

### 4. Component Usage (shadcn/ui + Base UI)
- **Feedback**: Provide immediate feedback for user actions (loading states, success messages, error toasts).
- **Navigation**: Keep navigation simple and predictable.
- **Modals/Dialogs**: Use sparingly; prefer inline editing or dedicated pages for complex tasks.

## Design Checklist
- [ ] Is the layout responsive? (Test on 320px, 768px, 1024px)
- [ ] Are interactions smooth? (Use `transition-all duration-200`)
- [ ] Is the content legible? (Proper line-height and contrast)
- [ ] Does it work in Dark Mode? (`dark:` variants if needed, though mostly automatic with shadcn variables)
