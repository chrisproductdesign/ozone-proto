# Git Workflow for Ogion Proto v0.5

## 🎯 Workflow Philosophy
Our Git workflow balances rapid iteration with stable progress, optimized for a design-driven development process where we frequently iterate on UI components and user experience.

## 📋 Branch Strategy

### Main Branch
- **`main`**: Production-ready code, always deployable
- Direct commits allowed during early prototyping phase
- All commits should be functional and tested

### Feature Branches (When to Use)
Create feature branches for:
- **Major features** spanning multiple sessions
- **Experimental changes** that might break existing functionality
- **Parallel explorations** of different design approaches
- **Risky refactors** that could destabilize the app

Branch naming convention:
```
feature/[component-or-screen]-[brief-description]
feature/dashboard-metrics
feature/funding-application-flow
feature/tailwind-v5-migration
```

## 🔄 Commit Strategy

### When to Commit
1. **After completing a component** - Each component should be its own commit
2. **After design iterations** - Capture each significant design refinement
3. **Before switching context** - Always commit before moving to different work
4. **After successful testing** - Confirmed working states should be committed
5. **End of session** - Always commit and push at session end

### Commit Message Format
```
type: Brief description (50 chars max)

- Bullet point details of what changed
- Include design decisions if relevant
- Reference design specs if applicable
- Note any breaking changes

Refs: #issue-number (if applicable)
```

Types:
- `feat`: New feature or component
- `fix`: Bug fix
- `refactor`: Code restructuring without feature change
- `style`: Visual/CSS changes only
- `docs`: Documentation updates
- `test`: Test additions or fixes
- `chore`: Build process, dependencies, etc.

### Example Commit Messages
```
feat: Implement LoginCard with interactive states

- Add email and password fields with validation
- Implement button state changes based on input
- Use Ogion brown (#4A4543) for active button
- Add responsive padding for mobile devices
- Include ARIA labels for accessibility
```

## 🚀 Push Strategy

### When to Push
1. **After completing a feature/component** - Share progress immediately
2. **End of each work session** - Never leave local commits unpushed
3. **Before requesting review** - Ensure latest changes are available
4. **After fixing critical issues** - Deploy fixes quickly

### Push Checklist
- [ ] Code builds without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] Visual testing completed (Playwright screenshots)
- [ ] Commit message is descriptive
- [ ] Design matches specifications

## 🔍 Design Iteration Workflow

### Component Development Flow
```
1. Receive design specs
   ↓
2. Create component on main branch
   ↓
3. Test with Playwright → Commit
   ↓
4. Get UX review feedback
   ↓
5. Iterate and refine → Commit
   ↓
6. Push to GitHub
   ↓
7. Move to next component
```

### Major Feature Flow
```
1. Create feature branch
   ↓
2. Implement feature across multiple commits
   ↓
3. Test thoroughly
   ↓
4. Merge to main via PR or direct merge
   ↓
5. Delete feature branch
```

## 📊 Version Control for Design Assets

### Design Specs Organization
```
design-specs/
├── components/        # Component-level designs
│   ├── login-card-states.png
│   ├── button-variants.png
│   └── form-fields.png
├── screens/          # Full screen designs
│   ├── Login-screen-default.png
│   ├── Dashboard-main.png
│   └── Funding-application.png
└── flows/           # User flow diagrams
    └── funding-journey.png
```

### Design File Naming
- Use PascalCase for screens: `Dashboard-main.png`
- Use kebab-case for components: `button-variants.png`
- Include state in name: `login-card-active.png`
- Version if needed: `dashboard-v2.png`

## 🔐 What to Track / What to Ignore

### Always Track
- Source code (`.tsx`, `.ts`, `.css`)
- Design specifications (`design-specs/`)
- Configuration files
- Documentation (`.md` files)
- Package files (`package.json`, `package-lock.json`)

### Never Track (.gitignore)
- Node modules (`node_modules/`)
- Build outputs (`dist/`)
- Environment variables (`.env`)
- IDE configurations (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`, `Thumbs.db`)
- Playwright artifacts (`.playwright-mcp/`)
- Test coverage reports (`coverage/`)

## 🎨 Design-Development Sync Points

### Commit After Each Design Phase
1. **Initial Implementation** - First functional version
2. **Visual Refinement** - After applying design tokens
3. **Interaction Polish** - After adding animations/transitions
4. **Responsive Adjustments** - After mobile optimization
5. **Accessibility Pass** - After adding ARIA labels and keyboard support
6. **Final Review** - After UX feedback incorporation

## 🚦 Quick Decision Guide

### Direct to Main vs Feature Branch
**Direct to Main** ✅
- Single component implementation
- Style/color updates
- Documentation changes
- Small bug fixes
- Design refinements

**Feature Branch** 🌿
- Multi-component features
- Breaking changes
- Database schema changes
- Major refactors
- Experimental features

## 📝 Session Workflow Checklist

### Start of Session
- [ ] Pull latest changes: `git pull`
- [ ] Check branch: `git branch`
- [ ] Review pending work in CLAUDE.md

### During Development
- [ ] Commit after each completed component
- [ ] Write descriptive commit messages
- [ ] Test before committing
- [ ] Keep commits atomic (one concept per commit)

### End of Session
- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Update todo list if needed
- [ ] Document any pending work

## 🔄 Continuous Integration

### Pre-Push Checks
```bash
# Run before pushing
npm run build       # Ensure build succeeds
npm run typecheck   # Check TypeScript
npm run lint        # Check code style
npm test           # Run unit tests
```

### Automated on Push (Future)
- Build verification
- Automated visual regression testing
- Deploy preview to staging

## 📚 Examples

### Example: Implementing a New Screen
```bash
# Start with latest code
git pull

# Implement screen (multiple commits)
git add src/screens/Dashboard.tsx
git commit -m "feat: Create Dashboard screen layout"

git add src/components/dashboard/
git commit -m "feat: Add MetricCard component for dashboard"

# After testing and refinement
git add .
git commit -m "refactor: Optimize Dashboard performance

- Memoize expensive calculations
- Add loading states
- Implement error boundaries"

# Push all changes
git push origin main
```

### Example: Experimenting with New Design
```bash
# Create feature branch
git checkout -b feature/glassmorphism-experiment

# Try new design approach
# ... make changes ...
git commit -m "experiment: Add glassmorphism to cards"

# If successful, merge to main
git checkout main
git merge feature/glassmorphism-experiment

# If unsuccessful, just delete branch
git checkout main
git branch -D feature/glassmorphism-experiment
```

## 🎯 Key Principles

1. **Commit Early, Commit Often** - Capture progress frequently
2. **Descriptive Messages** - Future you will thank present you
3. **Push Before Leaving** - Never leave work only on local
4. **Test Before Commit** - Ensure each commit is functional
5. **Document Design Decisions** - Include "why" in commit messages

---

This workflow prioritizes rapid iteration while maintaining code quality and enabling easy rollback if needed. Adjust as the project evolves from prototype to production.