import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Scenario = 'best' | 'conservative' | 'moderate';

// Generate payment curve data showing cyclical patterns and stress points
const generatePaymentData = (scenario: Scenario) => {
  const dataPoints = 30;
  const data = [];

  for (let i = 0; i < dataPoints; i++) {
    const x = i / (dataPoints - 1);

    let expectedBase = 80;
    let earlyPayoffBase = 60;
    let defaultRiskBase = 70;

    // Adjust curves based on scenario
    switch (scenario) {
      case 'best':
        expectedBase = 90 + Math.sin(x * Math.PI * 3) * 25 + (1 - x) * 15;
        earlyPayoffBase = 70 + Math.sin(x * Math.PI * 4 + Math.PI / 4) * 35 + (x < 0.6 ? 25 * (1 - x) : -15);
        defaultRiskBase = 80 + Math.cos(x * Math.PI * 2.5) * 30 + (x > 0.7 ? -35 * (x - 0.7) : 0);
        break;
      case 'conservative':
        expectedBase = 70 + Math.sin(x * Math.PI * 3) * 20 + (1 - x) * 15;
        earlyPayoffBase = 50 + Math.sin(x * Math.PI * 4 + Math.PI / 4) * 30 + (x < 0.6 ? 20 * (1 - x) : -15);
        defaultRiskBase = 60 + Math.cos(x * Math.PI * 2.5) * 25 + (x > 0.7 ? -30 * (x - 0.7) : 0);
        break;
      case 'moderate':
        expectedBase = 80 + Math.sin(x * Math.PI * 3) * 30 + (1 - x) * 20;
        earlyPayoffBase = 60 + Math.sin(x * Math.PI * 4 + Math.PI / 4) * 40 + (x < 0.6 ? 30 * (1 - x) : -20);
        defaultRiskBase = 70 + Math.cos(x * Math.PI * 2.5) * 35 + (x > 0.7 ? -40 * (x - 0.7) : 0);
        break;
    }

    data.push({
      index: i,
      label: `D${i + 1}`,
      expected: Math.max(10, Math.round(expectedBase)),
      earlyPayoff: Math.max(5, Math.round(earlyPayoffBase)),
      defaultRisk: Math.max(15, Math.round(defaultRiskBase)),
    });
  }

  return data;
};

interface PaymentCurveChartProps {
  scenario?: Scenario;
}

export const PaymentCurveChart: React.FC<PaymentCurveChartProps> = ({ scenario = 'best' }) => {
  const data = generatePaymentData(scenario);

  // Format Y-axis to show k values
  const formatYAxis = (value: number) => {
    return `${Math.round(value)}k`;
  };

  return (
    <div className="w-full h-full">
      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Gradient for expected payments line */}
            <linearGradient id="expectedLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4a7fc1" />
              <stop offset="100%" stopColor="#3d6aa3" />
            </linearGradient>
            {/* Gradient for early payoff line */}
            <linearGradient id="earlyPayoffLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d4478f" />
              <stop offset="100%" stopColor="#b83878" />
            </linearGradient>
            {/* Gradient for default risk line */}
            <linearGradient id="defaultRiskLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2d5a8a" />
              <stop offset="100%" stopColor="#1e4060" />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e8e2d9"
            opacity={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: '#89768a', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={4}
          />
          <YAxis
            tick={{ fill: '#89768a', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 140]}
            ticks={[0, 40, 80, 120, 140]}
            tickMargin={8}
            tickFormatter={formatYAxis}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '8px 12px',
            }}
            labelStyle={{
              color: '#594C56',
              fontWeight: 600,
              fontSize: 12,
              marginBottom: 4,
            }}
            itemStyle={{
              fontSize: 12,
            }}
            formatter={(value: number) => [`${value}k`, '']}
          />
          {/* Expected payments line */}
          <Line
            type="linear"
            dataKey="expected"
            name="Expected"
            stroke="url(#expectedLine)"
            strokeWidth={2}
            dot={false}
            animationDuration={1200}
          />
          {/* Early payoff line */}
          <Line
            type="linear"
            dataKey="earlyPayoff"
            name="Early Payoff"
            stroke="url(#earlyPayoffLine)"
            strokeWidth={2}
            dot={false}
            animationDuration={1200}
            animationBegin={100}
          />
          {/* Default risk line */}
          <Line
            type="linear"
            dataKey="defaultRisk"
            name="Default Risk"
            stroke="url(#defaultRiskLine)"
            strokeWidth={2}
            dot={false}
            animationDuration={1200}
            animationBegin={200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
