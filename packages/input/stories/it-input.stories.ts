import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { defaultTranslations, inputTypes, InputType, sizes, Sizes } from '../src/types.js';

import '@italia/icon';
import '@italia/button';
import '@italia/input';

interface InputProps {
  id: string;
  label: string;
  type: InputType;
  name: string;
  disabled?: boolean;
  invalid: boolean;
  required: boolean;
  requiredValidityMessage: string;
  validityMessage: string;
  readonly: boolean;
  plaintext: boolean;
  placeholder: string;
  supportText: string;
  value: string;
  slotted: boolean;
  passwordStrengthMeter: boolean;
  translations: Record<string, string>;
  size: Sizes;
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
    ?readonly="${params.readonly}"
    ?plaintext="${params.plaintext}"
    required-validity-message="${ifDefined(params.requiredValidityMessage || undefined)}"
    validity-message="${ifDefined(params.validityMessage || undefined)}"
    placeholder="${ifDefined(params.placeholder || undefined)}"
    support-text="${ifDefined(params.supportText || undefined)}"
    value="${ifDefined(params.value || undefined)}"
    size="${ifDefined(params.size || undefined)}"
    ?slotted="${params.slotted}"
    ?strength-meter="${params.passwordStrengthMeter}"
    translations="${params.translations ? JSON.stringify(params.translations) : nothing}"
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
    size: undefined,
    readonly: false,
    plaintext: false,
    slotted: false,
    passwordStrengthMeter: false,
    translations: defaultTranslations,
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
    size: {
      control: 'select',
      options: sizes,
      description: "Dimensione del campo: 'sm' | (stringa vuota) | 'lg' ",
      table: { defaultValue: { summary: undefined } },
    },
    readonly: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    plaintext: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
      description:
        "Se il campo è readonly, con l'attributo 'plaintext' il campo assume l'aspetto di testo normalizzato.",
    },
    slotted: {
      control: 'boolean',
      type: 'boolean',
      description:
        "Se vengono usati gli slot per mostrare l'icona o il bottone, questo attributo deve avere valore 'true'",
      table: { defaultValue: { summary: 'false' } },
    },
    passwordStrengthMeter: {
      control: 'boolean',
      type: 'boolean',
      description: "Se si vuole mostrare o meno il misuratore di robustezza della password nel caso di type='password'",
      table: { defaultValue: { summary: 'false' } },
    },
    translations: {
      control: 'object',
      description: 'Consente di modificare le traduzioni dei messsaggi generati dal componente.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
<Description>Input accessibile e responsivo.</Description>

Per il corretto funzionamento degli elementi di tipo \`<it-input>\` è di fondamentale importanza l’utilizzo uno degli appositi attributi \`type\` (ad esempio, "email" per l’inserimento di indirizzi email o "number" per informazioni numeriche), in modo da sfruttare i controlli nativi dei browser più recenti come la verifica dell’email, l’utilizzo di metodo di input numerico ed altro.

<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Accessibilità</span></div>
<p>
Tutti gli attributi \`aria-*\` passati a \`<it-input>\` vengono applicati all'input generato.
</p></div></div>
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
  parameters: {
    docs: {
      description: {
        story: `
<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Accessibilità delle icone</span></div>
<p>
Nel caso in cui l’icona è semanticamente rilevante e non spiegata dal testo che la segue, occorre:
<ul><li>rimuovere \`aria-hidden="true"\`</li>
<li>aggiungere \`role="img"\` sul tag \`<svg>\`</li>
inserire all’interno il tag \`<title>\` con un titolo per l’icona che ne spieghi il significato (nel formato \`<title>significato icona</title>\`)
</p></div></div>
`,
      },
    },
  },

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

export const Disabilitato: Story = {
  ...meta,
  parameters: {
    docs: {
      description: {
        story: `Aggiungi l’attributo \`disabled\` ad un it-input per impedire la modifica del valore contenuto e non inviare i dati in esso contenuti.`,
      },
    },
  },

  render: (params) => html`
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Campo disabilitato',
      name: 'field-disabled-example',
      id: 'field-disabled-example',
      disabled: true,
      requiredValidityMessage: undefined,
    })}
  `,
};

export const Readonly: Story = {
  ...meta,
  parameters: {
    docs: {
      description: {
        story: `Aggiungi l’attributo \`readonly\` ad un it-input per impedire la modifica del valore contenuto.
<br/><br/><h4>Readonly normalizzato</h4>Se per qualche motivo vuoi avere gli elementi input readonly nella forma stilizzata come testo, aggiungi l'attributo \`plaintext\` a \`<it-input>\`.`,
      },
    },
  },

  render: (params) => html`
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Campo readonly',
      name: 'field-readonly-example',
      id: 'field-readonly-example',
      readonly: true,
      requiredValidityMessage: undefined,
      value: 'Contenuto in sola lettura',
    })}
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Campo readonly normalizzato come plaintext',
      name: 'field-readonlyplaintext-example',
      id: 'field-readonlyplaintext-example',
      readonly: true,
      plaintext: true,
      requiredValidityMessage: undefined,
      value: 'Contenuto in sola lettura',
    })}
  `,
};

