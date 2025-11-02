# Dashboard Glass Surface Spec

| View | Component / Surface | Fill (Tailwind) | Shadow | Notes / Reference |
| --- | --- | --- | --- | --- |
| 1 | Page shells (`shellSurfaceClasses`) | `bg-white/65` (≈ #FFFFFF @ 65%) | `shadow-[0_32px_72px_-32px_rgba(65,48,71,0.45)]` | Applied to each major section container in `playground/pages/DashboardV2.tsx` (`shellSurfaceClasses`). |
| 2 | Status hero outer card | `bg-white/65` overlay on gradient mesh | `shadow-[0_32px_72px_-42px_rgba(26,26,26,0.6)]` | Defined in `src/components/dashboard/StatusCard.tsx`. Gradient mesh underneath provides color; shadow tuned heavier for contrast. |
| 3 | Status hero confidence pill | `bg-white/85` | `shadow-[0_18px_36px_-28px_rgba(26,26,26,0.5)]` | Inline `span` inside StatusCard (lines 70–77) for confidence badge. |
| 4 | Composite score outer card | `bg-white/70` | `shadow-[0_32px_72px_-32px_rgba(65,48,71,0.45)]` | Same shell treatment as other sections (`CompositeScoreCard.tsx`). |
| 5 | Scorecard settings popover | `bg-white/90` | `shadow-[0_32px_70px_-40px_rgba(26,26,26,0.55)]` | Anchored flyout in `CompositeScoreCard.tsx` (lines ~145–200). |
| 6 | Settings popover items | `bg-white/80` | `shadow-[0_12px_24px_-18px_rgba(26,26,26,0.4)]` | Placeholder control tiles within popover. |
| 7 | Metric selector pill (active) | `bg-neutral-900` text white | `shadow-[0_12px_28px_-20px_rgba(26,26,26,0.45)]` | Used in portfolio risk metric selector (`PortfolioRiskCard.tsx`). |
| 8 | Portfolio risk outer shell | `bg-white/70` | `shadow-[0_24px_54px_-30px_rgba(46,46,46,0.45)]` | Outer container in `PortfolioRiskCard.tsx`. |
| 9 | Portfolio risk inner panels | `bg-white/80` | `shadow-[0_12px_32px_-22px_rgba(46,46,46,0.4)]` | Used for chart + loss exposure blocks. |
| 10 | Benchmarking outer shell | `bg-white/70` | `shadow-[0_32px_72px_-32px_rgba(65,48,71,0.45)]` | Same shared shell. |
| 11 | Benchmarking inner cards | `bg-white/70` | `shadow-[0_24px_54px_-30px_rgba(46,46,46,0.45)]` | Combined grid panel in `DashboardV2.tsx`. |
| 12 | Toast (coming soon) | `bg-neutral-900/90` | Standard Tailwind drop shadow via `shadow-lg` | For PortfolioRisk metric toast. |

**Visual reference map**

- **Status hero**: `DashboardV2` top section; see screenshot `playground -> Dashboard` (tab 2) – thin confidence pill on right matches row 3.
- **Composite score**: Middle of dashboard; popover appears next to gear icon (rows 4–6).
- **Benchmarking**: Dual chart block below scorecard; inner panels use row 11 values.
- **Portfolio risk**: Bottom card; metric pills (row 7) and inner panels (rows 8–9) visible when switching metrics.

_File location_: `design-specs/dashboard-surface-spec.md`. Save/print as needed for future audits.

## Hex reference

| Context | Tailwind utility | Approx. hex | Notes |
| --- | --- | --- | --- |
| Glass shell fill | `bg-white/65` | #FFFFFF @ 65% (RGBA 255,255,255,0.65) | Used for primary section shells. |
| Glass shell fill (medium) | `bg-white/70` | #FFFFFF @ 70% (RGBA 255,255,255,0.70) | Composite score, benchmarking, portfolio risk outer panels. |
| Glass shell fill (inner) | `bg-white/80` | #FFFFFF @ 80% (RGBA 255,255,255,0.80) | Inner tiles/popover items. |
| Popover fill | `bg-white/90` | #FFFFFF @ 90% (RGBA 255,255,255,0.90) | Settings flyout surface. |
| Confidence pill | `bg-white/85` | #FFFFFF @ 85% (RGBA 255,255,255,0.85) | StatusCard confidence chip. |
| Toast background | `bg-neutral-900/90` | #171717 @ 90% (RGBA 23,23,23,0.90) | “Coming soon” toast. |
| Deep shadow | `rgba(65,48,71,0.45)` | #413047 @ 45% | Default shell drop shadow. |
| Hero shadow | `rgba(26,26,26,0.6)` | #1A1A1A @ 60% | Status hero outer card shadow. |
| Pill shadow | `rgba(26,26,26,0.5)` | #1A1A1A @ 50% | Confidence badge. |
| Popover shadow | `rgba(26,26,26,0.55)` | #1A1A1A @ 55% | Settings flyout. |
| Inner card shadow | `rgba(26,26,26,0.4)` | #1A1A1A @ 40% | Popover control tiles. |
| Portfolio shadow | `rgba(46,46,46,0.45)` | #2E2E2E @ 45% | Used on portfolio risk shell and benchmarking inner cards. |
