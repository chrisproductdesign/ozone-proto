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

// Mock data: 30 days of offer history
const generateMockData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 29);

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Generate realistic fluctuating values
    const baseValue = 75000;
    const variation = Math.sin(i / 3) * 15000 + Math.random() * 8000;
    const value = baseValue + variation;

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value),
    });
  }

  return data;
};

export const OfferHistoryChart: React.FC = () => {
  const data = generateMockData();

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="offerGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9b87f5" stopOpacity={0.8} />
            <stop offset="50%" stopColor="#b5a3f5" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#d4c5f9" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e8e2d9"
          opacity={0.5}
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fill: '#89768a', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
          tickMargin={8}
        />
        <YAxis
          tick={{ fill: '#89768a', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          width={45}
          tickMargin={8}
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
            color: '#89768a',
            fontSize: 12,
          }}
          formatter={(value: number) => [
            `$${value.toLocaleString()}`,
            'Offer Amount',
          ]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#7c3aed"
          strokeWidth={2}
          fill="url(#offerGradient)"
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
