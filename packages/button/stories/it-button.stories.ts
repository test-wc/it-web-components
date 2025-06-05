import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/it-button.ts';
import './it-button-stories.scss';

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

const colors = [
  'primary',
  'secondary',
  'success',
  'info',
  'danger',
  'warning',
  'link',
];
const sizes = ['lg', 'sm', 'xs'];

const renderComponent = (params: any) => html`
  <it-button
    variant="${params.variant}"
    ?outline="${params.outline}"
    size="${params.size}"
    ?disabled="${params.disabled}"
    type="${params.type}"
    >${params.slot}</it-button
  >
`;

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
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Componenti/Button',
  tags: ['autodocs'],
  component: 'it-button',
  render: args => renderDefault(args),
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
      description:
        'Quando abilitato, estende il componente Button fino a prendere tutta la larghezza disponibile',
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
    },
    outline: {
      control: 'boolean',
      type: 'boolean',
      description:
        'Applica il colore solamente al bordo, usando il colore di sfondo come colore interno del bottone.',
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
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    variant: 'primary',
  },
};

export const Tipologie: Story = {
  ...meta,
  render: params => html`
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
  `,
  args: {
    variant: 'primary',
  },
};

export const VariantiColore: Story = {
  args: { slot: '' },
  render: args => html`
    <div class="flex">
      ${renderDefault({
        ...args,
        slot: `Primary ${args.slot}`,
        variant: 'primary',
      })}
      ${renderDefault({
        ...args,
        slot: `Primary outline ${args.slot}`,
        variant: 'primary',
        outline: true,
      })}
    </div>
    <div class="flex">
      ${renderDefault({
        ...args,
        slot: `Secondary ${args.slot}`,
        variant: 'secondary',
      })}
      ${renderDefault({
        ...args,
        slot: `Secondary outline ${args.slot}`,
        variant: 'secondary',
        outline: true,
      })}
    </div>
    <div class="flex">
      ${renderDefault({
        ...args,
        slot: `Success ${args.slot}`,
        variant: 'success',
      })}
      ${renderDefault({
        ...args,
        slot: `Success outline ${args.slot}`,
        variant: 'success',
        outline: true,
      })}
    </div>
    <div class="flex">
      ${renderDefault({
        ...args,
        slot: `Danger ${args.slot}`,
        variant: 'danger',
      })}
      ${renderDefault({
        ...args,
        slot: `Danger outline ${args.slot}`,
        variant: 'danger',
        outline: true,
      })}
    </div>
    <div class="flex">
      ${renderDefault({
        ...args,
        slot: `Warning ${args.slot}`,
        variant: 'warning',
      })}
      ${renderDefault({
        ...args,
        slot: `warning outline ${args.slot}`,
        variant: 'warning',
        outline: true,
      })}
    </div>
    <div class="flex">
      ${renderDefault({
        ...args,
        slot: `Info ${args.slot}`,
        variant: 'info',
      })}
      ${renderDefault({
        ...args,
        slot: `Info outline ${args.slot}`,
        variant: 'info',
        outline: true,
      })}
    </div>
    <div class="flex">
      ${renderDefault({
        ...args,
        slot: `Link ${args.slot}`,
        variant: 'link',
      })}
      ${renderDefault({
        ...args,
        slot: `Link outline ${args.slot}`,
        variant: 'link',
        outline: true,
      })}
    </div>
  `,
};

// TODO: capire come gestire lo sfondo scuro con i wc
export const SfondoScuro: Story = {
  args: { slot: '' },
  render: args => html`
    <div class="bg-dark">
      <div class="flex">
        ${renderDefault({
          ...args,
          slot: `Primary ${args.slot}`,
          variant: 'primary',
        })}
        ${renderDefault({
          ...args,
          slot: `Primary outline ${args.slot}`,
          variant: 'primary',
          outline: true,
        })}
      </div>
      <div class="flex">
        ${renderDefault({
          ...args,
          slot: `Secondary ${args.slot}`,
          variant: 'secondary',
        })}
        ${renderDefault({
          ...args,
          slot: `Secondary outline ${args.slot}`,
          variant: 'secondary',
          outline: true,
        })}
      </div>
    </div>
  `,
};

// TODO: negli stili, non c'è d-block come classe. Importarla da bootsrap-italia.
export const VariantiDiDimensione: Story = {
  args: { slot: '' },
  render: args => html`
    <div class="flex">
      ${renderComponent({
        ...args,
        slot: `Primary large ${args.slot}`,
        variant: 'primary',
        size: 'lg',
      })}
      ${renderComponent({
        ...args,
        slot: `Secondary large ${args.slot}`,
        variant: 'secondary',
        size: 'lg',
      })}
    </div>
    <div class="flex">
      ${renderComponent({
        ...args,
        slot: `Primary small ${args.slot}`,
        variant: 'primary',
        size: 'sm',
      })}
      ${renderComponent({
        ...args,
        slot: `Secondary small ${args.slot}`,
        variant: 'secondary',
        size: 'sm',
      })}
    </div>
    <div class="flex">
      ${renderComponent({
        ...args,
        slot: `Primary mini ${args.slot}`,
        variant: 'primary',
        size: 'xs',
      })}
      ${renderComponent({
        ...args,
        slot: `Secondary mini ${args.slot}`,
        variant: 'secondary',
        size: 'xs',
      })}
    </div>
    <div class="flex">
      ${renderComponent({
        ...args,
        slot: `Primary block ${args.slot}`,
        variant: 'primary',
        block: true,
      })}
      ${renderComponent({
        ...args,
        slot: `Secondary block ${args.slot}`,
        variant: 'secondary',
        block: true,
      })}
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
