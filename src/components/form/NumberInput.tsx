import React, { forwardRef, useState } from 'react';

import { classNames } from '@/lib/classNames';

import { IncrementDecrementControls } from './IncrementDecrementControls';
import { getBaseInputClasses, inputPadding } from './inputStyles';

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  fullWidth?: boolean;
  showControls?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ error = false, fullWidth = true, showControls = true, className, min, max, step = 1, ...props }, ref) => {
    const [value, setValue] = useState(props.value || props.defaultValue || '');

    const handleIncrement = () => {
      const currentValue = parseFloat(value.toString()) || 0;
      const newValue = currentValue + Number(step);
      if (max !== undefined && newValue > Number(max)) return;
      setValue(newValue.toString());
      if (props.onChange) {
        const event = { target: { value: newValue.toString() } } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(event);
      }
    };

    const handleDecrement = () => {
      const currentValue = parseFloat(value.toString()) || 0;
      const newValue = currentValue - Number(step);
      if (min !== undefined && newValue < Number(min)) return;
      setValue(newValue.toString());
      if (props.onChange) {
        const event = { target: { value: newValue.toString() } } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(event);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      setValue(inputValue);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Clamp value to min/max range
      const numericValue = parseFloat(e.target.value);

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
          setValue(clampedString);

          // Notify parent of clamped value
          const changeEvent = {
            target: { value: clampedString }
          } as React.ChangeEvent<HTMLInputElement>;

          props.onChange?.(changeEvent);
        }
      }

      // Call original onBlur if provided
      props.onBlur?.(e);
    };

    return (
      <div className={classNames('relative', fullWidth ? 'w-full' : '')}>
        <input
          ref={ref}
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          className={classNames(
            getBaseInputClasses(error, fullWidth),
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            showControls ? inputPadding.rightControls : inputPadding.base,
            className
          )}
          {...props}
        />
        {showControls && (
          <IncrementDecrementControls
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';