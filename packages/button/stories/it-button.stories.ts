import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { type Sizes, type Variants, BUTTON_SIZES, BUTTON_VARIANTS } from '../src/types.ts';
import '@italia/button';
import '@italia/icon';

interface ButtonProps {
  variant: Variants;
  outline: boolean;
  ariaDisabled: boolean;
  slot: string;
  size: Sizes;
  type: string;
  block: boolean;
  icon?: boolean;
  value: string;
  'aria-label': string;
}

// Renderizza il wc it-button di default
const renderComponent = (params: any, defaultSlot = '') => {
  const slot = params.slot?.length > 0 ? params.slot : defaultSlot;
  return html`
    <it-button
      variant="${params.variant}"
      ?outline="${params.outline}"
      size="${params.size}"
      ?block="${params.block}"
      ?aria-disabled="${params.ariaDisabled}"
      ?icon="${params.icon}"
      type="${params.type}"
      aria-label="${params['aria-label']}"
      >${slot}</it-button
    >
  `;
};

const renderDefault = (params: any) => html`
  <div class="flex">
    ${renderComponent(params)}
    ${renderComponent({
      ...params,
      ariaDisabled: true,
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
    ${args.variant !== 'link'
      ? renderDefault({
          ...args,
          slot: slot ?? `${defaultText} outline`,
          outline: true,
        })
      : ''}
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
  args: {
    slot: 'Testo del pulsante',
    variant: 'primary',
    size: 'sm',
    block: false,
    outline: false,
    ariaDisabled: false,
    icon: false,
    type: 'button',
    value: '',
    'aria-label': 'Aria label',
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Varianti di colore',
      options: BUTTON_VARIANTS,
    },
    size: {
      control: 'select',
      description: 'Dimensione del pulsante',
      options: BUTTON_SIZES,
      table: { defaultValue: { summary: 'sm' } },
    },
    block: {
      control: 'boolean',
      type: 'boolean',
      description: 'Quando abilitato, estende il componente Button fino a prendere tutta la larghezza disponibile',
      table: { defaultValue: { summary: 'false' } },
    },
    ariaDisabled: {
      control: 'boolean',
      type: 'boolean',
      name: 'aria-disabled',
      table: { defaultValue: { summary: 'false' } },
    },
    outline: {
      control: 'boolean',
      type: 'boolean',
      description: 'Applica il colore solamente al bordo, usando il colore di sfondo come colore interno del pulsante.',
      table: { defaultValue: { summary: 'false' } },
    },
    icon: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    slot: {
      control: 'text',
      description: 'Testo del pulsante',
    },
    'aria-label': {
      control: 'text',
      description: 'Testo aria-label del pulsante',
    },
    type: {
      control: 'select',
      description: 'Tipologia di pulsante',
      options: ['button', 'submit', 'reset'],
      table: { defaultValue: { summary: 'button' } },
    },
    value: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<Description>Pulsante con etichetta di testo o icona che al click inizia un'azione o un evento.</Description>

Per indicazioni su "Come e Quando usarlo" si fa riferimento alla [guida del design-system](https://designers.italia.it/design-system/componenti/buttons/).
`,
      },
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

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
  render: (params) =>
    html` ${renderComponent({
      ...params,
    })}`,
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
Per la personalizzazione degli stili si può usare il selettore \`::part\` passando il valore \`button\`. [Vedi qui la guida dettagliata](/docs/personalizzazione-degli-stili--documentazione#selettore-part).
`,
      },
    },
  },
  render: () => html`<div class="hide-preview"></div>`,
};

