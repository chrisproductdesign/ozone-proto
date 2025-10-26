# Design System

**Version**: 0.7
**Status**: Single Source of Truth
**Last Updated**: 2025-10-24

---

## Overview

This project uses **Tailwind CSS v4** with the `@theme` directive for all design tokens. All colors, spacing, and typography are defined as CSS custom properties in `src/index.css`, not in TypeScript or JavaScript files.

### Architecture

```
src/index.css (@theme)  →  Tailwind Utilities  →  Components
     ↓                           ↓                      ↓
 CSS Variables          bg-neutral-300           className="..."
```

**Key Principle**: Define once in CSS, use everywhere via Tailwind utilities.

### File Locations

- **Single Source of Truth**: `src/index.css` (`@theme` block) - All primitive tokens
- **TypeScript Interface**: `src/design-system/tokens/*.ts` - Typed references to CSS variables (for developer experience)
- **Config**: `tailwind.config.js` - Minimal v4 configuration

---

## Core Colors

### Warm Neutral Palette

Used for surfaces, text, and borders. **No cool grays.**

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-neutral-50` | `#FEFDFC` | Lightest warm tint |
| `--color-neutral-100` | `#FCFBFA` | Very light warm |
| `--color-neutral-200` | `#FAF8F6` | Light warm |
| `--color-neutral-300` | `#F7F5F1` | **Card surfaces** |
| `--color-neutral-400` | `#E7E6E4` | **Page background** |
| `--color-neutral-500` | `#DBDAD9` | **Nav/lowest depth** |
| `--color-neutral-600` | `#B5B3B2` | Mid-tone warm |
| `--color-neutral-700` | `#8A8886` | Medium warm |
| `--color-neutral-800` | `#5D5B59` | Dark warm (secondary text) |
| `--color-neutral-900` | `#3A3836` | Darkest warm (primary text) |

**Tailwind Utilities**: `bg-neutral-300`, `text-neutral-900`, `border-neutral-400`

### Brand Purple

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-purple-50` | `#faf5ff` | Subtle backgrounds |
| `--color-purple-500` | `#a855f7` | Bright accent |
| `--color-purple-600` | `#9333ea` | Medium brand |
| `--color-purple-700` | `#7e22ce` | **Primary brand** |
| `--color-purple-800` | `#6b21a8` | Hover state |
| `--color-purple-900` | `#581c87` | Active/pressed |

**Tailwind Utilities**: `bg-purple-700`, `text-purple-700`, `hover:bg-purple-800`

### Semantic Colors

#### Green (Success)
- `--color-green-50`: `#f0fdf4`
- `--color-green-500`: `#22c55e`
- `--color-green-600`: `#16a34a`
- `--color-green-700`: `#15803d`

#### Amber (Warning)
- `--color-amber-50`: `#fffbeb`
- `--color-amber-500`: `#f59e0b`
- `--color-amber-700`: `#b45309`

#### Red (Danger)
- `--color-red-50`: `#fef2f2`
- `--color-red-500`: `#ef4444`
- `--color-red-600`: `#dc2626`
- `--color-red-700`: `#b91c1c`

#### Blue (Secondary)
- `--color-blue-500`: `#3b82f6`
- `--color-blue-600`: `#2563eb`
- `--color-blue-700`: `#1d4ed8`

---

## Core Spacing

### Base Scale (8px Grid)

| Token | Value | Pixels |
|-------|-------|--------|
| `spacing[1]` | `0.25rem` | 4px |
| `spacing[2]` | `0.5rem` | 8px |
| `spacing[3]` | `0.75rem` | 12px |
| `spacing[4]` | `1rem` | 16px |
| `spacing[5]` | `1.25rem` | 20px |
| `spacing[6]` | `1.5rem` | 24px |
| `spacing[8]` | `2rem` | 32px |
| `spacing[12]` | `3rem` | 48px |
| `spacing[16]` | `4rem` | 64px |
| `spacing[20]` | `5rem` | 80px |
| `spacing[24]` | `6rem` | 96px |

**Tailwind Utilities**: `p-4`, `mx-6`, `gap-5`

### Component Presets

**Defined in**: `src/design-system/tokens/spacing.ts`

```typescript
// Input/Button padding
input.md: { x: '14px', y: '10px' }  // px-4 py-2.5

// Card padding
card.md: '16px'  // p-4
card.lg: '24px'  // p-6

// Stacks (vertical spacing)
stack.sm: '8px'   // gap-2
stack.md: '16px'  // gap-4
stack.lg: '24px'  // gap-6
```

---

## Core Typography

### Primitive Font Sizes (Type Ramp)

Standard Tailwind v4 scale - defined in `src/index.css` `@theme`:

| Token | Value | Pixels | Common Usage |
|-------|-------|--------|--------------|
| `xs` | `0.75rem` | 12px | Captions, meta, micro labels |
| `sm` | `0.875rem` | 14px | Labels, small body, badges |
| `base` | `1rem` | 16px | Body text, inputs |
| `lg` | `1.125rem` | 18px | Large body text |
| `xl` | `1.25rem` | 20px | Small headings, metric labels |
| `2xl` | `1.5rem` | 24px | h4, card titles |
| `3xl` | `1.875rem` | 30px | h3 |
| `4xl` | `2.25rem` | 36px | h2, large scores |
| `5xl` | `3rem` | 48px | h1, hero text |
| `6xl` | `3.75rem` | 60px | Large display |
| `7xl` | `4.5rem` | 72px | Extra large display |
| `8xl` | `6rem` | 96px | Score grades |
| `9xl` | `8rem` | 128px | Giant display |

