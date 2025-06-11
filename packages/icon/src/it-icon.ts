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
  @property({ type: String }) role: string = 'img';
  @property({ type: String, reflect: true }) title = '';
  @property({ type: Boolean }) padded = false;
  @property({ type: String }) src?: string;

  @state() private svgElement?: HTMLElement;
  @state() private titleId?: string;
  @query('slot')
  private slotEl!: HTMLSlotElement;

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

    if (changedProps.has('title')) {
      this.handleTitleId();
    }

    if (
      changedProps.has('title') ||
      changedProps.has('size') ||
      changedProps.has('color') ||
      changedProps.has('background') ||
      changedProps.has('padded') ||
      changedProps.has('align')
    ) {
      this.updateSvgAttributes();
    }
  }

  private handleTitleId() {
    if (this.title) {
      if (!this.titleId) {
        this.titleId = `icon-title-${crypto.randomUUID()}`;
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
      console.error(e);
      this.svgElement = undefined;
      this.requestUpdate();
      this.announceSvgLoadError(e as Error);
    }
  }

  private announceSvgLoadError(error: Error): void {
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
    const svg = doc.documentElement;
    this.svgElement = svg;
    this.updateSvgAttributes();
  }

  private applySvgAttributes(svg: HTMLElement) {
    svg.removeAttribute('width');
    svg.removeAttribute('height');

    const classList = this.updateClasses();
    svg.setAttribute('class', classList);
    svg.setAttribute('part', 'icon');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('role', this.role);
    svg.setAttribute('aria-hidden', this.ariaHidden !== null ? this.ariaHidden : 'true');

    svg.removeAttribute('aria-labelledby');
    svg.querySelectorAll('title').forEach((t) => t.remove());

    if (this.title && this.titleId) {
      const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      titleEl.id = this.titleId;
      titleEl.textContent = this.title;
      svg.prepend(titleEl);

      svg.setAttribute('aria-labelledby', this.titleId);
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
    const svg = nodes.find(
      (node): node is HTMLElement =>
        node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === 'svg',
    );

    if (svg) {
      this.applySvgAttributes(svg);
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
