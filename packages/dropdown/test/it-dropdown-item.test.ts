import { fixture, html, expect } from '@open-wc/testing';
import '@italia/dropdown';
import type { ItDropdown } from '@italia/dropdown';
import type { ItDropdownItem } from '../src/it-dropdown-item';

describe('<it-dropdown-item>', () => {
  describe('Basic rendering', () => {
    it('renders as link when href is provided', async () => {
      const el = await fixture<ItDropdownItem>(
        html`<it-dropdown-item href="#test" label="Test Item"></it-dropdown-item>`,
      );
      await el.updateComplete;

      const link = el.shadowRoot!.querySelector('a')!;
      expect(link).to.exist;
      expect(link.getAttribute('href')).to.equal('#test');
      expect(link.textContent?.trim()).to.include('Test Item');
    });

    it('renders as span when href is not provided', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item label="Test Item"></it-dropdown-item>`);
      await el.updateComplete;

      const span = el.shadowRoot!.querySelector('.dropdown-item-text')!;
      expect(span).to.exist;
      expect(span.textContent?.trim()).to.include('Test Item');
    });

    it('renders content from default slot', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item href="#">Custom Content</it-dropdown-item>`);
      await el.updateComplete;

      // Il contenuto dello slot viene reso nel tag span dentro il link
      const link = el.shadowRoot!.querySelector('a')!;
      const span = link.querySelector('span')!;
      const slot = span.querySelector('slot:not([name])') as HTMLSlotElement;

      // Verifica che lo slot esista e che il contenuto venga assegnato correttamente
      expect(slot).to.exist;

      // Verifica il contenuto assegnato allo slot
      const assignedNodes = slot.assignedNodes();
      expect(assignedNodes.length).to.be.greaterThan(0);
      expect(assignedNodes[0].textContent?.trim()).to.equal('Custom Content');
    });

    it('renders label when provided', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item href="#" label="Label Text"></it-dropdown-item>`);
      await el.updateComplete;

      const link = el.shadowRoot!.querySelector('a')!;
      expect(link.textContent?.trim()).to.include('Label Text');
    });
  });

  describe('Separator rendering', () => {
    it('renders as separator when separator property is true', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item separator></it-dropdown-item>`);
      await el.updateComplete;

      const separator = el.shadowRoot!.querySelector('.divider')!;
      expect(separator).to.exist;
      expect(separator.getAttribute('role')).to.equal('separator');

      const link = el.shadowRoot!.querySelector('a');
      expect(link).to.not.exist;
    });
  });

  describe('State classes', () => {
    it('applies disabled class when disabled', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item href="#" disabled></it-dropdown-item>`);
      await el.updateComplete;

      const link = el.shadowRoot!.querySelector('a')!;
      expect(link.classList.contains('disabled')).to.be.true;
      expect(link.getAttribute('aria-disabled')).to.equal('true');
    });

    it('applies active class when active', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item href="#" active></it-dropdown-item>`);
      await el.updateComplete;

      const link = el.shadowRoot!.querySelector('a')!;
      expect(link.classList.contains('active')).to.be.true;
    });

    it('applies large class when large', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item href="#" large></it-dropdown-item>`);
      await el.updateComplete;

      const link = el.shadowRoot!.querySelector('a')!;
      expect(link.classList.contains('large')).to.be.true;
    });

    it('adds visually hidden text for active items', async () => {
      const el = await fixture<ItDropdownItem>(
        html`<it-dropdown-item href="#" active label="Test"></it-dropdown-item>`,
      );
      await el.updateComplete;

      const visuallyHidden = el.shadowRoot!.querySelector('.visually-hidden')!;
      expect(visuallyHidden).to.exist;
      expect(visuallyHidden.textContent?.trim()).to.equal('attivo');
    });
  });

  describe('Parent dropdown context', () => {
    it('applies dark class when parent dropdown has dark attribute', async () => {
      const dropdown = await fixture<ItDropdown>(
        html`<it-dropdown dark>
          <it-dropdown-item href="#" id="test-item">Item</it-dropdown-item>
        </it-dropdown>`,
      );
      await dropdown.updateComplete;

      const item = dropdown.querySelector('#test-item') as ItDropdownItem;
      await item.updateComplete;

      const li = item.shadowRoot!.querySelector('li')!;
      expect(li.classList.contains('dark')).to.be.true;
    });

    it('applies fw class when parent dropdown has full-width attribute', async () => {
      const dropdown = await fixture<ItDropdown>(
        html`<it-dropdown full-width>
          <it-dropdown-item href="#" id="test-item">Item</it-dropdown-item>
        </it-dropdown>`,
      );
      await dropdown.updateComplete;

      const item = dropdown.querySelector('#test-item') as ItDropdownItem;
      await item.updateComplete;

      const li = item.shadowRoot!.querySelector('li')!;
      expect(li.classList.contains('fw')).to.be.true;
    });
  });

  describe('Role attributes', () => {
    it('sets menuitem role when parent has menu role', async () => {
      const dropdown = await fixture<ItDropdown>(
        html`<it-dropdown role="menu">
          <it-dropdown-item href="#" id="test-item">Item</it-dropdown-item>
        </it-dropdown>`,
      );
      await dropdown.updateComplete;

      const item = dropdown.querySelector('#test-item') as ItDropdownItem;
      await item.updateComplete;

      const link = item.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('role')).to.equal('menuitem');
    });

    it('sets option role when parent has listbox role', async () => {
      const dropdown = await fixture<ItDropdown>(
        // TODO FIX this
        // eslint-disable-next-line lit-a11y/accessible-name
        html`<it-dropdown role="listbox">
          <it-dropdown-item href="#" id="test-item">Item</it-dropdown-item>
        </it-dropdown>`,
      );
      await dropdown.updateComplete;

      const item = dropdown.querySelector('#test-item') as ItDropdownItem;
      await item.updateComplete;

      const link = item.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('role')).to.equal('option');
    });

    it('does not set specific role when parent has list role', async () => {
      const dropdown = await fixture<ItDropdown>(
        html`<it-dropdown>
          <it-dropdown-item href="#" id="test-item">Item</it-dropdown-item>
        </it-dropdown>`,
      );
      await dropdown.updateComplete;

      const item = dropdown.querySelector('#test-item') as ItDropdownItem;
      await item.updateComplete;

      const link = item.shadowRoot!.querySelector('a')!;
      expect(link.hasAttribute('role')).to.be.false;
    });
  });

  describe('Slot rendering', () => {
    it('renders prefix slot content', async () => {
      const el = await fixture<ItDropdownItem>(
        html`<it-dropdown-item href="#">
          <span slot="prefix">PREFIX</span>
          Item Text
        </it-dropdown-item>`,
      );
      await el.updateComplete;

      const prefixSlot = el.shadowRoot!.querySelector('slot[name="prefix"]')!;
      expect(prefixSlot).to.exist;
    });

    it('renders suffix slot content', async () => {
      const el = await fixture<ItDropdownItem>(
        html`<it-dropdown-item href="#">
          Item Text
          <span slot="suffix">SUFFIX</span>
        </it-dropdown-item>`,
      );
      await el.updateComplete;

      const suffixSlot = el.shadowRoot!.querySelector('slot[name="suffix"]')!;
      expect(suffixSlot).to.exist;
    });
  });

  describe('Event handling', () => {
    it('prevents default when disabled and clicked', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item href="#" disabled>Item</it-dropdown-item>`);
      await el.updateComplete;

      const link = el.shadowRoot!.querySelector('a')!;
      let defaultPrevented = false;

      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'preventDefault', {
        value: () => {
          defaultPrevented = true;
        },
      });

      link.dispatchEvent(event);
      expect(defaultPrevented).to.be.true;
    });

    it('prevents default when disabled and key pressed', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item href="#" disabled>Item</it-dropdown-item>`);
      await el.updateComplete;

      const link = el.shadowRoot!.querySelector('a')!;
      let defaultPrevented = false;

      const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'preventDefault', {
        value: () => {
          defaultPrevented = true;
        },
      });

      link.dispatchEvent(event);
      expect(defaultPrevented).to.be.true;
    });
  });

  describe('Focusable element', () => {
    it('returns focusable element for link', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item href="#">Item</it-dropdown-item>`);
      await el.updateComplete;

      const focusable = el.getFocusableElement();
      expect(focusable).to.exist;
      expect(focusable?.tagName.toLowerCase()).to.equal('a');
    });

    it('returns null when no focusable element exists', async () => {
      const el = await fixture<ItDropdownItem>(html`<it-dropdown-item separator></it-dropdown-item>`);
      await el.updateComplete;

      const focusable = el.getFocusableElement();
      expect(focusable).to.be.null;
    });
  });
});
