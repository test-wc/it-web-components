import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@italia/button';
import '@italia/icon';

interface ButtonProps {
  variant: string;
  outline: boolean;
  disabled: boolean;
  slot: string;
  size: string;
  type: string;
  block: boolean;
  value: string;
}

const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'link'];
const sizes = ['lg', 'sm', 'xs'];

// Renderizza il wc it-button di default
const renderComponent = (params: any, defaultSlot = '') => {
  const slot = params.slot?.length > 0 ? params.slot : defaultSlot;
  return html`
    <it-button
      variant="${params.variant}"
      ?outline="${params.outline}"
      size="${params.size}"
      ?block="${params.block}"
      ?disabled="${params.disabled}"
      type="${params.type}"
      >${slot}</it-button
    >
  `;
};

const renderDefault = (params: any) => html`
  <div class="flex">
    ${renderComponent(params)}
    ${renderComponent({
      ...params,
      disabled: true,
      slot: `${params.slot} disabled`,
    })}
  </div>
`;

const renderVariant = (args, defaultText) => {
  const slot = args.slot?.length > 0 ? args.slot : null;
  return html`<div class="flex p-0">
    ${renderDefault({
      ...args,
      slot: slot ?? defaultText,
    })}
    ${renderDefault({
      ...args,
      slot: slot ?? `${defaultText} outline`,
      outline: true,
    })}
  </div>`;
};

const renderSizeVariant = (args, defaultText) =>
  html`<div class="flex">
    ${renderComponent(
      {
        ...args,
        variant: 'primary',
      },
      `Primary ${defaultText}`,
    )}
    ${renderComponent(
      {
        ...args,
        variant: 'secondary',
      },
      `Secondary ${defaultText}`,
    )}
  </div>`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Componenti/Button',
  tags: ['autodocs'],
  component: 'it-button',
  render: (args) => renderDefault(args),
  args: {
    slot: 'Testo bottone',
    variant: 'primary',
    size: 'sm',
    block: false,
    outline: false,
    disabled: false,
    type: 'button',
    value: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Varianti di colore',
      options: colors,
    },
    size: {
      control: 'select',
      description: 'Dimensione del bottone',
      options: sizes,
    },
    block: {
      control: 'boolean',
      type: 'boolean',
      description: 'Quando abilitato, estende il componente Button fino a prendere tutta la larghezza disponibile',
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
    },
    outline: {
      control: 'boolean',
      type: 'boolean',
      description: 'Applica il colore solamente al bordo, usando il colore di sfondo come colore interno del bottone.',
    },
    slot: {
      control: 'text',
      description: 'Testo del bottone',
    },
    type: {
      control: 'select',
      description: 'Tipologia di bottone',
      options: ['button', 'submit', 'reset'],
    },
    value: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<Description>Pulsante con etichetta di testo o icona che al clic inizia un'azione o un evento.</Description>
<br/><br/><br/>
## Come usarlo
Per aggiungere un bottone personalizzato, è sufficiente utilizzare il componente
\`<it-button />\` ed i relativi attributi per applicarne le varianti di stile, dimensione, ecc.

- Usa la variante **"primary"** per valorizzare l’azione principale.
- Usa la variante **"secondary"** per valorizzare l’azione secondaria.
- Per comunicare senza ambiguità la gerarchia delle azioni generate dai pulsanti, usa le varianti di grandezza e tipologia.
- Usa un pulsante con icona per aggiungere un’informazione visiva all’interazione (es. pulsante di accesso ad area riservata).
`,
      },
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EsempioInterattivo: Story = {
  ...meta,
  args: {
    variant: 'primary',
  },
  tags: ['!autodocs', '!dev'],
  render: (params) =>
    html` ${renderComponent({
      ...params,
    })}`,
};

export const Tipologie: Story = {
  ...meta,
  args: {
    variant: 'primary',
  },
  render: (params) => html`
    <div class="flex tipologie-buttons">
      ${renderDefault({
        ...params,
        slot: `Button - ${params.slot}`,
        type: 'button',
      })}
      ${renderDefault({
        ...params,
        slot: `Submit - ${params.slot}`,
        type: 'submit',
      })}
      ${renderDefault({
        ...params,
        slot: `Reset - ${params.slot}`,
        type: 'reset',
      })}
    </div>
  `,
};

