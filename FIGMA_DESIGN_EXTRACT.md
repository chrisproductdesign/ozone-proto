# Figma Design System Extract
## Ozone Fintech Prototype v0.7

**Purpose**: Quick reference for developers to understand the design system without building from scratch.

**What's inside**: Color palettes, typography scale, and component specifications for all key UI elements.

---

## 🎨 COLOR PALETTE

### Neutral Colors (Warm)
**Background & Surface Colors**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#FEFDFC](https://via.placeholder.com/20/FEFDFC/FEFDFC.png) | Neutral 50 | `#FEFDFC` | Lightest warm tint |
| ![#FCFBFA](https://via.placeholder.com/20/FCFBFA/FCFBFA.png) | Neutral 100 | `#FCFBFA` | Very light warm |
| ![#FAF8F6](https://via.placeholder.com/20/FAF8F6/FAF8F6.png) | Neutral 200 | `#FAF8F6` | Light warm |
| ![#FAF8F5](https://via.placeholder.com/20/FAF8F5/FAF8F5.png) | **Neutral 300** | `#FAF8F5` | **Card surfaces** ⭐ |
| ![#E8E6E3](https://via.placeholder.com/20/E8E6E3/E8E6E3.png) | **Neutral 400** | `#E8E6E3` | **Page background** ⭐ |
| ![#DFDCD8](https://via.placeholder.com/20/DFDCD8/DFDCD8.png) | **Neutral 500** | `#DFDCD8` | **Nav/lowest depth** ⭐ |
| ![#B5B3B2](https://via.placeholder.com/20/B5B3B2/B5B3B2.png) | Neutral 600 | `#B5B3B2` | Mid-tone |
| ![#9C9B99](https://via.placeholder.com/20/9C9B99/9C9B99.png) | Neutral 650 | `#9C9B99` | Placeholder text |
| ![#8A8886](https://via.placeholder.com/20/8A8886/8A8886.png) | Neutral 700 | `#8A8886` | Medium |
| ![#5D5B59](https://via.placeholder.com/20/5D5B59/5D5B59.png) | **Neutral 800** | `#5D5B59` | **Secondary text** ⭐ |
| ![#3A3836](https://via.placeholder.com/20/3A3836/3A3836.png) | **Neutral 900** | `#3A3836` | **Primary text** ⭐ |

### Brand Colors (Purple)
**Primary Interactive Elements**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#faf5ff](https://via.placeholder.com/20/faf5ff/faf5ff.png) | Purple 50 | `#faf5ff` | Subtle backgrounds |
| ![#a855f7](https://via.placeholder.com/20/a855f7/a855f7.png) | Purple 500 | `#a855f7` | Bright accent |
| ![#9333ea](https://via.placeholder.com/20/9333ea/9333ea.png) | Purple 600 | `#9333ea` | Medium brand |
| ![#7e22ce](https://via.placeholder.com/20/7e22ce/7e22ce.png) | **Purple 700** | `#7e22ce` | **PRIMARY BRAND** ⭐ |
| ![#6b21a8](https://via.placeholder.com/20/6b21a8/6b21a8.png) | **Purple 800** | `#6b21a8` | **Hover state** ⭐ |
| ![#581c87](https://via.placeholder.com/20/581c87/581c87.png) | **Purple 900** | `#581c87` | **Active/pressed** ⭐ |

### Brand Colors (Mauve - Alternative)
**Secondary Brand Option**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#faf9fa](https://via.placeholder.com/20/faf9fa/faf9fa.png) | Mauve 50 | `#faf9fa` | Subtle backgrounds |
| ![#9d8d95](https://via.placeholder.com/20/9d8d95/9d8d95.png) | Mauve 500 | `#9d8d95` | Mid-tone |
| ![#594c56](https://via.placeholder.com/20/594c56/594c56.png) | **Mauve 700** | `#594c56` | **Alternative brand** |

### Semantic Colors

**Success (Green)**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#f0fdf4](https://via.placeholder.com/20/f0fdf4/f0fdf4.png) | Green 50 | `#f0fdf4` | Success background |
| ![#22c55e](https://via.placeholder.com/20/22c55e/22c55e.png) | Green 500 | `#22c55e` | Success default |
| ![#15803d](https://via.placeholder.com/20/15803d/15803d.png) | **Green 700** | `#15803d` | **Success strong** |

**Warning (Amber)**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#fffbeb](https://via.placeholder.com/20/fffbeb/fffbeb.png) | Amber 50 | `#fffbeb` | Warning background |
| ![#f59e0b](https://via.placeholder.com/20/f59e0b/f59e0b.png) | Amber 500 | `#f59e0b` | Warning default |
| ![#b45309](https://via.placeholder.com/20/b45309/b45309.png) | **Amber 700** | `#b45309` | **Warning strong** |

**Danger/Error (Red)**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#fef2f2](https://via.placeholder.com/20/fef2f2/fef2f2.png) | Red 50 | `#fef2f2` | Error background |
| ![#ef4444](https://via.placeholder.com/20/ef4444/ef4444.png) | Red 500 | `#ef4444` | Error default |
| ![#b91c1c](https://via.placeholder.com/20/b91c1c/b91c1c.png) | **Red 700** | `#b91c1c` | **Error strong** |

**Info (Blue)**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#eff6ff](https://via.placeholder.com/20/eff6ff/eff6ff.png) | Blue 50 | `#eff6ff` | Info background |
| ![#3b82f6](https://via.placeholder.com/20/3b82f6/3b82f6.png) | Blue 500 | `#3b82f6` | Info default |
| ![#1d4ed8](https://via.placeholder.com/20/1d4ed8/1d4ed8.png) | **Blue 700** | `#1d4ed8` | **Info strong** |

---

## 📝 TYPOGRAPHY SCALE

### Font Family
```
System Font Stack:
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
'Helvetica Neue', Arial, sans-serif
```

### Type Ramp (Font Sizes)

| Name | Size (rem) | Size (px) | Line Height | Usage |
|------|-----------|-----------|-------------|--------|
| **xs** | 0.75rem | 12px | 15px (0.9375rem) | Captions, meta, micro labels |
| **sm** | 0.875rem | 14px | 17px (1.0625rem) | Labels, small body, badges |
| **base** | 1rem | 16px | 20px (1.25rem) | Body text, inputs |
| **lg** | 1.125rem | 18px | 22px (1.375rem) | Large body text |
| **xl** | 1.25rem | 20px | 24px (1.5rem) | Small headings, metric labels |
| **2xl** | 1.5rem | 24px | 28px (1.75rem) | h4, card titles |
| **3xl** | 1.875rem | 30px | 36px (2.25rem) | h3 |
| **4xl** | 2.25rem | 36px | 42px (2.625rem) | h2, large scores |
| **5xl** | 3rem | 48px | 56px (3.5rem) | h1, hero text |
| **6xl** | 3.75rem | 60px | 70px (4.375rem) | Large display |
| **7xl** | 4.5rem | 72px | 84px (5.25rem) | Extra large display |
| **8xl** | 6rem | 96px | 112px (7rem) | Letter grades (A, B, C) |
| **9xl** | 8rem | 128px | 150px (9.375rem) | Giant display |

### Semantic Typography (Dashboard-Specific)

| Name | Size (px) | Usage |
|------|-----------|--------|
| **metric-label** | 20px | Metric card labels |
| **metric-value** | 32px | Standard metric values |
| **metric-value-large** | 30px | Emphasized metrics |
| **score-standard** | 36px | Score displays |
| **grade-letter** | 96px | Letter grades (A, B, C) |

### Font Weights

| Name | Value | Usage |
|------|-------|--------|
| Light | 300 | Headings, hero |
| **Normal** | **400** | **Body text** ⭐ |
| **Medium** | **500** | **Labels, buttons** ⭐ |
| **Semibold** | **600** | **Emphasized text** ⭐ |
| **Bold** | **700** | **Headings** ⭐ |

---

## 📏 SPACING SCALE (8px Grid)

| Name | Value (rem) | Value (px) | Usage |
|------|-------------|------------|--------|
| spacing-1 | 0.25rem | 4px | Tight spacing |
| **spacing-2** | **0.5rem** | **8px** | **Base unit** ⭐ |
| spacing-3 | 0.75rem | 12px | Small gaps |
| **spacing-4** | **1rem** | **16px** | **Standard padding** ⭐ |
| spacing-5 | 1.25rem | 20px | Medium gaps |
| **spacing-6** | **1.5rem** | **24px** | **Large padding** ⭐ |
| spacing-8 | 2rem | 32px | Section spacing |
| spacing-12 | 3rem | 48px | Large sections |
| spacing-16 | 4rem | 64px | Page sections |
| spacing-24 | 6rem | 96px | Major sections |

---

## 🔲 BORDER RADIUS

| Name | Value (rem) | Value (px) | Usage |
|------|-------------|------------|--------|
| sm | 0.125rem | 2px | Subtle rounding |
| md | 0.375rem | 6px | Standard inputs |
| **lg** | **0.5rem** | **8px** | **Cards, buttons** ⭐ |
| xl | 0.75rem | 12px | Large cards |
| **2xl** | **1rem** | **16px** | **Modal cards** ⭐ |
| 3xl | 1.5rem | 24px | Hero elements |
| full | 9999px | Full | Pills, avatars |

---

## 🎭 SHADOWS (Elevation)

| Name | Value | Usage |
|------|-------|--------|
| **shadow-sm** | `0 1px 3px rgb(0 0 0 / 0.1)` | **Cards, inputs** ⭐ |
| **shadow-md** | `0 4px 6px rgb(0 0 0 / 0.1)` | **Elevated cards** ⭐ |
| shadow-lg | `0 10px 15px rgb(0 0 0 / 0.1)` | Dropdowns, popovers |
| shadow-xl | `0 20px 25px rgb(0 0 0 / 0.1)` | Modals |
| shadow-2xl | `0 25px 50px rgb(0 0 0 / 0.25)` | Highest elevation |
| shadow-inner | `inset 0 2px 4px rgb(0 0 0 / 0.05)` | Inset elements |

---

## 🧩 COMPONENT LIBRARY

### Button Component

**Variants**: `primary`, `secondary`, `ghost`, `danger`
**Sizes**: `sm`, `md`, `lg`
**States**: `default`, `hover`, `active`, `disabled`, `loading`

#### Primary Button (Default)

**Base Specs:**
- Background: Purple 700 (`#7e22ce`)
- Text: White
- Padding: 12px horizontal × 10px vertical (sm: 8px × 6px, lg: 16px × 12px)
- Border Radius: 8px (`lg`)
- Font Size: 14px (`sm`)
- Font Weight: 500 (Medium)
- Transition: 150ms ease-out

**States:**
```
Default:  bg: #7e22ce
Hover:    bg: #6b21a8 (Purple 800)
Active:   bg: #581c87 (Purple 900)
Disabled: bg: rgb(0 0 0 / 0.12), text: rgb(0 0 0 / 0.38), cursor: not-allowed
```

#### Secondary Button

**Base Specs:**
- Background: Transparent
- Text: Purple 700 (`#7e22ce`)
- Border: 1px solid Neutral 300
- Padding: (same as primary)
- Other specs: (same as primary)

**States:**
```
Default:  bg: transparent, border: neutral-300
Hover:    bg: Purple 50, border: purple-700
Active:   bg: Purple 100
Disabled: (same as primary disabled)
```

#### Ghost Button

**Base Specs:**
- Background: Transparent
- Text: Neutral 800 (`#5D5B59`)
- No border
- Padding: (same as primary)

**States:**
```
Default:  bg: transparent
Hover:    bg: Neutral 100
Active:   bg: Neutral 200
```

#### Button Sizes

| Size | Height | Padding (H × V) | Font Size | Icon Size |
|------|--------|----------------|-----------|-----------|
| **sm** | 32px | 8px × 6px | 12px (xs) | 14px |
| **md** | 40px | 12px × 10px | 14px (sm) | 16px |
| **lg** | 48px | 16px × 12px | 16px (base) | 20px |

---

### Input Components

**Variants**: `default`, `error`
**States**: `default`, `focus`, `disabled`, `error`

#### Text Input (Base)

**Base Specs:**
- Background: White
- Border: 1px solid Neutral 300
- Border Radius: 8px (`lg`)
- Padding: 12px horizontal × 8px vertical
- Font Size: 14px (`sm`)
- Text Color: Neutral 800 (`#5D5B59`)
- Placeholder: Neutral 650 (`#9C9B99`)
- Height: 40px

**States:**
```
Default:  border: neutral-300
Focus:    border: purple-500, ring: 2px purple-700/20
Error:    border: red-300, ring: 2px red-500/20
Disabled: bg: neutral-50, text: neutral-500, cursor: not-allowed
```

#### Currency Input

**Additional Specs:**
- Left padding: 28px (to accommodate $ prefix)
- Prefix icon: "$" (14px, Neutral 500, positioned 12px from left)
- Right controls: Increment/Decrement buttons (24px × 24px)

#### Number Input

**Additional Specs:**
- Right padding: 36px (to accommodate +/− buttons)
- Increment/Decrement controls: 24px × 24px buttons, vertically stacked

#### Percentage Input

**Additional Specs:**
- Right padding: 36px (for % symbol + controls)
- Suffix icon: "%" (14px, Neutral 500)
- Right controls: (same as Number Input)

---

### Card Component

**Variants**: `default`, `elevated`, `outlined`, `gradient`
**Padding**: `none`, `sm`, `md`, `lg`

#### Default Card

**Base Specs:**
- Background: Neutral 300 (`#FAF8F5`)
- Border Radius: 16px (`2xl`)
- Shadow: shadow-sm
- Padding (md): 16px

**Variants:**
```
default:  bg: neutral-300, shadow: shadow-sm
elevated: bg: white, shadow: shadow-md
outlined: bg: white, border: 1px neutral-200, shadow: none
gradient: bg: gradient (radial from warm neutral palette)
```

**Padding Options:**
```
none: 0
sm:   12px (spacing-3)
md:   16px (spacing-4)
lg:   24px (spacing-6)
```

**Interactive State (optional):**
```
Hover: shadow increases (sm → md, md → lg)
       transform: translateY(-2px)
       transition: 200ms ease-out
```

---

### Metric Card (Dashboard)

**Extends**: Card component
**Layout**: Vertical stack

**Specs:**
- Background: White
- Shadow: shadow-sm
- Border Radius: 12px (`xl`)
- Padding: 20px

**Structure:**
```
┌─────────────────────────────────┐
│ Label (text-xl, 20px)           │ ← Metric name
│ Value (text-metric-value, 32px) │ ← Main value (bold)
│ ───────────────────────────     │
│ Slider (if interactive)          │ ← Base UI slider
│ Recalculate button (optional)   │ ← Ghost button
└─────────────────────────────────┘
```

**Label:**
- Font Size: 20px (`xl`)
- Font Weight: 500 (Medium)
- Color: Neutral 700

**Value:**
- Font Size: 32px (`metric-value`)
- Font Weight: 700 (Bold)
- Color: Neutral 900

**Slider (if interactive):**
- Track: Neutral 200
- Fill: Purple 700
- Thumb: 20px circle, white with shadow-md

---

### Composite Score Card

**Large letter grade display (A, B, C)**

**Specs:**
- Background: Green 50 (for A grade)
- Border Radius: 24px (`3xl`)
- Padding: 32px
- Shadow: shadow-md

**Grade Letter:**
- Font Size: 96px (`grade-letter`, 8xl)
- Font Weight: 700 (Bold)
- Color: Green 700 (for A grade)
- Background decoration: Large faded letter (332px or 450px)

**Status Variants:**
```
A Grade: bg: green-50,  text: green-700
B Grade: bg: amber-50,  text: amber-700
C Grade: bg: red-50,    text: red-700
```

---

### Table Component

**Compound component** (uses dot notation)

**Base Specs:**
- Background: White
- Border: 1px solid Neutral 200
- Border Radius: 12px (`xl`)

**Header:**
- Background: Neutral 100
- Font Size: 14px (`sm`)
- Font Weight: 600 (Semibold)
- Color: Neutral 800
- Padding: 12px 16px

**Body Row:**
- Border-bottom: 1px solid Neutral 200
- Font Size: 14px (`sm`)
- Color: Neutral 900
- Padding: 16px

**States:**
```
Striped:   odd rows bg: neutral-50
Hoverable: hover bg: neutral-100
Selected:  bg: purple-50, border-left: 3px solid purple-700
```

---

### Sidebar Navigation

**Compound component** (uses dot notation)

**Specs:**
- Width: 256px (expanded), 72px (collapsed)
- Background: Neutral 500 (`#DFDCD8`)
- Shadow: shadow-md (right edge)

**Nav Item:**
- Height: 48px
- Padding: 12px 16px
- Border Radius: 8px (`lg`)
- Font Size: 14px (`sm`)
- Font Weight: 500 (Medium)

**States:**
```
Default:  bg: transparent, text: neutral-800
Hover:    bg: neutral-400, text: neutral-900
Active:   bg: purple-700, text: white
Disabled: text: neutral-600, cursor: not-allowed
```

**Icon:**
- Size: 20px
- Color: Inherits from text

**Badge (optional):**
- Background: Purple 700 (or semantic color)
- Text: White
- Size: 20px circle
- Font Size: 10px

---

### Form Section & Field

**Form Section:**
- Margin bottom: 32px (`spacing-8`)
- Title: 18px (`lg`), Bold, Neutral 900
- Description: 14px (`sm`), Neutral 700

**Form Field:**
- Label: 14px (`sm`), Medium, Neutral 800
- Margin bottom: 4px
- Input/Select: (see Input Components)
- Error text: 12px (`xs`), Red 600

---

### Badge Component

**Sizes**: `sm`, `md`

**Specs (md):**
- Height: 24px
- Padding: 4px 8px
- Border Radius: 6px (`md`)
- Font Size: 12px (`xs`)
- Font Weight: 500 (Medium)

**Variants:**
```
default: bg: neutral-100, text: neutral-800
success: bg: green-50,   text: green-700
warning: bg: amber-50,   text: amber-700
danger:  bg: red-50,     text: red-700
info:    bg: blue-50,    text: blue-700
```

---

## 🎬 ANIMATIONS & TRANSITIONS

### Duration

| Name | Value | Usage |
|------|-------|--------|
| instant | 0ms | Immediate changes |
| **fast** | **150ms** | **Buttons, inputs** ⭐ |
| normal | 250ms | Standard transitions |
| slow | 350ms | Complex animations |
| slower | 500ms | Page transitions |

### Easing

| Name | Value | Usage |
|------|-------|--------|
| linear | `linear` | Constant speed |
| ease-in | `cubic-bezier(0.4, 0, 1, 1)` | Start slow |
| **ease-out** | **`cubic-bezier(0, 0, 0.2, 1)`** | **End slow** ⭐ |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | Both ends slow |

**Common Pattern:**
```css
transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
```

---

## 🔧 IMPLEMENTATION NOTES

### Design System Architecture

**Single Source of Truth:** All design tokens are defined in `src/index.css` using Tailwind v4's `@theme` directive.

**DO:**
- Use Tailwind utility classes (`bg-purple-700`, `text-xl`, `p-4`)
- Reference semantic tokens for dashboard components
- Follow the 8px spacing grid
- Use forwardRef for all components
- Support className prop for external styling

**DON'T:**
- Create TypeScript token files
- Use arbitrary values without semantic tokens
- Use inline styles for token values
- Create duplicate sources of truth

### Component Patterns

**All components follow this structure:**
1. Use `forwardRef` for ref forwarding
2. Accept `className` prop
3. Use `classNames()` utility for conditional classes
4. Include TypeScript interfaces
5. Support accessibility (ARIA)

**Naming Convention:**
- BEM-style classes: `ui-button`, `ui-button--primary`, `ui-button--lg`
- Compound components use dot notation: `Table.Root`, `Table.Row`, `Table.Cell`

### Base UI Integration

**Foundation:** All components are built on Base UI primitives wrapped with Tailwind styling.

**Pattern:**
```tsx
import { Input as BaseInput } from '@base-ui-components/react/input';

export const Input = ({ ...props }) => (
  <BaseInput className="tailwind-classes" {...props} />
);
```

---

## 📦 QUICK EXPORT FOR FIGMA

### Color Variables (copy-paste ready)

```
// Neutrals
--neutral-300: #FAF8F5  // Cards
--neutral-400: #E8E6E3  // Backgrounds
--neutral-500: #DFDCD8  // Nav
--neutral-800: #5D5B59  // Text secondary
--neutral-900: #3A3836  // Text primary

// Brand
--purple-700: #7e22ce   // Primary
--purple-800: #6b21a8   // Hover
--purple-900: #581c87   // Active

// Semantic
--green-700:  #15803d   // Success
--amber-700:  #b45309   // Warning
--red-700:    #b91c1c   // Error
--blue-700:   #1d4ed8   // Info
```

### Typography Presets

```
Heading 1:    48px / 56px, Bold (700)
Heading 2:    36px / 42px, Bold (700)
Heading 3:    30px / 36px, Bold (700)
Heading 4:    24px / 28px, Bold (700)
Body Large:   18px / 22px, Normal (400)
Body:         16px / 20px, Normal (400)
Body Small:   14px / 17px, Normal (400)
Caption:      12px / 15px, Normal (400)
Button:       14px, Medium (500)
Label:        14px, Medium (500)
```

### Component Dimensions

```
Button (md):  Height 40px, Padding 12px × 10px
Input:        Height 40px, Padding 12px × 8px
Card:         Border-radius 16px, Padding 16px
Modal:        Border-radius 16px, Padding 24px
Badge:        Height 24px, Padding 4px × 8px
Sidebar:      Width 256px, Nav item height 48px
```

---

## 🚀 QUICK START FOR DEVELOPERS

### Using Components

```tsx
import { Button } from '@/components/button/Button';
import { TextInput } from '@/components/form/TextInput';
import { Card } from '@/components/card/Card';

// Button
<Button variant="primary" size="md">Click me</Button>

// Input
<TextInput
  placeholder="Enter text"
  error={hasError}
/>

// Card
<Card variant="elevated" padding="md">
  Card content
</Card>
```

### Using Design Tokens

```tsx
// ✅ DO: Use Tailwind utilities
<div className="bg-neutral-300 text-neutral-900 p-4 rounded-lg">

// ✅ DO: Use semantic tokens (dashboard)
<div className="text-[length:var(--text-metric-value)]">

// ❌ DON'T: Use arbitrary values
<div className="text-[32px]">
```

---

**Last Updated**: 2025-11-06
**Version**: 0.7
**Status**: Production-ready

---

**Questions?** Reference the full design system documentation in `DESIGN_SYSTEM.md` or component source code in `src/components/`.
