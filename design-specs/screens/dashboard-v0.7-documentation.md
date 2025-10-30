# Dashboard v0.7 - Documentation

**Last Updated**: 2025-10-30
**Status**: Active Development
**Design Spec**: `design-specs/screens/dashboard-layout-wireframe-v0.7.jpg`

## Overview

Full-page responsive dashboard for deal analysis and benchmarking. Combines static metrics, interactive sliders, AI predictions, and market comparisons.

## Layout Structure

```
┌─[Sidebar]──┬─[Top Header: Deal Name + Actions]────────────────┐
│            │                                                   │
│   Logo     │  [Status Hero - AI Prediction]                   │
│   Home     │  [2x2 Metrics Grid - Interactive Sliders]        │
│            │  [Deal Performance Charts - 3 Scenarios]         │
│            │  [Composite Score Card]                          │
│            │  [Deal Benchmarking - Marketplace + Funder]      │
│            │  [Background Check Cards]                        │
│            │  [Portfolio Risk Analysis]                       │
│            │  [Loss Exposure Scenarios]                       │
│            │                                                   │
└────────────┴───────────────────────────────────────────────────┘
```

## Sections

### 1. Status Hero
- **Purpose**: AI-predicted deal outcome with confidence score
- **States**: Stable (green), Warning (yellow), Risk (red)
- **Component**: `StatusCard`
- **File**: `src/components/dashboard/StatusCard.tsx`

### 2. Deal Metrics Grid (2x2)
- **Interactive sliders** with Base UI components
- **Metrics**:
  - Gross Funding Amount ($10K-$100K)
  - Term (30-180 days)
  - Target MOIC (1.1-1.4) - with Recalculate button
  - Factor Rate (1.2-1.6) - with Recalculate button
- **Component**: `MetricCard` with `BaseUISlider`
- **Context**: Syncs with `DealContext` for cross-screen state
- **Files**:
  - `src/components/dashboard/MetricCard.tsx`
  - `src/components/dashboard/BaseUISlider.tsx`

### 3. Deal Performance Charts
- **Shared scenario toggle**: Best / Conservative / Moderate
- **Charts**:
  - Deal Range (Recharts AreaChart)
  - Payment Curve (Recharts AreaChart)
- **Component**: `DealRangeChart`, `PaymentCurveChart`
- **File**: `src/components/charts/`

### 4. Composite Score Card
- **Large letter grade** (A-F) with 96px circular background
- **Settings button** for scorecard customization
- **Component**: `CompositeScoreCard`
- **File**: `src/components/dashboard/CompositeScoreCard.tsx`

### 5. Deal Benchmarking ⭐ NEW PATTERN
- **Tab-based x-axis toggle**: Funding Amount / TIB / Industry / Region
- **Two scatter plot charts**: Marketplace + Funder Portfolio
- **AI Insight Icon + Floating Panel** (see iteration details below)
- **Components**:
  - `ScatterPlotChart` - Recharts with current deal highlight
  - `InsightIconBadge` - Lightbulb icon with badges
  - `InsightPanel` - Floating panel with backdrop blur
- **Files**:
  - `src/components/charts/ScatterPlotChart.tsx`
  - `src/components/insights/InsightIconBadge.tsx`
  - `src/components/insights/InsightPanel.tsx`
  - `src/hooks/useClickOutside.ts`

### 6. Background Check
- **3 cards in 2x2 grid**:
  - Background Checklist (4/4 items)
  - Business Intelligence (verified)
  - Perplexity Search (AI verified)
- **Component**: `BackgroundCheckCard`
- **File**: `src/components/dashboard/BackgroundCheckCard.tsx`

### 7. Portfolio Risk
- **Toggle view**: Deal Size / Industry × Region
- **Treemap visualization** with summary stats
- **Component**: `PortfolioRiskCard`
- **File**: `src/components/charts/PortfolioRiskCard.tsx`

### 8. Loss Exposure Analysis
- **Scenario stress testing**: Baseline / Moderate / Severe
- **Exposure limit line** at $300K
- **Component**: `LossExposureChart`
- **File**: `src/components/charts/LossExposureChart.tsx`

---

## Recent Iteration: AI Insights Icon + Panel (2025-10-30)

### Problem Solved
Previous alert bars caused layout shifts and visual clutter. Needed elegant way to surface AI-generated insights without expanding/collapsing containers.

### Solution: Smart Icon + Floating Panel Pattern

