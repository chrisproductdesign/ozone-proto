import { type ReactNode } from 'react';
import { type NavigationProps } from '../App';

import { Login } from './Login';
import { DealSelect } from './DealSelect';
import { DealInput } from './DealInput';
import { DashboardV2 } from './DashboardV2';
import { Foundation } from './Foundation';

export type PlaygroundPage = {
  id: string;
  title: string;
  render: (navProps: NavigationProps) => ReactNode;
};

export const playgroundPages: PlaygroundPage[] = [
  {
    id: 'login',
    title: 'Login',
    render: (navProps) => <Login navigateTo={navProps.navigateTo} currentPage={navProps.currentPage} />,
  },
  {
    id: 'deal-select',
    title: 'Deal Select',
    render: (navProps) => <DealSelect navigateTo={navProps.navigateTo} currentPage={navProps.currentPage} />,
  },
  {
    id: 'dealinput',
    title: 'Deal Input',
    render: (navProps) => <DealInput navigateTo={navProps.navigateTo} currentPage={navProps.currentPage} />,
  },
  {
    id: 'dashboard-v2',
    title: 'Dashboard',
    render: (navProps) => <DashboardV2 navigateTo={navProps.navigateTo} currentPage={navProps.currentPage} />,
  },
  {
    id: 'foundation',
    title: 'Foundation',
    render: () => <Foundation />,
  },
];