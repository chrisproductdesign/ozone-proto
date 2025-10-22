import React, { forwardRef } from 'react';
import { classNames } from '@/lib/classNames';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error = false, fullWidth = true, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={classNames(
          'px-3.5 py-2.5 rounded-lg border bg-white text-gray-900',
          'text-sm placeholder:text-gray-400',
          'transition-all duration-200',
          'focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-50',
          error ? 'border-red-300 focus:border-red-400 focus:ring-red-50' : 'border-gray-300',
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      />
    );
  }
);

TextInput.displayName = 'TextInput';