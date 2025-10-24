/**
 * Example: Base UI Component Wrapper with Tailwind CSS
 *
 * This demonstrates the recommended pattern for wrapping Base UI components
 * with custom styling using Tailwind CSS classes.
 *
 * Key patterns shown:
 * 1. Import Base UI component
 * 2. Add custom props for fintech-specific features
 * 3. Map variants to Tailwind classes using cva (class-variance-authority) or similar
 * 4. Maintain full type safety
 * 5. Support all Base UI accessibility features
 */

'use client';

import { forwardRef } from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { classNames } from '../../lib/classNames';

// Fintech-specific button variants
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg';

// Extend HTML button props with fintech-specific props
export interface ButtonBaseUIWrapperProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /**
   * The visual style of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Content to display before the button text
   */
  startIcon?: ReactNode;
  /**
   * Content to display after the button text
   */
  endIcon?: ReactNode;
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Additional CSS classes (Tailwind utilities)
   */
  className?: string;
  /**
   * The button content
   */
  children: ReactNode;
}

// Variant to Tailwind class mappings
const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-purple-700 text-white border-transparent
    hover:bg-purple-800 active:bg-purple-900
    focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2
    disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  secondary: `
    bg-white text-gray-900 border-gray-200
    hover:bg-gray-50 active:bg-gray-100
    focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
    disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  ghost: `
    bg-transparent text-gray-700 border-transparent
    hover:bg-black/5 active:bg-black/10
    focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2
    disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  danger: `
    bg-red-500 text-white border-transparent
    hover:bg-red-600 active:bg-red-700
    focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2
    disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
  `,
  success: `
    bg-green-500 text-white border-transparent
    hover:bg-green-600 active:bg-green-700
    focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2
    disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
  `,
};

// Size to Tailwind class mappings
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3.5 text-lg',
  'icon-sm': 'size-8 p-0',
  'icon': 'size-9 p-0',
  'icon-lg': 'size-10 p-0',
};

/**
 * ButtonBaseUIWrapper Component
 *
 * A fintech-optimized button component that wraps Base UI's button primitive
 * with Tailwind CSS styling and additional features.
 *
 * @example Basic usage
 * <ButtonBaseUIWrapper variant="primary" size="md">
 *   Apply for Funding
 * </ButtonBaseUIWrapper>
 *
 * @example With icons
 * <ButtonBaseUIWrapper
 *   variant="success"
 *   startIcon={<CheckIcon />}
 *   endIcon={<ArrowRightIcon />}
 * >
 *   Complete Application
 * </ButtonBaseUIWrapper>
 *
 * @example Icon-only button
 * <ButtonBaseUIWrapper variant="ghost" size="icon">
 *   <SettingsIcon />
 * </ButtonBaseUIWrapper>
 *
 * @example Loading state
 * <ButtonBaseUIWrapper loading>
 *   Processing...
 * </ButtonBaseUIWrapper>
 */
export const ButtonBaseUIWrapper = forwardRef<HTMLButtonElement, ButtonBaseUIWrapperProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      startIcon,
      endIcon,
      loading = false,
      disabled = false,
      className,
      children,
      type = 'button',
      ...otherProps
    },
    ref
  ) => {
    // Check if this is an icon-only button
    const isIconButton = size === 'icon-sm' || size === 'icon' || size === 'icon-lg';

    // Compose all Tailwind classes
    const buttonClasses = classNames(
      // Base styles
      'inline-flex items-center justify-center',
      'font-medium rounded-lg border',
      'transition-all duration-150 ease-out',
      'outline-none',

      // Variant styles
      variantClasses[variant as ButtonVariant],

      // Size styles
      sizeClasses[size as ButtonSize],

      // Full width
      fullWidth && 'w-full',

      // Loading state
      loading && 'opacity-70 cursor-wait',

      // Custom classes
      className
    );

    // Icon sizing based on button size
    const iconSizeClass = isIconButton
      ? size === 'icon-sm'
        ? 'w-3 h-3'
        : size === 'icon'
        ? 'w-4 h-4'
        : 'w-5 h-5'
      : 'w-4 h-4';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={buttonClasses}
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        {...otherProps}
      >
        {/* Icon button: only show icon */}
        {isIconButton ? (
          <>
            {/* Loading spinner for icon buttons */}
            {loading && (
              <span className="animate-spin" aria-hidden="true">
                <svg
                  className={iconSizeClass}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            )}
            {/* Icon content (prefer startIcon, fall back to children) */}
            {!loading && (
              <span className={classNames('flex items-center', iconSizeClass)}>
                {startIcon || children}
              </span>
            )}
          </>
        ) : (
          <>
            {/* Loading spinner */}
            {loading && (
              <span className="mr-2 animate-spin" aria-hidden="true">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            )}

            {/* Start icon */}
            {startIcon && !loading && (
              <span className="mr-2 flex items-center">{startIcon}</span>
            )}

            {/* Button content */}
            <span>{children}</span>

            {/* End icon */}
            {endIcon && !loading && (
              <span className="ml-2 flex items-center">{endIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

ButtonBaseUIWrapper.displayName = 'ButtonBaseUIWrapper';

/**
 * Usage Examples:
 *
 * 1. Primary Action Button:
 *    <ButtonBaseUIWrapper variant="primary" size="lg" fullWidth>
 *      Get Started
 *    </ButtonBaseUIWrapper>
 *
 * 2. Secondary Button with Icon:
 *    <ButtonBaseUIWrapper variant="secondary" startIcon={<DownloadIcon />}>
 *      Download Report
 *    </ButtonBaseUIWrapper>
 *
 * 3. Danger Button for Destructive Actions:
 *    <ButtonBaseUIWrapper variant="danger" size="sm">
 *      Delete Account
 *    </ButtonBaseUIWrapper>
 *
 * 4. Loading State:
 *    <ButtonBaseUIWrapper variant="primary" loading>
 *      Submitting Application...
 *    </ButtonBaseUIWrapper>
 *
 * 5. Icon-Only Buttons:
 *    <ButtonBaseUIWrapper variant="ghost" size="icon-sm">
 *      <PencilIcon />
 *    </ButtonBaseUIWrapper>
 *    <ButtonBaseUIWrapper variant="secondary" size="icon">
 *      <SettingsIcon />
 *    </ButtonBaseUIWrapper>
 *    <ButtonBaseUIWrapper variant="primary" size="icon-lg">
 *      <PlusIcon />
 *    </ButtonBaseUIWrapper>
 *
 * 6. Custom Styled Button:
 *    <ButtonBaseUIWrapper
 *      variant="ghost"
 *      className="hover:text-purple-600 hover:bg-purple-50"
 *    >
 *      Custom Hover Effects
 *    </ButtonBaseUIWrapper>
 */