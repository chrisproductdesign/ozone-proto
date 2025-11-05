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

- **Single Source of Truth**: `src/index.css` (`@theme` block) - All design tokens
- **Config**: `tailwind.config.js` - Minimal v4 configuration (animations only)
- **Components**: Use Tailwind utilities directly (e.g., `className="text-xl bg-purple-700"`)

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

### Common Component Spacing Patterns

```tsx
// Input/Button padding
className="px-4 py-2.5"  // 14px x 10px

// Card padding
className="p-4"   // 16px (medium)
className="p-6"   // 24px (large)

// Stacks (vertical spacing)
className="gap-2"  // 8px (small)
className="gap-4"  // 16px (medium)
className="gap-6"  // 24px (large)
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

**Apple SF Pro Exact Ratios** - Mapped from macOS 26 type ramp:

| Token | Value | Pixels | Ratio | For Font Size | Apple Source |
|-------|-------|--------|-------|---------------|--------------|
| `leading-xs` | `0.9375rem` | 15px | 1.25 | 12px (text-xs) | 12→15 exact |
| `leading-sm` | `1.0625rem` | 17px | 1.23 | 14px (text-sm) | 13→16 (Body) |
| `leading-base` | `1.25rem` | 20px | 1.33 | 16px (text-base) | 15→20 exact |
| `leading-lg` | `1.375rem` | 22px | 1.29 | 18px (text-lg) | 17→22 exact |
| `leading-xl` | `1.5rem` | 24px | 1.29 | 20px (text-xl) | 17→22 ratio |
| `leading-2xl` | `1.75rem` | 28px | 1.18 | 24px (text-2xl) | 22→26 ratio |
| `leading-3xl` | `2.25rem` | 36px | 1.23 | 30px (text-3xl) | 26→32 ratio |
| `leading-4xl` | `2.625rem` | 42px | 1.18 | 36px (text-4xl) | 22→26 ratio |
| `leading-5xl` | `3.5rem` | 56px | 1.18 | 48px (text-5xl) | 22→26 ratio |
| `leading-6xl` | `4.375rem` | 70px | 1.18 | 60px (text-6xl) | 22→26 ratio |
| `leading-7xl` | `5.25rem` | 84px | 1.18 | 72px (text-7xl) | 22→26 ratio |
| `leading-8xl` | `7rem` | 112px | 1.18 | 96px (text-8xl) | 22→26 ratio |
| `leading-9xl` | `9.375rem` | 150px | 1.18 | 128px (text-9xl) | 22→26 ratio |

**Legacy Ratio Tokens** (still available):

| Token | Value | Usage |
|-------|-------|-------|
| `tight` | `1.25` | Headings |
| `normal` | `1.5` | Body text |
| `relaxed` | `1.625` | Comfortable reading |

**Tailwind Utilities**: `leading-base`, `leading-xl`, `leading-tight`

---

## Core Elevation (Shadows)

### Tailwind v4 Shadow Scale

The elevation ramp uses **Tailwind v4 naming** (updated from v3):

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-2xs` | `0 1px rgb(0 0 0 / 0.05)` | Minimal shadow (new in v4) |
| `--shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Extra small (was `shadow-sm` in v3) |
| `--shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Small (was `shadow` in v3) |
| `--shadow` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Alias for `shadow-sm` |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Medium |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Large |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Extra large |
| `--shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | 2x extra large |
| `--shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | Inset shadow |
| `--shadow-none` | `0 0 #0000` | No shadow |

**Tailwind Utilities**: `shadow-2xs`, `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none`

**Note**: The plain `shadow` utility is identical to `shadow-sm` in Tailwind v4 (backward compatibility). There is an intentional visual gap between `shadow-sm` and `shadow-md` - the small shadows (2xs, xs, sm) are grouped close together, then a larger step to medium shadows.

### Common Usage

**Cards**: `shadow-sm` or `shadow-md`
```tsx
<div className="bg-neutral-300 shadow-sm rounded-lg p-4">
  Card content
</div>
```

**Modals/Elevated UI**: `shadow-xl` or `shadow-2xl`
```tsx
<div className="bg-white shadow-2xl rounded-2xl p-6">
  Modal content
</div>
```

**Buttons on hover**: Increase shadow size
```tsx
<button className="shadow-sm hover:shadow-md transition-shadow">
  Click me
</button>
```

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

Add to `@theme` in `src/index.css`:
```css
@theme {
  --spacing-9: 2.25rem;  /* 36px */
}
```

