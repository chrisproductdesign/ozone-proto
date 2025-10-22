'use client';

import { createContext, useContext, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '../../lib/classNames';

import './Tabs.css';

// Context for sharing state between components
interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs.Root');
  }
  return context;
};

// Root component
export interface TabsRootProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The active tab value
   */
  value?: string;
  /**
   * Default active tab value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when tab changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Tabs orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child components
   */
  children: ReactNode;
}

export const TabsRoot = ({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: TabsRootProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;

  const onChange = (newValue: string) => {
    if (!controlledValue) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div
        className={classNames(
          'ui-tabs',
          `ui-tabs--${orientation}`,
          className
        )}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// List component (contains tab triggers)
export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child tab triggers
   */
  children: ReactNode;
}

export const TabsList = ({
  className,
  children,
  ...props
}: TabsListProps) => {
  return (
    <div
      className={classNames('ui-tabs__list', className)}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
};

// Trigger component (tab button)
export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * The value for this tab
   */
  value: string;
  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Tab label content
   */
  children: ReactNode;
}

export const TabsTrigger = ({
  value,
  disabled = false,
  className,
  children,
  ...props
}: TabsTriggerProps) => {
  const { value: activeValue, onChange } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={classNames(
        'ui-tabs__trigger',
        isActive && 'ui-tabs__trigger--active',
        className
      )}
      onClick={() => onChange(value)}
      data-active={isActive}
      data-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Content component (tab panel)
export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The value for this panel
   */
  value: string;
  /**
   * Whether to keep the panel mounted when inactive
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Panel content
   */
  children: ReactNode;
}

export const TabsContent = ({
  value,
  keepMounted = false,
  className,
  children,
  ...props
}: TabsContentProps) => {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive && !keepMounted) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      className={classNames(
        'ui-tabs__content',
        !isActive && 'ui-tabs__content--hidden',
        className
      )}
      data-active={isActive}
      {...props}
    >
      {children}
    </div>
  );
};

// Export as compound component
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};