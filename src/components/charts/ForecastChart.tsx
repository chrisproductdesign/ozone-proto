import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data: Forecast projections with 3 scenarios
const generateMockData = () => {
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < 12; i++) {
    // Generate wavy patterns with different frequencies for visual interest
    const fundingBase = 80 + Math.sin(i / 2) * 20 + Math.sin(i / 1.5) * 10;
    const volumeBase = 65 + Math.cos(i / 2.5) * 15 + Math.sin(i / 1.2) * 12;
    const revenueBase = 90 + Math.sin(i / 1.8) * 18 + Math.cos(i / 2.2) * 8;

    data.push({
      month: months[i],
      funding: Math.round(fundingBase + Math.random() * 5),
      volume: Math.round(volumeBase + Math.random() * 5),
      revenue: Math.round(revenueBase + Math.random() * 5),
    });
  }

  return data;
};

export const ForecastChart: React.FC = () => {
  const data = generateMockData();

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          {/* Gradient for purple line */}
          <linearGradient id="purpleLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9b87f5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          {/* Gradient for pink line */}
          <linearGradient id="pinkLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5a3d0" />
            <stop offset="100%" stopColor="#e879b9" />
          </linearGradient>
          {/* Gradient for peach line */}
          <linearGradient id="peachLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffc4a3" />
            <stop offset="100%" stopColor="#ff9d6e" />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e8e2d9"
          opacity={0.5}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fill: '#89768a', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tick={{ fill: '#89768a', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          domain={[0, 120]}
          tickMargin={8}
          width={35}
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
        />
        <Legend
          iconType="line"
          wrapperStyle={{
            paddingTop: '12px',
            fontSize: '12px',
          }}
          iconSize={16}
        />
        <Line
          type="monotone"
          dataKey="funding"
          name="Funding"
          stroke="url(#purpleLine)"
          strokeWidth={2.5}
          dot={false}
          animationDuration={1200}
        />
        <Line
          type="monotone"
          dataKey="volume"
          name="Volume"
          stroke="url(#pinkLine)"
          strokeWidth={2.5}
          dot={false}
          animationDuration={1200}
          animationBegin={100}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="url(#peachLine)"
          strokeWidth={2.5}
          dot={false}
          animationDuration={1200}
          animationBegin={200}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
