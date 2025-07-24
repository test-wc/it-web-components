import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@italia/button';
import '@italia/dropdown';
import '@italia/icon';
import '@italia/popover';

type DropdownProps = {
  label: string;
  disabled?: boolean;
  split?: boolean;
  alignment?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end';
  variant?: string;
  size?: string;
  role?: string;
  dark?: boolean;
  fullWidth?: boolean;
};
type Story = StoryObj<DropdownProps>;

const containerStyle = 'height:200px;display:flex;align-items:flex-start;';

const meta = {
  title: 'Componenti/Dropdown',
  component: 'it-dropdown',
  tags: ['autodocs'],
  args: {
    label: 'Apri dropdown',
    disabled: false,
    split: false,
    alignment: 'bottom-start',
    variant: 'primary',
    size: undefined,
    role: 'menu',
    dark: false,
    fullWidth: false,
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    split: { control: 'boolean' },
    alignment: {
      control: 'select',
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'light'],
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    role: { control: 'text' },
    dark: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  decorators: [(Story) => html`<div style=${containerStyle}>${Story()}</div>`],
  parameters: {
    docs: {
      description: {
        component: `
<Description>Attiva o disattiva overlay contestuali per visualizzare liste di link ed altro ancora con questi menu a tendina.</Description>

Per la creazione di un dropdown è necessario utilizzare il componente \`<it-dropdown>\` che può contenere al suo interno uno o più \`<it-dropdown-item>\`.
È necessario specificare l'etichetta del menu tramite l'attributo \`label\`.
È possibile specificare una variante tramite l'attributo \`variant\`, questa verrà applicata al pulsante di attivazione del menu.

<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Accessibilità</span></div>
<p>Lo standard <a href="https://www.w3.org/TR/wai-aria/">WAI ARIA</a> definisce un widget con proprietà <a href="https://www.w3.org/TR/wai-aria/#menu">\`role="menu"\`</a>, specifica per i menu applicativi con link o azioni.
Questi menu possono contenere solo voci di menu, voci di menu di caselle di controllo, voci di menu dei pulsanti di opzione, gruppi di pulsanti di opzione e sottomenu.</p>
<p>Questo componente comprende di base il supporto per la maggior parte delle interazioni standard del menu della tastiera, come la possibilità di spostarsi tra i singoli elementi .list-item usando i tasti freccia, e chiude il menu con il tasto ESC.</p>
</div></div>
`,
      },
    },
  },
} satisfies Meta<DropdownProps>;

export default meta;

export const Base: Story = {
  render: (args) => html`
    <it-dropdown
      label=${args.label}
      ?disabled=${args.disabled}
      ?split=${args.split}
      alignment=${ifDefined(args.alignment)}
      size=${ifDefined(args.size)}
      variant=${args.variant}
      role=${args.role}
      ?dark=${args.dark}
      ?full-width=${args.fullWidth}
    >
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      canvas: { sourceState: 'shown' },
    },
  },
  tags: ['!autodocs', '!dev'],
};

export const Varianti: Story = {
  name: 'Dropdown button varianti',
  render: () => html`
    <it-dropdown label="Primario" variant="primary">
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>

    <it-dropdown label="Secondario" variant="secondary">
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>

    <it-dropdown label="Success" variant="success">
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>

    <it-dropdown label="Danger" variant="danger">
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>
  `,
  decorators: [(Story) => html`<div style="${containerStyle}gap:0.5rem;flex-wrap:wrap;display:flex">${Story()}</div>`],
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story:
          'Ovviamente sono disponibili tutte le varianti già disponibili per i pulsanti. Di seguito, un esempio di utilizzo con le varianti `primary`, `secondary`, `success` e `danger`.',
      },
    },
  },
};

export const Direzioni: Story = {
  render: () => html`
    <it-dropdown label="Giù" alignment="bottom-start">
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>

    <it-dropdown label="Su" alignment="top-start">
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>

    <it-dropdown label="Sinistra" alignment="left">
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>

    <it-dropdown label="Destra" alignment="right">
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>
  `,
  decorators: [
    (Story) =>
      html`<div
        style="${containerStyle}gap:2rem;flex-wrap:wrap;align-items:space-between;justify-content:center;flex-direction:column;"
      >
        ${Story()}
      </div>`,
  ],
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Per aprire le voci di menu in direzioni diverse,
è possibile utilizzare l'attributo \`alignment\` con i valori \`top\`, \`right\`,
\`bottom\`, \`left\`, \`top-start\`, \`top-end\`, \`right-start\`, \`right-end\`,
\`bottom-start\`, \`bottom-end\`, \`left-start\` e \`left-end\`.

I valori \`top\`, \`right\`, \`bottom\` e \`left\` aprono il menu in direzioni standard,
centrate rispetto al trigger,
mentre i valori \`top-start\`, \`top-end\`, \`right-start\`, \`right-end\`,
\`bottom-start\`, \`bottom-end\`, \`left-start\` e \`left-end\` permettono di specificare
la posizione esatta del menu rispetto al trigger.
`,
      },
    },
  },
};

export const MenuVociAttive: Story = {
  name: 'Menu con voci attive',
  render: (args) => html`
    <it-dropdown label=${args.label} variant=${args.variant}>
      <it-dropdown-item href="#" active>Attivo</it-dropdown-item>
      <it-dropdown-item href="#">Non attivo</it-dropdown-item>
      <it-dropdown-item href="#">Non attivo</it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Aggiungere l'attributo active agli elementi del dropdown che si vogliono mostrare come attivi.
Per questioni di accessibilità il componente aggiungerà automaticamente <span class="visually-hidden"> attivo</span> in coda al testo degli elementi attivi.`,
      },
    },
  },
};

