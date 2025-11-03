# Project Progress

Session-by-session development tracking for Fintech Prototype v0.7.

---

## Session: 2025-10-27 (Continued)

### Focus: Input Range Bounds Bug Fix & Claude Code CLI Repair

#### ✅ Completed

**1. CRITICAL BUG FIX: Input Range Bounds Preventing Typing**

**Problem Discovered:**
- User reported inability to type numbers in Gross Funded Amount field
- Previous implementation from earlier session was fundamentally broken
- Min/max validation in `onChange` blocked ALL intermediate values during typing
- Example: Trying to type "15000" with min="10000" → First digit "1" = fails check → input never updates

**Root Cause:**
- Both `CurrencyInput.tsx` and `NumberInput.tsx` had overly aggressive validation
- Lines 54-61 (CurrencyInput) and 43-50 (NumberInput) rejected input if value < min
- React controlled input best practice: validate on blur, not on change

**Solution Applied:**
- **Removed validation from `onChange` handlers** - Allow intermediate values while typing
- **Added validation to `onBlur` handlers** - Clamp to min/max when user finishes editing
- **Preserved increment/decrement bounds** - Buttons still respect limits immediately

**Files Modified:**
- `src/components/form/CurrencyInput.tsx:42-81` - Moved validation from onChange to onBlur with clamping logic
- `src/components/form/CurrencyInput.tsx:83-99` - Cleaned onChange to allow free typing
- `src/components/form/NumberInput.tsx:38-77` - Added handleBlur with clamping, removed onChange validation
- `src/components/form/NumberInput.tsx:86` - Added onBlur handler to input element

**Testing Results:**
- ✅ Can type "1" → "15" → "150" → "15000" freely
- ✅ Typing "5000" + blur → auto-corrects to $10,000 (min)
- ✅ Typing "150000" + blur → auto-corrects to $100,000 (max)
- ✅ Valid values (15000) stay as entered and format properly
- ✅ Increment/decrement controls still enforce bounds immediately

**User Experience Impact:**
- **Before**: Completely broken - couldn't type anything below min value
- **After**: Natural flow - type freely, auto-correct on blur if needed

---

**2. SYSTEM FIX: Claude Code CLI Installation Conflict**

**Problem Discovered:**
- User noticed version mismatch: `claude --version` showed 2.0.8
- Latest version is 2.0.28 (released 3 hours prior, October 28, 2025)
- 20-version difference indicated significant installation issue
- Status command showed confusing "add-from-claude-desktop" message at bottom

**Investigation:**
- Found **two conflicting installations**:
  1. **Old (2.0.8)** in `~/.npm-global/lib/node_modules/@anthropic-ai/claude-code/` (installed Oct 5, 2025)
  2. **New (2.0.28)** in `~/.nvm/versions/node/v20.19.1/lib/node_modules/@anthropic-ai/claude-code/`
- Shell was using old version because `~/.npm-global/bin/` appeared earlier in PATH
- Active executable: `/Users/chris/.npm-global/bin/claude → 2.0.8`
- Correct executable (unused): `/Users/chris/.nvm/versions/node/v20.19.1/bin/claude → 2.0.28`

**Root Cause:**
- User has NVM (Node Version Manager) as primary npm package manager
- At some point, packages were installed to custom `~/.npm-global/` directory
- This created a precedence conflict where outdated global install overrode NVM's current install
- npm global prefix set to NVM: `/Users/chris/.nvm/versions/node/v20.19.1`
- But shell found old `~/.npm-global/bin/claude` first

**Solution Applied:**
```bash
# Attempted automatic update (failed to remove old installation)
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code

# Manually removed outdated installation
rm -rf ~/.npm-global/lib/node_modules/@anthropic-ai/claude-code
rm ~/.npm-global/bin/claude

# Cleared shell hash table to force PATH re-scan
hash -r
```

**Verification:**
- ✅ Version: `2.0.28 (Claude Code)` - Latest release
- ✅ Location: `/Users/chris/.nvm/versions/node/v20.19.1/bin/claude`
- ✅ MCP Servers: Working (context7, playwright, mui-mcp)
- ✅ Git Integration: Working
- ✅ Status Command: Working correctly

**What This Means:**
- Claude Code CLI is now on latest version with newest features from Sept 29, 2025 2.0 release
- Includes: VS Code extension support, improved status visibility, checkpoint system
- All tools and MCP servers functioning correctly
- No more version conflicts between npm installations

**About "add-from-claude-desktop" Message:**
- Not an error - just a helpful hint in status output
- Suggests you can copy MCP server configs from Claude Desktop to CLI
- Can be ignored - current MCP setup is working correctly

**Directory Structure Clarification:**
1. **`~/.claude/`** - Claude Code CLI data (history, settings, MCP config at `~/.claude.json`)
2. **`~/Library/Application Support/Claude/`** - Claude Desktop app data (separate application)
3. **These are separate apps** with separate configurations - working as intended
4. **Project directory**: `/Users/chris/Claude/ozone-proto` (capital C is canonical path)
   - Note: macOS is case-insensitive, so `/Users/chris/claude/` and `/Users/chris/Claude/` are the same
   - Git uses canonical form with capital C

