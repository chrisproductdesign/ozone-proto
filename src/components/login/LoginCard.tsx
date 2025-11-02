import React, { useState } from 'react';

import { Button } from '@/components/button/Button';
import { TextInput } from '@/components/form/TextInput';

interface LoginCardProps {
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  onSubmit,
  isLoading = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <div
      className="view-transition-login-card bg-white rounded-3xl shadow-[0px_4px_60px_8px_rgba(0,0,0,0.07)] w-[440px] h-[600px]"
    >
      <div className="flex flex-col justify-between py-8 h-full">
        {/* Top Section: title&inputs - 32px padding, 376px width */}
        <div className="flex flex-col px-8 w-full">
          <div className="flex flex-col w-[376px] mx-auto">
            {/* logo&title section - 175px height */}
            <div className="flex flex-col gap-[60px] items-center text-center">
              {/* Ogion - 19px height */}
              <p className="font-semibold text-base text-neutral-800/50 tracking-[1px] h-[19px] leading-[19px]">
                Ogion
              </p>

              {/* Welcome back Jasmine - 96px height at y=79 */}
              <h1 className="font-thin text-[40px] leading-[1.2] text-[rgba(89,76,86,0.87)] h-24">
                Welcome back
                <br />
                Jasmine
              </h1>
            </div>

            {/* Gap: 80px (y=255 - 175) */}
            <div className="h-20" />

            {/* Inputs - 96px total height, 16px gap */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <TextInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-10 rounded-md border-neutral-400 text-sm"
                required
              />

              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                className="h-10 rounded-md border-neutral-400 text-sm"
                required
              />
            </form>
          </div>
        </div>

        {/* Bottom Section: button&link - 24px padding, 392px width */}
        <div className="flex flex-col px-6 w-full">
          <div className="flex flex-col gap-4 w-[392px] mx-auto">
            {/* Continue Button - 36px height */}
            <Button
              type="button"
              variant="primary"
              size="md"
              fullWidth
              disabled={!isFormValid || isLoading}
              loading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                onSubmit?.(email, password);
              }}
              className="rounded-full shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.2)] uppercase tracking-[0.4px] text-sm h-9"
            >
              Continue
            </Button>

            {/* Sign up link - 19px height at y=52 */}
            <div className="flex gap-1.5 items-center justify-center h-[19px]">
              <p className="text-xs text-neutral-600 leading-[15px]">
                Don't have an account?
              </p>
              <button
                type="button"
                className="text-xs font-medium text-neutral-900/87 leading-[15px]"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
