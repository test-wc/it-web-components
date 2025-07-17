import { BaseComponent, FormMixin, ValidityMixin } from '@italia/globals';
import { html } from 'lit';
import { customElement, property, query, queryAssignedNodes } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { inputTypes } from './types.js';

import styles from './input.scss';

// export const inputTypes = ['text', 'email', 'number', 'tel', 'time'] as const;

export type InputType = (typeof inputTypes)[number];

@customElement('it-input')
export class ItInput extends ValidityMixin(FormMixin(BaseComponent)) {
  static styles = styles;

  static get formAssociated() {
    return true;
  }

  @property()
  internals = this.attachInternals();

  @property({ type: Boolean })
  slotted = false;

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ attribute: 'required-validity-message' })
  requiredValidityMessage: string = 'Compila questo campo';

  @property({ attribute: 'validity-message' })
  validityMessage: string = '';

  @query('input')
  protected _inputElement!: HTMLInputElement;

  @property({ type: String })
  label = '';

  @property({ type: String })
  type: InputType = 'text';

  @property({ type: String })
  name = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String, attribute: 'support-text' })
  supportText = '';

  @property({ type: Boolean })
  disabled = false;

  _value = '';

  @property({ reflect: true })
  get value() {
    // FIXME: Figure out how to deal with TS2611
    // once we have the input we can directly query for the value
    if (this._inputElement) {
      return this._inputElement.value;
    }
    // but before then _value will work fine
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    this.internals.setFormValue(value); // <- Associa il valore al form
    // make sure that lit-element updates the right properties
    this.requestUpdate('value', oldValue);
    // we set the value directly on the input (when available)
    // so that programatic manipulation updates the UI correctly
    if (this._inputElement) {
      this._inputElement.value = value;
    }
  }

  _handleFormdata(event: FormDataEvent) {
    // Add name and value to the form's submission data if it's not disabled.
    if (!this.disabled) {
      const { formData } = event;
      formData.append(this.name, this._value);
    }
  }

  handleInput(event: any) {
    this.value = event.target.value;
  }

  override firstUpdated() {
    this.addFocus(this._inputElement);
    const iconSlot = this.shadowRoot?.querySelector('slot[name="icon"]');
    const appendSlot = this.shadowRoot?.querySelector('slot[name="append"]');

    iconSlot?.addEventListener('slotchange', () => {
      this.requestUpdate();
    });
    appendSlot?.addEventListener('slotchange', () => {
      this.requestUpdate();
    });
  }

  override connectedCallback() {
    super.connectedCallback?.();

    /* così quando si scrive <it-input value="ciao"></it-input>, this.value viene impostato con 'ciao' */
    const attrValue = this.getAttribute('value');
    if (attrValue !== null) {
      this.value = attrValue;
    }
  }

  // Render the UI as a function of component state
  override render() {
    const supportTextId = `${this.id}-support-text`;
    const inputRender = html`
      <input
        @input="${this.handleInput}"
        .type="${this.type}"
        id="${ifDefined(this.id || undefined)}"
        name="${this.name}"
        disabled=${ifDefined(this.disabled || undefined)}
        .value="${this._value}"
        required="${this.required}"
        part="input focusable"
        placeholder=${ifDefined(this.placeholder || undefined)}
        aria-describedby=${ifDefined(supportTextId || undefined)}
        class="form-control"
      />
    `;
    const supportTextRender = html` ${when(
      this.supportText,
      () => html` <small class="form-text" id="${supportTextId}">${this.supportText}</small> `,
    )}`;
    return html`
      <div class="form-group" part="input-wrapper">
        <label class="active" for="${ifDefined(this.id || undefined)}" part="label">${this.label}</label>

        ${when(
          this.slotted,
          () =>
            html` <div class="input-group">
                <span class="input-group-text">
                  <slot name="icon" @slotchange=${() => this.requestUpdate()}></slot
                ></span>
                ${inputRender}
                <div class="input-group-append">
                  <slot name="append" @slotchange=${() => this.requestUpdate()}></slot>
                </div>
              </div>
              ${supportTextRender}`,
          () => html` ${inputRender} ${supportTextRender}`,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-input': ItInput;
  }
}
