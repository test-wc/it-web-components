import { BaseComponent } from '@italia/globals';
import { customElement, property, query } from 'lit/decorators.js';
import { html } from 'lit';
import { computePosition, offset, flip, shift, autoUpdate, arrow, type Placement, size } from '@floating-ui/dom';
import styles from './popover.scss';

type PopoverPlacement = Placement;

@customElement('it-popover')
export class ItPopover extends BaseComponent {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) open = false;

  @property({ type: String }) placement: PopoverPlacement = 'bottom-start';

  @query('slot[name="trigger"]') private _triggerSlot!: HTMLSlotElement;

  @query('slot[name="content"]') private _contentSlot!: HTMLSlotElement;

  private _triggerElement!: HTMLElement;

  private _contentElement!: HTMLElement;

  private _arrowElement?: HTMLElement;

  private _cleanup?: () => void;

  connectedCallback() {
    super.connectedCallback?.();
    document.addEventListener('click', this._onDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    document.removeEventListener('click', this._onDocumentClick);
    this._cleanup?.();
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has('open')) {
      const triggerNodes = this._triggerSlot?.assignedElements({ flatten: true }) ?? [];
      const contentNodes = this._contentSlot?.assignedElements({ flatten: true }) ?? [];

      this._triggerElement = triggerNodes[0] as HTMLElement;
      this._contentElement = contentNodes[0] as HTMLElement;

      if (this._triggerElement) {
        this._triggerElement.setAttribute('aria-expanded', String(this.open));
      }

      if (this.open) {
        this._show();
        this.dispatchEvent(new CustomEvent('popover-open', { bubbles: true, composed: true }));
      } else {
        this._hide();
        this.dispatchEvent(new CustomEvent('popover-close', { bubbles: true, composed: true }));
      }
    }
  }

  private _createArrow() {
    if (!this._contentElement) return;

    if (!this._arrowElement) {
      this._arrowElement = document.createElement('div');
      this._arrowElement.className = 'arrow';
      this._contentElement.appendChild(this._arrowElement);
    }
  }

  private async _show() {
    if (!this._triggerElement || !this._contentElement) return;

    this._contentElement.style.position = 'absolute';
    this._contentElement.style.visibility = 'visible';

    this._createArrow();

    this._cleanup = autoUpdate(this._triggerElement, this._contentElement, () => {
      computePosition(this._triggerElement, this._contentElement, {
        placement: this.placement,
        middleware: [
          offset(8),
          flip(),
          shift({ padding: 8 }),
          size({
            apply({ rects, elements }) {
              Object.assign(elements.floating.style, {
                minWidth: `${rects.reference.width}px`,
              });
            },
          }),
          arrow({ element: this._arrowElement! }),
        ],
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(this._contentElement.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        if (middlewareData.arrow) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[placement.split('-')[0]];

          Object.assign(this._arrowElement!.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide as string]: '-6px',
            position: 'absolute',
            // width: '12px',
            // height: '12px',
            // background: 'var(--bsi-color-background-inverse)',
            transform: 'rotate(45deg)',
            // 'box-shadow': 'rgba(0, 0, 0, 0.1) 0px 0px 2px',
            // 'border-radius': '4px',
          });
        }
      });
    });

    this._focusContent();
  }

  private _hide() {
    this._cleanup?.();
    this._contentElement.style.visibility = 'hidden';
  }

  private _onDocumentClick = (event: MouseEvent) => {
    if (!this.open) return;

    const path = event.composedPath();

    if (!path.includes(this) && !path.includes(this._contentElement) && !path.includes(this._triggerElement)) {
      this.open = false;
    }
  };

  private _focusContent() {
    this._contentElement?.focus?.();
  }

  public toggle() {
    this.open = !this.open;
  }

  public openPopover() {
    this.open = true;
  }

  public closePopover() {
    this.open = false;
  }

  render() {
    return html`
      <slot name="trigger" part="trigger"></slot>
      <slot name="content"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-popover': ItPopover;
  }
}
