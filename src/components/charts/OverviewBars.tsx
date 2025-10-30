import React from 'react';

interface BarData {
  label: string;
  value: number; // percentage 0-100
  color: string;
}

// Mock data matching the 6 bars from Figma
const mockData: BarData[] = [
  {
    label: 'middle',
    value: 85,
    color: '#14b8a6', // teal-500
  },
  {
    label: 'middle',
    value: 72,
    color: '#22c55e', // green-500
  },
  {
    label: 'middle',
    value: 90,
    color: '#86efac', // green-300
  },
  {
    label: 'middle',
    value: 78,
    color: '#14b8a6', // teal-500
  },
  {
    label: 'middle',
    value: 65,
    color: '#f97316', // orange-500
  },
  {
    label: 'middle',
    value: 55,
    color: '#ef4444', // red-500
  },
];

interface OverviewBarsProps {
  data?: BarData[];
}

export const OverviewBars: React.FC<OverviewBarsProps> = ({
  data = mockData,
}) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {/* Label */}
          <div className="w-16 flex-shrink-0">
            <span className="text-sm font-medium text-neutral-700">
              {item.label}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 h-2 bg-neutral-300 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${item.value}%`,
                backgroundColor: item.color,
              }}
            />
          </div>

          {/* Read More Link */}
          <button
            className="text-sm text-neutral-600 hover:text-neutral-800 transition-colors flex-shrink-0"
            onClick={() => console.log(`Read more about: ${item.label}`)}
          >
            Read more
          </button>
        </div>
      ))}
    </div>
  );
};
