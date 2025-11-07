/**
 * Scoring Calculations Utility
 *
 * Calculates tier, points, progress, and color for scorecard variables
 * based on ranges defined in docs/spec-values/scorecard-variable-ranges.md
 */

export interface TierResult {
  points: number;
  progress: number; // 0-100
  color: string;
}

/**
 * Calculate TIB (Time in Business) tier from years
 * Range: 0-10+ years, 6 tiers (0-5 points)
 */
export function calculateTIBTier(years: number): TierResult {
  let points: number;

  if (years < 1) {
    points = 0;
  } else if (years >= 1 && years < 2) {
    points = 1;
  } else if (years >= 2 && years < 4) {
    points = 2;
  } else if (years >= 4 && years < 7) {
    points = 3;
  } else if (years >= 7 && years < 10) {
    points = 4;
  } else {
    points = 5;
  }

  return {
    points,
    progress: calculateProgress(points, 5),
    color: getTierColor(points, 5),
  };
}

/**
 * Calculate Seasonality tier from category
 * Categories: very high, high, moderate, low, very low, none (0-5 points)
 */
export function calculateSeasonalityTier(category: string): TierResult {
  const categoryMap: Record<string, number> = {
    'very high': 0,
    'high': 1,
    'moderate': 2,
    'low': 3,
    'very low': 4,
    'none': 5,
  };

  const points = categoryMap[category.toLowerCase()] ?? 0;

  return {
    points,
    progress: calculateProgress(points, 5),
    color: getTierColor(points, 5),
  };
}

/**
 * Calculate WH (Warehouse Lending) tier from percentage
 * Range: 0-30%, 6 tiers (0-5 points)
 * INVERSE: Higher percentage = worse (lower points)
 */
export function calculateWHTier(percentage: number): TierResult {
  let points: number;

  if (percentage >= 20) {
    points = 0;
  } else if (percentage >= 15 && percentage < 20) {
    points = 1;
  } else if (percentage >= 10 && percentage < 15) {
    points = 2;
  } else if (percentage >= 5 && percentage < 10) {
    points = 3;
  } else if (percentage >= 1 && percentage < 5) {
    points = 4;
  } else {
    points = 5;
  }

  return {
    points,
    progress: calculateProgress(points, 5),
    color: getTierColor(points, 5),
  };
}

/**
 * Calculate Credit Score tier from score
 * Range: 300-850, 6 tiers (1-5 points)
 * Note: Min points is 1, not 0
 */
export function calculateCreditScoreTier(score: number): TierResult {
  let points: number;

  if (score < 550) {
    points = 1;
  } else if (score >= 550 && score < 600) {
    points = 2;
  } else if (score >= 600 && score < 650) {
    points = 3;
  } else if (score >= 650 && score < 750) {
    // Note: 650-700 and 700-750 both = 4 points per spec
    points = 4;
  } else {
    points = 5;
  }

  return {
    points,
    progress: calculateProgress(points, 5),
    color: getTierColor(points, 5),
  };
}

/**
 * Calculate UE (Macro Unemployment Rate) tier from percentage
 * Range: 0-10%, 6 tiers (1-5 points)
 * INVERSE: Higher percentage = worse (lower points)
 * Note: Min points is 1, not 0
 */
export function calculateUETier(percentage: number): TierResult {
  let points: number;

  if (percentage > 8) {
    points = 1;
  } else if (percentage >= 6 && percentage <= 8) {
    points = 1; // Note: Same as >8 per spec
  } else if (percentage >= 4 && percentage < 6) {
    points = 2;
  } else if (percentage >= 3 && percentage < 4) {
    points = 3;
  } else if (percentage >= 2 && percentage < 3) {
    points = 4;
  } else {
    points = 5;
  }

  return {
    points,
    progress: calculateProgress(points, 5),
    color: getTierColor(points, 5),
  };
}

/**
 * Get tier color based on points
 * Red (0-1) → Orange (2) → Yellow (3) → Green (4-5)
 */
export function getTierColor(points: number, maxPoints: number): string {
  const ratio = points / maxPoints;

  if (ratio <= 0.2) {
    return '#ef4444'; // red-500
  } else if (ratio <= 0.4) {
    return '#f97316'; // orange-500
  } else if (ratio <= 0.6) {
    return '#eab308'; // yellow-500
  } else {
    return '#22c55e'; // green-500
  }
}

/**
 * Calculate progress bar percentage (0-100)
 */
export function calculateProgress(points: number, maxPoints: number): number {
  return Math.min(100, Math.max(0, (points / maxPoints) * 100));
}

/**
 * Get seasonality options for dropdown
 */
export function getSeasonalityOptions(): string[] {
  return ['very high', 'high', 'moderate', 'low', 'very low', 'none'];
}

/**
 * Variable type definitions for validation and formatting
 */
export type VariableType = 'tib' | 'seasonality' | 'wh' | 'creditScore' | 'ue';

export interface VariableConfig {
  id: VariableType;
  label: string;
  inputType: 'number' | 'dropdown';
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  calculateTier: (value: any) => TierResult;
}

/**
 * Variable configuration map
 */
export const VARIABLE_CONFIGS: Record<VariableType, VariableConfig> = {
  tib: {
    id: 'tib',
    label: 'Time in Business',
    inputType: 'number',
    unit: 'yr',
    min: 0,
    max: 20,
    step: 0.5,
    calculateTier: calculateTIBTier,
  },
  seasonality: {
    id: 'seasonality',
    label: 'Seasonality',
    inputType: 'dropdown',
    calculateTier: calculateSeasonalityTier,
  },
  wh: {
    id: 'wh',
    label: 'Warehouse Lending',
    inputType: 'number',
    unit: '%',
    min: 0,
    max: 30,
    step: 1,
    calculateTier: calculateWHTier,
  },
  creditScore: {
    id: 'creditScore',
    label: 'Credit Score',
    inputType: 'number',
    min: 300,
    max: 850,
    step: 1,
    calculateTier: calculateCreditScoreTier,
  },
  ue: {
    id: 'ue',
    label: 'Macro Unemployment',
    inputType: 'number',
    unit: '%',
    min: 0,
    max: 10,
    step: 0.1,
    calculateTier: calculateUETier,
  },
};
