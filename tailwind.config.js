/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS v4 Configuration
 *
 * Minimal config - all design tokens are defined in src/index.css using @theme directive.
 * Tailwind v4 automatically generates utilities from CSS custom properties.
 *
 * TypeScript token files (src/design-system/tokens/*.ts) provide IDE autocomplete
 * but are NOT imported here - they reference CSS variables, not define values.
 */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./playground/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // Custom animations (not in @theme because they're complex keyframes)
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },

      animation: {
        'fade-in': 'fadeIn 250ms ease-out',
        'fade-out': 'fadeOut 250ms ease-out',
        'slide-in-up': 'slideInUp 250ms ease-out',
        'slide-in-down': 'slideInDown 250ms ease-out',
        'slide-in-left': 'slideInLeft 250ms ease-out',
        'slide-in-right': 'slideInRight 250ms ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },

  plugins: [],

  future: {
    hoverOnlyWhenSupported: true,
  },
}
