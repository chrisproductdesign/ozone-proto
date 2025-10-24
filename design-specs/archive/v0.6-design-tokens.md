# Design Token System

**Version**: 0.7
**Status**: Living Document - Single Source of Truth
**Last Updated**: 2025-10-23

---

## Table of Contents

1. [Foundation & Philosophy](#1-foundation--philosophy)
2. [Core Token Reference](#2-core-token-reference)
3. [Base UI State System](#3-base-ui-state-system)
4. [Component State Matrices](#4-component-state-matrices)
5. [Implementation Patterns](#5-implementation-patterns)
6. [Missing Token Scaffolding](#6-missing-token-scaffolding)
7. [Quick Reference](#7-quick-reference)

---

## 1. Foundation & Philosophy

### 1.1 Architecture Overview

This design system uses a **three-layer architecture**:

```
Design Tokens → Tailwind Config → React Components
     ↓              ↓                    ↓
  colors.ts   tailwind.config.js   ButtonBaseUIWrapper.tsx
  spacing.ts       ↓                    ↓
  typography.ts    Utility Classes      Styled Components
```

**Layer 1: Design Tokens** (`src/design-system/tokens/`)
TypeScript constants defining all design decisions (colors, spacing, typography, etc.)

**Layer 2: Tailwind Configuration** (`tailwind.config.js`)
Maps tokens to Tailwind utility classes for use in components

**Layer 3: React Components** (`src/components/`)
Base UI wrappers and custom components styled with Tailwind classes

### 1.2 Base UI + Tailwind Integration Strategy

**Base UI provides**:
- Unstyled, accessible primitives
- Built-in state management via `data-*` attributes
- Keyboard navigation and ARIA compliance
- Compound component patterns (`.Root`, `.Indicator`, etc.)

**We add**:
- Tailwind CSS styling mapped to our tokens
- Fintech-specific variants and features
- Consistent visual language across all components

**Pattern**:
```tsx
import { Input as BaseInput } from '@base-ui-components/react/input';

// Wrap Base UI with tokens → Tailwind classes
<BaseInput
  className={classNames(
    'px-4 py-2.5',              // spacing tokens
    'rounded-lg',               // border radius token
    'border border-gray-200',   // border tokens
    'text-gray-900',            // text color token
    'focus:border-purple-700',  // semantic color token
    'focus:ring-2 focus:ring-purple-700/20'  // focus ring pattern
  )}
/>
```

### 1.3 Decision Framework

**When to use tokens**:
✅ All spacing, colors, typography in components
✅ All interactive states (hover, focus, active, disabled)
✅ All semantic colors (primary, success, warning, danger)
✅ All shadows, borders, and animations

**When custom values are acceptable**:
⚠️ One-off design explorations with `// TODO: Add to tokens` comment
⚠️ Component-specific values that don't generalize
⚠️ Temporary hardcoded values during rapid iteration (document in code)

**Never acceptable**:
❌ Hardcoded hex colors without documentation
❌ Arbitrary spacing values (`padding: 13px`)
❌ Inconsistent state styling across similar components

### 1.4 File Organization

```
src/design-system/
├── tokens/
│   ├── colors.ts          → Base palette + semantic mappings
│   ├── typography.ts      → Font sizes, weights, presets
│   ├── spacing.ts         → 8px grid + component spacing
│   └── index.ts           → borders, shadows, animations, z-index
├── themes/
│   ├── light.ts           → Light mode theme
│   ├── dark.ts            → Dark mode theme (future)
│   └── index.ts
└── index.ts               → Main export

tailwind.config.js         → Token → Tailwind mappings
```

---

## 2. Core Token Reference

### 2.1 Color System

#### 2.1.1 Base Color Scales

**Location**: `src/design-system/tokens/colors.ts`

All colors use Tailwind's standard scale (50-950):

```typescript
// Neutrals
gray: {
  50: '#f8fafc',   // Lightest backgrounds
  100: '#f1f5f9',  // Subtle backgrounds
  200: '#e2e8f0',  // Default borders
  300: '#cbd5e1',  // Strong borders
  400: '#94a3b8',  // Disabled text, placeholders
  500: '#64748b',  // Tertiary text
  600: '#475569',  // Secondary text
  700: '#334155',  // Emphasis
  800: '#1e293b',  // Dark backgrounds
  900: '#0f172a',  // Primary text
  950: '#020617',  // Darkest
}

// Brand Primary (purple - placeholder, see Section 6 for brand tokens)
purple: { 50...950 }

// Semantic Colors
blue: { 50...950 }    // Secondary actions
green: { 50...950 }   // Success states
amber: { 50...950 }   // Warning states
red: { 50...950 }     // Error/Danger states
```

**Tailwind Usage**: `bg-gray-100`, `text-purple-700`, `border-red-300`

#### 2.1.2 Semantic Color Mappings

**Purpose**: Abstract color intentions from specific hues

```typescript
semanticColors = {
  // Primary Actions (currently purple placeholder)
  primary: {
    DEFAULT: colors.purple[700],     // Main action color
    hover: colors.purple[800],       // Hover state
    active: colors.purple[900],      // Active/pressed state
    subtle: colors.purple[50],       // Backgrounds, focus rings
    subtleHover: colors.purple[100], // Hover on subtle backgrounds
  },

  // Success States
  success: {
    DEFAULT: colors.green[500],      // #22c55e
    hover: colors.green[600],
    active: colors.green[700],
    subtle: colors.green[50],
    subtleHover: colors.green[100],
    border: colors.green[300],
  },

  // Warning States
  warning: {
    DEFAULT: colors.amber[500],      // #f59e0b
    hover: colors.amber[600],
    active: colors.amber[700],
    subtle: colors.amber[50],
    subtleHover: colors.amber[100],
    border: colors.amber[300],
  },

  // Danger/Error States
  danger: {
    DEFAULT: colors.red[500],        // #ef4444
    hover: colors.red[600],
    active: colors.red[700],
    subtle: colors.red[50],
    subtleHover: colors.red[100],
    border: colors.red[300],
  },

  // Text Colors
  text: {
    primary: colors.gray[900],       // Body text, headings
    secondary: colors.gray[600],     // Supporting text
    tertiary: colors.gray[500],      // Muted text, labels
    disabled: colors.gray[400],      // Disabled state
    placeholder: colors.gray[400],   // Input placeholders
    inverse: colors.white,           // Text on dark backgrounds
  },

  // Background Colors
  background: {
    primary: colors.white,           // Default background
    secondary: colors.gray[50],      // Subtle background
    tertiary: colors.gray[100],      // Muted background
    disabled: colors.gray[100],      // Disabled state background
    overlay: 'rgba(0, 0, 0, 0.5)',  // Modal overlays
    inverse: colors.gray[900],       // Dark backgrounds
  },

  // Border Colors
  border: {
    DEFAULT: colors.gray[200],       // Default borders
    light: colors.gray[100],         // Subtle borders
    strong: colors.gray[300],        // Emphasized borders
    focus: colors.blue[500],         // Focus state borders
    error: colors.red[500],          // Error state borders
  },
}
```

**Tailwind Usage**: `bg-primary`, `text-secondary`, `border-focus`

### 2.2 Typography System

**Location**: `src/design-system/tokens/typography.ts`

#### 2.2.1 Type Scale

```typescript
fontSize = {
  xs: '0.75rem',    // 12px - Captions, meta text
  sm: '0.875rem',   // 14px - Labels, small body
  base: '1rem',     // 16px - Body text
  lg: '1.125rem',   // 18px - Large body
  xl: '1.25rem',    // 20px - Small headings
  '2xl': '1.5rem',  // 24px - h4
  '3xl': '1.875rem',// 30px - h3
  '4xl': '2.25rem', // 36px - h2
  '5xl': '3rem',    // 48px - h1
  '6xl': '3.75rem', // 60px - Display
  '7xl': '4.5rem',  // 72px - Large display
}

fontWeight = {
  light: '300',     // Headings, hero text
  normal: '400',    // Body text
  medium: '500',    // Labels, buttons
  semibold: '600',  // Emphasized text
  bold: '700',      // Headings, important text
}

lineHeight = {
  tight: '1.25',    // Headings
  snug: '1.375',    // Sub-headings
  normal: '1.5',    // Body text
  relaxed: '1.625', // Comfortable reading
}

letterSpacing = {
  tight: '-0.025em',  // Headings
  normal: '0',        // Default
  wide: '0.025em',    // Labels
  wider: '0.05em',    // All caps text
}
```

#### 2.2.2 Typography Presets

**Headings**:
```typescript
h1: { fontSize: '3rem', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.025em' }
h2: { fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.25', letterSpacing: '-0.025em' }
h3: { fontSize: '1.875rem', fontWeight: '600', lineHeight: '1.375' }
h4: { fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.375' }
h5: { fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.5' }
h6: { fontSize: '1.125rem', fontWeight: '600', lineHeight: '1.5' }
```

**Body Text**:
```typescript
body.lg: { fontSize: '1.125rem', fontWeight: '400', lineHeight: '1.625' }
body.base: { fontSize: '1rem', fontWeight: '400', lineHeight: '1.5' }
body.sm: { fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.5' }
body.xs: { fontSize: '0.75rem', fontWeight: '400', lineHeight: '1.5' }
```

**UI Elements**:
```typescript
button.lg: { fontSize: '1.125rem', fontWeight: '500', lineHeight: '1.25' }
button.md: { fontSize: '1rem', fontWeight: '500', lineHeight: '1.25' }
button.sm: { fontSize: '0.875rem', fontWeight: '500', lineHeight: '1.25' }

label: { fontSize: '0.875rem', fontWeight: '500', lineHeight: '1.25' }
caption: { fontSize: '0.75rem', fontWeight: '400', lineHeight: '1.5' }
```

**Tailwind Usage**: `text-base font-medium`, `text-2xl font-bold leading-tight`

### 2.3 Spacing System

**Location**: `src/design-system/tokens/spacing.ts`

#### 2.3.1 Base Spacing Scale (8px Grid)

```typescript
spacing = {
  0: '0',
  px: '1px',        // Borders
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px  ← Grid base
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px ← Common base
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  // ... up to 96
}
```

#### 2.3.2 Component Spacing Presets

```typescript
componentSpacing = {
  // Input & Button padding
  input: {
    sm: { x: spacing[2.5], y: spacing[1.5] },  // 10px × 6px
    md: { x: spacing[3.5], y: spacing[2.5] },  // 14px × 10px
    lg: { x: spacing[4], y: spacing[3.5] },    // 16px × 14px
  },

  // Card padding
  card: {
    sm: spacing[3],   // 12px
    md: spacing[4],   // 16px
    lg: spacing[6],   // 24px
  },

  // Section spacing
  section: {
    sm: spacing[4],   // 16px
    md: spacing[8],   // 32px
    lg: spacing[12],  // 48px
  },

  // Stack (vertical) spacing
  stack: {
    xs: spacing[1],   // 4px  - Tight lists
    sm: spacing[2],   // 8px  - Form fields
    md: spacing[4],   // 16px - Card stacks
    lg: spacing[6],   // 24px - Sections
    xl: spacing[8],   // 32px - Page sections
  },

  // Inline (horizontal) spacing
  inline: {
    xs: spacing[1],   // 4px  - Icon + text
    sm: spacing[2],   // 8px  - Button content
    md: spacing[3],   // 12px - Form inputs
    lg: spacing[4],   // 16px - Navigation items
    xl: spacing[6],   // 24px - Cards in grid
  },
}
```

**Tailwind Usage**:
- Direct: `p-4`, `mx-6`, `gap-5`
- Custom: `px-input-md-x`, `py-input-md-y`, `p-card-lg`

### 2.4 Borders, Shadows, and Effects

#### 2.4.1 Border Radius

```typescript
borderRadius = {
  none: '0',
  sm: '0.125rem',     // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',     // 6px
  lg: '0.5rem',       // 8px  ← Common for inputs/buttons
  xl: '0.75rem',      // 12px ← Common for inputs
  '2xl': '1rem',      // 16px ← Common for cards
  '3xl': '1.5rem',    // 24px
  full: '9999px',     // Pills, circles
}
```

**Tailwind Usage**: `rounded-lg`, `rounded-2xl`, `rounded-full`

#### 2.4.2 Box Shadows

```typescript
shadow = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',                                      // Subtle card elevation
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', // Default card
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', // Elevated card
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', // Modal, popover
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', // Dropdown
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',                             // Large modal
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',                             // Input inset
}
```

**Tailwind Usage**: `shadow-sm`, `shadow-md`, `shadow-lg`

#### 2.4.3 Z-Index Layers

```typescript
zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  dropdown: '1000',
  sticky: '1100',
  modal: '1200',
  popover: '1300',
  toast: '1400',
  tooltip: '1500',
}
```

**Tailwind Usage**: `z-modal`, `z-dropdown`, `z-tooltip`

#### 2.4.4 Animation

```typescript
animation = {
  duration: {
    instant: '0ms',
    fast: '150ms',    // Hover, focus transitions
    normal: '250ms',  // Default transitions
    slow: '350ms',    // Complex animations
    slower: '500ms',  // Page transitions
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',        // Recommended for UI
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
}
```

**Tailwind Usage**: `transition-all duration-150 ease-out`

---

## 3. Base UI State System

### 3.1 How Base UI State Attributes Work

Base UI components automatically apply `data-*` attributes based on their state. These attributes can be styled with Tailwind's arbitrary variant syntax.

#### 3.1.1 Available State Attributes

**Interactive States**:
```html
data-disabled    → Component is disabled
data-focused     → Component has focus
data-touched     → User has interacted with component
data-filled      → Component has a value
```

**Validation States** (when wrapped in `Field.Root`):
```html
data-valid       → Passes validation
data-invalid     → Fails validation
data-dirty       → Value has changed from initial
```

**Toggle States** (Checkbox, Switch, etc.):
```html
data-checked     → Component is checked
data-unchecked   → Component is not checked
```

**Readonly State**:
```html
data-readonly    → Component is readonly
```

**Required State**:
```html
data-required    → Component is required
```

### 3.2 Styling Base UI States with Tailwind

#### 3.2.1 Basic Patterns

**Disabled State**:
```tsx
<BaseInput
  disabled
  className="
    bg-white text-gray-900
    data-[disabled]:bg-gray-100
    data-[disabled]:text-gray-400
    data-[disabled]:cursor-not-allowed
  "
/>
```

**Focus State**:
```tsx
<BaseInput
  className="
    border border-gray-200
    data-[focused]:border-purple-700
    data-[focused]:ring-2
    data-[focused]:ring-purple-700/20
  "
/>
```

**Validation States**:
```tsx
<Field.Control
  className="
    border border-gray-200
    data-[invalid]:border-red-500
    data-[invalid]:ring-2
    data-[invalid]:ring-red-500/20
    data-[valid]:border-green-500
  "
/>
```

**Checked State** (Checkbox, Toggle):
```tsx
<Checkbox.Root
  className="
    bg-white border-gray-300
    data-[checked]:bg-purple-700
    data-[checked]:border-purple-700
  "
/>
```

#### 3.2.2 Complete Input Example from Base UI Docs

From Context7 documentation:

```tsx
import { Input } from '@base-ui-components/react/input';

<Input
  placeholder="Name"
  className={classNames(
    // Base styles
    'h-10 w-full max-w-64',
    'rounded-md border',
    'pl-3.5 text-base',

    // Default state
    'border-gray-200 text-gray-900',

    // Focus state (using data attribute)
    'data-[focused]:outline',
    'data-[focused]:outline-2',
    'data-[focused]:-outline-offset-1',
    'data-[focused]:outline-blue-800',

    // Or using pseudo-class
    'focus:outline focus:outline-2',
    'focus:-outline-offset-1',
    'focus:outline-blue-800'
  )}
/>
```

#### 3.2.3 Complete Field Example with Validation

```tsx
import { Field } from '@base-ui-components/react/field';

<Field.Root className="flex w-full max-w-64 flex-col items-start gap-1">
  <Field.Label className="text-sm font-medium text-gray-900">
    Name
  </Field.Label>

  <Field.Control
    required
    placeholder="Required"
    className={classNames(
      // Base
      'h-10 w-full rounded-md border pl-3.5 text-base',

      // Default
      'border-gray-200 text-gray-900',

      // Focus (using tokens)
      'focus:outline focus:outline-2',
      'focus:-outline-offset-1',
      'focus:outline-blue-800',

      // Invalid state
      'data-[invalid]:border-red-500',
      'data-[invalid]:outline-red-500',

      // Disabled state
      'data-[disabled]:bg-gray-100',
      'data-[disabled]:text-gray-400'
    )}
  />

  <Field.Error className="text-sm text-red-800" match="valueMissing">
    Please enter your name
  </Field.Error>

  <Field.Description className="text-sm text-gray-600">
    Visible on your profile
  </Field.Description>
</Field.Root>
```

### 3.3 Mapping Data Attributes to Our Tokens

**Standard Pattern**:

| Base UI Attribute | Token Category | Tailwind Classes | Use Case |
|-------------------|----------------|------------------|----------|
| `data-focused` | `semanticColors.primary` | `data-[focused]:border-purple-700 data-[focused]:ring-2 data-[focused]:ring-purple-700/20` | Focus rings, borders |
| `data-invalid` | `semanticColors.danger` | `data-[invalid]:border-red-500 data-[invalid]:ring-red-500/20` | Validation errors |
| `data-valid` | `semanticColors.success` | `data-[valid]:border-green-500` | Success states |
| `data-disabled` | `semanticColors.text.disabled`, `semanticColors.background.disabled` | `data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400` | Disabled states |
| `data-checked` | `semanticColors.primary` | `data-[checked]:bg-purple-700 data-[checked]:text-white` | Toggles, checkboxes |
| `data-dirty` | `semanticColors.warning` (optional) | `data-[dirty]:border-amber-300` | Changed values |

---

## 4. Component State Matrices

### 4.1 Input Components

**Components**: `TextInput`, `NumberInput`, `CurrencyInput`, `SelectInput`, Base UI `Input` wrapper

#### 4.1.1 Input State Matrix

| State | Background | Border | Text | Focus Ring | Typography |
|-------|-----------|--------|------|-----------|-----------|
| **Default** | `bg-white` | `border-gray-200` | `text-gray-900` | none | `text-base` |
| **Hover** | `bg-white` | `border-gray-300` | `text-gray-900` | none | `text-base` |
| **Focus** | `bg-white` | `border-purple-700` | `text-gray-900` | `ring-2 ring-purple-700/20` | `text-base` |
| **Filled** | `bg-white` | `border-gray-200` | `text-gray-900` | none | `text-base` |
| **Error** | `bg-white` | `border-red-500` | `text-gray-900` | `ring-2 ring-red-500/20` | `text-base` |
| **Valid** | `bg-white` | `border-green-500` | `text-gray-900` | `ring-2 ring-green-500/20` | `text-base` |
| **Disabled** | `bg-gray-100` | `border-gray-100` | `text-gray-400` | none | `text-base` |

**Placeholder**: `placeholder:text-gray-400`

#### 4.1.2 Input Size Variants

| Size | Padding X | Padding Y | Text Size | Height |
|------|-----------|-----------|-----------|--------|
| `sm` | `px-3` (`componentSpacing.input.sm.x`) | `py-1.5` | `text-sm` | `h-8` |
| `md` | `px-4` (`componentSpacing.input.md.x`) | `py-2.5` | `text-base` | `h-10` |
| `lg` | `px-4` (`componentSpacing.input.lg.x`) | `py-3.5` | `text-lg` | `h-12` |

#### 4.1.3 Complete Input Implementation

```tsx
// From InputBaseUIWrapper.tsx (existing implementation)
const variantClasses: Record<InputVariant, string> = {
  default: `
    bg-white border-gray-200
    hover:border-gray-300
    focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20
    disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100
  `,
  error: `
    bg-white border-red-500
    hover:border-red-600
    focus:border-red-500 focus:ring-2 focus:ring-red-500/20
    disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100
  `,
  success: `
    bg-white border-green-500
    hover:border-green-600
    focus:border-green-500 focus:ring-2 focus:ring-green-500/20
    disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100
  `,
}
```

### 4.2 Button Components

**Component**: `ButtonBaseUIWrapper`, Base UI Button wrapper

#### 4.2.1 Button Variant Matrix

| Variant | State | Background | Text | Border | Ring |
|---------|-------|-----------|------|---------|------|
| **Primary** | Default | `bg-purple-700` | `text-white` | none | none |
| | Hover | `bg-purple-800` | `text-white` | none | none |
| | Active | `bg-purple-900` | `text-white` | none | none |
| | Focus | `bg-purple-700` | `text-white` | none | `ring-2 ring-purple-700 ring-offset-2` |
| | Disabled | `bg-gray-200` | `text-gray-400` | none | none |
| **Secondary** | Default | `bg-white` | `text-gray-900` | `border-gray-200` | none |
| | Hover | `bg-gray-50` | `text-gray-900` | `border-gray-200` | none |
| | Active | `bg-gray-100` | `text-gray-900` | `border-gray-200` | none |
| | Focus | `bg-white` | `text-gray-900` | `border-gray-200` | `ring-2 ring-gray-500 ring-offset-2` |
| | Disabled | `bg-gray-50` | `text-gray-400` | `border-gray-100` | none |
| **Ghost** | Default | `bg-transparent` | `text-gray-700` | none | none |
| | Hover | `bg-gray-100` | `text-gray-700` | none | none |
| | Active | `bg-gray-200` | `text-gray-700` | none | none |
| | Focus | `bg-transparent` | `text-gray-700` | none | `ring-2 ring-gray-500 ring-offset-2` |
| | Disabled | `bg-transparent` | `text-gray-400` | none | none |
| **Danger** | Default | `bg-red-500` | `text-white` | none | none |
| | Hover | `bg-red-600` | `text-white` | none | none |
| | Active | `bg-red-700` | `text-white` | none | none |
| | Focus | `bg-red-500` | `text-white` | none | `ring-2 ring-red-500 ring-offset-2` |
| | Disabled | `bg-gray-200` | `text-gray-400` | none | none |
| **Success** | Default | `bg-green-500` | `text-white` | none | none |
| | Hover | `bg-green-600` | `text-white` | none | none |
| | Active | `bg-green-700` | `text-white` | none | none |
| | Focus | `bg-green-500` | `text-white` | none | `ring-2 ring-green-500 ring-offset-2` |
| | Disabled | `bg-gray-200` | `text-gray-400` | none | none |

#### 4.2.2 Button Size Variants

| Size | Padding X | Padding Y | Text Size | Font Weight |
|------|-----------|-----------|-----------|-------------|
| `sm` | `px-3` | `py-1.5` | `text-sm` | `font-medium` |
| `md` | `px-4` | `py-2.5` | `text-base` | `font-medium` |
| `lg` | `px-6` | `py-3.5` | `text-lg` | `font-medium` |

#### 4.2.3 Complete Button Implementation

```tsx
// From ButtonBaseUIWrapper.tsx (existing implementation)
const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-purple-700 text-white border-transparent
    hover:bg-purple-800 active:bg-purple-900
    focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2
    disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  secondary: `
    bg-white text-gray-900 border-gray-200
    hover:bg-gray-50 active:bg-gray-100
    focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
    disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  ghost: `
    bg-transparent text-gray-700 border-transparent
    hover:bg-gray-100 active:bg-gray-200
    focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
    disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  danger: `
    bg-red-500 text-white border-transparent
    hover:bg-red-600 active:bg-red-700
    focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
    disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  success: `
    bg-green-500 text-white border-transparent
    hover:bg-green-600 active:bg-green-700
    focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2
    disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
  `,
}
```

### 4.3 Card Components

**Components**: `ScoreCard`, `MetricCard`, `ConfidenceCard`, generic `Card`

#### 4.3.1 Card Base Styles

| Element | Background | Border | Shadow | Radius | Padding |
|---------|-----------|--------|--------|--------|---------|
| Card Base | `bg-white` | none | `shadow-sm` | `rounded-2xl` | `p-5` (20px) |
| Card Hover | `bg-white` | none | `shadow-md` | `rounded-2xl` | `p-5` |
| Card Large | `bg-white` | none | `shadow-sm` | `rounded-2xl` | `p-8` (32px) |

#### 4.3.2 Card Typography Patterns

| Element | Token | Tailwind Classes |
|---------|-------|------------------|
| Card Title (uppercase) | `typography.caption` | `text-xs font-medium uppercase tracking-wide text-gray-500` |
| Card Value (large number) | `typography.h1` or `h2` | `text-7xl font-bold text-gray-900` |
| Card Description | `typography.body.base` | `text-base text-gray-600` |
| Metric Label | `typography.caption` | `text-xs font-medium uppercase tracking-wide text-gray-700` |
| Metric Value | `typography.h4` | `text-3xl font-bold text-gray-900` |

#### 4.3.3 ScoreCard Implementation

**Current** (from `ScoreCard.tsx`):
```tsx
<div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col">
  {/* Title */}
  <h3 className="text-xs font-medium text-gray-500 tracking-wide uppercase">
    COMPOSITE SCORE
  </h3>

  {/* Score */}
  <div className="text-7xl font-bold text-gray-900" style={{ color: '#4A3F42' }}>
    {score.toFixed(2)}
  </div>

  {/* Description */}
  <p className="text-gray-600 text-base">
    Strong revenue predictability
  </p>
</div>
```

**Hardcoded Values**:
- ❌ `style={{ color: '#4A3F42' }}` → Should use token (see Section 6)
- ❌ `style={{ backgroundColor: '#D0F5ED' }}` (badge) → Should use status token

#### 4.3.4 MetricCard Implementation

**Current** (from `MetricCard.tsx`):
```tsx
<div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col">
  {/* Label with icon */}
  <div className="flex items-center gap-2 mb-4">
    {icon}
    <h3 className="text-xs font-medium text-gray-700 tracking-wide uppercase">
      {label}
    </h3>
  </div>

  {/* Value */}
  <div className="text-3xl font-bold text-gray-900 mb-6">
    {value}
  </div>

  {/* Slider (optional) */}
  <BaseUISlider value={sliderValue} min={min} max={max} onChange={onChange} />
</div>
```

✅ **Good**: Uses token-based Tailwind classes consistently

#### 4.3.5 ConfidenceCard Implementation

**Current** (from `ConfidenceCard.tsx`):
```tsx
<div
  className="rounded-2xl p-5 shadow-sm flex flex-col justify-between"
  style={{ backgroundColor: '#D0F5ED' }}
>
  {/* Title */}
  <h3 className="text-xs font-medium text-gray-700 tracking-wide uppercase">
    CONFIDENCE PREDICTION
  </h3>

  {/* Prediction */}
  <div className="text-4xl font-bold" style={{ color: '#0A7A6B' }}>
    {prediction}
  </div>

  {/* Description */}
  <p className="text-gray-700 text-base">
    {description}
  </p>
</div>
```

**Hardcoded Values**:
- ❌ `style={{ backgroundColor: '#D0F5ED' }}` → Should use status token
- ❌ `style={{ color: '#0A7A6B' }}` → Should use status token

### 4.4 Status Badges

**Current Implementation** (from `ScoreCard.tsx`):

```tsx
<span
  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-teal-700"
  style={{ backgroundColor: '#D0F5ED' }}
>
  <svg>...</svg>
  High
</span>
```

#### 4.4.1 Status Badge Matrix (Needs Tokens - See Section 6)

| Status | Background | Text | Icon | Border |
|--------|-----------|------|------|--------|
| **High** | `#D0F5ED` (teal-50 variant) | `text-teal-700` | `text-teal-700` | none |
| **Medium** | `bg-yellow-50` | `text-yellow-700` | `text-yellow-700` | none |
| **Low** | `bg-red-50` | `text-red-700` | `text-red-700` | none |

**Badge Structure**:
```tsx
className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
```

### 4.5 Navigation (Tabs)

**Current Implementation** (from Dashboard playground):

#### 4.5.1 Tab State Matrix

| State | Text | Border Bottom | Background |
|-------|------|---------------|-----------|
| **Inactive** | `text-gray-500` | `border-transparent` | `bg-transparent` |
| **Hover** | `text-gray-700` | `border-transparent` | `bg-transparent` |
| **Active** | `text-gray-900` | `border-gray-900` (2px) | `bg-transparent` |
| **Focus** | (same as state) | (same as state) | `bg-transparent` |

**Tab Structure**:
```tsx
// Inactive
className="py-3 px-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 transition-colors"

// Active
className="py-3 px-1 text-sm font-medium text-gray-900 border-b-2 border-gray-900"
```

### 4.6 Form Elements

#### 4.6.1 FormField (Label + Input wrapper)

**From `FormField.tsx`**:

```tsx
// Label
<label className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
  {label}
  {required && <span className="text-red-500">*</span>}
</label>

// Helper text
<p className="text-sm text-gray-500">
  {helperText}
</p>

// Error text
<p className="text-sm text-red-500">
  {errorText}
</p>
```

#### 4.6.2 Form Element Tokens

| Element | Token | Tailwind Classes |
|---------|-------|------------------|
| Label | `typography.label` | `text-xs font-medium text-gray-700` |
| Helper Text | `typography.body.sm` | `text-sm text-gray-500` |
| Error Text | `typography.body.sm` + `semanticColors.danger` | `text-sm text-red-500` |
| Required Indicator | `semanticColors.danger` | `text-red-500` |
| Success Indicator | `semanticColors.success` | `text-green-600` |

---

## 5. Implementation Patterns

### 5.1 Base UI Wrapper Pattern

**Template** for creating new Base UI wrappers:

```tsx
import { forwardRef } from 'react';
import { SomeComponent as BaseSomeComponent } from '@base-ui-components/react/some-component';
import { classNames } from '@/lib/classNames';
import type { ReactNode, ComponentHTMLAttributes } from 'react';

// Define your custom props
export interface SomeComponentProps extends ComponentHTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  // ... other custom props
}

// Map variants to token-based Tailwind classes
const variantClasses: Record<string, string> = {
  default: `
    bg-white text-gray-900 border-gray-200
    hover:bg-gray-50
    focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20
  `,
  primary: `
    bg-purple-700 text-white border-transparent
    hover:bg-purple-800
    focus:ring-2 focus:ring-purple-700 focus:ring-offset-2
  `,
  // ... other variants
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3.5 text-lg',
};

export const SomeComponent = forwardRef<HTMLElement, SomeComponentProps>(
  ({ variant = 'default', size = 'md', className, ...props }, ref) => {
    return (
      <BaseSomeComponent
        ref={ref}
        className={classNames(
          // Base styles (always applied)
          'inline-flex items-center',
          'rounded-lg border',
          'transition-all duration-150 ease-out',

          // Variant styles
          variantClasses[variant],

          // Size styles
          sizeClasses[size],

          // Custom className overrides
          className
        )}
        {...props}
      />
    );
  }
);

SomeComponent.displayName = 'SomeComponent';
```

### 5.2 Using classNames Helper

**Location**: `src/lib/classNames.ts`

```tsx
import { classNames } from '@/lib/classNames';

// Combine multiple class strings
classNames(
  'base-class',
  condition && 'conditional-class',
  variant === 'primary' && 'variant-class',
  className  // User overrides
)

// Example
<div className={classNames(
  'flex items-center',           // Base layout
  'p-4 rounded-lg',              // Spacing & borders
  'bg-white shadow-sm',          // Background & elevation
  error && 'border-red-500',     // Conditional error state
  disabled && 'opacity-50',      // Conditional disabled
  className                      // Custom overrides
)} />
```

### 5.3 Importing Tokens in TypeScript

```tsx
// Import specific token categories
import { colors, semanticColors } from '@/design-system/tokens/colors';
import { spacing, componentSpacing } from '@/design-system/tokens/spacing';
import { typography } from '@/design-system/tokens/typography';
import { borderRadius, shadow } from '@/design-system/tokens';

// Use in style objects (rare - prefer Tailwind classes)
const customStyle = {
  backgroundColor: semanticColors.primary.DEFAULT,
  padding: componentSpacing.card.md,
  borderRadius: borderRadius.lg,
};

// Type-safe token references
import type { SemanticColorToken } from '@/design-system/tokens/colors';

const buttonColor: SemanticColorToken = 'primary';
```

### 5.4 When to Use className vs. style

**Prefer `className` with Tailwind** (95% of cases):
```tsx
✅ <div className="bg-purple-700 p-4 rounded-lg shadow-sm" />
```

**Use `style={{ }}` only when**:
1. Dynamic values not in tokens:
   ```tsx
   <div style={{ width: `${progress}%` }} />
   ```

2. Temporary hardcoded values during iteration:
   ```tsx
   {/* TODO: Add to statusColors.high.bg in tokens/colors.ts */}
   <div style={{ backgroundColor: '#D0F5ED' }} />
   ```

3. CSS properties not supported by Tailwind:
   ```tsx
   <div style={{ scrollSnapAlign: 'start' }} />
   ```

**Never use `style` for**:
❌ Colors that should be tokens
❌ Spacing that should use the 8px grid
❌ Typography that should use presets

### 5.5 Responsive Design Pattern

```tsx
<div className={classNames(
  // Mobile-first base styles
  'flex flex-col',
  'p-4',
  'text-sm',

  // Tablet (md: 768px)
  'md:flex-row',
  'md:p-6',
  'md:text-base',

  // Desktop (lg: 1024px)
  'lg:p-8',
  'lg:text-lg'
)} />
```

### 5.6 Dark Mode Pattern (Future)

```tsx
<div className={classNames(
  // Light mode (default)
  'bg-white text-gray-900',

  // Dark mode
  'dark:bg-gray-900 dark:text-white'
)} />
```

---

## 6. Missing Token Scaffolding

### 6.1 Brand-Specific Colors (Needs Definition)

**Currently hardcoded in components**:
- Page background: `#F5F2ED` (cream) - used in Dashboard, DealInput
- Button primary: `#4A4543` (brown) - used in buttons
- Score emphasis: `#4A3F42` (dark brown) - used in ScoreCard

**Proposed token structure** (`src/design-system/tokens/colors.ts`):

```typescript
// Add to semanticColors
export const brandColors = {
  // Page-level backgrounds
  pageBackground: '#F5F2ED',  // Cream background

  // Brand primary (replace purple placeholder)
  primary: {
    DEFAULT: '#4A4543',        // Brown button color
    hover: '#3A3533',          // Darker on hover
    active: '#2A2523',         // Even darker on active
  },

  // Emphasis colors
  emphasis: {
    primary: '#4A3F42',        // Dark brown for scores
    secondary: '#6B5B73',      // Purple-brown for accents
  },
}

// Usage in Tailwind config
theme: {
  extend: {
    backgroundColor: {
      'page': brandColors.pageBackground,
      'brand': brandColors.primary.DEFAULT,
      'brand-hover': brandColors.primary.hover,
    },
    textColor: {
      'emphasis': brandColors.emphasis.primary,
    }
  }
}
```

**Migration checklist**:
- [ ] Update `semanticColors.primary` from purple to brown
- [ ] Add `pageBackground` token
- [ ] Add `emphasis` color tokens
- [ ] Replace all `style={{ backgroundColor: '#F5F2ED' }}` with `bg-page`
- [ ] Replace all `style={{ color: '#4A3F42' }}` with `text-emphasis`
- [ ] Update ButtonBaseUIWrapper to use new brand colors
- [ ] Update Tailwind config to expose new tokens

### 6.2 Status Color System (Needs Definition)

**Currently hardcoded**:
- High status: `#D0F5ED` (teal background), `text-teal-700`
- Confidence card: `#D0F5ED` (background), `#0A7A6B` (text)

**Proposed token structure**:

```typescript
// Add to colors.ts
export const statusColors = {
  high: {
    bg: '#D0F5ED',           // Teal-50 variant
    bgHover: '#B8ECE3',      // Slightly darker on hover
    text: '#0A7A6B',         // Teal-700 variant
    icon: '#0A7A6B',         // Same as text
    border: '#7DD3C0',       // Teal-300 variant
  },
  medium: {
    bg: colors.yellow[50],   // '#fffbeb'
    bgHover: colors.yellow[100],
    text: colors.yellow[700], // '#b45309'
    icon: colors.yellow[700],
    border: colors.yellow[300],
  },
  low: {
    bg: colors.red[50],      // '#fef2f2'
    bgHover: colors.red[100],
    text: colors.red[700],   // '#b91c1c'
    icon: colors.red[700],
    border: colors.red[300],
  },
}

// Tailwind config extension
theme: {
  extend: {
    backgroundColor: {
      'status-high': statusColors.high.bg,
      'status-medium': statusColors.medium.bg,
      'status-low': statusColors.low.bg,
    },
    textColor: {
      'status-high': statusColors.high.text,
      'status-medium': statusColors.medium.text,
      'status-low': statusColors.low.text,
    }
  }
}
```

**Migration checklist**:
- [ ] Add statusColors to tokens/colors.ts
- [ ] Update Tailwind config
- [ ] Replace `style={{ backgroundColor: '#D0F5ED' }}` in ScoreCard with `bg-status-high`
- [ ] Replace `style={{ color: '#0A7A6B' }}` in ConfidenceCard with `text-status-high`
- [ ] Create StatusBadge component using status tokens
- [ ] Update all badge implementations to use status tokens

### 6.3 Icon Sizing Tokens (Needs Definition)

**Currently**: Inconsistent icon sizes (`w-4 h-4`, `w-5 h-5`, inline styles)

**Proposed token structure**:

```typescript
// Add to tokens/index.ts
export const iconSize = {
  xs: '0.75rem',   // 12px - Inline with small text
  sm: '1rem',      // 16px - Inline with body text
  md: '1.25rem',   // 20px - Standalone icons
  lg: '1.5rem',    // 24px - Larger standalone
  xl: '2rem',      // 32px - Feature icons
  '2xl': '3rem',   // 48px - Hero icons
}

// Tailwind config
theme: {
  extend: {
    width: {
      'icon-xs': iconSize.xs,
      'icon-sm': iconSize.sm,
      'icon-md': iconSize.md,
      'icon-lg': iconSize.lg,
      'icon-xl': iconSize.xl,
      'icon-2xl': iconSize['2xl'],
    },
    height: {
      'icon-xs': iconSize.xs,
      'icon-sm': iconSize.sm,
      'icon-md': iconSize.md,
      'icon-lg': iconSize.lg,
      'icon-xl': iconSize.xl,
      'icon-2xl': iconSize['2xl'],
    }
  }
}
```

**Usage**:
```tsx
<svg className="w-icon-sm h-icon-sm" />  // 16px
<svg className="w-icon-md h-icon-md" />  // 20px
```

### 6.4 Focus Ring Patterns (Needs Standardization)

**Currently**: Inconsistent focus rings across components

**Proposed token structure**:

```typescript
// Add to tokens/index.ts
export const focusRing = {
  // Standard focus ring (most inputs, buttons)
  default: {
    width: '2px',
    offset: '0px',
    color: 'rgba(126, 34, 206, 0.2)', // purple-700 @ 20%
    style: 'ring-2 ring-purple-700/20',
  },

  // Focus ring with offset (buttons with backgrounds)
  offset: {
    width: '2px',
    offset: '2px',
    color: 'rgba(126, 34, 206, 0.5)', // purple-700 @ 50%
    style: 'ring-2 ring-purple-700 ring-offset-2',
  },

  // Error focus ring
  error: {
    width: '2px',
    offset: '0px',
    color: 'rgba(239, 68, 68, 0.2)', // red-500 @ 20%
    style: 'ring-2 ring-red-500/20',
  },

  // Success focus ring
  success: {
    width: '2px',
    offset: '0px',
    color: 'rgba(34, 197, 94, 0.2)', // green-500 @ 20%
    style: 'ring-2 ring-green-500/20',
  },
}
```

**Standard application**:
```tsx
// Input focus
focus:ring-2 focus:ring-purple-700/20

// Button focus (with offset)
focus:ring-2 focus:ring-purple-700 focus:ring-offset-2

// Error input focus
focus:ring-2 focus:ring-red-500/20
```

---

## 7. Quick Reference

### 7.1 Token Lookup by Use Case

#### "I need to style a..."

**Button**:
```tsx
// Primary action
className="bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white px-4 py-2.5 rounded-lg"

// Secondary action
className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 border border-gray-200 px-4 py-2.5 rounded-lg"

// Destructive action
className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2.5 rounded-lg"
```

**Input field**:
```tsx
className="
  bg-white border border-gray-200 rounded-lg px-4 py-2.5
  text-base text-gray-900 placeholder:text-gray-400
  focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20
  disabled:bg-gray-100 disabled:text-gray-400
"
```

**Card**:
```tsx
className="bg-white rounded-2xl p-5 shadow-sm"
```

**Large card**:
```tsx
className="bg-white rounded-2xl p-8 shadow-sm"
```

**Heading**:
```tsx
// h1
className="text-5xl font-bold leading-tight tracking-tight text-gray-900"

// h2
className="text-4xl font-bold leading-tight tracking-tight text-gray-900"

// h4
className="text-2xl font-semibold leading-snug text-gray-900"
```

**Body text**:
```tsx
// Primary body
className="text-base text-gray-900"

// Secondary body
className="text-base text-gray-600"

// Small text
className="text-sm text-gray-600"

// Caption/meta text
className="text-xs text-gray-500"
```

**Label**:
```tsx
className="text-sm font-medium text-gray-700"
```

**Error message**:
```tsx
className="text-sm text-red-500"
```

**Success message**:
```tsx
className="text-sm text-green-600"
```

### 7.2 Common Patterns Cheat Sheet

#### Focus States
```tsx
// Input focus
focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20

// Button focus
focus:ring-2 focus:ring-purple-700 focus:ring-offset-2

// Link focus
focus:outline-2 focus:outline-purple-700
```

#### Disabled States
```tsx
// Input disabled
disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed

// Button disabled
disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
```

#### Hover States
```tsx
// Card hover
hover:shadow-md

// Button hover
hover:bg-purple-800

// Secondary button hover
hover:bg-gray-50

// Link hover
hover:text-purple-800
```

#### Transitions
```tsx
// Standard transition
transition-all duration-150 ease-out

// Color transition only
transition-colors duration-150 ease-out

// Shadow transition
transition-shadow duration-150 ease-out
```

### 7.3 Spacing Quick Reference

#### Common Component Spacing
```tsx
// Button padding
px-4 py-2.5           // md button (14px × 10px)
px-6 py-3.5           // lg button (24px × 14px)

// Input padding
px-4 py-2.5           // md input (14px × 10px)

// Card padding
p-5                   // md card (20px)
p-8                   // lg card (32px)

// Stack gap (vertical)
gap-2                 // Tight (8px) - form fields
gap-4                 // Medium (16px) - card stacks
gap-6                 // Loose (24px) - sections

// Grid gap (horizontal + vertical)
gap-5                 // 20px - common for card grids
```

#### Section Spacing
```tsx
// Between sections
mb-8                  // 32px
mb-12                 // 48px

// Page padding
px-6 py-8             // Desktop (24px × 32px)
px-4 py-6             // Mobile (16px × 24px)
```

### 7.4 Color Quick Reference

#### Text Colors by Use
```tsx
text-gray-900         // Primary text (headings, body)
text-gray-600         // Secondary text (descriptions)
text-gray-500         // Tertiary text (meta, labels)
text-gray-400         // Disabled, placeholders
text-white            // Inverse text (on dark backgrounds)

text-purple-700       // Brand primary
text-red-500          // Errors
text-green-600        // Success
text-amber-500        // Warnings
```

#### Background Colors by Use
```tsx
bg-white              // Default background
bg-gray-50            // Subtle background
bg-gray-100           // Muted background, disabled states
bg-purple-700         // Primary button
bg-red-500            // Danger button
bg-green-500          // Success button
```

#### Border Colors by Use
```tsx
border-gray-200       // Default borders
border-gray-300       // Strong borders, hover states
border-purple-700     // Focus borders
border-red-500        // Error borders
border-green-500      // Success borders
```

### 7.5 Migration Checklist

When replacing hardcoded values with tokens:

**Step 1: Identify hardcoded value**
```tsx
// ❌ Before
<div style={{ backgroundColor: '#F5F2ED' }}>
```

**Step 2: Find matching token**
Check Section 6 or token files for closest match

**Step 3: Add token if needed**
```typescript
// src/design-system/tokens/colors.ts
export const brandColors = {
  pageBackground: '#F5F2ED',
}
```

**Step 4: Update Tailwind config**
```javascript
// tailwind.config.js
theme: {
  extend: {
    backgroundColor: {
      'page': brandColors.pageBackground,
    }
  }
}
```

**Step 5: Replace in component**
```tsx
// ✅ After
<div className="bg-page">
```

**Step 6: Document in commit**
```
refactor: Replace hardcoded page background with bg-page token

- Moved #F5F2ED to brandColors.pageBackground
- Updated Tailwind config with bg-page utility
- Replaced inline styles in Dashboard and DealInput
```

---

## Appendix A: Token File Locations

**Colors**: `src/design-system/tokens/colors.ts`
**Typography**: `src/design-system/tokens/typography.ts`
**Spacing**: `src/design-system/tokens/spacing.ts`
**Other tokens**: `src/design-system/tokens/index.ts` (borders, shadows, animations, z-index)
**Themes**: `src/design-system/themes/light.ts`, `dark.ts`
**Tailwind config**: `tailwind.config.js`

## Appendix B: Related Documentation

- **Base UI Documentation**: `docs/llms.txt`
- **Base UI Component Catalog**: `docs/catalog/components/*.json`
- **Tailwind Workflow**: `TAILWIND_WORKFLOW.md`
- **Git Workflow**: `GIT_WORKFLOW.md`
- **Main Project Guide**: `CLAUDE.md`

---

**End of Design Token System Documentation**

This document is the single source of truth for all token usage. Update token values in `src/design-system/tokens/` files independently without changing component implementations.
