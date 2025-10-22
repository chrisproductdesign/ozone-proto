import React from 'react';
import { classNames } from '@/lib/classNames';

interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  className,
  required = false
}) => {
  return (
    <div className={classNames('flex flex-col', className)}>
      {label && (
        <label className="text-xs font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-0.5" aria-label="required">*</span>}
        </label>
      )}
      {children}
    </div>
  );
};