import React, { useState, useEffect } from 'react';
import { classNames } from '@/lib/classNames';

interface RiskInput {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  unit?: '%' | '$' | '';
}

interface ScoreCardWithInputsProps {
  title?: string;
  score: number;
  description?: string;
  status?: 'high' | 'medium' | 'low';
  initialInputs?: RiskInput[];
  className?: string;
}

const getRiskLevel = (value: number): { label: string; color: string; percentage: number } => {
  // Normalize value to 0-100 scale
  const normalized = Math.min(100, Math.max(0, value));

  if (normalized >= 90) {
    return { label: 'No risk', color: '#10B981', percentage: 100 };
  } else if (normalized >= 75) {
    return { label: 'Very low risk', color: '#10B981', percentage: 95 };
  } else if (normalized >= 60) {
    return { label: 'Low risk', color: '#F59E0B', percentage: 75 };
  } else if (normalized >= 40) {
    return { label: 'Moderate risk', color: '#FB923C', percentage: 50 };
  } else if (normalized >= 20) {
    return { label: 'High risk', color: '#EF4444', percentage: 30 };
  } else {
    return { label: 'Very high risk', color: '#DC2626', percentage: 10 };
  }
};

export const ScoreCardWithInputs: React.FC<ScoreCardWithInputsProps> = ({
  title = 'COMPOSITE SCORE',
  score,
  description = 'Strong revenue predictability',
  status = 'high',
  initialInputs = [
    { id: '1', label: 'Revenue Growth', value: '85', unit: '%' },
    { id: '2', label: 'Customer Retention', value: '92', unit: '%' },
    { id: '3', label: 'Churn Rate', value: '8', unit: '%' },
    { id: '4', label: 'Average Deal Size', value: '45000', unit: '$' },
    { id: '5', label: 'Win Rate', value: '32', unit: '%' },
    { id: '6', label: 'Sales Cycle', value: '45', unit: '' },
    { id: '7', label: 'Pipeline Coverage', value: '75', unit: '%' }
  ],
  className
}) => {
  const [inputs, setInputs] = useState(initialInputs);

  const handleInputChange = (id: string, newValue: string) => {
    // Only allow numbers
    const numericValue = newValue.replace(/[^0-9.]/g, '');
    setInputs(prev =>
      prev.map(input =>
        input.id === id ? { ...input, value: numericValue } : input
      )
    );
  };

  const statusColors = {
    high: 'text-teal-700',
    medium: 'text-yellow-700',
    low: 'text-red-700'
  };

  const statusLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };

  return (
    <div className={classNames(
      'bg-base rounded-2xl p-5 shadow-sm',
      'flex flex-col',
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xs font-medium text-muted tracking-wide uppercase mb-2">
            {title}
          </h3>
          <div className="text-7xl font-bold mb-2 text-emphasis">
            {score.toFixed(2)}
          </div>
          {description && (
            <p className="text-muted text-base">
              {description}
            </p>
          )}
        </div>
        {status && (
          <span className={classNames(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
            statusColors[status]
          )} style={{ backgroundColor: '#D0F5ED' }}>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12 L12 4 M12 4 L12 10 M12 4 L6 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {statusLabels[status]}
          </span>
        )}
      </div>

      {/* Risk Inputs */}
      <div className="mt-6 space-y-3">
        {inputs.map((input) => {
          const numericValue = parseFloat(input.value) || 0;
          const riskLevel = getRiskLevel(numericValue);

          return (
            <div key={input.id} className="flex items-center gap-2">
              {/* Input Field */}
              <div className="w-16">
                <input
                  type="text"
                  value={input.value}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  placeholder={input.placeholder || 'Input value'}
                  className="w-full px-2 py-1 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-500 text-primary"
                  aria-label={input.label}
                />
              </div>

              {/* Progress Bar */}
              <div className="flex-1 relative">
                <div className="h-5 bg-neutral-100 rounded-sm overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 rounded-sm"
                    style={{
                      width: `${riskLevel.percentage}%`,
                      backgroundColor: riskLevel.color
                    }}
                  />
                </div>
              </div>

              {/* Risk Label */}
              <div className="w-28 text-right">
                <span className="text-xs font-medium text-primary">
                  {riskLevel.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};