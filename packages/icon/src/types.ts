export const ICON_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'inverse',
  'light',
  'disabled',
  'white',
];
export const ICON_SIZES = ['xs', 'sm', undefined, 'lg', 'xl'];
export const ICON_ALIGNMENTS = ['top', 'middle', 'bottom'];

export type Colors = (typeof ICON_COLORS)[number];
export type Sizes = (typeof ICON_SIZES)[number];
export type Alignments = (typeof ICON_ALIGNMENTS)[number];
