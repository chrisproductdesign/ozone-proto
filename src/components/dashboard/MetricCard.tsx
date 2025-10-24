import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { BaseUISlider } from '@/components/form/BaseUISlider';
import { ButtonBaseUIWrapper } from '@/components/button/ButtonBaseUIWrapper';

export interface MetricCardProps {
  icon?: React.ReactNode;
  label: string;
  displayValue: string;
  sliderMin: number;
  sliderMax: number;
  sliderValue: number;
  sliderStep?: number;
  sliderMinLabel?: string;
  sliderMaxLabel?: string;
  onSliderChange?: (value: number) => void;
  onValueChange?: (value: number) => void;
  showRecalculate?: boolean;
  onRecalculate?: () => void;
  noBorder?: boolean;
  noRounded?: boolean;
  className?: string;
}

/**
 * MetricCard - Unified card component for dashboard metrics
 *
 * Features:
 * - Label with optional recalculate button
 * - Large value display
 * - Interactive slider with min/max labels
 * - Consistent padding and spacing
 *
 * @example
 * <MetricCard
 *   label="TERM"
 *   displayValue="180 days"
 *   sliderMin={30}
 *   sliderMax={180}
 *   sliderValue={180}
 *   onSliderChange={(val) => setTerm(val)}
 * />
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  displayValue,
  sliderMin,
  sliderMax,
  sliderValue,
  sliderStep,
  sliderMinLabel,
  sliderMaxLabel,
  onSliderChange,
  onValueChange,
  showRecalculate = false,
  onRecalculate,
  noBorder = false,
  noRounded = false,
  className = '',
}) => {
  const borderClass = noBorder ? '' : 'border border-black/10';
  const roundedClass = noRounded ? '' : 'rounded-lg';

  // Local state for input value
  const [inputValue, setInputValue] = useState(displayValue);

  // Sync input with displayValue when it changes externally (from slider)
  useEffect(() => {
    setInputValue(displayValue);
  }, [displayValue]);

  // Parse formatted value to number
  const parseValue = (formatted: string): number | null => {
    // Remove "$", commas, "days", and other text
    const cleaned = formatted.replace(/[$,]/g, '').replace(/\s*days?/gi, '').trim();
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? null : parsed;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle input blur - validate and update
  const handleInputBlur = () => {
    const parsed = parseValue(inputValue);

    if (parsed !== null) {
      // Clamp value to min/max
      const clamped = Math.max(sliderMin, Math.min(sliderMax, parsed));

      // Round to step if provided
      const rounded = sliderStep
        ? Math.round(clamped / sliderStep) * sliderStep
        : clamped;

      // Update parent
      if (onValueChange) {
        onValueChange(rounded);
      }
      if (onSliderChange) {
        onSliderChange(rounded);
      }
    } else {
      // Invalid input - revert to displayValue
      setInputValue(displayValue);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  // Select all on focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className={`bg-base py-7 px-6 ${borderClass} ${roundedClass} ${className}`}>
      {/* Label row with optional recalculate button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-neutral-600 uppercase">
          {icon && <span className="flex items-center">{icon}</span>}
          <span>{label}</span>
        </div>
        {showRecalculate && (
          <ButtonBaseUIWrapper
            variant="ghost"
            size="icon"
            onClick={onRecalculate}
            aria-label="Recalculate"
          >
            <RefreshCw className="w-4 h-4" />
          </ButtonBaseUIWrapper>
        )}
      </div>

      {/* Editable value input */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className="text-3xl font-bold mb-4 w-full bg-transparent border-0 outline-none
                   hover:bg-neutral-50 hover:px-2 hover:rounded
                   focus:bg-neutral-100 focus:px-2 focus:rounded
                   transition-all duration-150"
      />

      {/* Slider */}
      <div className="space-y-2">
        <BaseUISlider
          value={sliderValue}
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          onChange={onSliderChange}
          className="w-full"
        />

        {/* Min/Max labels */}
        <div className="flex justify-between text-xs text-neutral-500">
          <span>{sliderMinLabel || sliderMin}</span>
          <span>{sliderMaxLabel || sliderMax}</span>
        </div>
      </div>
    </div>
  );
}