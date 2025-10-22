import React from 'react';
import { classNames } from '@/lib/classNames';

interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className
}) => {
  return (
    <div className={classNames(
      'bg-white rounded-2xl p-8 shadow-sm',
      className
    )}>
      {title && (
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-5 pb-2 border-b border-gray-100">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};