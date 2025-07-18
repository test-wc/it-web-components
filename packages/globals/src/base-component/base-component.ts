import clsx from 'clsx';
import { LitElement } from 'lit';
import { Constructor } from '../index.js';
import { Logger } from '../utils/logger.js';
// import TrackFocus from '../utils/track-focus.js';

export interface BaseComponentInterface {
  addFocus(element: HTMLElement): void;
  composeClass: typeof clsx;
}

export type BaseComponentType = typeof LitElement & Constructor<BaseComponentInterface>;

/**
 * Factory function per creare una base class estendibile
 * con stili personalizzati.
 */

export class BaseComponent extends LitElement {
  protected logger: Logger;

  protected _ariaAttributes: Record<string, string> = {}; // tutti gli attributi aria-* passati al Web component

  protected composeClass = clsx;

  constructor() {
    super();
    this.logger = new Logger(this.tagName.toLowerCase());
  }

  // eslint-disable-next-line class-methods-use-this
  generateId(prefix: string) {
    return `${prefix}-${Math.random().toString(36).slice(2)}`;
  }

  // eslint-disable-next-line class-methods-use-this
  protected getActiveElement(): HTMLElement | null {
    let active = document.activeElement;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active as HTMLElement | null;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  addFocus(element: HTMLElement) {
    // new TrackFocus(element); // per il momento è stato disattivato perchè ci sono le pseudo classi ::focus-visible per fare quello che fa TrackFocus. Si possono aggiungere regole css in bsi-italia 3 dato che stiamo facendo una breaking release di bsi.
  }

  getAriaAttributes() {
    for (const attr of this.getAttributeNames()) {
      if (attr.startsWith('aria-')) {
        this._ariaAttributes[attr] = this.getAttribute(attr)!;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback?.();

    this.getAriaAttributes();
  }
}
