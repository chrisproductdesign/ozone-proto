/**
 * Shared Input Styling Configuration
 *
 * Standardized styling patterns for all form input components.
 * Uses design system tokens from src/index.css @theme.
 *
 * Design System Token References:
 * - Spacing: --spacing-2 (8px), --spacing-3 (12px)
 * - Border radius: --radius-lg (8px)
 * - Duration: --duration-fast (150ms)
 * - Colors: All from @theme
 */

import { classNames } from '@/lib/classNames';

/**
 * Base input classes shared across all input types.
 * Follows Tailwind v4 best practices and design system tokens.
 */
export const getBaseInputClasses = (error?: boolean, fullWidth?: boolean) => {
  return classNames(
    // Layout & Spacing (design system: --spacing-4, --spacing-3)
    'px-4 py-3',
    fullWidth && 'w-full',

    // Visual (design system: --radius-lg, neutral colors)
    'rounded-lg border bg-white',
    'text-base text-neutral-800',
    'placeholder:text-neutral-700',

    // Focus state (Tailwind v4 standard: ring-2)
    'focus:outline-none',
    'focus:border-purple-500',
    'focus:ring-2 focus:ring-purple-700/20',

    // Transitions (specific properties, design system: --duration-fast = 150ms)
    'transition-[border-color,box-shadow]',
    'duration-fast',

    // State variants
    'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:border-neutral-300',
    'read-only:bg-neutral-50 read-only:text-neutral-600',

    // Border colors (conditional based on error state)
    error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
      : 'border-neutral-400'
  );
};

/**
 * Padding configurations for inputs with icons, prefixes, or controls.
 * Maintains consistent spacing when additional elements are present.
 */
export const inputPadding = {
  base: 'px-4 py-3',           // Standard input: 16px horizontal, 12px vertical
  leftIcon: 'pl-8 pr-4 py-3',  // Left icon/prefix: 32px left, 16px right
  rightIcon: 'pl-4 pr-8 py-3', // Right icon/suffix: 16px left, 32px right
  rightControls: 'pl-4 pr-10 py-3', // Right controls: 16px left, 40px right
  bothSides: 'pl-8 pr-10 py-3', // Both sides: 32px left, 40px right
} as const;

/**
 * Icon/prefix positioning classes.
 * Ensures consistent placement of currency symbols, percentage signs, etc.
 */
export const iconPosition = {
  left: 'absolute left-4 top-1/2 -translate-y-1/2 text-neutral-800 text-base pointer-events-none',
  right: 'absolute right-4 top-1/2 -translate-y-1/2 text-neutral-800 text-base pointer-events-none',
  rightWithControls: 'absolute right-12 top-1/2 -translate-y-1/2 text-neutral-800 text-base pointer-events-none',
} as const;

/**
 * Control button classes for increment/decrement buttons.
 * Used by NumberInput and PercentageInput.
 */
export const controlButtonClasses = 'flex-1 px-2 hover:bg-neutral-50 transition-colors duration-fast';
