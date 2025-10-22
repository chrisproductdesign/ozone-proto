import { type ReactNode } from 'react';

import { FintechDashboard } from './FintechDashboard';
import { FundingCalculator } from './FundingCalculator';
import { ComponentShowcase } from './ComponentShowcase';

export type PlaygroundPage = {
  id: string;
  title: string;
  summary: string;
  render: () => ReactNode;
};

// Core fintech flow screens
export const playgroundPages: PlaygroundPage[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    summary: 'Business banking dashboard with metrics and transactions',
    render: () => <FintechDashboard />,
  },
  {
    id: 'funding',
    title: 'Funding Application',
    summary: 'Multi-step funding application flow',
    render: () => <FundingCalculator />,
  },
  {
    id: 'components',
    title: 'Component Lab',
    summary: 'Test and iterate on individual components',
    render: () => <ComponentShowcase />,
  },
];