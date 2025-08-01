import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import { DEFAULT_TRANSLATIONS, INPUT_TYPES, type InputType, INPUT_SIZES, type Sizes } from '../src/types.js';

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
  validityMessage: string;
  readonly: boolean;
  plaintext: boolean;
  placeholder: string;
  supportText: string;
  value: string;
  slotted: boolean;
  labelHidden: boolean;
  passwordStrengthMeter: boolean;
  minlength: number;
  maxlength: number;
  suggestions: boolean;
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
    validity-message="${ifDefined(params.validityMessage || undefined)}"
    placeholder="${ifDefined(params.placeholder || undefined)}"
    support-text="${ifDefined(params.supportText || undefined)}"
    value="${ifDefined(params.value || undefined)}"
    size="${ifDefined(params.size || undefined)}"
    ?slotted="${params.slotted}"
    ?strength-meter="${params.passwordStrengthMeter}"
    minlength="${ifDefined(params.minlength) || undefined}"
    maxlength="${ifDefined(params.maxlength) || undefined}"
    ?suggestions="${params.suggestions}"
    ?label-hidden="${params.labelHidden}"
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
    validityMessage: '',
    placeholder: '',
    supportText: '',
    value: '',
    size: undefined,
    readonly: false,
    plaintext: false,
    slotted: false,
    labelHidden: false,
    passwordStrengthMeter: false,
    minlength: undefined,
    maxlength: undefined,
    suggestions: false,
    translations: DEFAULT_TRANSLATIONS,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Etichetta del campo',
    },
    type: {
      control: 'select',
      options: INPUT_TYPES,
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
      options: INPUT_SIZES,
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
    labelHidden: {
      name: 'label-hidden',
      control: 'boolean',
      type: 'boolean',
      description: 'Se si vuole nascondere la label. Risulterà comunque accessibile per i lettori di schermo.',
      table: { defaultValue: { summary: 'false' } },
    },
    passwordStrengthMeter: {
      name: 'strength-meter',
      control: 'boolean',
      type: 'boolean',
      description: "Se si vuole mostrare o meno il misuratore di robustezza della password nel caso di type='password'",
      table: { defaultValue: { summary: 'false' } },
    },
    minlength: {
      type: 'number',
      description: 'Lunghezza minima del valore da inserire. Usato anche per validare la robustezza della password',
      table: { defaultValue: { summary: 'undefined. Se type="password": 8' } },
    },
    maxlength: {
      type: 'number',
      description: 'Lunghezza massima del valore da inserire.',
    },
    suggestions: {
      name: 'suggestions',
      control: 'boolean',
      type: 'boolean',
      description: "Se si vogliono mostrare i suggerimenti per l'insderimento di una password sicura.",
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
      translations: undefined,
    })}
    ${renderComponent({
      ...params,
      type: 'email',
      label: 'Campo email',
      name: 'email',
      id: 'exampleInputEmail',
      translations: undefined,
    })}
    ${renderComponent({
      ...params,
      type: 'number',
      label: 'Campo numerico',
      name: 'number',
      id: 'exampleInputNumber',
      translations: undefined,
    })}
    ${renderComponent({
      ...params,
      type: 'tel',
      label: 'Campo telefonico',
      name: 'telefono',
      id: 'exampleInputTel',
      translations: undefined,
    })}
    ${renderComponent({
      ...params,
      type: 'time',
      label: 'Campo orario',
      name: 'orario',
      id: 'exampleInputTime',
      translations: undefined,
    })}`,
};

export const Placeholder: Story = {
  ...meta,
  name: 'Testo segnaposto',
  args: {
    type: 'text',
    placeholder: 'Testo segnaposto',
    label: 'Etichetta',
    name: 'placeholder-example',
    id: 'placeholder-example',
    translations: undefined,
  },

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
    })}
  `,
};

export const TestoDiSupporto: Story = {
  ...meta,
  name: 'Testo di supporto',
  args: {
    type: 'text',
    label: 'Etichetta',
    placeholder: 'Testo segnaposto',
    name: 'supportText-example',
    id: 'supportText-example',
    supportText: 'Testo di supporto',
    translations: undefined,
  },

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
    })}
  `,
};

export const LabelHidden: Story = {
  ...meta,
  name: 'Etichetta nascosta',
  args: { placeholder: 'Cerca...', label: 'Cerca nel sito', labelHidden: true, translations: undefined },

  parameters: {
    docs: {
      description: {
        story: `Se si vuole nascondere l'etichetta, come ad esempio nei campi di ricerca, è sufficiente passare l'attributo \`label-hidden\`.`,
      },
    },
  },
  render: (params) => html`
    ${renderComponent({
      ...params,
    })}
  `,
};

