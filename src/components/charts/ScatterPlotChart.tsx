import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  BarChart,
  Bar,
  ReferenceArea,
  Cell,
} from 'recharts';

export type XAxisMetric = 'industry' | 'tib' | 'region' | 'fundingAmount';

interface DealDataPoint {
  industry: string;
  tib: number;
  region: string;
  fundingAmount: number;
  moic: number;
  dealSize: number;
  isCurrentDeal?: boolean;
}

interface ScatterPlotChartProps {
  variant?: 'marketplace' | 'funder';
  xAxisMetric?: XAxisMetric;
  currentDealData?: {
    fundingAmount?: number;
    moic?: number;
  };
}

// Categorical data pools
const INDUSTRIES = ['Restaurant', 'Retail', 'Healthcare', 'Construction', 'Technology', 'Manufacturing'];
const REGIONS = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West Coast'];

// Seeded random number generator for consistent data
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Generate scatter plot data for marketplace (external market)
const generateMarketplaceData = (): DealDataPoint[] => {
  const data: DealDataPoint[] = [];
  const random = seededRandom(12345); // Fixed seed for consistent data

  // Generate 38 data points - broader market representation
  for (let i = 0; i < 38; i++) {
    const moic = 1.00 + random() * 0.55; // MOIC between 1.00 and 1.55 (wider range, lower floor)
    const fundingAmount = 5000 + random() * 95000; // $5K-$100K (includes smaller deals)
    const tib = 25000 + random() * 575000; // $25K-$600K (wider range)
    const industry = INDUSTRIES[Math.floor(random() * INDUSTRIES.length)];
    const region = REGIONS[Math.floor(random() * REGIONS.length)];
    const dealSize = 30 + random() * 170; // 30-200 (wider variation)

    data.push({
      industry,
      tib,
      region,
      fundingAmount,
      moic,
      dealSize,
    });
  }
  return data;
};

// Generate scatter plot data for funder portfolio (internal portfolio)
const generateFunderData = (): DealDataPoint[] => {
  const data: DealDataPoint[] = [];
  const random = seededRandom(54321); // Different seed for funder data

  // Preferred investment categories (strategic focus)
  const preferredIndustries = ['Restaurant', 'Retail', 'Healthcare'];
  const otherIndustries = ['Technology', 'Construction', 'Manufacturing'];
  const preferredRegions = ['West Coast', 'Northeast'];
  const otherRegions = ['Southeast', 'Midwest', 'Southwest'];

  // Generate 20 data points - curated portfolio
  for (let i = 0; i < 20; i++) {
    const moic = 1.25 + random() * 0.25; // MOIC between 1.25 and 1.50 (higher floor = better performance)
    const fundingAmount = 15000 + random() * 70000; // $15K-$85K (focused range)
    const tib = 75000 + random() * 375000; // $75K-$450K (established businesses)

    // 80% chance of selecting from preferred industries (stronger concentration)
    const usePreferredIndustry = random() < 0.8;
    const industryPool = usePreferredIndustry ? preferredIndustries : otherIndustries;
    const industry = industryPool[Math.floor(random() * industryPool.length)];

    // 85% chance of selecting from preferred regions (stronger concentration)
    const usePreferredRegion = random() < 0.85;
    const regionPool = usePreferredRegion ? preferredRegions : otherRegions;
    const region = regionPool[Math.floor(random() * regionPool.length)];

    const dealSize = 60 + random() * 120; // 60-180 (more consistent sizing)

    data.push({
      industry,
      tib,
      region,
      fundingAmount,
      moic,
      dealSize,
    });
  }
  return data;
};

// Calculate percentiles for a given dataset
const calculatePercentiles = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const getPercentile = (p: number) => {
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  return {
    p25: getPercentile(25),
    p50: getPercentile(50),
    p75: getPercentile(75),
  };
};

// Format currency values
const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
};

