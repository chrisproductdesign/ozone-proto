'use client';


import { Input as BaseInput } from '@base-ui-components/react/input';
import { forwardRef } from 'react';

import { classNames } from '../../lib/classNames';

import {
  inputAppearances,
  inputDefaultVariant,
  type InputAppearance,
  type InputSize,
  type InputStatus
} from './variants';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Input.css';

type BaseInputProps = ComponentPropsWithoutRef<typeof BaseInput>;

export interface InputProps extends Omit<BaseInputProps, 'className' | 'size'> {
  /**
   * Visual density token mapped to padding and typography scale.
   * @default 'md'
   */
  size?: InputSize;
  /**
   * Visual treatment of the container surface.
   * @default 'outline'
   */
  appearance?: InputAppearance;
  /**
   * Emphasizes validation or feedback state.
   * @default 'default'
   */
  status?: InputStatus;
  /**
   * Expands the control to occupy the width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Element rendered before the input (icons, prefix chips, etc.).
   */
  startDecorator?: ReactNode;
  /**
   * Element rendered after the input (buttons, suffix tokens).
   */
  endDecorator?: ReactNode;
  /**
   * Class applied to the root wrapper element.
   */
  className?: string;
  /**
   * Class applied to the underlying input element.
   */
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = inputDefaultVariant.size,
    appearance = inputDefaultVariant.appearance,
    status = inputDefaultVariant.status,
    fullWidth = false,
    startDecorator,
    endDecorator,
    className,
    inputClassName,
    ...controlProps
  },
  ref
) {
  const { disabled, readOnly, ['aria-invalid']: ariaInvalid } = controlProps as {
    disabled?: boolean;
    readOnly?: boolean;
    ['aria-invalid']?: boolean | 'true' | 'false';
  };

  const derivedStatus =
    status !== 'default' || (ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== 'false')
      ? status === 'default'
        ? 'danger'
        : status
      : status;

  const resolvedAppearance: InputAppearance =
    appearance === 'plain' && startDecorator
      ? 'plain'
      : inputAppearances.includes(appearance) ? appearance : inputDefaultVariant.appearance;

  const rootClassName = classNames('ui-input', className);
  const controlClassName = classNames('ui-input__control', inputClassName);

  return (
    <span
      data-component="Input"
      data-size={size}
      data-appearance={resolvedAppearance}
      data-status={derivedStatus}
      data-fullwidth={fullWidth ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-readonly={readOnly ? 'true' : undefined}
      data-decorated={startDecorator || endDecorator ? 'true' : undefined}
      className={rootClassName}
    >
      {startDecorator ? <span className="ui-input__decorator">{startDecorator}</span> : null}
      <BaseInput ref={ref} {...controlProps} className={controlClassName} />
      {endDecorator ? <span className="ui-input__decorator">{endDecorator}</span> : null}
    </span>
  );
});