**Files NOT Modified:**
- No root folder structure changes made
- No directory moves or renames
- Only removed duplicate/outdated npm package installation
- All project files and configurations remain untouched

**Current State:**
- ✅ Claude Code CLI: 2.0.28 (latest)
- ✅ Project: `/Users/chris/Claude/ozone-proto`
- ✅ Git: Clean working tree with 23 modified files, 14 untracked (normal dev state)
- ✅ MCP: context7, playwright, mui-mcp active and working
- ✅ Project-level MCP config: `.mcp.json` with 7 Figma server variants (for future use)

---

**3. Metrics Header Stability** (from earlier session)
- Fixed vertical jumping when metric values appear/disappear
- Solution: Fixed height (`h-[24px]`) + always-rendered content (non-breaking space `\u00A0`)
- Individual opacity transitions per value (not global)
- Labels always visible at `opacity-40`, values fade in at `opacity-100`
- File: `src/screens/DealInput.tsx:259-318`

**4. Design System Audit** (from earlier session)
- Scanned all form input components for design system compliance
- Result: 100% compliance across all form inputs
- All components properly use centralized `inputStyles.ts`
- Confirmed `BaseUISlider` is dashboard-specific (not a form component)

**5. Documentation Updates**
- Fixed CLAUDE.md contradictions (line 551 incorrect token reference)
- Moved `BaseUISlider` from "Form Controls" to "Dashboard" components
- Updated dashboard status to "Complete"
- **Updated PROGRESS.md** - Added comprehensive documentation of bug fix and CLI repair

#### 🔑 Key Learnings

1. **React Controlled Input Validation Best Practices**
   - **WRONG**: Validate in `onChange` - blocks intermediate values during typing
   - **RIGHT**: Validate in `onBlur` - allow free typing, clamp when done
   - Reason: User needs to type through invalid intermediate states to reach valid final value
   - Example: Typing "15000" with min="10000" → must allow "1", "15", "150", etc.

2. **npm Global Installation Conflicts**
   - Multiple npm installations (NVM + custom directories) can create PATH conflicts
   - Outdated packages in earlier PATH locations override newer correct versions
   - Solution: Use `which <command>` to verify which binary is executing
   - Always check package.json version in actual executable location
   - Manual cleanup required when `npm uninstall -g` fails to remove old installations

3. **macOS Case-Insensitive Filesystem**
   - `/Users/chris/claude/` and `/Users/chris/Claude/` are the same directory
   - Git uses canonical form (capital C), shell may use lowercase
   - Can cause confusion in file tagging and path resolution
   - Best practice: Use canonical form consistently

4. **Flexbox Height Stability**
   - Use fixed height + non-breaking space instead of conditional rendering
   - Prevents layout reflow when content appears/disappears

5. **Component Separation**
   - Dashboard components (BaseUISlider) vs form components have different styling needs
   - BaseUISlider uses `duration-150` (appropriate for Base UI wrapper)
   - Form inputs use `duration-[150ms]` (references design system token)

6. **Design System Workflow**
   - All form inputs share `inputStyles.ts` - excellent centralized pattern
   - Prevents duplication and ensures consistency

#### 📁 Files Modified

**Code Changes:**
- `src/components/form/NumberInput.tsx` - **FIX**: Moved validation from onChange to onBlur, added clamping logic
- `src/components/form/CurrencyInput.tsx` - **FIX**: Moved validation from onChange to onBlur, added clamping logic
- `src/screens/DealInput.tsx` - Updated bounds (from earlier session), fixed metrics header stability

**Documentation:**
- `CLAUDE.md` - Fixed contradictions and outdated information
- `PROGRESS.md` - Updated with comprehensive bug fix and CLI repair documentation

**System (npm global packages):**
- Removed: `~/.npm-global/lib/node_modules/@anthropic-ai/claude-code@2.0.8`
- Removed: `~/.npm-global/bin/claude` symlink
- Now using: `~/.nvm/versions/node/v20.19.1/lib/node_modules/@anthropic-ai/claude-code@2.0.28`

#### 🎯 Next Session

**Planned Focus**: Multi-part iteration across navigation, inputs, layout, and visuals

**Work Items**:
1. **Top Nav Unification** - Standardize navigation header across all screens
2. **Deal Input Type & Token Check** - Review input components for type safety and design token compliance
3. **Container Balance & Summary Iteration** - Refine layout containers and summary sections
4. **Deal Home Card Design** - Polish Deal Select card visuals
5. **Background App Visuals** - Finalize app-wide background treatments

---

## Session: 2025-10-30

### Focus: Deal Benchmarking Charts - Critical Bug Fix & Animation Polish

#### ✅ Completed

**1. CRITICAL BUG FIX: Scatter Plot Data Points Invisible**

