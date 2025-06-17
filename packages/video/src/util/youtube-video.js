/**
 * YoutubeVideo.js - Plugin per gestire iframe YouTube con API JS
 */

const NAMESPACE = 'YoutubeVideo';

class YoutubeVideo {
  /**
   * @param {HTMLElement} element - Contenitore iframe YouTube
   */
  constructor(element) {
    this.element = element;
    this.iframe = this.element.querySelector('iframe');
    this.videoId = this.extractVideoId(this.iframe?.src);
    this.player = null;

    if (this.videoId) {
      this.initPlayer();
    }
  }

  /**
   * Estrae video ID da URL embed YouTube
   * @param {string} url
   * @returns {string|null}
   */
  extractVideoId(url) {
    if (!url) return null;
    const regExp = /youtube\.com\/embed\/([^?&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  /**
   * Inizializza l'API player di YouTube
   */
  initPlayer() {
    if (!window.YT) {
      this.loadApiScript().then(() => this.createPlayer());
    } else {
      this.createPlayer();
    }
  }

  /**
   * Carica lo script API YouTube (Promise)
   */
  loadApiScript() {
    return new Promise((resolve) => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onload = () => resolve();
      document.head.appendChild(tag);
    });
  }

  /**
   * Crea un nuovo player YouTube
   */
  createPlayer() {
    this.player = new window.YT.Player(this.iframe, {
      events: {
        onReady: () => this.onReady(),
        onStateChange: (event) => this.onStateChange(event),
      },
    });
  }

  onReady() {
    // Esempio: autoplay
    this.player.playVideo();
  }

  onStateChange(event) {
    // Gestisci eventi come PLAY, PAUSE, END
    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
        console.log('Video play');
        break;
      case window.YT.PlayerState.PAUSED:
        console.log('Video paused');
        break;
      case window.YT.PlayerState.ENDED:
        console.log('Video ended');
        break;
      default:
        break;
    }
  }

  /**
   * Distruggi player
   */
  destroy() {
    if (this.player && this.player.destroy) {
      this.player.destroy();
    }
  }
}

/**
 * Inizializza plugin su tutti gli elementi trovati
 * @param {string} selector - Selector CSS
 */
export function initYoutubePlugin(selector = '.youtube-video') {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).map((el) => new YoutubeVideo(el));
}
