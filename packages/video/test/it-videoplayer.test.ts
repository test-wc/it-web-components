import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import type { ItVideo } from '../src/it-video.js';
import '../src/it-video.js';

describe('ItVideo', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<ItVideo>(html`<it-video></it-video>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<ItVideo>(html`<it-video></it-video>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<ItVideo>(html`<it-video header="attribute header"></it-video>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<ItVideo>(html`<it-video></it-video>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
