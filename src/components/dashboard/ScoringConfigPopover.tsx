/**
 * ScoringConfigPopover Component
 *
 * Tab-based popover for configuring scoring thresholds across multiple variables.
 * Supports both numeric (with horizontal sliders) and categorical (with categories) variables.
 * Triggered by gear icon on Background Check cards.
 */

import React, { useState, useRef } from 'react';
import { Popover } from '@base-ui-components/react/popover';
import { Settings, X, LayoutTemplate, ChevronDown } from 'lucide-react';

import { ScoringMinimalTabContent } from './ScoringMinimalTabContent';
import {
  balancedConfig,
  conservativeConfig,
  lenientConfig,
} from '@/constants/scoringDefaults';
import type {
  PresetType,
  ScoringConfig,
  ScoringTier,
  CategoryOption,
} from '@/types/scoring';

interface ScoringConfigPopoverProps {
  config: ScoringConfig;
  onSave: (config: ScoringConfig) => void;
}

export const ScoringConfigPopover: React.FC<ScoringConfigPopoverProps> = ({
  config,
  onSave,
}) => {
  const [open, setOpen] = useState(false);
  const [editConfig, setEditConfig] = useState<ScoringConfig>(config);
  const [activeTab, setActiveTab] = useState<keyof ScoringConfig>('tib');
  const [presetDropdownOpen, setPresetDropdownOpen] = useState(false);
  const presetButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setEditConfig(config); // Reset to current config when opening
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onSave(editConfig);
    setOpen(false);
  };

  const handleCancel = () => {
    setEditConfig(config); // Discard changes
    setOpen(false);
  };

  const handlePresetChange = (preset: PresetType) => {
    const presetConfigs = {
      conservative: conservativeConfig,
      balanced: balancedConfig,
      lenient: lenientConfig,
    };

    setEditConfig(presetConfigs[preset]);
    setPresetDropdownOpen(false);
  };

  // Handle tier changes from spectrum slider
  const handleTierChange = (variableId: keyof ScoringConfig, updatedTiers: ScoringTier[]) => {
    const variable = editConfig[variableId];
    if (variable.type === 'numeric') {
      setEditConfig({
        ...editConfig,
        [variableId]: {
          ...variable,
          tiers: updatedTiers,
        },
      });
    }
  };

  // Handle category changes
  const handleCategoryChange = (
    variableId: keyof ScoringConfig,
    updatedCategories: CategoryOption[]
  ) => {
    const variable = editConfig[variableId];
    if (variable.type === 'categorical') {
      setEditConfig({
        ...editConfig,
        [variableId]: {
          ...variable,
          categories: updatedCategories,
        },
      });
    }
  };

  // Reset individual variable to default
  const handleResetVariable = (variableId: keyof ScoringConfig) => {
    setEditConfig({
      ...editConfig,
      [variableId]: balancedConfig[variableId],
    });
  };

  // Variable order and configuration
  const variableOrder: (keyof ScoringConfig)[] = [
    'tib',
    'seasonality',
    'wh',
    'creditScore',
    'ue',
  ];

  // Short tab names (acronyms)
  const tabNames: Record<keyof ScoringConfig, string> = {
    tib: 'TIB',
    seasonality: 'Seasonality',
    wh: 'WH',
    creditScore: 'Credit',
    ue: 'UE',
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className="flex items-center justify-center w-6 h-6 text-neutral-600 hover:text-neutral-900 transition-colors"
        onClick={handleOpen}
      >
        <Settings className="w-5 h-5" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner sideOffset={8} align="end">
          <Popover.Popup className="w-[540px] max-h-[680px] bg-neutral-300 border border-neutral-400 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-400">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-neutral-900">
                  Scoring Configuration
                </h3>
                <div className="relative">
                  <button
                    ref={presetButtonRef}
                    onClick={() => setPresetDropdownOpen(!presetDropdownOpen)}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-neutral-700 hover:text-neutral-900 hover:bg-neutral-300/50 rounded transition-colors"
                  >
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Preset Dropdown */}
                  {presetDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setPresetDropdownOpen(false)}
                      />
                      <div className="absolute left-0 top-full mt-1 bg-neutral-300 border border-neutral-400 rounded-lg shadow-lg z-20 min-w-max">
                        <button
                          onClick={() => handlePresetChange('balanced')}
                          className="w-full px-3 py-2 text-left text-xs text-neutral-900 hover:bg-neutral-400/30 first:rounded-t-lg"
                        >
                          Balanced (Default)
                        </button>
                        <button
                          onClick={() => handlePresetChange('conservative')}
                          className="w-full px-3 py-2 text-left text-xs text-neutral-900 hover:bg-neutral-400/30"
                        >
                          Conservative (Stricter)
                        </button>
                        <button
                          onClick={() => handlePresetChange('lenient')}
                          className="w-full px-3 py-2 text-left text-xs text-neutral-900 hover:bg-neutral-400/30 last:rounded-b-lg"
                        >
                          Lenient (More Forgiving)
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex items-center justify-center w-6 h-6 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-neutral-400 bg-neutral-300/50">
              {variableOrder.map((variableId) => {
                return (
                  <button
                    key={variableId}
                    onClick={() => setActiveTab(variableId)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === variableId
                        ? 'border-purple-700 text-purple-700 bg-neutral-300'
                        : 'border-transparent text-neutral-700 hover:text-neutral-900 hover:bg-neutral-300/30'
                    }`}
                  >
                    {tabNames[variableId]}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Area */}
            <div className="max-h-[480px] overflow-y-auto">
              <ScoringMinimalTabContent
                variable={editConfig[activeTab]}
                onTierChange={(tiers) => handleTierChange(activeTab, tiers)}
                onCategoryChange={(categories) =>
                  handleCategoryChange(activeTab, categories)
                }
                onReset={() => handleResetVariable(activeTab)}
              />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-neutral-400 bg-neutral-300/50">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-purple-700 text-white hover:bg-purple-800"
              >
                Save All
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
