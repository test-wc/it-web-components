export const BUTTON_SIZES = ['lg', 'sm', 'xs'];
export const BUTTON_VARIANTS = ['primary', 'secondary', 'success', 'danger', 'warning', 'link'];

export type Sizes = (typeof BUTTON_SIZES)[number];
export type Variants = (typeof BUTTON_VARIANTS)[number] | string;