**Problem Discovered:**
- User reported scatter plots showing only one data point instead of full datasets
- Expected 38 marketplace points + 20 funder portfolio points + 2 current deal markers = 60 total points
- Visual inspection showed all 73 circles rendered in DOM (correct count with multiple marketplace instances)
- **Root cause**: All circles had `radius="0px"` (r: null, computedR: "0px")

**Investigation:**
```
DOM inspection showed:
<circle r="null" ...>  // ❌ No radius calculated
computedR: "0px"       // ❌ Browser renders invisible circles
```

**Root Cause:**
- Custom Recharts shape function used `props.r` which was undefined
- Recharts Scatter component does NOT pass pre-calculated radius to custom shape functions
- ZAxis provided data but shape function didn't use it
- Previous implementation:
```typescript
shape={(props: any) => {
  return <circle r={props.r} />  // ❌ props.r is undefined
}}
```

**Solution Applied:**
- Implemented manual radius calculation from ZAxis data using area interpolation
- Formula: `area = minArea + normalizedZ * (maxArea - minArea)` → `radius = sqrt(area / PI)`
- Added proper min/max Z-value calculations from dataset
- Now circles render with sizes 4.7px to 8px based on deal size

**Implementation:**
```typescript
// Calculate radius from z value (dealSize) and ZAxis range [70, 200]
const minArea = 70;
const maxArea = 200;
const minZ = Math.min(...chartData.map(d => d.z || d.dealSize));
const maxZ = Math.max(...chartData.map(d => d.z || d.dealSize));
const zValue = payload.z || payload.dealSize || 100;

const normalizedZ = (zValue - minZ) / (maxZ - minZ);
const area = minArea + normalizedZ * (maxArea - minArea);
const radius = Math.sqrt(area / Math.PI);  // Convert area to radius

return (
  <circle
    cx={cx}
    cy={cy}
    r={radius}  // ✅ Now properly calculated
    fill={props.fill}
    stroke={variant === 'marketplace' ? '#6b5fb5' : '#0d9488'}
    strokeWidth={1}
    opacity={0.85}
  />
);
```

**Files Modified:**
- `src/components/charts/ScatterPlotChart.tsx:384-426` - Added radius calculation to custom shape function
- `src/components/charts/ScatterPlotChart.tsx:42-116` - Seeded random generators (existing, verified consistency)

