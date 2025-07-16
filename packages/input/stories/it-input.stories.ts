import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { inputTypes } from '../src/types.js';

import '@italia/icon';
import '@italia/button';
import '@italia/input';

interface InputProps {
  id: string;
  label: string;
  type: string;
  name: string;
  disabled?: boolean;
  invalid: boolean;
  required: boolean;
  requiredValidityMessage: string;
  validityMessage: string;
  placeholder: string;
  supportText: string;
  value: string;
  slotted: boolean;
}

// Renderizza il wc it-input di default
const renderComponent = (params: any) =>
  html`<it-input
    id="${ifDefined(params.id || undefined)}"
    label="${ifDefined(params.label || undefined)}"
    type="${ifDefined(params.type || undefined)}"
    name="${ifDefined(params.name || undefined)}"
    ?disabled="${params.disabled}"
    ?invalid="${params.invalid}"
    ?required="${params.required}"
    required-validity-message="${ifDefined(params.requiredValidityMessage || undefined)}"
    validity-message="${ifDefined(params.validityMessage || undefined)}"
    placeholder="${ifDefined(params.placeholder || undefined)}"
    support-text="${ifDefined(params.supportText || undefined)}"
    value="${ifDefined(params.value || undefined)}"
    ?slotted="${params.slotted}"
    >${ifDefined(params.children || undefined)}</it-input
  >`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Componenti/Form/Input',
  tags: ['autodocs'],
  component: 'it-input',
  args: {
    id: '',
    label: 'Nome',
    type: 'text',
    name: 'nome',
    disabled: false,
    invalid: false,
    required: false,
    requiredValidityMessage: 'Campo obbligatorio',
    validityMessage: '',
    placeholder: '',
    supportText: '',
    value: '',
    slotted: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Etichetta del campo',
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
      name: 'required-validity-message',
      control: 'text',
      description: 'Messaggio che viene mostrato quando il campo è obbligatorio e non viene compilato',
    },
    validityMessage: {
      name: 'validity-message',
      control: 'text',
      description: 'Messaggio che viene mostrato quando il campo è invalido',
    },
    placeholder: {
      control: 'text',
      description: 'Testo segnaposto',
    },
    supportText: {
      name: 'support-text',
      control: 'text',
      description: 'Testo di supporto',
    },
    value: {
      control: 'text',
      description: 'Valore del campo',
    },
    slotted: {
      control: 'boolean',
      type: 'boolean',
      description:
        "Se vengono usati gli slot per mostrare l'icona o il bottone, questo attributo deve avere valore 'true'",
      table: { defaultValue: { summary: 'false' } },
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
      id: 'exampleInputText',
    })}
    ${renderComponent({
      ...params,
      type: 'email',
      label: 'Campo email',
      name: 'email',
      id: 'exampleInputEmail',
    })}
    ${renderComponent({
      ...params,
      type: 'number',
      label: 'Campo numerico',
      name: 'number',
      id: 'exampleInputNumber',
    })}
    ${renderComponent({
      ...params,
      type: 'tel',
      label: 'Campo telefonico',
      name: 'telefono',
      id: 'exampleInputTel',
    })}
    ${renderComponent({
      ...params,
      type: 'time',
      label: 'Campo orario',
      name: 'orario',
      id: 'exampleInputTime',
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
      id: 'placeholder-example',
    })}
  `,
};

export const TestoDiSupporto: Story = {
  ...meta,
  name: 'Testo di supporto',
  args: { placeholder: 'Testo di supporto' },

  parameters: {
    docs: {
      description: {
        story: `In caso di necessità, è anche possibile utilizzare un ulteriore contenuto testuale sotto il campo di testo, indicando nell'attributo \`support-text\` il testo da visualizzare.`,
      },
    },
  },
  render: (params) => html`
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Etichetta',
      placeholder: 'Testo segnaposto',
      name: 'supportText-example',
      id: 'supportText-example',
      supportText: 'Testo di supporto',
    })}
  `,
};

export const IconeOPulsanti: Story = {
  ...meta,
  name: 'Icone o pulsanti',
  args: { placeholder: 'Icone o pulsanti' },

  render: (params) => html`
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Campo con icona',
      name: 'field-icon-example',
      id: 'field-icon-example',
      slotted: true,
      supportText: 'Testo di supporto',
      children: html`<it-icon name="it-pencil" slot="icon" size="sm"></it-icon>
        <it-button variant="primary" slot="append">Invio</it-button>`,
    })}
  `,
};
