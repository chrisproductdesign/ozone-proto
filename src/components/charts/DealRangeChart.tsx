import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Scenario = 'best' | 'conservative' | 'moderate';

// Mock data for different scenarios
const generateScenarioData = (scenario: Scenario) => {
  const dataPoints = 30;
  const data = [];

  for (let i = 0; i < dataPoints; i++) {
    const x = i / (dataPoints - 1);
    let base = 40;

    // Different curves for different scenarios
    switch (scenario) {
      case 'best':
        base = 40 + (x * 80) + Math.sin(x * 4) * 10;
        break;
      case 'conservative':
        base = 50 + (x * 40) + Math.sin(x * 3) * 8;
        break;
      case 'moderate':
        base = 45 + (x * 60) + Math.sin(x * 3.5) * 12;
        break;
    }

    data.push({
      index: i,
      value: Math.round(base),
      // Confidence band (upper and lower bounds)
      upper: Math.round(base + (20 - x * 5)),
      lower: Math.round(base - (15 - x * 3)),
    });
  }

  return data;
};

interface DealRangeChartProps {
  scenario?: Scenario;
}

export const DealRangeChart: React.FC<DealRangeChartProps> = ({ scenario = 'best' }) => {
  const data = generateScenarioData(scenario);

  return (
    <div className="w-full h-full">
      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Gradient for main area */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b7fd4" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#c7c0e8" stopOpacity={0.1} />
            </linearGradient>
            {/* Gradient for confidence band */}
            <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b5acd8" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#d9d4ec" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e8e2d9"
            opacity={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="index"
            tick={{ fill: '#89768a', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            hide
          />
          <YAxis
            tick={{ fill: '#89768a', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 160]}
            ticks={[0, 40, 80, 120, 160]}
            tickMargin={8}
            width={35}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '10px 14px',
            }}
            labelStyle={{
              color: '#594C56',
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 6,
            }}
            itemStyle={{
              fontSize: 12,
              color: '#89768a',
            }}
            formatter={(value: number) => [`${value}`, 'Predicted Value']}
            labelFormatter={(label: number) => `Day ${label + 1}`}
          />
          {/* Confidence band (upper bound) */}
          <Area
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="url(#confidenceBand)"
            fillOpacity={1}
            isAnimationActive={false}
          />
          {/* Main curve */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6b5fb5"
            strokeWidth={2.5}
            fill="url(#areaGradient)"
            fillOpacity={1}
            dot={false}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