export const ScatterPlotChart: React.FC<ScatterPlotChartProps> = ({
  variant = 'marketplace',
  xAxisMetric = 'fundingAmount',
  currentDealData
}) => {
  // Generate base data and mark current deal
  const rawData = useMemo(() => {
    const baseData = variant === 'marketplace'
      ? generateMarketplaceData()
      : generateFunderData();

    // Mark current deal if provided
    if (currentDealData?.fundingAmount && currentDealData?.moic) {
      baseData.push({
        industry: 'Technology', // Default for current deal
        tib: currentDealData.fundingAmount * 2,
        region: 'West Coast',
        fundingAmount: currentDealData.fundingAmount,
        moic: currentDealData.moic,
        dealSize: 150, // Larger bubble for visibility
        isCurrentDeal: true,
      });
    }

    return baseData;
  }, [variant, currentDealData]);

  // Calculate MOIC percentiles
  const percentiles = useMemo(() => {
    const moicValues = rawData.map(d => d.moic);
    return calculatePercentiles(moicValues);
  }, [rawData]);

  // Determine if we should use categorical (bar) or continuous (scatter) chart
  const isCategorical = xAxisMetric === 'industry' || xAxisMetric === 'region';

  // Prepare data based on chart type
  const chartData = useMemo(() => {
    if (!isCategorical) {
      // For scatter plot: map data to x/y/z coordinates
      return rawData.map(d => ({
        ...d,
        x: xAxisMetric === 'fundingAmount' ? d.fundingAmount : d.tib,
        y: d.moic,
        z: d.dealSize,
      }));
    } else {
      // For bar chart: aggregate by category
      const categoryKey = xAxisMetric;
      const grouped = rawData.reduce((acc, d) => {
        const category = d[categoryKey];
        if (!acc[category]) {
          acc[category] = { count: 0, totalMoic: 0, deals: [] };
        }
        acc[category].count++;
        acc[category].totalMoic += d.moic;
        acc[category].deals.push(d);
        return acc;
      }, {} as Record<string, { count: number; totalMoic: number; deals: DealDataPoint[] }>);

      return Object.entries(grouped).map(([category, data]) => ({
        category,
        avgMoic: data.totalMoic / data.count,
        count: data.count,
        hasCurrentDeal: data.deals.some(d => d.isCurrentDeal),
      }));
    }
  }, [rawData, xAxisMetric, isCategorical]);

  // Get x-axis configuration
  const xAxisConfig = useMemo(() => {
    switch (xAxisMetric) {
      case 'fundingAmount':
        return {
          label: 'Funding Amount',
          formatter: formatCurrency,
          domain: [0, 110000] as [number, number],
        };
      case 'tib':
        return {
          label: 'Total Investment Base',
          formatter: formatCurrency,
          domain: [0, 550000] as [number, number],
        };
      case 'industry':
        return { label: 'Industry', formatter: (v: string) => v };
      case 'region':
        return { label: 'Region', formatter: (v: string) => v };
      default:
        return {
          label: 'Funding Amount',
          formatter: formatCurrency,
          domain: [0, 110000] as [number, number],
        };
    }
  }, [xAxisMetric]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;

      if (isCategorical) {
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
            <p style={{ fontSize: 12, color: '#89768a', margin: '2px 0', fontWeight: 600 }}>
              {point.category}
            </p>
            <p style={{ fontSize: 12, color: '#89768a', margin: '2px 0' }}>
              Avg MOIC: {point.avgMoic.toFixed(2)}
            </p>
            <p style={{ fontSize: 12, color: '#89768a', margin: '2px 0' }}>
              Deals: {point.count}
            </p>
            {point.hasCurrentDeal && (
              <p style={{ fontSize: 12, color: '#2563eb', margin: '2px 0', fontWeight: 600 }}>
                ✓ Your Deal
              </p>
            )}
          </div>
        );
      }

      // Calculate percentile position
      const moicPercentile =
        point.y < percentiles.p25 ? 'Below 25th' :
        point.y < percentiles.p50 ? '25th-50th' :
        point.y < percentiles.p75 ? '50th-75th' : 'Top 25th';

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
          {point.isCurrentDeal && (
            <p style={{ fontSize: 12, color: '#2563eb', margin: '2px 0', fontWeight: 600 }}>
              Your Deal
            </p>
          )}
          <p style={{ fontSize: 12, color: '#89768a', margin: '2px 0' }}>
            {xAxisConfig.label}: {xAxisConfig.formatter(point.x)}
          </p>
          <p style={{ fontSize: 12, color: '#89768a', margin: '2px 0' }}>
            MOIC: {point.y.toFixed(2)}
          </p>
          <p style={{ fontSize: 11, color: '#a89baa', margin: '2px 0', fontStyle: 'italic' }}>
            {moicPercentile} percentile
          </p>
        </div>
      );
    }
    return null;
  };

  // Render scatter plot for continuous data
  if (!isCategorical) {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {/* Percentile bands */}
          <ReferenceArea
            y1={1.0}
            y2={percentiles.p25}
            fill="#f87171"
            fillOpacity={0.08}
            ifOverflow="extendDomain"
          />
          <ReferenceArea
            y1={percentiles.p25}
            y2={percentiles.p75}
            fill="#d4d4d8"
            fillOpacity={0.04}
            ifOverflow="extendDomain"
          />
          <ReferenceArea
            y1={percentiles.p75}
            y2={1.6}
            fill="#22c55e"
            fillOpacity={0.08}
            ifOverflow="extendDomain"
          />

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e8e2d9"
            opacity={0.5}
          />
          <XAxis
            type="number"
            dataKey="x"
            name={xAxisConfig.label}
            domain={xAxisConfig.domain}
            tick={{ fill: '#89768a', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={xAxisConfig.formatter}
            animationDuration={300}
            animationEasing="ease-out"
          />
          <YAxis
            type="number"
            dataKey="y"
            name="MOIC"
            domain={[1.0, 1.6]}
            tick={{ fill: '#89768a', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={40}
            tickFormatter={(value) => value.toFixed(1)}
            animationDuration={300}
            animationEasing="ease-out"
          />
          <ZAxis
            type="number"
            dataKey="z"
            range={[70, 200]}
            name="Deal Size"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: '3 3', stroke: variant === 'marketplace' ? '#8b7fd4' : '#14b8a6' }}
          />
          <Scatter
            data={chartData}
            fill={variant === 'marketplace' ? '#8b7fd4' : '#14b8a6'}
            fillOpacity={0.85}
            isAnimationActive={true}
            animationDuration={300}
            animationEasing="ease-out"
            shape={(props: any) => {
              const { cx, cy, payload } = props;

              // Calculate radius from z value (dealSize) and ZAxis range [70, 200]
              // ZAxis range represents area, need to convert to radius: r = sqrt(area / PI)
              const minArea = 70;
              const maxArea = 200;
              const minZ = Math.min(...chartData.map(d => d.z || d.dealSize));
              const maxZ = Math.max(...chartData.map(d => d.z || d.dealSize));
              const zValue = payload.z || payload.dealSize || 100;

              // Linear interpolation of z value to area range
              const normalizedZ = (zValue - minZ) / (maxZ - minZ);
              const area = minArea + normalizedZ * (maxArea - minArea);
              const radius = Math.sqrt(area / Math.PI);

              if (payload.isCurrentDeal) {
                // Render current deal with distinct styling (larger and more prominent)
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={10}
                    fill="#2563eb"
                    stroke="#1e40af"
                    strokeWidth={3}
                    opacity={0.95}
                  />
                );
              }
              // Regular data points with calculated radius and stroke for better visibility
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={props.fill}
                  stroke={variant === 'marketplace' ? '#6b5fb5' : '#0d9488'}
                  strokeWidth={1}
                  opacity={0.85}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  // Render bar chart for categorical data
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        {/* Percentile bands */}
        <ReferenceArea
          y1={1.0}
          y2={percentiles.p25}
          fill="#f87171"
          fillOpacity={0.08}
          ifOverflow="extendDomain"
        />
        <ReferenceArea
          y1={percentiles.p25}
          y2={percentiles.p75}
          fill="#d4d4d8"
          fillOpacity={0.04}
          ifOverflow="extendDomain"
        />
        <ReferenceArea
          y1={percentiles.p75}
          y2={1.6}
          fill="#22c55e"
          fillOpacity={0.08}
          ifOverflow="extendDomain"
        />

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e8e2d9"
          opacity={0.5}
        />
        <XAxis
          dataKey="category"
          tick={{ fill: '#89768a', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          animationDuration={300}
          animationEasing="ease-out"
        />
        <YAxis
          name="Avg MOIC"
          domain={[1.0, 1.6]}
          tick={{ fill: '#89768a', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={40}
          tickFormatter={(value) => value.toFixed(1)}
          animationDuration={300}
          animationEasing="ease-out"
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: variant === 'marketplace' ? 'rgba(139, 127, 212, 0.1)' : 'rgba(20, 184, 166, 0.1)' }}
        />
        <Bar
          dataKey="avgMoic"
          fill={variant === 'marketplace' ? '#8b7fd4' : '#14b8a6'}
          radius={[4, 4, 0, 0]}
          isAnimationActive={true}
          animationDuration={300}
          animationEasing="ease-out"
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.hasCurrentDeal ? '#2563eb' : (variant === 'marketplace' ? '#8b7fd4' : '#14b8a6')}
              opacity={entry.hasCurrentDeal ? 0.95 : 0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
