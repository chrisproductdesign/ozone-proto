'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { classNames } from '../../lib/classNames';

import {
  buttonDefaultVariant,
  type ButtonSize,
  type ButtonVariant,
} from './variants';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
   * Additional CSS classes
   */
  className?: string;
  /**
   * The button content
   */
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = buttonDefaultVariant.variant,
      size = buttonDefaultVariant.size,
      fullWidth = false,
      startIcon,
      endIcon,
      loading = false,
      disabled = false,
      className,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={classNames(
          'ui-button',
          `ui-button--${variant}`,
          `ui-button--${size}`,
          fullWidth && 'ui-button--full-width',
          loading && 'ui-button--loading',
          className
        )}
        data-variant={variant}
        data-size={size}
        data-loading={loading}
        data-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="ui-button__loader" aria-hidden="true">
            <svg className="ui-button__loader-icon" viewBox="0 0 24 24">
              <circle
                className="ui-button__loader-circle"
                cx="12"
                cy="12"
                r="10"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </span>
        )}
        {startIcon && !loading && (
          <span className="ui-button__icon ui-button__icon--start">{startIcon}</span>
        )}
        <span className="ui-button__content">{children}</span>
        {endIcon && !loading && (
          <span className="ui-button__icon ui-button__icon--end">{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';