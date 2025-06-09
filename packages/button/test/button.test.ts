import './button.js';
import { expect, fixture, html } from '@open-wc/testing';
import { ItButton } from '../src/it-button.ts';

describe('Button component', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<ItButton>(html`<it-button>My Button</it-button>`);
      await expect(el).to.be.accessible();
    });

    it('variations are accessible', async () => {
      const el = await fixture<ItButton>(html`
        <it-button variation="primary">bsi Button</it-button>
        <it-button variation="link">bsi Button</it-button>
      `);
      await expect(el).to.be.accessible();
    });

    it('disabled is accessible', async () => {
      const el = await fixture<ItButton>(html`<it-button disabled>bsi Button</it-button>`);
      const button = el.shadowRoot?.querySelector('button');

      await expect(el).to.be.accessible();
      await expect(button?.hasAttribute('disabled')).to.be.true;
    });

    it('on bg-dark is accessible', async () => {
      const el = await fixture<ItButton>(
        html`<div class="bg-dark">
          <it-button variation="primary">bsi Button</it-button>
          <it-button variation="link">bsi Button</it-button>
        </div>`,
      );

      await expect(el).to.be.accessible();
    });
  });

  describe('form', () => {
    it('submits a form', async () => {
      const submitHandler = sinon.spy(); /* per verificare che l’evento sia stato attivato. */

      const el = await fixture<HTMLFormElement>(html`
        <form
          @submit=${(e: SubmitEvent) => {
            e.preventDefault(); // preveniamo la ricarica per il test
            submitHandler();
          }}
        >
          <it-button type="submit">Submit</it-button>
        </form>
      `);

      const button = el.querySelector('it-button')!;
      const innerButton = button.shadowRoot?.querySelector('button');

      innerButton?.click();

      expect(submitHandler.calledOnce).to.be.true;
    });
    it('does not submit the form when the button is disabled', async () => {
      const submitHandler = sinon.spy();

      const el = await fixture<HTMLFormElement>(html`
        <form
          @submit=${(e: SubmitEvent) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <it-button type="submit" disabled>Submit</it-button>
        </form>
      `);

      const button = el.querySelector('it-button')!;
      const innerButton = button.shadowRoot?.querySelector('button');

      innerButton?.click();

      expect(submitHandler.called).to.be.false;
    });
  });
});
