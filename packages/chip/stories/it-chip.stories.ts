import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CHIP_VARIANTS, CHIP_SIZES, type ChipProps } from '../src/types.ts';
import '@italia/icon';
import '@italia/button';
import '@italia/chip';

const meta = {
  title: 'Componenti/Chip',
  component: 'it-chip',
  tags: ['autodocs'],
  args: {
    size: 'sm',
    label: 'Etichetta',
    href: undefined,
    variant: 'primary',
    disabled: false,
    avatar: '',
    avatarAlt: 'Avatar',
    dismissable: false,
    conIcona: false,
    conPulsanteDismiss: false,
  },
  argTypes: {
    size: {
      control: 'select',
      description: 'Dimensione del chip (`sm` o `lg`).',
      options: CHIP_SIZES,
      table: { defaultValue: { summary: 'sm' } },
    },
    label: {
      control: 'text',
      description: 'Testo mostrato all’interno della chip.',
    },
    href: {
      control: 'text',
      description: 'Se valorizzato, la chip sarà un link (elemento `<a>`).',
    },
    variant: {
      control: 'select',
      description: 'Colore della chip, secondo le varianti di Bootstrap Italia.',
      options: CHIP_VARIANTS,
    },
    dismissable: {
      control: 'boolean',
      description:
        "Indica che la chip può essere chiusa, ma non inserisce alcun pulsante automaticamente. Il pulsante deve essere inserito nello slot `dismiss-button` dall'utilizzatore, comprensivo di eventuale JavaScript per handling di eventi. Per un esempio completo con Javascript, vedi la story [Chip con chiusura](?path=/story/componenti-chip--chip-con-chiusura).",
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabilita la chip. Utile in contesti non interattivi o di sola lettura.',
      table: { defaultValue: { summary: 'false' } },
    },
    avatar: {
      control: 'text',
      description: `Percorso a un'immagine da mostrare come avatar, es. [randomuser.me](https://randomuser.me/api/portraits/men/46.jpg).`,
      table: { defaultValue: { summary: 'https://randomuser.me/api/portraits/men/46.jpg' } },
    },
    avatarAlt: {
      control: 'text',
      description: `Testo alternativo per l'immagine dell'avatar, utile per l'accessibilità.`,
      table: { defaultValue: { summary: 'Alt avatar' } },
    },
    conIcona: {
      control: 'boolean',
      description:
        "Simula la presenza di un'icona nella chip. Non è una proprietà del componente, ma serve per mostrare composizioni nel playground interattivo.",
    },
    conPulsanteDismiss: {
      control: 'boolean',
      description:
        'Simula la presenza di un pulsante di rimozione nella chip. Non è una proprietà del componente, ma serve per mostrare composizioni nel playground interattivo.',
    },
  },

  parameters: {
    docs: {
      description: {
        component: `
<Description>Elementi compatti che rappresentano un input, attributo o azione.</Description>
Il componente \`<it-chip>\` si compone principalmente di una label testuale e, opzionalmente, di:

- un avatar (immagine) a sinistra, tramite la proprietà \`avatar\`;
- un'icona inserita nello slot \`icon\`;
- un pulsante di chiusura nello slot \`dismiss-button\`, per le chip cancellabili/rimuovibili (la logica di rimozione è a carico dell'utilizzatore, vedi sezione dedicata).

Per indicazioni su "Come e Quando usarlo" si fa riferimento alla [guida del design-system](https://designers.italia.it/design-system/componenti/chips/).
`,
      },
    },
  },
} satisfies Meta<
  ChipProps & {
    conIcona?: boolean;
    conPulsanteDismiss?: boolean;
  }
>;
export default meta;
type Story = StoryObj<
  ChipProps & {
    conIcona?: boolean;
    conPulsanteDismiss?: boolean;
  }
>;

const dismissTemplate = (label = 'Elimina etichetta') => html`
  <it-button
    slot="dismiss-button"
    label="${label}"
    ?icon=${true}
    @click=${(e: Event) => {
      const chip = (e.currentTarget as HTMLElement).closest('it-chip');
      if (chip) chip.remove();
    }}
    @keydown=${(e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const chip = (e.currentTarget as HTMLElement).closest('it-chip');
        if (chip) chip.remove();
      }
    }}
  >
    <it-icon name="it-close" size="sm"></it-icon>
  </it-button>
`;

