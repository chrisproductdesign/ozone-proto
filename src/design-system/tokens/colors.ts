/**
 * Color Tokens
 * Base color palette and semantic color mappings
 * Optimized for fintech applications with brand purple
 */

// Base Palette
export const colors = {
  // Neutral colors
  white: '#ffffff',
  black: '#000000',

  // Gray scale (Slate)
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Purple (Brand Primary)
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },

  // Blue (Secondary)
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Green (Success)
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Amber (Warning)
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Red (Danger/Error)
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
} as const;

// Semantic Color Tokens
export const semanticColors = {
  // Brand primary (Purple placeholder - to be updated with actual brand)
  brand: {
    DEFAULT: colors.purple[700], // #7e22ce (placeholder)
    hover: colors.purple[800],
    active: colors.purple[900],
    subtle: colors.purple[50],
    subtleHover: colors.purple[100],
  },

  // Primary actions and links
  primary: {
    DEFAULT: colors.purple[700],
    hover: colors.purple[800],
    active: colors.purple[900],
    subtle: colors.purple[50],
    subtleHover: colors.purple[100],
  },

  // Emphasis colors (for special text like scores, metrics)
  emphasis: {
    primary: '#4A3F42', // Dark brown for score displays
    secondary: '#6B5B73', // Purple-brown for accents
  },

  // Status colors (for badges, status indicators)
  status: {
    high: {
      bg: '#D0F5ED',     // Teal background
      bgHover: '#B8ECE3', // Darker on hover
      text: '#0A7A6B',   // Teal text
      icon: '#0A7A6B',   // Same as text
      border: '#7DD3C0', // Teal border
    },
    medium: {
      bg: colors.yellow[50],   // '#fffbeb'
      bgHover: colors.yellow[100],
      text: colors.yellow[700], // '#b45309'
      icon: colors.yellow[700],
      border: colors.yellow[300],
    },
    low: {
      bg: colors.red[50],      // '#fef2f2'
      bgHover: colors.red[100],
      text: colors.red[700],   // '#b91c1c'
      icon: colors.red[700],
      border: colors.red[300],
    },
  },

  // Success states
  success: {
    DEFAULT: colors.green[500],
    hover: colors.green[600],
    active: colors.green[700],
    subtle: colors.green[50],
    subtleHover: colors.green[100],
    border: colors.green[300],
  },

  // Warning states
  warning: {
    DEFAULT: colors.amber[500],
    hover: colors.amber[600],
    active: colors.amber[700],
    subtle: colors.amber[50],
    subtleHover: colors.amber[100],
    border: colors.amber[300],
  },

  // Danger/Error states
  danger: {
    DEFAULT: colors.red[500],
    hover: colors.red[600],
    active: colors.red[700],
    subtle: colors.red[50],
    subtleHover: colors.red[100],
    border: colors.red[300],
  },

  // Text colors
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[600],
    tertiary: colors.gray[500],
    disabled: colors.gray[400],
    inverse: colors.white,
    placeholder: colors.gray[400],
  },

  // Background colors
  background: {
    primary: colors.white,
    secondary: colors.gray[50],
    tertiary: colors.gray[100],
    disabled: colors.gray[100],
    overlay: 'rgba(0, 0, 0, 0.5)',
    inverse: colors.gray[900],
  },

  // Border colors
  border: {
    DEFAULT: colors.gray[200],
    light: colors.gray[100],
    strong: colors.gray[300],
    focus: colors.blue[500],
    error: colors.red[500],
  },
} as const;

// Opacity levels
export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

// Gradients for fintech UI
export const gradients = {
  // Brand gradients
  brandPrimary: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
  brandSecondary: 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)',
  brandSubtle: 'linear-gradient(135deg, #e9d5ff 0%, #f3e8ff 100%)',

  // Status gradients
  success: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
  danger: 'linear-gradient(135deg, #dc2626 0%, #f87171 100%)',

  // Neutral gradients
  graySubtle: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  dark: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',

  // Special effects
  shimmer: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
} as const;

export type ColorToken = keyof typeof colors;
export type SemanticColorToken = keyof typeof semanticColors;
export type GradientToken = keyof typeof gradients;