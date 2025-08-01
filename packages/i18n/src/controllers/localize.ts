import type { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';

export type FunctionParams<T> = T extends (...args: infer U) => string ? U : [];

export interface Translation {
  $code: string; // e.g. en, en-GB
  $name: string; // e.g. English, Español
  $dir: 'ltr' | 'rtl';
}

export interface DefaultTranslation extends Translation {
  [key: string]: any;
}

export interface ExistsOptions {
  lang: string;
  includeFallback: boolean;
}

const connectedElements = new Set<HTMLElement>();

declare global {
  interface Window {
    translations?: Map<string, Translation>;
  }
}

if (window && !window.translations) {
  window.translations = new Map<string, Translation>();
}

const { translations }: { translations: Map<string, Translation> } = window as Window & {
  translations: Map<string, Translation>;
};

let fallback: Translation;

// TODO: We need some way for users to be able to set these on the server.
let documentDirection = 'ltr';

// Fallback for server.
let documentLanguage = 'en';

const isClient =
  typeof MutationObserver !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof document.documentElement !== 'undefined';

/** Updates all localized elements that are currently connected */
export function update() {
  if (isClient) {
    documentDirection = document.documentElement.dir || 'ltr';
    documentLanguage = document.documentElement.lang || navigator.language;
  }

  [...connectedElements.keys()].forEach((el) => {
    const litEl = el as unknown as LitElement;
    if (typeof litEl.requestUpdate === 'function') {
      litEl.requestUpdate();
    }
  });
}

if (isClient) {
  const documentElementObserver = new MutationObserver(update);
  documentDirection = document.documentElement.dir || 'ltr';
  documentLanguage = document.documentElement.lang || navigator.language;

  // Watch for changes on <html lang>
  documentElementObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir', 'lang'],
  });
}

/** Registers one or more translations */
export function registerTranslation(...translation: Translation[]) {
  translation.forEach((t) => {
    const code = t.$code.toLowerCase();

    if (translations.has(code)) {
      // Merge translations that share the same language code
      translations.set(code, { ...translations.get(code), ...t });
    } else {
      translations.set(code, t);
    }

    // The first translation that's registered is the fallback
    if (!fallback) {
      fallback = t;
    }
  });

  update();
}
declare global {
  interface Window {
    registerTranslation: typeof registerTranslation;
  }
}

window.registerTranslation = registerTranslation;

/**
 * Localize Reactive Controller for components built with Lit
 *
 * To use this controller, import the class and instantiate it in a custom element constructor:
 *
 * private localize = new LocalizeController(this);
 *
 * This will add the element to the set and make it respond to changes to <html dir|lang> automatically. To make it
 * respond to changes to its own dir|lang properties, make it a property:
 *
 *   @property() dir: string;
 *   @property() lang: string;
 *
 * To use a translation method, call it like this:
 *
 *   ${this.localize.term('term_key_here')}
 *   ${this.localize.date('2021-12-03')}
 *   ${this.localize.number(1000000)}
 */
export class LocalizeController<UserTranslation extends Translation = DefaultTranslation>
  implements ReactiveController
{
  host: ReactiveControllerHost & HTMLElement;

  constructor(host: ReactiveControllerHost & HTMLElement) {
    this.host = host;
    this.host.addController(this);
  }

  hostConnected() {
    connectedElements.add(this.host);
  }

  hostDisconnected() {
    connectedElements.delete(this.host);
  }

  /**
   * Gets the host element's directionality as determined by the `dir` attribute. The return value is transformed to
   * lowercase.
   */
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }

  /**
   * Gets the host element's language as determined by the `lang` attribute. The return value is transformed to
   * lowercase.
   */
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }

  // eslint-disable-next-line class-methods-use-this
  private getTranslationData(lang: string) {
    // Convert "en_US" to "en-US". Note that both underscores and dashes are allowed per spec, but underscores result in
    // a RangeError by the call to `new Intl.Locale()`. See: https://unicode.org/reports/tr35/#unicode-locale-identifier
    const locale = new Intl.Locale(lang.replace(/_/g, '-'));
    const language = locale?.language.toLowerCase();
    const region = locale?.region?.toLowerCase() ?? '';
    const primary = <UserTranslation>translations.get(`${language}-${region}`);
    const secondary = <UserTranslation>translations.get(language);

    return { locale, language, region, primary, secondary };
  }

  /** Determines if the specified term exists, optionally checking the fallback translation. */
  exists<K extends keyof UserTranslation>(key: K, options: Partial<ExistsOptions>): boolean {
    const { primary, secondary } = this.getTranslationData(options.lang ?? this.lang());

    const mergedOptions = {
      includeFallback: false,
      ...options,
    };

    if (
      (primary && primary[key]) ||
      (secondary && secondary[key]) ||
      (mergedOptions.includeFallback && fallback && fallback[key as keyof Translation])
    ) {
      return true;
    }

    return false;
  }

  /** Outputs a translated term. */
  term<K extends keyof UserTranslation>(key: K, ...args: FunctionParams<UserTranslation[K]>): string {
    const { primary, secondary } = this.getTranslationData(this.lang());
    let term: any;

    // Look for a matching term using regionCode, code, then the fallback
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key as keyof Translation]) {
      term = fallback[key as keyof Translation];
    } else {
      // eslint-disable-next-line no-console
      console.error(`No translation found for: ${String(key)}`);
      return String(key);
    }

    if (typeof term === 'function') {
      return term(...args) as string;
    }

    return term;
  }

  /** Outputs a localized date in the specified format. */
  date(dateToFormat: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const date = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(date);
  }

  /** Outputs a localized number in the specified format. */
  number(numberToFormat: number | string, options?: Intl.NumberFormatOptions): string {
    const num = Number(numberToFormat);
    return Number.isNaN(num) ? '' : new Intl.NumberFormat(this.lang(), options).format(num);
  }

  /** Outputs a localized time in relative format. */
  relativeTime(value: number, unit: Intl.RelativeTimeFormatUnit, options?: Intl.RelativeTimeFormatOptions): string {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
}
