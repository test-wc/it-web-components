export const INPUT_TYPES = ['text', 'email', 'number', 'tel', 'time', 'password', 'textarea'];

export const DEFAULT_TRANSLATIONS = {
  showHidePassword: 'Mostra/Nascondi Password.',
  shortPassword: 'Password troppo breve.',
  badPassword: 'Password debole.',
  goodPassword: 'Password abbastanza sicura.',
  strongPassword: 'Password sicura.',
  ariaLabelPasswordMeter: 'Robustezza della password',
};

export const INPUT_SIZES = ['sm', undefined, 'lg'];

export type InputType = (typeof INPUT_TYPES)[number];
export type Sizes = (typeof INPUT_SIZES)[number];
