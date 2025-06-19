import { BaseComponent } from '@italia/globals';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './dropdown.scss';

@customElement('it-dropdown')
export class ItDropdown extends BaseComponent {
  private _onClickOutside = (event: MouseEvent) => {
    if (!this.contains(event.target as Node)) {
      const popover = this.querySelector?.('[popover]');
      if (popover && typeof (popover as any).hide === 'function') {
        (popover as any).hide();
      }
    }
  };

  connectedCallback(): void {
    super.connectedCallback?.();
    document.addEventListener('click', this._onClickOutside);
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this._onClickOutside);
    super.disconnectedCallback?.();
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-dropdown': ItDropdown;
  }
}
