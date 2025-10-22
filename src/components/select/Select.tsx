'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';

import { classNames } from '../../lib/classNames';

import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Current value
   */
  value?: string;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Available options
   */
  options: SelectOption[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to show an error state
   * @default false
   */
  error?: boolean;
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Helper text below the select
   */
  helperText?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      options,
      placeholder = 'Select an option',
      onChange,
      disabled = false,
      error = false,
      label,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    const [isOpen, setIsOpen] = useState(false);
    const value = controlledValue ?? uncontrolledValue;
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    const handleSelect = (optionValue: string) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    // Handle clicks outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          !triggerRef.current?.contains(e.target as Node) &&
          !dropdownRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // Focus next option
            const firstOption = dropdownRef.current?.querySelector('[role="option"]:not([aria-disabled="true"])') as HTMLElement;
            firstOption?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
      }
    };

    const handleOptionKeyDown = (e: React.KeyboardEvent, optionValue: string, optionIndex: number) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleSelect(optionValue);
          break;
        case 'ArrowDown':
          e.preventDefault();
          const nextOption = dropdownRef.current?.querySelectorAll('[role="option"]:not([aria-disabled="true"])')[optionIndex + 1] as HTMLElement;
          if (nextOption) {
            nextOption.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (optionIndex === 0) {
            triggerRef.current?.focus();
          } else {
            const prevOption = dropdownRef.current?.querySelectorAll('[role="option"]:not([aria-disabled="true"])')[optionIndex - 1] as HTMLElement;
            prevOption?.focus();
          }
          break;
        case 'Escape':
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={classNames(
          'ui-select',
          disabled && 'ui-select--disabled',
          error && 'ui-select--error',
          isOpen && 'ui-select--open',
          className
        )}
        {...props}
      >
        {label && (
          <label className="ui-select__label">{label}</label>
        )}
        <div className="ui-select__wrapper">
          <button
            ref={triggerRef}
            type="button"
            className="ui-select__trigger"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={label || 'Select'}
          >
            <span className={classNames(
              'ui-select__value',
              !selectedOption && 'ui-select__placeholder'
            )}>
              {selectedOption?.label || placeholder}
            </span>
            <svg
              className="ui-select__icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="ui-select__dropdown"
              role="listbox"
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  className={classNames(
                    'ui-select__option',
                    option.value === value && 'ui-select__option--selected',
                    option.disabled && 'ui-select__option--disabled'
                  )}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  onKeyDown={(e) => !option.disabled && handleOptionKeyDown(e, option.value, index)}
                  disabled={option.disabled}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled}
                  tabIndex={option.disabled ? -1 : 0}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {helperText && (
          <p className="ui-select__helper-text">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';