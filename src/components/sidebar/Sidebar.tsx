'use client';

import { forwardRef } from 'react';

import { classNames } from '../../lib/classNames';

import type { HTMLAttributes, ReactNode } from 'react';


import './Sidebar.css';

// Sidebar Root
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Whether the sidebar is collapsed
   * @default false
   */
  collapsed?: boolean;
  /**
   * Position of the sidebar
   * @default 'left'
   */
  position?: 'left' | 'right';
  /**
   * Additional CSS classes
   */
  className?: string;
  children?: ReactNode;
}

export const SidebarRoot = forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed = false, position = 'left', className, children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={classNames(
          'ui-sidebar',
          collapsed && 'ui-sidebar--collapsed',
          `ui-sidebar--${position}`,
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);

SidebarRoot.displayName = 'Sidebar';

// Sidebar Header
export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('ui-sidebar__header', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';

// Sidebar Content
export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('ui-sidebar__content', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarContent.displayName = 'SidebarContent';

// Sidebar Footer
export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('ui-sidebar__footer', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = 'SidebarFooter';

// Sidebar Nav
export interface SidebarNavProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={classNames('ui-sidebar__nav', className)}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

SidebarNav.displayName = 'SidebarNav';

// Sidebar Nav Item
export interface SidebarNavItemProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the item is currently active
   * @default false
   */
  active?: boolean;
  /**
   * Icon to display
   */
  icon?: ReactNode;
  /**
   * Badge content to display
   */
  badge?: ReactNode;
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * onClick handler
   */
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export const SidebarNavItem = forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  ({ active = false, icon, badge, disabled = false, onClick, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={classNames(
          'ui-sidebar__nav-item',
          active && 'ui-sidebar__nav-item--active',
          disabled && 'ui-sidebar__nav-item--disabled',
          className
        )}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {icon && <span className="ui-sidebar__nav-icon">{icon}</span>}
        <span className="ui-sidebar__nav-text">{children}</span>
        {badge && <span className="ui-sidebar__nav-badge">{badge}</span>}
      </button>
    );
  }
);

SidebarNavItem.displayName = 'SidebarNavItem';

// Sidebar Section
export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Section title
   */
  title?: string;
  className?: string;
  children?: ReactNode;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ title, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('ui-sidebar__section', className)}
        {...props}
      >
        {title && <h3 className="ui-sidebar__section-title">{title}</h3>}
        {children}
      </div>
    );
  }
);

SidebarSection.displayName = 'SidebarSection';

// Export compound component
export const Sidebar = {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Nav: SidebarNav,
  NavItem: SidebarNavItem,
  Section: SidebarSection,
};