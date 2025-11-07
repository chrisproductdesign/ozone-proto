/**
 * ScoringHorizontalSlider Component
 *
 * Horizontal spectrum slider for configuring scoring tier boundaries.
 * Features:
 * - Horizontal gradient bar showing risk spectrum (red→yellow→green)
 * - Draggable dots to adjust tier boundaries
 * - Values displayed below dots, click to edit inline
 * - Supports both ascending and descending ranges
 */

import React, { useState, useRef } from 'react';

import type { ScoringTier, InputType } from '@/types/scoring';

interface ScoringHorizontalSliderProps {
  tiers: ScoringTier[];
  inputType: InputType;
  unit?: string;
  direction?: 'ascending' | 'descending';
  onChange: (tiers: ScoringTier[]) => void;
  disabled?: boolean;
}

export const ScoringHorizontalSlider: React.FC<ScoringHorizontalSliderProps> = ({
  tiers,
  inputType,
  unit = '',
  direction = 'ascending',
  onChange,
  disabled = false,
}) => {
  const [draggedHandle, setDraggedHandle] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
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

  // Convert value to X position on bar (0 = left, 100 = right)
  const valueToPosition = (value: number): number => {
    if (direction === 'descending') {
      // For descending, higher values should be at left (bad = left, good = right)
      return ((rangeMax - value) / (rangeMax - rangeMin)) * 100;
    } else {
      // For ascending, lower values at left (bad = left, good = right)
      return ((value - rangeMin) / (rangeMax - rangeMin)) * 100;
    }
  };

  // Convert X position back to value
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
    const stops = tiers.map((tier) => {
      const color = getTierColor(tier.color);

      // Calculate the position range for this tier
      let startPos = tier.min !== undefined ? valueToPosition(tier.min) : 0;
      let endPos = tier.max !== undefined ? valueToPosition(tier.max) : 100;

      // Use the middle of the tier's range for the color stop
      const midPos = (startPos + endPos) / 2;

      return `${color} ${midPos}%`;
    });

    return `linear-gradient(to right, ${stops.join(', ')})`;
  };

  // Get gradient color at a specific position (0-100)
  const getGradientColorAtPosition = (position: number): string => {
    // Find which tiers this position falls between
    const colorStops = tiers.map((tier) => {
      const color = getTierColor(tier.color);
      let startPos = tier.min !== undefined ? valueToPosition(tier.min) : 0;
      let endPos = tier.max !== undefined ? valueToPosition(tier.max) : 100;
      const midPos = (startPos + endPos) / 2;
      return { position: midPos, color };
    });

    // Find the two stops this position is between
    for (let i = 0; i < colorStops.length - 1; i++) {
      const current = colorStops[i];
      const next = colorStops[i + 1];

      if (position >= current.position && position <= next.position) {
        // Interpolate between current and next color
        const range = next.position - current.position;
        const factor = range > 0 ? (position - current.position) / range : 0;
        return interpolateColor(current.color, next.color, factor);
      }
    }

    // If position is before first stop or after last stop, return nearest color
    if (position <= colorStops[0].position) return colorStops[0].color;
    return colorStops[colorStops.length - 1].color;
  };

  // Interpolate between two hex colors
  const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);

    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Handle click on dot (open input if not dragging)
  const handleDotClick = (tierIndex: number) => {
    if (disabled) return;
    // Toggle editing - close if already open, open if closed
    setEditingIndex(editingIndex === tierIndex ? null : tierIndex);
  };

  // Handle mouse down on draggable dot
  const handleMouseDown = (tierIndex: number) => {
    if (disabled) return;
    setDraggedHandle(tierIndex);
    setEditingIndex(null); // Close any open input
  };

  // Handle mouse move while dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedHandle === null || !barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    let value = positionToValue(position);

    // Constrain value so dots can't cross each other
    const newTiers = [...tiers];

    // Get bounds from adjacent tiers
    let minBound = -Infinity;
    let maxBound = Infinity;

    // Previous tier's max is our minimum bound
    if (draggedHandle > 0 && newTiers[draggedHandle - 1].max !== undefined) {
      minBound = newTiers[draggedHandle - 1].max! + 0.01;
    }

    // Next tier's max is our maximum bound (since we're dragging the current tier's max)
    if (draggedHandle < newTiers.length - 1 && newTiers[draggedHandle + 1].max !== undefined) {
      maxBound = newTiers[draggedHandle + 1].max! - 0.01;
    }

    // Clamp value to bounds
    value = Math.max(minBound, Math.min(maxBound, value));

    // Update the tier boundary
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

  // Handle input blur
  const handleInputBlur = () => {
    setEditingIndex(null);
  };

  // Handle input key press
  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditingIndex(null);
    }
  };

  return (
    <div
      className="py-6"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Horizontal Spectrum Bar */}
      <div className="relative">
        <div
          ref={barRef}
          className="h-4 w-full rounded-full border-2 border-neutral-400 relative"
          style={{ background: buildGradient() }}
        >
          {/* Draggable Dots */}
          {tiers.map((tier, index) => {
            if (tier.max === undefined) return null;

            const position = valueToPosition(tier.max);

            return (
              <div
                key={index}
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-3 border-white shadow-lg cursor-pointer transition-transform ${
                  draggedHandle === index ? 'scale-125' : 'hover:scale-110'
                } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                style={{
                  left: `${position}%`,
                  transform: `translate(-50%, -50%)`,
                  backgroundColor: getGradientColorAtPosition(position),
                }}
                onClick={() => handleDotClick(index)}
                onMouseDown={() => handleMouseDown(index)}
              />
            );
          })}
        </div>

        {/* Value Labels Below Bar */}
        <div className="relative h-24 mt-2">
          {tiers.map((tier, index) => {
            if (tier.max === undefined) return null;

            const position = valueToPosition(tier.max);
            const isEditing = editingIndex === index;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${position}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {isEditing ? (
                  <div className="relative flex flex-col items-center">
                    {/* Connecting Line */}
                    <div className="w-px h-4 bg-neutral-400 mb-1" />

                    {/* Min-Max Input Group */}
                    <div className="flex gap-2 items-center px-2 py-1.5 bg-neutral-300 border border-neutral-400 rounded shadow-sm">
                      <div className="flex flex-col items-center gap-1">
                        <label className="text-[10px] text-neutral-600 font-medium">Min</label>
                        <input
                          type="number"
                          value={tier.min !== undefined ? tier.min : ''}
                          onChange={(e) => {
                            const numValue = parseFloat(e.target.value);
                            if (!isNaN(numValue)) {
                              const newTiers = [...tiers];
                              newTiers[index].min = numValue;
                              // Update previous tier's max if exists
                              if (index > 0 && newTiers[index - 1].max !== undefined) {
                                newTiers[index - 1].max = numValue;
                              }
                              onChange(newTiers);
                            }
                          }}
                          disabled={disabled}
                          className="w-16 px-1.5 py-0.5 text-xs border border-neutral-400 rounded bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-purple-700 disabled:opacity-50 text-center"
                          step="0.01"
                        />
                      </div>
                      <div className="text-xs text-neutral-500">—</div>
                      <div className="flex flex-col items-center gap-1">
                        <label className="text-[10px] text-neutral-600 font-medium">Max</label>
                        <input
                          type="number"
                          value={tier.max}
                          onChange={(e) => handleBoundaryInput(index, e.target.value)}
                          onBlur={handleInputBlur}
                          onKeyPress={handleInputKeyPress}
                          autoFocus
                          disabled={disabled}
                          className="w-16 px-1.5 py-0.5 text-xs border border-neutral-400 rounded bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-purple-700 disabled:opacity-50 text-center"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Final tier (open-ended max) */}
          {tiers.length > 0 && tiers[tiers.length - 1].min !== undefined && (
            <div
              className="absolute"
              style={{
                left: '100%',
                transform: 'translateX(-50%)',
              }}
            >
              <div className="text-xs text-neutral-600 px-2 py-1">
                {formatValue(tiers[tiers.length - 1].min)}+
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
