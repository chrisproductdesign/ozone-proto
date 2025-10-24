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
    <div className="bg-base rounded-3xl shadow-sm w-full max-w-lg flex flex-col justify-center" style={{ height: '600px', padding: '80px 60px' }}>
      {/* Brand */}
      <div className="text-center" style={{ marginBottom: '50px' }}>
        <h2 className="text-neutral-500 text-lg font-light" style={{ letterSpacing: '0.5px' }}>Ozone</h2>
      </div>

      {/* Welcome Message */}
      <div className="text-center" style={{ marginBottom: '50px' }}>
        <h1 className="text-neutral-800 font-light text-4xl leading-tight">
          Welcome back
          <br />
          Jasmine
        </h1>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address"
            className={classNames(
              'w-full rounded-xl border text-neutral-800',
              'placeholder:text-neutral-500',
              'transition-all duration-200',
              'focus:outline-none focus:border-neutral-500',
              email ? 'border-neutral-400' : 'border-neutral-300'
            )}
            style={{
              padding: '18px 20px',
              fontSize: '16px',
              backgroundColor: email ? '#FAFAFA' : 'white'
            }}
            required
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '50px' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Password"
            aria-label="Password"
            className={classNames(
              'w-full rounded-xl border text-neutral-800',
              'placeholder:text-neutral-500',
              'transition-all duration-200',
              'focus:outline-none focus:border-neutral-500',
              password ? 'border-neutral-400' : 'border-neutral-300'
            )}
            style={{
              padding: '18px 20px',
              fontSize: '16px',
              backgroundColor: password ? '#FAFAFA' : 'white'
            }}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !email || !password}
          aria-label="Sign in to your account"
          className={classNames(
            'w-full rounded-full font-medium tracking-wide',
            'transition-all duration-200 uppercase text-base',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            email && password
              ? 'text-white hover:opacity-90'
              : 'text-neutral-500'
          )}
          style={{
            padding: '16px',
            letterSpacing: '0.5px',
            backgroundColor: email && password ? '#6B5B73' : '#F0F0F0'
          }}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center" style={{ marginTop: '40px' }}>
        <span className="text-neutral-500 text-base">
          Don't have an account?{' '}
          <a
            href="#"
            className="text-neutral-800 font-semibold hover:text-neutral-700 transition-colors"
          >
            Sign up
          </a>
        </span>
      </div>
    </div>
  );
};