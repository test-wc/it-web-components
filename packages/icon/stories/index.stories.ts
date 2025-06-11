import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { type AvailableIcons, registry } from '../src/icon-registry.ts';
import '@italia/icon';

interface IconProps {
  name?: string;
  size?: 'xs' | 'sm' | 'lg' | 'xl';
  label?: string;
  color?: string;
  background?: string;
  align?: 'top' | 'middle' | 'bottom';
  padded?: boolean;
  src?: string;
  role?: string;
}

const iconNames = Object.keys(registry) as AvailableIcons[];
const sizes: IconProps['size'][] = ['xs', 'sm', undefined, 'lg', 'xl'];
const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'inverse', 'light', 'disabled'];
const alignments = ['top', 'middle', 'bottom'];
const renderIcon = (params: IconProps) => html`
  <it-icon
    name=${ifDefined(params.name)}
    size=${ifDefined(params.size)}
    label=${ifDefined(params.label)}
    color=${ifDefined(params.color)}
    background=${ifDefined(params.background)}
    align=${ifDefined(params.align)}
    ?padded=${params.padded ?? false}
    src=${ifDefined(params.src)}
    role=${ifDefined(params.role)}
  ></it-icon>
`;

const meta: Meta<IconProps> = {
  title: 'Componenti/Icona',
  component: 'it-icon',
  tags: ['autodocs'],
  args: {
    name: 'it-star-full',
    label: 'Titolo A11y',
    align: 'middle',
    role: 'img',
    padded: false,
  },
  argTypes: {
    name: {
      description: "Nome dell'icona da visualizzare",
      options: iconNames,
      control: 'select',
    },
    size: {
      control: 'select',
      options: sizes,
      description: "Dimensione dell'icona: 'xs' | 'sm' | 'lg' | 'xl'",
      defaultValue: undefined,
    },
    align: {
      control: 'select',
      options: alignments,
      description: "Allineamento verticale dell'icona: 'top' | 'middle' | 'bottom' ",
      defaultValue: 'middle',
    },
    color: {
      control: 'select',
      options: colors,
      description: 'Colori disponibili',
    },
    background: {
      control: 'select',
      options: colors,
      description: 'Background disponibili',
    },
    label: {
      control: 'text',
      description: 'Testo accessibile per tecnologie assistive (A11Y)',
    },
    role: {
      control: 'text',
      description: 'Ruolo accessibile. Default: "img"',
    },
    src: {
      control: 'text',
      description: 'Attributo per caricare un svg esterno',
    },
    padded: {
      control: 'boolean',
      description: 'Crea un padding proporzionale alla dimensione dell’icona attorno ad essa',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
### Componente \`<it-icon>\`

Il componente \`<it-icon>\` consente di visualizzare una delle icone SVG disponibili nel Design System, usare un icona proprietaria o un icona tramite URL.
Tutte le icone vengono caricate unicamente in modalià asincrona.

Supporta accessibilità tramite \`label\` e \`role\`. In presenza di \`label\`, viene inserito un tag \`<label>\` all'interno dell'SVG per screen reader.


#### Esempio di utilizzo:

\`\`\`html
<it-icon name="it-user" size="sm" label="Utente"></it-icon>
\`\`\`


### Elemento interattivo
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<IconProps>;

export const EsempioInterattivo: Story = {
  render: (args) => html`${renderIcon(args)}`,
  tags: ['!autodocs', '!dev'],
};

export const TutteLeIconeDisponibili: Story = {
  render: () => {
    const inputId = `search-${Math.random().toString(36).slice(2)}`;

    const showCopiedFeedback = (element: HTMLElement) => {
      const el = element;
      const original = el.innerHTML;
      el.innerHTML = '✅ Copiato!';
      el.style.color = '#007a33';
      setTimeout(() => {
        el.innerHTML = original;
        el.style.color = '#444';
      }, 1200);
    };

    const handleKeyDown = (e: KeyboardEvent, name: string, label: HTMLElement) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigator.clipboard.writeText(name);
        showCopiedFeedback(label);
      }
    };

    return html`
      <style>
        .icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 16px;
          font-family: 'Titillium Web', sans-serif;
          font-size: 16px;
        }

        .icon-item {
          text-align: center;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background-color 0.2s ease;
        }

        .icon-item:hover {
          background-color: #f2f2f2;
        }

        .icon-label {
          font-size: 0.75rem;
          margin-top: 6px;
          overflow-wrap: break-word;
          color: #444;
          transition: color 0.3s ease;
        }

        .search-input {
          margin-bottom: 2.5rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        #storybook-root {
          width: 100%;
        }
      </style>

      <div>
        <input
          id="${inputId}"
          class="search-input"
          type="text"
          placeholder="Cerca un'icona per nome…"
          @input=${(e: InputEvent) => {
            const value = (e.target as HTMLInputElement).value.toLowerCase();
            const items = document.querySelectorAll('[data-icon-name]');
            items.forEach((item) => {
              const el = item as HTMLElement;
              const nameAttr = el.getAttribute('data-icon-name') || '';
              el.style.display = nameAttr.includes(value) ? '' : 'none';
            });
          }}
        />
        <div class="icon-grid">
          ${iconNames.map(
            (name) => html`
              <div
                class="icon-item"
                data-icon-name="${name.toLowerCase()}"
                role="button"
                tabindex="0"
                label="Clicca per copiare"
                @click=${(e: Event) => {
                  navigator.clipboard.writeText(name);
                  const label = (e.currentTarget as HTMLElement).querySelector('.icon-label') as HTMLElement;
                  showCopiedFeedback(label);
                }}
                @keydown=${(e: KeyboardEvent) => {
                  const label = (e.currentTarget as HTMLElement).querySelector('.icon-label') as HTMLElement;
                  handleKeyDown(e, name, label);
                }}
              >
                <it-icon name="${name}" size="lg" label="${name}"></it-icon>
                <div class="icon-label">${name}</div>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  },

  parameters: {
    docs: {
      description: {
        story: `

Questa sezione mostra tutte le icone SVG disponibili nel Design System.
Puoi cercare un'icona per nome e cliccarla per copiarne il nome identificativo nel formato \`name\`.

Questo identificativo può poi essere utilizzato nel componente \`<it-icon>\`:

\`\`\`html
<it-icon name="it-user" size="sm" label="Utente"></it-icon>
\`\`\`
        `,
      },
    },
  },
};

