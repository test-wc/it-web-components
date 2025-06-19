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

  @property({ type: String }) src = '';

  @property({ type: String }) poster = '';

  @property({ type: String }) type = 'video/mp4';

  @property({ type: Object }) options: any = {};

  @property({ type: Object }) translations: Translations = { it: itLang };

  @property({ type: String }) language = 'it';

  private videoId = `vjs-${Math.random().toString(36).slice(2, 11)}`;

  /** Genera un id unico per il componente */
  private static get_uid() {
    return Math.random().toString(36).slice(2, 11);
  }

  private player: any = null;

  private videoElement: any = null;

  render() {
    // return html`
    //   <video-js id="${this.videoId}" class="vjs-theme-bootstrap-italia">
    //     <source src="${this.src}" type="${this.type}" />
    //   </video-js>
    // `;

    return html`
      <video id="${this.videoId}" class="video-js">
        <source src="${this.src}" type="${this.type}" />
      </video>
    `;
  }

  firstUpdated() {
    this.videoElement = this.shadowRoot!.getElementById(this.videoId) as HTMLVideoElement;

    const mergedOptions = {
      //  fluid: true,
      language: this.language,
      languages: this.translations,
      controls: true,
      autoplay: false,
      preload: 'auto',
      ...this.options,
    };

    const videojsFn = videojs.default || videojs;
    this.player = videojsFn(this.videoElement, mergedOptions, () => {
      // this is the ready callback
      // const p = this.player!;
      // initYoutubePlugin(p); // plugin YouTube
      // eventuali eventi o logiche aggiuntive
      // Puoi inizializzare qui eventuali plugin, ad esempio per YouTube
      // (window as any).youtube?.(this.player);
    });
    this.player.addClass('vjs-theme-bootstrap-italia').addClass('vjs-big-play-centered');
  }

  // disconnectedCallback() {
  //   super.disconnectedCallback();

  //   if (this.player && !this.player.isDisposed()) {
  //     this.player.dispose();
  //   }
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'it-video': ItVideo;
  }
}
