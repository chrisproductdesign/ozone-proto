import React, { useState, useMemo } from 'react';

// Industry and region definitions
const INDUSTRIES = ['Healthcare', 'Technology', 'Retail', 'Manufacturing', 'Finance'];
const REGIONS = ['West', 'East', 'South', 'North', 'Intl'];

// Risk levels and corresponding colors (blue palette from Figma design)
type RiskLevel = 'low' | 'medium' | 'high';

const RISK_COLORS: Record<RiskLevel, string> = {
  low: '#d1e0ff',      // Light blue
  medium: '#528bff',   // Medium blue
  high: '#00359e',     // Dark blue
};

// Generate mock heatmap data
const generateHeatmapData = () => {
  const data: {
    industry: string;
    region: string;
    exposure: number;
    dealCount: number;
    risk: RiskLevel;
  }[] = [];

  INDUSTRIES.forEach((industry) => {
    REGIONS.forEach((region) => {
      // Generate random exposure between 50k and 800k
      const exposure = Math.floor(Math.random() * 750000) + 50000;
      const dealCount = Math.floor(Math.random() * 12) + 1;

      // Determine risk level based on exposure
      let risk: RiskLevel;
      if (exposure > 500000) risk = 'high';
      else if (exposure > 250000) risk = 'medium';
      else risk = 'low';

      data.push({
        industry,
        region,
        exposure,
        dealCount,
        risk,
      });
    });
  });

  return data;
};

export const IndustryRegionHeatmap: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const data = useMemo(() => generateHeatmapData(), []);

  // Get cell data for a specific industry/region
  const getCellData = (industry: string, region: string) => {
    return data.find((d) => d.industry === industry && d.region === region);
  };

  // Handle cell hover
  const handleCellHover = (
    industry: string,
    region: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const cellData = getCellData(industry, region);

    setHoveredCell(`${industry}-${region}`);
    setTooltipData(cellData);
    setTooltipPos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Handle mouse move to update tooltip position
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredCell) {
      setTooltipPos({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
    setTooltipData(null);
  };

  return (
    <div className="h-[320px] flex flex-col justify-between">
      {/* Heatmap Grid */}
      <div className="relative flex-1">
        <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-1">
          {/* Header row - empty top-left cell + region names */}
          <div className=""></div>
          {REGIONS.map((region) => (
            <div
              key={region}
              className="text-center text-xs font-medium text-neutral-600 py-2"
            >
              {region}
            </div>
          ))}

          {/* Data rows */}
          {INDUSTRIES.map((industry) => (
            <React.Fragment key={industry}>
              {/* Industry label */}
              <div className="flex items-center text-xs font-medium text-neutral-600 py-1">
                {industry}
              </div>

              {/* Region cells */}
              {REGIONS.map((region) => {
                const cellData = getCellData(industry, region);
                const cellKey = `${industry}-${region}`;
                const isHovered = hoveredCell === cellKey;

                return (
                  <div
                    key={cellKey}
                    onMouseEnter={(e) => handleCellHover(industry, region, e)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleCellLeave}
                    style={{
                      backgroundColor: cellData ? RISK_COLORS[cellData.risk] : '#f5f5f5',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      zIndex: isHovered ? 10 : 1,
                    }}
                    className="relative h-[48px] rounded cursor-pointer transition-all duration-150 flex items-center justify-center border border-white"
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Oval Tooltip - follows cursor */}
        {tooltipData && (
          <div
            style={{
              position: 'fixed',
              left: tooltipPos.x + 12,
              top: tooltipPos.y + 12,
              zIndex: 1000,
              pointerEvents: 'none',
            }}
            className="animate-in fade-in duration-100"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-black/5">
              <p className="text-xs font-semibold text-neutral-900 whitespace-nowrap">
                ${(tooltipData.exposure / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <span className="text-xs text-neutral-600">Risk Level:</span>
        {Object.entries(RISK_COLORS).map(([level, color]) => (
          <div key={level} className="flex items-center gap-2">
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '2px',
                backgroundColor: color,
              }}
            />
            <span className="text-xs text-neutral-600 capitalize">{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
