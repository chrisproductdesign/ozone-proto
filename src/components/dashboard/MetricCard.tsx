import React from 'react';
import { RefreshCw } from 'lucide-react';
import { BaseUISlider } from '@/components/form/BaseUISlider';
import { ButtonBaseUIWrapper } from '@/components/button/ButtonBaseUIWrapper';

export interface MetricCardProps {
  label: string;
  displayValue: string;
  sliderMin: number;
  sliderMax: number;
  sliderValue: number;
  sliderStep?: number;
  sliderMinLabel?: string;
  sliderMaxLabel?: string;
  onSliderChange?: (value: number) => void;
  showRecalculate?: boolean;
  onRecalculate?: () => void;
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
  label,
  displayValue,
  sliderMin,
  sliderMax,
  sliderValue,
  sliderStep,
  sliderMinLabel,
  sliderMaxLabel,
  onSliderChange,
  showRecalculate = false,
  onRecalculate,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg py-7 px-6 border border-gray-200 ${className}`}>
      {/* Label row with optional recalculate button */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-600">● {label}</div>
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

      {/* Large value display */}
      <div className="text-3xl font-bold mb-4">{displayValue}</div>

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
        <div className="flex justify-between text-xs text-gray-500">
          <span>{sliderMinLabel || sliderMin}</span>
          <span>{sliderMaxLabel || sliderMax}</span>
        </div>
      </div>
    </div>
  );
}