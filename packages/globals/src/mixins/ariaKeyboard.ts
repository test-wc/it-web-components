import { LitElement } from 'lit';
import { Constructor } from '../index.js';

export type AriaKeyboardConfig = {
  getItems: () => HTMLElement[];
  setActive: (idx: number) => void;
  closeMenu: () => void;
  trigger?: HTMLElement | null;
};

export interface AriaKeyboardMixinInterface {
  _onAriaKeyDown(event: KeyboardEvent, config: AriaKeyboardConfig): void;
}
// Tipizzazione costruttore generico
export type AriaKeyboardMixinType<T extends Constructor<HTMLElement>> = typeof LitElement &
  Constructor<AriaKeyboardMixinInterface> &
  T;
/**
 * Mixin per la gestione della tastiera secondo pattern ARIA.
 * Da usare così:
 *   class MyComponent extends AriaKeyboardMixin(BaseComponent) { ... }
 */
export function AriaKeyboardMixin<T extends Constructor<HTMLElement>>(Base: T) {
  abstract class AriaKeyboardMixinImpl extends Base {
    // Not using TypeScript `protected` due to: microsoft/TypeScript#17744

    // eslint-disable-next-line class-methods-use-this
    _onAriaKeyDown(event: KeyboardEvent, config: AriaKeyboardConfig) {
      const items = config.getItems();
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (items.length) config.setActive(currentIndex < 0 ? 0 : (currentIndex + 1) % items.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (items.length)
            config.setActive(currentIndex < 0 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length);
          break;
        case 'Home':
          event.preventDefault();
          if (items.length) config.setActive(0);
          break;
        case 'End':
          event.preventDefault();
          if (items.length) config.setActive(items.length - 1);
          break;

        case 'Escape':
          event.preventDefault();
          config.closeMenu();
          break;

        default:
          break;
      }
    }
  }
  return AriaKeyboardMixinImpl;
}

export default AriaKeyboardMixin;
