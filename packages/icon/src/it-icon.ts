import { BaseComponent } from '@italia/globals';
import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getIcon, type AvailableIcons } from './icon-registry.js';

import styles from './icon.scss?inline';

@customElement('it-icon')
export class ItIcon extends BaseComponent(styles) {
  @property({ type: String })
  public size?: 'xs' | 'sm' | 'lg';

  @property({ type: String })
  public name?: AvailableIcons;

  @property({ type: String })
  public label?: string;

  protected svg: string | undefined;

  override async updated(changedProps: PropertyValues<this>) {
    if (changedProps.has('name') && this.name) {
      const loader = getIcon(this.name);
      if (loader) {
        this.svg = await loader();
        this.requestUpdate();
      }
    }
  }

  protected override update(changes: PropertyValues<this>): void {
    if (changes.has('label')) {
      if (this.label) {
        this.removeAttribute('aria-hidden');
      } else {
        this.setAttribute('aria-hidden', 'true');
      }
    }

    super.update(changes);
  }

  render() {
    console.log(this.svg, this.name);
    return html`
      <span class="icon icon-${this.size ?? 'sm'}" part="icon">
        ${this.svg ? html`<span .innerHTML=${this.svg}></span>` : ''}
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-icon': ItIcon;
  }
}
