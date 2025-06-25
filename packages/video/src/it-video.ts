import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import videojs from 'video.js';
import 'videojs-youtube';
import itLang from './locales/it.js';
import styles from './it-video.scss';
import '@italia/icon';

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

const defaultConsentOptions = {
  icon: 'it-video', // Icona predefinita per il consenso dei cookie
  text: 'Accetta i cookie di YouTube per vedere il video. Puoi gestire le preferenze nella <a href="#" class="text-white">cookie policy</a>.',
  acceptButtonText: 'Accetta',
  rememberCheckboxText: 'Ricorda per tutti i video',
};

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

  @property({ type: Object }) consentOptions?: {
    icon?: string;
    text?: string;
    acceptButtonText?: string;
    rememberCheckboxText?: string;
  } = defaultConsentOptions; // opzioni per il consenso dei cookie, se necessario

  private videoId = `vjs-${Math.random().toString(36).slice(2, 11)}`;

  private player: any = null;

  private videoElement: any = null;

  private consentAccepted: boolean = false;

  isYouTubeUrl(url: string) {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[&?][^\s]*)?$/;
    return regex.test(url);
  }
  /*
  Rileva se l'url passato corrisponde a uno di questi servizi che richiedono l'accettazione dei cookie di terze parti:
  YouTube, Vimeo, Dailymotion, Facebook, Instagram, Twitch, TikTok, Wistia, Brightcove, JW Player, Kaltura, Streamable
  */

  needsCookieConsent() {
    const regex =
      /^(?:https?:\/\/)?(?:www\.|m\.)?(?:(?:youtube\.com\/(?:watch\?(?:.*&)?v=[\w-]{11}(?:&list=[\w-]+)?|embed\/[\w-]{11}|v\/[\w-]{11}|shorts\/[\w-]{11}|playlist\?list=[\w-]+|embed\/videoseries\?list=[\w-]+)|youtu\.be\/[\w-]{11})|vimeo\.com\/(?:video\/)?\d+|player\.vimeo\.com\/video\/\d+|dailymotion\.com\/video\/[a-zA-Z0-9]+|dai\.ly\/[a-zA-Z0-9]+|facebook\.com\/(?:[^\/]+\/videos\/|watch\/?\?v=)[0-9]+|fb\.watch\/[a-zA-Z0-9]+|instagram\.com\/(?:reel|tv)\/[a-zA-Z0-9_-]+|twitch\.tv\/videos\/\d+|player\.twitch\.tv\/\?video=\d+|tiktok\.com\/@[\w.-]+\/video\/\d+|fast\.wistia\.com\/embed\/iframe\/[a-zA-Z0-9]+|wistia\.com\/medias\/[a-zA-Z0-9]+|players\.brightcove\.net\/[\d]+\/[a-zA-Z0-9_]+\/index\.html\?videoId=\d+|content\.jwplatform\.com\/players\/[a-zA-Z0-9]+-[a-zA-Z0-9]+\.html|cdnapi\.kaltura\.com\/p\/\d+\/sp\/\d+\/embedIframeJs\/uiconf_id\/\d+\/partner_id\/\d+|streamable\.com\/[a-z0-9]+)$/i;
    return regex.test(this.src || '');
  }

  acceptConsent(remember: boolean = false) {
    console.log('remember', remember);
    this.consentAccepted = true;
    const isYoutube = this.isYouTubeUrl(this.src ?? '');

    // Rimuovi player esistente
    if (this.player && !this.player.isDisposed()) {
      this.player.dispose();
      this.player = null;
    }

    // Cambia le opzioni
    this.options = {
      ...this.options,
      techOrder: isYoutube ? ['youtube'] : ['html5'],
    };

    // Aspetta il render DOM aggiornato e re-inizializza il player
    this.updateComplete.then(() => {
      this.initVideoPlayer();
    });
  }

  getVideoElement(needsCookieConsent: boolean = false) {
    return html`<div>
      <video id="${this.videoId}" class="video-js">
        ${!needsCookieConsent || this.consentAccepted ? html`<source src="${this.src}" type="${this.type}" />` : ''}
      </video>
      <slot></slot>
    </div>`;
  }

  // TODO: gestire il remember checkbox (funzionalità e markup)

  render() {
    const needsCookieConsent = this.needsCookieConsent();

    return needsCookieConsent
      ? html`<div class="acceptoverlayable ${this.consentAccepted ? '' : 'show'}">
          <div
            class="acceptoverlay acceptoverlay-primary fade ${this.consentAccepted ? '' : 'show'}"
            aria-hidden=${ifDefined(this.consentAccepted ? 'true' : undefined)}
          >
            <div class="acceptoverlay-inner">
              <div class="acceptoverlay-icon">
                <it-icon
                  name="${this.consentOptions?.icon ?? defaultConsentOptions.icon}"
                  size="xl"
                  color="inverse"
                ></it-icon>
              </div>

              <p>${unsafeHTML(this.consentOptions?.text ?? defaultConsentOptions.text)}</p>
              <div class="acceptoverlay-buttons bg-dark">
                <it-button variant="primary" block @click=${() => this.acceptConsent()}>
                  ${this.consentOptions?.acceptButtonText ?? defaultConsentOptions.acceptButtonText}
                </it-button>

                <div class="form-check">
                  <input id="chk-remember" type="checkbox" @click=${() => this.acceptConsent(true)} />
                  <label for="chk-remember">
                    ${this.consentOptions?.rememberCheckboxText ?? defaultConsentOptions.rememberCheckboxText}</label
                  >
                </div>
              </div>
            </div>
          </div>
          ${this.getVideoElement(needsCookieConsent)}
        </div>`
      : html`${this.getVideoElement(needsCookieConsent)}`;
  }

  protected updated(changedProps: Map<string, any>) {
    if (changedProps.has('src')) {
      const isYoutube = this.isYouTubeUrl(this.src ?? '');
      const newValue = isYoutube ? 'video/youtube' : this.type;
      if (this.type !== newValue) {
        this.type = newValue;
      }
    }
  }

  initVideoPlayer() {
    this.videoElement = this.shadowRoot!.getElementById(this.videoId) as HTMLVideoElement;

    const mergedOptions: any = {
      fluid: true,
      language: this.language,
      languages: this.translations,
      controls: true,
      autoplay: false,
      preload: 'auto',
      crossorigin: 'anonymous',
      techOrder: ['html5'],
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

  firstUpdated() {
    window.VIDEOJS_NO_DYNAMIC_STYLE = true; // Disabilita lo stile dinamico di Video.js

    this.initVideoPlayer();
  }

  //   connectedCallback(): void {
  // }

  disconnectedCallback(): void {
    super.disconnectedCallback?.();

    if (this.player && !this.player.isDisposed()) {
      this.player.dispose();
    }
  }
}

declare global {
  interface Window {
    VIDEOJS_NO_DYNAMIC_STYLE?: boolean;
  }
  interface HTMLElementTagNameMap {
    'it-video': ItVideo;
  }
}
