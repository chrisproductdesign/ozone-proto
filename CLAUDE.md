# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🔄 IMMEDIATE ACTION ITEMS (Post Directory Rename)

**Context**: Local directory renamed from `ogion-proto` → `ozone-proto` to match GitHub repo name and prevent IDE confusion.

### When You Return to This Project:

1. **Verify Location** ✅
   ```bash
   pwd
   # Should show: /Users/chris/Claude/ozone-proto (not ogion-proto)
   ```

2. **Update Documentation References** (2 files affected)
   ```bash
   # Update PROGRESS.md - Replace 2 instances:
   # Old: /Users/chris/Claude/ogion-proto
   # New: /Users/chris/Claude/ozone-proto
   ```

3. **Verify Git Still Works** ✅
   ```bash
   git status
   git remote -v  # Should still show: ozone-proto.git
   ```

4. **Test Dev Environment** ✅
   ```bash
   npm run dev    # Should start normally
   npm run build  # Should build successfully
   ```

5. **Commit Documentation Update**
   ```bash
   git add PROGRESS.md CLAUDE.md
   git commit -m "docs: Update directory path references ogion→ozone"
   git push origin dev
   ```

### What Changed:
- ✅ Directory: `/Users/chris/Claude/ogion-proto` → `/Users/chris/Claude/ozone-proto`
- ✅ Everything else: **UNCHANGED** (git, npm, configs all work from new location)

