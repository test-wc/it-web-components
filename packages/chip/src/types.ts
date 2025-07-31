export const CHIP_VARIANTS = ['primary', 'secondary', 'success', 'danger', 'warning', ''] as const;
export const CHIP_SIZES = ['sm', 'lg'] as const;

export type ChipVariant = (typeof CHIP_VARIANTS)[number];
export type ChipSize = (typeof CHIP_SIZES)[number];
export type ChipProps = {
  dismissable?: boolean;
  size?: ChipSize;
  avatar?: string;
  avatarAlt?: string;
  label?: string;
  href?: string;
  variant?: ChipVariant;
  isDisabled?: boolean;
};
