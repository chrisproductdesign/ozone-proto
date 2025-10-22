'use client';

import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '../../lib/classNames';

import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: ReactNode;
  /**
   * Visual variant of the card
   * @default 'default'
   */
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  /**
   * Padding size
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Whether the card is interactive (hover effects)
   * @default false
   */
  interactive?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      interactive = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          'ui-card',
          `ui-card--${variant}`,
          padding !== 'none' && `ui-card--padding-${padding}`,
          interactive && 'ui-card--interactive',
          className
        )}
        data-variant={variant}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// MetricCard Component for displaying KPIs
export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: ReactNode;
  className?: string;
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      label,
      value,
      subValue,
      trend,
      trendValue,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={classNames('ui-metric-card', className)}
        variant="elevated"
        {...props}
      >
        <div className="ui-metric-card__header">
          {icon && <span className="ui-metric-card__icon">{icon}</span>}
          <span className="ui-metric-card__label">{label}</span>
        </div>
        <div className="ui-metric-card__value">{value}</div>
        {subValue && <div className="ui-metric-card__sub-value">{subValue}</div>}
        {trend && trendValue && (
          <div className={`ui-metric-card__trend ui-metric-card__trend--${trend}`}>
            <span className="ui-metric-card__trend-arrow">
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            </span>
            <span className="ui-metric-card__trend-value">{trendValue}</span>
          </div>
        )}
      </Card>
    );
  }
);

MetricCard.displayName = 'MetricCard';

// AccountCard Component for portfolio/account displays
export interface AccountCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  balance: string;
  change?: string;
  changePercent?: string;
  logo?: ReactNode;
  isPositive?: boolean;
  className?: string;
}

export const AccountCard = forwardRef<HTMLDivElement, AccountCardProps>(
  (
    {
      name,
      balance,
      change,
      changePercent,
      logo,
      isPositive = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={classNames('ui-account-card', className)}
        variant="outlined"
        interactive
        {...props}
      >
        <div className="ui-account-card__header">
          {logo && <div className="ui-account-card__logo">{logo}</div>}
          <div className="ui-account-card__info">
            <div className="ui-account-card__name">{name}</div>
            <div className="ui-account-card__balance">{balance}</div>
          </div>
        </div>
        {(change || changePercent) && (
          <div className={`ui-account-card__change ${isPositive ? 'ui-account-card__change--positive' : 'ui-account-card__change--negative'}`}>
            {change && <span className="ui-account-card__change-value">{change}</span>}
            {changePercent && <span className="ui-account-card__change-percent">{changePercent}</span>}
          </div>
        )}
      </Card>
    );
  }
);

AccountCard.displayName = 'AccountCard';