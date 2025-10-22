import React, { forwardRef, useState } from 'react';
import { classNames } from '@/lib/classNames';

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
            'px-3.5 py-2.5 rounded-lg border bg-white text-gray-900',
            'text-sm placeholder:text-gray-400',
            'transition-all duration-200',
            'focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            error ? 'border-red-300 focus:border-red-400 focus:ring-red-50' : 'border-gray-300',
            showControls ? 'pr-10' : '',
            fullWidth ? 'w-full' : '',
            className
          )}
          {...props}
        />
        {showControls && (
          <div className="absolute right-1 top-1 bottom-1 flex flex-col">
            <button
              type="button"
              onClick={handleIncrement}
              className="flex-1 px-2 hover:bg-gray-50 rounded-t transition-colors"
              aria-label="Increment"
            >
              <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12">
                <path d="M6 4L10 8H2L6 4Z" fill="currentColor"/>
              </svg>
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="flex-1 px-2 hover:bg-gray-50 rounded-b transition-colors"
              aria-label="Decrement"
            >
              <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12">
                <path d="M6 8L2 4H10L6 8Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';