import { Combobox } from '@base-ui-components/react/combobox';
import React, { forwardRef, useState } from 'react';

import { classNames } from '@/lib/classNames';

import { getBaseInputClasses, inputPadding } from './inputStyles';

interface ComboboxInputProps {
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const ComboboxInput = forwardRef<HTMLDivElement, ComboboxInputProps>(
  ({ value = '', onChange, options, placeholder, required, error = false, fullWidth = true, className, 'aria-label': ariaLabel }, ref) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // Get label for current value
    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption?.label || '';

    const handleValueChange = (newValue: string | null) => {
      if (newValue && onChange) {
        onChange(newValue);
      }
      setOpen(false);
    };

    // Filter options based on input
    const filteredOptions = inputValue
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      : options;

    return (
      <div ref={ref} className={classNames('relative', fullWidth ? 'w-full' : '', className)}>
        <Combobox.Root
          value={value}
          onValueChange={handleValueChange}
          open={open}
          onOpenChange={setOpen}
        >
          <div className="relative">
            <Combobox.Input
              placeholder={placeholder}
              required={required}
              aria-label={ariaLabel}
              value={open ? inputValue : displayValue}
              // @ts-expect-error - Base UI Combobox.Input supports onValueChange but type definitions are incomplete
              onValueChange={setInputValue}
              className={classNames(
                getBaseInputClasses(error, true),
                inputPadding.rightControls
              )}
            />
            <Combobox.Trigger
              className={classNames(
                'absolute right-4 top-1/2 -translate-y-1/2',
                'text-neutral-800 transition-transform',
                open && 'rotate-180'
              )}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 8" fill="none">
                <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Combobox.Trigger>
          </div>

          <Combobox.Portal>
            <Combobox.Positioner
              className="z-50"
              sideOffset={4}
            >
              <Combobox.Popup
                className={classNames(
                  'bg-white rounded-lg border border-neutral-400 shadow-lg',
                  'max-h-60 overflow-auto',
                  'py-1',
                  'w-[var(--anchor-width)]'
                )}
              >
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-neutral-600">
                    No results found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <Combobox.Item
                      key={option.value}
                      value={option.value}
                      className={classNames(
                        'px-3 py-2 text-sm cursor-pointer',
                        'data-[highlighted]:bg-purple-50 data-[highlighted]:text-purple-900',
                        'data-[selected]:font-medium',
                        'text-neutral-800'
                      )}
                    >
                      {option.label}
                    </Combobox.Item>
                  ))
                )}
              </Combobox.Popup>
            </Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      </div>
    );
  }
);

ComboboxInput.displayName = 'ComboboxInput';
