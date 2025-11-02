'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

import { classNames } from '../../lib/classNames';

import type { HTMLAttributes } from 'react';


import './Slider.css';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Current value
   */
  value?: number;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: number;
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  /**
   * Step increment
   * @default 1
   */
  step?: number;
  /**
   * Whether to show the value label
   * @default true
   */
  showValue?: boolean;
  /**
   * Label for the slider
   */
  label?: string;
  /**
   * Format function for the value display
   */
  formatValue?: (value: number) => string;
  /**
   * Callback when value changes
   */
  onChange?: (value: number) => void;
  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      showValue = true,
      label,
      formatValue = (v) => String(v),
      onChange,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = controlledValue ?? uncontrolledValue;
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate percentage for visual representation
    const percentage = ((value - min) / (max - min)) * 100;

    // Update value based on mouse/touch position
    const updateValue = (clientX: number) => {
      if (!trackRef.current || disabled) return;

      const rect = trackRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      let newPercentage = (x / width) * 100;
      newPercentage = Math.max(0, Math.min(100, newPercentage));

      let newValue = (newPercentage / 100) * (max - min) + min;

      // Apply step
      newValue = Math.round(newValue / step) * step;
      newValue = Math.max(min, Math.min(max, newValue));

      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    };

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e.clientX);
    };

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        updateValue(e.clientX);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging]);

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled) return;
      const touch = e.touches[0];
      updateValue(touch.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (disabled) return;
      const touch = e.touches[0];
      updateValue(touch.clientX);
    };

    // Keyboard events
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newValue = value;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, value - step);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, value + step);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return;
      }

      e.preventDefault();
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={classNames(
          'ui-slider',
          disabled && 'ui-slider--disabled',
          isDragging && 'ui-slider--dragging',
          className
        )}
        data-disabled={disabled}
        {...props}
      >
        {label && (
          <div className="ui-slider__header">
            <span className="ui-slider__label">{label}</span>
            {showValue && (
              <span className="ui-slider__value">{formatValue(value)}</span>
            )}
          </div>
        )}
        <div
          ref={trackRef}
          className="ui-slider__track"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
        >
          <div
            className="ui-slider__fill"
            style={{ width: `${percentage}%` }}
          />
          <div
            className="ui-slider__thumb"
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';