import { BaseComponent, AriaKeyboardMixin } from '@italia/globals';
import { html } from 'lit';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js';
import styles from './index.scss';

@customElement('it-dropdown')
export class ItDropdown extends AriaKeyboardMixin(BaseComponent) {
  static styles = styles;

  @state() open = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  // @query('slot') private _slotEl!: HTMLSlotElement;

  @queryAssignedElements({ slot: 'trigger', flatten: true }) private _triggers!: HTMLElement[];

  @queryAssignedElements({ slot: 'menu', flatten: true }) private _menus!: HTMLElement[];

  // Can't style this properly with shadow dom
  // see: https://stackoverflow.com/a/62859364/4074796
  // protected createRenderRoot() {
  //   return this;
  // }

  // private get _assignedElements(): HTMLElement[] {
  //   return (this._slotEl?.assignedElements({ flatten: true }) as HTMLElement[]) ?? [];
  // }

  private get _trigger(): HTMLButtonElement | null {
    if (this._triggers.length === 0) return null;
    const element = this._triggers[0];
    if (element.tagName === 'BUTTON') {
      return element as HTMLButtonElement;
    }
    if (element.shadowRoot) {
      // Se l'elemento ha uno shadowRoot, cerca il primo button all'interno dello shadowRoot
      return element.shadowRoot.querySelector<HTMLButtonElement>('button');
    }
    // Se non è un button, cerca il primo button all'interno dell'elemento
    return element.querySelector<HTMLButtonElement>('button');
  }

  private get _menu(): HTMLElement | null {
    if (this._menus.length > 0) {
      return this._menus[0];
    }
    return null;
  }

  private get _menuItems(): HTMLElement[] {
    if (!this._menu) return [];
    return Array.from(this._menu.querySelectorAll<HTMLElement>('[role="menuitem"], a, button')).filter((el) => {
      const parent = el.parentElement;
      if (parent?.classList.contains('dropdown-header') || parent?.classList.contains('dropdown-divider')) return false;
      if (el.classList.contains('dropdown-header') || el.classList.contains('dropdown-divider')) return false;
      return !el.hasAttribute('disabled') && !el.getAttribute('aria-disabled');
    });
  }

  private _onClickOutside = (event: MouseEvent) => {
    const next = event.target as Node | null;
    if (!next || !this.contains(next)) {
      this.closeMenu();
    }
  };

  private _onComponentFocusOut = (event: FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.contains(next)) {
      this.closeMenu();
    }
  };

  private _onKeyDown = (event: KeyboardEvent) => {
    const items = this._menuItems;
    // Usa activeElement del rootNode per gestire shadow dom correttamente
    const active = (this.getRootNode() as unknown as DocumentOrShadowRoot)?.activeElement;
    const currentIndex = items.indexOf(active as HTMLElement);
    if (event.key === 'Tab') {
      if (event.shiftKey && currentIndex === 0) {
        // Se sei sul primo item e premi Shift+Tab, focus sul trigger e lascia il menu aperto
        this._trigger?.focus();
        event.preventDefault();
        return;
      }
      if (!event.shiftKey && currentIndex === items.length - 1) {
        // Se sei sull'ultimo item e premi Tab, chiudi il menu e lascia gestire il tab al browser
        this.closeMenu();
        return;
      }
      return; // Lascia che il browser gestisca il tab normale
    }

    this._onAriaKeyDown(event, {
      getItems: () => this._menuItems,
      setActive: (idx) => this._menuItems[idx]?.focus(),
      closeMenu: () => this.closeMenu(),
      trigger: this._trigger,
    });
  };

  private _onTriggerClick = () => {
    if (this.disabled) return;
    if (this.open) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  private _onMenuItemClick = () => {
    this.closeMenu();
  };

  private openMenu() {
    if (this.disabled) return;
    // TODO do this on state change
    setTimeout(() => {
      this._menuItems[0]?.focus();
    }, 0);
    this.setAriaExpanded(true);
    this.open = true;
  }

  private closeMenu() {
    this.setAriaExpanded(false);
    this.open = false;
  }

  private setAriaExpanded(expanded: boolean) {
    if (this._trigger) {
      this._trigger.setAttribute('aria-expanded', String(expanded));
    }
    if (this._menu) {
      this._menu.setAttribute('aria-hidden', String(!expanded));
    }
  }

  async firstUpdated() {
    await new Promise((r) => {
      setTimeout(r, 0);
    });
    if (this._trigger && this._menu) {
      const menuId = this._menu.id;
      this._trigger.classList.add('dropdown-toggle');
      // this._menu.classList.add('dropdown-menu');
      this._menuItems.forEach((item) => item.classList.add('dropdown-item'));
      this._trigger.setAttribute('aria-haspopup', 'menu');
      this._trigger.setAttribute('aria-expanded', String(this.open));
      this._trigger.setAttribute('aria-controls', menuId || '');
      this._trigger.addEventListener('click', this._onTriggerClick);
      this._trigger.addEventListener('keydown', this._onKeyDown);
      this._menu.addEventListener('keydown', this._onKeyDown);
      this._menu.addEventListener('click', this._onMenuItemClick);

      if (!this._menu.hasAttribute('role') && !this._menu.querySelector('[role="menu"]')) {
        if (this._menu.tagName === 'UL' || this._menu.tagName === 'OL') {
          this._menu.setAttribute('role', 'menu');
        } else {
          this._menu.querySelector('ul,ol')?.setAttribute('role', 'menu');
        }
      }
      this._menu.setAttribute('tabindex', '-1');
      this._menu.setAttribute('aria-hidden', String(!this.open));

      const listItems =
        this._menu.tagName === 'UL' || this._menu.tagName === 'OL'
          ? this._menu.children
          : this._menu.querySelectorAll('li');
      Array.from(listItems).forEach((li, i) => {
        const liEl = li as HTMLLIElement;
        if (liEl.classList.contains('dropdown-header')) {
          liEl.setAttribute('role', 'presentation');
          liEl.setAttribute('tabindex', '-1');
          return;
        }
        if (liEl.classList.contains('dropdown-divider')) {
          liEl.setAttribute('role', 'separator');
          liEl.setAttribute('tabindex', '-1');
          return;
        }
        const link = liEl.querySelector('a,button');
        if (link) liEl.setAttribute('role', 'none');
        const target = link || liEl;
        if (!target.hasAttribute('role')) target.setAttribute('role', 'menuitem');
        if (!target.id) target.id = `dropdown-item-${menuId}-${i}`;
      });
    }
  }

  connectedCallback(): void {
    super.connectedCallback?.();
    document.addEventListener('click', this._onClickOutside);
    this.addEventListener('focusout', this._onComponentFocusOut, true);
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this._onClickOutside);
    this.removeEventListener('focusout', this._onComponentFocusOut, true);
    if (this._trigger) {
      this._trigger.removeEventListener('click', this._onTriggerClick as EventListener);
      this._trigger.removeEventListener('keydown', this._onKeyDown as EventListener);
    }
    if (this._menu) {
      this._menu.removeEventListener('click', this._onTriggerClick as EventListener);
      this._menu.removeEventListener('keydown', this._onKeyDown as EventListener);
    }

    super.disconnectedCallback?.();
  }

  render() {
    return html`
      <div class="dropdown" part="dropdown">
        <slot name="trigger"></slot>
        <div class="${this.composeClass('dropdown-menu', this.open ? 'show' : '')}" part="menu">
          <slot name="menu"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-dropdown': ItDropdown;
  }
}