export const IconeOPulsanti: Story = {
  ...meta,
  name: 'Icone o pulsanti',
  args: {
    placeholder: 'Icone o pulsanti',
    type: 'text',
    label: 'Campo con icona',
    name: 'field-icon-example',
    id: 'field-icon-example',
    slotted: true,
    supportText: 'Testo di supporto',
    translations: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: `<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Accessibilità delle icone</span></div><p>Nel caso in cui l’icona è semanticamente rilevante e non spiegata dal testo che la segue, occorre passare al componente \`<it-icon>\` l'attributo \`label\` che ne spieghi il significato (nel formato \`<it-icon .... label="Significato dell'icona"/>\`)</p></div></div>`,
      },
    },
  },

  render: (params) => html`
    ${renderComponent({
      ...params,
      children: html`<it-icon name="it-pencil" slot="icon" size="sm"></it-icon>
        <it-button variant="primary" slot="append">Invio</it-button>`,
    })}
  `,
};

export const Dimensioni: Story = {
  ...meta,
  parameters: {
    docs: {
      description: {
        story: `L'input di base ha una dimensione media che non necessita di alcuna classe aggiuntiva.

Per modificare questa dimensione, è possiible utilizzare l'attributo \`size\` il cui valore può essere \`sm\` oppure \`lg\`.

Per modificare invece la dimensione dell’icona, è possibile utilizzare l'attributo \`size\` sull'icona in questo modo:
<table>
<thead>
  <tr><th>Dimensione input</th><th>Attributo size (di it-input)</th><th>Dimensione icona</th></tr>
</thead>
<tbody>
  <tr><td>Grande</td><td>\`lg\`</td><td>\`md\`</td></tr>
  <tr><td>Base (default)</td><td></td><td>\`sm\`</td></tr>
  <tr><td>Piccola</td><td>\`sm\`</td><td>\`xs\`</td></tr>
</tbody>
</table>
`,
      },
    },
  },
  args: {
    type: 'text',
    placeholder: 'Testo segnaposto',
    translations: undefined,
    slotted: true,
  },
  render: (params) => html`
    ${renderComponent({
      ...params,
      label: 'Campo di dimensione grande',
      name: 'field-big-example',
      id: 'field-big-example',
      size: 'lg',
      children: html`<it-icon name="it-pencil" slot="icon" size="md"></it-icon>
        <it-button variant="primary" slot="append">Invio</it-button>`,
    })}
    ${renderComponent({
      ...params,
      label: 'Campo di dimensione base',
      name: 'field-sizebase-example',
      id: 'field-sizebase-example',
      placeholder: 'Testo segnaposto',
      children: html`<it-icon name="it-pencil" slot="icon" size="sm"></it-icon>
        <it-button variant="primary" slot="append">Invio</it-button>`,
    })}
    ${renderComponent({
      ...params,
      label: 'Campo di dimensione piccola',
      name: 'field-small-example',
      id: 'field-small-example',
      size: 'sm',
      children: html`<it-icon name="it-pencil" slot="icon" size="xs"></it-icon>
        <it-button variant="primary" slot="append">Invio</it-button>`,
    })}
  `,
};

export const Disabilitato: Story = {
  ...meta,
  parameters: {
    docs: {
      description: {
        story: `Aggiungi l’attributo \`disabled\` ad un \`<it-input>\` per impedire la modifica del valore contenuto e non inviare i dati in esso contenuti.`,
      },
    },
  },
  args: {
    type: 'text',
    label: 'Campo disabilitato',
    name: 'field-disabled-example',
    id: 'field-disabled-example',
    disabled: true,
    translations: undefined,
  },
  render: (params) => html`
    ${renderComponent({
      ...params,
    })}
  `,
};

export const Readonly: Story = {
  ...meta,
  parameters: {
    docs: {
      description: {
        story: `Aggiungi l’attributo \`readonly\` ad un \`<it-input>\` per impedire la modifica del valore contenuto.
<br/><br/><h4>Readonly normalizzato</h4>Se per qualche motivo vuoi avere gli elementi input readonly nella forma stilizzata come testo, aggiungi l'attributo \`plaintext\` a \`<it-input>\`.`,
      },
    },
  },
  args: { type: 'text', readonly: true, value: 'Contenuto in sola lettura' },
  render: (params) => html`
    ${renderComponent({
      ...params,
      label: 'Campo readonly',
      name: 'field-readonly-example',
      id: 'field-readonly-example',
    })}
    ${renderComponent({
      ...params,
      label: 'Campo readonly normalizzato come plaintext',
      name: 'field-readonlyplaintext-example',
      id: 'field-readonlyplaintext-example',
      plaintext: true,
    })}
  `,
};

