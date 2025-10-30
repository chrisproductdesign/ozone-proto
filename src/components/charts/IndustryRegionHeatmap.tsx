import React, { useState } from 'react';

// Industry and region definitions
const INDUSTRIES = ['Healthcare', 'Technology', 'Retail', 'Manufacturing', 'Finance'];
const REGIONS = ['West', 'East', 'South', 'Midwest', 'Intl'];

// Risk levels and corresponding colors
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

const RISK_COLORS: Record<RiskLevel, string> = {
  low: '#e9d5ff',      // Light purple
  medium: '#a78bfa',   // Medium purple
  high: '#fbbf24',     // Amber
  critical: '#ef4444', // Red
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
      if (exposure > 600000) risk = 'critical';
      else if (exposure > 400000) risk = 'high';
      else if (exposure > 200000) risk = 'medium';
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

  const data = generateHeatmapData();

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
    const rect = event.currentTarget.getBoundingClientRect();

    setHoveredCell(`${industry}-${region}`);
    setTooltipData(cellData);
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
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
                    onMouseLeave={handleCellLeave}
                    style={{
                      backgroundColor: cellData ? RISK_COLORS[cellData.risk] : '#f5f5f5',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      zIndex: isHovered ? 10 : 1,
                    }}
                    className="relative h-[46px] rounded cursor-pointer transition-all duration-150 flex items-center justify-center border border-white"
                  >
                    {/* Optional: Show exposure value in cell */}
                    {cellData && (
                      <span className="text-[10px] font-medium text-neutral-700">
                        {Math.round(cellData.exposure / 1000)}k
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Tooltip */}
        {tooltipData && (
          <div
            style={{
              position: 'fixed',
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translate(-50%, -100%)',
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '12px',
                minWidth: '140px',
              }}
            >
              <p
                style={{
                  color: '#594C56',
                  fontWeight: 600,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                {tooltipData.industry} - {tooltipData.region}
              </p>
              <p style={{ fontSize: 11, color: '#89768a', margin: '2px 0' }}>
                Exposure: ${(tooltipData.exposure / 1000).toFixed(0)}k
              </p>
              <p style={{ fontSize: 11, color: '#89768a', margin: '2px 0' }}>
                Deals: {tooltipData.dealCount}
              </p>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  marginTop: 4,
                  color: RISK_COLORS[tooltipData.risk as RiskLevel],
                  textTransform: 'capitalize',
                }}
              >
                {tooltipData.risk} Risk
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
