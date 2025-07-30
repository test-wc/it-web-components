import { ReactiveControllerHost } from 'lit';
import { LocalizeController } from '../controllers/localize.js';
import { Constructor } from '../index.js';

/**
 * @param Base The base class.
 * @returns A mix-in implementing `localizations` method.
 *
 *@example
 *    <!-- Terms -->
      ${this.$localize.term('hello')}
      or
      ${this.$t('hello')}

      <!-- Dates -->
      ${this.$localize.date('2021-09-15 14:00:00 ET', { month: 'long', day: 'numeric', year: 'numeric' })}
      or
      ${this.$d('2021-09-15 14:00:00 ET', { month: 'long', day: 'numeric', year: 'numeric' })}

      <!-- Numbers/currency -->
      ${this.$localize.number(1000, { style: 'currency', currency: 'USD'})}
      or
      ${this.$n(1000,{ style: 'currency', currency: 'USD'})}

      <!-- Determining language -->
      ${this.$localize.lang()}

      <!-- Determining directionality, e.g. 'ltr' or 'rtl' -->
      ${this.$localize.dir()}


    *** HOW TO DEFINE TRANSLATIONS: ***
    // Simple terms
    upload: 'Upload',

    // Terms with placeholders
    greetUser: (name: string) => `Hello, ${name}!`,

    // Plurals
    numFilesSelected: (count: number) => {
        if (count === 0) return 'No files selected';
        if (count === 1) return '1 file selected';
        return `${count} files selected`;
    }
 */

const LocalizeMixin = <T extends Constructor<ReactiveControllerHost & HTMLElement>>(Base: T) =>
  class extends Base {
    public localize: LocalizeController = new LocalizeController(this);

    // Provide default values to avoid definite assignment errors and avoid decorators
    dir: string = '';

    lang: string = '';

    /**
     * Restituisce tutta l'utility di traduzione
     *

     *
     * @returns tutta l'utility di traduzione
     *
     * @example
     * this.$localize.lang() -> ritorna la lingua corrente
     * this.$localize.dir() -> ritorna la direzione della lingua corrente
     */
    get $localize() {
      return this.localize;
    }

    /**
     * Restituisce una stringa localizzata a partire da una chiave di termine.
     *
     * Utilizza il `LocalizeController` per accedere al dizionario corrente e
     * tradurre la chiave fornita secondo la lingua attiva.
     *
     * @param t - La chiave del termine da localizzare (es. 'hello', 'submit', ecc.).
     * @returns La stringa tradotta in base alla lingua attiva. Se la chiave non è trovata, restituisce la chiave stessa.
     *
     * @example
     * this.$t('hello'); // → "Ciao" (in locale it-IT)
     */
    public $t(t: string) {
      // format term
      return this.localize.term(t);
    }

    /**
     * Formatta una data in base alla localizzazione attiva.
     *
     * Utilizza il `LocalizeController` per restituire una stringa localizzata
     * secondo le opzioni fornite (es. mese esteso, anno, ecc.).
     *
     * @param n - La data da formattare come stringa compatibile (es. ISO o con timezone, es. '2021-09-15 14:00:00 ET').
     * @param p - Le opzioni di formattazione per `Intl.DateTimeFormat` (es. { year: 'numeric', month: 'long', day: 'numeric' }).
     * @returns Una stringa rappresentante la data formattata secondo la localizzazione attiva.
     *
     * @example
     * this.$d('2021-09-15 14:00:00 ET', { year: 'numeric', month: 'long', day: 'numeric' });
     * // → "15 settembre 2021" (in locale it-IT)
     */
    public $d(d: Date | string, p: Intl.DateTimeFormatOptions) {
      // format date
      return this.localize.date(d, p);
    }

    /**
     * Formatta un numero secondo le impostazioni locali dell'utente corrente.
     *
     * Utilizza il `LocalizeController` per applicare formattazione numerica,
     * incluse opzioni come separatori, decimali, valute, ecc.
     *
     * @param d - Il numero da formattare.
     * @param p - Le opzioni di formattazione (es. { style: 'currency', currency: 'EUR' }).
     * @returns Una stringa rappresentante il numero formattato secondo la localizzazione attiva.
     *
     * @example
     * this.$n(1234.56, { style: 'currency', currency: 'USD' }); // → "$1,234.56" (in locale en-US)
     */
    public $n(d: number, p: Intl.NumberFormatOptions) {
      return this.localize.number(d, p);
    }
  };

export default LocalizeMixin;

// export interface LocalizedComponent {
//   $t(t: string): string;
//   $d(d: Date | string, p?: Intl.DateTimeFormatOptions): string;
//   $n(n: number, p?: Intl.NumberFormatOptions): string;
//   $localize: LocalizeController;
// }
