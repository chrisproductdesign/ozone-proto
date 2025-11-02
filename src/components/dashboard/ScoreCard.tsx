import React from 'react';

import { classNames } from '@/lib/classNames';

interface ScoreCardProps {
  title?: string;
  score: number;
  description?: string;
  status?: 'high' | 'medium' | 'low';
  className?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  title = 'COMPOSITE SCORE',
  score,
  description = 'Strong revenue predictability',
  status = 'high',
  className
}) => {
  const statusColors = {
    high: 'text-green-700',
    medium: 'text-amber-700',
    low: 'text-red-700'
  };

  const statusLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };

  return (
    <div className={classNames(
      'bg-neutral-300 rounded-2xl p-5',
      'flex flex-col',
      className
    )}>
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-xs font-medium text-neutral-600 tracking-wide uppercase">
          {title}
        </h3>
        {status && (
          <span className={classNames(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
            statusColors[status],
            status === 'high' && 'bg-green-100 hover:bg-green-200',
            status === 'medium' && 'bg-amber-100 hover:bg-amber-200',
            status === 'low' && 'bg-red-100 hover:bg-red-200'
          )}>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12 L12 4 M12 4 L12 10 M12 4 L6 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {statusLabels[status]}
          </span>
        )}
      </div>

      <div className="flex-1">
        <div className="text-7xl font-bold text-neutral-900 mb-4">
          {score.toFixed(2)}
        </div>
        {description && (
          <p className="text-neutral-600 text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}