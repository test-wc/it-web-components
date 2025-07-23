import { BaseComponent, FormMixin, ValidityMixin, setAttributes } from '@italia/globals';
import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import {
  calculateScore,
  scoreColor,
  scoreText,
  suggestionsConfig,
  calcCompletedSuggestions,
} from './helpers/password.js';

import { DEFAULT_TRANSLATIONS, type InputType, type Sizes, type Suggestion } from './types.js';

import styles from './input.scss';

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

  @property({ type: Boolean, reflect: true }) // from validity mixin
  invalid = false;

  @property({ type: Boolean, reflect: true }) // from validity mixin
  required = false;

  @property({ attribute: 'required-validity-message' }) // from validity mixin
  requiredValidityMessage: string = 'Compila questo campo';

  @property({ attribute: 'validity-message' })
  validationText: string = '';

  @query('input')
  protected _inputElement!: HTMLInputElement;

  @property({ type: String }) size?: Sizes;

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

  @property({ type: Boolean })
  plaintext = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean, attribute: 'strength-meter' })
  passwordStrengthMeter = false;

  @property({ type: Boolean })
  suggestions = false;

  @property({ type: Number, attribute: 'min-password-length' })
  minPasswordLength = 8;

  @property({ type: Object })
  translations = DEFAULT_TRANSLATIONS;

  @property({ type: Boolean })
  private _passwordVisible = false;

  @property({ type: String })
  private _strengthInfos = '';

  @property({ type: Number })
  private _score = 0;

  _value = ''; // from validity mixin

  @property({ type: String })
  public validityMessage: string = '';

  @property({ type: Function }) onBlur?: (e: FocusEvent) => void;

  @property({ reflect: true })
  get value() {
    if (this._inputElement) {
      return this._inputElement.value;
    }
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

  private _handleFormdata(event: FormDataEvent) {
    // Add name and value to the form's submission data if it's not disabled.
    if (!this.disabled) {
      const { formData } = event;
      formData.append(this.name, this._value);
    }
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;

    if (this.passwordStrengthMeter) {
      this._checkPasswordStrength(input.value);
    }

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: input.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleBlur() {
    this.checkValidity();
    this.dispatchEvent(new FocusEvent('blur', { bubbles: true, composed: true }));
  }

  private _handleFocus() {
    this.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
  }

  private _handleClick() {
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: input.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override firstUpdated() {
    // this.addFocus(this._inputElement); //NON serve per il momento perche sfruttiamo :focus-visible. Per gli input focus-visible si attiva anche al click perchè è il browser che lo gestisce
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

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated?.(changedProperties);

    if (this.validationText?.length > 0) {
      this.setCustomValidity(this.validationText);
    }

    if (this.passwordStrengthMeter && this.type !== 'password') {
      this.logger.warn(
        "The strength-meter property is enabled, but type isn't password. Please, remove strength-meter property.",
      );
    }

    if (this.suggestions && this.type !== 'password') {
      this.logger.warn(
        "The suggestions property is enabled, but type isn't password. Please, remove suggestions this property.",
      );
    }
  }

  private getTranslations(): Record<string, string> {
    const _t: Record<string, string> = { ...DEFAULT_TRANSLATIONS, ...this.translations };
    return _t;
  }

  private _togglePasswordVisibility() {
    this._passwordVisible = !this._passwordVisible;
    if (this._inputElement) {
      this._inputElement.type = this._passwordVisible ? 'text' : 'password';
    }
  }

  private _checkPasswordStrength(value: string) {
    this._score = calculateScore(value, this.minPasswordLength);
    this._updateStrengthInfos();
  }

  private _getPasswordConfig() {
    return {
      ...this.getTranslations(),
      minimumLength: this.minPasswordLength,
    };
  }

  private _updateStrengthInfos() {
    let text = scoreText(this._score, this.getTranslations());
    if (suggestionsConfig) {
      const { completedCount, totalCount } = calcCompletedSuggestions(
        suggestionsConfig,
        this.value,
        this._getPasswordConfig(),
      );
      const suggestionOfText =
        completedCount === 1
          ? this.getTranslations().suggestionFollowed
          : this.getTranslations().suggestionFollowedPlural;

      text += ` ${completedCount} ${this.getTranslations().suggestionOf} ${totalCount} ${suggestionOfText}.`;
    }
    this._strengthInfos = text;
  }

  private _renderTogglePasswordButton() {
    // Solo se type=password
    if (this.type === 'password') {
      return html`
        <button
          type="button"
          class="password-icon btn"
          role="switch"
          aria-checked="${this._passwordVisible}"
          @click="${this._togglePasswordVisibility}"
        >
          <span class="visually-hidden">${this.getTranslations().showHidePassword}</span>
          <it-icon
            name="${this._passwordVisible ? 'it-password-visible' : 'it-password-invisible'}"
            size="sm"
          ></it-icon>
        </button>
      `;
    }
    return nothing;
  }

  private _renderSuggestions() {
    return this.suggestions
      ? html`<div class="strength-meter-suggestions small form-text text-muted">
          <label class="visually-hidden" for="suggestions">${this.getTranslations().suggestionsLabel}</label>
          <div class="password-suggestions">
            ${suggestionsConfig.map((sugg: Suggestion) => {
              const isMet = sugg.test(this.value, this._getPasswordConfig());
              return html`
                <div class="suggestion">
                  ${isMet
                    ? html` <svg
                        class="icon icon-xs me-1"
                        aria-label="${this.getTranslations().suggestionMetLabel}"
                        viewBox="0 0 24 24"
                        style="width: 1em; height: 1em;"
                      >
                        <path d="M9.6 16.9 4 11.4l.8-.7 4.8 4.8 8.5-8.4.7.7-9.2 9.1z"></path>
                      </svg>`
                    : nothing}
                  <span>${sugg.text(this._getPasswordConfig())}</span>
                </div>
              `;
            })}
          </div>
        </div>`
      : nothing;
  }

  private _renderpasswordStrengthMeter() {
    if (this.type === 'password' && this.passwordStrengthMeter) {
      const perc = this._score < 0 ? 0 : this._score;
      const color = this._value?.length === 0 ? 'muted' : scoreColor(this._score);
      return html`<div class="password-strength-meter">
        ${this._renderSuggestions()}

        <p
          id=${`strengthMeterInfo_${this.id}`}
          class="${`strength-meter-info small form-text pt-0 text-${color}`}"
          aria-live="polite"
        >
          ${this._strengthInfos}
        </p>
        <div class="password-meter progress rounded-0 position-absolute">
          <div
            class="${this.composeClass('progress-bar', `bg-${color}`)}"
            style="width: ${perc}%"
            role="progressbar"
            aria-valuenow="${perc}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="${this.getTranslations().ariaLabelPasswordMeter}"
          >
            <div class="row position-absolute w-100 m-0">
              <div class="col-3 border-start border-end border-white"></div>
              <div class="col-3 border-start border-end border-white"></div>
              <div class="col-3 border-start border-end border-white"></div>
              <div class="col-3 border-start border-end border-white"></div>
            </div>
          </div>
        </div>
      </div>`;
    }
    return nothing;
  }

  private _renderInput(supportTextId: string) {
    const ariaDescribedBy = this.composeClass(
      this.supportText?.length > 0 ? supportTextId : '',
      this.passwordStrengthMeter ? `strengthMeterInfo_${this.id}` : '',
      this._ariaAttributes['aria-describedby']?.length > 0 ? this._ariaAttributes['aria-describedby'] : '',
    );

    const inputClasses = this.composeClass(
      this.plaintext ? 'form-control-plaintext' : 'form-control',
      this.size ? `form-control-${this.size}` : '',
      this.invalid ? 'is-invalid' : '',
    );

    let inputRender;

    if (this.type === 'textarea') {
      inputRender = html`
        <textarea
          ${setAttributes(this._ariaAttributes)}
          @input="${this._handleInput}"
          @blur=${this._handleBlur}
          @focus=${this._handleFocus}
          @click=${this._handleClick}
          @change=${this._handleChange}
          id="${ifDefined(this.id || undefined)}"
          name="${this.name}"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          .value="${this._value}"
          ?required=${this.required}
          ?invalid=${this.invalid}
          part="textarea focusable"
          placeholder=${ifDefined(this.placeholder || undefined)}
          aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
          class="${inputClasses}"
        ></textarea>
      `;
    } else {
      inputRender = html`
        <input
          ${setAttributes(this._ariaAttributes)}
          @input="${this._handleInput}"
          @blur=${this._handleBlur}
          @focus=${this._handleFocus}
          @click=${this._handleClick}
          @change=${this._handleChange}
          type="${this.type}"
          id="${ifDefined(this.id || undefined)}"
          name="${this.name}"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          .value="${this._value}"
          ?required=${this.required}
          ?invalid=${this.invalid}
          part="input focusable"
          placeholder=${ifDefined(this.placeholder || undefined)}
          aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
          class="${inputClasses}"
        />${this._renderTogglePasswordButton()}
      `;
    }

    if (this.validityMessage?.length > 0) {
      inputRender = html`
        ${inputRender}
        <div class="invalid-feedback form-feedback form-text form-feedback just-validate-error-label">
          ${this.validityMessage}
        </div>
      `;
    }

    return inputRender;
  }

  // Render the UI as a function of component state
  override render() {
    const supportTextId = `${this.id}-support-text`;

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
                ${this._renderInput(supportTextId)}
                <div class="input-group-append">
                  <slot name="append" @slotchange=${() => this.requestUpdate()}></slot>
                </div>
              </div>
              ${supportTextRender} ${this._renderpasswordStrengthMeter()}`,
          () => html` ${this._renderInput(supportTextId)} ${supportTextRender} ${this._renderpasswordStrengthMeter()}`,
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
