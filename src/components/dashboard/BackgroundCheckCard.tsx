import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Copy, Check, Building2, Search, Sparkles } from 'lucide-react';

export type BackgroundCheckCardVariant = 'checklist' | 'data-merch' | 'perplexity';

export interface BackgroundCheckCardProps {
  variant: BackgroundCheckCardVariant;
  noBorder?: boolean;
  noRounded?: boolean;
  className?: string;
}

/**
 * ProgressRing - Circular progress indicator for checklist status
 */
const ProgressRing: React.FC<{ value: number; max: number }> = ({ value, max }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 14; // radius = 14
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Background circle */}
      <svg className="absolute inset-0 -rotate-90" width="40" height="40">
        <circle
          cx="20"
          cy="20"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-green-200"
        />
        {/* Progress circle */}
        <circle
          cx="20"
          cy="20"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-green-600 transition-all duration-500 ease-out"
        />
      </svg>
      {/* Value text */}
      <div className="relative text-xs font-bold text-green-800">
        {value}/{max}
      </div>
    </div>
  );
};

/**
 * BackgroundCheckCard - Enhanced background verification cards with copy functionality
 *
 * Features:
 * - Checklist variant with green checkmarks and status badges
 * - Business Intelligence variant with copyable data points
 * - Perplexity search variant with AI-powered results
 * - Copy-to-clipboard functionality for relevant data
 * - Color-coded accents for visual differentiation
 * - Scroll-triggered animations
 * - Progress ring visualization
 * - Enhanced hover states
 *
 * @example
 * <BackgroundCheckCard variant="checklist" />
 */
