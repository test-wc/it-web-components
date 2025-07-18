import { BaseComponent } from '@italia/globals';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './dropdown-item.scss';

@customElement('it-dropdown-item')
export class ItDropdownItem extends BaseComponent {
  static styles = styles;

  // static override shadowRootOptions = {
  //   ...LitElement.shadowRootOptions,
  //   delegatesFocus: true,
  // };

  @property({ type: String }) label = '';

  @property({ type: String }) value = '';

  @property({ type: String }) href?: string;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true }) active = false;

  @property({ type: Boolean, reflect: true }) large = false;

  @property({ type: Boolean, reflect: true }) separator = false;

  @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;

  public getFocusableElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('a, button') ?? null;
  }

  handlePress(event: KeyboardEvent | MouseEvent) {
    if (this.disabled) event.preventDefault();
  }

  override render() {
    if (this.separator) {
      return html`<li><span class="divider" role="separator"></span></li>`;
    }

    const classes = this.composeClass('list-item', 'dropdown-item', {
      disabled: this.disabled,
      active: this.active,
      large: this.large,
      'full-width': this.fullWidth,
    });

    const roleParent = this.closest('it-dropdown')?.getAttribute('role') ?? 'list';
    let roleAttr: string | undefined;

    if (roleParent === 'menu') roleAttr = 'menuitem';
    else if (roleParent === 'listbox') roleAttr = 'option';

    const content = html`
      <slot name="prefix"></slot>
      <slot>${this.label}${this.active ? html`<span class="visually-hidden"> attivo</span>` : null}</slot>
      <slot name="suffix"></slot>
    `;

    return html`
      <li role=${ifDefined(roleAttr)} class=${classes}>
        ${this.href
          ? html`<a
              href=${this.href}
              aria-disabled=${ifDefined(this.disabled)}
              @keydown=${this.handlePress}
              @click=${this.handlePress}
              >${content}</a
            >`
          : html`<span>${content}</span>`}
      </li>
    `;
  }
}
