'use client';

import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { classNames } from '../../lib/classNames';

import './Badge.css';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual variant of the badge
   * @default 'default'
   */
  variant?: BadgeVariant;
  /**
   * Size of the badge
   * @default 'md'
   */
  size?: BadgeSize;
  /**
   * Whether the badge should have a pill shape
   * @default false
   */
  pill?: boolean;
  /**
   * Icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Badge content
   */
  children?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      pill = false,
      icon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={classNames(
          'ui-badge',
          `ui-badge--${variant}`,
          `ui-badge--${size}`,
          pill && 'ui-badge--pill',
          className
        )}
        {...props}
      >
        {icon && <span className="ui-badge__icon">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';