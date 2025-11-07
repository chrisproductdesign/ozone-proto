import { Settings, Plus, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

import { ButtonBaseUIWrapper } from '@/components/button/ButtonBaseUIWrapper';
import { ScoringConfigPopover } from './ScoringConfigPopover';
import { balancedConfig } from '@/constants/scoringDefaults';
import type { ScoringConfig } from '@/types/scoring';
import { VARIABLE_CONFIGS, getSeasonalityOptions, type VariableType } from '@/utils/scoringCalculations';

export interface ScoreControl {
  variableId: VariableType;
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export interface CompositeScoreCardProps {
  grade: 'A' | 'B' | 'C' | 'D';
  description: string;
  controls?: ScoreControl[];
  onSettingsClick?: () => void;
  onAddVariable?: (variableId: VariableType) => void;
  availableVariables?: VariableType[];
  className?: string;
  scoringConfig?: ScoringConfig;
  onScoringConfigChange?: (config: ScoringConfig) => void;
}

// Grade color variants
const gradeColors = {
  A: {
    gradient: 'from-[#02B948] to-[#009989]',
  },
  B: {
    gradient: 'from-[#2bb8aa] to-[#10a36d]',
  },
  C: {
    gradient: 'from-[#b8b028] to-[#78a010]',
  },
  D: {
    gradient: 'from-[#b88c28] to-[#a09910]',
  },
};

/**
 * CompositeScoreCard - Visually layered scorecard with gradient background
 *
 * Features:
 * - Three layered letter grades at different sizes and opacities
 * - Grade-specific gradient backgrounds (A/B/C/D)
 * - Settings button in top right
 * - Dynamic grade and description
 *
 * Design matches Figma spec exactly with precise positioning and layering
 *
 * @example
 * <CompositeScoreCard
 *   grade="A"
 *   description="Strong revenue predictability"
 *   onSettingsClick={() => console.log('Settings')}
 * />
 */
export const CompositeScoreCard: React.FC<CompositeScoreCardProps> = ({
  grade,
  description,
  controls,
  onSettingsClick,
  onAddVariable,
  availableVariables = [],
  className = '',
  scoringConfig = balancedConfig,
  onScoringConfigChange,
}) => {
  const colors = gradeColors[grade];
  const [currentScoringConfig, setCurrentScoringConfig] = useState<ScoringConfig>(scoringConfig);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);

  const handleScoringConfigSave = (config: ScoringConfig) => {
    setCurrentScoringConfig(config);
    onScoringConfigChange?.(config);
  };

  const handleAddVariable = (variableId: VariableType) => {
    onAddVariable?.(variableId);
    setAddDropdownOpen(false);
  };

  return (
    <div className={`w-full max-w-[1000px] ${className}`}>
      {/* Gradient top section */}
      <div className={`relative bg-gradient-to-r ${colors.gradient} ${controls ? 'rounded-t' : 'rounded'} overflow-clip flex flex-col justify-center items-start w-full`}>
      {/* Subtle texture artifacts */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-white/3 via-transparent to-transparent pointer-events-none" />

      {/* Content foreground - first child, relative positioned */}
      <div className="box-border flex gap-[24px] items-start px-[24px] py-[32px] w-full shrink-0">
        <div className="flex flex-1 gap-[24px] items-center min-w-0">
          {/* Foreground A */}
          <div className="flex flex-col h-[93px] w-[91px] justify-center leading-[0] text-[length:var(--text-grade-overlay)] font-black text-[rgba(255,255,255,0.8)] shrink-0" style={{ mixBlendMode: 'overlay' }}>
            <p className="leading-normal whitespace-pre-wrap">{grade}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-[8px] h-[38px] items-start justify-center shrink-0">
            <div className="flex flex-col justify-center leading-[0] text-[28px] font-semibold text-black/50 whitespace-nowrap shrink-0">
              <p className="leading-normal">{description}</p>
            </div>
          </div>
        </div>

        {/* Icon button - Scoring Config Popover */}
        <div className="flex flex-col items-center justify-center p-[5px] rounded-[100px] shrink-0">
          <ScoringConfigPopover
            config={currentScoringConfig}
            onSave={handleScoringConfigSave}
          />
        </div>
      </div>

      {/* Background A #2 - 10% opacity, 332px */}
      <div className="absolute left-[70px] top-[calc(50%+0.5px)] -translate-y-1/2 flex h-[154px] items-center justify-center overflow-clip gap-[10px]">
        <div className="flex flex-col justify-center leading-[0] text-[length:var(--text-grade-bg-sm)] font-black text-[rgba(255,255,255,0.1)] whitespace-nowrap shrink-0">
          <p className="leading-normal">{grade}</p>
        </div>
      </div>

      {/* Background A #3 - 8% opacity, 450px */}
      <div className="absolute left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] -translate-x-1/2 -translate-y-1/2 flex h-[154px] items-center justify-center overflow-clip gap-[10px]">
        <div className="flex flex-col justify-center leading-[0] text-[length:var(--text-grade-bg-lg)] font-black text-[rgba(255,255,255,0.08)] whitespace-nowrap shrink-0">
          <p className="leading-normal">{grade}</p>
        </div>
      </div>
      </div>

      {/* Controls section (bottom) */}
      {controls && controls.length > 0 && (
        <div className="bg-neutral-300 rounded-b px-6 pt-[42px] pb-4 w-full">
          <div className="flex flex-col gap-8">
            {controls.map((control, index) => {
              const config = VARIABLE_CONFIGS[control.variableId];
              const isDropdown = config.inputType === 'dropdown';

              // Calculate tier for progress bar
              let tierResult = { progress: 0, color: '#ef4444' };
              if (control.value) {
                try {
                  const numValue = isDropdown ? control.value : parseFloat(control.value);
                  if (!isNaN(numValue as number) || isDropdown) {
                    tierResult = config.calculateTier(numValue);
                  }
                } catch (e) {
                  // Invalid value, use defaults
                }
              }

              // Handle blur event to clamp value to min/max
              const handleBlur = () => {
                if (isDropdown) return;

                const numValue = parseFloat(control.value);

                // If invalid or empty, set to min
                if (!control.value || isNaN(numValue)) {
                  const defaultValue = config.min !== undefined ? config.min.toString() : '0';
                  control.onChange?.(defaultValue);
                  return;
                }

                // Clamp to min/max bounds
                const min = config.min !== undefined ? config.min : -Infinity;
                const max = config.max !== undefined ? config.max : Infinity;
                const clamped = Math.min(max, Math.max(min, numValue));

                // Update if value was clamped
                if (clamped !== numValue) {
                  control.onChange?.(clamped.toString());
                }
              };

              return (
                <div key={index} className="flex flex-col gap-1 w-full">
                  {/* Top row: Label + Input */}
                  <div className="flex items-end justify-between w-full">
                    <p className="text-sm font-semibold text-black/87">{control.label}</p>

                    {isDropdown ? (
                      <div className="relative">
                        <select
                          className="bg-black/6 rounded px-1.5 py-0.5 text-sm font-medium text-black/60 border-none outline-none text-center w-[100px] appearance-none pr-6 cursor-pointer"
                          value={control.value}
                          onChange={(e) => control.onChange?.(e.target.value)}
                        >
                          <option value="">Select...</option>
                          {getSeasonalityOptions().map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/60 pointer-events-none" />
                      </div>
                    ) : (
                      <div className="relative w-[75px]">
                        <input
                          type="number"
                          className="bg-black/6 rounded px-1.5 py-0.5 text-sm font-medium text-black/60 border-none outline-none text-center w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          style={{ MozAppearance: 'textfield' }}
                          value={control.value}
                          onChange={(e) => control.onChange?.(e.target.value)}
                          onBlur={handleBlur}
                          min={config.min}
                          max={config.max}
                          step={config.step}
                        />
                        {config.unit && (
                          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-sm font-medium text-black/60 pointer-events-none">
                            {config.unit}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div className="h-1 w-full bg-black/10 rounded-sm overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${tierResult.progress}%`,
                        backgroundColor: tierResult.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add button */}
          {onAddVariable && availableVariables.length > 0 && (
            <div className="flex justify-center mt-4 relative">
              <button
                onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                className="border border-black/25 rounded-[40px] px-4 py-0.5 flex items-center justify-center transition-colors hover:bg-black/5"
                aria-label="Add variable"
              >
                <Plus className="w-[18px] h-[18px] text-black/87" />
              </button>

              {/* Dropdown menu */}
              {addDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setAddDropdownOpen(false)}
                  />
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-300 border border-neutral-400 rounded-lg shadow-lg z-20 min-w-[200px] py-1">
                    {availableVariables.map((variableId) => {
                      const config = VARIABLE_CONFIGS[variableId];
                      return (
                        <button
                          key={variableId}
                          onClick={() => handleAddVariable(variableId)}
                          className="w-full px-4 py-2 text-left text-sm text-black/87 hover:bg-black/5 transition-colors"
                        >
                          {config.label}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
