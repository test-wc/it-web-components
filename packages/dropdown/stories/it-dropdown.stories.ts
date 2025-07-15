import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@italia/dropdown';

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
