import React from 'react';
import { Slider } from '@base-ui-components/react/slider';

interface BaseUISliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const BaseUISlider: React.FC<BaseUISliderProps> = ({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className
}) => {
  const handleChange = (newValue: number | number[]) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue;
    onChange?.(val);
  };

  return (
    <Slider.Root
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      onValueChange={handleChange}
      className={className}
    >
      <Slider.Control className="flex w-full touch-none items-center py-2 select-none">
        <Slider.Track className="h-[2px] w-full rounded-full bg-gray-200 select-none relative">
          <Slider.Indicator className="rounded-full bg-purple-600 select-none h-full" />
          <Slider.Thumb className="size-3 rounded-full bg-white outline outline-2 outline-purple-600 select-none cursor-pointer absolute top-1/2 -translate-y-1/2 hover:outline-[3px] hover:shadow-md focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-purple-700 data-[dragging]:shadow-lg transition-[outline,box-shadow] duration-150" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
};