export const VariantiColore: Story = {
  name: 'Varianti di colore',
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
    ariaDisabled: {
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
- I pulsanti disabilitati dovranno avere l'attributo \`aria-disabled="true"\` per indicare lo stato dell’elemento alle tecnologie assistive. Quando si utilizza l'attributo \`aria-disabled\` è consigliato usare anche l'attributo \`aria-describedby\` (o un elemento all'interno del bottone con classe \`.sr-only\`) per informare tramite gli screen-reader il motivo per il quale il pulsante è disabilitato.
<br/> E' sconsigliato l'uso dell'attributo \`disabled\`.
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

export const VariantiDimensione: Story = {
  name: 'Varianti di dimensione',
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
Per ottenere pulsanti di dimensione più grande o più piccola, è sufficiente utilizzare l'attributo \`size\` con i valori \`"lg"\`, \`"sm"\`, \`"xs"\`.

Utilizzando invece l'attributo \`block\` si ottengono pulsanti che prendono tutta l’ampiezza a loro disposizione, a seconda delle dimensioni del loro contenitore.
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

export const Tipologie: Story = {
  ...meta,
  // name: 'Tipologie',
  args: {
    variant: 'primary',
  },
  render: (params) => html`
    <div class="flex">
      ${renderComponent({
        ...params,
        slot: `Button - ${params.slot}`,
        type: 'button',
      })}
      ${renderComponent({
        ...params,
        slot: `Submit - ${params.slot}`,
        type: 'submit',
      })}
      ${renderComponent({
        ...params,
        slot: `Reset - ${params.slot}`,
        type: 'reset',
      })}
    </div>
  `,
};

export const SfondoScuro: Story = {
  name: 'Sfondo scuro',
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
    ariaDisabled: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Trasmettere significato alle tecnologie assistive</span></div>
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

export const ConIcona: Story = {
  ...meta,
  name: 'Con icona',
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
  parameters: {
    docs: {
      description: {
        story: `
L’icona può essere posizionata a sinistra o a destra del testo, a seconda della posizione in cui viene inserita all’interno del pulsante.
<br/><br/>
#### Dimensione dell'icona
- Nei pulsanti di dimensione \`lg\` e \`sm\` è necessario passare l'attributo \`size="sm"\` all'icona.
- Nei pulsaanti di dimensione \`xs\`, è necessario passare l'attributo \`size="xs"\` all'icona .
`,
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
        ?aria-disabled="${params.ariaDisabled}"
        type="${params.type}"
      >
        <it-icon name="it-star-full" color="white" size="sm"></it-icon>
        <span>${slot ?? 'Pulsante Large con icona'}</span>
      </it-button>

      <it-button
        variant="primary"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?aria-disabled="${params.ariaDisabled}"
        type="${params.type}"
      >
        <it-icon name="it-star-full" color="white" size="sm"></it-icon> <span>${slot ?? 'Pulsante con icona'}</span>
      </it-button>

      <it-button
        variant="danger"
        size="xs"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?aria-disabled="${params.ariaDisabled}"
        type="${params.type}"
      >
        <it-icon name="it-star-full" color="white" size="xs"></it-icon>
        <span>${slot ?? 'Pulsante Smal con icona'}</span>
      </it-button>

      <it-button
        variant="link"
        size="xs"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?aria-disabled="${params.ariaDisabled}"
        type="${params.type}"
      >
        <it-icon name="it-star-full" color="primary" size="xs"></it-icon>
        <span>${slot ?? 'Pulsante Extra Small con icona'}</span>
      </it-button>
    </div>`;
  },
};

/*
https://github.com/italia/bootstrap-italia/pull/1475/files
questa per per bootstrap-italia#feat/design-tokens, sistema la dimensione di .roundedicon nei pulsanti di dimensione xs
*/
export const ConIconaCerchiata: Story = {
  ...meta,
  name: 'Con icona cerchiata',
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
  parameters: {
    docs: {
      description: {
        story: `
L’icona può essere posizionata a sinistra o a destra del testo, a seconda della posizione in cui viene inserita all’interno del pulsante.
Deve essere contenuta all'interno di uno elemento con classe\`.rounded-icon\` per poter avere il contorno circolare.
<br/><br/>
#### Dimensione dell'icona
- Nei pulsanti di dimensione \`lg\` e \`sm\` è necessario passare l'attributo \`size="sm"\` all'icona.
- Nei pulsaanti di dimensione \`xs\`, è necessario passare l'attributo \`size="xs"\` all'icona .
`,
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
        ?aria-disabled="${params.ariaDisabled}"
        type="${params.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="success" size="sm"></it-icon>
        </span>
        <span>${slot ?? 'Pulsante Large con icona'}</span>
      </it-button>

      <it-button
        variant="primary"
        size="sm"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?aria-disabled="${params.ariaDisabled}"
        type="${params.type}"
      >
        <span class="rounded-icon" size="sm">
          <it-icon name="it-user" color="primary" size="sm"></it-icon>
        </span>
        <span>${slot ?? 'Pulsante con icona'}</span>
      </it-button>

      <it-button
        variant="danger"
        size="xs"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?aria-disabled="${params.ariaDisabled}"
        type="${params.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="danger" size="xs"></it-icon>
        </span>
        <span>${slot ?? 'Pulsante Small con icona'}</span>
      </it-button>

      <it-button
        variant="link"
        size="xs"
        icon
        ?outline="${params.outline}"
        ?block="${params.block}"
        ?aria-disabled="${params.ariaDisabled}"
        type="${params.type}"
      >
        <span class="rounded-icon bg-primary">
          <it-icon name="it-user" color="white" size="xs"></it-icon>
        </span>
        <span>${slot ?? 'Pulsante Extra Small con icona'}</span>
      </it-button>
    </div>`;
  },
};
