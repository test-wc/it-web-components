import type { ItChip } from '@italia/chip';
import '@italia/button';
import '@italia/icon';
import '@italia/chip';

import { expect, fixture, html } from '@open-wc/testing';

describe('it-chip component', () => {
  describe('accessibility', () => {
    it('default chip is accessible', async () => {
      const el = await fixture<ItChip>(html`<it-chip label="Label test"></it-chip>`);
      await expect(el).to.be.accessible();
    });

    it('dismissable chip with proper button is accessible', async () => {
      const el = await fixture<ItChip>(html`
        <it-chip label="Dismissable" dismissable>
          <it-button slot="dismiss-button" icon="true" aria-label="Remove chip">
            <it-icon name="it-close" size="sm"></it-icon>
          </it-button>
        </it-chip>
      `);
      await expect(el).to.be.accessible();
    });

    it('chip with avatar and avatarAlt is accessible', async () => {
      const el = await fixture<ItChip>(html`
        <it-chip label="User" avatar="https://randomuser.me/api/portraits/men/46.jpg" avatarAlt="User avatar"></it-chip>
      `);
      await expect(el).to.be.accessible();
    });
  });

  describe('variants and size', () => {
    it('renders small chip with primary variant', async () => {
      const el = await fixture<ItChip>(html`<it-chip label="Test" size="sm" variant="primary"></it-chip>`);
      const container = el.shadowRoot?.querySelector('.chip');
      expect(container).to.exist;

      expect(container?.classList.contains('chip-sm')).to.be.true;
      expect(container?.classList.contains('chip-primary')).to.be.true;
    });

    it('renders large chip with danger variant', async () => {
      const el = await fixture<ItChip>(html`<it-chip label="Danger" size="lg" variant="danger"></it-chip>`);
      const container = el.shadowRoot?.querySelector('.chip');
      expect(container).to.exist;
      expect(container?.classList.contains('chip-lg')).to.be.true;
      expect(container?.classList.contains('chip-danger')).to.be.true;
    });
  });

  describe('avatar behavior', () => {
    it('renders avatar if src is provided', async () => {
      const el = await fixture<ItChip>(html`
        <it-chip
          label="With Avatar"
          avatar="https://randomuser.me/api/portraits/men/46.jpg"
          avatarAlt="Avatar alt text"
        ></it-chip>
      `);
      const img = el.shadowRoot?.querySelector('img');
      expect(img?.getAttribute('src')).to.equal('https://randomuser.me/api/portraits/men/46.jpg');
      expect(img?.getAttribute('alt')).to.equal('Avatar alt text');
    });
  });

  describe('disabled state', () => {
    it('adds disabled attributes when disabled', async () => {
      const el = await fixture<ItChip>(html`
        <it-chip label="Disabled" dismissable disabled>
          <it-button slot="dismiss-button" icon="true" aria-label="Remove">
            <it-icon name="it-close" size="sm"></it-icon>
          </it-button>
        </it-chip>
      `);

      const container = el.shadowRoot?.querySelector('.chip');
      expect(container).to.exist;

      expect(container?.classList.contains('chip-disabled')).to.be.true;
      const btn = el?.querySelector('it-button')!;
      expect(btn.shadowRoot?.querySelector('button')?.hasAttribute('disabled')).to.be.true;
    });
  });
});
