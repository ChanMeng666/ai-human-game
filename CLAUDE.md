# CLAUDE.md - AI Assistant Guide for AI vs Human Guessing Game

> **Last Updated**: 2025-11-17
> **Project Version**: 0.1.0
> **For AI Assistants**: This document provides comprehensive guidance for understanding and working with this codebase.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Codebase Structure](#codebase-structure)
- [Tech Stack & Dependencies](#tech-stack--dependencies)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Development Workflows](#development-workflows)
- [Key Conventions & Best Practices](#key-conventions--best-practices)
- [File Organization](#file-organization)
- [Component Patterns](#component-patterns)
- [State Management](#state-management)
- [Common Tasks & Commands](#common-tasks--commands)
- [Testing & Deployment](#testing--deployment)
- [Important Notes for AI Assistants](#important-notes-for-ai-assistants)

---

## Project Overview

### What is This Project?

**AI vs Human Guessing Game** is an interactive web-based quiz game that challenges users to distinguish between AI-generated and human-created content across four categories: Text, Images, Audio, and Video.

### Key Features

- **Multi-Category Testing**: 4 content types (Text, Images, Audio, Video)
- **10 Questions per Category**: Total of 40 questions across all categories
- **Real-time Scoring**: Immediate feedback and performance tracking
- **Progress Persistence**: LocalStorage-based save/restore functionality
- **Retro UI**: NES.css pixel-art themed interface with pond aesthetics
- **Sound Effects**: Optional audio feedback for user interactions
- **Responsive Design**: Mobile-first, works on all devices
- **Privacy-Focused**: Client-side only, no data collection

### Live Demo

- **Production URL**: https://ai-human-game.vercel.app/
- **Repository**: https://github.com/ChanMeng666/ai-human-game

---

## Codebase Structure

```
ai-human-game/
├── app/                          # Next.js 15 App Router
│   ├── page.tsx                 # Home page (entry point)
│   ├── category/page.tsx        # Category selection
│   ├── game/page.tsx            # Main game interface
│   ├── results/page.tsx         # Individual category results
│   ├── summary/page.tsx         # Overall performance summary
│   ├── tutorial/page.tsx        # Tutorial/How to play
│   ├── layout.tsx               # Root layout with GameProvider
│   └── globals.css              # Global styles, fonts, animations
│
├── src/
│   ├── components/              # React components
│   │   ├── ContentDisplay.tsx   # Dynamic content renderer (text/image/audio/video)
│   │   ├── AchievementToast.tsx # Achievement notification UI
│   │   ├── FirstTimeGuide.tsx   # First-time user onboarding
│   │   ├── HintBubble.tsx       # Contextual hints
│   │   ├── ExitConfirmDialog.tsx# Exit confirmation modal
│   │   ├── Breadcrumb.tsx       # Navigation breadcrumbs
│   │   ├── QuickStatsModal.tsx  # Quick statistics display
│   │   ├── ProgressRestoreModal.tsx # Progress restore UI
│   │   ├── Navigation.tsx       # Navigation component
│   │   └── LoadingScreen.tsx    # Loading state UI
│   │
│   ├── context/
│   │   └── GameContext.tsx      # Global game state management
│   │
│   ├── data/
│   │   └── questions.json       # All 40 questions (10 per category)
│   │
│   └── assets/                  # Static assets (images, fonts)
│       ├── fonts/
│       │   └── PeaberryBase.woff2
│       └── images/              # UI graphics (buttons, fish, windows)
│
├── public/
│   ├── audio/                   # Sound effects (correct.wav, incorrect.wav, etc.)
│   └── content/                 # Game content files (user-provided)
│       ├── text/                # human_1.txt to human_10.txt, ai_1.txt to ai_10.txt
│       ├── images/              # human_1.jpg to human_10.jpg, ai_1.jpg to ai_10.jpg
│       ├── audio/               # human_1.mp3 to human_10.mp3, ai_1.mp3 to ai_10.mp3
│       └── videos/              # human_1.mp4 to human_10.mp4, ai_1.mp4 to ai_10.mp4
│
├── docs/                        # Documentation
│   ├── guides/                  # Development guides
│   │   ├── CONTRIBUTING.md
│   │   ├── CONTENT_SPECIFICATIONS.md
│   │   ├── QUICK_START.md
│   │   ├── RESPONSIVE_DESIGN.md
│   │   └── UI_LIBRARY_MIGRATION_GUIDE.md
│   ├── summaries/               # Project summaries
│   └── zh-CN/                   # Chinese documentation
│
├── package.json                 # Dependencies and scripts
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
└── README.md                    # User-facing documentation
```

---

## Tech Stack & Dependencies

### Core Framework

- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library (latest React 19)
- **TypeScript 5** - Type safety

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **NES.css 2.2.1** - Retro pixel-art UI library
- **Custom Fonts**:
  - Press Start 2P (pixel display font)
  - VT323 (pixel content font)
  - Pixelify Sans (modern pixel font)
  - Peaberry Base (custom pond theme font)

### Development Tools

- **ESLint 9** - Linting with Next.js configuration
- **PostCSS** - CSS processing
- **npm/yarn/pnpm** - Package management

### Key Design Decisions

1. **No Backend**: Fully client-side application
2. **No Database**: LocalStorage for persistence
3. **No External APIs**: All content is static files
4. **SSR/SSG**: Leverages Next.js for optimal performance
5. **Type Safety**: Strict TypeScript configuration

---

## Architecture & Design Patterns

### 1. Application Architecture

```
┌─────────────────────────────────────────────┐
│           Next.js App Router                │
│  (Server Components + Client Components)     │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│         GameContext (Client-Side)           │
│   - Global State Management                 │
│   - LocalStorage Persistence                │
│   - Score Tracking                          │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│         Component Layer                     │
│   - Page Components (app/)                  │
│   - UI Components (src/components/)         │
│   - ContentDisplay (media renderer)         │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│         Data Layer                          │
│   - questions.json (metadata)               │
│   - /public/content/ (media files)          │
└─────────────────────────────────────────────┘
```

### 2. State Management Pattern

The application uses **React Context API** for global state management:

**Location**: `src/context/GameContext.tsx`

**Key State Structure**:

```typescript
interface GameState {
  category: string | null;                    // Current category
  currentQuestionIndex: number;               // Current question (0-9)
  score: number;                              // Current category score
  userAnswers: UserAnswer[];                  // Answer history
  questions: Question[];                      // Loaded questions
  isGameStarted: boolean;                     // Game state flag
  isGameFinished: boolean;                    // Completion flag
  completedCategories: CategoryScore[];       // Finished categories
  totalScore: number;                         // Cross-category score
  soundEnabled: boolean;                      // Sound preference
}
```

**Key Context Functions**:

- `setCategory(category)` - Set current category
- `setQuestions(questions)` - Load questions for category
- `startGame()` - Initialize game session
- `submitAnswer(choice)` - Submit answer and check correctness
- `nextQuestion()` - Advance to next question
- `resetGame()` - Reset current category
- `resetAll()` - Reset entire game
- `saveCurrentCategory()` - Save completed category
- `toggleSound()` - Toggle sound effects
- `saveToLocalStorage()` / `loadFromLocalStorage()` - Persistence
- `hasSavedProgress()` / `restoreProgress()` - Progress management

### 3. Component Patterns

#### Client Components (use "use client")

All components with interactivity, hooks, or browser APIs:

- All page components (`app/**/page.tsx`)
- All UI components (`src/components/**/*.tsx`)
- GameContext provider

#### Server Components (default)

- `app/layout.tsx` (until it wraps GameProvider)

#### Common Component Pattern

```typescript
"use client";

import { useGame } from "@/src/context/GameContext";

export default function ComponentName() {
  const { /* context values */ } = useGame();

  // Component logic

  return (
    // JSX with NES.css classes + Tailwind utilities
  );
}
```

### 4. Routing Flow

```
Home (/)
  → Category Selection (/category)
    → Game Interface (/game?category=text)
      → Results (/results?category=text)
        ┌→ Play Again (back to /category)
        ├→ Summary (/summary)
        └→ Home (/)
```

**Query Parameters**:
- `/game?category=text|images|audio|videos`
- `/results?category=text|images|audio|videos`

### 5. Data Flow

**Question Loading**:
```
questions.json → filter by category → GameContext.questions → Game Page
```

**Content Loading**:
```
Question.humanContent/aiContent → ContentDisplay → fetch() or <Image>/<audio>/<video>
```

**Answer Submission**:
```
User Click → submitAnswer() → Compare with humanPosition → Update score → Auto-save
```

---

## Development Workflows

### 1. Local Development Setup

```bash
# Clone repository
git clone https://github.com/ChanMeng666/ai-human-game.git
cd ai-human-game

# Install dependencies
npm install

# Start development server
npm run dev
# Server runs at http://localhost:3000
```

### 2. Adding New Content

**Text Content** (`public/content/text/`):
```bash
# Add pairs of text files
human_1.txt to human_10.txt
ai_1.txt to ai_10.txt
```

**Image Content** (`public/content/images/`):
```bash
# Add pairs of images (JPG, PNG, WebP)
human_1.jpg to human_10.jpg
ai_1.jpg to ai_10.jpg
```

**Audio Content** (`public/content/audio/`):
```bash
# Add pairs of audio files (MP3, WAV)
human_1.mp3 to human_10.mp3
ai_1.mp3 to ai_10.mp3
```

**Video Content** (`public/content/videos/`):
```bash
# Add pairs of video files (MP4, WebM)
human_1.mp4 to human_10.mp4
ai_1.mp4 to ai_10.mp4
```

### 3. Modifying Questions

Edit `src/data/questions.json`:

```json
{
  "id": 1,
  "category": "text",
  "humanContent": "/content/text/human_1.txt",
  "aiContent": "/content/text/ai_1.txt",
  "humanPosition": "left",  // "left" or "right" - randomize this!
  "description": "Which text was written by a human?"
}
```

**Important**: Vary `humanPosition` to prevent pattern guessing.

### 4. Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start

# Deploy to Vercel (recommended)
vercel --prod
```

---

## Key Conventions & Best Practices

### 1. Code Style

- **TypeScript**: Strict mode enabled, all files use `.tsx`/`.ts`
- **Imports**: Use `@/` alias for project root imports
- **Components**: PascalCase for component names
- **Functions**: camelCase for function names
- **Constants**: UPPER_SNAKE_CASE for constants

### 2. File Naming

- **Components**: PascalCase (e.g., `ContentDisplay.tsx`)
- **Pages**: lowercase `page.tsx` (Next.js convention)
- **Utilities**: camelCase (e.g., `gameUtils.ts`)
- **Assets**: lowercase with underscores (e.g., `btn_play.png`)

### 3. Component Structure

```typescript
// 1. Imports
"use client";
import { useState } from "react";
import { useGame } from "@/src/context/GameContext";

// 2. Types/Interfaces
interface Props { /* ... */ }

// 3. Component
export default function ComponentName({ prop1, prop2 }: Props) {
  // 3a. Context hooks
  const { score } = useGame();

  // 3b. State hooks
  const [state, setState] = useState();

  // 3c. Effects
  useEffect(() => { /* ... */ }, []);

  // 3d. Event handlers
  const handleClick = () => { /* ... */ };

  // 3e. Return JSX
  return (/* ... */);
}
```

### 4. Styling Conventions

**Hybrid Approach**: NES.css + Tailwind CSS

```jsx
// Use NES.css classes for retro UI elements
<button className="nes-btn is-primary">Play</button>

// Use Tailwind for layout, spacing, responsive design
<div className="flex flex-col items-center gap-4 p-6 sm:p-8 md:p-10">

// Combine both
<div className="nes-container is-rounded bg-opacity-90 p-4 sm:p-6">
```

**Responsive Breakpoints** (Tailwind):
- `sm:` - 640px (small tablets)
- `md:` - 768px (tablets)
- `lg:` - 1024px (desktops)
- `xl:` - 1280px (large desktops)

### 5. Font Usage Guidelines

- **Display/UI Text**: `font-pixel-display` (Press Start 2P) - Buttons, titles, short text
- **Content Text**: `font-pixel-content` (VT323) - Long paragraphs, readable text
- **Modern Pixel**: `font-pixel-modern` (Pixelify Sans) - Optional alternative
- **Pond Theme**: `font-peaberry` (Peaberry Base) - Special branding

### 6. Color Palette (She Sharp Theme)

```css
/* Available in Tailwind config as 'she-sharp' */
--gray: #9b9b9b
--blue: #1378d1
--periwinkle-dark: #8982ff
--navy-light: #eaf2ff
--navy-dark: #1f1e44
--periwinkle-light: #f4f4fa
--purple-dark: #9b2e83
--purple-light: #f7e5f3
--mint-dark: #b1f6e9
--mint-light: #effefb
--purple-mid: #c846ab
--white: #ffffff
--error: #d72f40
```

Usage: `bg-she-sharp-blue`, `text-she-sharp-purple-dark`, etc.

### 7. Sound Effects

**Location**: `public/audio/`

**Available Sounds**:
- `correct.wav` - Correct answer feedback
- `incorrect.wav` (or `buzzer.wav`) - Wrong answer feedback
- `click.wav` - Button click
- `bubble.wav` - UI interaction
- `cronch.wav` - Special interaction
- `dewwy.wav` - Water-themed sound
- `its_not_showtime.wav` - Easter egg/special event

**Usage Pattern**:
```typescript
const { soundEnabled } = useGame();

const playSound = (soundFile: string) => {
  if (!soundEnabled) return;
  const audio = new Audio(soundFile);
  audio.play().catch(err => console.log("Audio play failed:", err));
};

// In handler
playSound("/audio/correct.wav");
```

---

## File Organization

### Important Locations

#### Application Pages (`app/`)

| File | Purpose | Key Features |
|------|---------|--------------|
| `page.tsx` | Home page | Entry point, pond theme, welcome screen |
| `layout.tsx` | Root layout | GameProvider wrapper, font loading, metadata |
| `category/page.tsx` | Category selection | 4 category buttons, saved progress check |
| `game/page.tsx` | Main game | Question display, answer submission, progress |
| `results/page.tsx` | Category results | Score display, retry option, navigation |
| `summary/page.tsx` | Overall summary | Cross-category stats, achievements |
| `tutorial/page.tsx` | How to play | Game instructions, rules explanation |

#### Context & State (`src/context/`)

| File | Purpose | Exports |
|------|---------|---------|
| `GameContext.tsx` | Global state | `GameProvider`, `useGame()`, interfaces |

#### Data (`src/data/`)

| File | Purpose | Structure |
|------|---------|-----------|
| `questions.json` | Question metadata | Array of 40 question objects (10 per category) |

#### Components (`src/components/`)

| File | Purpose | Props |
|------|---------|-------|
| `ContentDisplay.tsx` | Render text/image/audio/video | `type`, `contentPath`, `position` |
| `AchievementToast.tsx` | Show achievement notifications | Achievement data |
| `FirstTimeGuide.tsx` | First-time user tutorial | None (self-managed) |
| `HintBubble.tsx` | Display contextual hints | `hint`, `position` |
| `ExitConfirmDialog.tsx` | Exit confirmation modal | `onConfirm`, `onCancel` |
| `Breadcrumb.tsx` | Navigation breadcrumbs | `path` |
| `QuickStatsModal.tsx` | Quick stats overlay | `stats` |
| `ProgressRestoreModal.tsx` | Restore saved progress | `progress`, `onRestore`, `onDismiss` |
| `Navigation.tsx` | Navigation component | `currentPage` |
| `LoadingScreen.tsx` | Loading state | None |

---

## State Management

### GameContext API Reference

#### State Values

```typescript
const {
  // Current game state
  category,                  // string | null - Current category
  currentQuestionIndex,      // number - Current question (0-9)
  score,                     // number - Current category score
  userAnswers,               // UserAnswer[] - Answer history
  questions,                 // Question[] - Loaded questions
  isGameStarted,             // boolean - Game started flag
  isGameFinished,            // boolean - Game completed flag

  // Cross-category state
  completedCategories,       // CategoryScore[] - Finished categories
  totalScore,                // number - Total score across categories

  // Settings
  soundEnabled,              // boolean - Sound effects enabled

  // Actions
  setCategory,               // (category: string) => void
  setQuestions,              // (questions: Question[]) => void
  startGame,                 // () => void
  submitAnswer,              // (choice: "left" | "right") => boolean
  nextQuestion,              // () => void
  resetGame,                 // () => void
  resetAll,                  // () => void
  saveCurrentCategory,       // () => void
  getCurrentQuestion,        // () => Question | null
  toggleSound,               // () => void

  // LocalStorage
  saveToLocalStorage,        // () => void
  loadFromLocalStorage,      // () => SavedProgress | null
  clearSavedProgress,        // () => void
  hasSavedProgress,          // () => boolean
  restoreProgress,           // (progress: SavedProgress) => void
} = useGame();
```

#### Common Patterns

**Initialize Game for Category**:
```typescript
const categoryQuestions = allQuestions.filter(q => q.category === "text");
setCategory("text");
setQuestions(categoryQuestions);
startGame();
```

**Submit Answer**:
```typescript
const isCorrect = submitAnswer("left"); // or "right"
if (isCorrect) {
  playSound("/audio/correct.wav");
} else {
  playSound("/audio/incorrect.wav");
}
```

**Check Game Completion**:
```typescript
if (isGameFinished) {
  saveCurrentCategory();
  router.push(`/results?category=${category}`);
}
```

**Restore Progress**:
```typescript
useEffect(() => {
  if (hasSavedProgress()) {
    const progress = loadFromLocalStorage();
    if (progress && confirm("Restore saved progress?")) {
      restoreProgress(progress);
    }
  }
}, []);
```

---

## Common Tasks & Commands

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding a New Category

1. **Add content files**: Create `public/content/new-category/` folder
2. **Add 20 files**: `human_1` to `human_10`, `ai_1` to `ai_10`
3. **Update questions.json**: Add 10 question objects with `category: "new-category"`
4. **Update category page**: Add new category button in `app/category/page.tsx`
5. **Update ContentDisplay**: Add case for new content type in `ContentDisplay.tsx`

### Modifying UI Theme

**Colors**: Edit `tailwind.config.ts` → `theme.extend.colors`

**Fonts**:
1. Add font files to `src/assets/fonts/`
2. Configure in `app/layout.tsx`
3. Add to `tailwind.config.ts` → `theme.extend.fontFamily`

**NES.css Customization**: Override in `app/globals.css`

### Debugging Common Issues

**Content not loading**:
1. Check file exists in `public/content/[category]/`
2. Verify filename matches pattern: `human_X` or `ai_X`
3. Check `questions.json` paths are correct
4. Open browser DevTools → Network tab

**LocalStorage issues**:
1. Check browser supports LocalStorage
2. Clear cache: `localStorage.clear()`
3. Check 7-day expiration in `GameContext.tsx:142`

**TypeScript errors**:
```bash
# Check TypeScript compilation
npx tsc --noEmit
```

---

## Testing & Deployment

### Pre-Deployment Checklist

- [ ] All 40 questions have content files
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Test all 4 categories
- [ ] Test progress save/restore
- [ ] Test on mobile viewport
- [ ] Sound effects work
- [ ] Error states display correctly (missing content)

### Deployment to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

**Or use Vercel GitHub integration**:
1. Connect repository to Vercel
2. Push to main branch
3. Vercel auto-deploys

**Environment**: No environment variables needed (fully static)

### Alternative Deployment Options

**Netlify**:
- Build command: `npm run build`
- Publish directory: `.next`

**Self-Hosted**:
```bash
npm run build
npm start
# Runs on port 3000
```

---

## Important Notes for AI Assistants

### 1. Critical Context

- **This is a Next.js 15+ App Router application** - Use App Router conventions, not Pages Router
- **Client Components Required** - Most components need `"use client"` directive due to hooks/browser APIs
- **No Backend/Database** - All state is client-side (Context + LocalStorage)
- **Content is User-Provided** - Don't assume content files exist; handle missing files gracefully

### 2. Common Pitfalls to Avoid

❌ **Don't**: Use Pages Router patterns (`getStaticProps`, `/pages` directory)
✅ **Do**: Use App Router patterns (`app/` directory, Server Components by default)

❌ **Don't**: Use `useRouter` from `next/router`
✅ **Do**: Use `useRouter` from `next/navigation`

❌ **Don't**: Forget `"use client"` for interactive components
✅ **Do**: Add `"use client"` when using hooks, event handlers, or browser APIs

❌ **Don't**: Import `Image` from `next/legacy/image`
✅ **Do**: Import `Image` from `next/image` (Next.js 13+ default)

❌ **Don't**: Assume content files exist
✅ **Do**: Handle errors gracefully in `ContentDisplay.tsx`

### 3. File Modification Guidelines

**When modifying `GameContext.tsx`**:
- Maintain TypeScript interfaces
- Update both state and context export
- Don't break LocalStorage schema (causes data loss)
- Test save/restore functionality

**When modifying `questions.json`**:
- Keep array structure
- Each category needs exactly 10 questions
- Vary `humanPosition` (don't use all "left" or all "right")
- Ensure file paths match actual files

**When modifying pages**:
- All pages must use `"use client"` (they all use `useGame()`)
- Maintain routing query params (`?category=text`)
- Keep responsive design patterns (`sm:`, `md:`, `lg:`)

**When modifying `ContentDisplay.tsx`**:
- Handle all error cases (404, codec errors, etc.)
- Maintain responsive sizing
- Use NES.css icons for error states
- Support all 4 content types

### 4. TypeScript Guidelines

- All components should have prop interfaces
- Use strict type checking (enabled in `tsconfig.json`)
- Export interfaces from `GameContext.tsx` for reuse
- Use `next/image` Image type for Next.js images

### 5. Responsive Design Patterns

Always use mobile-first responsive classes:

```jsx
// ✅ Good - Mobile first, scales up
<div className="text-sm sm:text-base md:text-lg lg:text-xl">

// ❌ Bad - Desktop first
<div className="text-xl lg:text-sm">
```

### 6. Performance Considerations

- Images use Next.js `<Image>` component (auto-optimization)
- Text content fetched on-demand (not bundled)
- Audio/video use native HTML5 elements (browser-optimized)
- LocalStorage auto-saves after each answer (debounced)

### 7. Accessibility Notes

- All interactive elements should have labels
- Use semantic HTML (`<button>`, `<nav>`, etc.)
- Audio/video should have controls
- Error messages should be descriptive
- Color alone shouldn't convey meaning (use icons)

### 8. Question/Answer About This Codebase?

**Refer to**:
- This file (CLAUDE.md) - Architecture, patterns, conventions
- README.md - User-facing documentation, feature descriptions
- docs/guides/ - Specific guides (contributing, content specs, etc.)
- Code comments in `GameContext.tsx` - State management details
- `questions.json` - Question structure examples

### 9. Making Changes Safely

**Before modifying core files**:
1. Read file completely to understand context
2. Check for usages across codebase (grep/search)
3. Maintain TypeScript types
4. Test in development mode
5. Check browser console for errors

**Safe to modify without risk**:
- Content files in `public/content/`
- Styling in `app/globals.css` (additions)
- Individual page components (if you maintain props)
- UI components in `src/components/` (if you maintain exports)

**Modify with caution**:
- `GameContext.tsx` - Core state management
- `questions.json` - Question structure
- `app/layout.tsx` - Root layout, font loading
- `ContentDisplay.tsx` - Content rendering logic

**Never modify without understanding**:
- `next.config.ts` - Can break build
- `tsconfig.json` - Can break TypeScript
- `tailwind.config.ts` - Can break styling

### 10. Git Workflow (for this project)

When making changes, follow this pattern:

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, commit frequently
git add .
git commit -m "feat: descriptive message"

# Push to remote
git push origin feature/your-feature-name

# Create PR on GitHub
```

**Commit Message Conventions** (Conventional Commits):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - UI/CSS changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test additions/changes
- `chore:` - Build/config changes

---

## Quick Reference

### Essential Files to Know

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/context/GameContext.tsx` | Global state | Adding features, changing game logic |
| `src/data/questions.json` | Question metadata | Adding/modifying questions |
| `src/components/ContentDisplay.tsx` | Content rendering | Supporting new content types |
| `app/layout.tsx` | Root layout | Adding global providers, fonts |
| `app/globals.css` | Global styles | Custom animations, CSS variables |
| `tailwind.config.ts` | Tailwind config | Custom colors, fonts, utilities |
| `package.json` | Dependencies | Adding packages, updating versions |

### Key npm Packages

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.0.1 | React framework |
| `react` | 19.2.0 | UI library |
| `typescript` | ^5 | Type safety |
| `tailwindcss` | ^4 | Utility CSS |
| `nes.css` | ^2.2.1 | Retro UI library |

### Useful Snippets

**Check if content exists**:
```typescript
const checkContent = async (path: string) => {
  const res = await fetch(path);
  return res.ok;
};
```

**Play sound with error handling**:
```typescript
const playSound = (sound: string) => {
  if (!soundEnabled) return;
  const audio = new Audio(sound);
  audio.play().catch(e => console.log("Sound play failed:", e));
};
```

**Get category questions**:
```typescript
import questions from "@/src/data/questions.json";
const textQuestions = questions.filter(q => q.category === "text");
```

---

## Changelog

### Version 0.1.0 (Current)

**Features**:
- 4 content categories (Text, Images, Audio, Video)
- 40 total questions (10 per category)
- Real-time scoring and feedback
- LocalStorage progress persistence
- NES.css retro UI theme
- Sound effects with toggle
- Responsive mobile-first design
- Tutorial/How to Play page

**Tech Stack**:
- Next.js 15 → 16.0.1
- React 18 → 19.2.0
- TypeScript 5
- Tailwind CSS 3 → 4
- NES.css 2.2.1

---

## Resources

### Official Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [NES.css Docs](https://nostalgic-css.github.io/NES.css/)

### Project-Specific Docs

- [README.md](./README.md) - User-facing documentation
- [docs/guides/CONTRIBUTING.md](./docs/guides/CONTRIBUTING.md) - Contribution guidelines
- [docs/guides/CONTENT_SPECIFICATIONS.md](./docs/guides/CONTENT_SPECIFICATIONS.md) - Content file specs
- [docs/guides/QUICK_START.md](./docs/guides/QUICK_START.md) - Quick start guide

### Live Demo

- Production: https://ai-human-game.vercel.app/
- Repository: https://github.com/ChanMeng666/ai-human-game

---

## Contact & Support

**Developer**: Chan Meng
- GitHub: [@ChanMeng666](https://github.com/ChanMeng666)
- Email: chanmeng.dev@gmail.com
- LinkedIn: [chanmeng666](https://www.linkedin.com/in/chanmeng666/)

**For Issues**: https://github.com/ChanMeng666/ai-human-game/issues

---

**Last Updated**: 2025-11-17
**Maintained By**: AI Assistant Context (for Claude and other LLMs)

---

> **Note for AI Assistants**: This document is maintained to provide comprehensive context. When in doubt, refer to actual source code as the source of truth. This document should be updated when major architectural changes occur.
