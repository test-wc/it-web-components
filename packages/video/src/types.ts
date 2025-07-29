import itLang from './locales/it-videojs.js';

export const VIDEO_LOCALE = ['it', 'en']; // Aggiungi 'fr', 'de', ecc. se necessario

export type Locale = (typeof VIDEO_LOCALE)[number] | string;
export type VideoJSLocale = typeof itLang;
export type VideoJSTranslations = Record<Locale, VideoJSLocale>;

export type SingleTrack = {
  kind: 'captions' | 'subtitles' | 'descriptions' | 'chapters' | 'metadata';
  src: string; // URL del file del track
  srclang?: string; // Codice della lingua (es. 'it', 'en',)
  label: string; // Etichetta del track
  default?: boolean; // Indica se è il track predefinito
};
export type Track = Array<SingleTrack>;

export type ConsentOptions = {
  consentKey?: string;
  onAccept?: Function;
  isAccepted?: Function;
};
