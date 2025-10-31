/**
 * InsightList Types
 *
 * Type definitions for insights displayed in the Dashboard v0.7
 */

export type InsightType = 'positive' | 'warning' | 'negative' | 'neutral';

export interface Insight {
  id: string;
  type: InsightType;
  message: string;
  metric: string;
  priority: number;
}
