import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import videojs from 'video.js';

import itLang from './locales/it.js';

import styles from './it-video.scss';

type Locale = 'it' | 'en' | string; // Aggiungi 'fr', 'de', ecc. se necessario
type LocaleTranslations = typeof itLang;

type Translations = Record<Locale, LocaleTranslations>;

@customElement('it-video')
export class ItVideo extends LitElement {
  static styles = [styles];

  @property({ type: String }) src?: string;

  @property({ type: String }) poster?: string;

  @property({ type: String }) type: string = 'video/mp4';

  @property({ type: Object }) options?: Record<string, unknown> = {}; // https://videojs.com/guides/options/

  @property({ type: Object }) translations: Translations = { it: itLang };

  @property({ type: String }) language = 'it';

  private videoId = `vjs-${Math.random().toString(36).slice(2, 11)}`;

  private player: any = null;

  private videoElement: any = null;

  render() {
    return html`
      <video id="${this.videoId}" class="video-js">
        <source src="${this.src}" type="${this.type}" />
      </video>
    `;
  }

  firstUpdated() {
    window.VIDEOJS_NO_DYNAMIC_STYLE = true; // Disabilita lo stile dinamico di Video.js
    this.videoElement = this.shadowRoot!.getElementById(this.videoId) as HTMLVideoElement;
    // vjs-default-styles e vjs-styles-dimensions vengono settati nell'html, ma non si vedono nello shadowdom...

    const mergedOptions: any = {
      fluid: true,
      language: this.language,
      languages: this.translations,
      controls: true,
      autoplay: false,
      preload: 'auto',
      crossorigin: 'anonymous',
      ...this.options,
    };

    const videojsFn = videojs.default || videojs;
    this.player = videojsFn(this.videoElement, mergedOptions, function onPlayerReady() {
      this.addClass('vjs-theme-bootstrap-italia');
      this.addClass('vjs-big-play-centered');
      // this is the ready callback
      // const p = this.player!;
      // initYoutubePlugin(p); // plugin YouTube
      // eventuali eventi o logiche aggiuntive
      // Puoi inizializzare qui eventuali plugin, ad esempio per YouTube
      // (window as any).youtube?.(this.player);
    });
  }

  // connectedCallback() {
  // }

  // disconnectedCallback() {
  //   super.disconnectedCallback();

  //   if (this.player && !this.player.isDisposed()) {
  //     this.player.dispose();
  //   }
  // }
}

declare global {
  interface Window {
    VIDEOJS_NO_DYNAMIC_STYLE?: boolean;
  }
  interface HTMLElementTagNameMap {
    'it-video': ItVideo;
  }
}
