# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 CRITICAL: Working Rules & Collaboration Mode

**YOU ARE A TECHNICAL IMPLEMENTATION PARTNER, NOT THE PRODUCT DESIGNER**

### Mandatory Rules (NEVER VIOLATE THESE):
1. **WAIT FOR SPECIFICATIONS** - Do not build features without explicit design specs and approval
2. **ASK, DON'T ASSUME** - When details are unclear, ask questions rather than making decisions
3. **NO ROGUE BUILDING** - Never create new features, screens, or major changes without direction
4. **FOLLOW THE LEAD** - The user is the professional product designer; you provide technical implementation
5. **PLAN BEFORE EXECUTING** - Present plans for approval before making changes
6. **NO BRAND ASSUMPTIONS** - Don't assume company names, colors, or branding without being told

### Your Role:
- **Technical Implementation**: Execute the designs and specifications provided
- **UX Support**: Offer expertise and suggestions when asked, but don't override decisions
- **Code Quality**: Ensure clean, maintainable code that matches specifications
- **Problem Solving**: Help solve technical challenges within the given constraints

### Before Any Work:
- Ask for design specifications, mockups, or detailed requirements
- Confirm understanding of the task before starting
- Present a plan if the task is complex
- Wait for approval to proceed

## Project Overview

**Fintech Prototype v0.5** - A fintech application focused on creating an optimal business funding experience. Building 3-4 key screens with a complete user flow, iterating on component design and UX for the most intuitive, simple, and polished interface possible.

### Project Goals
1. **Create Core Screens**: Login, Dashboard, Funding Application, Approval Status
2. **Build Complete Flow**: Start-to-finish funding journey with core loop
3. **Iterate on UX**: Refine for simplicity, intuitiveness, and optimal user experience
4. **Polish Components**: Evolve styling and visual design systematically

### Tech Stack
- **React 19.2** with TypeScript for type-safe development
- **Base UI Components** (`@base-ui-components/react`) as the unstyled component foundation
- **Custom Design System** with tokens for systematic styling changes
- **Vite** for fast development and building
- **Tailwind CSS** for styling (planned integration)

## Development Commands

```bash
# Core development
npm run dev          # Start Vite dev server at http://localhost:5173
npm run build        # Type-check with TypeScript and build production bundle
npm run preview      # Preview production build

# Code quality
npm run lint         # ESLint with TypeScript, React, a11y, and import rules
npm run format       # Check Prettier formatting
npm run format:write # Auto-fix formatting issues
npm run typecheck    # Run TypeScript compiler without emitting

# Testing
npm test            # Run Vitest unit tests
npm run test:watch  # Run tests in watch mode
npm run coverage    # Generate test coverage report
npm run test:e2e    # Run Playwright E2E tests
```

## Architecture

### Application Structure

The app uses a **minimal tab-based playground** for component development and iteration:
- `src/main.tsx` → `src/App.tsx` (directly renders PlaygroundApp) → `playground/App.tsx` → `playground/pages/index.tsx`

**Current State (Session: 2025-10-21):**
- Removed all previous display pages to start fresh
- Created minimal tab structure with empty content areas
- No titles, branding, or descriptive text - pure functional interface
- Full-screen layout optimized for component development

**Playground Tabs (All Empty - Ready for Component Iteration):**
1. **Typography** (`Typography.tsx`) - For text styles and hierarchy
2. **Colors** (`Colors.tsx`) - For color system and palettes
3. **Forms** (`Forms.tsx`) - For input components and validation
4. **Layout** (`Layout.tsx`) - For spacing and container components
5. **Data** (`Data.tsx`) - For tables, lists, and data display
6. **Feedback** (`Feedback.tsx`) - For alerts, toasts, and status indicators
7. **Navigation** (`Navigation.tsx`) - For navigation patterns and menus

**Important:** All component files in `src/components/` were preserved (button, card, input, select, etc.) as the foundation for future Base UI component iteration.

**Flow Documentation:** See `FLOW_STRUCTURE.md` for planned user journey and screen requirements (to be implemented)

