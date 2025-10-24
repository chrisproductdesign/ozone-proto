/**
 * Example: Base UI Input Wrapper with Tailwind CSS
 *
 * This demonstrates wrapping Base UI's input component with Tailwind styles
 * for a fintech application's form controls.
 */

'use client';

import { forwardRef, useState } from 'react';
import { Input as BaseInput } from '@base-ui-components/react/input';
import type { ReactNode, InputHTMLAttributes } from 'react';
import { classNames } from '../../lib/classNames';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'error' | 'success';

export interface InputBaseUIWrapperProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  /**
   * The size of the input
   * @default 'md'
   */
  size?: InputSize;
  /**
   * The visual variant of the input
   * @default 'default'
   */
  variant?: InputVariant;
  /**
   * Label for the input field
   */
  label?: string;
  /**
   * Helper text or error message
   */
  helperText?: string;
  /**
   * Icon to display at the start of the input
   */
  startIcon?: ReactNode;
  /**
   * Icon to display at the end of the input
   */
  endIcon?: ReactNode;
  /**
   * Whether the input takes full width
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Container class for the wrapper
   */
  containerClassName?: string;
}

// Size mappings for Tailwind classes
const sizeClasses: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-4 py-3.5 text-lg',
};

// Variant mappings for Tailwind classes
const variantClasses: Record<InputVariant, string> = {
  default: `
    bg-white border-neutral-300
    hover:border-neutral-400
    focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20
    disabled:bg-neutral-50 disabled:text-neutral-500 disabled:border-neutral-200
  `,
  filled: `
    bg-neutral-50 border-transparent
    hover:bg-neutral-100
    focus:bg-white focus:border-purple-700 focus:ring-2 focus:ring-purple-700/20
    disabled:bg-neutral-100 disabled:text-neutral-500
  `,
  error: `
    bg-white border-red-500
    hover:border-red-600
    focus:border-red-500 focus:ring-2 focus:ring-red-500/20
    disabled:bg-neutral-50 disabled:text-neutral-500 disabled:border-neutral-200
  `,
  success: `
    bg-white border-green-500
    hover:border-green-600
    focus:border-green-500 focus:ring-2 focus:ring-green-500/20
    disabled:bg-neutral-50 disabled:text-neutral-500 disabled:border-neutral-200
  `,
};

/**
 * InputBaseUIWrapper Component
 *
 * A fintech-optimized input component that wraps Base UI's input primitive
 * with Tailwind CSS styling and additional features like labels and helper text.
 *
 * @example Basic usage
 * <InputBaseUIWrapper
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   type="email"
 * />
 *
 * @example With helper text and icon
 * <InputBaseUIWrapper
 *   label="Annual Revenue"
 *   helperText="Enter your company's annual revenue"
 *   startIcon={<DollarIcon />}
 *   placeholder="0.00"
 * />
 *
 * @example Error state
 * <InputBaseUIWrapper
 *   label="Tax ID"
 *   variant="error"
 *   helperText="Invalid Tax ID format"
 *   value={taxId}
 *   onChange={(e) => setTaxId(e.target.value)}
 * />
 */
export const InputBaseUIWrapper = forwardRef<HTMLInputElement, InputBaseUIWrapperProps>(
  (
    {
      size = 'md',
      variant = 'default',
      label,
      helperText,
      startIcon,
      endIcon,
      fullWidth = true,
      className,
      containerClassName,
      disabled,
      required,
      id,
      ...baseUIProps
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const [inputId] = useState(id || `input-${Math.random().toString(36).substr(2, 9)}`);

    // Compose input classes
    const inputClasses = classNames(
      // Base styles
      'block rounded-lg border text-neutral-800 placeholder-neutral-500',
      'transition-all duration-150 ease-out',
      'outline-none',

      // Size styles
      sizeClasses[size as InputSize],

      // Variant styles
      variantClasses[variant as InputVariant],

      // Full width
      fullWidth && 'w-full',

      // With icons
      startIcon ? 'pl-10' : '',
      endIcon ? 'pr-10' : '',

      // Custom classes
      className
    );

    // Container classes
    const containerClasses = classNames(
      'relative',
      fullWidth && 'w-full',
      containerClassName
    );

    // Helper text classes based on variant
    const helperTextClasses = classNames(
      'mt-1 text-sm',
      variant === 'error' && 'text-red-500',
      variant === 'success' && 'text-green-500',
      variant === 'default' && 'text-neutral-500',
      variant === 'filled' && 'text-neutral-500'
    );

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-neutral-700"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Start icon */}
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
              {startIcon}
            </div>
          )}

          {/* Base UI Input with Tailwind styling */}
          <BaseInput
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            className={inputClasses}
            {...baseUIProps}
          />

          {/* End icon */}
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <p className={helperTextClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputBaseUIWrapper.displayName = 'InputBaseUIWrapper';

/**
 * Additional Examples:
 *
 * 1. Currency Input:
 *    <InputBaseUIWrapper
 *      label="Funding Amount"
 *      type="number"
 *      startIcon={<span className="text-neutral-500">$</span>}
 *      placeholder="50,000"
 *      helperText="Minimum funding amount is $10,000"
 *    />
 *
 * 2. Search Input:
 *    <InputBaseUIWrapper
 *      placeholder="Search transactions..."
 *      startIcon={<SearchIcon />}
 *      endIcon={loading && <SpinnerIcon />}
 *    />
 *
 * 3. Password Input with Validation:
 *    <InputBaseUIWrapper
 *      label="Password"
 *      type="password"
 *      variant={passwordValid ? 'success' : 'error'}
 *      helperText={passwordValid ? 'Strong password' : 'Password must be at least 8 characters'}
 *    />
 *
 * 4. Filled Variant:
 *    <InputBaseUIWrapper
 *      label="Company Name"
 *      variant="filled"
 *      placeholder="Enter your company name"
 *    />
 *
 * 5. Small Size with Custom Styling:
 *    <InputBaseUIWrapper
 *      size="sm"
 *      placeholder="Quick search..."
 *      className="!rounded-full"
 *      containerClassName="max-w-xs"
 *    />
 */