import React from 'react';

import { LoginCard } from '@/components/login/LoginCard';
import { transitionTo } from '@/lib/viewTransitions';
import { type NavigationProps } from '@playground/App';

type LoginScreenProps = NavigationProps;

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigateTo }) => {
  const handleLogin = (email: string, password: string) => {
    // Simple validation - in a real app this would call an API
    if (email && password) {
      // Navigate to Deal Select screen with view transition
      transitionTo(() => {
        navigateTo('deal-select');
      });
    }
  };

  return (
    <div
      className="min-h-full relative overflow-hidden bg-neutral-400"
      style={{
        backgroundImage: 'url(/ozone-proto-v0.7/assets/login-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Art Overlay - Subtle gradient to blend artwork */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 242, 238, 0.15) 0%, rgba(232, 226, 217, 0.05) 100%)',
        }}
      />

      {/* Enhanced SVG Decorative Elements - Layered over background art */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bottom left - Flowing organic curves */}
        <svg
          className="absolute left-0 bottom-0 w-[28rem] h-[28rem] opacity-20"
          viewBox="0 0 450 450"
          style={{ transform: 'translate(-10%, 10%)' }}
        >
          <path
            d="M80 400 Q 150 300, 200 280 Q 250 260, 320 240 Q 380 220, 420 180"
            stroke="#DAC6B0"
            strokeWidth="50"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M30 430 Q 120 360, 180 340 Q 240 320, 300 280"
            stroke="#C6B4A2"
            strokeWidth="35"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Top right - Elegant curves */}
        <svg
          className="absolute right-0 top-0 w-[28rem] h-[28rem] opacity-20"
          viewBox="0 0 450 450"
          style={{ transform: 'translate(10%, -10%)' }}
        >
          <path
            d="M370 50 Q 300 150, 250 170 Q 200 190, 130 210 Q 70 230, 30 270"
            stroke="#DAC6B0"
            strokeWidth="50"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M420 20 Q 330 90, 270 110 Q 210 130, 150 170"
            stroke="#C6B4A2"
            strokeWidth="35"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Center left - Vertical accent */}
        <svg
          className="absolute left-[8%] top-1/3 w-48 h-64 opacity-15"
          viewBox="0 0 200 250"
        >
          <path
            d="M50 20 Q 80 80, 70 130 Q 60 180, 90 230"
            stroke="#B8A694"
            strokeWidth="40"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Center right - Organic blob shapes */}
        <svg
          className="absolute right-[12%] top-[45%] w-56 h-56 opacity-12"
          viewBox="0 0 220 220"
        >
          <ellipse
            cx="110"
            cy="110"
            rx="85"
            ry="95"
            fill="#CCB8A6"
            opacity="0.4"
          />
          <ellipse
            cx="110"
            cy="110"
            rx="55"
            ry="65"
            fill="#D6C4B2"
            opacity="0.5"
          />
        </svg>

        {/* Subtle circular accents scattered */}
        <div
          className="absolute rounded-full"
          style={{
            top: '18%',
            left: '22%',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(224, 214, 200, 0.18) 0%, rgba(224, 214, 200, 0) 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: '22%',
            right: '18%',
            width: '220px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(204, 194, 182, 0.15) 0%, rgba(204, 194, 182, 0) 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: '58%',
            left: '35%',
            width: '140px',
            height: '140px',
            background: 'radial-gradient(circle, rgba(214, 198, 180, 0.12) 0%, rgba(214, 198, 180, 0) 70%)',
          }}
        />
      </div>

      {/* Main Content - Login Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <LoginCard onSubmit={handleLogin} />
      </div>
    </div>
  );
};