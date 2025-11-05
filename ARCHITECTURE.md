# Architecture Reference

Technical architecture, component patterns, and development setup for Fintech Prototype v0.7.

**Note**: This is reference documentation. For daily workflow instructions, see `CLAUDE.md`.

---

## Application Structure

The app uses a **minimal tab-based playground** for component development and iteration:
- `src/main.tsx` → `src/App.tsx` (directly renders PlaygroundApp) → `playground/App.tsx` → `playground/pages/index.tsx`

### Current Implementation Status

✅ **Technical Foundation Complete**
- Tailwind CSS v4 integrated with Vite
- Design token system established (see `DESIGN_SYSTEM.md`)
- Component wrapper pattern: `ButtonBaseUIWrapper`, `InputBaseUIWrapper`
- Base UI + Tailwind integration working

🎯 **Dashboard (v0.7) - Complete**

**Status**: Core structure and interactions complete (see PROGRESS.md for current work)

**Phase 1 Complete** ✅:
- Full-page layout with sidebar navigation + top header
- Status hero section (green bg, dynamic for yellow/red risk levels)
- 2x2 metrics grid with unified MetricCard component
- Composite score card (96px letter grade with green circular bg)
- Deal benchmarking scatter plots (marketplace + funder portfolio with full datasets)
- Background check section (4 cards: Data merch, Integrations, Checklist, Perplexity)
- Responsive layout (375px → 768px → 1280px)

**Phase 2 Complete** ✅:
- Unified MetricCard component with Base UI sliders
- Interactive metric adjustments with proper ranges
- Recalculate buttons on MOIC and Factor Rate
- Optimized BaseUISlider performance (no drag lag)

**Metric Ranges**:
- Gross Funding: $10K-$100K (step: $1K)
- Term: 30-180 days (step: 1 day)
- Target MOIC: 1.1-1.4 (step: 0.01)
- Factor Rate: 1.2-1.6 (step: 0.01)

**Design Spec**: `design-specs/screens/dashboard-layout-wireframe-v0.7.jpg`

### Dashboard Architecture & Personalization Roadmap

**Vision**: Modular "applet" architecture where each section is a self-contained tool with focused functionality.

**Layout Strategy**:
- **Fixed at Top** (always): Status hero + 4 metric sliders
- **Reorderable** (future): All other sections/cards below

**Development Approach** (Phased for Speed):

**✅ Phase 1: Component Development** (Current)
- Build each section as standalone, self-contained component
- Focus on functionality and UX refinement
- Section-by-section iteration (continue current approach)
- Use consistent patterns (headers, actions, spacing)

**Phase 2: Modular Architecture** (Later)
- Create `DashboardWidget` wrapper component
- Standardize widget interface (title, icon, settings, actions)
- Grid-based responsive layout system

**Phase 3: Personalization** (Future)
- Drag-and-drop reordering (dnd-kit library)
- User preferences persistence
- Show/hide widget toggles
- Widget size variants (if needed)

**Why This Works**:
- Ship faster by building features first, architecture later
- Get user feedback before committing to personalization patterns
- Learn what users actually want to customize
- Avoid premature optimization and over-engineering

**Current Strategy**: Continue building sections one-by-one with consistent patterns. Refactor to widget system when ~80% of sections are functionally complete.

### Playground Tabs

1. **Login** (`Login.tsx`) - Login screen
2. **Dashboard** (`Dashboard.tsx`) - Dashboard with metrics
3. **DealInput** (`DealInput.tsx`) - Funding application form
4. **Typography** (`Typography.tsx`) - Text styles and hierarchy
5. **Colors** (`Colors.tsx`) - Color system and palettes
6. **Forms** (`Forms.tsx`) - Form component testing
7. **Layout** (`Layout.tsx`) - Spacing and containers
8. **Data** (`Data.tsx`) - Tables, lists, data display
9. **Feedback** (`Feedback.tsx`) - Alerts, toasts, status indicators
10. **Navigation** (`Navigation.tsx`) - Navigation patterns and menus

### Documentation Structure

- Design token system: `DESIGN_SYSTEM.md` (single source of truth)
- User journey: `FLOW_STRUCTURE.md`
- Git workflow: `GIT_WORKFLOW.md`
- Architecture: `ARCHITECTURE.md` (this file)
- Chart development: `CHARTS_WORKFLOW.md`
- MCP setup: `MCP_SETUP.md`

---

## Component System

Components follow a **hybrid approach** combining Base UI foundations with custom fintech components.

### Base UI Integration Pattern

- Use Base UI components as unstyled foundations (e.g., `Input` wraps `@base-ui-components/react/input`)
- Add custom styling and fintech-specific features on top
- Maintain compatibility with Base UI's accessibility and behavior patterns

### Component Structure

```
src/components/{name}/
├── {Name}.tsx       # Component implementation with forwardRef
├── index.ts         # Public exports
└── (optional files as needed)
```

### Current Components

