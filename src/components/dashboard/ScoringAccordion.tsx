/**
 * ScoringAccordion Component
 *
 * Accordion layout for scoring configuration.
 * Each variable gets its own collapsible section with spectrum slider.
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { ScoringSpectrumSlider } from './ScoringSpectrumSlider';
import { ScoringCategoryInput } from './ScoringCategoryInput';
import type { VariableConfig, ScoringTier, CategoryOption } from '@/types/scoring';

interface ScoringAccordionProps {
  variable: VariableConfig;
  isOpen: boolean;
  onToggle: () => void;
  onTierChange?: (tiers: ScoringTier[]) => void;
  onCategoryChange?: (categories: CategoryOption[]) => void;
  onReset: () => void;
}

export const ScoringAccordion: React.FC<ScoringAccordionProps> = ({
  variable,
  isOpen,
  onToggle,
  onTierChange,
  onCategoryChange,
  onReset,
}) => {
  // Handle tier updates from spectrum slider
  const handleTierUpdate = (updatedTiers: ScoringTier[]) => {
    if (onTierChange) {
      onTierChange(updatedTiers);
    }
  };

  // Handle category updates
  const handleCategoryUpdate = (index: number, updatedCategory: CategoryOption) => {
    if (onCategoryChange && variable.categories) {
      const updatedCategories = [...variable.categories];
      updatedCategories[index] = updatedCategory;
      onCategoryChange(updatedCategories);
    }
  };

  return (
    <div className="border-b border-neutral-400">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-neutral-300/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h4 className="text-sm font-medium text-neutral-900">{variable.name}</h4>
          {/* Inverse badge for descending variables */}
          {variable.type === 'numeric' && variable.direction === 'descending' && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded">
              Inverse
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-neutral-600 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-5 pb-4">
          {/* Reset Button */}
          <div className="flex justify-end mb-3">
            <button
              onClick={onReset}
              className="px-3 py-1 text-xs font-medium text-purple-700 hover:text-purple-800 transition-colors"
            >
              Reset to Default
            </button>
          </div>

          {/* Content: Spectrum Slider or Category Inputs */}
          {variable.type === 'numeric' && variable.tiers ? (
            <>
              <ScoringSpectrumSlider
                tiers={variable.tiers}
                inputType={variable.inputType!}
                unit={variable.unit}
                direction={variable.direction}
                onChange={handleTierUpdate}
              />

              {/* Helper Text */}
              <div className="mt-4 space-y-2">
                <p className="text-xs text-neutral-600">
                  {variable.direction === 'descending'
                    ? 'Inverse variable: Higher values = worse scores (lower points). Drag handles to adjust thresholds.'
                    : 'Standard variable: Higher values = better scores (higher points). Drag handles to adjust thresholds.'}
                </p>
                <p className="text-xs text-neutral-500 italic">
                  Drag the circular handles on the spectrum bar to adjust tier boundaries.
                </p>
              </div>
            </>
          ) : variable.type === 'categorical' && variable.categories ? (
            <>
              <div className="space-y-1">
                {variable.categories.map((category, index) => (
                  <ScoringCategoryInput
                    key={index}
                    category={category}
                    onChange={(updatedCategory) =>
                      handleCategoryUpdate(index, updatedCategory)
                    }
                  />
                ))}
              </div>

              {/* Helper Text */}
              <p className="mt-4 text-xs text-neutral-600">
                Configure point values for each category level based on risk assessment.
              </p>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};
