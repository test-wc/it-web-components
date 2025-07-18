import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';

import '@italia/section';

const variants = ['light', 'dark', 'primary', 'white', 'none'];
const defaultContent = html` <div class="section-content">
  <!-- contenuto di esempio START -->
  <div class="container">
    <div class="row mb-3">
      <div class="col-12">
        <h2 id="titleEx2">Morbi fermentum amet</h2>
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
</div>`;
function renderSection({
  variant,
  image,
  alt,
  content,
}: {
  variant?: (typeof variants)[number];
  image?: string;
  alt?: string;
  content?: any;
}) {
  return html`
    <it-section variant="${variant || nothing}" image="${image || nothing}" alt="${alt || nothing}">
      ${content || defaultContent}
    </it-section>
  `;
}
const meta = {
  title: 'Componenti/Section',
  tags: ['autodocs'],
  component: 'it-section',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Il componente \`it-section\` rappresenta un contenitore visivo per introdurre sezioni di contenuto con o senza immagine di sfondo.
È pensato per essere utilizzato in contesti di **hero area** o **testate di pagina**.

Le immagini vengono gestite in maniera semantica tramite tag \`<img>\` e le varianti disponibili seguono quelle di \`.it-hero-wrapper\` nel design system Bootstrap Italia.
        `,
      },
    },
  },
  args: {
    variant: '',
    image: '',
    alt: '',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variants,
      description: 'Variante grafica (corrisponde a `it-hero-wrapper-*`)',
    },
    image: {
      control: { type: 'text' },
      description: 'URL immagine di sfondo',
    },
    alt: {
      control: { type: 'text' },
      description: 'Testo alternativo per l’immagine',
    },
  },
};

export default meta;
type Story = StoryObj<any>;

// @ts-ignore
export const EsempioInterattivo: Story = {
  ...meta,
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

export const SectionDefault: Story = {
  name: 'Default con immagine e contenuto',
  args: {
    variant: 'light',
    image: 'https://picsum.photos/1600/500?grayscale',
    alt: 'Esempio immagine decorativa',
  },
  render: (params) =>
    renderSection({
      ...params,
    }),
};

export const SectionConImmagine: Story = {
  name: 'Con immagine decorativa',
  args: {
    variant: 'primary',
    image: 'https://picsum.photos/id/1015/1600/500',
    alt: 'Vista panoramica generica',
  },
  render: (params) =>
    renderSection({
      ...params,
    }),
};

export const SectionSoloTesto: Story = {
  name: 'Solo testo, nessuna variante',
  args: {
    variant: 'none',
    image: '',
    alt: '',
  },
  render: (params) =>
    renderSection({
      ...params,
      content: html`
        <div>
          <h3 class="it-hero-title">Blocco semplice</h3>
          <p class="it-hero-subtitle">Contenitore minimale senza classe di variante</p>
        </div>
      `,
    }),
};