### Component System

Components follow a **hybrid approach** combining Base UI foundations with custom fintech components:

#### Base UI Integration Pattern
- Use Base UI components as unstyled foundations (e.g., `Input` wraps `@base-ui-components/react/input`)
- Add custom styling and fintech-specific features on top
- Maintain compatibility with Base UI's accessibility and behavior patterns

#### Component Structure
```
src/components/{name}/
├── {Name}.tsx       # Component implementation with forwardRef
├── {Name}.css       # BEM-style CSS (ui-component__element--modifier)
├── index.ts         # Public exports
└── variants.ts      # Optional variant definitions (size, appearance)
```

**Current Components:**
- **Fintech-Specific**: `MetricCard`, `AccountCard` for financial data display
- **Compound Components**: `Table`, `Sidebar`, `Tabs` use dot notation (e.g., `Table.Root`, `Table.Row`)
- **Form Controls**: `Input` (Base UI wrapper), `Select`, `Slider` support controlled/uncontrolled patterns
- **UI Elements**: `Button`, `Badge`, `Card` for interface building

### Path Aliases

Configured in both `tsconfig.json` and `vite.config.ts`:
- `@/` → `src/`
- `@playground/` → `playground/`
- `@lib/` → `src/lib/`
- `@design-system/` → `src/design-system/`

### Design System

#### Token System (`src/design-system/tokens/`)
Centralized design tokens for systematic styling:
- **Colors**: Brand purple, semantic colors, gradients
- **Typography**: Font sizes, weights, line heights
- **Spacing**: 8px grid system
- **Borders**: Radius tokens from sm to full
- **Shadows**: Elevation system
- **Animation**: Duration and easing curves

**Default Colors (To be updated with actual brand colors):**
- Primary: TBD (currently purple `#7e22ce` as placeholder)
- Success: Green (`#22c55e`)
- Warning: Amber (`#f59e0b`)
- Danger: Red (`#ef4444`)

#### Styling Strategy
- **CSS Modules**: Each component has its own CSS file
- **BEM Naming**: `ui-{component}`, `ui-{component}__element`, `ui-{component}--modifier`
- **Responsive**: Mobile-first with breakpoint tokens
- **Systematic Changes**: Update tokens in `design-system/tokens/` for app-wide changes

### Component Patterns

All components:
1. Use `forwardRef` for ref forwarding
2. Accept `className` prop for external styling
3. Use `classNames` utility (`src/lib/classNames.ts`) for conditional classes
4. Include TypeScript interfaces for props
5. Support accessibility attributes (ARIA)

### State Management

- **Local State**: Components manage their own state with hooks
- **Controlled/Uncontrolled**: Form inputs support both patterns
- **Context**: Used in compound components (Tabs, Sidebar)

## Testing Configuration

- **Vitest**: Unit testing with React Testing Library
- **Playwright**: E2E testing with desktop/mobile configs
- **Coverage**: Using v8 provider
- **Global Types**: `vitest/globals` and `@testing-library/jest-dom`

## Build Configuration

**Vite Configuration:**
- React plugin with automatic JSX runtime
- Auto-opens browser on `dev` and `preview`
- Path resolution for aliases

**TypeScript Configuration:**
- Target: ESNext with strict mode
- Module: ESNext with Bundler resolution
- JSX: react-jsx (automatic runtime)
- Isolated modules for faster builds

## Linting Rules

- **Import Order**: Enforced alphabetical ordering with empty lines between groups
- **React**: Hooks rules enforced, prop-types disabled (using TypeScript)
- **Accessibility**: jsx-a11y plugin for ARIA compliance
- **Unused Imports**: Automatically removed

## Running Single Tests

```bash
# Run specific test file
npm test src/components/button/Button.test.tsx

# Run tests matching pattern
npm test -- --grep "Button"

# Run E2E test
npx playwright test tests/e2e/dashboard.spec.ts
```

## Development Workflow

