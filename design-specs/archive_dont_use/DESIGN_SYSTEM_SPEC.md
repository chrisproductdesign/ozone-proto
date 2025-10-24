# Design System Specification

**Version**: 0.5
**Status**: In iteration - Token values subject to change
**Purpose**: LLM-actionable component-to-token mapping reference

---

## Token Architecture

### Token Categories
```
src/design-system/tokens/
├── colors.ts          → Color palette + semantic mappings
├── typography.ts      → Type scale + component presets
├── spacing.ts         → 8px grid + component spacing
├── borders.ts         → Border radius tokens
├── shadows.ts         → Elevation system
└── animation.ts       → Duration and easing
```

### Token Format
All tokens exported as TypeScript constants:
```typescript
export const colors = { ... } as const;
export const typography = { ... } as const;
```

---

## Component Foundation: Base UI + Tailwind

### Base UI Pattern
- **Unstyled primitives** with accessibility built-in
- **State attributes**: `data-disabled`, `data-checked`, `data-focused`, etc.
- **Compound components**: `Component.Root`, `Component.Indicator`, etc.
- **Styling via**: `className` prop with Tailwind utilities

### State System
Base UI provides data attributes for all interactive states:
- `data-disabled` → Disabled state
- `data-focused` → Focus state
- `data-checked` / `data-unchecked` → Toggle states
- `data-valid` / `data-invalid` → Validation states
- `data-dirty` → Modified state
- `data-touched` → Interaction state

---

## Core Components Token Map

### 1. Form Input (TextInput, SelectInput, NumberInput, CurrencyInput)

**Base Component**: `<input>` / Base UI Input wrapper
**Current Implementation**: `src/components/form/TextInput.tsx`

#### State Matrix

| State | Background | Border | Text | Ring/Focus | Typography |
|-------|-----------|--------|------|-----------|-----------|
| **Default** | `background.primary` (white) | `border.DEFAULT` (gray-300) | `text.primary` (gray-900) | none | `typography.body.base` |
| **Hover** | `background.primary` | `border.DEFAULT` | `text.primary` | none | `typography.body.base` |
| **Focus** | `background.primary` | `semanticColors.primary.DEFAULT` (purple-500) | `text.primary` | `ring-4 ring-purple-50` | `typography.body.base` |
| **Filled** | `background.primary` | `border.DEFAULT` | `text.primary` | none | `typography.body.base` |
| **Error** | `background.primary` | `semanticColors.danger.border` (red-300) | `text.primary` | `ring-4 ring-red-50` | `typography.body.base` |
| **Disabled** | `background.disabled` (gray-100) | `border.light` (gray-100) | `text.disabled` (gray-400) | none | `typography.body.base` |

#### Token Mapping
```typescript
// Default state
className="
  px-3.5 py-2.5               // spacing: componentSpacing.input.md
  rounded-lg                   // borders: md (8px)
  border border-gray-300       // border.DEFAULT
  bg-white text-gray-900       // background.primary, text.primary
  text-sm                      // typography.body.base
  placeholder:text-gray-400    // text.placeholder
"

// Focus state (via data-focused or :focus)
className="
  focus:border-purple-500      // semanticColors.primary.DEFAULT
  focus:ring-4                 // Focus ring width
  focus:ring-purple-50         // semanticColors.primary.subtle
"

// Error state (via error prop or data-invalid)
className="
  border-red-300               // semanticColors.danger.border
  focus:border-red-400         // semanticColors.danger.DEFAULT
  focus:ring-red-50            // semanticColors.danger.subtle
"
```

---

### 2. Button (Primary, Secondary, Ghost, Danger)

**Base Component**: Base UI Button or `<button>`
**Current Implementation**: `src/components/button/Button.tsx` (BEM CSS)

#### State Matrix

| Variant | State | Background | Text | Border | Shadow | Typography |
|---------|-------|-----------|------|---------|--------|-----------|
| **Primary** | Default | `semanticColors.primary.DEFAULT` | `text.inverse` | none | none | `typography.button.md` |
| | Hover | `semanticColors.primary.hover` | `text.inverse` | none | none | `typography.button.md` |
| | Active | `semanticColors.primary.active` | `text.inverse` | none | none | `typography.button.md` |
| | Focus | `semanticColors.primary.DEFAULT` | `text.inverse` | none | `shadows.focus-primary` | `typography.button.md` |
| | Disabled | `semanticColors.primary.DEFAULT` (50% opacity) | `text.inverse` (50% opacity) | none | none | `typography.button.md` |
| **Secondary** | Default | `background.primary` | `text.primary` | `border.DEFAULT` | none | `typography.button.md` |
| | Hover | `background.secondary` | `text.primary` | `border.strong` | none | `typography.button.md` |
| | Active | `background.tertiary` | `text.primary` | `border.strong` | none | `typography.button.md` |
| | Focus | `background.primary` | `text.primary` | `border.DEFAULT` | `shadows.focus-secondary` | `typography.button.md` |
| | Disabled | `background.disabled` | `text.disabled` | `border.light` | none | `typography.button.md` |
| **Ghost** | Default | `transparent` | `text.primary` | none | none | `typography.button.md` |
| | Hover | `background.overlay` (5% opacity) | `text.primary` | none | none | `typography.button.md` |
| | Active | `background.overlay` (10% opacity) | `text.primary` | none | none | `typography.button.md` |

