import React, { useState } from 'react';
import { classNames } from '@/lib/classNames';
import { BaseUISlider } from '@/components/form/BaseUISlider';

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

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={classNames(
      'bg-white rounded-2xl p-5 shadow-sm',
      'flex flex-col',
      className
    )}>
      <div className="flex items-center gap-2 mb-4">
        {icon && (
          <span className="text-gray-700">
            {icon}
          </span>
        )}
        <h3 className="text-xs font-medium text-gray-700 tracking-wide uppercase">
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
          <BaseUISlider
            value={sliderValue}
            min={min}
            max={max}
            onChange={handleSliderChange}
          />
        )}
      </div>
    </div>
  );
}