import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@italia/video';
import '@italia/button';
import itLang from '../src/locales/it.js';
import { ConsentOptions, Track, Translations, Locale } from '../src/it-video.ts';

interface VideoProps {
  src: string;
  poster: string;
  type?: string;
  options?: object;
  translations?: Translations;
  language?: Locale;
  track?: Track;
  consentOptions?: ConsentOptions;
  initPluginsName: string;
}
type Story = StoryObj<VideoProps>;

// Renderizza il wc it-video di default
const renderComponent = (params: any) => html`
  <it-video
    src="${ifDefined(params.src)}"
    poster="${ifDefined(params.poster)}"
    type="${ifDefined(params.type)}"
    options="${params.options ? JSON.stringify(params.options) : nothing}"
    translations="${params.translations ? JSON.stringify(params.translations) : nothing}"
    language="${ifDefined(params.language)}"
    track="${params.track ? JSON.stringify(params.track) : nothing}"
    >${params.slot}</it-video
  >
`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Componenti/Video',
  tags: ['autodocs'],
  component: 'it-video',
  args: {
    src: 'https://vjs.zencdn.net/v/oceans.webm',
    poster: '',
    type: 'video/mp4',
    options: undefined,
    track: [],
    consentOptions: {},
    language: 'it',
    translations: { it: itLang },
    initPluginsName: '',
  },
  argTypes: {
    src: { control: 'text', description: 'Sorgente del video' },
    poster: { control: 'text', description: "Sorgente dell'immagine di anteprima" },
    type: { control: 'text', description: 'Tipo del video.', table: { defaultValue: { summary: 'video/mp4' } } },
    options: {
      control: 'object',
      description: 'Opzioni per il video player. https://videojs.com/guides/options/ qui tutte le opzioni disponibili.',
    },
    track: {
      control: 'text',
      table: {
        defaultValue: {
          summary: '[{kind:"chapter", src: "/path/file.ext", srclang:"it", label: "Capitoli", default: true }]',
        },
      },
      description:
        'Tracce per didascalie, sottotitoli, capitoli e descrizioni. Nel campo `kind` è necessario indicare la tipologia di traccia fra <ul><li>captions</li><li>subtitles</li><li>description</li><li>chapters</li><li>metadata</li></ul>',
    },
    consentOptions: {
      control: 'object',
      description:
        'Oggetto per la configurazione del riquadro per il consenso dei cookie. <br/>Di default sono gia previsti testi e icona, ma è possibile (ed è suggerito) modificare il testo con il link alla pagina della privacy policy. Di default viene salvata una variabile nel localstorage quando viene dato il consenso permanente per i cookie, ma è possibile personalizzare il comportamento passando in questo oggetto due funzioni specifiche per la gestione della memorizzazione del consenso: `onAccept` e `isAccepted`. ',
      table: {
        defaultValue: {
          summary:
            "{icon: 'it-video', text: 'Accetta i cookie di YouTube per vedere il video. Puoi gestire le preferenze nella <a href='#' class='text-white'>cookie policy</a>.', acceptButtonText: 'Accetta', rememberCheckboxText: 'Ricorda per tutti i video',}",
        },
      },
    },
    language: {
      control: 'text',
      description: "Lingua del player di cui verrano usate le corrispondenti 'transaltions'",
      table: { defaultValue: { summary: 'it' } },
    },
    translations: {
      control: 'object',
      description:
        'Traduzioni per le diverse lingue. Di base è disponibile solo la lingua it. Usare questa prop per aggiungere le traduzioni in altre lingue. ',
    },
    initPluginsName: {
      control: 'string',
      description:
        'Nome della propria funzione presente nella window che verrà invocata da video.js per inizializzare eventuali plugin aggiuntivi definiti dallo sviluppatore.',
    },
  },
  decorators: [
    (Story) =>
      html`<div class="sbdocs-video-container">
        <!-- 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  -->
        ${Story()}
      </div>`,
  ],
  parameters: {
    docs: {
      source: { excludeDecorators: true },
      description: {
        component: `
<Description>Componente Video Player.</Description>
<br/><br/>
Il tag video HTML5 consente di incorporare video all’interno di una pagina web senza dover utilizzare plugin esterni.
Questo componente utilizza la libreria [video.js](https://videojs.com/) per implementare funzionalità avanzate come il supporto a diversi formati video, la personalizzazione dell’interfaccia utente e l’integrazione con API esterne.

<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Accessibilità</span></div>
<p>Le persone che utilizzano le tecnologie assistive possono agevolmente accedere ai comandi di questo player video, tuttavia per rendere accessibile un contenuto video è necessario soddisfare i Criteri di Successo contenuti nelle <a href="https://www.w3.org/Translations/WCAG21-it/#time-based-media">linee guida 1.2 Media temporizzati delle WCAG (versione corrente)</a>. In particolare:</p>
<ul>
<li>Se il contenuto è costituito da “solo video” oppure “solo audio”, è necessario fornire una trascrizione (Criterio di Successo 1.2.1)</li>
<li>Fornire sempre sottotitoli (Criterio di Successo 1.2.2).</li>
<li>Fornire audio descrizioni quando sono presenti scene o contenuti non descritte dalla traccia audio primaria. (Criteri di Successo 1.2.3 e 1.2.5)</li>
</ul></div></div>
`,
      },
    },
  },
} satisfies Meta<VideoProps>;