#### Token Mapping
```typescript
// Primary Button
className="
  inline-flex items-center justify-center
  px-5 py-2.5                  // componentSpacing.input.md
  rounded-lg                   // borders.md
  text-base font-medium        // typography.button.md
  bg-purple-700 text-white     // semanticColors.primary.DEFAULT, text.inverse
  hover:bg-purple-800          // semanticColors.primary.hover
  active:bg-purple-900         // semanticColors.primary.active
  focus:ring-4 focus:ring-purple-200  // Focus ring
  disabled:opacity-50          // opacity[50]
  transition-all duration-150  // animation.duration.fast
"

// Secondary Button
className="
  bg-white text-gray-900       // background.primary, text.primary
  border border-gray-200       // border.DEFAULT
  hover:bg-gray-50             // background.secondary
  hover:border-gray-300        // border.strong
"
```

---

### 3. Card Components (ScoreCard, MetricCard, FormSection)

**Base Component**: `<div>` container
**Current Implementations**:
- `src/components/dashboard/ScoreCard.tsx`
- `src/components/dashboard/MetricCard.tsx`
- `src/components/form/FormSection.tsx`

#### State Matrix

| State | Background | Border | Shadow | Border Radius | Padding |
|-------|-----------|--------|--------|--------------|---------|
| **Default** | `background.primary` (white) | none | `shadows.sm` | `borders.2xl` (16px) | `componentSpacing.card.md` or `lg` |
| **Hover** | `background.primary` | none | `shadows.md` | `borders.2xl` | same |
| **Active/Selected** | `background.primary` | `border.focus` (2px) | `shadows.sm` | `borders.2xl` | same |

#### Token Mapping
```typescript
// Card Base
className="
  bg-white                     // background.primary
  rounded-2xl                  // borders.2xl (16px)
  p-5                          // componentSpacing.card.md (20px)
  shadow-sm                    // shadows.sm
  flex flex-col
"

// FormSection Card
className="
  bg-white
  rounded-2xl
  p-8                          // componentSpacing.card.lg (32px)
  shadow-sm
"
```

#### Typography Within Cards

| Element | Token | Current Value |
|---------|-------|---------------|
| Card Title | `typography.caption` (uppercase) | `text-xs font-medium uppercase tracking-wide text-gray-500` |
| Card Value (Large) | `typography.h1` or `typography.h2` | `text-7xl font-bold text-gray-900` |
| Card Description | `typography.body.base` | `text-base text-gray-600` |
| Metric Label | `typography.caption` | `text-xs font-medium uppercase tracking-wide text-gray-700` |
| Metric Value | `typography.h4` | `text-3xl font-bold text-gray-900` |

---

### 4. Form Field Container (FormField)

**Base Component**: `<div>` with label
**Current Implementation**: `src/components/form/FormField.tsx`

#### Token Mapping
```typescript
// Label
className="
  text-xs font-medium          // typography.label
  text-gray-700                // text.secondary
  mb-2                         // spacing[2] (8px)
  flex items-center gap-1
"

// Required indicator (*)
className="
  text-red-500                 // semanticColors.danger.DEFAULT
"

// Completed checkmark
className="
  w-4 h-4 text-green-600       // semanticColors.success.DEFAULT
"
```

---

### 5. Navigation & Tabs

**Base Component**: Base UI Tabs or custom `<nav>` with `<button>`
**Current Implementation**: Inline in Dashboard.tsx (lines 67-94)

#### Tab State Matrix

| State | Text | Border Bottom | Background |
|-------|------|--------------|-----------|
| **Default** | `text.tertiary` (gray-500) | `transparent` | `transparent` |
| **Hover** | `text.secondary` (gray-700) | `transparent` | `transparent` |
| **Active** | `text.primary` (gray-900) | `border.strong` (gray-900, 2px) | `transparent` |
| **Focus** | current color | current border | `transparent` |

#### Token Mapping
```typescript
// Tab Button (Inactive)
className="
  py-3 px-1                    // spacing: custom for tabs
  text-sm font-medium          // typography.body.sm + fontWeight.medium
  text-gray-500                // text.tertiary
  border-b-2 border-transparent
  hover:text-gray-700          // text.secondary
  transition-colors            // animation.duration.fast
"

// Tab Button (Active)
className="
  border-gray-900              // text.primary (match text for emphasis)
  text-gray-900                // text.primary
"
```

