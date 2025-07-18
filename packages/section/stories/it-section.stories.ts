import type { StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { SECTION_VARIANTS, type SectionProps } from '../src/types.ts';

import '@italia/section';

const defaultContent = html`
  <!-- contenuto di esempio START -->
  <div class="container">
    <div class="row mb-3">
      <div class="col-12">
        <h2>Morbi fermentum amet</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6 col-xl-4">
        <p>
          Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Dictum sit amet justo
          donec enim diam vulputate ut. Eu nisl nunc mi ipsum faucibus.
        </p>
      </div>
      <div class="col-12 col-lg-6 col-xl-4">
        <p>
          Eget egestas purus viverra accumsan. Diam maecenas ultricies mi eget mauris pharetra et. Etiam dignissim diam
          quis enim. Eu nisl nunc mi ipsum faucibus.
        </p>
      </div>
      <div class="col-12 col-lg-6 col-xl-4">
        <p>
          Euismod lacinia at quis risus sed vulputate. Scelerisque purus semper eget duis at tellus at urna condimentum.
          Mattis enim ut tellus elementum sagittis.
        </p>
      </div>
    </div>
  </div>
  <!-- contenuto di esempio END -->
`;
function renderSection({
  variant,
  image,
  content,
  inverse = false,
}: SectionProps & {
  content?: any;
}) {
  return html`
    <it-section variant="${variant || nothing}" image="${image || nothing}" ?inverse="${ifDefined(inverse) || nothing}">
      ${content || defaultContent}
    </it-section>
  `;
}
const meta = {
  title: 'Componenti/Section',
  tags: ['autodocs'],
  component: 'it-section',
  parameters: {
    docs: {
      description: {
        component: `<Description>Per creare sezioni di layout orizzontale con differenti sfondi.</Description>

Il componente \`<it-section>\` rappresenta un contenitore visivo per introdurre sezioni di contenuto con o senza immagine.

Per indicazioni su "Come e Quando usarlo" si fa riferimento alla [guida del design-system](https://designers.italia.it/design-system/componenti/sections/)


<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Accessibilità e immagini decorative</span></div><p>
      Le immagini fornite tramite l'attributo <code>image</code> sono considerate <strong>decorative</strong>: sono rese con un tag <code>&lt;img&gt;</code> e <code>aria-hidden="true"</code>.
      In questo modo non vengono annunciate dagli screen reader.</p><p class="pt-2">Il componente imposta inoltre automaticamente <code>aria-labelledby</code> basandosi sul primo titolo (heading) presente nello <code>&lt;slot&gt;</code>.
      Assicurati che il contenuto contenga un'intestazione semantica (es. <code>&lt;h2&gt;</code>) per garantire la corretta navigazione assistiva.</p></div></div>
`,
      },
    },
  },
  args: {
    variant: '',
    image: '',
    inverse: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: SECTION_VARIANTS,
      description: 'Variante grafica del componente, corrisponde alle classi di Bootstrap Italia',
      table: { defaultValue: { summary: undefined } },
    },
    image: {
      control: { type: 'text' },
      description: 'URL immagine di sfondo, ad esempio https://picsum.photos/1600/500',
    },

    inverse: {
      control: { type: 'boolean' },
      description:
        'Inverte il colore del testo (bianco su sfondo scuro), utile per sezioni scure o con immagini di sfondo',
      table: { defaultValue: { summary: false } },
    },
  },
};

export default meta;
type Story = StoryObj<SectionProps>;

export const EsempioInterattivo: Story = {
  name: 'Esempio interattivo',
  tags: ['!autodocs', '!dev'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  render: (args) => html`${renderSection(args)}`,
};

export const PersonalizzazioneDegliStili: Story = {
  name: 'Personalizzazione degli stili',
  tags: ['!dev'],
  parameters: {
    viewMode: 'docs', // assicura che si apra la tab Docs anziché Canvas
    docs: {
      canvas: { hidden: true, sourceState: 'none' }, // nasconde solo il canvas nella docs page
      description: {
        story: `
Per la personalizzazione degli stili si può usare il selettore \`::part\` passando il valore \`section\`. [Vedi qui la guida dettagliata](/docs/personalizzazione-degli-stili--documentazione#selettore-part).

Quando si organizzano i contenuti usando le classi della griglia, non serve aggiungere spazio ai lati. Se proprio necessario, si può aggiungere spazio laterale usando la variabile \`--bs-section-padding-x\`.

Si può usare la variabile \`--bs-section-image-overlay\` per regolare l'opacità dell'overlay applicato all'immagine.
`,
      },
    },
  },
  render: () => html`<div class="hide-preview"></div>`,
};
export const VariantiColore: Story = {
  name: 'Varianti di sfondo',
  render: () => html`
    <div class="d-flex flex-column gap-4">
      ${(['muted', 'emphasis', 'primary'] as const).map((variant) =>
        renderSection({
          variant,
          inverse: variant === 'primary',
          content: html`
            <div class="container">
              <h3>Sezione ${variant}</h3>
              <p>
                Questa sezione usa la variante <code>${variant}</code>
                ${variant === 'primary' ? "con testo bianco attraverso l'attributo inverse" : ''}
              </p>
            </div>
          `,
        }),
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Sono disponibili le varianti colore di sfondo per le sezioni, corrispondenti alle classi di Bootstrap italia:

- \`muted\`
- \`emphasis\`
- \`primary\`

Il componente Section ha, per default, uno sfondo trasparente.
        `,
      },
    },
  },
};

export const VarianteConImmagine: Story = {
  name: 'Sezione con immagine decorativa',
  args: {
    image: 'https://picsum.photos/1280/720?image=81',
    inverse: true,
  },
  render: (params) =>
    renderSection({
      ...params,
    }),
  parameters: {
    docs: {
      description: {
        story: `
Valorizzando l'attributo \`image\` del componente con l’URL dell’immagine da utilizzare  la Section utilizzerà l’immagine indicata come sfondo, adattandone automaticamente le dimensioni per coprire l’intera Section.

A seconda della luminosità dell’immagine si consiglia di valorizzare o meno l'attributo \`inverse\` per garantire il corretto contrasto fra testi e sfondo.
        `,
      },
    },
  },
};

export const SectionConCard: Story = {
  name: 'Sezione con card',
  args: {
    variant: 'muted',
  },
  render: (params) =>
    renderSection({
      ...params,
      content: html`
        <div class="container">
          <div class="row">
            <div class="col">
              <h2 class="mb-4">Morbi fermentum amet</h2>
            </div>
          </div>
          <div class="row gy-3">
            <div class="col-12 col-md-6">
              <div class="card shadow">
                <div class="card-body">
                  <p class="card-text font-serif">
                    Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="card shadow">
                <div class="card-body">
                  <p class="card-text font-serif">
                    Dictum sit amet justo donec enim diam vulputate ut. Eu nisl nunc mi ipsum faucibus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    }),
  parameters: {
    docs: {
      description: {
        story: `
Per aggiungere una serie di card all’interno di una Section si consiglia di utilizzare le griglie per garantire un corretto margine fra gli elementi .
        `,
      },
    },
  },
};
