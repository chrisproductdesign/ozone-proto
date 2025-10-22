import React, { forwardRef, useState, useCallback } from 'react';
import { classNames } from '@/lib/classNames';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  error?: boolean;
  fullWidth?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Format a number string with thousand separators
const formatCurrency = (value: string): string => {
  // Remove all non-numeric characters except dots
  const numericValue = value.replace(/[^0-9.]/g, '');

  // Parse to number and format with commas
  const parts = numericValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
};

// Remove formatting for raw value
const unformatCurrency = (value: string): string => {
  return value.replace(/,/g, '');
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ error = false, fullWidth = true, className, value = '', onChange, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [displayValue, setDisplayValue] = useState(formatCurrency(value));

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      setDisplayValue(unformatCurrency(displayValue));
      onFocus?.(e);
    }, [displayValue, onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setDisplayValue(formatCurrency(e.target.value));
      onBlur?.(e);
    }, [onBlur]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      setDisplayValue(rawValue);

      // Pass the unformatted value to parent
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: unformatCurrency(rawValue)
        }
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    }, [onChange]);

    // Update display when value prop changes
    React.useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatCurrency(value));
      }
    }, [value, isFocused]);

    return (
      <div className={classNames('relative', fullWidth ? 'w-full' : '')}>
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
          $
        </span>
        <input
          ref={ref}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={classNames(
            'pl-8 pr-3.5 py-2.5 rounded-lg border bg-white text-gray-900',
            'text-sm placeholder:text-gray-400',
            'transition-all duration-200',
            'focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50',
            error ? 'border-red-300 focus:border-red-400 focus:ring-red-50' : 'border-gray-300',
            fullWidth ? 'w-full' : '',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';