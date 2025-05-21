import { BaseComponent } from '@it-web-components/globals';
import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styles from './button.scss?inline';

@customElement('it-button')
export class ItButton extends BaseComponent(styles) {
  static get formAssociated() {
    return true;
  }

  @property({ type: String })
  private _buttonClasses = '';

  @property({ type: String })
  type = 'button';

  @property({ type: String })
  variant = '';

  @property({ type: Boolean })
  outline = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  value = '';

  @property({ type: ElementInternals })
  internals = this.attachInternals();

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    const button = this.renderRoot.querySelector('button');
    if (button) {
      this.addFocus(button);
    }
  }

  override updated() {
    this._buttonClasses = this.composeClass(
      'btn',
      this.outline ? '' : this.variant !== '' ? `btn-${this.variant}` : '',
      this.outline
        ? `${this.outline ? 'btn-outline-' : ''}${this.variant}`
        : '',
      this.disabled ? 'disabled' : '',
    );
  }

  surfaceSubmitEvent(event: any) {
    if (this.form) {
      event.preventDefault();
      event.stopPropagation();
      this.form.requestSubmit();
    }
  }

  get form() {
    return this.internals ? this.internals.form : null;
  }

  // Render the UI as a function of component state
  override render() {
    return html`
      <button
        type="${this.type}"
        disabled=${ifDefined(this.disabled || undefined)}
        class="${this._buttonClasses}"
        @click="${this.type === 'submit' ? this.surfaceSubmitEvent : undefined}"
        .value="${ifDefined(this.value ? this.value : undefined)}"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-button': Button;
  }
}
