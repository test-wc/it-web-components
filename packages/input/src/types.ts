export const INPUT_TYPES = ['text', 'email', 'number', 'tel', 'time', 'password', 'textarea'];

export const DEFAULT_TRANSLATIONS = {
  showHidePassword: 'Mostra/Nascondi Password.',
  shortPass: 'Password troppo breve.',
  badPass: 'Password debole.',
  goodPass: 'Password abbastanza sicura.',
  strongPass: 'Password sicura.',
  ariaLabelPasswordMeter: 'Robustezza della password',
  suggestionsLabel: 'Suggerimenti per una buona password:',
  suggestionLength: 'Almeno {minLength} caratteri.',
  suggestionUppercase: 'Una o più maiuscole.',
  suggestionLowercase: 'Una o più minuscole.',
  suggestionNumber: 'Uno o più numeri.',
  suggestionSpecial: 'Uno o più caratteri speciali.',
  suggestionFollowed: 'suggerimenti seguito',
  suggestionFollowedPlural: 'suggerimenti seguiti',
  suggestionOf: 'di',
  validityRequired: 'Questo campo è obbligatorio.',
  validityInvalid: 'Il valore non è corretto.',
  validityPattern: 'Il valore non corrisponde al formato richiesto.',
  validityMinlength: 'Il valore deve essere lungo almeno {minlength} caratteri.',
};

export const INPUT_SIZES = ['sm', undefined, 'lg'];

export type InputType = (typeof INPUT_TYPES)[number];
export type Sizes = (typeof INPUT_SIZES)[number];

export type Suggestion = {
  key: string | number;
  text: (config: Record<string, any>) => string;
  test: (password: string, config: Record<string, any>) => boolean;
};
