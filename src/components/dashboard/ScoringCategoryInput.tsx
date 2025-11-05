/**
 * ScoringCategoryInput Component
 *
 * Individual row for configuring a categorical scoring option.
 * Used for variables like Seasonality that don't have numeric ranges.
 *
 * Displays: category label, point value dropdown, color indicator.
 */

import React from 'react';

import type { CategoryOption } from '@/types/scoring';

interface ScoringCategoryInputProps {
  category: CategoryOption;
  onChange: (category: CategoryOption) => void;
  disabled?: boolean;
}

export const ScoringCategoryInput: React.FC<ScoringCategoryInputProps> = ({
  category,
  onChange,
  disabled = false,
}) => {
  // Color indicator classes
  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };

  // Point value color coding (red=low risk/bad, green=high quality/good)
  const getPointColor = (points: number): string => {
    if (points === 0 || points === 1) return 'text-red-700 font-semibold';
    if (points === 2 || points === 3) return 'text-orange-700 font-medium';
    return 'text-green-700 font-semibold'; // 4-5 points
  };

  // Handle point value change
  const handlePointsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPoints = Number(e.target.value);
    onChange({ ...category, points: newPoints });
  };

  return (
    <div className="flex items-center gap-3 py-2">
      {/* Category Label */}
      <div className="flex-1 text-sm text-neutral-900 capitalize">
        {category.label}
      </div>

      {/* Arrow indicator */}
      <span className="text-neutral-600 text-sm">→</span>

      {/* Points Dropdown */}
      <div className="flex items-center gap-2">
        <select
          value={category.points}
          onChange={handlePointsChange}
          disabled={disabled}
          className={`px-3 py-1.5 text-xs border border-neutral-400 rounded bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:opacity-50 ${getPointColor(category.points)}`}
        >
          <option value={0}>0 pts</option>
          <option value={1}>1 pt</option>
          <option value={2}>2 pts</option>
          <option value={3}>3 pts</option>
          <option value={4}>4 pts</option>
          <option value={5}>5 pts</option>
        </select>
      </div>

      {/* Color Indicator */}
      <div className={`w-3 h-3 rounded-full ${colorClasses[category.color]}`} />
    </div>
  );
};