- **Base UI Wrappers**: `ButtonBaseUIWrapper`, `InputBaseUIWrapper` (Tailwind + Base UI)
- **Dashboard**: `ScoreCard`, `MetricCard`, `ConfidenceCard`, `BaseUISlider` (dashboard metrics)
- **Form Controls**: `TextInput`, `NumberInput`, `CurrencyInput`, `SelectInput`, `ComboboxInput`, `PercentageInput`
- **Compound Components**: `Table`, `Sidebar`, `Tabs` (dot notation: `Table.Root`, `Table.Row`)
- **UI Elements**: `Button`, `Badge`, `Card`

### Path Aliases

Configured in both `tsconfig.json` and `vite.config.ts`:
- `@/` → `src/`
- `@playground/` → `playground/`
- `@lib/` → `src/lib/`
- `@design-system/` → `src/design-system/`

### Design System Architecture

**See `DESIGN_SYSTEM.md` for complete design token documentation.**
**See `DESIGN_SYSTEM_RULES.md` for tech debt prevention rules.**

**Pure CSS Architecture (Tailwind v4 @theme Pattern)**:
- **Single Source of Truth**: `src/index.css` (@theme directive)
- **No TypeScript Tokens**: All values defined in CSS, accessed via Tailwind utilities
- **Minimal Config**: `tailwind.config.js` contains only custom animations
- **Direct Usage**: Components use `className="text-xl p-4 bg-purple-700"`

#### Architecture Flow

```
src/index.css (@theme)
        ↓
CSS Custom Properties (--text-xl, --spacing-4, etc.)
        ↓
Tailwind Utilities (text-xl, p-4, bg-purple-700)
        ↓
Components use utilities directly
```

#### Available Token Categories

- **Colors**: Warm neutrals (300-900), brand purple, semantic (green, amber, red, blue)
- **Typography**: xs-9xl (12px-128px) + semantic tokens (--text-metric-value, --text-grade-overlay)
- **Spacing**: 8px grid system (0-96)
- **Borders**: Radius tokens (sm, md, lg, xl, 2xl, 3xl, full)
- **Shadows**: Elevation system (sm, md, lg, xl, 2xl, inner)
- **Animations**: Duration (instant, fast, normal, slow) + easing curves

All tokens are CSS custom properties that Tailwind automatically generates utilities from.

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

---

## Technical Foundation & Best Practices

### Tailwind CSS Integration ✅ Complete

**Completed**:
- Tailwind CSS v4 with Vite plugin installed
- All design tokens mapped to Tailwind configuration
- CSS architecture updated with `@layer` directives
- Component wrapper pattern established and documented
- Working examples: ButtonBaseUIWrapper, InputBaseUIWrapper

**Usage Pattern**:
```tsx
// Components use Tailwind utilities directly
className={classNames(
  'inline-flex items-center justify-center',
  'px-4 py-2.5 rounded-lg font-medium',
  'bg-purple-700 hover:bg-purple-800',
  'transition-all duration-150 ease-out'
)}
```

**Configuration**:
- Config: `tailwind.config.js` (animations only)
- Tokens: `src/index.css` (@theme directive) - SINGLE SOURCE OF TRUTH

### Base UI Foundation Strategy

**Why Base UI**:
- Unstyled, accessible primitives
- Full control over visual design
- ARIA-compliant out of the box
- Tree-shakeable components
- Active maintenance by MUI team

**Component Wrapper Pattern**:
```typescript
// Wrap Base UI with custom styling and fintech features
import { Input as BaseInput } from '@base-ui-components/react/input';

export const Input = ({ ...props }) => {
  return <BaseInput className="custom-fintech-styling" {...props} />;
};
```

**Best Practices**:
- Always wrap Base UI components, never use directly in pages
- Add fintech-specific props and features in wrappers
- Maintain consistent API across all components
- Document props and usage in component files

### Component Documentation Approach

**Component File Structure**:
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

**Documentation Strategy**:
1. **JSDoc Comments**: Document props and usage in component files
2. **Component Lab**: Visual testing ground in ComponentShowcase
3. **Usage Examples**: Show common patterns in comments
4. **Type Definitions**: Let TypeScript serve as documentation

**When to Document**:
- New component creation
- Adding new props or features
- Non-obvious usage patterns
- Integration with fintech-specific flows

---

## Testing Configuration

- **Vitest**: Unit testing with React Testing Library
- **Playwright**: E2E testing with desktop/mobile configs
- **Coverage**: Using v8 provider
- **Global Types**: `vitest/globals` and `@testing-library/jest-dom`

---

## Build Configuration

### Vite Configuration

- React plugin with automatic JSX runtime
- Auto-opens browser on `dev` and `preview`
- Path resolution for aliases

### TypeScript Configuration

- Target: ESNext with strict mode
- Module: ESNext with Bundler resolution
- JSX: react-jsx (automatic runtime)
- Isolated modules for faster builds

---

## Linting Rules

- **Import Order**: Enforced alphabetical ordering with empty lines between groups
- **React**: Hooks rules enforced, prop-types disabled (using TypeScript)
- **Accessibility**: jsx-a11y plugin for ARIA compliance
- **Unused Imports**: Automatically removed
