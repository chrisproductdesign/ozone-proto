/** @type {import('tailwindcss').Config} */
import { colors, semanticColors, gradients, opacity } from './src/design-system/tokens/colors';
import { spacing, componentSpacing } from './src/design-system/tokens/spacing';
import { fontSize, fontWeight, lineHeight, letterSpacing, fontFamily } from './src/design-system/tokens/typography';
import { borderRadius, shadow, zIndex, animation, breakpoints } from './src/design-system/tokens/index';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./playground/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Core token mappings
    colors: {
      // Base colors
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,

      // Color scales
      gray: colors.gray,
      purple: colors.purple,
      blue: colors.blue,
      green: colors.green,
      amber: colors.amber,
      red: colors.red,

      // Semantic colors (for utility classes)
      brand: semanticColors.brand,
      primary: semanticColors.primary,
      success: semanticColors.success,
      warning: semanticColors.warning,
      danger: semanticColors.danger,
      error: semanticColors.danger, // Alias for danger
    },

    spacing: {
      ...spacing,
    },

    fontSize: {
      ...fontSize,
    },

    fontWeight: {
      ...fontWeight,
    },

    lineHeight: {
      ...lineHeight,
    },

    letterSpacing: {
      ...letterSpacing,
    },

    fontFamily: {
      sans: fontFamily.sans.split(', '),
      mono: fontFamily.mono.split(', '),
    },

    borderRadius: {
      ...borderRadius,
    },

    boxShadow: {
      ...shadow,
    },

    zIndex: {
      ...zIndex,
    },

    opacity: {
      ...opacity,
    },

    screens: {
      ...breakpoints,
    },

    transitionDuration: {
      ...animation.duration,
    },

    transitionTimingFunction: {
      ...animation.easing,
    },

    extend: {
      // Gradients as background images
      backgroundImage: {
        ...gradients,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // Component-specific spacing utilities
      padding: {
        'input-sm-x': componentSpacing.input.sm.x,
        'input-sm-y': componentSpacing.input.sm.y,
        'input-md-x': componentSpacing.input.md.x,
        'input-md-y': componentSpacing.input.md.y,
        'input-lg-x': componentSpacing.input.lg.x,
        'input-lg-y': componentSpacing.input.lg.y,
        'card-sm': componentSpacing.card.sm,
        'card-md': componentSpacing.card.md,
        'card-lg': componentSpacing.card.lg,
        'section-sm': componentSpacing.section.sm,
        'section-md': componentSpacing.section.md,
        'section-lg': componentSpacing.section.lg,
      },

      gap: {
        'stack-xs': componentSpacing.stack.xs,
        'stack-sm': componentSpacing.stack.sm,
        'stack-md': componentSpacing.stack.md,
        'stack-lg': componentSpacing.stack.lg,
        'stack-xl': componentSpacing.stack.xl,
        'inline-xs': componentSpacing.inline.xs,
        'inline-sm': componentSpacing.inline.sm,
        'inline-md': componentSpacing.inline.md,
        'inline-lg': componentSpacing.inline.lg,
        'inline-xl': componentSpacing.inline.xl,
      },

      // Additional semantic text colors
      textColor: {
        'primary': semanticColors.text.primary,
        'secondary': semanticColors.text.secondary,
        'tertiary': semanticColors.text.tertiary,
        'disabled': semanticColors.text.disabled,
        'inverse': semanticColors.text.inverse,
        'placeholder': semanticColors.text.placeholder,
      },

      // Additional semantic background colors
      backgroundColor: {
        'base': semanticColors.background.primary,
        'secondary': semanticColors.background.secondary,
        'tertiary': semanticColors.background.tertiary,
        'disabled': semanticColors.background.disabled,
        'overlay': semanticColors.background.overlay,
        'inverse': semanticColors.background.inverse,
      },

      // Additional semantic border colors
      borderColor: {
        'DEFAULT': semanticColors.border.DEFAULT,
        'light': semanticColors.border.light,
        'strong': semanticColors.border.strong,
        'focus': semanticColors.border.focus,
        'error': semanticColors.border.error,
      },

      // Ring colors for focus states
      ringColor: {
        'brand': semanticColors.brand.DEFAULT,
        'primary': semanticColors.primary.DEFAULT,
        'focus': semanticColors.border.focus,
      },

      // Animation keyframes
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

      // Animations using the keyframes
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

  plugins: [
    // We can add Tailwind plugins here as needed
    // e.g., @tailwindcss/forms, @tailwindcss/typography
  ],

  // Future CSS features
  future: {
    hoverOnlyWhenSupported: true,
  },
}