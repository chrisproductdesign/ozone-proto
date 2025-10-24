import React from 'react';
import { LoginCard } from '@/components/login/LoginCard';
import { type NavigationProps } from '@playground/App';

interface LoginScreenProps extends NavigationProps {}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigateTo }) => {
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // Simple validation - in a real app this would call an API
    if (email && password) {
      // Navigate to Deal Input screen on successful login
      navigateTo('dealinput');
    }
  };

  return (
    <div className="min-h-full relative overflow-hidden bg-secondary">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left decorative element */}
        <svg
          className="absolute left-0 bottom-0 w-96 h-96 opacity-30"
          viewBox="0 0 400 400"
        >
          <path
            d="M50 350 Q 100 200, 200 250 T 350 100"
            stroke="#E8E2D9"
            strokeWidth="80"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M0 380 Q 80 280, 150 320 T 280 200"
            stroke="#E8E2D9"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Right decorative element */}
        <svg
          className="absolute right-0 top-0 w-96 h-96 opacity-30"
          viewBox="0 0 400 400"
        >
          <path
            d="M350 50 Q 300 200, 200 150 T 50 300"
            stroke="#E8E2D9"
            strokeWidth="80"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M400 20 Q 320 120, 250 80 T 120 200"
            stroke="#E8E2D9"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Additional subtle shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white opacity-5"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white opacity-5"></div>
      </div>

      {/* Main Content - Login Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <LoginCard onSubmit={handleLogin} />
      </div>
    </div>
  );
};