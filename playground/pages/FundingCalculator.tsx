import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  Select,
  Slider,
} from '../../src/components';

export const FundingCalculator = () => {
  const [fundingAmount, setFundingAmount] = useState(50000);
  const [repaymentTerm, setRepaymentTerm] = useState(12);
  const [businessType, setBusinessType] = useState('retail');
  const [yearsInBusiness, setYearsInBusiness] = useState('2-5');

  const businessTypeOptions = [
    { value: 'retail', label: 'Retail' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'services', label: 'Professional Services' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'other', label: 'Other' },
  ];

  const yearsOptions = [
    { value: '0-1', label: 'Less than 1 year' },
    { value: '1-2', label: '1-2 years' },
    { value: '2-5', label: '2-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' },
  ];

  // Calculate estimated values
  const factorRate = 1.18; // Example factor rate
  const totalPayback = fundingAmount * factorRate;
  const dailyPayment = totalPayback / (repaymentTerm * 20); // Assuming 20 business days per month
  const totalCost = totalPayback - fundingAmount;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            Get Funded in 24 Hours
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
            Calculate your funding options and see how much you qualify for
          </p>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Calculator Card */}
          <Card style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 600 }}>
              Funding Calculator
            </h2>

            <div style={{ marginBottom: '2rem' }}>
              <Slider
                label="Funding Amount"
                value={fundingAmount}
                onChange={setFundingAmount}
                min={5000}
                max={500000}
                step={5000}
                formatValue={(v) => new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0
                }).format(v)}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Slider
                label="Repayment Term (Months)"
                value={repaymentTerm}
                onChange={setRepaymentTerm}
                min={3}
                max={24}
                step={1}
                formatValue={(v) => `${v} months`}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Select
                label="Business Type"
                value={businessType}
                onChange={setBusinessType}
                options={businessTypeOptions}
                placeholder="Select your business type"
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Select
                label="Years in Business"
                value={yearsInBusiness}
                onChange={setYearsInBusiness}
                options={yearsOptions}
                placeholder="How long have you been in business?"
              />
            </div>

            <div style={{
              padding: '1.5rem',
              background: '#f8fafc',
              borderRadius: '0.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <Badge variant="success" style={{ marginBottom: '0.5rem' }}>
                  Pre-Qualified
                </Badge>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Based on your inputs, you're pre-qualified for funding
                </p>
              </div>
            </div>

            <Button variant="primary" size="lg" fullWidth>
              Apply Now
            </Button>

            <p style={{
              marginTop: '1rem',
              fontSize: '0.75rem',
              color: '#94a3b8',
              textAlign: 'center'
            }}>
              No impact to credit score • 24 hour approval
            </p>
          </Card>

          {/* Results Card */}
          <Card style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 600 }}>
              Your Funding Details
            </h2>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                padding: '1.5rem',
                background: '#7c3aed',
                color: 'white',
                borderRadius: '0.75rem',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                  Funding Amount
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                  }).format(fundingAmount)}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div style={{
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                    Daily Payment
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(dailyPayment)}
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                    Total Payback
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0
                    }).format(totalPayback)}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid #e2e8f0',
              paddingTop: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
                Payment Breakdown
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>Funding Amount:</span>
                  <span style={{ fontWeight: 500 }}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0
                    }).format(fundingAmount)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>Factor Rate:</span>
                  <span style={{ fontWeight: 500 }}>{factorRate.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>Total Cost:</span>
                  <span style={{ fontWeight: 500 }}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0
                    }).format(totalCost)}
                  </span>
                </div>
              </div>

              <div style={{
                padding: '1rem',
                background: '#fef3c7',
                borderRadius: '0.5rem',
                marginTop: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>⚡</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '0.25rem' }}>
                      Fast Funding Available
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#78350f' }}>
                      Get your funds as fast as 24 hours after approval
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
                What You'll Need
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  '3 months of business bank statements',
                  'Business tax ID or EIN',
                  'Driver\'s license or government ID',
                  'Voided business check'
                ].map((item, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      background: '#10b981',
                      color: 'white',
                      fontSize: '0.875rem'
                    }}>
                      ✓
                    </span>
                    <span style={{ fontSize: '0.875rem' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Trust Badges */}
        <div style={{
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem'
        }}>
          {[
            { value: '10,000+', label: 'Businesses Funded' },
            { value: '$500M+', label: 'Capital Deployed' },
            { value: '4.8/5', label: 'Customer Rating' },
            { value: '24hrs', label: 'Average Approval Time' }
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};