---

### 6. Status Badge

**Base Component**: `<span>`
**Current Implementation**: Inline in ScoreCard.tsx (lines 42-51)

#### Token Mapping
```typescript
// Success/High Badge
className="
  inline-flex items-center gap-1.5
  px-3 py-1                    // spacing: custom badge padding
  rounded-full                 // borders.full
  text-sm font-medium          // typography.body.sm + fontWeight.medium
  text-teal-700                // semanticColors.success.DEFAULT (needs token update)
  bg-[#D0F5ED]                 // semanticColors.success.subtle (needs hex->token)
"

// Warning/Medium Badge
className="
  text-yellow-700              // semanticColors.warning.DEFAULT
  bg-yellow-50                 // semanticColors.warning.subtle
"

// Danger/Low Badge
className="
  text-red-700                 // semanticColors.danger.DEFAULT
  bg-red-50                    // semanticColors.danger.subtle
"
```

---

## Spacing System Reference

### Component Spacing Presets
From `src/design-system/tokens/spacing.ts`:

```typescript
componentSpacing = {
  input: {
    sm: { x: spacing[2.5], y: spacing[1.5] },  // 10px × 6px
    md: { x: spacing[3.5], y: spacing[2.5] },  // 14px × 10px
    lg: { x: spacing[4], y: spacing[3.5] }     // 16px × 14px
  },
  card: {
    sm: spacing[3],   // 12px
    md: spacing[4],   // 16px
    lg: spacing[6]    // 24px
  },
  section: {
    sm: spacing[4],   // 16px
    md: spacing[8],   // 32px
    lg: spacing[12]   // 48px
  }
}
```

### Layout Spacing
- **Form field gap**: `gap-5` (20px) = `spacing[5]`
- **Card gap in grids**: `gap-5` (20px) = `spacing[5]`
- **Section margin**: `mb-5` (20px) = `spacing[5]`
- **Page padding**: `px-6 py-8` = `spacing[6]` (24px), `spacing[8]` (32px)

---

## Typography Scale Reference

### Component Typography Presets
From `src/design-system/tokens/typography.ts`:

```typescript
typography = {
  h1: {
    fontSize: fontSize['5xl'],      // 48px/3rem
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.tight    // 1.25
  },
  h2: {
    fontSize: fontSize['4xl'],      // 36px/2.25rem
    fontWeight: fontWeight.bold,    // 700
    lineHeight: lineHeight.tight    // 1.25
  },
  h4: {
    fontSize: fontSize['2xl'],      // 24px/1.5rem
    fontWeight: fontWeight.semibold // 600
  },
  body: {
    base: {
      fontSize: fontSize.base,      // 16px/1rem
      fontWeight: fontWeight.normal // 400
    },
    sm: {
      fontSize: fontSize.sm,        // 14px/0.875rem
      fontWeight: fontWeight.normal // 400
    }
  },
  button: {
    md: {
      fontSize: fontSize.base,      // 16px
      fontWeight: fontWeight.medium // 500
    }
  },
  label: {
    fontSize: fontSize.sm,          // 14px
    fontWeight: fontWeight.medium   // 500
  },
  caption: {
    fontSize: fontSize.xs,          // 12px
    fontWeight: fontWeight.normal   // 400
  }
}
```

---

## Color System Reference

### Semantic Color Mappings
From `src/design-system/tokens/colors.ts`:

```typescript
semanticColors = {
  brand: {
    DEFAULT: colors.purple[700],     // Primary brand color (placeholder - will update)
    hover: colors.purple[800],
    active: colors.purple[900]
  },
  primary: {
    DEFAULT: colors.purple[700],     // Primary action color
    hover: colors.purple[800],
    subtle: colors.purple[50]        // Backgrounds/focus rings
  },
  success: {
    DEFAULT: colors.green[500],      // #22c55e
    border: colors.green[300],
    subtle: colors.green[50]
  },
  warning: {
    DEFAULT: colors.amber[500],      // #f59e0b
    border: colors.amber[300],
    subtle: colors.amber[50]
  },
  danger: {
    DEFAULT: colors.red[500],        // #ef4444
    border: colors.red[300],
    subtle: colors.red[50]
  },
  text: {
    primary: colors.gray[900],       // Body text
    secondary: colors.gray[600],     // Supporting text
    tertiary: colors.gray[500],      // Muted text
    disabled: colors.gray[400],      // Disabled state
    placeholder: colors.gray[400],   // Input placeholders
    inverse: colors.white            // Text on dark backgrounds
  },
  background: {
    primary: colors.white,           // Default bg
    secondary: colors.gray[50],      // Subtle bg
    tertiary: colors.gray[100],      // Muted bg
    disabled: colors.gray[100]       // Disabled state bg
  },
  border: {
    DEFAULT: colors.gray[200],       // Default borders
    light: colors.gray[100],         // Subtle borders
    strong: colors.gray[300],        // Emphasized borders
    focus: colors.blue[500]          // Focus state borders
  }
}
```