**Testing Results:**
- ✅ Marketplace chart: 38 purple points visible with varying sizes
- ✅ Funder portfolio chart: 20 teal points visible with varying sizes
- ✅ Current deal markers: Blue circles at correct positions
- ✅ Color differentiation working: Purple (#8b7fd4) vs Teal (#14b8a6)
- ✅ Size variation working: Larger circles = larger deal sizes
- ✅ Data consistency: Seeded random maintains same patterns across re-renders

**User Experience Impact:**
- **Before**: Charts appeared empty except for current deal marker
- **After**: Full dataset visualizations showing marketplace breadth vs portfolio concentration

---

**2. ANIMATION SPEED IMPROVEMENTS: Chart Transitions**

**Goal**: Make tab switching animations snappier with strong ease-out motion.

**Context**: User requested faster animations when switching between Funding Amount / TIB / Industry / Region tabs in Deal Benchmarking section.

**Changes Applied:**

**Scatter Plot Charts:**
- Updated `animationDuration={300}` (was default 400ms)
- Added `animationEasing="ease-out"` to:
  - Scatter components (2x - marketplace/funder data points)
  - Bar components (2x - for bar chart overlays)
  - XAxis components (2x - horizontal axis labels)
  - YAxis components (2x - vertical axis labels)

**Background Check Cards (for consistency):**
- Card transitions: `duration-300` → `duration-200 ease-out`
- Progress ring: `duration-1000` → `duration-500 ease-out`
- Risk bar: `duration-1000` → `duration-500 ease-out`

**Files Modified:**
- `src/components/charts/ScatterPlotChart.tsx:384-472` - Animation props on 6 Recharts components
- `src/components/dashboard/BackgroundCheckCard.tsx:45,141,206,279,312` - Transition speeds

**Result:**
- Tab switches now feel immediate and responsive (300ms vs previous 400ms+)
- Ease-out motion creates natural deceleration at end of transitions
- Consistent animation timing across all dashboard chart interactions

---

**3. TAB SPACING & HOVER STATE POLISH: Deal Benchmarking**

**Goal**: Improve usability of benchmarking tabs with better spacing and visual feedback.

**User Requirements:**
1. More padding between tabs → 20px gap
2. Wider tap areas (horizontal padding) → added `px-3`
3. Maintain same height and text size → no changes to these
4. Add faint hover fill → 15% opacity purple

**Changes Applied:**
```typescript
// Before:
<div className="flex items-center gap-6">  // 24px gap
  <button className="text-xs ...">

// After:
<div className="flex items-center gap-5">  // 20px gap
  <button className="text-xs ... px-3 rounded-t hover:bg-purple-700/15">
```

**Hover State Styles:**
- Active tab: `text-purple-700 border-b-2 border-purple-700`
- Inactive tab: `text-neutral-900 hover:text-neutral-700 hover:bg-purple-700/15`
- Added `rounded-t` for visual polish on hover background
- Consistent across all 4 tabs (Funding Amount, TIB, Industry, Region)

**Files Modified:**
- `playground/pages/DashboardV2.tsx:292-333` - Tab button styles

**User Experience Impact:**
- Better touch target sizes for mobile/tablet interactions
- Clear visual feedback on hover (subtle purple tint)
- Improved visual breathing room between options (20px vs 24px)
- Professional polish with rounded top corners on hover

---

#### 🔑 Key Learnings

1. **Recharts Custom Shape Functions**
   - Recharts does NOT pass `props.r` to custom shape functions
   - Must manually calculate radius from ZAxis data if using custom shapes
   - Formula: Interpolate z-value to area range, then convert area to radius
   - Always check DOM for actual rendered attributes when debugging visualization issues

2. **Area to Radius Conversion**
   - Area-based interpolation creates more perceptually uniform size differences
   - Formula: `radius = sqrt(area / PI)` (from circle area formula: A = πr²)
   - Allows control over visual size range independent of data range

3. **Seeded Random Generation**
   - Linear congruential generator: `value = (value * 9301 + 49297) % 233280`
   - Ensures consistent mock data across re-renders for reliable testing
   - Different seeds (12345 vs 54321) create distinct but reproducible datasets

4. **Recharts Animation Props**
   - `animationDuration`: milliseconds (default 400ms)
   - `animationEasing`: CSS easing function names ("ease-out", "ease-in", "linear")
   - Must apply to ALL animated components (Scatter, Bar, XAxis, YAxis) for consistency
   - 300ms is optimal for "snappy" feel without feeling jarring

5. **Tailwind Opacity Modifiers**
   - `/15` syntax = 15% opacity (e.g., `bg-purple-700/15`)
   - Works with any color utility: backgrounds, borders, text
   - More maintainable than hardcoded RGBA values

6. **Strategic Data Visualization**
   - Marketplace data: Broad MOIC range (1.00-1.55), even distribution across industries/regions
   - Funder portfolio: Narrow MOIC range (1.25-1.50), concentrated (80% one industry, 85% one region)
   - Visual differentiation reinforces strategic narrative (explore vs focus)

#### 📁 Files Modified

**Code Changes:**
- `src/components/charts/ScatterPlotChart.tsx` - Fixed radius calculation, animation speed
- `src/components/dashboard/BackgroundCheckCard.tsx` - Animation speed consistency
- `playground/pages/DashboardV2.tsx` - Tab spacing and hover states

**Documentation:**
- `PROGRESS.md` - This session summary

#### 🎯 Current State

**Deal Benchmarking Charts:**
- ✅ Scatter plots fully functional with 58+ data points visible
- ✅ Color differentiation working (purple marketplace, teal funder)
- ✅ Size variation working (based on deal size via ZAxis)
- ✅ Fast animations (300ms ease-out)
- ✅ Polished tab navigation (20px spacing, hover states)

**Dashboard (v0.7):**
- ✅ All sections complete and functional
- ✅ Interactive metrics with Base UI sliders
- ✅ Background check cards with animations
- ✅ Deal performance charts with scenario switching
- ✅ Portfolio risk visualization
- ✅ **NEW: Fully functional benchmarking scatter plots**

**Technical Foundation:**
- ✅ Recharts integration solid
- ✅ Design system compliance maintained
- ✅ No tech debt created
- ✅ Animation system consistent across all components

---

## Session: 2025-10-31

### Focus: Production Deployment + Dev/Main Git Workflow Setup

#### ✅ Completed

**1. TYPESCRIPT BUILD ERRORS FIXED (25 Errors → 0)**

**Problem Context:**
- Dashboard v0.7 needed deployment to GitHub Pages
- Performance audit revealed 25 TypeScript errors blocking production build
- User prioritized proper fixes over workarounds ("option a. this needs to work")

**Errors Fixed:**

**A. Ref Type Mismatches (4 errors in DashboardV2.tsx)**
- Issue: Icon refs typed as `useRef<HTMLButtonElement>` but wrapped in `<div>`
- Fix: Changed to `useRef<HTMLDivElement>` for:
  - `marketplaceIconRef` (line 60)
  - `funderIconRef` (line 61)
  - `chartDropdownRef` (line 62)

**B. Missing Type Definitions (8 errors across insight components)**
- Issue: `InsightList.ts` module didn't exist
- Fix: Created `src/components/insights/InsightList.ts` with:
  - `InsightType` type: 'positive' | 'warning' | 'negative' | 'neutral'
  - `Insight` interface: id, type, message, metric, priority
- Updated `src/components/insights/index.ts` to import types

**C. Ref Type Compatibility (1 error in InsightPanel.tsx)**
- Issue: `anchorRef` prop type didn't allow null
- Fix: Changed prop type to `React.RefObject<HTMLElement | null>` (line 10)
- Added type assertion: `panelRef as React.RefObject<HTMLElement>` (line 36)

**D. Invalid Recharts Props (4 errors in ScatterPlotChart.tsx)**
- Issue: `animationDuration` and `animationEasing` not valid props in Recharts 3.3.0
- Fix: Removed these props from XAxis (lines 356, 477) and YAxis (lines 368, 487)

**E. Union Type Narrowing (7 errors in ScatterPlotChart.tsx)**
- Issue: TypeScript couldn't narrow union types in map/formatter functions
- Fix: Added type annotations:
  - `(d: any)` for map functions (lines 394-395)
  - `as (v: any) => string` for formatter (line 300)
  - `as any` for tickFormatter (line 356)
  - `(entry: any, index)` for map (line 500)

**F. Missing Required Prop (1 error in main.tsx)**
- Issue: `DashboardV2` requires `currentPage` prop
- Fix: Added `currentPage="dashboard"` (line 11)

**Build Verification:**
```bash
npm run build
# ✅ TypeScript compilation passed
# ✅ Vite build succeeded: 676.90 KB JS (200.24 KB gzipped)
```

**Files Modified:**
- `playground/pages/DashboardV2.tsx` - Ref type fixes
- `src/components/insights/InsightList.ts` - NEW file with type definitions
- `src/components/insights/index.ts` - Import statement
- `src/components/insights/InsightPanel.tsx` - Ref type compatibility
- `src/components/charts/ScatterPlotChart.tsx` - Removed invalid props, type assertions
- `src/main.tsx` - Added currentPage prop

---

**2. GITHUB PAGES DEPLOYMENT - DASHBOARD v0.7 LIVE**

**Goal**: Deploy standalone Dashboard (no playground navigation) to GitHub Pages.

**Configuration Changes:**

**A. Standalone Dashboard Setup**
- Modified `src/main.tsx` to render `DashboardV2` directly (bypassing PlaygroundApp)
- Disabled Home and Back navigation buttons in `DashboardV2.tsx` (lines 212, 228)
- Wrapped in `DealProvider` for state management

**B. Base Path Configuration**
- Initial issue: vite.config.ts had wrong base path (`/ozone-proto-v0.7/`)
- GitHub Pages actually served from `/ozone-proto/`
- Fix: Updated `vite.config.ts` base path to match GitHub repository name
- Redeployed after path correction

**Deployment Process:**
```bash
# 1. Build production bundle
npm run build

# 2. Deploy to GitHub Pages (gh-pages branch)
npm run deploy

# 3. Fixed base path and redeployed
# Updated vite.config.ts line 7: base: '/ozone-proto/'
npm run deploy
```

**GitHub Pages Architecture:**
- Deployment target: `gh-pages` branch (auto-managed by `gh-pages` npm package)
- Changes to `main` branch do NOT affect live site automatically
- Only `npm run deploy` updates production site

**Live Site:** https://chrisproductdesign.github.io/ozone-proto/

**Verification:**
- ✅ Build passed (no TypeScript errors)
- ✅ Bundle size: 676.90 KB JS (200.24 KB gzipped), 80.48 KB CSS (14.00 KB gzipped)
- ✅ Site accessible at correct URL
- ✅ Standalone Dashboard renders without playground navigation
- ✅ All dashboard features functional (metrics, charts, interactions)

**Files Modified:**
- `vite.config.ts` - Base path correction (line 7)
- `src/main.tsx` - Standalone Dashboard entry point
- `playground/pages/DashboardV2.tsx` - Disabled nav buttons

---

**3. DEV/MAIN GIT BRANCHING WORKFLOW**

**Problem**: User wanted to work locally with full playground without affecting live production site.

**Solution**: Set up separate branches for development vs production.

**Branch Architecture:**

**`main` - Production Branch**
- Purpose: Production-ready code for GitHub Pages deployment
- Contains: Standalone Dashboard (no playground navigation)
- Entry point: `src/main.tsx` renders `DashboardV2` directly
- Deployment: Run `npm run deploy` from this branch to update live site
- Rules:
  - No direct development work
  - Only merge from `dev` when ready to deploy
  - Always verify build passes before deploying

**`dev` - Development Branch**
- Purpose: Active development with full playground
- Contains: Full playground with all 5 tabs (Login, Deal Select, Deal Input, Dashboard, Foundation)
- Entry point: `src/main.tsx` renders `App` component with PlaygroundApp
- Daily workflow: Primary working branch
- Rules:
  - Commit frequently
  - Push at end of each session
  - Test locally before committing

**Implementation Steps:**

**A. Created `dev` Branch**
```bash
git checkout -b dev
# Edited src/main.tsx to restore full playground
git add src/main.tsx
git commit -m "feat: Restore full playground for development on dev branch"
git push -u origin dev
```

**B. Deleted Old `dashboard-only` Branch**
```bash
git branch -d dashboard-only
git push origin --delete dashboard-only
```
- Confirmed not used by GitHub Pages (gh-pages branch is separate)
- Cleaned up outdated branch

**C. Verified `main` Branch Unchanged**
```bash
git checkout main
npm run build  # ✅ Passed - standalone Dashboard still production-ready
git checkout dev  # Back to dev for ongoing work
```

**D. Updated GIT_WORKFLOW.md**
- Documented new core branches (dev/main)
- Explained GitHub Pages deployment process
- Updated session workflow checklist
- Added production deployment checklist
- Clarified safety guarantees (working on dev never affects live site)

**Safety Guarantees:**
- ✅ Working on `dev` will NEVER affect live site
- ✅ Only `npm run deploy` (from `main`) updates production
- ✅ `gh-pages` branch is auto-managed - don't touch manually
- ✅ Both branches backed up to GitHub remote

**Daily Workflow:**
```bash
# Development (99% of the time)
git pull                  # Get latest changes
# ... make changes, commit frequently ...
git push origin dev       # Push at end of session

# Production deployment (when ready)
git checkout main
git merge dev
npm run build            # Verify it builds
npm run deploy           # Update live site
git checkout dev         # Back to dev for next work
```

**Files Modified:**
- `GIT_WORKFLOW.md` - New branching strategy documentation
- `src/main.tsx` - Different configs per branch (dev: full playground, main: standalone)

**Git Operations:**
- Created branch: `dev`
- Deleted branches: `dashboard-only` (local + remote)
- Commits: 2 on dev (playground restore + docs update)

---

#### 🔑 Key Learnings

1. **TypeScript Strict Mode in Production**
   - All type errors must be resolved for `npm run build` to succeed
   - Ref types must match actual DOM element types, not desired element types
   - Union types require explicit type narrowing (type assertions or guards)
   - Third-party library props (Recharts) must match actual API (check docs when errors occur)

2. **GitHub Pages Deployment Flow**
   - gh-pages npm package manages deployment branch automatically
   - `npm run deploy` = build + push to gh-pages branch
   - Base path in vite.config.ts must match repository name
   - Changes to main/dev branches do NOT trigger automatic deployment
   - Live site ONLY updates when `npm run deploy` runs

3. **Git Branch-Based Workflow**
   - Separate branches allow different entry point configurations
   - Same codebase, different `src/main.tsx` = different app modes
   - Dev branch for full development environment
   - Main branch for production deployment
   - Branching enables safe local work without affecting production

4. **React Component Entry Points**
   - `src/main.tsx` determines what renders
   - Full playground: imports `App` → renders `PlaygroundApp` with tabs
   - Standalone mode: imports `DashboardV2` directly → no navigation
   - Single file change switches entire app mode

5. **Production Build Optimization**
   - Vite build output: 676 KB JS → 200 KB gzipped (70% compression)
   - Bundle warning threshold: 500 KB (can be addressed with code splitting later)
   - Gzip compression handled automatically by CDN/server
   - Build time: ~1.5 seconds for full production bundle

#### 📁 Files Modified

**TypeScript Fixes:**
- `playground/pages/DashboardV2.tsx` - Ref types, disabled nav buttons
- `src/components/insights/InsightList.ts` - NEW: Type definitions
- `src/components/insights/index.ts` - Import types
- `src/components/insights/InsightPanel.tsx` - Ref compatibility
- `src/components/charts/ScatterPlotChart.tsx` - Type assertions
- `src/main.tsx` - Added currentPage prop, standalone config (main branch)

**Deployment Configuration:**
- `vite.config.ts` - Base path correction

**Git Workflow:**
- `GIT_WORKFLOW.md` - Branching strategy documentation
- `src/main.tsx` - Full playground config (dev branch)

**Branch Operations:**
- Created: `dev` branch (pushed to origin)
- Deleted: `dashboard-only` branch (local + remote)

#### 🎯 Current State

**Production (main branch):**
- ✅ Dashboard v0.7 live at https://chrisproductdesign.github.io/ozone-proto/
- ✅ Standalone Dashboard (no playground navigation)
- ✅ TypeScript build passing (0 errors)
- ✅ Optimized bundle (200 KB gzipped JS)
- ✅ Ready for future deployments via `npm run deploy`

**Development (dev branch):**
- ✅ Full playground with 5 tabs available locally
- ✅ Working tree clean, all changes committed
- ✅ Pushed to remote (backed up on GitHub)
- ✅ Ready for ongoing development work

**Git Workflow:**
- ✅ Dev/main branching strategy documented
- ✅ Session workflow checklist updated
- ✅ Deployment process documented
- ✅ Safety guarantees established

**Technical Debt:**
- 🟡 Bundle size warning (676 KB JS, can be optimized later with code splitting)
- 🟡 2 npm security vulnerabilities flagged by GitHub (1 high, 1 moderate - not blocking)

#### 🎯 Next Session

**Primary Workflow:**
- Continue development on `dev` branch with full playground
- Commit frequently as features are developed
- Push to origin/dev at end of each session

**When Ready to Deploy Updates:**
1. Switch to `main`: `git checkout main`
2. Merge from `dev`: `git merge dev`
3. Verify build: `npm run build`
4. Deploy: `npm run deploy`
5. Switch back: `git checkout dev`

**Future Considerations:**
- Address bundle size warning with code splitting (dynamic imports)
- Review npm security vulnerabilities (non-blocking)
- Continue Dashboard refinements based on user feedback

---

## Archive: Previous Work

### Dashboard (v0.7) - Completed Prior to 2025-10-27

**Phase 1**: Full-page layout with sidebar navigation, status hero, metrics grid, composite score card, graph placeholders, background check section. Responsive layout (375px → 768px → 1280px).

**Phase 2**: Unified MetricCard component with Base UI sliders, interactive metric adjustments, recalculate buttons, optimized slider performance (no drag lag).

**Metric Ranges**: Gross Funding $10K-$100K, Term 30-180 days, Target MOIC 1.1-1.4, Factor Rate 1.2-1.6

**Design Spec**: `design-specs/screens/dashboard-layout-wireframe-v0.7.jpg`

---

## Session: 2025-10-29

### Focus: Login Screen Visual Design + Dashboard Charts with Recharts

#### ✅ Completed

**1. LOGIN SCREEN BACKGROUND VISUAL DESIGN**

**Goal**: Add sophisticated abstract visual elements to login screen background while maintaining focus on login card.

**Approach**: Hybrid design combining generated abstract art + coded SVG elements.

**Implementation:**

**Phase 1: Abstract Background Art Generation**
- Used canvas-design skill to create museum-quality abstract composition
- Created "Warm Foundations" design philosophy emphasizing:
  - Organic forms with asymmetric balance
  - Layered transparency for depth
  - Warm neutral palette (beiges, taupes, ochres, warm grays)
  - Sophisticated restraint - noticed but not intrusive
- Generated 2400x1600px PNG with 5 layers + texture overlay
- Output: `public/assets/login-background.png` (107KB optimized)
- Palette: 8 warm neutral tones coordinated with existing `#E8E2D9` background

**Phase 2: Enhanced SVG Decorative Elements**
- Bottom left: Flowing organic curves with warm taupe tones (20% opacity)
- Top right: Elegant curved paths creating movement (20% opacity)
- Center accents: Vertical curve + organic blob shapes (12-15% opacity)
- Scattered circular gradient accents positioned strategically (3 total)
- All elements use `pointer-events-none` to preserve interactivity

**Phase 3: CSS Integration**
- Background image with cover sizing and center positioning
- Radial gradient overlay for atmospheric blending
- Multiple layered elements create depth without overwhelming
- Fixed Vite base URL path issue (`/ozone-proto-v0.7/assets/login-background.png`)

**Phase 4: Responsive Testing**
- Desktop (1280px): Full artwork visible, balanced composition ✅
- Tablet (768px): Scales beautifully, maintains visual interest ✅
- Mobile (375px): Background adapts gracefully, login card prominent ✅

**Files Modified:**
- `src/screens/Login.tsx` - Enhanced with background art + refined SVG elements
- `public/assets/login-background.png` - Generated abstract artwork (NEW)
- `.claude/skills/canvas-design/warm-foundations-philosophy.md` - Design philosophy (NEW)

**User Feedback**: Initial design felt "too blobby" - simple organic circles weren't sophisticated enough. Noted for future iteration.

---

**2. DASHBOARD CHARTS IMPLEMENTATION WITH RECHARTS**

**Goal**: Replace placeholder text with functional, styled charts based on Figma design.

**Figma Analysis:**
- URL: `https://www.figma.com/design/tqkSthHAPWKVigxaA9iDRz/Ogion-v0.2-design?node-id=579-24066`
- Identified 3 chart requirements:
  1. "Offer history" - Area chart with purple gradient
  2. "Forecast" - Multi-line chart with 3 colored lines
  3. "Overview" - Horizontal progress bars (6 rows)

**Implementation:**

**Phase 1: Setup**
- Installed `recharts` package (added 36 packages)
- Created `src/components/charts/` directory structure

**Phase 2: Chart Components Created**

1. **OfferHistoryChart.tsx**
   - Type: Recharts `<AreaChart>` with smooth monotone curve
   - Visual: Purple gradient fill (`#9b87f5` → `#d4c5f9`)
   - Data: 30 days of mock offer values ($60K-$90K range with realistic fluctuation)
   - Features: Grid lines, axis labels, hover tooltips with currency formatting
   - Size: 220px height, responsive width

2. **ForecastChart.tsx**
   - Type: Recharts `<LineChart>` with 3 lines
   - Lines:
     - Purple gradient (Funding)
     - Pink gradient (Volume)
     - Peach gradient (Revenue)
   - Data: 12-month projections with wavy patterns (different frequencies for visual interest)
   - Features: Legend, smooth curves, staggered animations, hover tooltips
   - Size: 220px height, responsive width

3. **OverviewBars.tsx**
   - Type: Custom horizontal progress bars (not Recharts)
   - Bars: 6 rows with colors matching Figma:
     - Teal (#14b8a6)
     - Green (#22c55e)
     - Light green (#86efac)
     - Teal (#14b8a6)
     - Orange (#f97316)
     - Red (#ef4444)
   - Features: Animated fill on load (500ms ease-out), "Read more" links
   - Layout: Label (left) + Bar (center flex-1) + Link (right)

**Phase 3: Dashboard Integration**
- Added imports to `src/screens/Dashboard.tsx`
- Replaced placeholder text in BOTH Layout A and Layout B
- Two charts side-by-side in 2-column grid (md:col-span-6)
- Overview bars in full-width section below (col-span-12)
- Proper card styling: `bg-neutral-300 rounded-2xl p-5 shadow-sm`
- Section headers: "Offer history", "Forecast", "Overview"

**Files Created:**
- `src/components/charts/OfferHistoryChart.tsx` (NEW)
- `src/components/charts/ForecastChart.tsx` (NEW)
- `src/components/charts/OverviewBars.tsx` (NEW)
- `src/components/charts/index.ts` (NEW)

**Files Modified:**
- `src/screens/Dashboard.tsx` - Integrated all 3 charts in both layout modes
- `package.json` - Added recharts dependency

**Testing Notes:**
- Charts integrated successfully in code
- Multiple dev server instances caused some testing issues
- Charts should be visible after clean restart of dev server
- Located issue: Correct file path confirmed (`playground/pages/Dashboard.tsx` imports from `src/screens/Dashboard.tsx`)

---

#### 🎯 Current State

**Login Screen:**
- ✅ Abstract background art with warm tones
- ✅ Enhanced SVG decorative elements
- ✅ Fully responsive (mobile → tablet → desktop)
- ⚠️ User noted design needs more sophistication (less "blobby")

**Dashboard Charts:**
- ✅ Recharts installed and configured
- ✅ 3 chart components created with mock data
- ✅ Integrated into both dashboard layouts
- ✅ Styled to match existing design system
- ⚠️ Needs visual verification after clean dev server restart

**Design System:**
- ✅ All tokens remain in `src/index.css` @theme (no violations)
- ✅ Charts use Tailwind utilities + inline styles for Recharts-specific colors
- ✅ No new design token files created
- ✅ Maintained pure CSS architecture

---

#### 📁 Files Modified This Session

**New Files:**
- `public/assets/login-background.png` - Generated abstract artwork (107KB)
- `src/components/charts/OfferHistoryChart.tsx` - Area chart component
- `src/components/charts/ForecastChart.tsx` - Multi-line chart component
- `src/components/charts/OverviewBars.tsx` - Progress bars component
- `src/components/charts/index.ts` - Chart exports
- `.claude/skills/canvas-design/warm-foundations-philosophy.md` - Design philosophy

**Modified Files:**
- `src/screens/Login.tsx` - Background art + SVG enhancements
- `src/screens/Dashboard.tsx` - Charts integration (both layouts)
- `package.json` - Added recharts dependency

---

#### 🔑 Key Learnings

1. **Canvas-Design Skill Workflow**
   - Generate design philosophy first (4-6 paragraphs)
   - Express visually with layered composition
   - Requires Python PIL (Pillow) library
   - Output as PNG + markdown philosophy document

2. **Recharts Integration**
   - Gradient definitions via SVG `<defs>` + `<linearGradient>`
   - Mock data generation with Math.sin/cos for realistic waves
   - ResponsiveContainer required for proper sizing
   - Tooltip customization via contentStyle/labelStyle/itemStyle

3. **Multi-File Dashboard Architecture**
   - `playground/pages/Dashboard.tsx` imports from `src/screens/Dashboard.tsx`
   - Changes to src/screens are correct location
   - Both Layout A and Layout B need identical updates

4. **Dev Server Management**
   - Multiple parallel servers can cause port conflicts
   - Use `pkill -f "vite"` to clean up all instances
   - Fresh restart recommended after major changes

---

#### 🎯 Next Steps

**Immediate:**
1. Verify charts are visible after dev server restart
2. Get user feedback on chart styling, colors, data representation
3. Iterate on login background design (user wants less "blobby", more sophisticated)

**Potential Follow-ups:**
- Add real data connections to charts (replace mock data)
- Implement chart interactions (click, filter, zoom)
- Create additional chart types based on Figma (more empty placeholders remain)
- Refine login background with different aesthetic approach:
  - Options: Geometric/structured, flowing lines, fine textures, or minimalist gradients
- Responsive chart behavior on mobile breakpoints

---

**Last Updated**: 2025-10-31 (Production Deployment + Git Workflow Setup)
