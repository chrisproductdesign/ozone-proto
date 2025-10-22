export const buttonSizes = ['sm', 'md', 'lg'] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export const buttonVariants = ['primary', 'secondary', 'ghost', 'danger'] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export interface ButtonVariantConfig {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const buttonDefaultVariant: Required<Pick<ButtonVariantConfig, 'size' | 'variant'>> = {
  size: 'md',
  variant: 'primary'
};