**Tailwind Utilities**: `text-base`, `text-2xl`, `text-8xl`

### Semantic Typography Tokens

Dashboard-specific tokens that reference primitives - self-documenting and context-aware:

| Semantic Token | References | Value | Usage |
|----------------|------------|-------|-------|
| `--text-metric-label` | `--text-xl` | 20px | Metric card labels |
| `--text-metric-value` | `2rem` | 32px | Standard metric values |
| `--text-metric-value-large` | `--text-3xl` | 30px | Emphasized metrics |
| `--text-score-standard` | `--text-4xl` | 36px | Score displays |
| `--text-grade-letter` | `--text-8xl` | 96px | Letter grades (A, B, C) |
| `--text-grade-overlay` | `8.25rem` | 132px | Decorative grade overlay |
| `--text-grade-bg-sm` | `20.75rem` | 332px | Background decoration (small) |
| `--text-grade-bg-lg` | `28.125rem` | 450px | Background decoration (large) |

**Usage in Components**:
```tsx
// ❌ DON'T: Use arbitrary values
<div className="text-[32px]">$50,000</div>

// ✅ DO: Use semantic tokens
<div className="text-[length:var(--text-metric-value)]">$50,000</div>

// ✅ OR: Use primitive tokens when semantic doesn't exist
<div className="text-4xl">A</div>
```

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `light` | `300` | Headings, hero |
| `normal` | `400` | Body text |
| `medium` | `500` | Labels, buttons |
| `semibold` | `600` | Emphasized |
| `bold` | `700` | Headings |

**Tailwind Utilities**: `font-normal`, `font-medium`, `font-bold`

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `tight` | `1.25` | Headings |
| `normal` | `1.5` | Body text |
| `relaxed` | `1.625` | Comfortable reading |

**Tailwind Utilities**: `leading-tight`, `leading-normal`, `leading-relaxed`

---

## How to Add New Tokens

### Adding a New Color

**Step 1**: Add to `src/index.css` `@theme` block
```css
@theme {
  --color-mint-500: #10b981;
}
```

**Step 2**: Use immediately via Tailwind utilities
```tsx
<div className="bg-mint-500 text-white">
  Color is automatically available!
</div>
```

### Adding a New Spacing Value

**Option A**: Add to `@theme` (for new base values)
```css
@theme {
  --spacing-9: 2.25rem;  /* 36px */
}
```

**Option B**: Add to `spacing.ts` (for component presets)
```typescript
export const componentSpacing = {
  sidebar: {
    padding: spacing[6],  // 24px
  }
}
```

### Adding a New Font Size

**Primitive Token** (for general use):
```css
@theme {
  --text-6xl: 3.75rem;  /* 60px */
}
```

**Semantic Token** (for specific context):
```css
@theme {
  --text-dashboard-hero: var(--text-5xl);  /* References primitive */
}
```

Then update TypeScript interface for autocomplete:
```typescript
// src/design-system/tokens/typography.ts
export const fontSize = {
  '6xl': 'var(--text-6xl)',  // References CSS, doesn't duplicate
} as const;
```

---

## Quick Reference

### Common Patterns

**Card**:
```tsx
className="bg-base rounded-2xl p-5 shadow-sm"
```

**Button (Primary)**:
```tsx
className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2.5 rounded-lg"
```

**Input**:
```tsx
className="bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900"
```

**Heading (h1)**:
```tsx
className="text-5xl font-bold text-neutral-900"
```

**Body Text**:
```tsx
className="text-base text-neutral-800"
```

### Focus States

```tsx
// Input focus
focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20

// Button focus
focus:ring-2 focus:ring-purple-700 focus:ring-offset-2
```

### Disabled States

```tsx
// Input disabled
disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed

// Button disabled
disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed
```

---

## Migration from v0.6

**What Changed**:
- ❌ **Removed**: `src/design-system/tokens/colors.ts` (deleted)
- ❌ **Removed**: TypeScript color imports in `tailwind.config.js`
- ❌ **Removed**: Semantic color mappings (textColor, backgroundColor extensions)
- ✅ **Added**: All colors in `src/index.css` using `@theme` directive

**How to Update Code**:

Before (v0.6):
```typescript
import { semanticColors } from '@/design-system/tokens/colors';
const bgColor = semanticColors.primary.DEFAULT;
```

After (v0.7):
```tsx
// Just use Tailwind utilities directly
<div className="bg-purple-700">
```

---

## Additional Resources

- **Base UI Components**: `docs/llms.txt`
- **Git Workflow**: `GIT_WORKFLOW.md`
- **Flow Structure**: `FLOW_STRUCTURE.md`
- **Tailwind v4 Docs**: https://tailwindcss.com/docs/theme

---

**End of Design System Documentation**

This is the single source of truth for all design tokens. To add new values, update `src/index.css` `@theme` block. Changes are immediately available as Tailwind utilities.