export const MenuDisabilitato: Story = {
  name: 'Menu disabilitato',
  args: { disabled: true },
  render: (args) => html`
    <it-dropdown label=${args.label} ?disabled=${args.disabled} variant=${args.variant}>
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Aggiungere l'attributo \`disabled\` al dropdown per **disabilitarlo** completamente.`,
      },
    },
  },
};

export const MenuVociDisabilitate: Story = {
  name: 'Menu con voci disabilitate',
  render: (args) => html`
    <it-dropdown label=${args.label} variant=${args.variant}>
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#" disabled>Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Aggiungere l'attributo \`disabled\` agli elementi del dropdown che si vogliono mostrare come **disabilitati**.`,
      },
    },
  },
};

export const MenuIntestazioniSeparatori: Story = {
  name: 'Menu con intestazioni e separatori',
  render: (args) => html`
    <it-dropdown label="Item con separatore e header" variant=${args.variant}>
      <h4 slot="header" class="link-list-heading dropdown-header">Intestazione</h4>
      <it-dropdown-item href="#">Prima voce</it-dropdown-item>
      <it-dropdown-item separator></it-dropdown-item>
      <it-dropdown-item href="#">Dopo separatore</it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `All'interno del menu dropdown possono essere inseriti header e separatori.`,
      },
    },
  },
};

export const MenuVociGrandi: Story = {
  name: 'Menu con voci grandi',
  render: (args) => html`
    <it-dropdown label=${args.label} variant=${args.variant}>
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#" large>Grande</it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Per aumentare la dimensione degli elementi contenuti nel dropdown
è sufficiente aggiungere agli stessi l'attributo \`large\`.`,
      },
    },
  },
};

export const MenuATuttaLarghezza: Story = {
  name: 'Menu a tutta larghezza',
  args: { fullWidth: true },
  render: (args) => html`
    <it-dropdown
      label=${args.label}
      ?disabled=${args.disabled}
      ?split=${args.split}
      alignment=${ifDefined(args.alignment)}
      size=${ifDefined(args.size)}
      variant=${ifDefined(args.variant)}
      role=${ifDefined(args.role)}
      ?dark=${args.dark}
      ?full-width=${args.fullWidth}
      style="width: 100%;"
    >
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Per ottenere un dropdown menu largo quanto l’elemento che contiene il dropdown button
è sufficiente aggiungere l'attributo \`full-width\`.
I link e testi contenuti al suo interno saranno disposti in orizzontale.`,
      },
    },
  },
};

export const MenuIconaDestra: Story = {
  name: 'Menu con icona a destra',
  render: (args) => html`
    <it-dropdown label=${args.label} variant=${args.variant}>
      <it-dropdown-item href="#">
        Azione 1
        <it-icon slot="suffix" name="it-star-outline" size="sm" color="primary"></it-icon>
      </it-dropdown-item>
      <it-dropdown-item href="#">
        Azione 2
        <it-icon slot="suffix" name="it-star-outline" size="sm" color="primary"></it-icon>
      </it-dropdown-item>
      <it-dropdown-item href="#">
        Azione 3
        <it-icon slot="suffix" name="it-star-outline" size="sm" color="primary"></it-icon>
      </it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Agli elementi contenuti nel menu può essere aggiunta un’icona illustrativa
allineata a destra utilizzando lo slot \`suffix\``,
      },
    },
  },
};

export const MenuIconaSinistra: Story = {
  name: 'Menu con icona a sinistra',
  render: (args) => html`
    <it-dropdown label=${args.label} variant=${args.variant}>
      <it-dropdown-item href="#">
        <it-icon slot="prefix" name="it-star-outline" size="sm" color="primary"></it-icon>
        Azione 1
      </it-dropdown-item>
      <it-dropdown-item href="#">
        <it-icon slot="prefix" name="it-star-outline" size="sm" color="primary"></it-icon>
        Azione 2
      </it-dropdown-item>
      <it-dropdown-item href="#">
        <it-icon slot="prefix" name="it-star-outline" size="sm" color="primary"></it-icon>
        Azione 3
      </it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Agli elementi contenuti nel menu può essere aggiunta un’icona illustrativa
allineata a sinistra utilizzando lo slot \`prefix\``,
      },
    },
  },
};

export const MenuScuro: Story = {
  name: 'Menu scuro',
  args: { dark: true },
  render: (args) => html`
    <it-dropdown label=${args.label} variant=${args.variant} dark>
      <h4 slot="header" class="link-list-heading dropdown-header">Intestazione</h4>
      <it-dropdown-item href="#">Azione 1</it-dropdown-item>
      <it-dropdown-item href="#">Azione 2</it-dropdown-item>
      <it-dropdown-item separator></it-dropdown-item>
      <it-dropdown-item href="#">Azione 3</it-dropdown-item>
    </it-dropdown>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      source: { excludeDecorators: true },
      description: {
        story: `Aggiungendo l'attributo \`dark\` al dropdown si ottiene una versione con un colore primario scuro.
Link ed elementi interni vengono declinati di conseguenza.`,
      },
    },
  },
};