export const BackgroundCheckCard: React.FC<BackgroundCheckCardProps> = ({
  variant,
  noBorder = false,
  noRounded = false,
  className = '',
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const borderClass = noBorder ? '' : 'border border-black/10';
  const roundedClass = noRounded ? '' : 'rounded';
  const shadowClass = '';

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CopyButton = ({ text, label }: { text: string; label: string }) => (
    <button
      onClick={() => handleCopy(text, label)}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 hover:bg-black/5 hover:scale-105 active:scale-95 ${
        copiedItem === label ? 'animate-bounce-once' : ''
      }`}
      aria-label={`Copy ${label}`}
    >
      {copiedItem === label ? (
        <>
          <Check className="w-3 h-3 text-green-700 animate-scale-in" />
          <span className="text-green-700 font-semibold">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 text-neutral-600" />
          <span className="text-neutral-600">Copy</span>
        </>
      )}
    </button>
  );

  if (variant === 'checklist') {
    return (
      <div
        ref={cardRef}
        className={`bg-neutral-300 ${roundedClass} ${shadowClass} overflow-hidden transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${className}`}
      >
        {/* Green accent border top */}
        <div className="h-1 bg-gradient-to-r from-green-600 to-green-500" />

        <div className="py-6 px-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-[18px] h-[18px] text-green-700" />
              </div>
              <p className="text-base font-bold text-neutral-900">
                Background Checklist
              </p>
            </div>
            <ProgressRing value={4} max={4} />
          </div>

          {/* Checklist Items */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900 leading-normal">
                  Valid EIN and state business license on file
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900 leading-normal">
                  No Chapter 7 bankruptcy filings in past 7 years
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900 leading-normal">
                  Owners cleared identity verification and credit screening
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900 leading-normal">
                  No federal tax liens or outstanding IRS debt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'data-merch') {
    return (
      <div
        ref={cardRef}
        className={`bg-neutral-300 ${roundedClass} ${shadowClass} overflow-hidden transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${className}`}
      >
        {/* Blue accent border top */}
        <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-500" />

        <div className="py-6 px-6">
          <div className="flex flex-col gap-5">
            {/* Header section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <Building2 className="w-[18px] h-[18px] text-blue-700" />
                </div>
                <p className="text-base font-bold text-neutral-900">
                  Business Intelligence
                </p>
              </div>
              <Sparkles className="w-4 h-4 text-black/59" />
            </div>

            {/* Data sections */}
            <div className="flex flex-col gap-4">
              {/* Entity Details */}
              <div className="p-3 bg-neutral-300/50 rounded-lg border border-black/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-neutral-600 uppercase">
                    Entity Details
                  </p>
                </div>

                <div className="space-y-2.5">
                  {/* NAICS Code - Copyable */}
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-neutral-900 leading-normal">
                      <span className="text-neutral-600">NAICS:</span> 722511
                    </p>
                    <CopyButton text="722511" label="naics" />
                  </div>

                  {/* Incorporation - Copyable */}
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-neutral-900 leading-normal">
                      Incorporated DE 03/2019
                    </p>
                    <CopyButton text="Delaware - March 2019" label="incorporation" />
                  </div>

                  {/* Revenue */}
                  <p className="text-sm font-medium text-neutral-900 leading-normal">
                    <span className="text-neutral-600">Annual Revenue:</span> $1.2M
                  </p>

                  {/* Employees */}
                  <p className="text-sm font-medium text-neutral-900 leading-normal">
                    <span className="text-neutral-600">Employees:</span> 18
                  </p>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="p-3 bg-neutral-300/50 rounded-lg border border-black/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-neutral-600 uppercase">
                    Risk Factors
                  </p>
                  {/* Overall Risk Score */}
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 bg-black/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-amber-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: '25%' }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-neutral-700">Low</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                    <p className="text-sm font-medium text-neutral-900 leading-normal">
                      Civil Suit Filed 2022 (Settled)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0 mt-1.5" />
                    <p className="text-sm font-medium text-neutral-900 leading-normal">
                      No Liens
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Perplexity variant
  return (
    <div
      ref={cardRef}
      className={`bg-neutral-300 ${borderClass} ${roundedClass} ${shadowClass} overflow-hidden transition-all duration-200 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {/* Purple accent border top */}
      <div className="h-1 bg-gradient-to-r from-purple-600 to-mauve-700" />

      <div className="py-6 px-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Perplexity Icon with gradient background */}
            <div className="p-1.5 bg-gradient-to-br from-purple-100 to-mauve-100 rounded-lg">
              <svg aria-hidden="true" className="w-5 h-5 shrink-0" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  d="m23.566,1.398l-9.495,9.504h9.495V1.398v2.602V1.398Zm-9.496,9.504L4.574,1.398v9.504h9.496Zm-.021-10.902v36m9.517-15.596l-9.495-9.504v13.625l9.495,9.504v-13.625Zm-18.991,0l9.496-9.504v13.625l-9.496,9.504v-13.625ZM.5,10.9v13.57h4.074v-4.066l9.496-9.504H.5Zm13.57,0l9.495,9.504v4.066h4.075v-13.57h-13.57Z"
                  className="text-purple-700"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Perplexity Search
            </h3>
          </div>
          <Sparkles className="w-4 h-4 text-black/59" />
        </div>

        {/* Results Section */}
        <div className="space-y-3">
          {/* Result Item 1 */}
          <div className="p-3 bg-neutral-300/50 rounded-lg border border-black/5">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5" />
              <p className="text-sm font-medium text-purple-700 leading-normal cursor-pointer transition-all hover:text-purple-900 hover:underline">
                Emberline Bistro operates as a farm-to-table restaurant in Portland's Pearl District.
              </p>
            </div>
          </div>

          {/* Result Item 2 */}
          <div className="p-3 bg-neutral-300/50 rounded-lg border border-black/5">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5" />
              <p className="text-sm font-medium text-purple-700 leading-normal cursor-pointer transition-all hover:text-purple-900 hover:underline">
                Reviews indicate consistent 4.2-star ratings across Google and Yelp with 340+ reviews.
              </p>
            </div>
          </div>

          {/* Result Item 3 */}
          <div className="p-3 bg-neutral-300/50 rounded-lg border border-black/5">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5" />
              <p className="text-sm font-medium text-purple-700 leading-normal cursor-pointer transition-all hover:text-purple-900 hover:underline">
                Secretary of State records show Delaware incorporation in March 2019.
              </p>
            </div>
          </div>

          {/* Result Item 4 */}
          <div className="p-3 bg-neutral-300/50 rounded-lg border border-black/5">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5" />
              <p className="text-sm font-medium text-purple-700 leading-normal cursor-pointer transition-all hover:text-purple-900 hover:underline">
                Principal owner Sarah Chen (62% stake) has clean background with no bankruptcy history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
