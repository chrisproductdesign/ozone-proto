import { type ReactNode } from 'react';

import { Typography } from './Typography';
import { Colors } from './Colors';
import { Forms } from './Forms';
import { Layout } from './Layout';
import { Data } from './Data';
import { Feedback } from './Feedback';
import { Navigation } from './Navigation';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { DealInput } from './DealInput';

export type PlaygroundPage = {
  id: string;
  title: string;
  render: () => ReactNode;
};

export const playgroundPages: PlaygroundPage[] = [
  {
    id: 'login',
    title: 'Login',
    render: () => <Login />,
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    render: () => <Dashboard />,
  },
  {
    id: 'dealinput',
    title: 'Deal Input',
    render: () => <DealInput />,
  },
  {
    id: 'typography',
    title: 'Typography',
    render: () => <Typography />,
  },
  {
    id: 'colors',
    title: 'Colors',
    render: () => <Colors />,
  },
  {
    id: 'forms',
    title: 'Forms',
    render: () => <Forms />,
  },
  {
    id: 'layout',
    title: 'Layout',
    render: () => <Layout />,
  },
  {
    id: 'data',
    title: 'Data',
    render: () => <Data />,
  },
  {
    id: 'feedback',
    title: 'Feedback',
    render: () => <Feedback />,
  },
  {
    id: 'navigation',
    title: 'Navigation',
    render: () => <Navigation />,
  },
];