export const Password: Story = {
  ...meta,
  parameters: {
    docs: {
      description: {
        story: `Per semplificare l’inserimento della password, il componente \`<it-input>\` di tipo password include un pulsante che mostra i caratteri digitati.
        È inoltre possibile aggiungere un testo di supporto che aiuti nella compilazione, attraverso l’attributo \`support-text\`.
        <br/><br/>
        <h4>Misuratore sicurezza e suggerimenti</h4>
Nel caso di un campo per la scelta di una nuova password, è possibile abbinare controlli per segnalare quanto la password che si sta inserendo segua alcuni suggerimenti di sicurezza, come la lunghezza minima o l’uso di caratteri speciali, attraverso gli attributi \`strength-meter="true"\` e \`minlength\` per modificare la lunghezza minima richiesta per la password.

Inoltre, è possibile restituire all’utente una lista dei suggerimenti, con indicati quelli che sono stati soddisfatti, attraverso l’attributo \`suggestions="true"\`.
<br/><br/>
<h4>Traduzioni</h4>
Per modificare le traduzioni dei messaggi generati dal componente, è possibile utilizzare l'attributo \`translations\`, che accetta un oggetto JSON con le chiavi corrispondenti ai messaggi da modificare. Le chiavi disponibili sono consultabili nella documentazione degli attributi del componente \`<it-input>\`.
`,
      },
    },
  },
  args: { type: 'password', label: 'Campo password' },
  render: (params) => html`
    ${renderComponent({
      ...params,
      name: 'field-password-example',
      id: 'field-password-example',
      supportText: 'Inserisci almeno 8 caratteri e alcuni caratteri speciali.',
      translations: undefined,
    })}
    ${renderComponent({
      ...params,
      name: 'field-password-strength-example',
      id: 'field-password-strength-example',
      supportText: 'Inserisci almeno 10 caratteri e alcuni caratteri speciali.',
      passwordStrengthMeter: true,
      minlength: 10,
      suggestions: true,
      translations: { shortPassword: 'Password troppo corta.' },
    })}
  `,
};

export const Textarea: Story = {
  ...meta,
  name: 'Area di testo',
  parameters: {
    docs: {
      description: {
        story: `Per permettere agli utenti di inserire un testo esteso (ad esempio per lasciare commenti o informazioni), è bene utilizzare un elemento \`<it-input>\` con \`type="textarea"\`.`,
      },
    },
  },
  args: {
    type: 'textarea',
    label: 'Area di testo',
    name: 'textarea-example',
    id: 'textarea-example',
    placeholder: 'Testo segnaposto',
  },
  render: (params) => html`
    ${renderComponent({
      ...params,
    })}
  `,
};

export const GestioneErrori: Story = {
  ...meta,
  name: 'Gestione degli errori',
  parameters: {
    docs: {
      description: {
        story: `Se sono stati impostati uno di questi attributi <ul><li>\`required\`</li><li>\`pattern\`</li><li>\`minlength\`</li></ul> viene effettuata una validazione interna al componente.
<br/><br/>E' inoltre possibile validare il campo esternamente, impostando l'attributo \`validity-message\` nel caso in cui il campo non sia valido.
 <br/><br/><h4>Personalizzazione dei messaggi di errore</h4>E' possibile personalizzare i messaggi di errore tramite l'attributo \`translations\` a seconda che:
       <ul><li>il campo è required e non è compilato: impostando il valore di \`validityRequired\` in \`translations\`</li>
        <li>il campo non rispetta il pattern: impostando il valore di \`validityPattern\` in \`translations\`</li>
        <li>il campo è troppo corto: impostando il valore di \`validityMinlength\` in \`translations\`</li>
        <li>il campo ha un valore non valido: impostando il valore di \`validityInvalid\` in \`translations\`</li></ul>`,
      },
    },
  },
  args: { type: 'text', placeholder: 'Testo segnaposto', translations: undefined },
  render: (params) => html`
    ${renderComponent({
      ...params,
      label: 'Campo obbligatorio',
      name: 'required-example',
      id: 'required-example',
      translations: {
        validityRequired: 'Questo campo è obbligatorio. Inserisci un valore.',
      },
      required: true,
    })}
    ${renderComponent({
      ...params,
      label: 'Validazione esterna',
      name: 'external-validation-example',
      id: 'external-validation-example',
      validityMessage: 'Questo campo è obbligatorio!',
      required: undefined,
    })}
  `,
};

export const GestioneEventi: Story = {
  ...meta,
  name: 'Gestione degli eventi',
  parameters: {
    docs: {
      description: {
        story: `E' possibile gestire gli eventi di \`input\`, \`blur\`, \`change\`, \`focus\`, \`click\` per effettuare operazioni personalizzate, come la validazione esterna o l'aggiornamento di altri campi.
        <br/><br/>
        E' sufficiente aggiungere un event listener al componente \`<it-input>\` per intercettare gli eventi desiderati. Ad esempio, per gestire l'evento di input, è possibile utilizzare il seguente codice:

\`\`\`js
document.querySelector('it-input#event-input-example').addEventListener('input', (event) => {
  console.log('Input event:', event);
  alert('Input event);
});
\`\`\`
      `,
      },
    },
  },
  args: {
    type: 'text',
    label: 'Prova evento di input',
    name: 'event-input-example',
    id: 'event-input-example',
    placeholder: 'Testo segnaposto',
    translations: undefined,
  },
  render: (params) => html`
    <script>
      document.querySelector('it-input#event-input-example').addEventListener('input', (event) => {
        console.log('Input event:', event);
        alert('Input event');
      });
    </script>
    ${renderComponent({
      ...params,
    })}
  `,
};
