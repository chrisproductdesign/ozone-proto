import React, { useState } from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';
import { IndustryRegionHeatmap } from './IndustryRegionHeatmap';
import { DealSizeDonutChart } from './DealSizeDonutChart';
import { LossExposureChart } from './LossExposureChart';

type MetricType = 'industry' | 'funding-amount' | 'tib' | 'region';
type ViewType = 'scatter' | 'pie';

interface PortfolioRiskCardProps {
  defaultMetric?: MetricType;
  defaultView?: ViewType;
}

const METRIC_OPTIONS = [
  { value: 'industry', label: 'Industry' },
  { value: 'funding-amount', label: 'Funding Amount' },
  { value: 'tib', label: 'TIB' },
  { value: 'region', label: 'Region' },
] as const;

export const PortfolioRiskCard: React.FC<PortfolioRiskCardProps> = ({
  defaultMetric = 'industry',
  defaultView = 'scatter',
}) => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>(defaultMetric);
  const [selectedView, setSelectedView] = useState<ViewType>(defaultView);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleMetricChange = (metric: MetricType) => {
    setIsDropdownOpen(false);

    // Show "coming soon" toast for TIB and Region
    if (metric === 'tib' || metric === 'region') {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setSelectedMetric(metric);
  };

  const getCurrentMetricLabel = () => {
    return METRIC_OPTIONS.find((opt) => opt.value === selectedMetric)?.label.toUpperCase() || 'INDUSTRY';
  };

  // Determine what content to show based on selected metric and view
  const renderContent = () => {
    if (selectedMetric === 'industry') {
      return <IndustryRegionHeatmap />;
    }

    if (selectedMetric === 'funding-amount') {
      return <DealSizeDonutChart layout="horizontal" />;
    }

    return null;
  };

  return (
    <>
      {/* Semi-transparent white outer container */}
      <div className="bg-white/40 rounded-lg p-6 flex flex-col gap-3">
        {/* Header row: title on left, segmented control on right */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Icon + Title */}
          <div className="flex gap-1 items-center">
            {/* Icon container */}
            <div className="rounded-lg p-2">
              <BarChart3 className="w-6 h-6 text-black/70" />
            </div>
            <p className="text-[20px] font-medium leading-[2] text-black/70">
              Portfolio risk
            </p>
          </div>

          {/* Right: Segmented control (Scatter/Pie) */}
          <div className="flex items-center h-6 rounded bg-gradient-to-r from-[rgba(0,0,51,0.058824)] to-[rgba(0,0,51,0.058824)] bg-[rgba(255,255,255,0.9)]">
            <button
              onClick={() => setSelectedView('scatter')}
              className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded ${
                selectedView === 'scatter'
                  ? 'bg-white border border-black/9 font-medium text-black/87'
                  : 'bg-transparent font-normal text-black/87'
              }`}
            >
              Scatter
            </button>
            <button
              onClick={() => setSelectedView('pie')}
              className={`h-full px-3 text-xs tracking-[0.04px] leading-4 transition-all rounded ${
                selectedView === 'pie'
                  ? 'bg-white border border-black/9 font-medium text-black/87'
                  : 'bg-transparent font-normal text-black/87'
              }`}
            >
              Pie
            </button>
          </div>
        </div>

        {/* Inner beige card with dropdown + content */}
        <div className="bg-[#faf8f5] rounded-lg px-[24px] py-[32px] flex flex-col gap-[10px]">
          {/* Dropdown at top of inner container */}
          <div className="relative w-fit">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-[2px] px-0 py-0 text-sm font-semibold text-[#594c56] uppercase tracking-[0.28px] hover:bg-black/5 rounded transition-colors"
            >
              {getCurrentMetricLabel()}
              <ChevronDown className="w-6 h-6" />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-black/10 py-1 z-50 min-w-[160px]">
                {METRIC_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleMetricChange(option.value as MetricType)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-black/5 transition-colors ${
                      selectedMetric === option.value ? 'bg-black/5 font-medium' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chart content */}
          {renderContent()}
        </div>

        {/* Loss Exposure Analysis Card */}
        <div className="bg-[#faf8f5] rounded-lg px-[24px] py-[32px] flex flex-col gap-[24px]">
          <p className="text-sm font-semibold text-[#594c56] tracking-[0.28px] uppercase">
            Loss Exposure Analysis
          </p>
          <div className="h-[367px]">
            <LossExposureChart height={367} />
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-4 py-3 rounded-lg shadow-lg z-[9999] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="text-sm font-medium">Coming soon</p>
        </div>
      )}
    </>
  );
};
