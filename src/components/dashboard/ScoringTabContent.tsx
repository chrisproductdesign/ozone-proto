/**
 * ScoringTabContent Component
 *
 * Content renderer for scoring configuration tabs.
 * Shows horizontal slider for numeric variables or category inputs for categorical variables.
 */

import React from 'react';

import { ScoringHorizontalSlider } from './ScoringHorizontalSlider';
import { ScoringCategoryInput } from './ScoringCategoryInput';
import type { VariableConfig, ScoringTier, CategoryOption } from '@/types/scoring';

interface ScoringTabContentProps {
  variable: VariableConfig;
  onTierChange?: (tiers: ScoringTier[]) => void;
  onCategoryChange?: (categories: CategoryOption[]) => void;
  onReset: () => void;
}

export const ScoringTabContent: React.FC<ScoringTabContentProps> = ({
  variable,
  onTierChange,
  onCategoryChange,
  onReset,
}) => {
  // Handle tier updates from horizontal slider
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
    <div className="px-5 py-4">
      {/* Header with Reset Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h4 className="text-sm font-medium text-neutral-900">{variable.name}</h4>
          {/* Inverse badge for descending variables */}
          {variable.type === 'numeric' && variable.direction === 'descending' && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded">
              Inverse
            </span>
          )}
        </div>
        <button
          onClick={onReset}
          className="px-3 py-1 text-xs font-medium text-purple-700 hover:text-purple-800 transition-colors"
        >
          Reset to Default
        </button>
      </div>

      {/* Content: Horizontal Slider or Category Inputs */}
      {variable.type === 'numeric' && variable.tiers ? (
        <ScoringHorizontalSlider
          tiers={variable.tiers}
          inputType={variable.inputType!}
          unit={variable.unit}
          direction={variable.direction}
          onChange={handleTierUpdate}
        />
      ) : variable.type === 'categorical' && variable.categories ? (
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
      ) : null}
    </div>
  );
};
