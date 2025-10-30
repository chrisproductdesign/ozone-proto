import React, { forwardRef } from 'react';
import { classNames } from '@/lib/classNames';
import { getBaseInputClasses, inputPadding } from './inputStyles';

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ error = false, fullWidth = true, options, placeholder, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={classNames(
          getBaseInputClasses(error, fullWidth),
          '[&>option:disabled]:text-neutral-700',
          'appearance-none cursor-pointer',
          'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2714%27%20height%3D%278%27%20viewBox%3D%270%200%2014%208%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L7%207L13%201%27%20stroke%3D%27%23B5B3B2%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E")] bg-[position:right_1rem_center] bg-no-repeat',
          inputPadding.rightControls,
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

SelectInput.displayName = 'SelectInput';