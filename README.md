# Ozone Proto v0.7

Web application prototype built with React, TypeScript, and a custom design system.

## 🛠 Tech Stack

- **React 19.2** - Latest React with automatic JSX runtime
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tooling
- **Base UI Components** (`@base-ui-components/react`) - Unstyled, accessible component foundation
- **Tailwind CSS v4** - Utility-first styling with custom design tokens
- **Custom Components** - Base UI wrappers and compound components
  - Button, Input, Card, Badge, Select, Slider
  - Table, Tabs, Sidebar, Form components
  - MetricCard, ScoreCard for data display

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/chrisproductdesign/ozone-proto.git
cd ozone-proto

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
# Type-check and build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
ozone-proto/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── button/          # ButtonBaseUIWrapper
│   │   ├── input/           # InputBaseUIWrapper
│   │   ├── card/
│   │   ├── dashboard/       # ScoreCard, MetricCard, ConfidenceCard
│   │   ├── form/            # Form components
│   │   └── ...
│   ├── design-system/       # Design system exports (minimal)
│   ├── index.css            # ⭐ Design tokens (@theme directive)
│   └── lib/                 # Utilities (classNames, etc.)
├── playground/              # Component development & testing
│   └── pages/               # Login, Dashboard, Forms, etc.
├── design-specs/            # Design mockups and specifications
├── docs/                    # Base UI documentation
├── DESIGN_SYSTEM.md         # Design system and token documentation
├── CLAUDE.md                # Development guide
├── package.json
└── vite.config.ts
```

## 🎨 Design System

The project uses a comprehensive design token system built on:
- **Base UI** - Unstyled, accessible component primitives
- **Tailwind CSS v4** - Utility-first styling with custom tokens
- **Design Tokens** - Centralized colors, spacing, typography, and more

**See `DESIGN_SYSTEM.md` for complete token documentation.**

### Component Features
All components support:
- Base UI state attributes (`data-disabled`, `data-focused`, etc.)
- Responsive design (mobile-first)
- Accessibility (ARIA attributes)
- Keyboard navigation
- Consistent token-based styling

## 🧪 Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Lint code
npm run format       # Format code
npm test            # Run tests
```

