import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '@italia/dropdown';
import type { ItDropdown } from '@italia/dropdown';

describe('<it-dropdown>', () => {
  it('is accessible', async () => {
    const el = await fixture<ItDropdown>(
      html`<it-dropdown>
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>`,
    );
    await el.updateComplete;
    await expect(el).to.be.accessible();
  });

  it('renders list items', async () => {
    const el = await fixture<ItDropdown>(
      html`<it-dropdown>
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>`,
    );
    await el.updateComplete;

    const items = el.querySelectorAll('it-dropdown-item');
    expect(items.length).to.equal(3);
    items.forEach((item) => {
      const li = item.shadowRoot?.querySelector('li');
      expect(li).to.exist;
    });
  });

  it('toggles popover on trigger click and updates aria-expanded', async () => {
    const el = await fixture<ItDropdown>(
      html`<it-dropdown>
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>`,
    );
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector('it-button')!;
    expect(button.getAttribute('aria-expanded')).to.equal('false');

    button.click();
    await oneEvent(el.shadowRoot!.querySelector('it-popover')!, 'popover-open');

    expect(button.getAttribute('aria-expanded')).to.equal('true');
    // Verifica che il menu abbia la classe "show" (indicando apertura)
    const menu = el.shadowRoot!.querySelector('ul.dropdown-menu')!;
    expect(menu.classList.contains('show')).to.be.true;

    button.click();
    await oneEvent(el.shadowRoot!.querySelector('it-popover')!, 'popover-close');

    expect(button.getAttribute('aria-expanded')).to.equal('false');
    expect(menu.classList.contains('show')).to.be.false;
  });

  it('does not open popover if disabled', async () => {
    const el = await fixture<ItDropdown>(
      html`<it-dropdown disabled>
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>`,
    );
    await el.updateComplete;

    const button = el.shadowRoot!.querySelector('it-button')!;
    expect(button.hasAttribute('disabled')).to.be.true;

    button.click();

    expect(button.getAttribute('aria-expanded')).to.equal('false');
    const menu = el.shadowRoot!.querySelector('ul.dropdown-menu')!;
    expect(menu.classList.contains('show')).to.be.false;
  });

  it('applies variant and size attributes to trigger button', async () => {
    const el = await fixture<ItDropdown>(html`
      <it-dropdown variant="danger" size="lg">
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>
    `);
    await el.updateComplete;

    const button = el.shadowRoot!.getElementById(el._buttonId)!;
    expect(button.getAttribute('variant')).to.equal('danger');
    expect(button.getAttribute('size')).to.equal('lg');
  });

  it('sets correct popover placement attribute based on alignment', async () => {
    const el = await fixture<ItDropdown>(html`
      <it-dropdown alignment="end">
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>
    `);
    await el.updateComplete;

    const popover = el.shadowRoot!.querySelector('it-popover')!;
    expect(popover.getAttribute('placement')).to.equal('end');
  });
});