---

## Current Hardcoded Values to Migrate

### Dashboard & DealInput Screens

**Background Color** (used throughout):
- Current: `style={{ backgroundColor: '#F5F2ED' }}` (cream)
- Should be: Token for page background (add to `background.page` or custom brand token)

**Primary Button Color**:
- Current: `style={{ backgroundColor: '#4A4543' }}` (brown)
- Hover: `#3A3533`
- Should be: `semanticColors.brand.DEFAULT` and `semanticColors.brand.hover`

**Score Display Color**:
- Current: `style={{ color: '#4A3F42' }}` (dark brown)
- Should be: Token for emphasis color (possibly `text.emphasis` or `brand.text`)

**Status Badge Background**:
- Current: `style={{ backgroundColor: '#D0F5ED' }}` (teal)
- Should be: `semanticColors.success.subtle` or create `status.high.bg` token

---

## Implementation Checklist

When implementing a component from Figma/design:

### 1. Identify Component Type
- [ ] Is there a Base UI primitive? (Input, Button, Checkbox, etc.)
- [ ] Does it match an existing wrapper? (TextInput, Button, etc.)
- [ ] Is it a custom fintech component? (ScoreCard, MetricCard, etc.)

### 2. Map States
- [ ] What visual states exist? (default, hover, focus, error, disabled)
- [ ] What Base UI data attributes apply? (`data-focused`, `data-disabled`, etc.)
- [ ] Are there interactive states? (checked, selected, active)

### 3. Apply Tokens
- [ ] **Background**: Use `background.*` tokens
- [ ] **Text**: Use `text.*` tokens
- [ ] **Borders**: Use `border.*` + `borders.*` (radius) tokens
- [ ] **Spacing**: Use `spacing.*` or `componentSpacing.*`
- [ ] **Typography**: Use `typography.*` presets
- [ ] **Colors**: Use `semanticColors.*` NOT raw colors
- [ ] **Shadows**: Use `shadows.*` tokens
- [ ] **Animation**: Use `animation.duration.*` and `animation.easing.*`

### 4. Use Tailwind Utilities
```typescript
// ✅ CORRECT: Token-based Tailwind classes
className="bg-white text-gray-900 border-gray-200"

// ✅ CORRECT: Semantic color references
className="text-purple-700 hover:text-purple-800"

// ❌ WRONG: Arbitrary values for token values
className="text-[#4A4543]"  // Should be bg-brand or similar

// ✅ OK: Arbitrary values for one-offs without tokens yet
className="bg-[#F5F2ED]"  // With comment: // TODO: Add page background token
```

### 5. Document Deviations
If hardcoded values are needed during iteration:
```typescript
// Hardcoded: Design iteration in progress
// TODO: Add to tokens/colors.ts as semanticColors.brand.DEFAULT
style={{ backgroundColor: '#4A4543' }}
```

---

## LLM Usage Guidelines

### When Building Components:

1. **Reference this spec first** before making color/spacing decisions
2. **Check token files** (`src/design-system/tokens/`) for current values
3. **Use Tailwind utilities** mapped to tokens (e.g., `text-gray-900` → `text.primary`)
4. **Follow Base UI patterns**: Compound components, data attributes for states
5. **Match existing components** for consistency (TextInput, Button patterns)

### Quick Token Lookup:

**Need a color?** → Check `semanticColors.*` in colors.ts
**Need spacing?** → Use `spacing[*]` or `componentSpacing.*`
**Need typography?** → Use `typography.*` presets
**Need a state style?** → Check component state matrix above

### When Token Doesn't Exist:

1. Use closest existing token
2. Add comment: `// TODO: Add [token.name] to design-system/tokens/[file].ts`
3. Document in PR or commit message
4. Designer can update token values later without touching components

---

## Future Enhancements

- [ ] Consolidate all hardcoded `#F5F2ED` → `background.page` token
- [ ] Consolidate all hardcoded `#4A4543` → `semanticColors.brand.DEFAULT`
- [ ] Add focus ring tokens (`shadows.focus-*`)
- [ ] Add elevation/shadow scale for cards and modals
- [ ] Create status color system (high/medium/low with bg/text/border)
- [ ] Icon sizing tokens (`icon.sm`, `icon.md`, `icon.lg`)
- [ ] Animation/transition presets for common patterns

---

**End of Specification**

This document provides the STRUCTURE for token usage. Exact color/spacing values in token files can be updated independently without changing component implementations.
