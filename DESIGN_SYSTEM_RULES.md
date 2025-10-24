# Design System Rules - Tech Debt Prevention

**Last Updated:** 2025-10-24
**Status:** Locked and Enforced

---

## 🛡️ Critical Rule: Single Source of Truth

**ALL design tokens exist in ONE place ONLY:**

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

**228 lines of pure CSS custom properties.**
**Zero TypeScript token files.**
**Zero imports in tailwind.config.js.**

---

## ❌ Absolutely Forbidden

**These actions are BANNED and create tech debt:**

1. Creating files in `src/design-system/tokens/`
2. Exporting design token values from TypeScript/JavaScript
3. Importing tokens in `tailwind.config.js`
4. Creating "helper files" for design tokens
5. Defining token values in multiple locations
6. Using inline styles for token values: `style={{ fontSize: '32px' }}`
7. Creating arbitrary Tailwind values without semantic tokens: `text-[32px]`

---

## ✅ Required Workflow

### Adding a New Design Token

**Step 1: Add to src/index.css @theme**
```css
@theme {
  /* Existing tokens... */

  /* Your new token */
  --text-metric-value: 2rem;  /* 32px - Metric card values */
}
```

**Step 2: Use in component via Tailwind**
```tsx
// Option A: Direct utility (if Tailwind generates it)
<div className="text-4xl">Value</div>

// Option B: Arbitrary value referencing CSS var
<div className="text-[length:var(--text-metric-value)]">$50,000</div>
```

**Step 3: Document in DESIGN_SYSTEM.md**
```markdown
| --text-metric-value | 2rem | 32px | Metric card values |
```

---

## 🚨 Red Flags - Stop Immediately If You:

- Create a file: `src/design-system/tokens/anything.ts`
- Write: `export const fontSize = { ... }`
- Write: `import { fontSize } from './tokens'`
- Add to `tailwind.config.js`: `theme: { fontSize: { ... } }`
- See duplicate token definitions in multiple files
- Find yourself thinking "I'll create a helper for this"

**If any of these happen: STOP and ask the user.**

---

## 📁 What Files Exist (Complete List)

### Design System Files
- `src/index.css` - **THE ONLY PLACE** for design tokens
- `src/design-system/index.ts` - Empty placeholder (just docs)

### Configuration Files
- `tailwind.config.js` - Minimal (77 lines, animations only)
- `tsconfig.json`, `vite.config.ts`, `package.json`

### Documentation Files
- `DESIGN_SYSTEM.md` - Token reference documentation
- `CLAUDE.md` - Developer instructions (this gets read by LLMs)
- `GIT_WORKFLOW.md` - Git guidelines
- `FLOW_STRUCTURE.md` - User journey

### What Does NOT Exist
- ❌ `src/design-system/tokens/` directory
- ❌ Any TypeScript/JavaScript files exporting token values
- ❌ Any token imports in `tailwind.config.js`

---

## 🔍 Quick Reference

**Q: Where do I add a new color?**
A: `src/index.css` @theme block

**Q: Where do I add a new font size?**
A: `src/index.css` @theme block

**Q: Where do I add a new spacing value?**
A: `src/index.css` @theme block

**Q: How do I use tokens in components?**
A: Use Tailwind utilities: `className="text-xl p-4 bg-purple-700"`

**Q: Can I create a TypeScript file for type safety?**
A: NO. Components use className strings. No types needed.

**Q: Can I add tokens to tailwind.config.js?**
A: NO. Tailwind v4 reads from @theme automatically.

**Q: What if I need a value that's not in the scale?**
A: Add a semantic token to @theme first, then use it.

---

## ✅ Verification Checklist

Before committing design system changes:

- [ ] ALL new tokens are in `src/index.css` @theme
- [ ] NO TypeScript files in `src/design-system/tokens/`
- [ ] NO token imports in `tailwind.config.js`
- [ ] Components use Tailwind utilities (`className="text-xl"`)
- [ ] DESIGN_SYSTEM.md is updated with new tokens
- [ ] `npm run build` passes

---

## 📊 Current System Status

**Design Tokens:** 228 lines in `src/index.css` @theme
- Colors: Warm neutrals, brand purple, semantic colors
- Typography: xs-9xl (12px-128px) + semantic tokens
- Spacing: 8px grid system (0-96)
- Borders, shadows, animations: All in @theme

**TypeScript Token Files:** 0 (deleted, were unused)

**Tailwind Config:** 77 lines (minimal, animations only)

**Build Status:** ✅ Passing
- Typecheck: ✅
- Build: ✅ (813ms)
- Bundle: 53.22 kB CSS, 283.00 kB JS

---

## 🎯 Why These Rules Exist

**Problem We Solved:**
- Had duplicate token definitions (CSS + TypeScript)
- Tailwind v3 pattern mixed with v4 @theme
- Multiple "sources of truth" causing confusion
- ~10 KB of unused TypeScript token files
- Complex imports in tailwind.config.js

**Solution:**
- Pure CSS architecture (Tailwind v4 @theme)
- Single source of truth: `src/index.css`
- Tailwind auto-generates utilities from @theme
- Zero tech debt, zero confusion

**Result:**
- One place to look for tokens
- No duplicate definitions
- Proper Tailwind v4 pattern
- Smaller bundle size
- Future LLMs won't recreate the problem

---

**This document is law. Follow it exactly.**
