import { BaseComponent } from '@italia/globals';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './dropdown.scss';

@customElement('it-dropdown')
export class ItDropdown extends BaseComponent {
  @property({ type: Boolean, reflect: true }) open = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  private _trigger: HTMLElement | null = null;

  private _menu: HTMLElement | null = null;

  private _menuItems: HTMLElement[] = [];

  private _onClickOutside = (event: MouseEvent) => {
    if (!this.contains(event.target as Node)) {
      this.closeMenu();
    }
  };

  private _onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    if (!this.open && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.openMenu();
      return;
    }
    if (!this.open) return;
    const items = this._menuItems;
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (items.length) {
          const next = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
          items[next].focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (items.length) {
          const prev = currentIndex < 0 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
          items[prev].focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        if (items.length) items[0].focus();
        break;
      case 'End':
        event.preventDefault();
        if (items.length) items[items.length - 1].focus();
        break;
      case 'Tab':
        this.closeMenu();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeMenu();
        this._trigger?.focus();
        break;
      case 'Enter':
      case ' ': {
        if (document.activeElement && items.includes(document.activeElement as HTMLElement)) {
          (document.activeElement as HTMLElement).click();
          this.closeMenu();
        }
        break;
      }
      default:
        // No action for other keys
        break;
    }
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
    this._trigger?.focus();
  };

  private openMenu() {
    if (this.disabled) return;
    this.open = true;
    if (this._menu) {
      (this._menu as any).show?.();
      setTimeout(() => {
        this._menuItems = this.getMenuItems();
        this._menuItems[0]?.focus();
      }, 0);
    }
    this.setAriaExpanded(true);
  }

  private closeMenu() {
    this.open = false;
    if (this._menu) (this._menu as any).hide?.();
    this.setAriaExpanded(false);
  }

  private setAriaExpanded(expanded: boolean) {
    if (this._trigger) {
      this._trigger.setAttribute('aria-expanded', String(expanded));
    }
    if (this._menu) {
      this._menu.setAttribute('aria-hidden', String(!expanded));
    }
  }

  private getMenuItems(): HTMLElement[] {
    if (!this._menu) return [];
    // Only focusable menuitems, skip headers and dividers
    return Array.from(this._menu.querySelectorAll('[role="menuitem"], a, button')).filter((el) => {
      // Skip if inside header/divider
      const parent = el.parentElement;
      if (parent?.classList.contains('dropdown-header') || parent?.classList.contains('dropdown-divider')) return false;
      if (el.classList.contains('dropdown-header') || el.classList.contains('dropdown-divider')) return false;
      return !el.hasAttribute('disabled') && !el.getAttribute('aria-disabled');
    }) as HTMLElement[];
  }

  firstUpdated() {
    // Find trigger and menu
    const slot = this.shadowRoot?.querySelector('slot');
    const assigned = slot ? (slot as HTMLSlotElement).assignedElements({ flatten: true }) : [];
    this._trigger = assigned.find((el) => el.hasAttribute('popovertarget')) as HTMLElement;
    this._menu = assigned.find((el) => el.hasAttribute('popover')) as HTMLElement;
    if (this._trigger) {
      this._trigger.setAttribute('aria-haspopup', 'menu');
      this._trigger.setAttribute('aria-expanded', String(this.open));
      if (this._menu) {
        this._trigger.setAttribute('aria-controls', this._menu.id || '');
      }
      this._trigger.addEventListener('click', this._onTriggerClick as EventListener);
      this._trigger.addEventListener('keydown', this._onKeyDown as EventListener);
    }
    if (this._menu) {
      // Only set role if not already set by user
      if (!this._menu.hasAttribute('role')) {
        this._menu.setAttribute('role', 'menu');
      }
      this._menu.setAttribute('tabindex', '-1');
      this._menu.setAttribute('aria-hidden', String(!this.open));
      // Set roles/classes for children
      Array.from(this._menu.children).forEach((li) => {
        const liEl = li as HTMLElement;
        // Header
        if (liEl.classList.contains('dropdown-header')) {
          liEl.setAttribute('role', 'presentation');
          liEl.setAttribute('tabindex', '-1');
          return;
        }
        // Divider
        if (liEl.classList.contains('dropdown-divider')) {
          liEl.setAttribute('role', 'separator');
          liEl.setAttribute('tabindex', '-1');
          return;
        }
        // Menu item (with or without icon)
        const link = liEl.querySelector('a,button');
        if (link) {
          if (!link.hasAttribute('role')) link.setAttribute('role', 'menuitem');
          (link as HTMLElement).tabIndex = -1;
          (link as HTMLElement).addEventListener('keydown', this._onKeyDown as EventListener);
          (link as HTMLElement).addEventListener('click', this._onMenuItemClick as EventListener);
        } else {
          if (!liEl.hasAttribute('role')) liEl.setAttribute('role', 'menuitem');
          liEl.tabIndex = -1;
          liEl.addEventListener('keydown', this._onKeyDown as EventListener);
          liEl.addEventListener('click', this._onMenuItemClick as EventListener);
        }
      });
    }
  }

  updated(changed: Map<string, any>) {
    if (changed.has('open')) {
      this.setAriaExpanded(this.open);
      if (this.open && this._menu) {
        setTimeout(() => {
          this._menuItems = this.getMenuItems();
          this._menuItems[0]?.focus();
        }, 0);
      }
    }
    if (changed.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('tabindex', '-1');
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('tabindex');
        this.removeAttribute('aria-disabled');
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback?.();
    document.addEventListener('click', this._onClickOutside);
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this._onClickOutside);
    if (this._trigger) {
      this._trigger.removeEventListener('click', this._onTriggerClick as EventListener);
      this._trigger.removeEventListener('keydown', this._onKeyDown as EventListener);
    }
    if (this._menu) {
      Array.from(this._menu.children).forEach((li) => {
        const link = li.querySelector('a,button');
        (link || li).removeEventListener('keydown', this._onKeyDown as EventListener);
        (link || li).removeEventListener('click', this._onMenuItemClick as EventListener);
      });
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
