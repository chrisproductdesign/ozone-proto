/**
 * Scoring Configuration Defaults
 *
 * Preset configurations for scoring thresholds across different risk profiles.
 * Based on specifications in docs/spec-values/scorecard-variable-ranges.md
 */

import type { ScoringConfig, PresetConfig, PresetType } from '@/types/scoring';

/**
 * Balanced Configuration (Default)
 * Standard risk thresholds for typical use cases
 */
export const balancedConfig: ScoringConfig = {
  // Time in Business (years): 0-5 points
  tib: {
    id: 'tib',
    name: 'Time in Business',
    type: 'numeric',
    inputType: 'duration',
    unit: 'years',
    tiers: [
      { tier: 1, max: 0.99, points: 0, label: 'Too New', color: 'red' },
      { tier: 2, min: 1, max: 1.99, points: 1, label: 'Startup', color: 'orange' },
      { tier: 3, min: 2, max: 3.99, points: 2, label: 'Growing', color: 'yellow' },
      { tier: 4, min: 4, max: 6.99, points: 3, label: 'Established', color: 'yellow' },
      { tier: 5, min: 7, max: 9.99, points: 4, label: 'Mature', color: 'green' },
      { tier: 6, min: 10, points: 5, label: 'Veteran', color: 'green' },
    ],
  },

  // Seasonality (categorical): 0-5 points
  seasonality: {
    id: 'seasonality',
    name: 'Seasonality',
    type: 'categorical',
    categories: [
      { id: 'veryHigh', label: 'very high', points: 0, color: 'red' },
      { id: 'high', label: 'high', points: 1, color: 'orange' },
      { id: 'moderate', label: 'moderate', points: 2, color: 'yellow' },
      { id: 'low', label: 'low', points: 3, color: 'yellow' },
      { id: 'veryLow', label: 'very low', points: 4, color: 'green' },
      { id: 'none', label: 'none', points: 5, color: 'green' },
    ],
  },

  // Warehouse Lending (%): 0-5 points
  wh: {
    id: 'wh',
    name: 'Warehouse Lending',
    type: 'numeric',
    inputType: 'percentage',
    unit: '%',
    direction: 'descending',  // Higher percentage = worse (inverse)
    tiers: [
      { tier: 1, min: 20, points: 0, label: 'Very High', color: 'red' },
      { tier: 2, min: 15, max: 19.99, points: 1, label: 'High', color: 'orange' },
      { tier: 3, min: 10, max: 14.99, points: 2, label: 'Moderate', color: 'yellow' },
      { tier: 4, min: 5, max: 9.99, points: 3, label: 'Low', color: 'yellow' },
      { tier: 5, min: 1, max: 4.99, points: 4, label: 'Very Low', color: 'green' },
      { tier: 6, max: 0.99, points: 5, label: 'Minimal', color: 'green' },
    ],
  },

  // Credit Score: 1-5 points
  creditScore: {
    id: 'creditScore',
    name: 'Credit Score',
    type: 'numeric',
    inputType: 'number',
    tiers: [
      { tier: 1, max: 549, points: 1, label: 'Poor', color: 'red' },
      { tier: 2, min: 550, max: 599, points: 2, label: 'Fair', color: 'orange' },
      { tier: 3, min: 600, max: 649, points: 3, label: 'Fair+', color: 'yellow' },
      { tier: 4, min: 650, max: 699, points: 4, label: 'Good', color: 'yellow' },
      { tier: 5, min: 700, max: 749, points: 4, label: 'Good+', color: 'green' },
      { tier: 6, min: 750, points: 5, label: 'Excellent', color: 'green' },
    ],
  },

  // Macro Unemployment Rate (%): 1-5 points
  ue: {
    id: 'ue',
    name: 'Unemployment Rate',
    type: 'numeric',
    inputType: 'percentage',
    unit: '%',
    direction: 'descending',  // Higher unemployment = worse (inverse)
    tiers: [
      { tier: 1, min: 8, points: 1, label: 'Very High', color: 'red' },
      { tier: 2, min: 6, max: 7.99, points: 1, label: 'High', color: 'red' },
      { tier: 3, min: 4, max: 5.99, points: 2, label: 'Moderate', color: 'orange' },
      { tier: 4, min: 3, max: 3.99, points: 3, label: 'Low', color: 'yellow' },
      { tier: 5, min: 2, max: 2.99, points: 4, label: 'Very Low', color: 'yellow' },
      { tier: 6, max: 1.99, points: 5, label: 'Minimal', color: 'green' },
    ],
  },
};

/**
 * Conservative Configuration
 * Stricter thresholds requiring higher standards for good scores
 */