### What's Already Correct:
- ✅ GitHub repo: Already named `ozone-proto`
- ✅ package.json: Already uses `"ozone-proto"`
- ✅ Vite config: Already uses `/ozone-proto/` base path
- ✅ All project paths: Relative (don't care about parent directory)

**Delete this section after completing the update.**

---

## 🧠 SESSION START PROTOCOL

**IMPORTANT**: At the start of each new session, run this command:

```
/start
```

Or manually trigger:
```
Read the MCP memory graph to load persistent project context
```

The memory graph contains:
- Feature decisions and rationale
- Component relationships and patterns
- Design iterations and history
- Technical constraints and preferences
- User preferences and working style

This loads persistent knowledge that spans across sessions, so you don't have to re-explain previous decisions.

---

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

---

## 🛡️ CRITICAL: Design System Rules - PREVENT TECH DEBT

**THESE RULES ARE MANDATORY. VIOLATING THEM CREATES TECH DEBT AND CONFUSION.**

**Full rules document:** `DESIGN_SYSTEM_RULES.md` - Read this for complete reference.

### Single Source of Truth: `src/index.css` @theme

**ALL design tokens live in ONE place:**
```
src/index.css
  ↓
@theme {
  --text-xl: 1.25rem;
  --spacing-4: 1rem;
  --color-purple-700: #7e22ce;
  /* etc. */
}
```

### Absolute Rules - NO EXCEPTIONS:

#### ❌ NEVER DO THIS:
1. **Create TypeScript token files** (`src/design-system/tokens/*.ts`)
2. **Import tokens in tailwind.config.js** (theme spreading, token imports)
3. **Define tokens in JavaScript/TypeScript** (duplicate sources of truth)
4. **Use arbitrary values without semantic tokens** (`text-[32px]` without purpose)
5. **Create inline styles for token values** (`style={{ fontSize: '32px' }}`)
6. **Add tokens to multiple files** (CSS + TS = duplicate source of truth)
7. **Create "helper" or "utility" token files** outside of src/index.css @theme

#### ✅ ALWAYS DO THIS:
1. **Add tokens to `src/index.css` @theme block** - This is the ONLY place
2. **Use Tailwind utilities in components** - `className="text-xl p-4"`
3. **For values not in ramp:** Create semantic tokens in @theme first
4. **Ask before adding tokens** if unsure about naming or category
5. **Update DESIGN_SYSTEM.md** when adding new token categories

### How to Add New Design Tokens (Step-by-Step):

#### Example: Adding a new metric value size (32px)

**CORRECT Process:**
```css
/* 1. Add to src/index.css @theme */
@theme {
  /* Existing tokens... */

  /* Semantic dashboard tokens */
  --text-metric-value: 2rem;  /* 32px - Standard metric values */
}
```

```tsx
/* 2. Use in components via Tailwind arbitrary value referencing CSS var */
<div className="text-[length:var(--text-metric-value)]">$50,000</div>

/* OR if Tailwind generates it automatically (for common sizes): */
<div className="text-4xl">$50,000</div>
```

```markdown
/* 3. Document in DESIGN_SYSTEM.md */
| --text-metric-value | 2rem | 32px | Standard metric values |
```

**WRONG Process (DO NOT DO THIS):**
```typescript
// ❌ Creating TypeScript token file
export const fontSize = {
  metricValue: '2rem', // NO! This creates duplicate source
}
```

```javascript
// ❌ Adding to tailwind.config.js
export default {
  theme: {
    fontSize: {
      'metric-value': '2rem', // NO! CSS @theme is the source
    }
  }
}
```

### When to Ask vs When to Proceed:

**ASK FIRST if:**
- Adding a new token category (e.g., first animation token)
- Creating semantic tokens (need to confirm naming convention)
- Value doesn't fit existing scale (e.g., 32px when scale is 12/14/16/18/20/24/30/36/48)
- Unsure whether to use primitive vs semantic token

**PROCEED WITHOUT ASKING if:**
- Using existing Tailwind utility (text-xl, p-4, bg-purple-700)
- Fixing off-ramp sizes by rounding to nearest defined token
- Adding clearly defined tokens that follow existing patterns

### Common Mistakes to Avoid:

1. **"I'll create a helper file for easier imports"** → NO. Use Tailwind utilities.
2. **"Let me add this to tailwind.config for consistency"** → NO. @theme is the source.
3. **"I'll make a TypeScript version for type safety"** → NO. Components use className strings.
4. **"This value is used a lot, I'll make it reusable"** → YES, but ONLY in @theme.

### Red Flags - Stop and Ask:

If you find yourself:
- Creating a new file in `src/design-system/tokens/`
- Importing tokens in `tailwind.config.js`
- Writing `export const` for design token values
- Seeing duplicate token definitions
- Finding multiple "sources of truth"

**STOP. Ask the user before proceeding.**

### Verification Checklist:

Before committing design system changes:
- [ ] ALL new tokens are in `src/index.css` @theme
- [ ] NO TypeScript files in `src/design-system/tokens/`
- [ ] NO token imports in `tailwind.config.js`
- [ ] Components use Tailwind utilities (`className="text-xl"`)
- [ ] DESIGN_SYSTEM.md is updated with new tokens
- [ ] `npm run build` passes

### File Structure Reference - What Exists and Why:

**Design System Files (THESE ARE THE ONLY ONES):**

```
src/
├── index.css                    # ⭐ SINGLE SOURCE OF TRUTH
│                               # Contains @theme with ALL design tokens
│                               # 228 lines: colors, typography, spacing, shadows, etc.
│
├── design-system/
│   └── index.ts                # Empty placeholder (just documentation comment)
│                               # NO exports, NO token definitions
│
└── (no tokens/ directory)      # ❌ DELETED - was unused, created tech debt
```

**Configuration Files:**

```
tailwind.config.js              # Minimal config (77 lines)
                               # ONLY contains: custom animations (keyframes)
                               # NO token imports, NO theme spreading
                               # Tailwind reads tokens from @theme automatically

tsconfig.json                   # TypeScript config
vite.config.ts                  # Vite config
package.json                    # Dependencies
```

**Documentation Files:**

```
DESIGN_SYSTEM.md               # Complete design token documentation
                              # Reference for all tokens in src/index.css

DESIGN_SYSTEM_RULES.md        # ⭐ CRITICAL - Tech debt prevention rules
                              # Must read before touching design tokens

CLAUDE.md                      # This file - developer instructions

GIT_WORKFLOW.md               # Git commit/push guidelines
FLOW_STRUCTURE.md             # User journey documentation
```

**What Does NOT Exist (and should NEVER be created):**

```
❌ src/design-system/tokens/               # DELETED - Do not recreate
❌ src/design-system/tokens/typography.ts  # DELETED - Do not recreate
❌ src/design-system/tokens/spacing.ts     # DELETED - Do not recreate
❌ src/design-system/tokens/colors.ts      # DELETED - Do not recreate
❌ src/design-system/tokens/index.ts       # DELETED - Do not recreate
❌ Any file that exports design token values
```

### Quick Reference: Where to Find Things

**Need to add a color?** → `src/index.css` @theme block
**Need to add font size?** → `src/index.css` @theme block
**Need to add spacing?** → `src/index.css` @theme block
**Need to see all tokens?** → `src/index.css` @theme block (lines ~5-228)
**Need token documentation?** → `DESIGN_SYSTEM.md`
**Need to use tokens in component?** → Use Tailwind utility: `className="text-xl"`

**Everything else is in src/index.css @theme. There is no other place.**

---

## Project Overview

**Fintech Prototype v0.7** - A fintech application focused on creating an optimal business funding experience. Building 3-4 key screens with a complete user flow, iterating on component design and UX for the most intuitive, simple, and polished interface possible.

### Project Goals
1. **Create Core Screens**: Login, Dashboard, Funding Application, Approval Status
2. **Build Complete Flow**: Start-to-finish funding journey with core loop
3. **Iterate on UX**: Refine for simplicity, intuitiveness, and optimal user experience
4. **Polish Components**: Evolve styling and visual design systematically

### Tech Stack
- **React 19.2** with TypeScript for type-safe development
- **Base UI Components** (`@base-ui-components/react`) as the unstyled component foundation
- **Tailwind CSS v4** for utility-first styling (✅ integrated)
- **Custom Design System** with tokens mapped to Tailwind
- **Vite** for fast development and building

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

## Git Workflow

**See `GIT_WORKFLOW.md` for complete version control strategy**

### Quick Reference
- **Commit frequently**: After each component, design iteration, or successful test
- **Push at session end**: Never leave work only on local machine
- **Direct to main**: For component development and iterations during prototype phase
- **Feature branches**: Only for experimental or breaking changes
- **Design specs**: Track in `design-specs/` folder, organized by components/screens/flows

### Commit Message Format
```
type: Brief description

- Detail what changed
- Include design decisions
- Reference design specs if applicable
```

Types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`

## Architecture

### Application Structure

The app uses a **minimal tab-based playground** for component development and iteration:
- `src/main.tsx` → `src/App.tsx` (directly renders PlaygroundApp) → `playground/App.tsx` → `playground/pages/index.tsx`

**Current Implementation Status:**

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

**Current Work**: See `PROGRESS.md` for active development tracking

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

**Playground Tabs:**
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

**Documentation:**
- Design token system: `DESIGN_SYSTEM.md` (single source of truth)
- User journey: `FLOW_STRUCTURE.md`
- Git workflow: `GIT_WORKFLOW.md`

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
├── index.ts         # Public exports
└── (optional files as needed)
```

**Current Components:**
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
**See lines 31-223 above for Design System Rules (what NOT to do).**

**Pure CSS Architecture (Tailwind v4 @theme Pattern):**
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

## Design Implementation Workflow

### How to Provide Design Specs

**Current Approach: Local Screenshots** (not Figma MCP)
1. Export design from Figma as PNG/JPG
2. Add to `design-specs/screens/` folder (e.g., `dashboard-v0.7.png`)
3. Tell Claude the file path: `"Implement design-specs/screens/dashboard-v0.7.png"`
4. Claude analyzes and implements using Tailwind + Base UI + design tokens

**Why Screenshots vs. Figma MCP**:
- ✅ Faster for iteration when designs aren't final
- ✅ No Figma node IDs to manage
- ✅ Git tracks design evolution
- ✅ Can version iterations (v1, v2, v3)

**Design Maturity Levels Supported**:
- **Rough wireframes**: Structure first, refine later (current dashboard approach)
- **70-90% polish**: Implementation with clarifying questions
- **90-100% polish**: Direct implementation

**Iterative Workflow for Complex Screens**:
1. **Full-page structure**: Analyze entire layout, create skeleton with placeholders
2. **Section-by-section refinement**: Polish each area (nav, scorecard, metrics, etc.)
3. **Iterate**: Replace placeholders, fine-tune typography/spacing/interactions

### Implementation Process

1. **Design Review**: Claude analyzes your design image
2. **Implementation Plan**: Confirms understanding and approach
3. **Code**: Builds using established component patterns
4. **Visual Test**: Playwright screenshot for your review
5. **Iterate**: Refinements based on your feedback
6. **Document**: Updates component docs and patterns

## Chart & Visualization Building Workflow

### Using AI Tools for Chart Development

When building charts and data visualizations, leverage AI agents and tools for design guidance and implementation:

#### Phase 1: Design Strategy
1. **visual-storyteller** (Agent) - Design visualization strategy
   - Determine best chart type for the data
   - Design color schemes and visual hierarchy
   - Plan animations and interactions

2. **ui-designer** (Agent) - Interface design
   - Dashboard layout recommendations
   - Component spacing and sizing
   - Design system consistency

3. **ui-design-review** (Plugin) - Design feedback
   - Professional critique of designs
   - Accessibility considerations
   - Visual best practices

#### Phase 2: Implementation
1. **context7** (MCP) - Technical documentation
   - Recharts API reference
   - D3.js patterns
   - Best practices and examples

2. Build components directly with Recharts/D3
   - OR use **algorithmic-art** (Skill) for animated/generative charts

3. **playwright** (MCP) - Testing
   - Take screenshots for review
   - Verify responsive behavior

#### Phase 3: Iteration
1. **ux-design-reviewer** (Agent) - UX analysis
   - User flow evaluation
   - Interaction patterns
   - Usability improvements

2. Apply feedback and refine

### Quick Reference for Chart Tools
- **visual-storyteller**: Data visualization design
- **ui-designer**: Interface/dashboard design
- **analytics-reporter**: Data insights and metric selection
- **context7**: Library documentation (Recharts, D3, etc.)
- **algorithmic-art**: Animated/generative visualizations

## Technical Foundation & Best Practices

### Tailwind CSS Integration ✅ Complete

**Completed:**
- Tailwind CSS v4 with Vite plugin installed
- All design tokens mapped to Tailwind configuration
- CSS architecture updated with `@layer` directives
- Component wrapper pattern established and documented
- Working examples: ButtonBaseUIWrapper, InputBaseUIWrapper

**Usage Pattern:**
```tsx
// Components use Tailwind utilities directly
className={classNames(
  'inline-flex items-center justify-center',
  'px-4 py-2.5 rounded-lg font-medium',
  'bg-purple-700 hover:bg-purple-800',
  'transition-all duration-150 ease-out'
)}
```

**Configuration:**
- Config: `tailwind.config.js` (animations only)
- Tokens: `src/index.css` (@theme directive) - SINGLE SOURCE OF TRUTH

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

GitHub: https://github.com/chrisproductdesign/ozone-proto-v0.7.git

## MCP Server Configuration (Model Context Protocol)

### ⚠️ IMPORTANT: Claude Code CLI Configuration

**Context**: MCP servers enable Claude Code to access external tools and services (documentation, browsers, design tools, databases, APIs, etc.)

**You are using Claude Code CLI** (terminal-based), NOT Claude Desktop (GUI app). These are separate applications with separate configurations.

### Configuration Locations for Claude Code CLI

MCP servers can be configured at three levels (in order of precedence):

1. **Project-scoped** (current project only):
   ```
   .mcp.json (in project root)
   ```

2. **User-scoped** (all your projects):
   ```
   ~/.claude.json
   ```

3. **Enterprise-managed** (if applicable):
   - macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
   - Linux: `/etc/claude-code/managed-mcp.json`

**Primary config for this setup**: `~/.claude.json` (user-level, shared across all projects)

### Current Active MCP Servers

**Working** ✓:
- **mui-mcp**: Material-UI documentation access
- **context7**: Up-to-date library documentation (React, Next.js, etc.)
- **playwright**: Browser automation and testing

**Configured but Failed** ✗:
- **github**: GitHub API (needs authentication)
- **figma variants**: Multiple figma MCP servers (6 failing, 1 needs auth)

### Configuration File Structure

**User-level** (`~/.claude.json`):
```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "your-api-key"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

**Project-level** (`.mcp.json` in project root):
```json
{
  "mcpServers": {
    "project-specific-server": {
      "command": "npx",
      "args": ["-y", "some-mcp-package"]
    }
  }
}
```

### Managing MCP Servers

**Check status**:
```bash
claude mcp list
```

**Add server** (user-level):
```bash
claude mcp add servername --scope user
```

**Edit config manually**:
```bash
# User-level (all projects)
open -e ~/.claude.json

# Project-level (current project only)
open -e .mcp.json
```

**Restart**: Exit and restart Claude Code CLI after config changes

### Important Notes

**DO NOT** confuse with Claude Desktop:
- **Claude Desktop** (GUI app): Uses `/Users/chris/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Code CLI** (terminal): Uses `~/.claude.json`
- These are SEPARATE applications with SEPARATE configs

### Reference Documentation
- **Official Docs**: https://docs.claude.com/en/docs/claude-code/mcp
- **Available Servers**: Check npm for `@modelcontextprotocol/server-*` packages and MCP registry
- **Archived Docs**: `design-specs/archive/` contains older documentation (may be outdated)

### Common Issues & Solutions
- **MCP not working**: Check config JSON syntax with `claude mcp list`
- **Permission errors**: Ensure command paths and file permissions are correct
- **Server failed**: Check if npm package exists and is compatible
- **Needs authentication**: Add required API keys in `env` or `headers` section

### Best Practices
1. Use `~/.claude.json` for servers you want across all projects
2. Use `.mcp.json` for project-specific servers
3. Keep sensitive data (API tokens) in environment variables when possible
4. Test servers individually before adding multiple
5. Run `claude mcp list` to verify server health after changes
6. Remove failed/unused servers to keep config clean

## ⚠️ Common Mistakes to Avoid

### DO NOT:
- Create new screens or features without being asked
- Assume brand names, colors, or visual styles
- Delete or significantly restructure without permission
- Make UX decisions without design specifications
- Start building when user is providing context or background
- Implement your own vision instead of the provided designs
- **Create TypeScript token files** in `src/design-system/tokens/`
- **Import design tokens in `tailwind.config.js`**
- **Create duplicate sources of truth** for design tokens
- **Use inline styles for design token values** (e.g., `style={{ fontSize: '32px' }}`)

### ALWAYS:
- Wait for explicit instructions before building
- Ask for mockups or specifications when not provided
- Confirm understanding before starting work
- Respect that the user is the product design lead
- Use placeholder content until real content is provided
- **Add all design tokens to `src/index.css` @theme block ONLY**
- **Use Tailwind utilities in components** (e.g., `className="text-xl"`)
- **Check DESIGN_SYSTEM.md** before adding new token categories
- **Ask first** if creating semantic tokens or unsure about naming