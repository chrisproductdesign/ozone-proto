import React, { forwardRef } from 'react';

import { classNames } from '@/lib/classNames';

import { getBaseInputClasses } from './inputStyles';

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
          getBaseInputClasses(error, fullWidth),
          className
        )}
        {...props}
      />
    );
  }
);

TextInput.displayName = 'TextInput';