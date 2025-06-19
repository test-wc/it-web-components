import { fixture, expect, html } from '@open-wc/testing';
import '../src/it-dropdown.js';

describe('<it-dropdown>', () => {
  it('renders slot content', async () => {
    const el = await fixture(html`<it-dropdown><button>Test</button></it-dropdown>`);
    expect(el).shadowDom.to.equal('<slot></slot>');
  });

  it('closes popover on outside click', async () => {
    const el = await fixture(html`
      <it-dropdown>
        <button>Apri menu</button>
        <ul popover></ul>
      </it-dropdown>
    `);
    const popover = el.querySelector('[popover]');
    if (popover) {
      (popover as any).hide = () => {
        popover.setAttribute('data-closed', 'true');
      };
    }
    document.body.click();
    expect(popover?.getAttribute('data-closed')).to.equal('true');
  });
});
