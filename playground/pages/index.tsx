import { type ReactNode } from 'react';
import { type NavigationProps } from '../App';

import { Typography } from './Typography';
import { Colors } from './Colors';
import { Forms } from './Forms';
import { Layout } from './Layout';
import { Data } from './Data';
import { Feedback } from './Feedback';
import { Navigation } from './Navigation';
import { Login } from './Login';
import { DashboardV2 } from './DashboardV2';
import { DealInput } from './DealInput';

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
    render: () => <DashboardV2 />,
  },
  {
    id: 'component',
    title: 'Component',
    render: () => <Forms />,
  },
];