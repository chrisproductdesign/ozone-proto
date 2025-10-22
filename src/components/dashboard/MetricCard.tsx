import React, { useState } from 'react';
import { classNames } from '@/lib/classNames';

interface MetricCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  min?: number;
  max?: number;
  currentValue?: number;
  unit?: string;
  showSlider?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  min = 0,
  max = 100,
  currentValue = 20,
  unit = '',
  showSlider = true,
  onChange,
  className
}) => {
  const [sliderValue, setSliderValue] = useState(currentValue);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((sliderValue - min) / (max - min)) * 100;

  return (
    <div className={classNames(
      'bg-white rounded-2xl p-8',
      'flex flex-col',
      className
    )}>
      <div className="flex items-center gap-2 mb-4">
        {icon && (
          <span className="text-gray-700">
            {icon}
          </span>
        )}
        <h3 className="text-sm font-medium text-gray-700 tracking-wide uppercase">
          {label}
        </h3>
      </div>

      <div className="flex-1">
        <div className="text-3xl font-bold text-gray-900 mb-6">
          {typeof value === 'number' && unit === '$' ? (
            <span>${value.toLocaleString()}</span>
          ) : typeof value === 'number' ? (
            <span>{value}{unit}</span>
          ) : (
            <span>{value}</span>
          )}
        </div>

        {showSlider && (
          <div className="relative">
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-200"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: '#5A4A5C'
                }}
              />
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={sliderValue}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
              aria-label={`${label} slider`}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={sliderValue}
              aria-valuetext={unit === '$' ? `${unit}${sliderValue.toLocaleString()}` : `${sliderValue}${unit}`}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full shadow-sm transition-all duration-200"
              style={{ left: `calc(${percentage}% - 8px)` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}