import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

// Risk levels and corresponding colors (matching heatmap)
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

const RISK_COLORS: Record<RiskLevel, string> = {
  low: '#4ade80',      // Green - low risk
  medium: '#fbbf24',   // Amber - medium risk
  high: '#fb923c',     // Orange - high risk
  critical: '#ef4444', // Red - critical risk
};

// Deal size buckets with risk assessment (deals capped at 100k max)
// Risk increases with deal size: $10K = low risk, $100K = critical risk
const generateDealSizeData = () => {
  return [
    {
      name: '$10K-$25K',
      value: 350000,
      dealCount: 18,
      risk: 'critical' as RiskLevel,
      color: RISK_COLORS.critical,
      riskLabel: 'Critical Risk'
    },
    {
      name: '$25K-$50K',
      value: 520000,
      dealCount: 14,
      risk: 'high' as RiskLevel,
      color: RISK_COLORS.high,
      riskLabel: 'High Risk'
    },
    {
      name: '$50K-$75K',
      value: 680000,
      dealCount: 11,
      risk: 'medium' as RiskLevel,
      color: RISK_COLORS.medium,
      riskLabel: 'Medium Risk'
    },
    {
      name: '$75K-$100K',
      value: 890000,
      dealCount: 10,
      risk: 'low' as RiskLevel,
      color: RISK_COLORS.low,
      riskLabel: 'Low Risk'
    },
  ];
};

interface DealSizeDonutChartProps {
  layout?: 'vertical' | 'horizontal';
}

export const DealSizeDonutChart: React.FC<DealSizeDonutChartProps> = ({
  layout = 'vertical',
}) => {
  const data = generateDealSizeData();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.value / total) * 100).toFixed(1);

      return (
        <div
          style={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '12px',
          }}
        >
          <p
            style={{
              color: '#594C56',
              fontWeight: 600,
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            {item.name}
          </p>
          <p style={{ fontSize: 12, color: '#89768a', margin: '2px 0' }}>
            Value: ${(item.value / 1000).toFixed(0)}k
          </p>
          <p style={{ fontSize: 12, color: '#89768a', margin: '2px 0' }}>
            Deals: {item.dealCount}
          </p>
          <p style={{ fontSize: 12, color: '#89768a', margin: '2px 0' }}>
            {percentage}% of portfolio
          </p>
          <p style={{ fontSize: 12, color: item.color, fontWeight: 600, marginTop: 4 }}>
            {item.riskLabel}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend for vertical layout
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '2px',
                backgroundColor: entry.color,
              }}
            />
            <span className="text-xs text-neutral-600">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Legend items component
  const LegendItems = () => (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <div key={`legend-h-${index}`} className="flex items-start gap-3">
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '2px',
              backgroundColor: item.color,
              marginTop: 4,
            }}
          />
          <div>
            <p className="text-base font-semibold text-neutral-700">
              ${(item.value / 1000).toFixed(0)}K
            </p>
            <p className="text-sm text-neutral-600">
              {item.name} • {item.dealCount} deals
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // Summary Stats component
  const SummaryStats = () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-base font-semibold text-neutral-700">
          ${(total / 1000000).toFixed(2)}M
        </p>
        <p className="text-sm text-neutral-600">Total Portfolio</p>
      </div>
      <div>
        <p className="text-base font-semibold text-neutral-700">
          {data.reduce((sum, item) => sum + item.dealCount, 0)}
        </p>
        <p className="text-sm text-neutral-600">Active Deals</p>
      </div>
    </div>
  );

  // Vertical layout (original)
  if (layout === 'vertical') {
    return (
      <div className="flex flex-col h-full">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="55%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>

        {/* Summary Stats */}
        <div className="flex items-center justify-center gap-6 mt-auto pb-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-neutral-700">
              ${(total / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-neutral-500">Total Portfolio</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-neutral-700">
              {data.reduce((sum, item) => sum + item.dealCount, 0)}
            </p>
            <p className="text-xs text-neutral-500">Active Deals</p>
          </div>
        </div>
      </div>
    );
  }

  // Horizontal layout (chart left, legend middle, stats right)
  return (
    <div className="flex flex-row items-center justify-center gap-16 h-[320px] px-4">
      {/* Chart on left */}
      <div className="flex-shrink-0 w-[260px] h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend items in middle */}
      <div className="flex-shrink-0">
        <LegendItems />
      </div>

      {/* Summary stats on right */}
      <div className="flex-shrink-0">
        <SummaryStats />
      </div>
    </div>
  );
};