export const conservativeConfig: ScoringConfig = {
  // Time in Business - require more years for higher scores
  tib: {
    id: 'tib',
    name: 'Time in Business',
    type: 'numeric',
    inputType: 'duration',
    unit: 'years',
    tiers: [
      { tier: 1, max: 1.99, points: 0, label: 'Too New', color: 'red' },
      { tier: 2, min: 2, max: 3.99, points: 1, label: 'Startup', color: 'orange' },
      { tier: 3, min: 4, max: 6.99, points: 2, label: 'Growing', color: 'yellow' },
      { tier: 4, min: 7, max: 9.99, points: 3, label: 'Established', color: 'yellow' },
      { tier: 5, min: 10, max: 14.99, points: 4, label: 'Mature', color: 'green' },
      { tier: 6, min: 15, points: 5, label: 'Veteran', color: 'green' },
    ],
  },

  // Seasonality - same as balanced (categorical doesn't change)
  seasonality: balancedConfig.seasonality,

  // Warehouse Lending - stricter thresholds
  wh: {
    id: 'wh',
    name: 'Warehouse Lending',
    type: 'numeric',
    inputType: 'percentage',
    unit: '%',
    tiers: [
      { tier: 1, min: 25, points: 0, label: 'Very High', color: 'red' },
      { tier: 2, min: 20, max: 24.99, points: 1, label: 'High', color: 'orange' },
      { tier: 3, min: 15, max: 19.99, points: 2, label: 'Moderate', color: 'yellow' },
      { tier: 4, min: 10, max: 14.99, points: 3, label: 'Low', color: 'yellow' },
      { tier: 5, min: 5, max: 9.99, points: 4, label: 'Very Low', color: 'green' },
      { tier: 6, max: 4.99, points: 5, label: 'Minimal', color: 'green' },
    ],
  },

  // Credit Score - higher requirements
  creditScore: {
    id: 'creditScore',
    name: 'Credit Score',
    type: 'numeric',
    inputType: 'number',
    tiers: [
      { tier: 1, max: 599, points: 1, label: 'Poor', color: 'red' },
      { tier: 2, min: 600, max: 649, points: 2, label: 'Fair', color: 'orange' },
      { tier: 3, min: 650, max: 699, points: 3, label: 'Fair+', color: 'yellow' },
      { tier: 4, min: 700, max: 749, points: 4, label: 'Good', color: 'yellow' },
      { tier: 5, min: 750, max: 799, points: 4, label: 'Good+', color: 'green' },
      { tier: 6, min: 800, points: 5, label: 'Excellent', color: 'green' },
    ],
  },

  // Unemployment Rate - same as balanced (macro factor)
  ue: balancedConfig.ue,
};

/**
 * Lenient Configuration
 * More forgiving thresholds allowing lower requirements for good scores
 */
export const lenientConfig: ScoringConfig = {
  // Time in Business - fewer years required
  tib: {
    id: 'tib',
    name: 'Time in Business',
    type: 'numeric',
    inputType: 'duration',
    unit: 'years',
    tiers: [
      { tier: 1, max: 0.49, points: 0, label: 'Too New', color: 'red' },
      { tier: 2, min: 0.5, max: 0.99, points: 1, label: 'Startup', color: 'orange' },
      { tier: 3, min: 1, max: 1.99, points: 2, label: 'Growing', color: 'yellow' },
      { tier: 4, min: 2, max: 3.99, points: 3, label: 'Established', color: 'yellow' },
      { tier: 5, min: 4, max: 6.99, points: 4, label: 'Mature', color: 'green' },
      { tier: 6, min: 7, points: 5, label: 'Veteran', color: 'green' },
    ],
  },

  // Seasonality - same as balanced (categorical doesn't change)
  seasonality: balancedConfig.seasonality,

  // Warehouse Lending - more lenient thresholds
  wh: {
    id: 'wh',
    name: 'Warehouse Lending',
    type: 'numeric',
    inputType: 'percentage',
    unit: '%',
    tiers: [
      { tier: 1, min: 30, points: 0, label: 'Very High', color: 'red' },
      { tier: 2, min: 25, max: 29.99, points: 1, label: 'High', color: 'orange' },
      { tier: 3, min: 20, max: 24.99, points: 2, label: 'Moderate', color: 'yellow' },
      { tier: 4, min: 15, max: 19.99, points: 3, label: 'Low', color: 'yellow' },
      { tier: 5, min: 10, max: 14.99, points: 4, label: 'Very Low', color: 'green' },
      { tier: 6, max: 9.99, points: 5, label: 'Minimal', color: 'green' },
    ],
  },

  // Credit Score - lower requirements
  creditScore: {
    id: 'creditScore',
    name: 'Credit Score',
    type: 'numeric',
    inputType: 'number',
    tiers: [
      { tier: 1, max: 499, points: 1, label: 'Poor', color: 'red' },
      { tier: 2, min: 500, max: 549, points: 2, label: 'Fair', color: 'orange' },
      { tier: 3, min: 550, max: 599, points: 3, label: 'Fair+', color: 'yellow' },
      { tier: 4, min: 600, max: 649, points: 4, label: 'Good', color: 'yellow' },
      { tier: 5, min: 650, max: 699, points: 4, label: 'Good+', color: 'green' },
      { tier: 6, min: 700, points: 5, label: 'Excellent', color: 'green' },
    ],
  },

  // Unemployment Rate - same as balanced (macro factor)
  ue: balancedConfig.ue,
};

/**
 * Preset configurations for easy selection
 */
export const presets: Record<PresetType, PresetConfig> = {
  balanced: {
    name: 'Balanced',
    description: 'Standard risk thresholds for typical use cases',
    config: balancedConfig,
  },
  conservative: {
    name: 'Conservative',
    description: 'Stricter requirements for higher risk standards',
    config: conservativeConfig,
  },
  lenient: {
    name: 'Lenient',
    description: 'More forgiving thresholds for broader acceptance',
    config: lenientConfig,
  },
};
