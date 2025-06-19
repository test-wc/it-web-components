import { BaseComponent, AriaKeyboardMixin } from '@italia/globals';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { applyDropdownClasses } from './dropdown-classes.js';
import './dropdown.scss';

@customElement('it-dropdown')
export class ItDropdown extends AriaKeyboardMixin(BaseComponent) {
  @property({ type: Boolean, reflect: true }) open = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @query('slot') private _slotEl!: HTMLSlotElement;

  private get _assignedElements(): HTMLElement[] {
    return (this._slotEl?.assignedElements({ flatten: true }) as HTMLElement[]) ?? [];
  }

  private get _trigger(): HTMLElement | undefined {
    return this._assignedElements.find((el) => el.hasAttribute('popovertarget')) as HTMLElement | undefined;
  }

  private get _menu(): HTMLElement | undefined {
    return (this._assignedElements.find((el) => el.hasAttribute('popover')) ||
      this._assignedElements.map((el) => el.querySelector?.('[popover]')).find(Boolean)) as HTMLElement | undefined;
  }

  private get _menuItems(): HTMLElement[] {
    const menu = this._menu;
    if (!menu) return [];
    return Array.from(menu.querySelectorAll('[role="menuitem"], a, button')).filter((el) => {
      const parent = el.parentElement;
      if (parent?.classList.contains('dropdown-header') || parent?.classList.contains('dropdown-divider')) return false;
      if (el.classList.contains('dropdown-header') || el.classList.contains('dropdown-divider')) return false;
      return !el.hasAttribute('disabled') && !el.getAttribute('aria-disabled');
    }) as HTMLElement[];
  }

  private _onClickOutside = (event: MouseEvent) => {
    const next = event.relatedTarget as Node | null;
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
    // Usa Popover API se disponibile, altrimenti tenta con show/hide
    if (this._menu) {
      if (typeof (this._menu as any).showPopover === 'function') {
        (this._menu as any).showPopover();
      } else if (typeof (this._menu as any).show === 'function') {
        (this._menu as any).show();
      }
    }
    setTimeout(() => {
      this._menuItems[0]?.focus();
    }, 0);
    this.setAriaExpanded(true);
    this.open = true;
  }

  private closeMenu() {
    if (this._menu) {
      if (typeof (this._menu as any).hidePopover === 'function') {
        (this._menu as any).hidePopover();
      } else if (typeof (this._menu as any).hide === 'function') {
        (this._menu as any).hide();
      }
    }
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
      applyDropdownClasses(this._trigger, this._menu, this._menuItems);
      this._trigger.setAttribute('aria-haspopup', 'menu');
      this._trigger.setAttribute('aria-expanded', String(this.open));
      this._trigger.setAttribute('aria-controls', this._menu.id || '');
      this._trigger.addEventListener('click', this._onTriggerClick);
      this._trigger.addEventListener('keydown', this._onKeyDown);
      this._menu.addEventListener('keydown', this._onKeyDown);
      this._menu.addEventListener('click', this._onMenuItemClick);

      if (!this._menu.hasAttribute('role')) this._menu.setAttribute('role', 'menu');
      this._menu.setAttribute('tabindex', '-1');
      this._menu.setAttribute('aria-hidden', String(!this.open));

      Array.from(this._menu.children).forEach((li, i) => {
        const liEl = li as HTMLElement;
        if (liEl.classList.contains('dropdown-header')) {
          liEl.setAttribute('role', 'presentation');
          liEl.setAttribute('tabindex', '-1');
          liEl.classList.add('dropdown-header');
          return;
        }
        if (liEl.classList.contains('dropdown-divider')) {
          liEl.setAttribute('role', 'separator');
          liEl.setAttribute('tabindex', '-1');
          liEl.classList.add('dropdown-divider');
          return;
        }
        const link = liEl.querySelector('a,button');
        const target = link || liEl;
        if (!target.hasAttribute('role')) target.setAttribute('role', 'menuitem');
        if (!target.id) target.id = `dropdown-item-${i}`;
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
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-dropdown': ItDropdown;
  }
}
