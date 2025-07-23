import '@italia/input';
import { expect, fixture, html } from '@open-wc/testing';

import { type ItInput } from '@italia/input';

describe('<it-input>', () => {
  // Il componente è accessibile di default
  it('should be accessible', async () => {
    const el = await fixture<ItInput>(html`<it-input label="Test label"></it-input>`);
    await expect(el).to.be.accessible();
  });

  // Imposta e riflette il valore correttamente
  it('should reflect the initial value', async () => {
    const el = await fixture<ItInput>(html`<it-input value="ciao"></it-input>`);
    expect(el.value).to.equal('ciao');
    expect(el.shadowRoot?.querySelector('input')?.value).to.equal('ciao');
  });

  // Validazione (required)
  it('should mark the input as invalid if required and empty', async () => {
    const el = await fixture<ItInput>(html`<it-input required></it-input>`);
    const input = el.shadowRoot?.querySelector('input')!;
    input.focus();
    input.blur(); // trigger blur e checkValidity

    expect(el.invalid).to.be.true;
    expect(el.validityMessage).to.equal('Compila questo campo');
  });

  // Validazione personalizzata (setCustomValidity)
  it('should show a custom validity message', async () => {
    const el = await fixture<ItInput>(html`<it-input></it-input>`);
    el.setCustomValidity('Errore personalizzato');
    await el.updateComplete;

    expect(el.invalid).to.be.true;
    expect(el.validityMessage).to.equal('Errore personalizzato');
    const feedback = el.shadowRoot?.querySelector('.invalid-feedback');
    expect(feedback?.textContent).to.include('Errore personalizzato');
  });

  // Reset del messaggio di validazione dopo input valido

  it('should clear the validity message after valid input', async () => {
    const el = await fixture<ItInput>(html`<it-input required></it-input>`);
    el.setCustomValidity('Errore');
    el.value = 'ok';
    el.checkValidity();
    await el.updateComplete;

    expect(el.invalid).to.be.false;
    expect(el.validityMessage).to.equal('');
  });

  // Evento formdata per input nel form
  it('should append its value to FormData on formdata event', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form>
        <it-input name="testName" value="testValue"></it-input>
      </form>
    `);
    const input = el.querySelector('it-input')!;
    const fd = new FormData();
    const e = new FormDataEvent('formdata', { formData: fd });

    input.dispatchEvent(e);

    expect(fd.get('testName')).to.equal('testValue');
  });

  // Password strength meter: warning se non è tipo password
  it('should warn if passwordStrengthMeter is true and type is not password', async () => {
    const warnSpy = sinon.spy(console, 'warn');

    await fixture<ItInput>(html`<it-input password-strength-meter type="text"></it-input>`);

    expect(warnSpy.called).to.be.true;
    expect(warnSpy.firstCall.args[0]).to.include('strength-meter');
    warnSpy.restore();
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