### Component Iteration Process
1. **Use Empty Tab Pages** - Each tab is a blank canvas for component development
2. **Test Variants** - Create all states and sizes
3. **Apply Design Tokens** - Use system tokens for consistency
4. **Integrate into Flow** - Add to main screens once approved
5. **Refine UX** - Test in context and iterate

### Adding New Components
1. **Check Base UI Documentation** (`docs/llms.txt` or `docs/catalog/components/`)
2. **Create Component Structure** in `src/components/{name}/`
3. **Use Design Tokens** from `src/design-system/tokens/`
4. **Test in Component Lab** before integration
5. **Document Usage** in component file

### Base UI Resources
- **Component Catalog**: `docs/catalog/components/` - JSON schemas for all Base UI components
- **Documentation**: `docs/llms.txt` - Base UI component documentation for reference
- **Base UI Docs**: https://base-ui.com for latest updates

## Next Steps (Session Continuation)

When returning to this project, the following technical enhancements are ready to implement:

1. **Tailwind CSS Integration** - Set up utility-first CSS framework
2. **Base UI Component Wrappers** - Create styled wrappers for Base UI primitives
3. **Component Documentation** - Add JSDoc and examples to components
4. **Design Token Mapping** - Connect tokens to Tailwind configuration

The playground tabs are empty and ready for component development based on design specifications.

## Technical Recommendations & Future Enhancements

### Tailwind CSS Integration (Planned)
**Benefits:**
- Rapid prototyping with utility classes
- Consistency with design tokens
- Easy responsive design
- Smaller bundle sizes with purging

**Integration Plan:**
1. Install Tailwind and configure with PostCSS
2. Map design tokens to Tailwind config (colors, spacing, etc.)
3. Gradually migrate from CSS modules to Tailwind utilities
4. Keep Base UI components as foundation, style with Tailwind
5. Maintain design system tokens as single source of truth

**Approach:**
- Use `@apply` directives in CSS modules for gradual migration
- Keep BEM naming for complex components
- Use Tailwind utilities for layout and spacing
- Custom Tailwind plugin for fintech-specific utilities

### Base UI Foundation Strategy
**Why Base UI:**
- Unstyled, accessible primitives
- Full control over visual design
- ARIA-compliant out of the box
- Tree-shakeable components
- Active maintenance by MUI team

**Component Wrapper Pattern:**
```typescript
// Wrap Base UI with custom styling and fintech features
import { Input as BaseInput } from '@base-ui-components/react/input';

export const Input = ({ ...props }) => {
  return <BaseInput className="custom-fintech-styling" {...props} />;
};
```

**Best Practices:**
- Always wrap Base UI components, never use directly in pages
- Add fintech-specific props and features in wrappers
- Maintain consistent API across all components
- Document props and usage in component files

### Component Documentation Approach
**Component File Structure:**
```typescript
/**
 * Button Component
 *
 * @example
 * <Button variant="primary" size="lg">Apply Now</Button>
 *
 * @props
 * - variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * - size: 'sm' | 'md' | 'lg'
 * - loading: boolean
 */
```

**Documentation Strategy:**
1. **JSDoc Comments**: Document props and usage in component files
2. **Component Lab**: Visual testing ground in ComponentShowcase
3. **Usage Examples**: Show common patterns in comments
4. **Type Definitions**: Let TypeScript serve as documentation

**When to Document:**
- New component creation
- Adding new props or features
- Non-obvious usage patterns
- Integration with fintech-specific flows

## Repository

GitHub: https://github.com/chrisproductdesign/ogion-proto-0.5

## ⚠️ Common Mistakes to Avoid

### DO NOT:
- Create new screens or features without being asked
- Assume brand names, colors, or visual styles
- Delete or significantly restructure without permission
- Make UX decisions without design specifications
- Start building when user is providing context or background
- Implement your own vision instead of the provided designs

### ALWAYS:
- Wait for explicit instructions before building
- Ask for mockups or specifications when not provided
- Confirm understanding before starting work
- Respect that the user is the product design lead
- Use placeholder content until real content is provided