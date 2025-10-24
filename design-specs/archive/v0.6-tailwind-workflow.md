# Tailwind CSS + Base UI Development Workflow

## Overview

This document describes the new development workflow for building fintech components using Tailwind CSS v4 with Base UI components as the foundation.

## Foundation Setup Completed

✅ **Tailwind CSS v4** - Installed with @tailwindcss/vite plugin
✅ **Design Token Integration** - All tokens mapped to Tailwind config
✅ **CSS Architecture** - Updated to use Tailwind utilities
✅ **Component Wrappers** - Pattern established for Base UI + Tailwind
✅ **Visual Testing** - Playground with Forms tab showing all components

## Development Workflow

### 1. Component Creation Pattern

When creating new components, follow this pattern:

```tsx
// Import Base UI components (when available)
import { Input } from '@base-ui-components/react/input';

// Create wrapper with Tailwind styling
export const FintechInput = forwardRef((props, ref) => {
  const classes = classNames(
    // Base Tailwind utilities
    'block rounded-lg border text-gray-900',
    'transition-all duration-150 ease-out',

    // Variant-specific styles
    variantClasses[variant],

    // Custom classes from props
    className
  );

  return <Input ref={ref} className={classes} {...props} />;
});
```

### 2. Using Design Tokens

All design tokens are available as Tailwind utilities:

```css
/* Colors */
.bg-purple-700     /* Primary brand color */
.text-gray-900     /* Text primary */
.border-gray-200   /* Border default */

/* Spacing (8px grid) */
.p-4    /* 16px padding */
.gap-8  /* 32px gap */
.mt-12  /* 48px margin-top */

/* Typography */
.text-sm    /* 14px */
.text-base  /* 16px */
.text-lg    /* 18px */
.font-medium  /* 500 weight */
.font-semibold /* 600 weight */
```

### 3. Component Development Process

#### Step 1: Start Dev Server
```bash
npm run dev
```
Visit http://localhost:5173 and navigate to the Forms tab.

#### Step 2: Create Component Structure
```
src/components/{name}/
├── {Name}.tsx          # Component with Tailwind classes
├── {Name}Wrapper.tsx   # Optional Base UI wrapper
├── index.ts            # Exports
└── variants.ts         # Variant definitions
```

#### Step 3: Apply Tailwind Classes
```tsx
// Use Tailwind utilities instead of CSS modules
const buttonClasses = classNames(
  // Layout
  'inline-flex items-center justify-center',

  // Styling
  'font-medium rounded-lg border',

  // Transitions
  'transition-all duration-150 ease-out',

  // States
  'hover:bg-purple-800 active:bg-purple-900',
  'focus:ring-2 focus:ring-purple-700 focus:ring-offset-2',
  'disabled:bg-gray-200 disabled:text-gray-400'
);
```

#### Step 4: Test in Playground
Add your component to the appropriate playground tab:
- **Typography** - Text components
- **Colors** - Color swatches and themes
- **Forms** - Input, buttons, validation
- **Layout** - Containers, grids, spacing
- **Data** - Tables, lists, cards
- **Feedback** - Alerts, toasts, modals
- **Navigation** - Menus, tabs, breadcrumbs

### 4. Tailwind Configuration

The Tailwind config (`tailwind.config.js`) includes:

- **All design tokens** mapped as utilities
- **Custom component spacing** (e.g., `p-card-md`, `px-input-lg-x`)
- **Semantic colors** (primary, success, warning, danger)
- **Gradients** for fintech UI
- **Animations** (fade, slide, shimmer)

To modify tokens, update both:
1. `src/design-system/tokens/*.ts` - Source tokens
2. `tailwind.config.js` - Tailwind mappings

### 5. CSS Organization

