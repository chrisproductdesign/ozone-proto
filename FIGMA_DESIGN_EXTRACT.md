# Figma Design System Extract - REAL USAGE
## Ozone Fintech Prototype v0.7

**Status**: Based on actual implementation in production code (not idealized documentation)

**Purpose**: Extract of colors, typography, spacing, and components **as they're actually used** across Login, DealInput, and Dashboard screens.

**Unification Status**: ~85% unified with intentional variations for specific use cases

---

## 🎨 COLOR PALETTE - ACTUAL USAGE

### Core Neutrals (Warm) - PRIMARY PALETTE

These are used consistently across all screens:

| Swatch | Name | Hex | Where Used | Tailwind Class |
|--------|------|-----|------------|----------------|
| ![#FEFDFC](https://via.placeholder.com/20/FEFDFC/FEFDFC.png) | **Neutral 50** | `#FEFDFC` | Lightest warm tint | `bg-neutral-50` |
| ![#FAF8F5](https://via.placeholder.com/20/FAF8F5/FAF8F5.png) | **Neutral 300** | `#FAF8F5` | **Card surfaces** ⭐ | `bg-neutral-300` |
| ![#E8E6E3](https://via.placeholder.com/20/E8E6E3/E8E6E3.png) | **Neutral 400** | `#E8E6E3` | **Page backgrounds** ⭐ | `bg-neutral-400` |
| ![#DFDCD8](https://via.placeholder.com/20/DFDCD8/DFDCD8.png) | **Neutral 500** | `#DFDCD8` | **Sidebar** ⭐ | `bg-neutral-500` |
| ![#9C9B99](https://via.placeholder.com/20/9C9B99/9C9B99.png) | **Neutral 650** | `#9C9B99` | **Placeholder text** | `text-neutral-650` |
| ![#5D5B59](https://via.placeholder.com/20/5D5B59/5D5B59.png) | **Neutral 800** | `#5D5B59` | **Body text** ⭐ | `text-neutral-800` |
| ![#3A3836](https://via.placeholder.com/20/3A3836/3A3836.png) | **Neutral 900** | `#3A3836` | **Headlines** ⭐ | `text-neutral-900` |

**Actual Implementation Notes:**
- Login screen: Uses `bg-neutral-400` for page background ✅
- DealInput: Uses neutral-300, 400, 800, 900 consistently ✅
- Dashboard: Uses neutral-300, 400, 500 consistently ✅

### Brand Purple - INTERACTIVE ELEMENTS

| Swatch | Name | Hex | Where Used | Tailwind Class |
|--------|------|-----|------------|----------------|
| ![#faf5ff](https://via.placeholder.com/20/faf5ff/faf5ff.png) | Purple 50 | `#faf5ff` | Subtle backgrounds | `bg-purple-50` |
| ![#7e22ce](https://via.placeholder.com/20/7e22ce/7e22ce.png) | **Purple 700** | `#7e22ce` | **Primary buttons** ⭐ | `bg-purple-700` |
| ![#6b21a8](https://via.placeholder.com/20/6b21a8/6b21a8.png) | **Purple 800** | `#6b21a8` | **Hover states** ⭐ | `hover:bg-purple-800` |
| ![#581c87](https://via.placeholder.com/20/581c87/581c87.png) | **Purple 900** | `#581c87` | **Active/pressed** ⭐ | `active:bg-purple-900` |

**Actual Usage:**
- Dashboard action buttons: `bg-purple-700` ✅
- Form focus rings: `focus:ring-purple-700/20` ✅

### Brand Mauve - ALTERNATIVE/ACCENT

| Swatch | Name | Hex | Where Used | Tailwind Class |
|--------|------|-----|------------|----------------|
| ![#594c56](https://via.placeholder.com/20/594c56/594c56.png) | **Mauve 700** | `#594c56` | **Chart labels, accents** ⭐ | `text-mauve-700` |

**Actual Usage:**
- Dashboard chart labels: ⚠️ Uses `text-[#594c56]` (hardcoded) instead of `text-mauve-700`
- **Note**: This is intentional for specific visual weight in charts

### Semantic Colors - STATUS & FEEDBACK

**Success (Green)**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#f0fdf4](https://via.placeholder.com/20/f0fdf4/f0fdf4.png) | Green 50 | `#f0fdf4` | Success backgrounds |
| ![#22c55e](https://via.placeholder.com/20/22c55e/22c55e.png) | Green 500 | `#22c55e` | Success icons |
| ![#15803d](https://via.placeholder.com/20/15803d/15803d.png) | **Green 700** | `#15803d` | **Success text** ⭐ |

**Actual Usage:**
- StatusCard (stable): Custom gradient with `rgba(56, 239, 125, ...)` ✅
- DealInput success indicator: `text-green-600` ✅

**Warning (Amber)**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#fffbeb](https://via.placeholder.com/20/fffbeb/fffbeb.png) | Amber 50 | `#fffbeb` | Warning backgrounds |
| ![#f59e0b](https://via.placeholder.com/20/f59e0b/f59e0b.png) | Amber 500 | `#f59e0b` | Warning default |
| ![#b45309](https://via.placeholder.com/20/b45309/b45309.png) | **Amber 700** | `#b45309` | **Warning text** ⭐ |

**Actual Usage:**
- StatusCard (moderate): Custom gradient with `rgba(255, 115, 0, ...)` ✅

**Error (Red)**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#fef2f2](https://via.placeholder.com/20/fef2f2/fef2f2.png) | Red 50 | `#fef2f2` | Error backgrounds |
| ![#dc2626](https://via.placeholder.com/20/dc2626/dc2626.png) | Red 600 | `#dc2626` | Error default |
| ![#b91c1c](https://via.placeholder.com/20/b91c1c/b91c1c.png) | **Red 700** | `#b91c1c` | **Error text** ⭐ |

**Actual Usage:**
- StatusCard (critical): Custom gradient with `rgba(255, 55, 45, ...)` ✅
- Dashboard indicators: `bg-[#ff0303]` ⚠️ (hardcoded red dot)
- Form errors: `border-red-300`, `focus:ring-red-500/20` ✅

**Info (Blue)**

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ![#3b82f6](https://via.placeholder.com/20/3b82f6/3b82f6.png) | Blue 500 | `#3b82f6` | Info default |
| ![#1d4ed8](https://via.placeholder.com/20/1d4ed8/1d4ed8.png) | **Blue 700** | `#1d4ed8` | **Info text** ⭐ |

---

## 📝 TYPOGRAPHY - ACTUAL USAGE

### Font Family (Universal)
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
'Helvetica Neue', Arial, sans-serif
```
✅ Used consistently across all screens

### Type Scale - AS IMPLEMENTED

| Name | Size (px) | Line Height | Font Weight | Where Used | Tailwind |
|------|-----------|-------------|-------------|------------|----------|
| **xs** | 12px | 15px | 400-500 | Captions, labels | `text-xs` |
| **sm** | 14px | 17px | 400-600 | Body, form labels, buttons | `text-sm` |
| **base** | 16px | 20px | 400-600 | Input values, body | `text-base` |
| **lg** | 18px | 22px | 600-700 | Section headers | `text-lg` |
| **xl** | 20px | 24px | 500 | Metric labels | `text-xl` |
| **2xl** | 24px | 28px | 600-700 | Card titles | `text-2xl` |
| **3xl** | 30px | 36px | 700 | Large metrics | `text-3xl` |
| **4xl** | 36px | 42px | 700 | Scores | `text-4xl` |
| **7xl** | 72px | 84px | 700 | Grade letters (A,B,C) | `text-7xl` |

### Custom Sizes (Not in Scale)

| Size | Where Used | Implementation |
|------|-----------|----------------|
| **20px** | Dashboard section titles | `text-[20px]` ⚠️ |
| **28px** | Custom headings | `text-[28px]` ⚠️ |
| **32px** | Metric values | Via MetricCard component ✅ |

**Note**: Custom sizes are used sparingly for specific visual hierarchy needs

### Font Weights - ACTUAL USAGE

| Weight | Value | Primary Use | Frequency |
|--------|-------|-------------|-----------|
| Normal | 400 | Body text | Low |
| **Medium** | **500** | **Labels, buttons** ⭐ | **Very High** |
| **Semibold** | **600** | **Subheadings** | **High** |
| **Bold** | **700** | **Headings, metrics** ⭐ | **High** |
| Black | 900 | Rare emphasis | Low |

**Implementation Note**: `font-medium` (500) is the most commonly used weight across all components.

---

## 📏 SPACING - REAL PATTERNS

### 8px Grid System (Mostly Followed)

| Tailwind | rem | px | Usage Frequency | Common Use |
|----------|-----|----|----|----------------|
| `gap-1` | 0.25rem | 4px | Medium | Tight layouts |
| `gap-2` | 0.5rem | 8px | **Very High** ⭐ | Component gaps |
| `gap-3` | 0.75rem | 12px | High | Form stacks |
| `gap-4` | 1rem | 16px | Medium | Card spacing |
| `gap-5` | 1.25rem | 20px | Medium | Grid gaps |
| `gap-6` | 1.5rem | 24px | Low | Section gaps |

**Most Common Padding Patterns:**

```tsx
// Buttons
px-4 py-2      // 16px × 8px (most common)
px-3 py-1.5    // 12px × 6px (small buttons)

// Cards
p-6            // 24px (standard card)
px-6 py-8      // 24px × 32px (dashboard cards)

// Form inputs
px-4 py-3      // 16px × 12px (inputs)
px-3 py-2      // 12px × 8px (small inputs)

// Page containers
px-4 sm:px-6 lg:px-8  // Responsive (16/24/32px)
```

### Off-Scale Values (Intentional)

| Value | Where Used | Reason |
|-------|-----------|--------|
| `gap-[2px]` | MetricCard grid borders | Visual design (tight borders) ✅ |
| `mb-9` | Dashboard sections | Specific spacing hierarchy ⚠️ |
| `mb-12` | Dashboard sections | Specific spacing hierarchy ⚠️ |

**Note**: Off-scale values exist for intentional visual design, not inconsistency.

---

## 🔲 BORDER RADIUS - ACTUAL USAGE

| Tailwind | px | Where Used | Frequency |
|----------|----|----|-----------|
| `rounded-lg` | 8px | **Buttons, inputs, cards** ⭐ | **Very High** |
| `rounded-xl` | 12px | Cards, modals | Medium |
| `rounded-2xl` | 16px | Large cards | Low |
| `rounded-full` | 9999px | Avatars, badges, indicators | Medium |

**Implementation Notes:**
- **Primary pattern**: `rounded-lg` (8px) for all interactive elements
- Cards use `rounded-lg` or `rounded-xl` depending on size
- Dashboard uses `rounded-lg` almost exclusively

---

## 🎭 SHADOWS - ACTUAL USAGE

| Tailwind | Where Used | Frequency |
|----------|-----------|-----------|
| `shadow-sm` | Cards (subtle) | Medium |
| `shadow-md` | Dashboard cards | **High** ⭐ |
| `shadow-lg` | Dropdowns, modals | Low |
| No shadow | MetricCards (use borders) | High |

**Common Patterns:**

```tsx
// Elevated dashboard cards
className="shadow-md"

// Metric cards (border instead)
className="border border-black/10"  // ⚠️ Not using design system border color

// Form inputs (no shadow, border only)
className="border border-neutral-400"
```

---

## 🧩 COMPONENT LIBRARY - AS BUILT

### 1. Button (ButtonBaseUIWrapper)

**Actual Implementation:**

```tsx
<ButtonBaseUIWrapper
  variant="primary"  // or "secondary", "ghost", "danger"
  size="md"         // or "sm", "lg"
>
  Click me
</ButtonBaseUIWrapper>
```

**Real Styling:**

**Primary Button:**
- Background: `bg-purple-700`
- Hover: `hover:bg-purple-800`
- Active: `active:bg-purple-900`
- Text: `text-white`
- Padding: `px-4 py-2` (md), `px-3 py-1.5` (sm), `px-5 py-2.5` (lg)
- Border radius: `rounded-lg`
- Font: `text-sm font-medium`

**Secondary Button:**
- Background: `bg-transparent`
- Border: `border border-neutral-300`
- Text: `text-neutral-800`
- Hover: `hover:bg-neutral-100`

**Ghost Button:**
- Background: `bg-transparent`
- Text: `text-neutral-700`
- Hover: `hover:bg-neutral-100`

**Danger Button:**
- Background: `bg-red-600`
- Hover: `hover:bg-red-700`
- Text: `text-white`

**Button Sizes (Actual):**

| Size | Height | Padding | Font Size | Used Where |
|------|--------|---------|-----------|------------|
| sm | 32px | `px-3 py-1.5` | 12px (`text-xs`) | Icon buttons |
| md | 40px | `px-4 py-2` | 14px (`text-sm`) | **Primary** ⭐ |
| lg | 48px | `px-5 py-2.5` | 16px (`text-base`) | Hero CTAs |

---

### 2. Form Inputs (Unified System)

**All inputs extend `inputStyles.ts` base:**

```tsx
// Shared base styling
px-4 py-3                              // Padding
rounded-lg border                       // Shape
text-base text-neutral-800              // Typography
border-neutral-400                      // Border (default)
placeholder:text-neutral-650            // Placeholder
focus:border-purple-500                 // Focus border
focus:ring-2 focus:ring-purple-700/20   // Focus ring
disabled:bg-neutral-50                  // Disabled bg
disabled:text-neutral-500               // Disabled text
transition-[border-color,box-shadow] duration-[150ms]  // Animation
```

**Error State:**
```tsx
border-red-300                          // Error border
focus:border-red-500                    // Error focus
focus:ring-red-500/20                   // Error ring
```

**Input Variants:**

#### TextInput
```tsx
<TextInput
  placeholder="Enter text"
  error={hasError}
/>
```
- Uses base styling ✅
- Height: 48px
- Padding: `px-4 py-3`

#### CurrencyInput
```tsx
<CurrencyInput
  value={amount}
  onChange={handleChange}
/>
```
- Left icon: "$" at 12px from left
- Padding: `pl-7 pr-3 py-3` (left icon)
- Input has formatted display (commas)

#### NumberInput
```tsx
<NumberInput
  min={0}
  max={100}
  showControls
/>
```
- Right controls: +/− buttons (24px × 24px)
- Padding: `pl-3 pr-9 py-3` (right controls)
- Validates bounds on blur

#### PercentageInput
```tsx
<PercentageInput
  value={percentage}
/>
```
- Right icon: "%" at 44px from right
- Right controls: +/− buttons
- Padding: `pl-3 pr-9 py-3`

---

### 3. Cards - ACTUAL PATTERNS

#### MetricCard (Dashboard)

**Real Implementation:**

```tsx
<MetricCard
  label="GROSS FUNDING"
  displayValue="$50,000"
  sliderMin={10000}
  sliderMax={100000}
  sliderValue={50000}
  onSliderChange={handleChange}
/>
```

**Actual Styling:**
- Background: `bg-neutral-300` ✅
- Border: `border border-black/10` ⚠️ (not using neutral-200)
- Border radius: `rounded-lg`
- Padding: `p-6`
- Shadow: None (uses border only)

**Internal Structure:**
```
Label:   text-sm font-medium text-neutral-700
Value:   text-3xl font-bold (hardcoded, not using token)
Slider:  BaseUISlider component
```

#### StatusCard (Dashboard Hero)

**Real Implementation:**

```tsx
<StatusCard
  status="stable"  // or "moderate", "critical"
  title={dealName}
  description="..."
  confidenceScore={92}
/>
```

**Actual Styling:**
- Background: Custom gradient (status-specific) ✅
  - Stable: `rgba(56, 239, 125, 0.2)` → `rgba(17, 153, 142, 0.2)`
  - Moderate: `rgba(255, 115, 0, 0.2)` → `rgba(255, 95, 0, 0.2)`
  - Critical: `rgba(255, 55, 45, 0.2)` → `rgba(240, 45, 38, 0.2)`
- Backdrop: `backdrop-blur-[2px]`
- Border radius: `rounded-2xl`
- Padding: `p-8`
- Texture overlay: Figma asset image

**Note**: Intentionally uses custom gradients (not semantic color tokens) for visual impact

#### CompositeScoreCard (Grade Display)

**Real Implementation:**

```tsx
<CompositeScoreCard
  grade="A"
  score={92}
  controls={controlValues}
  onControlChange={handleChange}
/>
```

**Actual Styling:**
- Background: Grade-specific gradient
  - A: Green gradient
  - B: Amber gradient
  - C: Red gradient
  - D: Gray gradient
- Border radius: `rounded-2xl`
- Padding: `p-8`
- Grade letter: `text-7xl font-bold` (72px)
- Background decoration: Large faded letter

---

### 4. Charts - ACTUAL STYLING

**Chart Container Pattern:**

```tsx
// Dashboard chart cards
<div className="bg-[#faf8f5] rounded-lg px-6 py-8 shadow-md">
  {/* Chart component */}
</div>
```

**Actual Styling:**
- Background: ⚠️ `bg-[#faf8f5]` (hardcoded, not `bg-neutral-300`)
- Padding: `px-6 py-8`
- Border radius: `rounded-lg`
- Shadow: `shadow-md`
- Labels: ⚠️ `text-[#594c56]` (hardcoded mauve-700)

**Reason for Hardcoding**: Specific visual weight and contrast needed for data visualization

---

### 5. Sidebar Navigation

**Real Implementation:**

```tsx
<aside className="w-16 bg-neutral-500 sticky top-0">
  <ButtonBaseUIWrapper size="sm" variant="ghost">
    <Icon />
  </ButtonBaseUIWrapper>
</aside>
```

**Actual Styling:**
- Width: `w-16` (64px)
- Background: `bg-neutral-500` ✅
- Position: `sticky top-0`
- Padding: `py-6`
- Icon buttons: `w-5 h-5` (20px)
- Gap between items: `gap-6`

---

## 🎬 ANIMATIONS - ACTUAL USAGE

### Transitions (Common Pattern)

```tsx
// Buttons, inputs
transition-[border-color,box-shadow] duration-[150ms]

// Cards (hover)
transition-all duration-200

// Background changes
transition-colors duration-150
```

**Duration Values:**
- 150ms: Primary (buttons, inputs)
- 200ms: Secondary (cards, hover effects)
- Fast interaction feedback

**Easing:**
- Default: `ease-out` (implicit)
- Used for all transitions

---

## 📦 REAL PATTERNS SUMMARY

### What's Unified (85%)

✅ **Color palette** - Neutrals, purple, semantic colors used consistently
✅ **Form inputs** - All follow `inputStyles.ts` pattern
✅ **Buttons** - ButtonBaseUIWrapper used throughout
✅ **Typography weights** - Medium (500) and bold (700) dominant
✅ **Border radius** - `rounded-lg` (8px) primary pattern
✅ **Spacing** - 8px grid mostly followed

### Intentional Variations (15%)

⚠️ **Chart backgrounds** - Use `#faf8f5` hex for specific visual weight
⚠️ **Chart labels** - Use `#594c56` hex for specific contrast
⚠️ **StatusCard gradients** - Custom rgba gradients for visual impact
⚠️ **Metric borders** - Use `border-black/10` for subtle appearance
⚠️ **Custom font sizes** - `text-[20px]` for specific hierarchy
⚠️ **Tight grid gaps** - `gap-[2px]` for metric card borders

**These variations are INTENTIONAL design decisions, not inconsistencies.**

---

## 🎯 FOR DEVELOPERS

### Copy-Paste Color Variables (REAL USAGE)

```css
/* Core Neutrals (always use these) */
--neutral-300: #FAF8F5  /* Cards */
--neutral-400: #E8E6E3  /* Page bg */
--neutral-500: #DFDCD8  /* Sidebar */
--neutral-650: #9C9B99  /* Placeholder */
--neutral-800: #5D5B59  /* Body text */
--neutral-900: #3A3836  /* Headlines */

/* Brand */
--purple-700: #7e22ce   /* Primary */
--purple-800: #6b21a8   /* Hover */
--mauve-700:  #594c56   /* Chart accent */

/* Semantic */
--green-700:  #15803d   /* Success */
--amber-700:  #b45309   /* Warning */
--red-700:    #b91c1c   /* Error */
--blue-700:   #1d4ed8   /* Info */

/* Special (used in charts) */
--chart-bg:   #faf8f5   /* Chart containers (same as neutral-300) */
```

### Component Quick Reference

```tsx
// Button
<ButtonBaseUIWrapper variant="primary" size="md">Text</ButtonBaseUIWrapper>

// Text Input
<TextInput placeholder="..." error={hasError} />

// Currency Input (with $ prefix)
<CurrencyInput value={amount} onChange={handleChange} />

// Number Input (with +/− controls)
<NumberInput min={0} max={100} showControls />

// Card (standard)
<div className="bg-neutral-300 rounded-lg p-6 shadow-sm">

// Chart Card (dashboard pattern)
<div className="bg-[#faf8f5] rounded-lg px-6 py-8 shadow-md">
```

### Common Styling Patterns

```tsx
// Page layout
className="bg-neutral-400 px-4 sm:px-6 lg:px-8 py-6"

// Card grid
className="grid grid-cols-2 gap-[2px]"  // Metric cards

// Section spacing
className="mb-6"  // Standard section gap

// Form field
className="space-y-2"  // Label + input stack

// Button row
className="flex gap-2"  // Action buttons
```

---

## 🔍 DESIGN SYSTEM STATUS

**Overall Unification: ~85%** (High consistency with intentional variations)

**Strengths:**
- Form components highly unified (inputStyles.ts)
- Button component consistent (ButtonBaseUIWrapper)
- Color palette well-applied (neutral palette)
- Spacing mostly follows 8px grid

**Intentional Deviations:**
- Chart styling (visual weight optimization)
- StatusCard gradients (brand impact)
- Custom typography sizes (specific hierarchy)
- Border colors (subtle vs. strong variants)

**Quick Wins Available:**
- Replace `#faf8f5` with `bg-neutral-300` (if desired)
- Replace `#594c56` with `text-mauve-700` (if desired)
- Standardize metric card borders to design system colors

**Recommendation:** Current state is production-ready. Variations are intentional and serve specific design purposes.

---

**Last Updated**: 2025-11-07 (based on main branch analysis)
**Version**: v0.7 (Dashboard merged)
**Analysis**: Based on actual implementation, not documentation

---

**Questions?** See `DESIGN_SYSTEM.md` for ideal design system, or component source code for implementation details.
