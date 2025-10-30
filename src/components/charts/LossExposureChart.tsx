import React from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';

interface StressScenarioData {
  scenario: string;
  label: string;
  baselineExposure: number;
  moderateExposure: number;
  severeExposure: number;
  riskScore: number;
  flaggedDeals: number;
}

// Generate mock stress scenario data
const generateStressData = (): StressScenarioData[] => {
  return [
    {
      scenario: 'current',
      label: 'Current',
      baselineExposure: 125,
      moderateExposure: 0,
      severeExposure: 0,
      riskScore: 35,
      flaggedDeals: 2,
    },
    {
      scenario: 'supply-chain',
      label: 'Supply Chain',
      baselineExposure: 125,
      moderateExposure: 60,
      severeExposure: 0,
      riskScore: 62,
      flaggedDeals: 8,
    },
    {
      scenario: 'tariffs',
      label: 'Tariffs',
      baselineExposure: 125,
      moderateExposure: 60,
      severeExposure: 100,
      riskScore: 88,
      flaggedDeals: 15,
    },
  ];
};

interface LossExposureChartProps {
  exposureLimit?: number;
  showThresholdLine?: boolean;
  height?: number;
}

export const LossExposureChart: React.FC<LossExposureChartProps> = ({
  exposureLimit = 300,
  showThresholdLine = true,
  height = 280,
}) => {
  const data = generateStressData();

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = data.find((d) => d.label === label);
      if (!dataPoint) return null;

      const totalExposure =
        dataPoint.baselineExposure +
        dataPoint.moderateExposure +
        dataPoint.severeExposure;

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
              marginBottom: 6,
            }}
          >
            {label}
          </p>
          <p style={{ fontSize: 11, color: '#89768a', margin: '2px 0' }}>
            Total Exposure: ${totalExposure}K
          </p>
          <p style={{ fontSize: 11, color: '#89768a', margin: '2px 0' }}>
            Risk Score: {dataPoint.riskScore}/100
          </p>
          <p style={{ fontSize: 11, color: '#89768a', margin: '2px 0' }}>
            Flagged Deals: {dataPoint.flaggedDeals}
          </p>
          {totalExposure > exposureLimit && (
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                marginTop: 4,
                color: '#dc2626',
              }}
            >
              ⚠ Exceeds limit
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="flex flex-wrap gap-4 justify-center mt-4">
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
        {showThresholdLine && (
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 12,
                height: 2,
                backgroundColor: '#dc2626',
                borderTop: '2px dashed #dc2626',
              }}
            />
            <span className="text-xs text-neutral-600">Exposure Limit</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#16a34a" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="moderateGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="severeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#dc2626" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e8e2d9"
          opacity={0.5}
        />

        <XAxis
          dataKey="label"
          tick={{ fill: '#89768a', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis
          tick={{ fill: '#89768a', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={{
            value: 'Exposure ($K)',
            angle: -90,
            position: 'insideLeft',
            style: { fill: '#89768a', fontSize: 11 },
          }}
        />

        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />

        {showThresholdLine && (
          <ReferenceLine
            y={exposureLimit}
            stroke="#dc2626"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: `Limit: $${exposureLimit}K`,
              position: 'right',
              fill: '#dc2626',
              fontSize: 10,
            }}
          />
        )}

        <Area
          type="monotone"
          dataKey="baselineExposure"
          stackId="1"
          stroke="#16a34a"
          fill="url(#baselineGradient)"
          name="Baseline"
        />

        <Area
          type="monotone"
          dataKey="moderateExposure"
          stackId="1"
          stroke="#f59e0b"
          fill="url(#moderateGradient)"
          name="Moderate Stress"
        />

        <Area
          type="monotone"
          dataKey="severeExposure"
          stackId="1"
          stroke="#dc2626"
          fill="url(#severeGradient)"
          name="Severe Stress"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
