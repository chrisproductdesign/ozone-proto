import React, { useState } from 'react';
import { classNames } from '@/lib/classNames';

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
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);

    // Set active state when user starts typing
    setIsActive(!!value || !!email || !!password);
  };

  return (
    <div className="bg-white rounded-2xl px-6 sm:px-12 py-8 sm:py-10 shadow-lg w-full max-w-md">
      {/* Brand */}
      <div className="text-center mb-12">
        <h2 className="text-gray-500 text-sm font-normal tracking-wide">Ogion</h2>
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-10">
        <h1 className="text-gray-900 text-2xl font-normal">
          Welcome back
          <br />
          Jasmine
        </h1>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address"
            className={classNames(
              'w-full px-4 py-3.5 rounded-lg border text-gray-900',
              'placeholder:text-gray-400 text-sm',
              'transition-all duration-200',
              'focus:outline-none focus:border-gray-400',
              email ? 'border-gray-300 bg-gray-50' : 'border-gray-200 bg-white'
            )}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Password"
            aria-label="Password"
            className={classNames(
              'w-full px-4 py-3.5 rounded-lg border text-gray-900',
              'placeholder:text-gray-400 text-sm',
              'transition-all duration-200',
              'focus:outline-none focus:border-gray-400',
              password ? 'border-gray-300 bg-gray-50' : 'border-gray-200 bg-white'
            )}
            required
          />
        </div>

        {/* Spacing before button */}
        <div className="pt-4">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || (!email && !password)}
            aria-label="Sign in to your account"
            className={classNames(
              'w-full py-3.5 rounded-lg font-medium text-sm tracking-wider',
              'transition-all duration-200 uppercase',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              isActive && email && password
                ? 'bg-[#4A4543] text-white hover:bg-[#3A3533] shadow-sm'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            )}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-8">
        <span className="text-gray-500 text-sm">
          Don't have an account?{' '}
          <a
            href="#"
            className="text-gray-900 font-medium hover:text-purple-900 transition-colors"
          >
            Sign up
          </a>
        </span>
      </div>
    </div>
  );
};