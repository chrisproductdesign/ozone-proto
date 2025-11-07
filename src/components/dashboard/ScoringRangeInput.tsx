/**
 * ScoringRangeInput Component
 *
 * Minimal range input for scoring tier configuration.
 * Pattern: Tier label + [min] to [max] + points
 */

import React from 'react';

import type { ScoringTier } from '@/types/scoring';

interface ScoringRangeInputProps {
  tier: ScoringTier;
  index: number;
  isLastTier: boolean;
  unit?: string;
  onChange: (tier: ScoringTier) => void;
  disabled?: boolean;
}

export const ScoringRangeInput: React.FC<ScoringRangeInputProps> = ({
  tier,
  index,
  isLastTier,
  unit = '',
  onChange,
  disabled = false,
}) => {
  const handleMinChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onChange({ ...tier, min: numValue });
    }
  };

  const handleMaxChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onChange({ ...tier, max: numValue });
    }
  };

  const formatValue = (value: number | undefined): string => {
    if (value === undefined) return '';
    return value.toString();
  };

  return (
    <div className="flex items-center gap-3 py-2">
      {/* Tier Label */}
      <div className="text-sm font-medium text-neutral-700 w-16">
        Tier {index + 1}
      </div>

      {/* Min Input */}
      <input
        type="number"
        value={formatValue(tier.min)}
        onChange={(e) => handleMinChange(e.target.value)}
        disabled={disabled}
        className="w-20 px-2 py-1 text-sm text-center border border-neutral-400 rounded bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-purple-700 disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{ MozAppearance: 'textfield' }}
      />

      {/* "to" or "+" */}
      {isLastTier ? (
        <div className="text-sm text-neutral-600 w-8 text-center">+</div>
      ) : (
        <>
          <div className="text-sm text-neutral-600 w-8 text-center">to</div>

          {/* Max Input */}
          <input
            type="number"
            value={formatValue(tier.max)}
            onChange={(e) => handleMaxChange(e.target.value)}
            disabled={disabled}
            className="w-20 px-2 py-1 text-sm text-center border border-neutral-400 rounded bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-purple-700 disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ MozAppearance: 'textfield' }}
          />
        </>
      )}

      {/* Unit */}
      {unit && (
        <div className="text-sm text-neutral-600 w-12">
          {unit}
        </div>
      )}

      {/* Points */}
      <div className="text-sm text-neutral-600 ml-auto">
        {tier.points} {tier.points === 1 ? 'pt' : 'pts'}
      </div>
    </div>
  );
};
