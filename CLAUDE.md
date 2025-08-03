# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js web application for calculating Panda Express nutrition information and macros. It's built with TypeScript, React, and Tailwind CSS. The app allows users to select menu items and see the total nutritional values (calories, protein, carbs, fat) for their meal.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Core Components Structure
- **pages/index.tsx** - Main application page with state management for selected items, toast notifications, and PostHog analytics
- **components/table.tsx** - Reusable table component for displaying menu items with add functionality
- **components/resultTable.tsx** - Table showing selected items with totals calculation and remove functionality
- **components/header.tsx** - Header with reset functionality
- **components/footer.tsx** - Footer component
- **components/toast.tsx** - Toast notification component
- **data/data.tsx** - Static nutrition data organized by food categories (sides, chicken, beef, seafood, appetizers)

### Data Structure
The core data type is `FoodEntry`:
```typescript
type FoodEntry = {
    name: string, 
    calories: number, 
    protein: number, 
    carbs: number, 
    fat: number
}
```

All nutrition data is statically defined in `src/data/data.tsx` with separate arrays for different food categories.

### State Management
- Uses React useState for local state management
- Main state includes `selectedItems` array, toast visibility, and half-sides toggle
- No external state management library (Redux, Zustand, etc.)

### Key Features
- Responsive design with mobile-first approach using Tailwind CSS
- Toast notifications when items are added
- Automatic macro calculations using array reduce functions
- PostHog analytics integration for user interactions
- Static nutrition data (no API calls)

### Path Alias
The project uses `~/*` as an alias for `./src/*` (configured in tsconfig.json).

## Code Conventions

- TypeScript with strict mode enabled
- Functional components with TypeScript interfaces for props
- Tailwind CSS for all styling
- ESLint with Next.js configuration
- File naming: camelCase for components, kebab-case for utility files
- Import organization: external libraries first, then internal imports with `~/` alias

## Technical Notes

- Built on T3 Stack foundation (create-t3-app)
- No database or API routes - purely static data
- PostHog analytics configured for user behavior tracking
- Responsive tables with different layouts for mobile and desktop
- SEO optimized with proper meta tags and Open Graph data