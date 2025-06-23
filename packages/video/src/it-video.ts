import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import videojs from 'video.js';
import itLang from './locales/it.js';
import styles from './it-video.scss';

type Locale = 'it' | 'en' | string; // Aggiungi 'fr', 'de', ecc. se necessario
type LocaleTranslations = typeof itLang;
type SingleTrack = {
  kind: 'captions' | 'subtitles' | 'descriptions' | 'chapters' | 'metadata';
  src: string; // URL del file del track
  srclang?: string; // Codice della lingua (es. 'it', 'en',)
  label: string; // Etichetta del track
  default?: boolean; // Indica se è il track predefinito
};
type Translations = Record<Locale, LocaleTranslations>;
type Track = Array<SingleTrack>;

@customElement('it-video')
export class ItVideo extends LitElement {
  static styles = [styles];

  @property({ type: String }) src?: string;

  @property({ type: String }) poster?: string;

  @property({ type: String }) type: string = 'video/mp4';

  @property({ type: Object }) options?: Record<string, unknown> = {}; // https://videojs.com/guides/options/

  @property({ type: Object }) translations: Translations = { it: itLang };

  @property({ type: Array }) track: Track = [];

  @property({ type: String }) language = 'it';

  private videoId = `vjs-${Math.random().toString(36).slice(2, 11)}`;

  private player: any = null;

  private videoElement: any = null;

  render() {
    return html`
      <video id="${this.videoId}" class="video-js">
        <source src="${this.src}" type="${this.type}" />
      </video>
      <slot></slot>
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
      techOrder: ['html5'],
      controlBar: {
        subtitlesButton: true,
      },
      poster: this.poster,
      ...this.options,
    };

    const videojsFn = videojs.default || videojs;
    const tracks = [...(this.track ?? [])];

    this.player = videojsFn(this.videoElement, mergedOptions, function onPlayerReady() {
      this.addClass('vjs-theme-bootstrap-italia');
      this.addClass('vjs-big-play-centered');

      // Aggiungi i track manualmente
      tracks.forEach((t) => {
        this.addRemoteTextTrack(
          {
            kind: t.kind,
            src: t.src,
            srclang: t.srclang || this.language,
            label: t.label,
            default: !!t.default,
          },
          false,
        );
      });
      // this is the ready callback
      // const p = this.player!;
      // initYoutubePlugin(p); // plugin YouTube
      // eventuali eventi o logiche aggiuntive
      // Puoi inizializzare qui eventuali plugin, ad esempio per YouTube
      // (window as any).youtube?.(this.player);
    });
    this.track.forEach((t) => {
      this.player.addRemoteTextTrack(
        {
          kind: t.kind,
          src: t.src,
          srclang: t.srclang || this.language,
          label: t.label,
          default: !!t.default,
        },
        false,
      );
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