**Components Created**:
1. **InsightIconBadge** - Minimal lightbulb icon with:
   - Colored dot badge (green/amber/red/blue) indicating highest priority
   - Count badge showing number of insights (if > 1)
   - Hover effects and active states

2. **InsightPanel** - Elegant floating panel with:
   - Backdrop blur effect (`backdrop-blur-md` + `bg-white/90`)
   - Fixed dimensions (320px × max 120px)
   - Absolutely positioned (zero layout shifts)
   - Smooth animations (fade-in, slide-in, 150ms)
   - Click outside or ESC to dismiss
   - Scrollable overflow

3. **useClickOutside** - Standard React hook for dismissing panels

### How It Works
- **Tab-Contextual**: Insights filter by active metric (Funding Amount, TIB, Industry, Region)
- **Priority-Based**: Badge color reflects highest priority insight (negative > warning > positive > neutral)
- **Session-Based**: Dismissed insights reset on page refresh
- **Zero Layout Shifts**: Absolutely positioned panel overlays chart

### Usage Example
```tsx
// Marketplace chart header
<div className="flex items-center gap-2">
  <div className="text-xs">MARKETPLACE</div>

  {activeInsights.length > 0 && (
    <InsightIconBadge
      ref={iconRef}
      count={activeInsights.length}
      highestPriority={getHighestPriorityType(activeInsights)}
      isOpen={isPanelOpen}
      onClick={() => setIsPanelOpen(!isPanelOpen)}
    />
  )}
</div>

<InsightPanel
  insights={activeInsights}
  isOpen={isPanelOpen}
  onClose={() => setIsPanelOpen(false)}
  anchorRef={iconRef}
/>
```

### Files Modified
- `playground/pages/DashboardV2.tsx` - Integrated icon + panel for both charts
- `src/components/insights/index.ts` - Updated exports, added helper function

### Files Deleted
- `src/components/insights/InsightAlert.tsx` (old alert bar)
- `src/components/insights/InsightList.tsx` (old container)

---

## State Management

**Local State** (DashboardV2.tsx):
- Metric sliders (grossFunding, term, moic, factorRate)
- Scenario toggles (performanceScenario, xAxisMetric)
- Insight panel states (marketplaceInsightsOpen, funderInsightsOpen)
- Mock insight data (marketplaceInsights, funderInsights)

**Global State** (DealContext):
- Deal metrics synced via `useDeal()` hook
- Cross-screen persistence (Dashboard ↔ Deal Input)

**Refs**:
- `marketplaceIconRef`, `funderIconRef` - For positioning floating panels

---

## Design Tokens Used

**Typography**:
- Section labels: `text-xs text-neutral-800`
- Card titles: `text-sm font-medium text-neutral-700`
- Metric values: `text-[length:var(--text-metric-value)]` (32px)
- Grade overlay: `text-[length:var(--text-grade-overlay)]` (96px)

**Colors**:
- Background: `bg-neutral-400` (page), `bg-white` (cards)
- Borders: `border-neutral-200`, `border-black/10`
- Insights: `text-green-600`, `text-amber-600`, `text-red-600`, `text-blue-600`

**Spacing**:
- Section gaps: `mb-12` (48px)
- Card padding: `p-5`, `p-6`
- Grid gaps: `gap-4`, `gap-[2px]` (tight grid)

**Effects**:
- Card shadows: `shadow-sm`, `shadow-md`, `shadow-lg`
- Backdrop blur: `backdrop-blur-md`
- Transitions: `transition-all duration-150 ease-out`

---

## Responsive Breakpoints

- **Mobile** (< 768px): Single column, stacked layout
- **Tablet** (768px - 1279px): 2-column grids, side-by-side charts
- **Desktop** (1280px+): Full layout, max-width container (1000px)

---

## Known Issues / TODO

- [ ] Mock data for insights - needs real AI integration
- [ ] Recalculate buttons on MOIC/Factor Rate - need backend endpoints
- [ ] Scatter plot data - currently static mock data
- [ ] Deal performance scenarios - need real calculation logic

---

## Testing

**Manual Testing Completed** (2025-10-30):
- ✅ Icon badges display with correct counts
- ✅ Panel opens/closes smoothly
- ✅ Click outside dismisses panel
- ✅ Tab switching updates insights
- ✅ Badge colors reflect priority
- ✅ Zero layout shifts confirmed

**Screenshot Evidence**:
- `.playwright-mcp/insight-panel-open.png`
- `.playwright-mcp/insight-panel-industry-tab.png`
