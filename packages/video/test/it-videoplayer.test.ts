import { html } from 'lit';
import '@italia/video';
import '@italia/button';
import { fixture, expect, waitUntil } from '@open-wc/testing';
import type { ItVideo } from '@italia/video';

describe('ItVideo', () => {
  it('display a player', async () => {
    const el = await fixture<ItVideo>(
      html`<it-video src="https://vjs.zencdn.net/v/oceans.webm" type="video/mp4"></it-video>`,
    );

    const bigPlayButton = el.shadowRoot?.querySelector('button.vjs-big-play-button');
    const video = el.shadowRoot?.querySelector('video');
    await expect(bigPlayButton).to.be.accessible();
    await expect(video).to.be.accessible();
  });

  it('poster image', async () => {
    const poster = 'https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM';
    const el = await fixture<ItVideo>(
      html`<it-video src="https://vjs.zencdn.net/v/oceans.webm" poster="${poster}" type="video/mp4"></it-video>`,
    );
    const previewImage = el.shadowRoot?.querySelector('picture.vjs-poster img');

    await expect(previewImage).to.have.attribute('src', poster);
  });

  it('language', async () => {
    const translations = { en: { 'Play Video': 'Play Video' } };
    const el = await fixture<ItVideo>(
      html`<it-video
        language="en"
        translations="${translations}"
        src="https://vjs.zencdn.net/v/oceans.webm"
        type="video/mp4"
      ></it-video>`,
    );
    const bigPlayButton = el.shadowRoot?.querySelector('button.vjs-big-play-button');

    await expect(bigPlayButton?.textContent).to.equal('Play Video');
  });

  it('subs', async () => {
    const track = [{ kind: 'captions', src: './subtitles-it.vtt', srclang: 'it', label: 'Italiano', default: true }];
    const el = await fixture<ItVideo>(
      html`<it-video src="https://vjs.zencdn.net/v/oceans.webm" track="${track}" type="video/mp4"></it-video>`,
    );
    const subsButton = el.shadowRoot?.querySelector('button.vjs-subs-caps-button');

    await expect(subsButton).to.not.has.class('vjs-hidden');
  });

  it('youtube accept overlay', async () => {
    const el = await fixture<ItVideo>(html`<it-video src="https://youtu.be/_0j7ZQ67KtY"></it-video>`);

    const overlayAccept = el.shadowRoot?.querySelector('.acceptoverlayable');
    await expect(overlayAccept).to.have.class('show');

    const acceptButton = el.shadowRoot?.querySelector('it-button')?.shadowRoot?.querySelector('button');
    console.log(acceptButton);
    acceptButton?.click();

    await waitUntil(() => !overlayAccept?.classList.contains('show'), 'overlay still has class "show"', {
      timeout: 3000,
    });
  });
});
