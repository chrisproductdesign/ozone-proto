import React, { useEffect, useState, useRef } from 'react';

import { useToast } from '@/components/feedback/Toast';
import { ComboboxInput } from '@/components/form/ComboboxInput';
import { CurrencyInput } from '@/components/form/CurrencyInput';
import { FormSection } from '@/components/form/FormSection';
import { NumberInput } from '@/components/form/NumberInput';
import { PercentageInput } from '@/components/form/PercentageInput';
import { SelectInput } from '@/components/form/SelectInput';
import { TextInput } from '@/components/form/TextInput';
import { useDeal } from '@/contexts/DealContext';
import { classNames } from '@/lib/classNames';
import { type NavigationProps } from '@playground/App';

type DealInputScreenProps = NavigationProps;

export const DealInputScreen: React.FC<DealInputScreenProps> = ({ navigateTo }) => {
  const { currentDeal, updateDeal, saveDraft, dealName } = useDeal();
  const { showToast } = useToast();
  void showToast; // Intentionally unused for now
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
    if (!currentDeal.firstName && !currentDeal.lastName && !currentDeal.fico && !currentDeal.monthlyRevenue) {
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

  // Utility functions reserved for future validation features
  // Temporarily removed to avoid unused variable lint errors

  const handleContinue = () => {
    if (navigateTo) {
      navigateTo('dashboard-v2');
    }
  };

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];

  const industryOptions = [
    { value: 'restaurant_food_service', label: 'Restaurant & Food Service' },
    { value: 'retail_general', label: 'Retail - General Merchandise' },
    { value: 'retail_specialty', label: 'Retail - Specialty Stores' },
    { value: 'construction_general', label: 'Construction - General Contractor' },
    { value: 'construction_specialty', label: 'Construction - Specialty Trade' },
    { value: 'professional_services', label: 'Professional Services' },
    { value: 'medical_healthcare', label: 'Medical & Healthcare' },
    { value: 'automotive_repair', label: 'Automotive Repair & Services' },
    { value: 'automotive_sales', label: 'Automotive Sales & Dealerships' },
    { value: 'transportation_logistics', label: 'Transportation & Logistics' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'wholesale_distribution', label: 'Wholesale & Distribution' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'hospitality_lodging', label: 'Hospitality & Lodging' },
    { value: 'personal_services', label: 'Personal Services (Salons, Spas, etc.)' },
    { value: 'home_services', label: 'Home Services & Contractors' },
    { value: 'landscaping', label: 'Landscaping & Lawn Care' },
    { value: 'cleaning_janitorial', label: 'Cleaning & Janitorial Services' },
    { value: 'technology_it', label: 'Technology & IT Services' },
    { value: 'education_training', label: 'Education & Training' },
    { value: 'financial_services', label: 'Financial Services' },
    { value: 'legal_services', label: 'Legal Services' },
    { value: 'accounting', label: 'Accounting & Bookkeeping' },
    { value: 'marketing_advertising', label: 'Marketing & Advertising' },
    { value: 'entertainment', label: 'Entertainment & Recreation' },
    { value: 'fitness_wellness', label: 'Fitness & Wellness' },
    { value: 'agriculture', label: 'Agriculture & Farming' },
    { value: 'e_commerce', label: 'E-commerce' },
    { value: 'telecommunications', label: 'Telecommunications' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'other', label: 'Other' },
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
    <div className="min-h-full bg-neutral-400">
      {/* Two-row Header: Title + Metrics */}
      <header className="sticky top-0 z-10 bg-neutral-400">
        {/* Row 1: Deal Title & Continue Button */}
        <div className="border-b border-neutral-300">
          <div className="max-w-[1000px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-normal text-neutral-800">
                {dealName}
              </h1>
              {/* Saved indicator */}
              {showSaved && (
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <button
              onClick={handleContinue}
              className="px-3 py-2 text-sm font-medium rounded-full transition-colors duration-[150ms] text-white bg-neutral-900 hover:bg-neutral-800"
              aria-label="Continue to dashboard"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Row 2: Metrics Summary (always present, subtle when empty) */}
        <div className="border-b border-neutral-300">
          <div className="max-w-[1000px] mx-auto px-6">
            {/* Mobile: 2x2 grid, Desktop: Single row with dividers */}
            <div className="grid grid-cols-2 md:flex md:items-stretch md:divide-x md:divide-neutral-300">
              {/* Metric 1: Gross funded */}
              <div className="px-3 py-1.5 flex flex-col gap-2 md:flex-1">
                <dt className="text-xs font-normal text-neutral-700 opacity-40">
                  Gross funded
                </dt>
                <dd className={classNames(
                  "text-base font-semibold text-neutral-900 transition-opacity duration-[150ms] h-[24px]",
                  formData.grossFundedAmount ? "opacity-100" : "opacity-0"
                )}>
                  {formData.grossFundedAmount ? `${Number(formData.grossFundedAmount).toLocaleString()}k` : '\u00A0'}
                </dd>
              </div>

              {/* Metric 2: Term */}
              <div className="px-3 py-1.5 flex flex-col gap-2 md:flex-1 md:px-6">
                <dt className="text-xs font-normal text-neutral-700 opacity-40">
                  Term
                </dt>
                <dd className={classNames(
                  "text-base font-semibold text-neutral-900 transition-opacity duration-[150ms] h-[24px]",
                  formData.term ? "opacity-100" : "opacity-0"
                )}>
                  {formData.term || '\u00A0'}
                </dd>
              </div>

              {/* Metric 3: Payment frequency */}
              <div className="px-3 py-1.5 flex flex-col gap-2 md:flex-1 md:px-6">
                <dt className="text-xs font-normal text-neutral-700 opacity-40">
                  Payment frequency
                </dt>
                <dd className={classNames(
                  "text-base font-semibold text-neutral-900 transition-opacity duration-[150ms] h-[24px]",
                  formData.paymentFrequency ? "opacity-100" : "opacity-0"
                )}>
                  {formData.paymentFrequency || '\u00A0'}
                </dd>
              </div>

              {/* Metric 4: Advance type */}
              <div className="px-3 py-1.5 flex flex-col gap-2 md:flex-1 md:px-6">
                <dt className="text-xs font-normal text-neutral-700 opacity-40">
                  Advance type
                </dt>
                <dd className={classNames(
                  "text-base font-semibold text-neutral-900 transition-opacity duration-[150ms] h-[24px]",
                  formData.advanceType ? "opacity-100" : "opacity-0"
                )}>
                  {formData.advanceType || '\u00A0'}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pt-10 pb-8">
        <div className="max-w-[1000px] mx-auto space-y-2">

          {/* Business Information Section */}
          <FormSection title="Business information">
            <div className="space-y-5">
              {/* Owner name and state row */}
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-3">
                  <TextInput
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="First name"
                    required
                    aria-label="Owner first name"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextInput
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Last name"
                    required
                    aria-label="Owner last name"
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <ComboboxInput
                    value={formData.state}
                    onChange={(value) => handleInputChange('state', value)}
                    options={stateOptions}
                    placeholder="State"
                    required
                    aria-label="State"
                  />
                </div>
              </div>

              {/* Remaining fields in 12-column grid */}
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-3">
                  <ComboboxInput
                    value={formData.industry}
                    onChange={(value) => handleInputChange('industry', value)}
                    options={industryOptions}
                    placeholder="Industry"
                    aria-label="Industry"
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <TextInput
                    value={formData.naicsCode}
                    onChange={(e) => handleInputChange('naicsCode', e.target.value)}
                    placeholder="NAICS Code"
                    aria-label="NAICS Code"
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <TextInput
                    value={formData.timeInBusiness}
                    onChange={(e) => handleInputChange('timeInBusiness', e.target.value)}
                    placeholder="Time in Business (Years)"
                    aria-label="Time in Business"
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <TextInput
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.fico}
                    onChange={(e) => handleInputChange('fico', e.target.value)}
                    placeholder="FICO (300-850)"
                    required
                    aria-label="FICO credit score"
                    aria-invalid={formData.fico !== '' && (parseInt(formData.fico) < 300 || parseInt(formData.fico) > 850)}
                    aria-describedby={formData.fico && (parseInt(formData.fico) < 300 || parseInt(formData.fico) > 850) ? "fico-error" : undefined}
                    error={formData.fico !== '' && (parseInt(formData.fico) < 300 || parseInt(formData.fico) > 850)}
                  />
                  {formData.fico && (parseInt(formData.fico) < 300 || parseInt(formData.fico) > 850) && (
                    <p id="fico-error" className="mt-1 text-xs text-red-600" role="alert">Score must be between 300 and 850</p>
                  )}
                </div>
              </div>
            </div>
          </FormSection>

          {/* Financials Section */}
          <FormSection title="Financials">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-12 md:col-span-4">
                <CurrencyInput
                  value={formData.monthlyRevenue}
                  onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                  placeholder="Avg Monthly Revenue"
                  required
                  aria-label="Average Monthly Revenue"
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <CurrencyInput
                  value={formData.monthlyExpenses}
                  onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                  placeholder="Avg Monthly Expenses"
                  aria-label="Average Monthly Expenses"
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <SelectInput
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  options={positionOptions}
                  placeholder="position"
                  aria-label="Position"
                />
              </div>
            </div>
          </FormSection>

          {/* Pricing and Terms Row */}
          <div className="grid grid-cols-12 gap-2">
            {/* Pricing and Performance */}
            <div className="col-span-12 lg:col-span-6">
              <FormSection title="Pricing and Performance">
                <div className="space-y-5">
                  <CurrencyInput
                    value={formData.grossFundedAmount}
                    onChange={(e) => handleInputChange('grossFundedAmount', e.target.value)}
                    min="10000"
                    max="100000"
                    placeholder="Gross Funded Amount"
                    required
                    aria-label="Gross Funded Amount"
                  />
                  <NumberInput
                    value={formData.term}
                    onChange={(e) => handleInputChange('term', e.target.value)}
                    min="30"
                    max="180"
                    step="1"
                    placeholder="Term (Days)"
                    required
                    aria-label="Term in Days"
                  />
                </div>
              </FormSection>
            </div>

            {/* Terms */}
            <div className="col-span-12 lg:col-span-6">
              <FormSection title="Terms">
                <div className="grid grid-cols-2 gap-5">
                  <SelectInput
                    value={formData.paymentFrequency}
                    onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
                    options={frequencyOptions}
                    placeholder="payment frequency"
                    aria-label="Payment Frequency"
                  />
                  <SelectInput
                    value={formData.advanceType}
                    onChange={(e) => handleInputChange('advanceType', e.target.value)}
                    options={advanceTypeOptions}
                    placeholder="Advanced terms"
                    aria-label="Advance Type"
                  />
                </div>
                {/* Full-width ISO Commission at bottom */}
                <div className="mt-5">
                  <PercentageInput
                    value={formData.isoCommission}
                    onChange={(e) => handleInputChange('isoCommission', e.target.value)}
                    min="0"
                    max="100"
                    step="0.5"
                    placeholder="ISO Commission"
                    aria-label="ISO Commission"
                  />
                </div>
              </FormSection>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};