export const Password: Story = {
  ...meta,
  parameters: {
    docs: {
      description: {
        story: `Per semplificare l’inserimento della password, il componente \`<it-input>\` di tipo password include un pulsante che mostra i caratteri digitati.
        È inoltre possibile aggiungere un testo di supporto che aiuti nella compilazione.
        <br/><br/>
        <h4>Misuratore sicurezza e suggerimenti</h4>
Nel caso di un campo per la scelta di una nuova password, è possibile abbinare controlli per segnalare quanto la password che si sta inserendo segua alcuni suggerimenti di sicurezza, come la lunghezza minima o l’uso di caratteri speciali.

Inoltre, è possibile restituire all’utente una lista dei suggerimenti, con indicati quelli che sono soddistatti.
`,
      },
    },
  },

  render: (params) => html`
    ${renderComponent({
      ...params,
      type: 'password',
      label: 'Campo password',
      name: 'field-password-example',
      id: 'field-password-example',
      supportText: 'Inserisci almeno 8 caratteri e alcuni caratteri speciali.',
      requiredValidityMessage: undefined,
    })}
    ${renderComponent({
      ...params,
      type: 'password',
      label: 'Campo password',
      name: 'field-password-strength-example',
      id: 'field-password-strength-example',
      supportText: 'Inserisci almeno 8 caratteri e alcuni caratteri speciali.',
      requiredValidityMessage: undefined,
      passwordStrengthMeter: true,
      translations: { shortPassword: 'Password debole' },
    })}
  `,
};

export const Dimensioni: Story = {
  ...meta,
  parameters: {
    docs: {
      description: {
        story: `
        L'input di base ha una dimensione media che non necessita alcuna classe aggiuntiva.

Per modificare questa dimensione, è possiible utilizzare l'attributo \`size\` il cui valore può essere \`sm\` oppure \`lg\`
Per modificare invece la dimensione dell’icona, è possibile utilizzare l'attributo \`size\` sull'icona in questo modo:
<table>
<thead>
  <tr><th>Dimensione input</th><th>Dimensione icona</th></tr>
</thead>
<tbody>
  <tr><td>\`lg\`</td><td>\`md\`</td></tr>
  <tr><td>normale</td><td>\`sm\`</td></tr>
  <tr><td>\`sm\`</td><td>\`xs\`</td></tr>
</tbody>
</table>
`,
      },
    },
  },

  render: (params) => html`
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Campo di dimensione grande',
      name: 'field-big-example',
      id: 'field-big-example',
      placeholder: 'Testo segnaposto',
      size: 'lg',
      requiredValidityMessage: undefined,
      slotted: true,
      children: html`<it-icon name="it-pencil" slot="icon" size="md"></it-icon>
        <it-button variant="primary" slot="append">Invio</it-button>`,
    })}
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Campo di dimensione base',
      name: 'field-sizebase-example',
      id: 'field-sizebase-example',
      placeholder: 'Testo segnaposto',
      requiredValidityMessage: undefined,
      slotted: true,
      children: html`<it-icon name="it-pencil" slot="icon" size="sm"></it-icon>
        <it-button variant="primary" slot="append">Invio</it-button>`,
    })}
    ${renderComponent({
      ...params,
      type: 'text',
      label: 'Campo di dimensione piccola',
      name: 'field-small-example',
      id: 'field-small-example',
      placeholder: 'Testo segnaposto',
      size: 'sm',
      requiredValidityMessage: undefined,
      slotted: true,
      children: html`<it-icon name="it-pencil" slot="icon" size="xs"></it-icon>
        <it-button variant="primary" slot="append">Invio</it-button>`,
    })}
  `,
};

export const Textarea: Story = {
  ...meta,
  name: 'Area di testo',
  parameters: {
    docs: {
      description: {
        story: `Per permettere agli utenti di inserire un testo esteso (ad esempio per lasciare commenti o informazioni), è bene utilizzare un elemento <it-input> con \`type="textarea"\`.`,
      },
    },
  },

  render: (params) => html`
    ${renderComponent({
      ...params,
      type: 'textarea',
      label: 'Area di testo',
      name: 'textarea-example',
      id: 'textarea-example',
      placeholder: 'Testo segnaposto',
      requiredValidityMessage: undefined,
    })}
  `,
};
