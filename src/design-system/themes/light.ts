/**
 * Light Theme
 * Default light mode theme using design tokens
 */

import { colors, spacing, typography, borderRadius, shadow } from '../tokens';

export const lightTheme = {
  name: 'light',

  // Colors
  colors: {
    // Text
    text: {
      primary: colors.gray[900],
      secondary: colors.gray[600],
      tertiary: colors.gray[500],
      disabled: colors.gray[400],
      inverse: colors.white,
      placeholder: `rgba(15, 23, 42, ${0.45})`, // gray-900 with opacity
    },

    // Background
    background: {
      primary: colors.white,
      secondary: colors.gray[50],
      tertiary: colors.gray[100],
      elevated: colors.white,
      overlay: `rgba(0, 0, 0, ${0.5})`,
      disabled: `rgba(241, 245, 249, ${0.7})`,
    },

    // Borders
    border: {
      default: `rgba(15, 23, 42, ${0.14})`, // gray-900 with opacity
      light: colors.gray[100],
      strong: colors.gray[300],
      focus: `rgba(59, 130, 246, ${0.8})`, // blue-500 with opacity
    },

    // Primary
    primary: {
      main: colors.blue[500],
      hover: colors.blue[600],
      active: colors.blue[700],
      subtle: `rgba(59, 130, 246, ${0.1})`,
      subtleHover: `rgba(59, 130, 246, ${0.2})`,
      border: `rgba(59, 130, 246, ${0.2})`,
    },

    // Success
    success: {
      main: colors.green[500],
      hover: colors.green[600],
      active: colors.green[700],
      subtle: `rgba(16, 185, 129, ${0.12})`,
      subtleHover: `rgba(16, 185, 129, ${0.2})`,
      border: `rgba(34, 197, 94, ${0.55})`,
    },

    // Warning
    warning: {
      main: colors.amber[500],
      hover: colors.amber[600],
      active: colors.amber[700],
      subtle: `rgba(253, 224, 71, ${0.12})`,
      subtleHover: `rgba(253, 224, 71, ${0.2})`,
      border: `rgba(234, 179, 8, ${0.6})`,
    },

    // Danger
    danger: {
      main: colors.red[500],
      hover: colors.red[600],
      active: colors.red[700],
      subtle: `rgba(254, 226, 226, ${0.24})`,
      subtleHover: `rgba(254, 226, 226, ${0.32})`,
      border: `rgba(239, 68, 68, ${0.65})`,
    },
  },

  // Spacing (direct reference to tokens)
  spacing,

  // Typography
  typography,

  // Border radius
  borderRadius,

  // Shadows
  shadow: {
    ...shadow,
    focus: `0 0 0 4px rgba(59, 130, 246, ${0.14})`, // blue focus ring
    focusDanger: `0 0 0 4px rgba(239, 68, 68, ${0.14})`, // red focus ring
  },

  // Component-specific tokens
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

export type LightTheme = typeof lightTheme;