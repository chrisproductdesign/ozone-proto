/**
 * Dark Theme
 * Dark mode theme using design tokens
 */

import { colors, spacing, typography, borderRadius } from '../tokens';

export const darkTheme = {
  name: 'dark',

  // Colors
  colors: {
    // Text
    text: {
      primary: colors.gray[50],
      secondary: colors.gray[400],
      tertiary: colors.gray[500],
      disabled: colors.gray[600],
      inverse: colors.gray[900],
      placeholder: `rgba(241, 245, 249, ${0.45})`, // gray-100 with opacity
    },

    // Background
    background: {
      primary: colors.gray[900],
      secondary: colors.gray[800],
      tertiary: colors.gray[700],
      elevated: colors.gray[800],
      overlay: `rgba(0, 0, 0, ${0.7})`,
      disabled: `rgba(30, 41, 59, ${0.5})`,
    },

    // Borders
    border: {
      default: `rgba(248, 250, 252, ${0.14})`, // gray-50 with opacity
      light: colors.gray[800],
      strong: colors.gray[600],
      focus: `rgba(96, 165, 250, ${0.8})`, // blue-400 with opacity
    },

    // Primary
    primary: {
      main: colors.blue[400],
      hover: colors.blue[300],
      active: colors.blue[500],
      subtle: `rgba(59, 130, 246, ${0.15})`,
      subtleHover: `rgba(59, 130, 246, ${0.25})`,
      border: `rgba(96, 165, 250, ${0.3})`,
    },

    // Success
    success: {
      main: colors.green[400],
      hover: colors.green[300],
      active: colors.green[500],
      subtle: `rgba(34, 197, 94, ${0.15})`,
      subtleHover: `rgba(34, 197, 94, ${0.25})`,
      border: `rgba(74, 222, 128, ${0.5})`,
    },

    // Warning
    warning: {
      main: colors.amber[400],
      hover: colors.amber[300],
      active: colors.amber[500],
      subtle: `rgba(251, 191, 36, ${0.15})`,
      subtleHover: `rgba(251, 191, 36, ${0.25})`,
      border: `rgba(251, 191, 36, ${0.5})`,
    },

    // Danger
    danger: {
      main: colors.red[400],
      hover: colors.red[300],
      active: colors.red[500],
      subtle: `rgba(248, 113, 113, ${0.15})`,
      subtleHover: `rgba(248, 113, 113, ${0.25})`,
      border: `rgba(248, 113, 113, ${0.5})`,
    },
  },

  // Spacing (direct reference to tokens)
  spacing,

  // Typography
  typography,

  // Border radius
  borderRadius,

  // Shadows (adjusted for dark mode)
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    focus: `0 0 0 4px rgba(96, 165, 250, ${0.2})`, // blue focus ring
    focusDanger: `0 0 0 4px rgba(248, 113, 113, ${0.2})`, // red focus ring
  },

  // Component-specific tokens (same structure as light)
  components: {
    input: {
      borderWidth: '1px',
      paddingX: {
        sm: spacing[2.5],
        md: spacing[3.5],
        lg: spacing[4],
      },
      paddingY: {
        sm: spacing[1.5],
        md: spacing[2.5],
        lg: spacing[3.5],
      },
      fontSize: {
        sm: typography.body.sm.fontSize,
        md: typography.body.base.fontSize,
        lg: typography.body.lg.fontSize,
      },
    },

    button: {
      paddingX: {
        sm: spacing[3],
        md: spacing[4],
        lg: spacing[6],
      },
      paddingY: {
        sm: spacing[1.5],
        md: spacing[2],
        lg: spacing[3],
      },
    },
  },
} as const;

export type DarkTheme = typeof darkTheme;