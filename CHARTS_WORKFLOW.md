# Chart & Visualization Building Workflow

Workflow for building charts and data visualizations using AI agents and tools.

---

## Using AI Tools for Chart Development

When building charts and data visualizations, leverage AI agents and tools for design guidance and implementation.

### Phase 1: Design Strategy

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

### Phase 2: Implementation

1. **context7** (MCP) - Technical documentation
   - Recharts API reference
   - D3.js patterns
   - Best practices and examples

2. Build components directly with Recharts/D3
   - OR use **algorithmic-art** (Skill) for animated/generative charts

3. **playwright** (MCP) - Testing
   - Take screenshots for review
   - Verify responsive behavior

### Phase 3: Iteration

1. **ux-design-reviewer** (Agent) - UX analysis
   - User flow evaluation
   - Interaction patterns
   - Usability improvements

2. Apply feedback and refine

---

## Quick Reference for Chart Tools

- **visual-storyteller**: Data visualization design
- **ui-designer**: Interface/dashboard design
- **analytics-reporter**: Data insights and metric selection
- **context7**: Library documentation (Recharts, D3, etc.)
- **algorithmic-art**: Animated/generative visualizations

---

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
