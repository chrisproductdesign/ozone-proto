/**
 * IncrementDecrementControls Component
 *
 * Shared increment/decrement button controls for numeric inputs.
 * Used by NumberInput and PercentageInput components.
 *
 * Eliminates 50+ lines of duplicated code.
 */

import React from 'react';
import { controlButtonClasses } from './inputStyles';

interface IncrementDecrementControlsProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

export const IncrementDecrementControls: React.FC<IncrementDecrementControlsProps> = ({
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="absolute right-1 top-1 bottom-1 flex flex-col">
      <button
        type="button"
        onClick={onIncrement}
        className={`${controlButtonClasses} rounded-t`}
        aria-label="Increment"
      >
        <svg className="w-3 h-3 text-neutral-800" viewBox="0 0 12 12">
          <path d="M6 4L10 8H2L6 4Z" fill="currentColor" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onDecrement}
        className={`${controlButtonClasses} rounded-b`}
        aria-label="Decrement"
      >
        <svg className="w-3 h-3 text-neutral-800" viewBox="0 0 12 12">
          <path d="M6 8L2 4H10L6 8Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};
