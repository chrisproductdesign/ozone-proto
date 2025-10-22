import React, { useState } from 'react';
import { classNames } from '@/lib/classNames';
import { FormSection } from '@/components/form/FormSection';
import { FormField } from '@/components/form/FormField';
import { TextInput } from '@/components/form/TextInput';
import { CurrencyInput } from '@/components/form/CurrencyInput';
import { NumberInput } from '@/components/form/NumberInput';
import { SelectInput } from '@/components/form/SelectInput';

export const DealInputScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: 'Business Name LLC, Business Name',
    state: 'CO',
    industry: 'Subcontract',
    naicsCode: '238320',
    timeInBusiness: '18.1',
    fico: '650',
    monthlyRevenue: '120000',
    monthlyExpenses: '90000',
    position: '3rd',
    grossFundedAmount: '102000',
    term: '180',
    paymentFrequency: 'Weekly',
    advanceType: 'New',
    isoCommission: '180'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const stateOptions = [
    { value: 'CO', label: 'CO' },
    { value: 'CA', label: 'CA' },
    { value: 'NY', label: 'NY' },
    { value: 'TX', label: 'TX' },
    { value: 'FL', label: 'FL' },
  ];

  const industryOptions = [
    { value: 'Subcontract', label: 'Subcontract' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Professional Services', label: 'Professional Services' },
  ];

  const positionOptions = [
    { value: '1st', label: '1st' },
    { value: '2nd', label: '2nd' },
    { value: '3rd', label: '3rd' },
    { value: '4th', label: '4th' },
    { value: '5th', label: '5th' },
  ];

  const frequencyOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Bi-Weekly', label: 'Bi-Weekly' },
    { value: 'Monthly', label: 'Monthly' },
  ];

  const advanceTypeOptions = [
    { value: 'New', label: 'New' },
    { value: 'Renewal', label: 'Renewal' },
    { value: 'Refinance', label: 'Refinance' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F2ED' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="max-w-[1000px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h1 className="text-lg font-medium text-gray-900">
                Name of the deal goes here LLC
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Save draft"
              >
                Save draft
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#4A4543' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A3533'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4A4543'}
                aria-label="Continue"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-[1000px] mx-auto space-y-6">

          {/* Business Information Section */}
          <FormSection title="Business information">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8">
                <FormField label="Legal Name and DBA" required>
                  <TextInput
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter business name"
                  />
                </FormField>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <FormField label="State" required>
                  <SelectInput
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    options={stateOptions}
                  />
                </FormField>
              </div>
              <div className="col-span-12 md:col-span-3">
                <FormField label="Industry">
                  <SelectInput
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    options={industryOptions}
                  />
                </FormField>
              </div>
              <div className="col-span-12 md:col-span-3">
                <FormField label="NAICS Code">
                  <TextInput
                    value={formData.naicsCode}
                    onChange={(e) => handleInputChange('naicsCode', e.target.value)}
                    placeholder="000000"
                  />
                </FormField>
              </div>
              <div className="col-span-12 md:col-span-3">
                <FormField label="Time in Business">
                  <TextInput
                    value={formData.timeInBusiness}
                    onChange={(e) => handleInputChange('timeInBusiness', e.target.value)}
                    placeholder="Years"
                  />
                </FormField>
              </div>
              <div className="col-span-12 md:col-span-3">
                <FormField label="FICO" required>
                  <TextInput
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.fico}
                    onChange={(e) => handleInputChange('fico', e.target.value)}
                    placeholder="300-850"
                    aria-label="FICO credit score"
                  />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* Financials Section */}
          <FormSection title="Financials">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <FormField label="Average Monthly Revenue" required>
                  <CurrencyInput
                    value={formData.monthlyRevenue}
                    onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                    placeholder="0.00"
                  />
                </FormField>
              </div>
              <div className="col-span-12 md:col-span-4">
                <FormField label="Average Monthly Expenses">
                  <CurrencyInput
                    value={formData.monthlyExpenses}
                    onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                    placeholder="0.00"
                  />
                </FormField>
              </div>
              <div className="col-span-12 md:col-span-4">
                <FormField label="Position">
                  <SelectInput
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    options={positionOptions}
                  />
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* Pricing and Terms Row */}
          <div className="grid grid-cols-12 gap-6">
            {/* Pricing and Performance */}
            <div className="col-span-12 lg:col-span-6">
              <FormSection title="Pricing and Performance">
                <div className="space-y-4">
                  <FormField label="Gross Funded Amount" required>
                    <CurrencyInput
                      value={formData.grossFundedAmount}
                      onChange={(e) => handleInputChange('grossFundedAmount', e.target.value)}
                      placeholder="0.00"
                    />
                  </FormField>
                  <FormField label="Term (Days)" required>
                    <NumberInput
                      value={formData.term}
                      onChange={(e) => handleInputChange('term', e.target.value)}
                      min="1"
                      max="365"
                      step="1"
                      placeholder="Days"
                    />
                  </FormField>
                </div>
              </FormSection>
            </div>

            {/* Terms */}
            <div className="col-span-12 lg:col-span-6">
              <FormSection title="Terms">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Payment Frequency">
                    <SelectInput
                      value={formData.paymentFrequency}
                      onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
                      options={frequencyOptions}
                    />
                  </FormField>
                  <FormField label="Advance Type">
                    <SelectInput
                      value={formData.advanceType}
                      onChange={(e) => handleInputChange('advanceType', e.target.value)}
                      options={advanceTypeOptions}
                    />
                  </FormField>
                  <FormField label="Gross Funded Amount">
                    <CurrencyInput
                      value={formData.grossFundedAmount}
                      onChange={(e) => handleInputChange('grossFundedAmount', e.target.value)}
                      placeholder="0.00"
                    />
                  </FormField>
                  <FormField label="Term (Days)">
                    <NumberInput
                      value={formData.term}
                      onChange={(e) => handleInputChange('term', e.target.value)}
                      min="1"
                      max="365"
                      step="1"
                      placeholder="Days"
                    />
                  </FormField>
                </div>
              </FormSection>
            </div>
          </div>

          {/* Deal Summary */}
          <FormSection title="Deal Summary">
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Review Deal Terms
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <dt className="text-xs text-gray-600 mb-1">Total Funded</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    ${Number(formData.grossFundedAmount || 0).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-600 mb-1">Term</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {formData.term || 0} days
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-600 mb-1">Payment Schedule</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {formData.paymentFrequency}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-600 mb-1">Advance Type</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {formData.advanceType}
                  </dd>
                </div>
              </div>

              {/* Additional commission field */}
              <div className="mt-6 pt-6 border-t border-purple-100">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-4">
                    <FormField label="ISO Commission">
                      <NumberInput
                        value={formData.isoCommission}
                        onChange={(e) => handleInputChange('isoCommission', e.target.value)}
                        min="0"
                        step="1"
                        placeholder="Amount"
                      />
                    </FormField>
                  </div>
                </div>
              </div>
            </div>
          </FormSection>

        </div>
      </main>
    </div>
  );
};