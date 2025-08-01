import { html, PropertyValues } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '@italia/globals';
import styles from './section.scss';

@customElement('it-section')
export class ItSection extends BaseComponent {
  static styles = styles;

  @property({ type: String }) variant?: 'muted' | 'emphasis' | 'primary';

  @property({ type: String }) image = '';

  @property({ type: Boolean }) inverse = false;

  @queryAssignedElements({ flatten: true })
  private assignedElements!: HTMLElement[];

  updated(changedProps: PropertyValues) {
    super.updated(changedProps);

    // Fallback: se nessuno ha ancora assegnato un ID a un heading
    const heading =
      this.assignedElements.find((el) => /^H[1-6]$/.test(el.tagName)) ??
      this.assignedElements.flatMap((el) => Array.from(el.querySelectorAll('h1, h2, h3, h4, h5, h6')))[0];

    if (heading && !heading.id) {
      heading.id = this._id!;
    }
  }

  private handleSlotChange() {
    const headings = this.assignedElements.flatMap((el) =>
      Array.from(el.querySelectorAll?.('h1, h2, h3, h4, h5, h6') ?? []),
    );

    if (!headings.length) {
      this.logger.warn('No heading found in the slot elements, cannot set aria-labelledby correctly for the section.');
      return;
    }

    const firstHeading = headings[0];
    firstHeading.id = this._id!;
  }

  render() {
    const wrapperClasses = {
      section: true,
      [`section-${this.variant}`]: Boolean(this.variant),
      'section-image': Boolean(this.image),
    };
    const contentClasses = {
      'section-content': true,
      'white-color': this.inverse,
    };
    return html`
      <section aria-labelledby="${this._id}" class="${classMap(wrapperClasses)}" part="section">
          ${
            this.image
              ? html`
                  <div class="img-responsive-wrapper">
                    <div class="img-responsive">
                      <div class="img-wrapper">
                        <img src="${this.image}" alt="" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                `
              : null
          }

            <div class="${classMap(contentClasses)}"><slot @slotchange=${this.handleSlotChange}></slot></div>
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
