import React from 'react';
import { classNames } from '@/lib/classNames';

interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  completed?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  className,
  required = false,
  completed = false
}) => {
  return (
    <div className={classNames('flex flex-col', className)}>
      {label && (
        <label className="text-xs font-medium text-neutral-700 mb-2 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500" aria-label="required">*</span>}
          {completed && (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Field completed">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </label>
      )}
      {children}
    </div>
  );
};