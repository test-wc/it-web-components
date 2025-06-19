import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@italia/video';
import itLang from '../src/locales/it.js';

interface VideoProps {
  src: string;
  poster: string;
  type?: string;
  options?: object;
  translations?: object;
  language?: string;
}
type Story = StoryObj<VideoProps>;

// Renderizza il wc it-video di default
const renderComponent = (params: any) => {
  console.log(params);
  return html`
    <it-video
      src="${ifDefined(params.src)}"
      poster="${ifDefined(params.poster)}"
      type="${ifDefined(params.type)}"
      options="${ifDefined(params.options)}"
      translations="${ifDefined(params.translations)}"
      language="${ifDefined(params.language)}"
    ></it-video>
  `;
};

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
    language: 'it',
    translations: { it: itLang },
  },
  argTypes: {
    src: { control: 'text', description: 'Sorgente del video' },
    poster: { control: 'text', description: "Sorgente dell'immagine di anteprima" },
    type: { control: 'text', description: 'Tipo del video.', table: { defaultValue: { summary: 'video/mp4' } } },
    options: {
      control: 'object',
      description: 'Opzioni per il video player. https://videojs.com/guides/options/ qui tutte le opzioni disponibili.',
    },
    translations: {
      control: 'object',
      description:
        'Traduzioni per le diverse lingue. Di base è disponibile solo la lingua it. Usare questa prop per aggiungere le traduzioni in altre lingue. ',
    },
    language: {
      control: 'text',
      description: "Lingua del player di cui verrano usate le corrispondenti 'transaltions'",
      table: { defaultValue: { summary: 'it' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<Description>Componente Video Payer.</Description>
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
  // args: {
  //   src: 'https://vjs.zencdn.net/v/oceans.webm',
  // },

  tags: ['!autodocs', '!dev'],
  parameters: {
    docs: {
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

### Plugin
Esistono numerosi plugin disponibili per video.js, che consentono di aggiungere nuove funzionalità, come la riproduzione di video in VR, l’analisi delle statistiche di visualizzazione del video, le utility per la UI mobile e molto altro ancora.

###Sottotitoli, didascalie, capitoli e descrizioni

### Immagine di anteprima
Per aggiungere un’immagine di anteprima come copertina al video occorre utilizzare l’attributo poster inizializzato con la url
dell’anteprima.

### Streaming
Servire i video tramite dei file in formato mp4 o webm (che sono i formati più supportati) non è la migliore soluzione in termini di performance e di ottimizzazione della banda.
Per garantire una buona esperienza utente è fondamentale scegliere il formato di riproduzione più adatto.
In questo contesto, i formati di streaming HLS e DASH offrono importanti vantaggi rispetto al tradizionale file MP4. L’uso dei formati di streaming permette una riproduzione fluida dei video online grazie alla loro
capacità di adattarsi alla larghezza di banda disponibile. In questo modo si evitano interruzioni o rallentamenti durante la visualizzazione, migliorando l’esperienza utente. Inoltre, questi formati consentono di distribuire il contenuto su diverse piattaforme e dispositivi, aumentando la portabilità del video.

<div class="callout callout-info"><div class="callout-inner"><div class="callout-title"><span class="text"><h5 id="tip">Tip</h5></span></div><p>FFmpeg è uno strumento di conversione multimediale open-source che consente di convertire facilmente i
file MP4 in formati adattivi come HLS o DASH, ti permette la conversione del video MP4 in un formato a
bitrate variabile per adattare la qualità del video alle diverse velocità di connessione degli utenti.
Approfondisci su <a href="https://ffmpeg.org/">FFmpeg</a></p></div></div>

### Gestire più tracce audio

### Embed da piattaforme terze

### Attivazione dell’overlay di consenso
L’utilizzo di un overlay per il consenso è una soluzione comune per garantire la conformità alla normativa sulla privacy in materia di cookie e tracciamento degli utenti.
L’overlay per il consenso consente di informare l’utente sui cookie utilizzati e di ottenere il suo consenso in modo esplicito e consapevole alla riproduzione del video prima dell’installazione di qualunque cookie.
`,
      },
    },
  },
};
