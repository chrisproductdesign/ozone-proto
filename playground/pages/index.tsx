import { type ReactNode } from 'react';

import { type NavigationProps } from '../App';

import { DashboardV2 } from './DashboardV2';
import { DealInput } from './DealInput';
import { Foundation } from './Foundation';
import { Login } from './Login';

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