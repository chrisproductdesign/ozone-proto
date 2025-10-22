import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('renders an accessible textbox and forwards refs', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(
      <Input
        aria-label="Email"
        ref={(node) => {
          ref.current = node;
        }}
      />
    );
    const input = screen.getByRole('textbox', { name: /email/i });
    expect(input).toBeInTheDocument();
    expect(ref.current).toBe(input);
  });

  it('invokes onValueChange when typing', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onValueChange={handleValueChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'flow');
    expect(handleValueChange).toHaveBeenLastCalledWith('flow', expect.any(Object));
  });

  it('exposes variant state as data attributes', () => {
    render(<Input size="lg" status="success" />);
    const root = screen.getByRole('textbox').closest('[data-component="Input"]');
    expect(root).toHaveAttribute('data-size', 'lg');
    expect(root).toHaveAttribute('data-status', 'success');
  });

  it('marks the root as disabled when the control is disabled', () => {
    render(<Input disabled />);
    const root = screen.getByRole('textbox').closest('[data-component="Input"]');
    expect(root).toHaveAttribute('data-disabled', 'true');
  });

  it('derives a danger status when aria-invalid is true', () => {
    render(<Input aria-invalid="true" />);
    const root = screen.getByRole('textbox').closest('[data-component="Input"]');
    expect(root).toHaveAttribute('data-status', 'danger');
  });

  it('renders decorators when provided', () => {
    render(<Input startDecorator={<span>USD</span>} endDecorator={<button type="button">Clear</button>} />);
    const root = screen.getByRole('textbox').closest('[data-component="Input"]');
    const decorators = root?.querySelectorAll('.ui-input__decorator');
    expect(decorators?.length).toBe(2);
  });
});
