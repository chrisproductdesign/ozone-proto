# Project Progress Archive

Historical session tracking for Fintech Prototype v0.7.

**Note**: This archive contains sessions older than 1 week. For current progress, see `PROGRESS.md`.

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

---

## Archive: Previous Work

### Dashboard (v0.7) - Completed Prior to 2025-10-27

**Phase 1**: Full-page layout with sidebar navigation, status hero, metrics grid, composite score card, graph placeholders, background check section. Responsive layout (375px → 768px → 1280px).

**Phase 2**: Unified MetricCard component with Base UI sliders, interactive metric adjustments, recalculate buttons, optimized slider performance (no drag lag).

**Metric Ranges**: Gross Funding $10K-$100K, Term 30-180 days, Target MOIC 1.1-1.4, Factor Rate 1.2-1.6

**Design Spec**: `design-specs/screens/dashboard-layout-wireframe-v0.7.jpg`

---

**Last Updated**: 2025-11-03 (Archived - sessions older than 1 week)
