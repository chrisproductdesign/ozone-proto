import { Lightbulb } from 'lucide-react';
import React, { forwardRef } from 'react';

import type { InsightType } from './InsightList';

export interface InsightIconBadgeProps {
  count: number;
  highestPriority: InsightType;
  isOpen: boolean;
  onClick: () => void;
}

/**
 * InsightIconBadge - Compact icon with dot badge and count
 *
 * Displays a lightbulb icon with:
 * - Colored dot badge indicating highest priority insight type
 * - Count badge showing number of insights
 * - Hover effects for interactivity
 * - Click handler to toggle insight panel
 *
 * @example
 * <InsightIconBadge
 *   count={2}
 *   highestPriority="warning"
 *   isOpen={false}
 *   onClick={() => setIsOpen(true)}
 * />
 */
export const InsightIconBadge = forwardRef<HTMLButtonElement, InsightIconBadgeProps>(
  ({ count, highestPriority, isOpen, onClick }, ref) => {
    // Map insight types to dot colors
    const dotColors: Record<InsightType, string> = {
      positive: 'bg-green-600',
      warning: 'bg-amber-500',
      negative: 'bg-red-600',
      neutral: 'bg-blue-600',
    };

    const dotColor = dotColors[highestPriority];

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`
          relative inline-flex items-center justify-center
          w-8 h-8 rounded-lg
          transition-all duration-150 ease-out
          hover:bg-black/5 hover:scale-105
          ${isOpen ? 'bg-black/10' : ''}
        `}
        aria-label={`${count} insight${count !== 1 ? 's' : ''} available`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Lightbulb icon */}
        <Lightbulb className="w-5 h-5 text-neutral-700" />

        {/* Colored dot badge (top-right) */}
        <span
          className={`
            absolute top-0.5 right-0.5
            w-2 h-2 rounded-full
            ${dotColor}
            ring-2 ring-white
          `}
          aria-hidden="true"
        />

        {/* Count badge (bottom-right) */}
        {count > 1 && (
          <span
            className={`
              absolute -bottom-0.5 -right-0.5
              min-w-[14px] h-[14px]
              flex items-center justify-center
              px-0.5
              text-[10px] font-bold leading-none
              bg-white rounded-full
              ${
                highestPriority === 'positive'
                  ? 'text-green-700 ring-1 ring-green-600'
                  : highestPriority === 'warning'
                  ? 'text-amber-700 ring-1 ring-amber-500'
                  : highestPriority === 'negative'
                  ? 'text-red-700 ring-1 ring-red-600'
                  : 'text-blue-700 ring-1 ring-blue-600'
              }
            `}
            aria-hidden="true"
          >
            {count}
          </span>
        )}
      </button>
    );
  }
);

InsightIconBadge.displayName = 'InsightIconBadge';