export default meta;

export const EsempioInterattivo: Story = {
  ...meta,
  name: 'Esempio interattivo',
  // args: {
  //   src: 'https://vjs.zencdn.net/v/oceans.webm',
  // },

  tags: ['!autodocs', '!dev'],
  parameters: {
    docs: {
      source: { excludeDecorators: true },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  render: (params) =>
    html` ${renderComponent({
      ...params,
    })}`,
};

export const ComeUsarlo: Story = {
  name: 'Come usarlo',
  tags: ['!dev'],
  render: () => html`<div class="hide-preview"></div>`,
  parameters: {
    viewMode: 'docs', // assicura che si apra la tab Docs anziché Canvas
    docs: {
      description: {
        story: `
Per aggiungere un video, è sufficiente utilizzare il componente \`<it-video />\` ed i relativi attributi per gestirne la sorgente, e le opzioni del video player. - Usa l'attributo \`options\` per passare
al player le opzioni definite qui [https://videojs.com/guides/options/](https://videojs.com/guides/options/).

- Usa l'attributo \`translations\` per definire le traduzioni diverse dalla lingua italiana, o per
sovrascrivere le traduzioni italiane pre-impostate.

### Font per le icone del player
Per utilizzare le icone del player, è necessario includere il font \`VideoJS.woff\` nella tua applicazione. Puoi farlo aggiungendo il css compilato di design-web-components nel tuo sorgente HTML:

\`\`\`html
<link rel="stylesheet" href="design-web-components/dist/design-web-components.css" />
\`\`\`
oppure se stai usando SCSS puoi definire il font direttamente nel tuo file SCSS:

\`\`\`scss
@font-face {
  font-family: VideoJS;
  src: url('./assets/fonts/VideoJS.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
\`\`\`
copiando l'asset \`VideoJS.woff\` nella tua cartella assets/fonts (lo puoi copiare dal package design-web-components).


### Plugin
Esistono numerosi plugin disponibili per Video.js, che consentono di aggiungere nuove funzionalità, come la riproduzione di video in VR, l’analisi delle statistiche di visualizzazione del video, le utility per la UI mobile e molto altro ancora.

#### Utilizzo di ulteriori plugin
<Description> (Ad esempio il plugin per l'embed di Vimeo)</Description>
Con l'attributo  \`init-plugins\` è possibile passare al componente \`<it-video>\` il nome della propria funzione di inizializzazione dei plugin, che deve essere definita nella window.

Esempio:

\`\`\`html
<it-video ...... init-plugins="myInitPlugin"></it-video>
<script> const myInitPlugin = (videojs)=>{ /*my code*/ }</script>
\`\`\`
`,
      },
    },
  },
};

export const ConTrascrizione: Story = {
  ...meta,
  name: 'Con trascrizione',
  render: (params) =>
    html` ${renderComponent({
      ...params,
      translations: undefined,
      slot: html`<div class="vjs-transcription accordion">
        <div class="accordion-item">
          <h2 class="accordion-header " id="transcription-head4">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#transcription4"
              aria-expanded="true"
              aria-controls="transcription"
            >
              Trascrizione
            </button>
          </h2>
          <div
            id="transcription4"
            class="accordion-collapse collapse"
            role="region"
            aria-labelledby="transcription-head4"
          >
            <div class="accordion-body">
              Vestibulum hendrerit ultrices nibh, sed pharetra lacus ultrices eget. Morbi et ipsum et sapien dapibus
              facilisis. Integer eget semper nibh. Proin enim nulla, egestas ac rutrum eget, ullamcorper nec turpis.
            </div>
          </div>
        </div>
      </div>`,
    })}`,
};

export const SottotitoliDidascalieCapitoliEDescrizioni: Story = {
  ...meta,
  name: 'Sottotitoli, didascalie, capitoli e descrizioni',
  parameters: {
    docs: {
      description: {
        story: `
Tramite l'attributo \`track\` puoi aggiungere del testo accessibile presente in un file testuale; l’unico formato supportato è WebVTT.
L'attributo \`track\` accetta un elenco di valori con il seguente formato:

\`\`\`js
[{kind:'captions', src:'https://example.com/captions.vtt', srclang:'it', label:'Italiano', default:true}, ...]
\`\`\`

dove ogni singolo elemento rappresenta un file di sottotitoli, didascalie, capitoli o descrizioni.

Valorizzando opportunamente la proprietà \`kind\` puoi specificare se il file associato contiene:
- \`captions\`: per i sottotitoli (trascrizione dei dialoghi)
- \`subtitles\`: per le didascalie (trascrizione dei dialoghi, degli effetti sonori, trascrizione del tipo di emozioni rappresentate dalla musica, ecc)
- \`chapters\`: per i capitoli
- \`descriptions\`: per le descrizioni (testo che descrive il contenuto visivo del video, utile per le persone con disabilità visive)
- \`metadata\`: per i metadati (informazioni aggiuntive sul video, come la durata, la risoluzione, ecc)

L'attributo \`default\` indica se il file associato è quello predefinito da utilizzare di default quando il video viene caricato.

Approfondisci l’argomento consultando la documentazione di [VideoJS](https://videojs.com/guides/text-tracks/) (Inglese).

Di seguito un esempio d’uso delle didascalie (kind:"captions") in diverse lingue.
`,
      },
    },
  },
  render: (params) =>
    html`${renderComponent({
      ...params,
      src: './assets/video/ElephantsDream.mp4',
      track: [
        { kind: 'captions', src: './assets/video/subtitles-it.vtt', srclang: 'it', label: 'Italiano', default: true },
        { kind: 'captions', src: './assets/video/subtitles-en.vtt', srclang: 'en', label: 'English' },
        { kind: 'captions', src: './assets/video/subtitles-es.vtt', srclang: 'es', label: 'Español' },
      ],
      translations: undefined,
    })}`,
};

export const ImmagineDiAnteprima: Story = {
  ...meta,
  name: 'Immagine di anteprima',
  parameters: {
    docs: {
      description: {
        story: `
Per aggiungere un’immagine di anteprima come copertina al video occorre utilizzare l’attributo \`poster\` inizializzato con la url dell’anteprima.

<div class="callout callout-warning"><div class="callout-inner"><div class="callout-title"><span class="text">Attenzione</span></div>
<p>Le immagini caricate come copertina devono rispettare la stessa \`aspect ratio\` del video per una corretta visualizzazione.
</p></div></div>

`,
      },
    },
  },
  render: (params) =>
    html`${renderComponent({
      ...params,
      src: './assets/video/ElephantsDream.mp4',
      poster: './assets/video/ElephantsDream.mp4-poster21.jpg',
      translations: undefined,
    })}`,
};

export const Streaming: Story = {
  ...meta,
  // name: 'Streaming',
  parameters: {
    docs: {
      description: {
        story: `
Servire i video tramite dei file in formato mp4 o webm (che sono i formati più supportati) non è la migliore soluzione in termini di performance e di ottimizzazione della banda.

Per garantire una buona esperienza utente è fondamentale scegliere il formato di riproduzione più adatto.

In questo contesto, i formati di streaming HLS e DASH offrono importanti vantaggi rispetto al tradizionale file MP4.

L’uso dei formati di streaming permette una riproduzione fluida dei video online grazie alla loro
capacità di adattarsi alla larghezza di banda disponibile. In questo modo si evitano interruzioni o rallentamenti durante la visualizzazione, migliorando l’esperienza utente. Inoltre, questi formati consentono di distribuire il contenuto su diverse piattaforme e dispositivi, aumentando la portabilità del video.

<div class="callout callout-info"><div class="callout-inner"><div class="callout-title"><span class="text"><h5 id="tip">Tip</h5></span></div><p>FFmpeg è uno strumento di conversione multimediale open-source che consente di convertire facilmente i
file MP4 in formati adattivi come HLS o DASH, ti permette la conversione del video MP4 in un formato a
bitrate variabile per adattare la qualità del video alle diverse velocità di connessione degli utenti.
Approfondisci su <a href="https://ffmpeg.org/">FFmpeg</a>.</p></div></div>



Le playlist HLS e DASH possono essere riprodotte su più domini condividendo solo l’URL.
Tuttavia, a causa delle restrizioni imposte dalle politiche di sicurezza del browser, l’utilizzo di queste playlist in domini diversi da quello originale può causare errori CORS (Cross-Origin Resource Sharing).
In altre parole, il browser può rifiutare l’accesso alle risorse audio e video, impedendo la corretta riproduzione del contenuto multimediale.

Per superare questo problema, è necessario configurare correttamente il server che fornisce le risorse audio e video, consentendo l’accesso a domini esterni tramite le policy CORS.

Di seguito un esempio in formato MPEG-DASH:
`,
      },
    },
  },
  render: (params) =>
    html`${renderComponent({
      ...params,
      src: './assets/video/ElephantsDreamDASH/ElephantsDream.mp4.mpd',
      type: 'application/dash+xml',
      poster: './assets/video/ElephantsDream.mp4-poster16.gif',
      track: [
        { kind: 'captions', src: './assets/video/subtitles-it.vtt', srclang: 'it', label: 'Italiano', default: true },
        { kind: 'captions', src: './assets/video/subtitles-en.vtt', srclang: 'en', label: 'English' },
        { kind: 'captions', src: './assets/video/subtitles-es.vtt', srclang: 'es', label: 'Español' },
        { kind: 'chapters', src: './assets/video/chapters-it.vtt', srclang: 'it', label: 'Italiano' },
        { kind: 'chapters', src: './assets/video/chapters-en.vtt', srclang: 'en', label: 'English' },
        { kind: 'chapters', src: './assets/video/chapters-es.vtt', srclang: 'es', label: 'Español' },
      ],
      translations: undefined,
    })}`,
};

export const GestirePiuTracceAudio: Story = {
  ...meta,
  name: 'Gestire più tracce audio',
  parameters: {
    docs: {
      description: {
        story: `
L’uso di più tracce audio nei video è una buona tecnica per migliorare l’accessibilità dei contenuti multimediali.
Ad esempio, è possibile creare una traccia audio aggiuntiva che descrive in dettaglio le immagini e le azioni che si svolgono nel video, per aiutare le persone non vedenti a comprendere il contenuto visivo.
Inoltre, l’aggiunta di tracce audio in lingue diverse consente di offrire il video in più lingue.

<div class="callout callout-info"><div class="callout-inner"><div class="callout-title"><span class="text">Tieni presente che</span></div>
<p>Video.js offre un’implementazione cross-browser delle tracce audio, a condizione che la
tecnologia di riproduzione supporti le tracce audio. Le tracce audio per i file mp4 sono
supportate solo da Safari, altri browser non supportano la riproduzione mp4 con più tracce
audio. L’unico modo per fornire l’audio multi-traccia cross-browser è l’uso dei formati
HLS e/o DASH.
Approfondisci su <a href="https://videojs.com/guides/audio-tracks/">Video.js</a></p>
</div></div>


Per vedere tutte le opzioni disponibili, consultare la documentazione di [VideoJS](https://videojs.com/guides/options/).

Di seguito un esempio in formato HLS multilingua.
`,
      },
    },
  },
  render: (params) =>
    html`${renderComponent({
      ...params,
      src: './assets/video/ElephantsDreamHLS/ElephantsDream.mp4.m3u8',
      type: 'application/x-mpegURL',
      poster: './assets/video/ElephantsDream.mp4-poster21.jpg',
      translations: undefined,
    })}`,
};

export const EmbedDaPiattaformeTerze: Story = {
  ...meta,
  name: 'Embed da piattaforme terze',
  parameters: {
    docs: {
      description: {
        story: `
Oltre a consentire la riproduzione di video direttamente sulle proprie pagine web, il player video.js offre anche la possibilità di incorporare video provenienti da altre piattaforme come YouTube.

Questa funzionalità consente di sfruttare i video già disponibili su queste piattaforme, senza doverli caricare sul proprio sito web.
Tuttavia, è importante tenere in considerazione la questione della privacy: quando si incorporano video di terze parti, si può finire per condividere con queste piattaforme i dati degli utenti che visualizzano i video, come ad esempio le informazioni sulla navigazione o l’indirizzo IP.
È quindi importante l’utilizzo di questa funzionalità assieme al componente di accettazione del consenso per garantire la protezione della privacy degli utenti.

<div class="callout callout-warning"><div class="callout-inner"><div class="callout-title"><span class="text">Nota</span></div>
<p>Gli esempi che seguono fanno tutti riferimento alla piattaforma di terze parti YouTube.</p>
</div></div>

<div class="callout callout-info"><div class="callout-inner"><div class="callout-title"><span class="text">Responsabilità della privacy</span></div>
<p>Coinvolgi il Responsabile per la protezione dei dati (RDP/DPO) della tua amministrazione e ricordati di aggiornare la cookie policy del sito. Designers Italia mette a disposizione il [kit Privacy](https://designers.italia.it/risorse-per-progettare/organizzare/privacy/) per approfondire questi temi e in particolare uno strumento dedicato alla redazione della Cookie policy che trovi in [questa azione del kit](https://designers.italia.it/risorse-per-progettare/organizzare/privacy/rispetta-la-privacy-per-il-go-live-di-un-sito/).</p>
</div></div>

#### Attivazione dell’overlay di consenso
L’utilizzo di un overlay per il consenso è una soluzione comune per garantire la conformità alla normativa sulla privacy in materia di cookie e tracciamento degli utenti.
L’overlay per il consenso consente di informare l’utente sui cookie utilizzati e di ottenere il suo consenso in modo esplicito e consapevole alla riproduzione del video prima dell’installazione di qualunque cookie.

<div class="callout callout-info"><div class="callout-inner"><div class="callout-title"><span class="text">Obblighi</span></div>
<p>Per questo la Pubblica Amministrazione che fa uso di servizi di terze parti come YouTube deve necessariamente specificare l’utilizzo di cookie di tracciamento da parte di piattaforme di terze parti, inserendo inoltre il link alla propria cookie policy all’interno dell’overlay (dove adesso c’è il link a ‘#’).
Nella sezione seguente vengono illustrate le funzioni per la gestione delle preferenze con JavaScript.</p>
</div></div>

L'overlay di consenso viene automaticamente istanziato dal componente se si tratta di un video Youtube.

Per personalizzare l'overlay di consenso è possibile passare al componente \`<it-video>\` l'attributo \`consentOptions\` con il seguente formato:

\`\`\`js
consentOptions = {
    icon?: string; //nome dell'icona da usare nell'overlay del consenso
    text?: string; //testo da mostrare nell'overlay di consenso, comprendente il link alla privacy policy
    acceptButtonText?: string; //testo da mostrare sul bottone di accettazione
    rememberCheckboxText?: string; //testo da mostrare a fianco della checkbox per il salvataggio del consenso
    consentKey?: string; //nome della variabile da usare nel localStorage per il salvataggio della preferenza sul consenso. Di default è 'youtube' per i video di Youtube.
    onAccept?: Function; //(accepted, consentKey)=>{} - funzione che viene invocata quando si accetta il consenso permanente per un video di questa tipologia. Se presente, non viene gestita la preferenza nel localstorage, ma è compito dello sviluppatore implementare la logica di salvataggio delle preferenze
    isAccepted?: Function; // (consentKey)=>{} - funzione che ritorna un valore booleano (true/false), che indica se l'utente ha gia accettato il consenso permanente per tutti i video di quel tipo.
  };
\`\`\`
`,
      },
    },
  },
  render: (params) =>
    html`${renderComponent({
      ...params,
      src: 'https://youtu.be/_0j7ZQ67KtY',
      type: undefined,
      translations: undefined,
    })}`,
};
