# Fintech Prototype v0.7 🚀

A fintech application prototype focused on creating an optimal business funding experience with 3-4 key screens and a complete user flow.

## ✨ Features

### 🔐 Authentication
- Clean login interface
- Smooth transitions and micro-interactions
- Email/password authentication flow

### 📋 Multi-Step Funding Application
- **Step 1**: Business Information
  - Company details and industry selection
  - Years in operation and monthly revenue
- **Step 2**: Funding Needs
  - Interactive slider for funding amount
  - Purpose selection and urgency indicators
  - Real-time payment calculations
- **Step 3**: Review & Submit
  - Summary cards with edit capabilities
  - Terms acceptance and submission

### 📊 Business Dashboard
- Key metrics displayed in cards
- Recent transaction history with status badges
- Account overview with balances
- Quick actions for common tasks
- Smooth navigation between dashboard and application

## 🛠 Tech Stack

- **React 19.2** - Latest React with automatic JSX runtime
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tooling
- **Base UI Components** (`@base-ui-components/react`) - Unstyled, accessible component foundation
- **Tailwind CSS v4** - Utility-first styling with custom design tokens
- **Custom Components** - Fintech-optimized wrappers and components
  - Button, Input, Card, Badge, Select, Slider
  - Table, Tabs, Sidebar, Form components
  - MetricCard, ScoreCard for financial data display

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/chrisproductdesign/ozone-proto-v0.7.git
cd ogion-proto-v0.7

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
ogion-proto-v0.7/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── button/          # ButtonBaseUIWrapper
│   │   ├── input/           # InputBaseUIWrapper
│   │   ├── card/
│   │   ├── dashboard/       # ScoreCard, MetricCard, ConfidenceCard
│   │   ├── form/            # Form components
│   │   └── ...
│   ├── design-system/       # Design tokens
│   │   ├── tokens/          # colors, spacing, typography
│   │   └── themes/          # light, dark themes
│   └── lib/                 # Utilities (classNames, etc.)
├── playground/              # Component development & testing
│   └── pages/               # Login, Dashboard, Forms, etc.
├── design-specs/            # Design mockups and specifications
├── docs/                    # Base UI documentation
├── DESIGN_TOKENS.md         # Token system documentation
├── CLAUDE.md                # Development guide
├── package.json
└── vite.config.ts
```

## 🎨 Design System

The project uses a comprehensive design token system built on:
- **Base UI** - Unstyled, accessible component primitives
- **Tailwind CSS v4** - Utility-first styling with custom tokens
- **Design Tokens** - Centralized colors, spacing, typography, and more

**See `DESIGN_TOKENS.md` for complete token documentation.**

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

## 📄 License

MIT

## 🤝 Contributing

This is a prototype project for demonstration purposes.

---

Built with ❤️ for exceptional fintech experiences