const iconTemplate = (color: string) => html`
  <it-icon slot="icon" name="it-github" size="xs" color=${color}></it-icon>
`;

// Renderizza il wc it-chip di default
const renderComponent = (params) => {
  const { avatar, conIcona, label, size, variant, conPulsanteDismiss, dismissable, disabled, href } = params;
  return html`
    <it-chip
      label="${label ?? ''}"
      size="${size ?? 'sm'}"
      variant="${variant ?? ''}"
      ?dismissable=${dismissable}
      ?disabled=${disabled}
      href="${ifDefined(href || undefined)}"
      avatar="${ifDefined(avatar || undefined)}"
    >
      ${conIcona ? iconTemplate(variant) : null}
      ${dismissable && conPulsanteDismiss ? dismissTemplate('I am dismissable') : null}
    </it-chip>
  `;
};

export const EsempioInterattivo: Story = {
  ...meta,
  name: 'Esempio interattivo',
  args: {
    variant: 'primary',
  },
  tags: ['!autodocs', '!dev'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  render: (params) => html`${renderComponent(params)}`,
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
Per la personalizzazione degli stili si può usare il selettore \`::part\` passando il valore \`chip\`. [Vedi qui la guida dettagliata](/docs/personalizzazione-degli-stili--documentazione#selettore-part).
`,
      },
    },
  },
  render: () => html`<div class="hide-preview"></div>`,
};

export const VarianteConLink: Story = {
  name: 'Variante con link',
  args: {
    size: 'sm',
    variant: '',
    href: '#',
  },
  render: (args) => html`${renderComponent(args)}`,
};

export const VariantiColore: Story = {
  name: 'Varianti di colore',
  args: { label: 'Etichetta', size: 'sm', dismissable: false },
  parameters: {
    docs: {
      description: {
        story: `
Gli stili definiti da Bootstrap Italia utilizzano un naming consistente con Bootstrap, con alcune personalizzazioni:
`,
      },
    },
  },
  render: (args) => html` ${CHIP_VARIANTS.map((v) => renderComponent({ ...args, variant: v }))} `,
};
export const VariantiColoreLink: Story = {
  name: 'Varianti di colore link',
  args: { label: 'Etichetta', size: 'sm', dismissable: false },
  parameters: {
    docs: {
      description: {
        story: `

`,
      },
    },
  },
  render: (args) => html` ${CHIP_VARIANTS.map((v) => renderComponent({ ...args, variant: v, href: '#' }))} `,
};

export const VariantiDimensione: Story = {
  name: 'Varianti di dimensione',
  args: {
    size: 'sm',
    variant: '',
    dismissable: true,
  },
  render: (args) => html`${CHIP_SIZES.map((s) => renderComponent({ ...args, size: s }))}`,
};

export const ChipConChiusura: Story = {
  name: 'Chip con chiusura',
  render: (params) => html`
    ${renderComponent({ ...params, dismissable: true, conPulsanteDismiss: true, disabled: false })}
  `,
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
      description: {
        story: `
Questa composizione mostra una chip con funzionalità di chiusura.

La proprietà \`dismissable\` **non aggiunge automaticamente il pulsante**: è responsabilità dell'utilizzatore fornire un \`<it-button>\` con \`slot="dismiss-button"\` e logica di rimozione/logiche di esecuzione.

Il codice JS dell'esempio gestisce la rimozione della chip sia via click che via tastiera (\`Enter\` o \`Spazio\`).

`,
      },
      source: {
        code: `<it-chip label="Etichetta" size="sm" variant="primary" dismissable>
  <it-button
    slot="dismiss-button"
    icon
    label="Elimina etichetta"
  >
    <it-icon name="it-close" size="sm"></it-icon>
  </it-button>
</it-chip>

<script type="module">
  const dismissButtons = document.querySelectorAll('it-chip [slot="dismiss-button"]');

  dismissButtons.forEach((btn) => {
    const removeChip = (e) => {
      const chip = btn.closest('it-chip');
      if (chip) chip.remove();
    };

    btn.addEventListener('click', removeChip);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        removeChip(e);
      }
    });
  });
</script>

`,
        language: 'html',
      },
    },
  },
};
export const ChipDisabilitata: Story = {
  name: 'Chip disabilitata',
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Aggiungendo l'attributo \`disabled\` si ottiene una chip disabilitata.
`,
      },
    },
  },
  render: (args) => html`${renderComponent(args)}`,
};
