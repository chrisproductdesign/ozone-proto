/**
 * ScoringTierInput Component
 *
 * Individual row for configuring a scoring tier threshold.
 * Displays tier number, range inputs, point value, and color indicator.
 *
 * Features:
 * - Controlled inputs with validation
 * - Graceful handling of empty/invalid values
 * - Restores last valid value on blur
 * - Inline error display
 */

import React, { useState, useEffect } from 'react';

import type { InputType, ScoringTier } from '@/types/scoring';

interface ScoringTierInputProps {
  tier: ScoringTier;
  inputType: InputType;
  unit?: string;
  onChange: (tier: ScoringTier) => void;
  disabled?: boolean;
  error?: string;
}

export const ScoringTierInput: React.FC<ScoringTierInputProps> = ({
  tier,
  inputType,
  unit = '',
  onChange,
  disabled = false,
  error,
}) => {
  // Local state for display values (controlled inputs)
  const [minDisplay, setMinDisplay] = useState('');
  const [maxDisplay, setMaxDisplay] = useState('');
  const [minError, setMinError] = useState<string | null>(null);
  const [maxError, setMaxError] = useState<string | null>(null);

  // Format value for display
  const formatValue = (value: number | undefined): string => {
    if (value === undefined) return '';

    if (inputType === 'currency') {
      return value.toLocaleString('en-US');
    }

    if (inputType === 'percentage') {
      return value.toString();
    }

    if (inputType === 'duration') {
      return value.toString();
    }

    return value.toString();
  };

  // Parse user input to number
  const parseValue = (str: string): number | undefined => {
    if (str === '') return undefined;

    // Remove commas for currency
    const cleaned = str.replace(/,/g, '');
    const num = Number(cleaned);

    return isNaN(num) ? undefined : num;
  };

  // Initialize display values when tier changes
  useEffect(() => {
    setMinDisplay(formatValue(tier.min));
    setMaxDisplay(formatValue(tier.max));
  }, [tier.min, tier.max]);

  // Handle min value change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setMinDisplay(str);

    // Allow empty for editing
    if (str === '') {
      setMinError(null);
      return;
    }

    const num = parseValue(str);

    if (num === undefined) {
      setMinError('Invalid number');
      return;
    }

    // Validate: min must be less than max
    if (tier.max !== undefined && num >= tier.max) {
      setMinError('Must be less than max');
      return;
    }

    setMinError(null);
    onChange({ ...tier, min: num });
  };

  // Handle max value change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setMaxDisplay(str);

    // Allow empty for editing
    if (str === '') {
      setMaxError(null);
      return;
    }

    const num = parseValue(str);

    if (num === undefined) {
      setMaxError('Invalid number');
      return;
    }

    // Validate: max must be greater than min
    if (tier.min !== undefined && num <= tier.min) {
      setMaxError('Must be greater than min');
      return;
    }

    setMaxError(null);
    onChange({ ...tier, max: num });
  };

  // Restore last valid value on blur if empty
  const handleMinBlur = () => {
    if (minDisplay === '' && tier.min !== undefined) {
      setMinDisplay(formatValue(tier.min));
      setMinError(null);
    }
  };

  const handleMaxBlur = () => {
    if (maxDisplay === '' && tier.max !== undefined) {
      setMaxDisplay(formatValue(tier.max));
      setMaxError(null);
    }
  };

  // Color indicator classes
  const colorClasses = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };

  // Determine if there are any errors
  const hasError = !!minError || !!maxError || !!error;

  // Point value color coding (red=low risk/bad, green=high quality/good)
  const getPointColor = (points: number): string => {
    if (points === 0 || points === 1) return 'text-red-700 font-semibold';
    if (points === 2 || points === 3) return 'text-orange-700 font-medium';
    return 'text-green-700 font-semibold'; // 4-5 points
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 py-2">
        {/* Tier Number */}
        <div className="w-8 text-sm font-medium text-neutral-700">
          {tier.tier}
        </div>

        {/* Range Inputs */}
        <div className="flex-1 flex items-center gap-2">
          {/* Min Value */}
          {tier.min !== undefined ? (
            <div className="flex items-center gap-1">
              {unit && inputType === 'currency' && (
                <span className="text-xs text-neutral-600">{unit}</span>
              )}
              <input
                type="text"
                value={minDisplay}
                onChange={handleMinChange}
                onBlur={handleMinBlur}
                disabled={disabled}
                className={`w-20 px-2 py-1 text-xs border rounded bg-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 disabled:opacity-50 ${
                  minError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-neutral-400 focus:ring-purple-700'
                }`}
              />
              {unit && inputType !== 'currency' && (
                <span className="text-xs text-neutral-600">{unit}</span>
              )}
            </div>
          ) : (
            <span className="text-xs text-neutral-600">{'<'}</span>
          )}

          <span className="text-xs text-neutral-600">–</span>

          {/* Max Value */}
          {tier.max !== undefined ? (
            <div className="flex items-center gap-1">
              {unit && inputType === 'currency' && (
                <span className="text-xs text-neutral-600">{unit}</span>
              )}
              <input
                type="text"
                value={maxDisplay}
                onChange={handleMaxChange}
                onBlur={handleMaxBlur}
                disabled={disabled}
                className={`w-20 px-2 py-1 text-xs border rounded bg-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 disabled:opacity-50 ${
                  maxError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-neutral-400 focus:ring-purple-700'
                }`}
              />
              {unit && inputType !== 'currency' && (
                <span className="text-xs text-neutral-600">{unit}</span>
              )}
            </div>
          ) : (
            <span className="text-xs text-neutral-600">+</span>
          )}
        </div>

        {/* Points */}
        <div className={`w-16 text-sm text-center ${getPointColor(tier.points)}`}>
          {tier.points} {tier.points === 1 ? 'pt' : 'pts'}
        </div>

        {/* Label */}
        <div className="w-24 text-xs text-neutral-700">{tier.label}</div>

        {/* Color Indicator */}
        <div className={`w-3 h-3 rounded-full ${colorClasses[tier.color]}`} />
      </div>

      {/* Error Messages */}
      {hasError && (
        <div className="flex items-center gap-2 ml-11 text-xs text-red-600">
          {minError && <span>Min: {minError}</span>}
          {maxError && <span>Max: {maxError}</span>}
          {error && <span>{error}</span>}
        </div>
      )}
    </div>
  );
};
