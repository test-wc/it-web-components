import '@italia/input';
import { expect, fixture, html } from '@open-wc/testing';

import { type ItInput } from '@italia/input';

describe('Input component', () => {
  describe('accessibility', () => {
    it('default is accessible', async () => {
      const el = await fixture<ItInput>(html`<it-input></it-input>`);
      await expect(el).to.be.accessible();
    });
  });

  // describe('form', () => {
  //   it('submits a form', async () => {
  //     let called = false;
  //     function submitHandler() {
  //       /* per verificare che l’evento sia stato attivato. */
  //       called = true;
  //     }

  //     const el = await fixture<HTMLFormElement>(html`
  //       <form
  //         @submit=${(e: SubmitEvent) => {
  //           e.preventDefault(); // preveniamo la ricarica per il test
  //           submitHandler();
  //         }}
  //       >
  //         <it-button type="submit">Submit</it-button>
  //       </form>
  //     `);

  //     const button = el.querySelector('it-button')!;
  //     const innerButton = button.shadowRoot?.querySelector('button');

  //     innerButton?.click();

  //     expect(called).to.be.true;
  //   });

  //   it('does not submit the form when the button is disabled', async () => {
  //     let called = false;
  //     function submitHandler() {
  //       /* per verificare che l’evento sia stato attivato. */
  //       called = true;
  //     }

  //     const el = await fixture<HTMLFormElement>(html`
  //       <form
  //         @submit=${(e: SubmitEvent) => {
  //           e.preventDefault();
  //           submitHandler();
  //         }}
  //       >
  //         <it-button type="submit" disabled>Submit</it-button>
  //       </form>
  //     `);

  //     const button = el.querySelector('it-button')!;
  //     const innerButton = button.shadowRoot?.querySelector('button');

  //     innerButton?.click();

  //     expect(called).to.be.false;
  //   });
  // });
});