Then use via Tailwind utilities:
```tsx
className="p-9"  // padding: 2.25rem (36px)
className="gap-9"  // gap: 2.25rem
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

Then use in components:
```tsx
// Using primitive token
className="text-6xl"

// Using semantic token with arbitrary value
className="text-[length:var(--text-dashboard-hero)]"
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

## Form Input Styling System

### Unified Input Components

All form inputs share a standardized styling system defined in `src/components/form/inputStyles.ts`. This ensures visual consistency and maintainable code across:

- TextInput
- CurrencyInput
- NumberInput
- SelectInput
- ComboboxInput
- PercentageInput

### Base Input Styles

```tsx
// Reference: src/components/form/inputStyles.ts
getBaseInputClasses(error?: boolean, fullWidth?: boolean)
```

**Applied styles:**
- Layout: `px-3 py-2` (references `--spacing-3`, `--spacing-2`)
- Border: `rounded-lg border` (references `--radius-lg`)
- Background: `bg-white`
- Text: `text-sm text-neutral-800`
- Placeholder: `placeholder:text-neutral-650`
- Focus: `focus:border-purple-500 focus:ring-2 focus:ring-purple-700/20`
- Transitions: `transition-[border-color,box-shadow] duration-[150ms]`
- Disabled: `disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed`
- Error: `border-red-300 focus:border-red-500 focus:ring-red-500/20`

### Padding Variants

Systematic spacing for inputs with icons, prefixes, or controls:

```tsx
inputPadding = {
  base: 'px-3 py-2',           // Standard: 12px horizontal, 8px vertical
  leftIcon: 'pl-7 pr-3 py-2',  // Left icon/prefix: $, €
  rightIcon: 'pl-3 pr-7 py-2', // Right icon/suffix
  rightControls: 'pl-3 pr-9 py-2', // Right controls: +/− buttons
  bothSides: 'pl-7 pr-9 py-2', // Both: prefix + controls
}
```

### Icon Positioning

Consistent placement for currency symbols, percentage signs, etc.:

```tsx
iconPosition = {
  left: 'absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none',
  right: 'absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none',
  rightWithControls: 'absolute right-11 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none',
}
```

### Shared Components

**IncrementDecrementControls**
- Used by: NumberInput, PercentageInput
- Location: `src/components/form/IncrementDecrementControls.tsx`
- Eliminates code duplication for +/− buttons

### Key Design Decisions

**1. Tailwind v4 Standards**
- Focus ring: `ring-2` (4px, not `ring-4`)
- Duration: `duration-[150ms]` (references `--duration-fast`)
- Specific transitions: `transition-[border-color,box-shadow]` (not `transition-all`)

**2. Performance Optimizations**
- Avoid `transition-all` (animates all properties including layout)
- Use specific property transitions for better performance
- Reference design system duration tokens

**3. State Variants**
- Disabled: Muted colors, cursor change
- Error: Red borders and focus rings
- Read-only: Different background (future enhancement)
- Invalid/Valid: HTML5 validation support (future enhancement)

### Usage Examples

**Basic Text Input:**
```tsx
import { TextInput } from '@/components/form/TextInput';

<TextInput
  value={formData.firstName}
  onChange={(e) => handleChange('firstName', e.target.value)}
  placeholder="First name"
  required
  error={!!errors.firstName}
/>
```

**Currency Input (with prefix):**
```tsx
import { CurrencyInput } from '@/components/form/CurrencyInput';

<CurrencyInput
  value={formData.amount}
  onChange={(e) => handleChange('amount', e.target.value)}
  placeholder="Amount"
  required
/>
```

**Number Input (with controls):**
```tsx
import { NumberInput } from '@/components/form/NumberInput';

<NumberInput
  value={formData.term}
  onChange={(e) => handleChange('term', e.target.value)}
  min="1"
  max="365"
  step="1"
  placeholder="Term (Days)"
  showControls={true}
/>
```

### Extending the System

To create a new input variant:

1. **Import base styles:**
```tsx
import { getBaseInputClasses, inputPadding, iconPosition } from './inputStyles';
```

2. **Apply base classes:**
```tsx
className={classNames(
  getBaseInputClasses(error, fullWidth),
  inputPadding.base, // or appropriate variant
  className
)}
```

3. **Add custom behavior:**
```tsx
// Component-specific logic (formatting, validation, etc.)
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
