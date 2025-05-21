import './button.js';
import { expect, fixture, html } from '@open-wc/testing';
import { Button } from '../src/ItButton.js';

describe('Button component', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<Button>(html`<it-button>My Button</it-button>`);
      await expect(el).to.be.accessible();
    });

    it('variations are accessible', async () => {
      const el = await fixture<Button>(html`
        <it-button variation="primary">bsi Button</it-button>
        <it-button variation="hollow">bsi Button</it-button>
        <it-button variation="transparent">bsi Button</it-button>
      `);
      await expect(el).to.be.accessible();
    });

    it('disabled is accessible', async () => {
      const el = await fixture<Button>(
        html`<it-button disabled>bsi Button</it-button>`,
      );
      const button = el.shadowRoot?.querySelector('button');

      await expect(el).to.be.accessible();
      await expect(button?.hasAttribute('disabled')).to.be.true;
    });
  });
});
