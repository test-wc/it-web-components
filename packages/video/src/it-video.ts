import { LitElement, html } from 'lit';
import { property, state, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import videojs from 'video.js';
import { cookies } from '@italia/globals';

// @ts-ignore
import { initYoutubePlugin } from './util/youtube-video.js';
import { type Translations, type Track, type ConsentOptions } from './types.js';
import itLang from './locales/it.js';
import styles from './it-video.scss';

export const defaultConsentOptions: ConsentOptions = {
  icon: 'it-video', // Icona predefinita per il consenso dei cookie
  text: 'Accetta i cookie di YouTube per vedere il video. Puoi gestire le preferenze nella <a href="#" class="text-white">cookie policy</a>.',
  acceptButtonText: 'Accetta',
  rememberCheckboxText: 'Ricorda per tutti i video',
};

@customElement('it-video')
export class ItVideo extends LitElement {
  static styles = [styles];

  private videoId = `vjs-${Math.random().toString(36).slice(2, 11)}`;

  @property({ type: String }) src?: string;

  @property({ type: String }) poster?: string;

  @property({ type: String }) type: string = 'video/mp4';

  @property({ type: Object }) options?: Record<string, unknown> = {}; // https://videojs.com/guides/options/

  @property({ type: String }) language = 'it';

  @property({ type: Object }) translations: Translations = { it: itLang };

  @property({ type: Array }) track: Track = [];

  @property({ type: Object }) consentOptions?: ConsentOptions = defaultConsentOptions; // opzioni per il consenso dei cookie, se necessario

  @property({ type: String, attribute: 'init-plugins' })
  initPluginsName = '';

  @state()
  private player: any = null;

  @state()
  private videoElement: any = null;

  @state()
  private consentAccepted: boolean = false;

  /**
   * Funzione risolta da window[initPluginsName]
   */
  private get initPluginsFn(): ((vjs: any) => void) | undefined {
    const fn = (window as any)[this.initPluginsName];
    return typeof fn === 'function' ? fn : undefined;
  }

  /*
  Rileva se l'url passato corrisponde a un video di YouTube
  */
  isYouTubeUrl() {
    const regex =
      /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/|live\/|playlist\?list=|embed\/videoseries\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11}|[a-zA-Z0-9_-]{34})(?:[&?][^\s]*)?$/;
    return regex.test(this.src ?? '');
  }

  /*
  Rileva se l'url passato corrisponde a uno di questi servizi che richiedono l'accettazione dei cookie di terze parti:
  YouTube, Vimeo, Dailymotion, Facebook, Instagram, Twitch, TikTok, Wistia, Brightcove, JW Player, Kaltura, Streamable
  */
  needsCookieConsent() {
    const isYoutube = this.isYouTubeUrl();
    // regex per url diversi da youtube
    const regexOthers =
      // eslint-disable-next-line no-useless-escape
      /^(?:https?:\/\/)?(?:www\.|m\.)?(?:vimeo\.com\/(?:video\/)?\d+|player\.vimeo\.com\/video\/\d+|dailymotion\.com\/video\/[a-zA-Z0-9]+|dai\.ly\/[a-zA-Z0-9]+|facebook\.com\/(?:[^\/]+\/videos\/|watch\/?\?v=)[0-9]+|fb\.watch\/[a-zA-Z0-9]+|instagram\.com\/(?:reel|tv)\/[a-zA-Z0-9_-]+|twitch\.tv\/videos\/\d+|player\.twitch\.tv\/\?video=\d+|tiktok\.com\/@[\w.-]+\/video\/\d+|fast\.wistia\.com\/embed\/iframe\/[a-zA-Z0-9]+|wistia\.com\/medias\/[a-zA-Z0-9]+|players\.brightcove\.net\/[\d]+\/[a-zA-Z0-9_]+\/index\.html\?videoId=\d+|content\.jwplatform\.com\/players\/[a-zA-Z0-9]+-[a-zA-Z0-9]+\.html|cdnapi\.kaltura\.com\/p\/\d+\/sp\/\d+\/embedIframeJs\/uiconf_id\/\d+\/partner_id\/\d+|streamable\.com\/[a-z0-9]+)$/i;

    return isYoutube || regexOthers.test(this.src || '');
  }

  getconsentKey() {
    const isYoutube = this.isYouTubeUrl();
    return this.consentOptions?.consentKey ?? (isYoutube ? 'youtube' : this.type);
  }

  /*
  Action sull'accettazone del consenso.
  */
  acceptConsent(remember: boolean = false) {
    this.consentAccepted = true;

    if (this.consentOptions?.onAccept) {
      this.consentOptions.onAccept(remember, this.getconsentKey());
    } else if (remember) {
      cookies.rememberChoice(this.getconsentKey(), remember);
    }

    // Aspetta il render DOM aggiornato e re-inizializza il player
    this.updateComplete.then(() => {
      this.initVideoPlayer(true); // passa il parametro focusPlayButton=true, per garantire accessibilità sul bottone di play che altrimenti sarebbe irraggiungibile
    });
  }

  /*
  Il video è renderizzabile solo se:
   - non richiede accettazione dei cookie
   - richiede accettazione dei cookie ed è stato dato il consenso
  */
  isVideoRenderable() {
    const needsCookieConsent = this.needsCookieConsent();
    return !needsCookieConsent || this.consentAccepted;
  }

  getVideoElement() {
    const renderable = this.isVideoRenderable();
    const isYoutube = this.isYouTubeUrl();

    return renderable
      ? html`<div part="videoplayer-wrapper">
          ${isYoutube
            ? html`<div id="${this.videoId}" class="video-js" part="videoplayer"></div>`
            : html`<video id="${this.videoId}" class="video-js" part="videoplayer">
                <source src="${this.src}" type="${this.type}" />
              </video>`}
          <slot></slot>
        </div>`
      : '';
  }

  /*
  Inizializza il videoplayer solo se è renderizzabile (non richiede accettazione dei cookie / è già stato dato il consenso di accettazione dei cookie
  */
  initVideoPlayer(focusPlayButton: boolean = false) {
    const renderable = this.isVideoRenderable();
    if (renderable) {
      const videojsFn = videojs.default || videojs;
      if (this.player && !this.player.isDisposed()) {
        this.player.dispose();
      }
      this.videoElement = this.shadowRoot!.getElementById(this.videoId) as HTMLVideoElement;

      const isYoutube = this.isYouTubeUrl();

      const _options: any = {};

      if (isYoutube) {
        _options.techOrder = ['youtube'];
        _options.sources = [
          {
            type: 'video/youtube',
            src: this.src,
          },
        ];
        _options.youtube = {
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        };
      }

      const mergedOptions: any = {
        fluid: true,
        language: this.language,
        languages: this.translations,
        controls: true,
        autoplay: false,
        muted: false,
        preload: 'auto',
        crossorigin: 'anonymous',
        techOrder: ['html5'],
        poster: this.poster,
        ...this.options,
        ..._options,
      };

      const tracks = [...(this.track ?? [])];
      if (isYoutube) {
        initYoutubePlugin(videojsFn);
      }

      this.initPluginsFn?.(videojsFn); // se passata una funzione di init di ulteriori plugin, la chiama.

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

        if (focusPlayButton) {
          const playButton = this.el()?.querySelector('.vjs-big-play-button') as HTMLButtonElement | null;

          if (playButton) {
            playButton.focus();
          }
        }
      });
    }
  }

  /*
  Al primo update, inizializzo il player
  */
  firstUpdated() {
    window.VIDEOJS_NO_DYNAMIC_STYLE = true; // Disabilita lo stile dinamico di Video.js
    this.initVideoPlayer();
  }

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
          ${this.getVideoElement()}
        </div>`
      : html`${this.getVideoElement()}`;
  }

  connectedCallback(): void {
    // Gestione del cookie - Lettura preferenza
    super.connectedCallback?.();
    this.consentAccepted = this.consentOptions?.isAccepted
      ? this.consentOptions.isAccepted(this.getconsentKey())
      : cookies.isChoiceRemembered(this.getconsentKey());
  }

  /*
  Unmount del player
  */
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
