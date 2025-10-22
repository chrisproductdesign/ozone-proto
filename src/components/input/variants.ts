export const inputSizes = ['sm', 'md', 'lg'] as const;
export type InputSize = (typeof inputSizes)[number];

export const inputAppearances = ['outline', 'soft', 'plain'] as const;
export type InputAppearance = (typeof inputAppearances)[number];

export const inputStatuses = ['default', 'success', 'warning', 'danger'] as const;
export type InputStatus = (typeof inputStatuses)[number];

export interface InputVariantConfig {
  size?: InputSize;
  appearance?: InputAppearance;
  status?: InputStatus;
  fullWidth?: boolean;
}

export const inputDefaultVariant: Required<Pick<InputVariantConfig, 'size' | 'appearance' | 'status'>> = {
  size: 'md',
  appearance: 'outline',
  status: 'default'
};

