/**
 * ScoringSpectrumSlider Component
 *
 * Visual spectrum slider for configuring scoring tier boundaries.
 * Features:
 * - Vertical gradient bar showing risk spectrum (red→yellow→green)
 * - Draggable handles to adjust tier boundaries
 * - Tier labels and values displayed outside the bar (to the right)
 * - Supports both ascending and descending ranges
 */

import React, { useState, useRef } from 'react';

import type { ScoringTier, InputType } from '@/types/scoring';

interface ScoringSpectrumSliderProps {
  tiers: ScoringTier[];
  inputType: InputType;
  unit?: string;
  direction?: 'ascending' | 'descending';
  onChange: (tiers: ScoringTier[]) => void;
  disabled?: boolean;
}

export const ScoringSpectrumSlider: React.FC<ScoringSpectrumSliderProps> = ({
  tiers,
  inputType,
  unit = '',
  direction = 'ascending',
  onChange,
  disabled = false,
}) => {
  const [draggedHandle, setDraggedHandle] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Calculate min and max values for the scale
  const getValueRange = (): { min: number; max: number } => {
    const allValues: number[] = [];
    tiers.forEach((tier) => {
      if (tier.min !== undefined) allValues.push(tier.min);
      if (tier.max !== undefined) allValues.push(tier.max);
    });

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);

    // Add some padding
    const padding = (max - min) * 0.1;
    return { min: min - padding, max: max + padding };
  };

  const { min: rangeMin, max: rangeMax } = getValueRange();

  // Convert value to Y position on bar (0 = top, 100 = bottom)
  const valueToPosition = (value: number): number => {
    if (direction === 'descending') {
      // For descending, higher values should be at top
      return ((rangeMax - value) / (rangeMax - rangeMin)) * 100;
    } else {
      // For ascending, lower values at top
      return ((value - rangeMin) / (rangeMax - rangeMin)) * 100;
    }
  };

  // Convert Y position back to value
  const positionToValue = (position: number): number => {
    if (direction === 'descending') {
      return rangeMax - (position / 100) * (rangeMax - rangeMin);
    } else {
      return rangeMin + (position / 100) * (rangeMax - rangeMin);
    }
  };

  // Format value for display
  const formatValue = (value: number | undefined): string => {
    if (value === undefined) return '';

    if (inputType === 'currency') {
      return `$${value.toLocaleString('en-US')}`;
    }

    return value.toString();
  };

  // Get color for tier
  const getTierColor = (color: string): string => {
    const colors = {
      red: '#ef4444',
      orange: '#f97316',
      yellow: '#eab308',
      green: '#22c55e',
    };
    return colors[color as keyof typeof colors] || '#737373';
  };

  // Build gradient stops from tiers
  const buildGradient = (): string => {
    // For ascending: red (bad) at bottom, green (good) at top in value terms
    // For descending: red (bad) at top, green (good) at bottom in value terms
    // The gradient should always show: bad color where bad values are, good color where good values are

    const stops = tiers.map((tier, index) => {
      const color = getTierColor(tier.color);

      // Calculate the position range for this tier
      let startPos = tier.min !== undefined ? valueToPosition(tier.min) : 0;
      let endPos = tier.max !== undefined ? valueToPosition(tier.max) : 100;

      // Use the middle of the tier's range for the color stop
      const midPos = (startPos + endPos) / 2;

      return `${color} ${midPos}%`;
    });

    return `linear-gradient(to bottom, ${stops.join(', ')})`;
  };

  // Handle mouse down on draggable handle
  const handleMouseDown = (tierIndex: number) => {
    if (disabled) return;
    setDraggedHandle(tierIndex);
  };

  // Handle mouse move while dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedHandle === null || !barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const position = Math.max(0, Math.min(100, (y / rect.height) * 100));
    const value = positionToValue(position);

    // Update the tier boundary
    const newTiers = [...tiers];
    const tier = newTiers[draggedHandle];

    // Update max value of current tier and min value of next tier
    if (tier.max !== undefined) {
      tier.max = Math.round(value * 100) / 100; // Round to 2 decimals

      // Update next tier's min
      if (draggedHandle < newTiers.length - 1) {
        const nextTier = newTiers[draggedHandle + 1];
        if (nextTier.min !== undefined) {
          nextTier.min = Math.round(value * 100) / 100;
        }
      }
    }

    onChange(newTiers);
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setDraggedHandle(null);
  };

  // Handle boundary value change from input
  const handleBoundaryInput = (tierIndex: number, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    const newTiers = [...tiers];
    const tier = newTiers[tierIndex];

    if (tier.max !== undefined) {
      tier.max = numValue;

      // Update next tier's min
      if (tierIndex < newTiers.length - 1) {
        const nextTier = newTiers[tierIndex + 1];
        if (nextTier.min !== undefined) {
          nextTier.min = numValue;
        }
      }
    }

    onChange(newTiers);
  };

  return (
    <div
      className="flex gap-6 py-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Vertical Spectrum Bar */}
      <div className="relative flex-shrink-0">
        <div
          ref={barRef}
          className="w-12 h-96 rounded-lg border-2 border-neutral-400 relative"
          style={{ background: buildGradient() }}
        >
          {/* Draggable Handles */}
          {tiers.map((tier, index) => {
            if (tier.max === undefined) return null;

            const position = valueToPosition(tier.max);

            return (
              <div
                key={index}
                className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-3 border-white shadow-lg cursor-move transition-transform ${
                  draggedHandle === index ? 'scale-125' : 'hover:scale-110'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                style={{
                  top: `${position}%`,
                  transform: `translate(-50%, -50%)`,
                  backgroundColor: getTierColor(tier.color),
                }}
                onMouseDown={() => handleMouseDown(index)}
              />
            );
          })}
        </div>
      </div>

      {/* Tier Information Panel - Flex column with equal spacing */}
      <div className="flex-1 flex flex-col justify-between h-96">
        {tiers.map((tier, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Tier Label */}
            <div className="w-20 text-xs font-medium text-neutral-900">
              {tier.label}
            </div>

            {/* Boundary Input (editable max value) */}
            {tier.max !== undefined ? (
              <input
                type="number"
                value={tier.max}
                onChange={(e) => handleBoundaryInput(index, e.target.value)}
                disabled={disabled}
                className="w-16 px-2 py-1 text-xs border border-neutral-400 rounded bg-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:opacity-50"
                step="0.01"
              />
            ) : tier.min !== undefined ? (
              <div className="w-16 px-2 py-1 text-xs text-neutral-600">
                {formatValue(tier.min)}+
              </div>
            ) : (
              <div className="w-16 px-2 py-1 text-xs text-neutral-600">-</div>
            )}

            {/* Unit */}
            {unit && <span className="text-xs text-neutral-600">{unit}</span>}

            {/* Points */}
            <span className="text-xs text-neutral-600 ml-auto">
              {tier.points} {tier.points === 1 ? 'pt' : 'pts'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
