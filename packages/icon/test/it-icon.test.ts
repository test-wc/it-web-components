import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import type { ItIcon } from '@italia/icon';
import { LitElement, TemplateResult } from 'lit';
import '@italia/icon';

async function fixtureWithDelay<T extends LitElement>(template: TemplateResult, delayMs = 10): Promise<T> {
  const el = await fixture<T>(template);
  await new Promise((res) => {
    setTimeout(res, delayMs);
  });
  return el;
}

describe('<it-icon>', () => {
  it('renders an icon with correct SVG markup and role', async () => {
    const el = await fixtureWithDelay<ItIcon>(html`<it-icon name="it-user" label="Utente"></it-icon>`);

    const svg = el.shadowRoot?.querySelector('svg');
    expect(svg).to.exist;
    expect(svg?.getAttribute('role')).to.equal('img');

    const title = svg?.querySelector('title');
    expect(title?.textContent).to.equal('Utente');
  });

  it('does not error with unknown icon', async () => {
    const el = await fixture<ItIcon>(html` <it-icon name="unknown-icon"></it-icon> `);
    return elementUpdated(el);
  });

  it('defaults to aria-hidden when label is not provided', async () => {
    const el = await fixtureWithDelay<ItIcon>(html`<it-icon name="it-user"></it-icon>`);

    const svg = el.shadowRoot?.querySelector('svg');
    expect(svg?.hasAttribute('aria-hidden')).to.be.true;
    expect(svg?.getAttribute('aria-hidden')).to.equal('true');

    expect(svg?.querySelector('title')).to.not.exist;
  });

  it('respects role when explicitly set', async () => {
    const el = await fixtureWithDelay<ItIcon>(html`<it-icon name="it-user" role="graphic-symbol"></it-icon>`);
    const svg = el.shadowRoot?.querySelector('svg');
    expect(svg?.getAttribute('role')).to.equal('graphic-symbol');
  });

  it('applies size class when size is provided', async () => {
    const el = await fixtureWithDelay<ItIcon>(html`<it-icon name="it-user" size="lg"></it-icon>`);
    const svg = el.shadowRoot?.querySelector('svg');
    expect(svg?.classList.contains('icon-lg')).to.be.true;
  });

  it('applies color, background, align and padded classes to SVG', async () => {
    const el = await fixtureWithDelay<ItIcon>(html`
      <it-icon name="it-user" color="primary" background="warning" align="middle" padded></it-icon>
    `);
    const svg = el.shadowRoot?.querySelector('svg');
    expect(svg?.classList.contains('icon-primary')).to.be.true;
    expect(svg?.classList.contains('bg-warning')).to.be.true;
    expect(svg?.classList.contains('align-middle')).to.be.true;
    expect(svg?.classList.contains('icon-padded')).to.be.true;
  });

  it('passes a11y checks', async () => {
    const el = await fixtureWithDelay<ItIcon>(html`<it-icon name="it-user"></it-icon>`);
    await expect(el).to.be.accessible();
  });

  it('passes a11y checks with label', async () => {
    const el = await fixtureWithDelay<ItIcon>(html`<it-icon name="it-user" label="Icona utente"></it-icon>`);
    await expect(el).to.be.accessible();
  });

  it('does not pass a11y checks with overridden aria-hidden and missing label', async () => {
    const el = await fixtureWithDelay<ItIcon>(html`<it-icon name="it-user" aria-hidden="false"></it-icon>`);
    await expect(el).to.not.be.accessible();
  });

  it('passes a11y checks with overridden aria-hidden and provided label', async () => {
    const el = await fixtureWithDelay<ItIcon>(
      html`<it-icon name="it-user" aria-hidden="false" label="Label"></it-icon>`,
    );
    await expect(el).to.be.accessible();
  });

  it('does not add multiple SVGs when removed and re-added to DOM', async () => {
    const el = await fixtureWithDelay<ItIcon>(html` <it-icon name="it-user"></it-icon> `);
    expect(el).to.not.be.undefined;

    const parent = el.parentNode as HTMLElement;
    parent.removeChild(el);
    parent.appendChild(el);

    const count = el.shadowRoot?.querySelectorAll('svg').length;
    expect(count).to.equal(1);
  });

  describe('ItIcon dynamic behavior', () => {
    it('updates icon and title dynamically', async () => {
      const el = await fixtureWithDelay(html`<it-icon name="it-user" label="User"></it-icon>`);

      let svg = el.shadowRoot!.querySelector('svg');
      let title = svg?.querySelector('title');
      expect(svg).to.exist;
      expect(title?.textContent).to.equal('User');

      el.setAttribute('name', 'it-android');
      el.setAttribute('label', 'Android');

      await new Promise((res) => {
        setTimeout(res, 100);
      });

      svg = el.shadowRoot!.querySelector('svg');
      title = svg?.querySelector('title');
      expect(svg).to.exist;
      expect(title?.textContent).to.equal('Android');
      expect(el.getAttribute('name')).to.equal('it-android');
    });

    it('supports slot usage with user SVG content', async () => {
      const el = await fixtureWithDelay(html`
        <it-icon>
          <svg id="custom-svg" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="red"></circle>
          </svg>
        </it-icon>
      `);

      const svgInShadow = el.shadowRoot!.querySelector('svg');
      expect(svgInShadow).to.be.null;

      const slot = el.shadowRoot!.querySelector('slot')!;
      const assignedNodes = slot.assignedNodes({ flatten: true });
      const hasCustomSvg = assignedNodes.some(
        (node) => node.nodeType === Node.ELEMENT_NODE && (node as Element).id === 'custom-svg',
      );
      expect(hasCustomSvg).to.be.true;
    });

    it('applies attributes correctly to custom slotted svg', async () => {
      const el = await fixtureWithDelay<ItIcon>(html`
        <it-icon size="lg" label="Custom title" padded>
          <svg viewBox="0 0 24 24"><path d="..."></path></svg>
        </it-icon>
      `);

      const svg = el.querySelector('svg')!;
      expect(svg.getAttribute('class')).to.include('icon-lg');
      expect(svg.getAttribute('class')).to.include('icon-padded');
      expect(svg.getAttribute('part')).to.equal('icon');
      expect(svg.getAttribute('role')).to.equal('img');
      expect(svg.getAttribute('focusable')).to.equal('false');
      expect(svg.getAttribute('aria-hidden')).to.equal('true');

      const title = svg.querySelector('title');
      expect(title?.textContent).to.equal('Custom title');
    });
  });
  describe('<it-icon> SVG src URL loading', () => {
    const fakeSvg = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="blue"/></svg>`;

    before(() => {
      // Mock globale fetch
      globalThis.fetch = async (input: RequestInfo | URL): Promise<Response> => {
        let url: string;
        if (typeof input === 'string') url = input;
        else if (input instanceof URL) url = input.toString();
        else url = input.url;

        if (url.includes('fake-icon.svg')) {
          return new Response(fakeSvg, {
            status: 200,
            headers: { 'Content-Type': 'image/svg+xml' },
          });
        }
        return new Response(null, { status: 404 });
      };
    });

    it('loads and renders SVG from URL, label provided and component accessible ', async () => {
      const el = await fixtureWithDelay<ItIcon>(
        html`<it-icon src="https://example.com/fake-icon.svg" label="SVG da URL"></it-icon>`,
      );

      // aspettiamo che venga caricata e renderizzata la svg
      await elementUpdated(el);

      const svg = el.shadowRoot?.querySelector('svg');

      expect(svg).to.exist;
      expect(svg?.getAttribute('role')).to.equal('img');
      expect(svg?.querySelector('title')?.textContent).to.equal('SVG da URL');
      expect(svg?.outerHTML).to.include('<circle');
      expect(el).to.be.accessible();
    });

    it('loads and renders SVG from URL, fails a11y due to user mistake in attrs', async () => {
      const el = await fixtureWithDelay<ItIcon>(html`<it-icon src="https://example.com/fake-icon.svg"></it-icon>`);

      // aspettiamo che venga caricata e renderizzata la svg
      await elementUpdated(el);

      const svg = el.shadowRoot?.querySelector('svg');

      expect(svg).to.exist;
      expect(svg?.getAttribute('role')).to.equal('img');
      expect(svg?.outerHTML).to.include('<circle');

      expect(el).to.not.be.accessible();
    });

    it('renders nothing on fetch error', async () => {
      const el = await fixtureWithDelay<ItIcon>(html`<it-icon src="https://example.com/not-found.svg"></it-icon>`);
      await elementUpdated(el);

      const svg = el.shadowRoot?.querySelector('svg');
      // Nessun SVG dovrebbe essere renderizzato
      expect(svg).to.be.null;
    });
  });
});
