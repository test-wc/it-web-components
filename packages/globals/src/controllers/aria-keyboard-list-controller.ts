import { ReactiveController, ReactiveControllerHost } from 'lit';

export type AriaKeyboardConfig = {
  getItems: () => HTMLElement[];
  setActive: (idx: number) => void;
  closeMenu: () => void;
  trigger?: HTMLElement | null;
};

class AriaKeyboardListController implements ReactiveController {
  private host: ReactiveControllerHost;

  private config!: AriaKeyboardConfig;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    this.host.addController(this);
  }

  setConfig(config: AriaKeyboardConfig) {
    this.config = config;
  }

  hostDisconnected() {
    this.host.removeController(this);
  }

  // eslint-disable-next-line class-methods-use-this
  private getActiveElement(): HTMLElement | null {
    let active = document.activeElement;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active as HTMLElement | null;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (!this.config) return;
    const items = this.config.getItems();

    const currentIndex = items.indexOf(this.getActiveElement() as HTMLElement);
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        if (items.length) this.config.setActive(currentIndex < 0 ? 0 : (currentIndex + 1) % items.length);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        if (items.length)
          this.config.setActive(currentIndex < 0 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length);
        break;
      case 'Home':
        event.preventDefault();
        if (items.length) this.config.setActive(0);
        break;
      case 'End':
        event.preventDefault();
        if (items.length) this.config.setActive(items.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        this.config.closeMenu();
        break;
      default:
        break;
    }
  }
}

export default AriaKeyboardListController;
