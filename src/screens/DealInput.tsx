import React, { useEffect, useState, useRef } from 'react';
import { classNames } from '@/lib/classNames';
import { FormSection } from '@/components/form/FormSection';
import { FormField } from '@/components/form/FormField';
import { TextInput } from '@/components/form/TextInput';
import { CurrencyInput } from '@/components/form/CurrencyInput';
import { NumberInput } from '@/components/form/NumberInput';
import { SelectInput } from '@/components/form/SelectInput';
import { useDeal } from '@/contexts/DealContext';
import { useToast } from '@/components/feedback/Toast';
import { type NavigationProps } from '@playground/App';

interface DealInputScreenProps extends NavigationProps {}

export const DealInputScreen: React.FC<DealInputScreenProps> = ({ navigateTo }) => {
  const { currentDeal, updateDeal, saveDraft, dealName } = useDeal();
  const { showToast } = useToast();
  const [showSaved, setShowSaved] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Use context data as form data
  const formData = currentDeal;

  const handleInputChange = (field: string, value: string) => {
    // Special handling for FICO score
    if (field === 'fico') {
      // Only allow numeric input
      const numericValue = value.replace(/\D/g, '');

      // Limit to max of 3 digits (for 850 max)
      const limitedValue = numericValue.slice(0, 3);

      // Don't allow values over 850
      if (parseInt(limitedValue) > 850) {
        return;
      }

      updateDeal({ [field]: limitedValue });
    } else {
      updateDeal({ [field]: value });
    }
  };

  // Auto-save with debounce
  useEffect(() => {
    // Clear any existing timer
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    // Don't save if form is empty
    if (!currentDeal.businessName && !currentDeal.fico && !currentDeal.monthlyRevenue) {
      return;
    }

    // Set a new timer to save after 500ms of no changes
    saveTimerRef.current = setTimeout(() => {
      saveDraft();
      setShowSaved(true);

      // Hide the "Saved" indicator after 2 seconds
      setTimeout(() => {
        setShowSaved(false);
      }, 2000);
    }, 500);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [currentDeal, saveDraft]);

  // Check if required fields are complete
  const isFormValid = () => {
    const requiredFields = ['businessName', 'state', 'fico', 'monthlyRevenue', 'grossFundedAmount', 'term'];
    return requiredFields.every(field => currentDeal[field as keyof typeof currentDeal]);
  };

  // Get list of missing required fields for feedback
  const getMissingFields = () => {
    const requiredFields = [
      { field: 'businessName', label: 'Legal Name and DBA' },
      { field: 'state', label: 'State' },
      { field: 'fico', label: 'FICO' },
      { field: 'monthlyRevenue', label: 'Average Monthly Revenue' },
      { field: 'grossFundedAmount', label: 'Gross Funded Amount' },
      { field: 'term', label: 'Term' }
    ];
    return requiredFields
      .filter(({ field }) => !currentDeal[field as keyof typeof currentDeal])
      .map(({ label }) => label);
  };

  const handleContinue = () => {
    if (navigateTo && isFormValid()) {
      navigateTo('dashboard');
    }
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
                {dealName}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Saved indicator */}
              {showSaved && (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </span>
              )}

              <button
                onClick={() => showToast('Deals list coming soon', 'info')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="View deals"
              >
                Deals
              </button>
              <button
                onClick={handleContinue}
                disabled={!isFormValid()}
                className={classNames(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  isFormValid()
                    ? "text-white bg-[#4A4543] hover:bg-[#3A3533]"
                    : "text-gray-400 bg-gray-200 cursor-not-allowed"
                )}
                aria-label="Continue"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Missing fields feedback */}
          {!isFormValid() && (
            <div className="max-w-[1000px] mx-auto mt-2">
              <p className="text-xs text-amber-600" role="alert" aria-live="polite">
                <svg className="inline-block w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {getMissingFields().join(', ')}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-[1000px] mx-auto space-y-5">

          {/* Business Information Section */}
          <FormSection title="Business information">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 md:col-span-9">
                <FormField label="Legal Name and DBA" required completed={!!formData.businessName}>
                  <TextInput
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter business name"
                  />
                </FormField>
              </div>
              <div className="col-span-12 md:col-span-3">
                <FormField label="State" required completed={!!formData.state}>
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
                <FormField label="FICO" required completed={!!formData.fico && parseInt(formData.fico) >= 300 && parseInt(formData.fico) <= 850}>
                  <TextInput
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.fico}
                    onChange={(e) => handleInputChange('fico', e.target.value)}
                    placeholder="300-850"
                    aria-label="FICO credit score"
                    aria-invalid={formData.fico !== '' && (parseInt(formData.fico) < 300 || parseInt(formData.fico) > 850)}
                    aria-describedby={formData.fico && (parseInt(formData.fico) < 300 || parseInt(formData.fico) > 850) ? "fico-error" : undefined}
                    error={formData.fico !== '' && (parseInt(formData.fico) < 300 || parseInt(formData.fico) > 850)}
                  />
                  {formData.fico && (parseInt(formData.fico) < 300 || parseInt(formData.fico) > 850) && (
                    <p id="fico-error" className="mt-1 text-xs text-red-600" role="alert">Score must be between 300 and 850</p>
                  )}
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* Financials Section */}
          <FormSection title="Financials">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 md:col-span-4">
                <FormField label="Average Monthly Revenue" required completed={!!formData.monthlyRevenue}>
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
          <div className="grid grid-cols-12 gap-5">
            {/* Pricing and Performance */}
            <div className="col-span-12 lg:col-span-6">
              <FormSection title="Pricing and Performance">
                <div className="space-y-5">
                  <FormField label="Gross Funded Amount" required completed={!!formData.grossFundedAmount}>
                    <CurrencyInput
                      value={formData.grossFundedAmount}
                      onChange={(e) => handleInputChange('grossFundedAmount', e.target.value)}
                      placeholder="0.00"
                    />
                  </FormField>
                  <FormField label="Term (Days)" required completed={!!formData.term}>
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
                <div className="grid grid-cols-2 gap-5">
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
                <div className="grid grid-cols-12 gap-5">
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