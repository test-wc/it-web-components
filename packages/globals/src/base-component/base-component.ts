import { LitElement, unsafeCSS, CSSResult } from 'lit';
import TrackFocus from '../utils/track-focus.js';

// // Tipo costruttore generico che restituisce una sottoclasse di LitElement
// type LitElementConstructor = new (...args: any[]) => LitElement;

/**
 * Factory function per creare una base class estendibile
 * con stili personalizzati.
 */

export const BaseComponent = (style: string | CSSResult): typeof LitElement => {
  return class BaseComponentInternal extends LitElement {
    static override styles = [unsafeCSS(style)];

    protected static addFocus(element: HTMLElement) {
      new TrackFocus(element);
    }

    protected static composeClass(...classes: any) {
      let composedClass = '';
      classes.forEach((newClass: string) => {
        composedClass += ' ' + newClass;
      });
      return composedClass.trim();
    }
  };
};
