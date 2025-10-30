import React, { forwardRef, useState, useCallback } from 'react';
import { classNames } from '@/lib/classNames';
import { getBaseInputClasses, inputPadding, iconPosition } from './inputStyles';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  error?: boolean;
  fullWidth?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string | number;
  max?: string | number;
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
  ({ error = false, fullWidth = true, className, value = '', onChange, onFocus, onBlur, min, max, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [displayValue, setDisplayValue] = useState(formatCurrency(value));

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      setDisplayValue(unformatCurrency(displayValue));
      onFocus?.(e);
    }, [displayValue, onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      // Clamp value to min/max range
      const unformattedValue = unformatCurrency(e.target.value);
      const numericValue = parseFloat(unformattedValue);

      if (!isNaN(numericValue)) {
        let clampedValue = numericValue;

        if (min !== undefined && numericValue < Number(min)) {
          clampedValue = Number(min);
        }
        if (max !== undefined && numericValue > Number(max)) {
          clampedValue = Number(max);
        }

        // If value was clamped, update state and call onChange
        if (clampedValue !== numericValue) {
          const clampedString = clampedValue.toString();
          setDisplayValue(formatCurrency(clampedString));

          // Notify parent of clamped value
          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: clampedString
            }
          } as React.ChangeEvent<HTMLInputElement>;

          onChange?.(syntheticEvent);
          onBlur?.(e);
          return;
        }
      }

      setDisplayValue(formatCurrency(e.target.value));
      onBlur?.(e);
    }, [onBlur, min, max, onChange]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const unformattedValue = unformatCurrency(rawValue);

      setDisplayValue(rawValue);

      // Pass the unformatted value to parent
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: unformattedValue
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
        <span className={iconPosition.left}>
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
            getBaseInputClasses(error, fullWidth),
            inputPadding.leftIcon,
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';