```css
/* src/index.css */

/* Layer 1: Tailwind base */
@import "tailwindcss";

/* Layer 2: Component classes using @apply */
@layer components {
  .playground-tab {
    @apply px-6 py-3 border-b-2 border-transparent
           text-gray-500 font-medium
           transition-all duration-150;
  }
}

/* Layer 3: Utility extensions */
@layer utilities {
  .fintech-card {
    @apply bg-white rounded-xl shadow-md p-4;
  }
}
```

### 6. TypeScript Support

All components use proper TypeScript:

```tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}
```

### 7. Testing Components

#### Visual Testing
```bash
npm run dev
# Navigate to http://localhost:5173
# Use the Forms tab to test components
```

#### Unit Testing
```bash
npm test                           # Run all tests
npm test Button.test.tsx          # Run specific test
npm run test:watch                # Watch mode
```

#### Build Testing
```bash
npm run build      # TypeScript check + Vite build
npm run preview    # Preview production build
```

### 8. Common Patterns

#### Variant Mapping
```tsx
const variantClasses: Record<Variant, string> = {
  primary: 'bg-purple-700 hover:bg-purple-800',
  secondary: 'bg-white border-gray-200 hover:bg-gray-50',
  ghost: 'bg-transparent hover:bg-gray-100',
};

// Usage
className={variantClasses[variant]}
```

#### Size Mapping
```tsx
const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3.5 text-lg',
};
```

#### Conditional Classes
```tsx
className={classNames(
  'base-classes',
  condition && 'conditional-classes',
  variant && variantClasses[variant],
  className // Allow override
)}
```

### 9. Accessibility Patterns

Always include:
- Focus states: `focus:ring-2 focus:ring-offset-2`
- ARIA attributes: `aria-label`, `aria-describedby`
- Semantic HTML: proper headings, labels, buttons
- Keyboard navigation: ensure Tab order is logical

### 10. Performance Tips

- **Use Tailwind's JIT mode** (enabled by default in v4)
- **Avoid @apply in components** - use utilities directly
- **Tree-shake unused Base UI components** via imports
- **Leverage CSS containment** for complex components

## Quick Reference

### Essential Tailwind Classes for Fintech

```css
/* Buttons */
.bg-purple-700 .hover:bg-purple-800 .text-white
.px-4 .py-2.5 .rounded-lg .font-medium

/* Inputs */
.border .border-gray-200 .rounded-lg
.px-3.5 .py-2.5 .text-gray-900
.focus:border-purple-700 .focus:ring-2

/* Cards */
.bg-white .rounded-xl .shadow-md .p-4

/* Typography */
.text-3xl .font-bold         /* Headings */
.text-base .text-gray-600     /* Body */
.text-sm .text-gray-500       /* Helper text */

/* States */
.disabled:opacity-50 .disabled:cursor-not-allowed
.hover:shadow-lg .transition-all .duration-150

/* Layout */
.flex .items-center .justify-between
.grid .grid-cols-2 .gap-4
.max-w-xl .mx-auto
```

## Migration from CSS Modules

If migrating existing CSS module components:

1. **Identify CSS classes** in `.css` files
2. **Map to Tailwind utilities** using the reference above
3. **Replace className imports** with Tailwind classes
4. **Test visual appearance** matches original
5. **Remove old CSS file** once migrated

Example migration:
```css
/* Before: Button.css */
.ui-button {
  display: inline-flex;
  padding: 10px 16px;
  background: #7e22ce;
}

/* After: Tailwind classes */
className="inline-flex px-4 py-2.5 bg-purple-700"
```

## Next Steps

With the foundation in place, focus on:

1. **Creating Base UI wrappers** for remaining components
2. **Building fintech-specific patterns** (forms, dashboards, tables)
3. **Implementing UX improvements** from design review
4. **Adding motion and microinteractions** with Tailwind animations
5. **Optimizing for production** with purging and minification

## Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Base UI Components](https://base-ui.com)
- Design Tokens: `src/design-system/tokens/`
- Component Examples: `src/components/button/ButtonBaseUIWrapper.tsx`
- Playground: `playground/pages/Forms.tsx`