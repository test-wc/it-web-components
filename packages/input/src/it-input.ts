import { BaseComponent, FormMixin, ValidityMixin, setAttributes } from '@italia/globals';
import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { calculateScore, scoreColor, scoreText } from './helpers/password.js';

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

  @property({ type: Array<Suggestion> })
  private _passwordSuggestions = '';

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
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    if (this.passwordStrengthMeter) {
      this._checkPasswordStrength(input.value);
    }
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

  private getTranslation(id: string): string {
    const _t: Record<string, string> = { ...DEFAULT_TRANSLATIONS, ...this.translations };
    return _t[id];
  }

  private _togglePasswordVisibility() {
    this._passwordVisible = !this._passwordVisible;
    if (this._inputElement) {
      this._inputElement.type = this._passwordVisible ? 'text' : 'password';
    }
  }

  private _checkPasswordStrength(value: string) {
    const score = calculateScore(value, this.minPasswordLength);
    this._updatePasswordMeter(score);
    this._updatePasswordText(score, value);
    // this._updateSuggestions(password)
  }

  private _updatePasswordMeter(score: number) {
    const perc: number = score < 0 ? 0 : score;
    const meter = this.renderRoot.querySelector('.progress-bar') as HTMLElement;
    if (meter) {
      meter.classList.forEach((className) => {
        if (className.match(/(^|\s)bg-\S+/g)) {
          meter.classList.remove(className);
        }
      });
      meter.classList.add(`bg-${scoreColor(score)}`);
      meter.style.width = `${perc}%`;
      meter.setAttribute('aria-valuenow', perc.toString());
    }
  }

  private _updatePasswordText(score, password) {
    //this._strengthInfos
    let text = scoreText(score, this.translations);
    if (this.suggestions) {
      const { completedCount, totalCount } = this._getCompletedSuggestions(password);
      const suggestionText =
        completedCount === 1 ? this._config.suggestionFollowed : this._config.suggestionFollowedPlural;
      text += ` ${completedCount} ${this._config.suggestionOf} ${totalCount} ${suggestionText}.`;
    }
    if (this._textElement.textContent !== text) {
      this._textElement.textContent = text;
      this._textElement.classList.forEach((className) => {
        if (className.match(/(^|\s)text-\S+/g)) {
          this._textElement.classList.remove(className);
        }
      });
      this._textElement.classList.add(`text-${this._scoreColor(score)}`);
      EventHandler.trigger(this._element, EVENT_TEXT);
    }
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
          <span class="visually-hidden">${this.getTranslation('showHidePassword')}</span>
          <it-icon
            name="${this._passwordVisible ? 'it-password-visible' : 'it-password-invisible'}"
            size="sm"
          ></it-icon>
        </button>
      `;
    }
    return nothing;
  }

  private _renderpasswordStrengthMeter() {
    if (this.type === 'password' && this.passwordStrengthMeter) {
      return html`<div class="password-strength-meter">
        ${this.suggestions
          ? html`<div class="strenght-meter-suggestions small form-text text-muted">
              <label class="visually-hidden" for="suggestions">${this.translations.suggestionsLabel}</label>
              <div class="password-suggestions">
                <div class="suggestion">
                  <svg
                    class="icon icon-xs me-1"
                    aria-label="Soddisfatto: "
                    viewBox="0 0 24 24"
                    style="width: 1em; height: 1em;"
                  >
                    <path d="M9.6 16.9 4 11.4l.8-.7 4.8 4.8 8.5-8.4.7.7-9.2 9.1z"></path></svg
                  ><span>Almeno 8 caratteri.</span>
                </div>
              </div>
            </div>`
          : nothing}

        <p
          id=${`strengthMeterInfo_${this.id}`}
          class="strength-meter-info small form-text text-muted pt-0"
          aria-live="polite"
        >
          ${this._strengthInfos}
        </p>
        <div class="password-meter progress rounded-0 position-absolute">
          <div
            class="progress-bar bg-muted"
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="${this.getTranslation('ariaLabelPasswordMeter')}"
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
    const _ariaDescribedBy = [];
    if (this.supportText?.length > 0) {
      _ariaDescribedBy.push(supportTextId);
    }
    if (this.passwordStrengthMeter) {
      _ariaDescribedBy.push(`strengthMeterInfo_${this.id}`);
    }
    if (this._ariaAttributes['aria-describedby']?.length > 0) {
      _ariaDescribedBy.push(this._ariaAttributes['aria-describedby']);
    }
    const ariaDescribedBy = _ariaDescribedBy.join(' ');

    let inputRender;

    if (this.type === 'textarea') {
      inputRender = html`
        <textarea
          ${setAttributes(this._ariaAttributes)}
          @input="${this.handleInput}"
          id="${ifDefined(this.id || undefined)}"
          name="${this.name}"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          .value="${this._value}"
          ?required=${this.required}
          part="textarea focusable"
          placeholder=${ifDefined(this.placeholder || undefined)}
          aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
          class="${this.plaintext ? 'form-control-plaintext' : 'form-control'} ${this.size
            ? `form-control-${this.size}`
            : ''}"
        ></textarea>
      `;
    } else {
      inputRender = html`
        <input
          ${setAttributes(this._ariaAttributes)}
          @input="${this.handleInput}"
          type="${this.type}"
          id="${ifDefined(this.id || undefined)}"
          name="${this.name}"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          .value="${this._value}"
          ?required=${this.required}
          part="input focusable"
          placeholder=${ifDefined(this.placeholder || undefined)}
          aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
          class="${this.plaintext ? 'form-control-plaintext' : 'form-control'} ${this.size
            ? `form-control-${this.size}`
            : ''}"
        />
        ${this._renderTogglePasswordButton()}
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
