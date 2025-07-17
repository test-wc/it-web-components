export const inputTypes = ['text', 'email', 'number', 'tel', 'time', 'password', 'textarea'] as const;

export const defaultTranslations = {
  showHidePassword: 'Mostra/Nascondi Password.',
  shortPassword: 'Password troppo breve.',
  badPassword: 'Password debole.',
  goodPassword: 'Password abbastanza sicura.',
  strongPassword: 'Password sicura.',
  ariaLabelPasswordMeter: 'Robustezza della password',
};

export const sizes = ['sm', undefined, 'lg'] as const;

export type InputType = (typeof inputTypes)[number];
export type Sizes = (typeof sizes)[number];
