import { html } from 'lit';
import { BaseComponent } from '@italia/globals';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ChipSize, ChipVariant } from './types.js';

import styles from './it-chip.scss';

@customElement('it-chip')
export class ItChip extends BaseComponent {
  static styles = styles;

  @property({ type: Boolean }) dismissable = false;

  @property({ type: String }) size: ChipSize = 'sm';

  @property({ type: String }) avatar = '';

  @property({ type: String }) avatarAlt = '';

  @property({ type: String }) label = '';

  @property({ type: String }) href = '';

  @property({ type: String }) variant: ChipVariant = '';

  @property({ type: Boolean }) disabled = false;

  @queryAssignedElements({ slot: 'dismiss-button', flatten: true })
  closeButton!: HTMLButtonElement[];

  private getAvatarClass() {
    return this.composeClass('avatar', this.size === 'lg' ? 'size-sm' : 'size-xs');
  }

  override updated(changedProps: any) {
    if (this.dismissable) {
      if (!this.closeButton.length) {
        this.logger.warn(
          'The `dismissable` property is enabled, but no <button slot="dismiss-button"> was found. ' +
            'This button is required to allow chip removal.',
        );
      } else {
        this.closeButton.forEach((btn) => {
          if (
            (btn.tagName.toLowerCase() === 'it-button' &&
              !btn.hasAttribute('label') &&
              btn.textContent?.trim().length === 0) ||
            (btn.tagName.toLowerCase() === 'button' &&
              !btn.hasAttribute('aria-label') &&
              btn.textContent?.trim().length === 0)
          ) {
            this.logger.warn(
              'Dismiss button lacks both a `label`, an `aria-label` and text content. ' +
                'Providing an accessible label or visually hidden text content is strongly recommended.',
            );
          }
        });
      }
    }
    if (changedProps.has('disabled')) {
      this.closeButton.forEach((btn) => {
        // eslint-disable-next-line no-param-reassign
        btn.disabled = this.disabled;
      });
    }

    if (this.avatar && !this.avatarAlt) {
      this.logger.warn(
        'Avatar image provided without an alternative text (`avatarAlt`). ' +
          'This negatively impacts accessibility compliance.',
      );
    }
  }

  private _handleDismissSlotChange() {
    if (this.closeButton?.length && this.disabled !== undefined) {
      this.closeButton.forEach((btn) => {
        // eslint-disable-next-line no-param-reassign
        btn.disabled = this.disabled;
      });
    }
  }

  render() {
    const classes = {
      chip: true,
      [`chip-${this.size}`]: this.size,
      [`chip-${this.variant}`]: !!this.variant,
      'chip-disabled': this.disabled,
    };
    const content = html`
      <slot name="icon"></slot>
      ${this.avatar
        ? html`<div class="${this.getAvatarClass()}"><img src=${this.avatar} alt="${this.avatarAlt}" /></div>`
        : null}
      <span class="chip-label">${this.label}</span>
      <slot name="dismiss-button" @slotchange=${this._handleDismissSlotChange}></slot>
    `;

    return this.href
      ? html`<a class="${classMap(classes)}" part="chip" href="${this.href}">${content}</a>`
      : html`<div class="${classMap(classes)}" part="chip">${content}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-chip': ItChip;
  }
}
