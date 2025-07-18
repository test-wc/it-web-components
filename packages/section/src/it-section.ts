import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@italia/globals';
import styles from './section.scss';

@customElement('it-section')
export class ItSection extends BaseComponent {
  static styles = styles;

  @property({ type: String }) variant: 'light' | 'dark' | 'primary' | 'white' | 'none' = 'light';

  @property({ type: String }) image = '';

  @property({ type: String }) alt = '';

  private _id = this.generateId();

  private handleSlotChange() {
    // Cerca un h dentro lo slot, assegnaci _id come id
    const slot = this.shadowRoot?.querySelector('slot');
    const h = slot
      ?.assignedElements()
      .find((el) => el.tagName.toLowerCase() === 'h1' || el.tagName.toLowerCase() === 'h2');
    if (h) {
      h.id = this._id;
    }
  }

  render() {
    const wrapperClasses = {
      'it-hero-wrapper': true,
      [`it-hero-wrapper-${this.variant}`]: this.variant && this.variant !== 'none',
    };

    return html`
      <section class="section" aria-labelledby="${_id}">
        <div class="${classMap(wrapperClasses)}">
          ${this.image
            ? html`
                <div class="img-responsive-wrapper">
                  <div class="img-responsive">
                    <div class="img-wrapper">
                      <img src="${this.image}" alt="${this.alt}" />
                    </div>
                  </div>
                </div>
              `
            : null}

          <div class="it-hero-text-wrapper">
            <slot @slotchanged=${this.handleSlotChange}></slot>
          </div>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-section': ItSection;
  }
}
