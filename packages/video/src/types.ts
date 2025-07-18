import itLang from './locales/it.js';

export const VIDEO_LOCALE = ['it', 'en']; // Aggiungi 'fr', 'de', ecc. se necessario

export type Locale = (typeof VIDEO_LOCALE)[number] | string;
export type LocaleTranslations = typeof itLang;
export type Translations = Record<Locale, LocaleTranslations>;

export type SingleTrack = {
  kind: 'captions' | 'subtitles' | 'descriptions' | 'chapters' | 'metadata';
  src: string; // URL del file del track
  srclang?: string; // Codice della lingua (es. 'it', 'en',)
  label: string; // Etichetta del track
  default?: boolean; // Indica se è il track predefinito
};
export type Track = Array<SingleTrack>;

export type ConsentOptions = {
  icon?: string;
  text?: string;
  acceptButtonText?: string;
  rememberCheckboxText?: string;
  consentKey?: string;
  onAccept?: Function;
  isAccepted?: Function;
};
