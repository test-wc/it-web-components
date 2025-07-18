export const INPUT_TYPES = ['text', 'email', 'number', 'tel', 'time', 'password', 'textarea'];

export const DEFAULT_TRANSLATIONS = {
  showHidePassword: 'Mostra/Nascondi Password.',
  shortPass: 'Password troppo breve.',
  badPass: 'Password debole.',
  goodPass: 'Password abbastanza sicura.',
  strongPass: 'Password sicura.',
  ariaLabelPasswordMeter: 'Robustezza della password',
  suggestionsLabel: 'Suggerimenti per una buona password:',
};

export const INPUT_SIZES = ['sm', undefined, 'lg'];

export type InputType = (typeof INPUT_TYPES)[number];
export type Sizes = (typeof INPUT_SIZES)[number];

export type Suggestion = {
  key: string | number;
  text: string;
  met: boolean;
};
