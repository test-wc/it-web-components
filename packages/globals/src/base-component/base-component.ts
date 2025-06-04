import { LitElement, unsafeCSS, CSSResult } from 'lit';
// import TrackFocus from '../utils/track-focus.js';

// // Tipo costruttore generico che restituisce una sottoclasse di LitElement
// type LitElementConstructor = new (...args: any[]) => LitElement;

/**
 * Factory function per creare una base class estendibile
 * con stili personalizzati.
 */

export const BaseComponent = (style: string | CSSResult): typeof LitElement =>
  class BaseComponentInternal extends LitElement {
    static override styles = [unsafeCSS(style)];

    protected static addFocus(/* element: HTMLElement */) {
      // new TrackFocus(element); //per il momento è stato disattivato perchè ci sono le pseudo classi ::focus-visible per fare quello che fa TrackFocus. Si possono aggiungere regole css in bsi-italia 3 dato che stiamo facendo una breaking release di bsi.
    }

    protected static composeClass(...classes: any) {
      let composedClass = '';
      classes.forEach((newClass: string) => {
        composedClass += ` ${newClass}`;
      });
      return composedClass.trim();
    }
  };
