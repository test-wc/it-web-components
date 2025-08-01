import { BaseComponent, setAttributes } from '@italia/globals';
import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { type Sizes, type Variants } from './types.js';
import styles from './button.scss';

@customElement('it-button')
export class ItButton extends BaseComponent {
  static styles = styles;

  static get formAssociated() {
    return true;
  }

  @property({ type: String })
  type = 'button';

  @property({ type: String })
  variant: Variants = '';

  @property({ type: String })
  size: Sizes = 'sm';

  @property({ type: Boolean })
  outline = false;

  @property({ type: Boolean })
  block = false;

  @property({ type: Boolean })
  icon = false;

  @property({ type: String })
  value = '';

  @property()
  internals = this.attachInternals();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override firstUpdated(_changedProperties: PropertyValues): void {
    const button = this.renderRoot.querySelector('button');
    if (button) {
      this.addFocus(button);
    }
  }

  surfaceSubmitEvent(event: any) {
    const disabled = 'aria-disabled' in this._ariaAttributes;
    if (this.form && !disabled) {
      event.preventDefault();
      event.stopPropagation();
      this.form.requestSubmit();
    }
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  get form() {
    return this.internals ? this.internals.form : null;
  }

  connectedCallback(): void {
    super.connectedCallback?.();

    if (this.block) {
      this.classList.add('d-block', 'w-100');
    }
  }

  // Render the UI as a function of component state
  override render() {
    const classes = this.composeClass('btn', this.className, {
      [`btn-${this.variant}`]: !!this.variant && !this.outline,
      [`btn-outline-${this.variant}`]: !!this.variant && this.outline,
      [`btn-${this.size}`]: !!this.size,
      disabled: 'aria-disabled' in this._ariaAttributes,
      'btn-icon': this.icon,
      'd-block w-100': this.block,
    });
    return html`
      <button
        id=${ifDefined(this.id || undefined)}
        part="button ${this.variant} ${this.outline ? 'outline' : ''}"
        type="${this.type}"
        class="${classes}"
        @click="${this.type === 'submit' ? this.surfaceSubmitEvent : undefined}"
        .value="${ifDefined(this.value ? this.value : undefined)}"
        ${setAttributes(this._ariaAttributes)}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-button': ItButton;
  }
}
