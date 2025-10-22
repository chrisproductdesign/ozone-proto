# Origin Proto 0.5 🚀

A beautiful fintech prototype demonstrating business funding application flows with exceptional UX.

## ✨ Features

### 🔐 Clean Login Interface
- Minimalist design with purple gradient accents
- Smooth transitions and micro-interactions
- Email/password authentication flow

### 📋 Multi-Step Funding Application
- **Step 1**: Business Information
  - Company details and industry selection
  - Years in operation and monthly revenue
- **Step 2**: Funding Needs
  - Interactive slider for funding amount ($5K - $500K)
  - Purpose selection and urgency indicators
  - Real-time payment calculations
- **Step 3**: Review & Submit
  - Summary cards with edit capabilities
  - Terms acceptance and submission

### 📊 Business Dashboard
- Key metrics displayed in beautiful cards
- Recent transaction history with status badges
- Account overview with balances
- Quick actions for common tasks
- Smooth navigation between dashboard and application

## 🛠 Tech Stack

- **React 19.2** - Latest React with automatic JSX runtime
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tooling
- **Custom Components** - Optimized for fintech UX patterns
  - Button, Card, Badge, Select, Slider
  - Table, Tabs, Sidebar, Input components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/chrisproductdesign/ogion-proto-0.3.git
cd ogion-proto-0.3

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
ogion-proto-0.5/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   └── ...
│   ├── playground/      # Demo pages
│   │   └── pages/
│   │       ├── FintechDashboard.tsx
│   │       └── FundingCalculator.tsx
│   └── styles/          # Global styles and themes
├── package.json
└── vite.config.ts
```

## 🎨 Design System

### Colors
- **Primary**: Purple (#7c3aed)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- Clean, modern system fonts
- Responsive sizing
- Clear hierarchy

### Components
All components support:
- Light/dark mode
- Responsive design
- Accessibility (ARIA attributes)
- Keyboard navigation

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