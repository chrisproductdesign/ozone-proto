import React, { createContext, useContext } from 'react';

import { classNames } from '@/lib/classNames';

interface ToggleGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

interface ToggleGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface ToggleGroupItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const ToggleGroupRoot: React.FC<ToggleGroupProps> = ({
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange }}>
      <div
        role="group"
        className={classNames('inline-flex items-center gap-2', className)}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
};

const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  value,
  children,
  className,
}) => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error('ToggleGroup.Item must be used within ToggleGroup.Root');
  }

  const { value: selectedValue, onValueChange } = context;
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onValueChange(value)}
      className={classNames(
        // Base styles
        'inline-flex items-center justify-center',
        'px-3 py-1.5',
        'text-xs font-medium',
        'rounded-md',
        'transition-colors duration-150',
        'border-none',

        // Active/Inactive state
        isSelected
          ? 'text-white bg-purple-700'
          : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100',

        // Focus state
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-purple-700',

        className
      )}
    >
      {children}
    </button>
  );
};

export const ToggleGroup = {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
};
