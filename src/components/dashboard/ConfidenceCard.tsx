import React from 'react';
import { classNames } from '@/lib/classNames';

interface ConfidenceCardProps {
  title?: string;
  prediction: string;
  description?: string;
  className?: string;
}

export const ConfidenceCard: React.FC<ConfidenceCardProps> = ({
  title = 'CONFIDENCE PREDICTION',
  prediction,
  description = 'Description details',
  className
}) => {
  return (
    <div className={classNames(
      'rounded-2xl p-8',
      'flex flex-col',
      className
    )} style={{ backgroundColor: '#D0F5ED' }}>
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-teal-700" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <h3 className="text-sm font-medium text-gray-700 tracking-wide uppercase">
          {title}
        </h3>
      </div>

      <div className="flex-1">
        <div className="text-6xl font-bold mb-6" style={{ color: '#0A7A6B' }}>
          {prediction}
        </div>
        {description && (
          <p className="text-gray-700 text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}