export const VariantiDiDimensione: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 20px; align-items: baseline;">
      ${sizes.map((size) => html`<div>${renderIcon({ ...args, size })}</div>`)}
    </div>
  `,
  args: {
    name: 'it-star-full',
  },
  parameters: {
    docs: {
      description: {
        story: `

Il componente \`<it-icon>\` supporta tre dimensioni predefinite:

- \`xs\`
- \`sm\`
- \`lg\`
- \`xl\`

Esempio:

\`\`\`html
<it-icon name="it-user" size="lg" label="Utente"></it-icon>
\`\`\`
        `,
      },
    },
  },
};

export const VariantiColore: Story = {
  render: () => html`
    <div style="display:flex; gap:20px; align-items:center; background-color:#ddd;padding:2rem">
      ${colors.map((color) => renderIcon({ name: 'it-star-full', label: `col ${color}`, color }))}
      ${renderIcon({ name: 'it-user', label: 'bg', background: 'light' })}
      ${renderIcon({ name: 'it-user', label: 'bg', background: 'dark' })}
      ${renderIcon({ name: 'it-user', label: 'bg', background: 'inverse' })}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Esempi di colore e sfondo.
        `,
      },
    },
  },
};
export const VariantiAllineamento: Story = {
  render: () => html`
    <div>
      ${['top', 'middle', 'bottom'].map((align) =>
        // @ts-ignore
        renderIcon({ name: 'it-star-full', label: `align ${align}`, align, size: 'lg' }),
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
È possibile usare le classi di allineamento per posizionare le icone all’interno di un elemento.
        `,
      },
    },
  },
};

export const CustomSVG: Story = {
  args: {
    size: 'sm',
    label: 'Icona utente',
  },
  render: (args) => html`
    <div style="display: flex; gap: 20px; align-items: baseline;">
      <it-icon ${args}>
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="red"></circle>
        </svg>
      </it-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `

È possibile usare \`<it-icon>\` come contenitore per un qualsiasi SVG personalizzato, semplicemente inserendolo nello slot:

\`\`\`html
<it-icon
    size='sm'
    label='Icona utente'
  >
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="red"></circle>
  </svg>
</it-icon>
\`\`\`

In questo caso:

- il componente si occupa comunque di gestire l'accessibilità.
- vengono rimossi eventuali \`label\` duplicati.
- viene forzato \`aria-hidden="true"\` se necessario.
        `,
      },
    },
  },
};

export const SVGEsterno: Story = {
  render: () =>
    html`<div style="display: flex; gap: 20px; align-items: baseline;">
      ${renderIcon({
        src: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Palermo-Stemma_%281999%29.svg',
        label: 'Stemma Roma',
        size: 'xl',
      })}
      ${renderIcon({
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Roma-Stemma-2.svg',
        label: 'Stemma Roma',
        size: 'xl',
      })}
      ${renderIcon({
        src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/CoA_Citt%C3%A0_di_Milano.svg',
        label: 'Stemma Roma',
        size: 'xl',
      })}
    </div>`,
  parameters: {
    docs: {
      description: {
        story: `
È possibile utilizzare un'immagine esterna come icona, utilizzando l'URL dell'immagine nell'attributo src del componente.
Uso:

\`\`\`html
<it-icon src="https://…/logo.svg" label="Logo"></it-icon>
\`\`\`
        `,
      },
    },
  },
};
