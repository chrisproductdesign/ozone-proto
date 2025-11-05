/**
 * ScoringMinimalTabContent Component
 *
 * Clean, minimal layout for configuring scoring tiers with range inputs.
 * Inspired by 1Password's settings UI aesthetic.
 */

import React from 'react';

import { ScoringRangeInput } from './ScoringRangeInput';
import type {
  VariableConfig,
  ScoringTier,
  CategoryOption,
} from '@/types/scoring';

interface ScoringMinimalTabContentProps {
  variable: VariableConfig;
  onTierChange: (tiers: ScoringTier[]) => void;
  onCategoryChange: (categories: CategoryOption[]) => void;
  onReset: () => void;
}

export const ScoringMinimalTabContent: React.FC<ScoringMinimalTabContentProps> = ({
  variable,
  onTierChange,
  onCategoryChange,
  onReset,
}) => {
  const handleTierUpdate = (index: number, updatedTier: ScoringTier) => {
    if (variable.type !== 'numeric' || !variable.tiers) return;

    const newTiers = [...variable.tiers];
    newTiers[index] = updatedTier;

    // Update adjacent tiers to maintain continuity
    // When tier N's max changes, tier N+1's min should match
    if (index < newTiers.length - 1 && updatedTier.max !== undefined) {
      newTiers[index + 1].min = updatedTier.max;
    }

    // When tier N's min changes, tier N-1's max should match
    if (index > 0 && updatedTier.min !== undefined) {
      newTiers[index - 1].max = updatedTier.min;
    }

    onTierChange(newTiers);
  };

  const handleCategoryUpdate = (index: number, points: number) => {
    if (variable.type !== 'categorical' || !variable.categories) return;

    const newCategories = [...variable.categories];
    newCategories[index].points = points;
    onCategoryChange(newCategories);
  };

  return (
    <div className="px-6 py-5">
      {/* Variable Name & Reset */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-neutral-900">
          {variable.name}
          {variable.direction === 'descending' && (
            <span className="ml-2 text-xs font-normal text-neutral-600">(Inverse)</span>
          )}
        </h4>
        <button
          onClick={onReset}
          className="text-xs text-purple-700 hover:text-purple-800 font-medium transition-colors"
        >
          Reset to Default
        </button>
      </div>

      {/* Numeric Variable - Range Inputs */}
      {variable.type === 'numeric' && variable.tiers && (
        <div className="space-y-1">
          {variable.tiers.map((tier, index) => (
            <ScoringRangeInput
              key={index}
              tier={tier}
              index={index}
              isLastTier={index === variable.tiers!.length - 1}
              unit={variable.unit}
              onChange={(updatedTier) => handleTierUpdate(index, updatedTier)}
            />
          ))}
        </div>
      )}

      {/* Categorical Variable - Simple List */}
      {variable.type === 'categorical' && variable.categories && (
        <div className="space-y-2">
          {variable.categories.map((category, index) => (
            <div key={index} className="flex items-center gap-3 py-2">
              <div className="text-sm font-medium text-neutral-700 flex-1">
                {category.label}
              </div>
              <input
                type="number"
                value={category.points}
                onChange={(e) => {
                  const points = parseInt(e.target.value);
                  if (!isNaN(points)) {
                    handleCategoryUpdate(index, points);
                  }
                }}
                min={0}
                max={5}
                className="w-16 px-2 py-1 text-sm text-center border border-neutral-400 rounded bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-purple-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ MozAppearance: 'textfield' }}
              />
              <div className="text-sm text-neutral-600 w-12">
                {category.points === 1 ? 'pt' : 'pts'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
