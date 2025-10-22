import React, { useState } from 'react';
import { ButtonBaseUIWrapper } from '@/components/button/ButtonBaseUIWrapper';
import { InputBaseUIWrapper } from '@/components/input/InputBaseUIWrapper';

export const Forms = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tailwind + Base UI Integration Test</h1>
        <p className="mt-2 text-gray-600">
          Testing the new foundation with Tailwind CSS and Base UI component wrappers.
        </p>
      </div>

      {/* Button Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Button Components</h2>

        <div className="p-6 bg-gray-50 rounded-lg space-y-4">
          <div className="flex flex-wrap gap-3">
            <ButtonBaseUIWrapper variant="primary">Primary Action</ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper variant="secondary">Secondary</ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper variant="ghost">Ghost Button</ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper variant="danger">Danger</ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper variant="success">Success</ButtonBaseUIWrapper>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonBaseUIWrapper size="sm">Small</ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper size="md">Medium</ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper size="lg">Large</ButtonBaseUIWrapper>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonBaseUIWrapper loading>Loading State</ButtonBaseUIWrapper>
            <ButtonBaseUIWrapper disabled>Disabled</ButtonBaseUIWrapper>
          </div>

          <div>
            <ButtonBaseUIWrapper variant="primary" fullWidth>
              Full Width Button
            </ButtonBaseUIWrapper>
          </div>
        </div>
      </section>

      {/* Input Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Input Components</h2>

        <div className="p-6 bg-gray-50 rounded-lg space-y-4">
          <InputBaseUIWrapper
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            helperText="We'll never share your email"
          />

          <InputBaseUIWrapper
            label="Funding Amount"
            placeholder="50,000"
            type="number"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            startIcon={<span className="text-gray-500">$</span>}
            helperText="Minimum funding amount is $10,000"
          />

          <div className="grid grid-cols-2 gap-4">
            <InputBaseUIWrapper
              label="First Name"
              placeholder="John"
              required
            />
            <InputBaseUIWrapper
              label="Last Name"
              placeholder="Doe"
              required
            />
          </div>

          <InputBaseUIWrapper
            label="Error State Example"
            variant="error"
            placeholder="Invalid input"
            helperText="This field has an error"
          />

          <InputBaseUIWrapper
            label="Success State Example"
            variant="success"
            placeholder="Valid input"
            helperText="Looks good!"
          />
        </div>
      </section>

      {/* Form Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Complete Form Example</h2>

        <form onSubmit={handleSubmit} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
          <InputBaseUIWrapper
            label="Business Email"
            type="email"
            placeholder="contact@company.com"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <InputBaseUIWrapper
            label="Requested Funding"
            type="number"
            placeholder="100,000"
            required
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            startIcon={<span className="text-gray-500">$</span>}
            helperText="Enter the amount you'd like to request"
          />

          <div className="pt-4">
            <ButtonBaseUIWrapper
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? 'Processing...' : 'Submit Application'}
            </ButtonBaseUIWrapper>
          </div>
        </form>
      </section>

      {/* Tailwind Utility Classes Demo */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Design Tokens via Tailwind</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-700 text-white rounded-lg text-center">
            Primary
          </div>
          <div className="p-4 bg-green-500 text-white rounded-lg text-center">
            Success
          </div>
          <div className="p-4 bg-amber-500 text-white rounded-lg text-center">
            Warning
          </div>
          <div className="p-4 bg-red-500 text-white rounded-lg text-center">
            Danger
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl">
          <h3 className="text-lg font-semibold">Gradient Background</h3>
          <p className="mt-2 opacity-90">Using the brandPrimary gradient from design tokens</p>
        </div>
      </section>
    </div>
  );
};