import React, { forwardRef, useState } from 'react';

import { classNames } from '@/lib/classNames';

import { IncrementDecrementControls } from './IncrementDecrementControls';
import { getBaseInputClasses, inputPadding, iconPosition } from './inputStyles';

interface PercentageInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  fullWidth?: boolean;
  showControls?: boolean;
}

export const PercentageInput = forwardRef<HTMLInputElement, PercentageInputProps>(
  ({ error = false, fullWidth = true, showControls = true, className, min, max, step = 0.5, ...props }, ref) => {
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

    return (
      <div className={classNames('relative', fullWidth ? 'w-full' : '')}>
        <input
          ref={ref}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min={min}
          max={max}
          step={step}
          className={classNames(
            getBaseInputClasses(error, fullWidth),
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            inputPadding.rightControls,
            className
          )}
          {...props}
        />
        <span className={iconPosition.rightWithControls}>
          %
        </span>
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

PercentageInput.displayName = 'PercentageInput';
