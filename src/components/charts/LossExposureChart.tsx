import { AlertTriangle } from 'lucide-react';
import React, { useMemo } from 'react';
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
  height?: number;
}

export const LossExposureChart: React.FC<LossExposureChartProps> = ({
  height = 280,
}) => {
  const data = useMemo(() => generateStressData(), []);

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
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: -5 }}
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
            tick={false}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0, 300]}
            tick={{ fill: '#809fb8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />

          <Tooltip content={<CustomTooltip />} />

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

      {/* Risk Callouts */}
      <div
        className="absolute top-[20px] right-[80px] flex items-center gap-2 pointer-events-auto cursor-help"
        title="Tariffs"
      >
        <AlertTriangle className="w-4 h-4 text-red-600" />
        <div className="bg-red-50 border border-red-200 rounded-full px-3 py-1">
          <p className="text-xs font-semibold text-red-700">High Risk: $285K</p>
        </div>
      </div>

      <div
        className="absolute top-[120px] left-[50%] -translate-x-1/2 flex items-center gap-2 pointer-events-auto cursor-help"
        title="Supply Chain"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        <div className="bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
          <p className="text-xs font-semibold text-amber-700">Moderate Risk</p>
        </div>
      </div>
    </div>
  );
};
