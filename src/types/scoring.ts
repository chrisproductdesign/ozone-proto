/**
 * Scoring Configuration Types
 *
 * Defines the data structures for configurable scoring thresholds
 * used in the Background Check scoring system.
 */

export type TierColor = 'red' | 'orange' | 'yellow' | 'green';

export type InputType = 'currency' | 'duration' | 'percentage' | 'number';

export type VariableType = 'numeric' | 'categorical';

export type RangeDirection = 'ascending' | 'descending';

/**
 * Represents a single scoring tier with threshold range and point value
 * Used for numeric variables (Credit Score, TIB, WH, UE)
 */
export interface ScoringTier {
  tier: number;
  min?: number;        // Undefined for first tier (< min)
  max?: number;        // Undefined for last tier (max+)
  points: number;
  label: string;       // e.g., "Poor", "Fair", "Good", "Excellent"
  color: TierColor;
}

/**
 * Represents a single category option with point value
 * Used for categorical variables (Seasonality)
 */
export interface CategoryOption {
  id: string;          // e.g., "veryHigh", "high", "moderate"
  label: string;       // e.g., "very high", "high", "moderate"
  points: number;
  color: TierColor;
}

/**
 * Configuration for a single variable's scoring
 * Can be either numeric (with tiers) or categorical (with categories)
 */
export interface VariableConfig {
  id: string;          // e.g., "creditScore", "tib", "seasonality"
  name: string;        // Display name
  type: VariableType;  // 'numeric' or 'categorical'

  // For numeric variables
  tiers?: ScoringTier[];
  inputType?: InputType;
  unit?: string;       // e.g., "$", "years", "%"
  direction?: RangeDirection;  // 'ascending' (default) or 'descending' for inverse variables

  // For categorical variables
  categories?: CategoryOption[];
}

/**
 * Complete scoring configuration for all variables
 */
export interface ScoringConfig {
  tib: VariableConfig;              // Time in Business (years)
  seasonality: VariableConfig;      // Seasonality (categorical)
  wh: VariableConfig;               // Warehouse Lending (%)
  creditScore: VariableConfig;      // Credit Score (numeric)
  ue: VariableConfig;               // Macro Unemployment Rate (%)
}

/**
 * Preset configurations
 */
export type PresetType = 'conservative' | 'balanced' | 'lenient';

export interface PresetConfig {
  name: string;
  description: string;
  config: ScoringConfig;
}
