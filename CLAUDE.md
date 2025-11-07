# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

**MANDATORY RULE**: ALL design tokens live in ONE place: `src/index.css` @theme block.

**Full rules**: See `DESIGN_SYSTEM_RULES.md` for complete reference.

### Single Source of Truth

```
src/index.css @theme → CSS Custom Properties → Tailwind Utilities → Components
```

### The Golden Rules

❌ **NEVER**:
- Create TypeScript token files (`src/design-system/tokens/*.ts`)
- Import tokens in `tailwind.config.js`
- Define tokens in JavaScript/TypeScript
- Use inline styles for token values

✅ **ALWAYS**:
- Add tokens to `src/index.css` @theme block ONLY
- Use Tailwind utilities in components (`className="text-xl"`)
- Update `DESIGN_SYSTEM.md` when adding new tokens

### Quick Example

```css
/* src/index.css - CORRECT */
@theme {
  --text-metric-value: 2rem;  /* 32px */
}
```

```tsx
/* Component - CORRECT */
<div className="text-4xl">$50,000</div>
```

**See `DESIGN_SYSTEM_RULES.md` for detailed examples, file structure reference, and verification checklist.**

---

## 🚨 CRITICAL: Component Modification Rules - NEVER REPLACE, ALWAYS MODIFY

**THESE RULES PREVENT ACCIDENTAL COMPONENT REPLACEMENT AND DESIGN DESTRUCTION**

### The Golden Rule:
**When asked to add a feature to an existing component, MODIFY THE COMPONENT IN PLACE. NEVER replace it with a different component.**

### Absolute Rules - NO EXCEPTIONS:

#### ❌ NEVER DO THIS:
1. **Replace existing components** when asked to add features (dropdown, menu, button, etc.)
2. **Swap out working components** with new ones "because it's easier"
3. **Change the visual design** of a component unless explicitly asked
4. **Assume you should redesign** when asked to add functionality
5. **Delete existing component usage** to use a different component with similar features

#### ✅ ALWAYS DO THIS:
1. **Modify the existing component** when adding features (add props, state, child components)
2. **Preserve visual design** - keep all styling, layout, and visual elements intact
3. **Ask for clarification** if unsure about scope ("Should I modify ComponentX or create new ComponentY?")
4. **Take screenshot first** if uncertain about the impact of changes
5. **Add new features incrementally** without changing what already works

### Examples of What NOT to Do:

**BAD - What I did (Nov 3, 2025):**
```
User: "Add a gear icon popover to the 'Strong revenue...' card"
Me: *Replaces entire CompositeScoreCard with ScoreCardWithInputs*
Result: Destroyed the letter grade design, changed entire visual layout
```

**GOOD - What I should have done:**
```
User: "Add a gear icon popover to the 'Strong revenue...' card"
Me: *Adds ScoringConfigPopover to the existing CompositeScoreCard component*
Result: Same design, new feature added via gear icon click
```

### Translation Guide: What User Asks → What You Do

| User Request | WRONG Action | CORRECT Action |
|--------------|--------------|----------------|
| "Add a dropdown to ComponentX" | Replace ComponentX with ComponentY that has dropdown | Add dropdown to ComponentX |
| "Add a settings menu" | Use different component with settings | Add menu to existing component |
| "Make this interactive" | Redesign with new component | Add interactivity to existing component |
| "Add a popover here" | Replace card with popover-enabled card | Add popover trigger to existing card |

### Before Making Changes - Checklist:

- [ ] Did the user ask me to replace this component? (If NO, don't replace it)
- [ ] Am I changing the visual design? (If YES, ask for confirmation first)
- [ ] Am I adding a feature to an existing component? (If YES, modify it in place)
- [ ] Would the user be surprised by this change? (If YES, ask first)
- [ ] Can I take a screenshot to verify scope? (If uncertain, do it)

### Red Flags - Stop and Ask:

If you find yourself:
- Importing a different component to replace an existing one
- Removing component usage from a file to use something else
- Changing props significantly (grade → score, etc.)
- Thinking "this other component would work better"
- Making visual design changes not requested

**STOP. Ask the user for clarification before proceeding.**

### Severity:
**CRITICAL** - Violating these rules destroys user work and wastes time. Always err on the side of asking questions rather than making assumptions about component changes.

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

## Project Architecture

**See `ARCHITECTURE.md` for complete technical architecture, component patterns, and development setup.**

**Quick Reference**:
- Tab-based playground for component development
- Dashboard v0.7 complete with all metrics, charts, and interactions
- Hybrid Base UI + Tailwind CSS architecture
- See `DESIGN_SYSTEM.md` for token reference

**Development Workflow**: See `GIT_WORKFLOW.md` for complete git workflow, testing, and component development process.

**Chart Development**: See `CHARTS_WORKFLOW.md` for visualization building workflow with AI tools.

**MCP Servers**: See `MCP_SETUP.md` for MCP server configuration and troubleshooting.

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