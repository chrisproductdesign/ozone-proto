import { LoginScreen } from '@/screens/Login';

import { type NavigationProps } from '../App';

export const Login = (navProps: NavigationProps) => {
  return <LoginScreen {...navProps} />;
};