export const VariantiColore: Story = {
  args: { slot: '' },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    outline: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
Gli stili definiti da Bootstrap Italia utilizzano un naming consistente con Bootstrap, con alcune personalizzazioni:

#### Note sullo stato disabilitato
- I bottoni disabilitati includeranno l’attributo aria-disabled="true" per indicare lo stato dell’elemento alle tecnologie assistive.
`,
      },
    },
  },
  render: (args) => html`
    ${renderVariant({ ...args, variant: 'primary' }, 'Primary')}
    ${renderVariant({ ...args, variant: 'secondary' }, 'Secondary')}
    ${renderVariant({ ...args, variant: 'success' }, 'Success')}
    ${renderVariant({ ...args, variant: 'danger' }, 'Danger')}
    ${renderVariant({ ...args, variant: 'warning' }, 'Warning')} ${renderVariant({ ...args, variant: 'link' }, 'Link')}
  `,
};

export const SfondoScuro: Story = {
  args: { slot: '' },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    outline: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
<div class="success callout"><div class="callout-inner"><div class="callout-title"><span class="text">Trasmettere significato alle tecnologie assistive</span></div>
<p>
L’uso del colore per aggiungere un significato fornisce solo un’indicazione visiva, che non sarà trasmesso agli utenti di tecnologie assistive –
come gli screen reader.
Assicurati che le informazioni denotate dal colore siano rese disponibili anche dal contenuto stesso (es.: il testo
visibile), o siano incluse attraverso mezzi alternativi, come testo aggiuntivo nascosto con la classe <code>.visually-hidden</code>.</p></div></div>`,
      },
    },
  },
  render: (args) => html`
    <div class="bg-dark p-4">
      ${renderVariant({ ...args, variant: 'primary' }, 'Primary')}
      ${renderVariant({ ...args, variant: 'secondary' }, 'Secondary')}
      ${renderVariant({ ...args, variant: 'link' }, 'Link')}
    </div>
  `,
};

export const VariantiDiDimensione: Story = {
  args: { slot: '' },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    block: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
Per ottenere bottoni di dimensione più grande o più piccola, è sufficiente utilizzare l'attributo \`size\` con i valori \`"lg"\`, \`"sm"\`, \`"xs"\`.

Utilizzando invece l'attributo \`block\` si ottengono bottoni che prendono tutta l’ampiezza a loro disposizione, a seconda delle dimensioni del loro contenitore.
`,
      },
    },
  },
  render: (args) => html`
    ${renderSizeVariant({ ...args, size: 'lg' }, 'Large')} ${renderSizeVariant({ ...args, size: 'sm' }, 'Small')}
    ${renderSizeVariant({ ...args, size: 'xs' }, 'Extra Small')}
    <div class="flex">
      ${renderComponent(
        {
          ...args,
          block: true,
          variant: 'primary',
        },
        'Primary Block',
      )}
    </div>
    <div class="flex">
      ${renderComponent(
        {
          ...args,
          block: true,
          variant: 'secondary',
        },
        'Secondary Block',
      )}
    </div>
  `,
};

export const BottoniConIcona: Story = {
  ...meta,
  args: {},
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
  },
  render: (params) => {
    const slot = params.slot?.length > 0 ? params.slot : null;
    return html` <div class="flex">
      <it-button
        variant="success"
        size="lg"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?disabled="${params.disabled}"
        type="${params.type}"
      >
        <it-icon name="it-star-full" color="white"></it-icon> ${slot ?? 'Icon Button Large'}
      </it-button>

      <it-button
        variant="primary"
        size="sm"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?disabled="${params.disabled}"
        type="${params.type}"
      >
        <it-icon name="it-star-full" color="white"></it-icon> ${slot ?? 'Icon Button'}
      </it-button>

      <it-button
        variant="danger"
        size="xs"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?disabled="${params.disabled}"
        type="${params.type}"
      >
        <it-icon name="it-star-full" color="white"></it-icon> ${slot ?? 'Icon Button Small'}
      </it-button>

      <it-button
        variant="link"
        size="xs"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?disabled="${params.disabled}"
        type="${params.type}"
      >
        <it-icon name="it-star-full" color="primary"></it-icon> ${slot ?? 'Icon Button Extra Small'}
      </it-button>
    </div>`;
  },
};

export const BottoniConIconaCerchiata: Story = {
  ...meta,
  args: {},
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
  },
  render: (params) => {
    const slot = params.slot?.length > 0 ? params.slot : null;
    return html` <div class="flex">
      <it-button
        variant="success"
        size="lg"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?disabled="${params.disabled}"
        type="${params.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="success"></it-icon>
        </span>
        ${slot ?? 'Icon Button Large'}
      </it-button>

      <it-button
        variant="primary"
        size="sm"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?disabled="${params.disabled}"
        type="${params.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="primary"></it-icon>
        </span>
        ${slot ?? 'Icon Button'}
      </it-button>

      <it-button
        variant="danger"
        size="xs"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?disabled="${params.disabled}"
        type="${params.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="danger"></it-icon>
        </span>
        ${slot ?? 'Icon Button Small'}
      </it-button>

      <it-button
        variant="link"
        size="xs"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?disabled="${params.disabled}"
        type="${params.type}"
      >
        <span class="rounded-icon bg-primary">
          <it-icon name="it-user" color="white"></it-icon>
        </span>
        ${slot ?? 'Icon Button Small'}
      </it-button>
    </div>`;
  },
};
