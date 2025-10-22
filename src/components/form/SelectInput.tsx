import React, { forwardRef } from 'react';
import { classNames } from '@/lib/classNames';

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
          'px-3.5 py-2.5 rounded-lg border bg-white text-gray-900',
          'text-sm',
          'transition-all duration-200',
          'focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50',
          'appearance-none cursor-pointer',
          'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2714%27%20height%3D%278%27%20viewBox%3D%270%200%2014%208%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L7%207L13%201%27%20stroke%3D%27%236b7280%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E")] bg-[position:right_0.875rem_center] bg-no-repeat pr-10',
          error ? 'border-red-300 focus:border-red-400 focus:ring-red-50' : 'border-gray-300',
          fullWidth ? 'w-full' : '',
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