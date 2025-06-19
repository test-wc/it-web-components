import { fixture, expect, html } from '@open-wc/testing';
import '@italia/it-dropdown';

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

  it('reflects aria-label and aria-labelledby', async () => {
    const el = await fixture(html`<it-dropdown aria-label="Menu test" aria-labelledby="lbl"></it-dropdown>`);
    expect(el.getAttribute('aria-label')).to.equal('Menu test');
    expect(el.getAttribute('aria-labelledby')).to.equal('lbl');
  });

  it('applies disabled attribute', async () => {
    const el = await fixture(html`<it-dropdown disabled></it-dropdown>`);
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.getAttribute('aria-disabled')).to.equal('true');
    expect(el.getAttribute('tabindex')).to.equal('-1');
  });
});
