import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { inputTypes } from '../src/types.js';
import '@italia/input';

interface InputProps {
  invalid: boolean;
  required: boolean;
  requiredValidityMessage: string;
  validityMessage: string;
  label: string;
  type: string;
  name: string;
  disabled?: boolean;
  value: string;
  placeholder: string;
}

// Renderizza il wc it-input di default
const renderComponent = (params: any) =>
  html`<it-input
    id="${ifDefined(params.id)}"
    label="${ifDefined(params.label || undefined)}"
    type="${ifDefined(params.type || undefined)}"
    name="${ifDefined(params.name || undefined)}"
    ?disabled="${params.disabled}"
    ?required="${params.required}"
    ?invalid="${params.invalid}"
    required-validity-message="${ifDefined(params.requiredValidityMessage || undefined)}"
    validity-message="${ifDefined(params.validityMessage || undefined)}"
    value="${ifDefined(params.value || undefined)}"
    placeholder="${ifDefined(params.placeholder || undefined)}"
  ></it-input>`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Componenti/Form/Input',
  tags: ['autodocs'],
  component: 'it-input',
  args: {
    label: 'Nome',
    placeholder: '',
    value: '',
    type: 'text',
    name: 'nome',
    disabled: false,
    invalid: false,
    required: false,
    requiredValidityMessage: 'Campo obbligatorio',
    validityMessage: '',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Etichetta del campo',
    },
    value: {
      control: 'text',
      description: 'Valore del campo',
    },
    type: {
      control: 'select',
      options: inputTypes,
      table: { defaultValue: { summary: 'text' } },
    },
    name: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    requiredValidityMessage: {
      control: 'text',
    },
    validityMessage: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<Description>Input accessibile e responsivo.</Description>

Per il corretto funzionamento degli elementi di tipo \`<it-input>\` è di fondamentale importanza l’utilizzo uno degli appositi attributi \`type\` (ad esempio, "email" per l’inserimento di indirizzi email o "number" per informazioni numeriche), in modo da sfruttare i controlli nativi dei browser più recenti come la verifica dell’email, l’utilizzo di metodo di input numerico ed altro.
`,
      },
    },
  },
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<InputProps>;

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
  render: (params) =>
    html`${renderComponent({
      ...params,
      type: 'text',
      label: 'Campo di testo',
      name: 'testo',
    })}
    ${renderComponent({
      ...params,
      type: 'email',
      label: 'Campo email',
      name: 'email',
    })}
    ${renderComponent({
      ...params,
      type: 'number',
      label: 'Campo numerico',
      name: 'number',
    })}
    ${renderComponent({
      ...params,
      type: 'tel',
      label: 'Campo telefonico',
      name: 'telefono',
    })}
    ${renderComponent({
      ...params,
      type: 'time',
      label: 'Campo orario',
      name: 'orario',
    })}`,
};

export const Placeholder: Story = {
  ...meta,
  name: 'Testo segnaposto',
  args: { placeholder: 'Testo segnaposto' },

  parameters: {
    docs: {
      description: {
        story: `
È possibile abbinare al componente \`<it-input>\` un testo segnaposto (placeholder) per fornire indicazioni sul tipo di contenuto atteso. Questo testo non sostituisce l’etichetta, ma fornisce informazioni aggiuntive.
`,
      },
    },
  },
  render: (params) => html`
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Etichetta',
      placeholder: 'Testo segnaposto',
      name: 'placeholder-example',
    })}
  `,
};
