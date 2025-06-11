import { BaseComponent } from '@italia/globals';
import { html, PropertyValues, nothing, svg } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { getIcon, type AvailableIcons } from './icon-registry.js';

import styles from './icon.scss';

export type Colors = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'inverse' | 'light' | 'disabled';
export type Sizes = 'xs' | 'sm' | 'lg' | 'xl';
export type Alignments = 'top' | 'middle' | 'bottom';

@customElement('it-icon')
export class ItIcon extends BaseComponent {
  static styles = styles;

  @property({ type: String }) size?: Sizes;

  @property({ type: String }) name?: AvailableIcons;

  @property({ type: String }) color?: Colors;

  @property({ type: String }) background?: Colors;

  @property({ type: String }) align?: Alignments = 'middle';

  @property({ type: String, reflect: true }) label = '';

  @property({ type: Boolean }) padded = false;

  @property({ type: String }) src?: string;

  @state() private svgElement?: HTMLElement;

  @query('slot')
  private slotEl!: HTMLSlotElement;

  private titleId?: string;

  override async updated(changedProps: PropertyValues<this>) {
    if (changedProps.has('name') && this.name) {
      const loader = getIcon(this.name);
      if (loader) {
        const raw = (await loader()).default;
        this.parseAndStoreSvg(raw);
      }
    }

    if (changedProps.has('src') && this.src) {
      await this.loadSvgFromUrl(this.src);
    }

    if (changedProps.has('label')) {
      this.handleTitleId();
    }

    if (
      changedProps.has('label') ||
      changedProps.has('size') ||
      changedProps.has('color') ||
      changedProps.has('background') ||
      changedProps.has('padded') ||
      changedProps.has('role') ||
      changedProps.has('align')
    ) {
      this.updateSvgAttributes();
    }
  }

  private handleTitleId() {
    if (this.label) {
      if (!this.titleId) {
        this.titleId = `icon-label-${crypto.randomUUID()}`;
      }
    } else {
      this.titleId = undefined;
    }
  }

  private async loadSvgFromUrl(url: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load SVG from ${url} (status: ${res.status})`);

      const raw = await res.text();
      this.parseAndStoreSvg(raw);
    } catch (e) {
      this.svgElement = undefined;
      this.announceSvgLoadError();
    }
  }

  private announceSvgLoadError(): void {
    this.dispatchEvent(
      new Event('error', {
        bubbles: false,
        composed: false,
        cancelable: false,
      }),
    );
  }

  private parseAndStoreSvg(raw: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, 'image/svg+xml');
    const _svg = doc.documentElement;
    this.svgElement = _svg;
    this.updateSvgAttributes();
  }

  private applySvgAttributes(svgEl: HTMLElement) {
    svgEl.removeAttribute('width');
    svgEl.removeAttribute('height');

    const classList = this.updateClasses();
    svgEl.setAttribute('class', classList);
    svgEl.setAttribute('part', 'icon');
    svgEl.setAttribute('focusable', 'false');
    svgEl.setAttribute('role', this.role ?? 'img');
    svgEl.setAttribute('aria-hidden', this.ariaHidden !== null ? this.ariaHidden : 'true');

    svgEl.removeAttribute('aria-labelledby');
    svgEl.querySelectorAll('title').forEach((t) => t.remove());

    if (this.label && this.titleId) {
      const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      titleEl.id = this.titleId;
      titleEl.textContent = this.label;
      svgEl.prepend(titleEl);

      svgEl.setAttribute('aria-labelledby', this.titleId);
    }
  }

  private updateSvgAttributes() {
    if (!this.svgElement) return;

    this.applySvgAttributes(this.svgElement);
  }

  private updateClasses() {
    return this.composeClass(
      'icon',
      this.size ? `icon-${this.size}` : '',
      this.color ? `icon-${this.color}` : '',
      this.background ? `bg-${this.background}` : '',
      this.align ? `align-${this.align}` : '',
      this.padded ? `icon-padded` : '',
    );
  }

  private handleSlotChange() {
    const nodes = this.slotEl.assignedNodes({ flatten: true });
    const _svg = nodes.find(
      (node): node is HTMLElement =>
        node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === 'svg',
    );

    if (_svg) {
      this.applySvgAttributes(_svg);
    }
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}>${this.svgElement ? svg`${this.svgElement}` : nothing}</slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-icon': ItIcon;
  }
}
