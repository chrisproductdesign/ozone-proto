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
      'bg-neutral-300 rounded py-6 px-6 shadow-sm',
      className
    )}>
      {title && (
        <h3 className="text-xs font-bold uppercase tracking-wide text-neutral-700 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};