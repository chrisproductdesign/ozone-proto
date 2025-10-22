import React from 'react';
import { Slider } from '@base-ui-components/react/slider';

interface BaseUISliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const BaseUISlider: React.FC<BaseUISliderProps> = ({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
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
      onValueChange={handleChange}
      className={className}
    >
      <Slider.Control className="flex w-full touch-none items-center py-2 select-none">
        <Slider.Track className="h-1 w-full rounded bg-gray-200 shadow-[inset_0_0_0_1px] shadow-gray-200 select-none relative">
          <Slider.Indicator className="rounded bg-gray-700 select-none h-full" />
          <Slider.Thumb className="size-4 rounded-full bg-white outline outline-1 outline-gray-300 select-none hover:outline-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 cursor-pointer absolute top-1/2 -translate-y-1/2" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
};