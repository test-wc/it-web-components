import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@italia/button';
import '@italia/dropdown';
import '@italia/icon';
import '@italia/popover';

type DropdownProps = {
  label?: string;
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

const containerStyle = 'width:500px;height:500px;margin:auto;display:flex;align-items:center;justify-content:center;';

const meta: Meta<DropdownProps> = {
  title: 'Componenti/Dropdown',
  component: 'it-dropdown',
  tags: ['autodocs'],
  args: {
    label: 'Apri menu',
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
  parameters: {
    docs: {
      description: {
        component: `
Il componente \`<it-dropdown>\` .


`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DropdownProps>;
export const Base: Story = {
  render: (args) => html`
    <div style=${containerStyle}>
      <it-dropdown
        label=${args.label}
        ?disabled=${args.disabled}
        ?split=${args.split}
        alignment=${args.alignment}
        size=${args.size}
        variant=${args.variant}
        role=${args.role}
        ?dark=${args.dark}
      >
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>
    </div>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      description: {
        story: 'Dropdown con lista generata tramite item slottati (`<it-dropdown-item>`).',
      },
    },
  },
};

export const Varianti: Story = {
  render: () => html`
    <div style="${containerStyle} gap: 2rem; flex-wrap: wrap; display: flex;">
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
    </div>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      description: {
        story: 'Varianti visive del bottone (`variant`).',
      },
    },
  },
};

export const Disabilitato: Story = {
  args: { disabled: true },
  render: (args) => html`
    <div style=${containerStyle}>
      <it-dropdown label=${args.label} ?disabled=${args.disabled} variant="secondary">
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>
    </div>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      description: {
        story: 'Dropdown con trigger disabilitato (`disabled=true`).',
      },
    },
  },
};

export const Direzioni: Story = {
  render: () => html`
    <div style="${containerStyle} gap: 2rem; flex-wrap: wrap; flex-direction: column; display: flex;">
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
      <it-dropdown label="Sinistra" alignment="left-start">
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>
      <it-dropdown label="Destra" alignment="right-start">
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>
    </div>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      description: {
        story: 'Esempi di apertura del menu in 4 direzioni (`alignment`).',
      },
    },
  },
};

export const ItemVarianti: Story = {
  render: () => html`
    <div style="${containerStyle} flex-direction: column; gap: 2rem; flex-wrap: wrap; display: flex;">
      <it-dropdown label="Item attivo + disabilitato + large" variant="primary">
        <it-dropdown-item href="#" active>Attivo</it-dropdown-item>
        <it-dropdown-item href="#" disabled>Attivo</it-dropdown-item>
        <it-dropdown-item href="#" large>Grande</it-dropdown-item>
      </it-dropdown>

      <it-dropdown label="Item con separatore e header" variant="secondary">
        <it-dropdown-item href="#">Prima voce</it-dropdown-item>
        <it-dropdown-item separator></it-dropdown-item>
        <it-dropdown-item href="#">Dopo separatore</it-dropdown-item>
      </it-dropdown>

      <it-dropdown label="Menu con intestazione" variant="primary">
        <h4 slot="header" class="link-list-heading dropdown-header">Intestazione</h4>
        <it-dropdown-item href="#">Voce 1</it-dropdown-item>
        <it-dropdown-item href="#">Voce 2</it-dropdown-item>
        <it-dropdown-item href="#">Voce 3</it-dropdown-item>
      </it-dropdown>
    </div>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      description: {
        story: `Esempi delle varianti di \`<it-dropdown-item>\`:
- \`active\` per item attivo
- \`large\` per item grande
- \`full-width\` per item su tutta la larghezza
- \`separator\` per divider`,
      },
    },
  },
};

export const MenuATuttaLarghezza: Story = {
  args: { fullWidth: true },
  render: (args) => html`
    <div style=${containerStyle}>
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
    </div>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      description: {
        story: 'Dropdown con lista generata tramite item slottati (`<it-dropdown-item>`).',
      },
    },
  },
};

export const MenuScuro: Story = {
  args: { dark: true },
  render: (args) => html`
    <div style=${containerStyle}>
      <it-dropdown
        label=${args.label}
        ?disabled=${args.disabled}
        ?split=${args.split}
        alignment=${args.alignment}
        size=${args.size}
        variant=${args.variant}
        role=${args.role}
        ?dark=${args.dark}
      >
        <h4 slot="header" class="link-list-heading dropdown-header">Intestazione</h4>
        <it-dropdown-item href="#">Azione 1</it-dropdown-item>
        <it-dropdown-item href="#">Azione 2</it-dropdown-item>
        <it-dropdown-item separator></it-dropdown-item>
        <it-dropdown-item href="#">Azione 3</it-dropdown-item>
      </it-dropdown>
    </div>
  `,
  parameters: {
    ...meta.parameters,
    docs: {
      description: {
        story: 'Dropdown con lista generata tramite item slottati (`<it-dropdown-item>`).',
      },
    },
  },
};
