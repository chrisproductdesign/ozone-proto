import React, { useState } from 'react';
import { ToggleGroup } from '@/components/toggle';
import { IndustryRegionHeatmap } from './IndustryRegionHeatmap';
import { DealSizeDonutChart } from './DealSizeDonutChart';

interface PortfolioRiskCardProps {
  defaultView?: 'heatmap' | 'donut';
  onViewChange?: (view: 'heatmap' | 'donut') => void;
}

export const PortfolioRiskCard: React.FC<PortfolioRiskCardProps> = ({
  defaultView = 'donut',
  onViewChange,
}) => {
  const [activeView, setActiveView] = useState<'heatmap' | 'donut'>(defaultView);

  const handleViewChange = (view: string) => {
    const newView = view as 'heatmap' | 'donut';
    setActiveView(newView);
    onViewChange?.(newView);
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      {/* Header with Toggle */}
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-sm font-medium text-neutral-700">Portfolio Risk</h3>

        {/* Toggle control */}
        <ToggleGroup.Root value={activeView} onValueChange={handleViewChange}>
          <ToggleGroup.Item value="donut">Deal Size</ToggleGroup.Item>
          <ToggleGroup.Item value="heatmap">Industry × Region</ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>

      {/* Chart content with consistent min-height */}
      <div className="min-h-[320px]">
        {activeView === 'heatmap' ? (
          <IndustryRegionHeatmap />
        ) : (
          <DealSizeDonutChart layout="horizontal" />
        )}
      </div>
    </div>
  );
};
