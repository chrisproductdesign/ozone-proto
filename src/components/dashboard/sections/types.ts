/**
 * Dashboard Section Types and Configuration
 *
 * Defines the section IDs, types, and configuration for reorderable dashboard sections.
 */

export const DASHBOARD_SECTION_IDS = [
  'performance',
  'composite-score',
  'benchmarking',
  'background-check',
  'portfolio-risk',
] as const;

export type DashboardSectionId = (typeof DASHBOARD_SECTION_IDS)[number];

export const DEFAULT_SECTION_ORDER: DashboardSectionId[] = [
  'performance',
  'composite-score',
  'benchmarking',
  'background-check',
  'portfolio-risk',
];

export const SECTION_STORAGE_KEY = 'dashboard-section-order';

export interface SectionConfig {
  id: DashboardSectionId;
  name: string;
  description: string;
}

export const SECTION_CONFIGS: Record<DashboardSectionId, SectionConfig> = {
  performance: {
    id: 'performance',
    name: 'Performance',
    description: 'Deal range and payment timeline charts',
  },
  'composite-score': {
    id: 'composite-score',
    name: 'Composite Score',
    description: 'Overall deal grade with control factors',
  },
  benchmarking: {
    id: 'benchmarking',
    name: 'Benchmarking',
    description: 'Marketplace and portfolio comparisons',
  },
  'background-check': {
    id: 'background-check',
    name: 'Background Check',
    description: 'Data verification and compliance checks',
  },
  'portfolio-risk': {
    id: 'portfolio-risk',
    name: 'Portfolio Risk',
    description: 'Risk analysis and exposure metrics',
  },
};
