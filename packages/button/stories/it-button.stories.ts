import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/it-button.ts';

interface ButtonProps {
  variant: string;
  outline: boolean;
  disabled: boolean;
  slot: string;
}

const colors = [
  'primary',
  'secondary',
  'success',
  'info',
  'danger',
  'warning',
  'link',
];

const renderComponent = (params: any) => html`
  <it-button
    variant="${params.variant}"
    ?disabled="${params.disabled}"
    ?outline="${params.outline}"
    >${params.slot}</it-button
  >
`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Componenti/Button',
  tags: ['autodocs'],
  component: 'it-button',
  render: args => renderComponent(args),
  args: {
    slot: 'Testo bottone',
    variant: 'primary',
    outline: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Varianti di colore',
      options: colors,
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
    },
    outline: {
      control: 'boolean',
      type: 'boolean',
    },
    slot: {
      control: 'text',
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
  },
};

export const Tipologie: Story = {
  render: () =>
    html`<div class="flex">
      <it-button type="submit">Submit button</it-button>
      <it-button type="button">Button</it-button>
      <it-button type="reset">Reset button</it-button>
    </div>`,
};

export const VariantiColore: Story = {
  render: () => html`
    <div class="flex">
      <it-button variant="primary">Primary</it-button>
      <it-button variant="primary" outline>Primary Outline</it-button>
      <it-button variant="primary" disabled>Primary disabled</it-button>
      <it-button variant="primary" outline disabled
        >Primary Outline disabled</it-button
      >
    </div>
    <div class="flex">
      <it-button variant="secondary">Secondary</it-button>
      <it-button variant="secondary" outline>Secondary Outline</it-button>
      <it-button variant="secondary" disabled>Secondary disabled</it-button>
      <it-button variant="secondary" outline disabled
        >Secondary Outline disabled</it-button
      >
    </div>
    <div class="flex">
      <it-button variant="success">Success</it-button>
      <it-button variant="success" outline>Success Outline</it-button>
      <it-button variant="success" disabled>Success disabled</it-button>
      <it-button variant="success" outline disabled
        >Success Outline disabled</it-button
      >
    </div>
    <div class="flex">
      <it-button variant="danger">Danger</it-button>
      <it-button variant="danger" outline>Danger Outline</it-button>
      <it-button variant="danger" disabled>Danger disabled</it-button>
      <it-button variant="danger" outline disabled
        >Danger Outline disabled</it-button
      >
    </div>
    <div class="flex">
      <it-button variant="warning">Warning</it-button>
      <it-button variant="warning" outline>Warning Outline</it-button>
      <it-button variant="warning" disabled>Warning disabled</it-button>
      <it-button variant="warning" outline disabled
        >Warning Outline disabled</it-button
      >
    </div>
    <div class="flex">
      <it-button variant="info">Info</it-button>
      <it-button variant="info" outline>Info Outline</it-button>
      <it-button variant="info" disabled>Info disabled</it-button>
      <it-button variant="info" outline disabled
        >Info Outline disabled</it-button
      >
    </div>
    <div class="flex">
      <it-button variant="link">Link</it-button>
      <it-button variant="link" outline>Link Outline</it-button>
      <it-button variant="link" disabled>Link disabled</it-button>
      <it-button variant="link" outline disabled
        >Link Outline disabled</it-button
      >
    </div>
  `,
};

// TODO: capire come gestire lo sfondo scuro con i wc
export const SfondoScuro: Story = {
  render: () =>
    html`<div class="bg-dark">
      <div class="flex">
        <it-button variant="primary">Primary</it-button>
        <it-button variant="primary" outline>Primary Outline</it-button>
        <it-button variant="primary" disabled>Primary disabled</it-button>
        <it-button variant="primary" outline disabled
          >Primary Outline disabled</it-button
        >
      </div>
      <div class="flex">
        <it-button variant="secondary">Secondary</it-button>
        <it-button variant="secondary" outline>Secondary Outline</it-button>
        <it-button variant="secondary" disabled>Secondary disabled</it-button>
        <it-button variant="secondary" outline disabled
          >Secondary Outline disabled</it-button
        >
      </div>
    </div>`,
};

// TODO: negli stili, non c'è d-block come classe. Importarla da bootsrap-italia.
export const VariantiDiDimensione: Story = {
  render: () => html`
    <div class="flex">
      <it-button variant="primary" size="lg">Primary Large</it-button>
      <it-button variant="secondary" size="lg">Secondary Large</it-button>
    </div>
    <div class="flex">
      <it-button variant="primary" size="sm">Primary Small</it-button>
      <it-button variant="secondary" size="sm">Secondary Small</it-button>
    </div>
    <div class="flex">
      <it-button variant="primary" size="xs">Primary Mini</it-button>
      <it-button variant="secondary" size="xs">Secondary Mini</it-button>
    </div>
    <div class="flex">
      <it-button variant="primary" block>Primary block</it-button>
      <it-button variant="secondary" block>Secondary block</it-button>
    </div>
  `,
};

// Todo: fare le prove con l'icona
// export const BottoniConIcona: Story = {
//     render: () => (
//         <div>
//             <Button className="me-2" color="success" size="lg" icon>
//                 <Icon color="white" icon="it-star-full" /> Icon Button Large
//             </Button>
//             <Button className="me-2" color="primary" icon>
//                 <Icon color="white" icon="it-star-full" /> Icon Button
//             </Button>
//             <Button className="me-2" color="danger" size="sm" icon>
//                 <Icon color="white" icon="it-star-full" /> Icon Button Small
//             </Button>
//             <Button color="info" size="xs" icon>
//                 <Icon color="white" icon="it-star-full" /> Icon Button Extra Small
//             </Button>
//         </div>
//     ),
// };

// export const BottoniConIconaCerchiata: Story = {
//     render: () => (
//         <div>
//             <Button className="me-2" color="success" size="lg" icon>
//                 <span className="rounded-icon">
//                     <Icon color="success" icon="it-user" />
//                 </span>
//                 <span>Round Icon Large</span>
//             </Button>
//             <Button className="me-2" color="primary" icon>
//                 <span className="rounded-icon">
//                     <Icon color="primary" icon="it-user" />
//                 </span>
//                 <span>Round Icon</span>
//             </Button>
//             <Button className="me-2" color="danger" size="sm" icon>
//                 <span className="rounded-icon">
//                     <Icon color="danger" icon="it-user" />
//                 </span>
//                 <span>Round Icon Small</span>
//             </Button>
//             <Button color="info" size="xs" icon>
//                 <span className="rounded-icon">
//                     <Icon color="secondary" icon="it-user" />
//                 </span>
//                 <span>Round Icon Extra Small</span>
//             </Button>
//         </div>
//     ),
// };
