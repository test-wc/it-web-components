import{x as i}from"./lit-element-DvQWNfDj.js";import"./it-button-hrkQSNN2.js";import"./it-icon-BoSTGf7m.js";import"./if-defined-BiCqEb5S.js";import"./iframe-C-6rL3To.js";const U=["primary","secondary","success","danger","warning","link"],W=["lg","sm","xs"],s=(n,e="")=>{var o;const a=((o=n.slot)==null?void 0:o.length)>0?n.slot:e;return i`
    <it-button
      variant="${n.variant}"
      ?outline="${n.outline}"
      size="${n.size}"
      ?block="${n.block}"
      ?disabled="${n.disabled}"
      ?icon="${n.icon}"
      type="${n.type}"
      >${a}</it-button
    >
  `},r=n=>i`
  <div class="flex">
    ${s(n)}
    ${s({...n,disabled:!0,slot:`${n.slot} disabled`})}
  </div>
`,t=(n,e)=>{var o;const a=((o=n.slot)==null?void 0:o.length)>0?n.slot:null;return i`<div class="flex p-0">
    ${r({...n,slot:a??e})}
    ${r({...n,slot:a??`${e} outline`,outline:!0})}
  </div>`},$=(n,e)=>i`<div class="flex">
    ${s({...n,variant:"primary"},`Primary ${e}`)}
    ${s({...n,variant:"secondary"},`Secondary ${e}`)}
  </div>`,g={title:"Componenti/Button",tags:["autodocs"],component:"it-button",args:{slot:"Testo del pulsante",variant:"primary",size:"sm",block:!1,outline:!1,disabled:!1,icon:!1,type:"button",value:""},argTypes:{variant:{control:"select",description:"Varianti di colore",options:U},size:{control:"select",description:"Dimensione del pulsante",options:W,table:{defaultValue:{summary:"sm"}}},block:{control:"boolean",type:"boolean",description:"Quando abilitato, estende il componente Button fino a prendere tutta la larghezza disponibile",table:{defaultValue:{summary:"false"}}},disabled:{control:"boolean",type:"boolean",table:{defaultValue:{summary:"false"}}},outline:{control:"boolean",type:"boolean",description:"Applica il colore solamente al bordo, usando il colore di sfondo come colore interno del pulsante.",table:{defaultValue:{summary:"false"}}},icon:{control:"boolean",type:"boolean",table:{defaultValue:{summary:"false"}}},slot:{control:"text",description:"Testo del pulsante"},type:{control:"select",description:"Tipologia di pulsante",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}},value:{control:"text"}},parameters:{docs:{description:{component:`
<Description>Pulsante con etichetta di testo o icona che al click inizia un'azione o un evento.</Description>

Per indicazioni su "Come e Quando usarlo" si fa riferimento alla [guida del design-system](https://designers.italia.it/design-system/componenti/buttons/).
`}}}},l={...g,name:"Esempio interattivo",args:{variant:"primary"},tags:["!autodocs","!dev"],parameters:{docs:{canvas:{sourceState:"shown"}}},render:n=>i` ${s({...n})}`},c={name:"Personalizzazione degli stili",tags:["!dev"],parameters:{viewMode:"docs",docs:{canvas:{hidden:!0,sourceState:"none"},description:{story:"\nPer la personalizzazione degli stili si può usare il selettore `::part` passando il valore `button`. [Vedi qui la guida dettagliata](/docs/personalizzazione-degli-stili--documentazione#selettore-part).\n"}}},render:()=>i`<div class="hide-preview"></div>`},d={name:"Varianti di colore",args:{slot:""},argTypes:{variant:{table:{disable:!0}},outline:{table:{disable:!0}},disabled:{table:{disable:!0}}},parameters:{docs:{description:{story:`
Gli stili definiti da Bootstrap Italia utilizzano un naming consistente con Bootstrap, con alcune personalizzazioni:

#### Note sullo stato disabilitato
- I pulsanti disabilitati includeranno l’attributo \`aria-disabled="true"\` per indicare lo stato dell’elemento alle tecnologie assistive.
`}}},render:n=>i`
    ${t({...n,variant:"primary"},"Primary")}
    ${t({...n,variant:"secondary"},"Secondary")}
    ${t({...n,variant:"success"},"Success")}
    ${t({...n,variant:"danger"},"Danger")}
    ${t({...n,variant:"warning"},"Warning")} ${t({...n,variant:"link"},"Link")}
  `},u={name:"Varianti di dimensione",args:{slot:""},argTypes:{variant:{table:{disable:!0}},size:{table:{disable:!0}},block:{table:{disable:!0}}},parameters:{docs:{description:{story:'\nPer ottenere pulsanti di dimensione più grande o più piccola, è sufficiente utilizzare l\'attributo `size` con i valori `"lg"`, `"sm"`, `"xs"`.\n\nUtilizzando invece l\'attributo `block` si ottengono pulsanti che prendono tutta l’ampiezza a loro disposizione, a seconda delle dimensioni del loro contenitore.\n'}}},render:n=>i`
    ${$({...n,size:"lg"},"Large")} ${$({...n,size:"sm"},"Small")}
    ${$({...n,size:"xs"},"Extra Small")}
    <div class="flex">
      ${s({...n,block:!0,variant:"primary"},"Primary Block")}
    </div>
    <div class="flex">
      ${s({...n,block:!0,variant:"secondary"},"Secondary Block")}
    </div>
  `},p={...g,args:{variant:"primary"},render:n=>i`
    <div class="flex tipologie-buttons">
      ${r({...n,slot:`Button - ${n.slot}`,type:"button"})}
      ${r({...n,slot:`Submit - ${n.slot}`,type:"submit"})}
      ${r({...n,slot:`Reset - ${n.slot}`,type:"reset"})}
    </div>
  `},m={name:"Sfondo scuro",args:{slot:""},argTypes:{variant:{table:{disable:!0}},outline:{table:{disable:!0}},disabled:{table:{disable:!0}}},parameters:{docs:{description:{story:`
<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Trasmettere significato alle tecnologie assistive</span></div>
<p>
L’uso del colore per aggiungere un significato fornisce solo un’indicazione visiva, che non sarà trasmesso agli utenti di tecnologie assistive –
come gli screen reader.
Assicurati che le informazioni denotate dal colore siano rese disponibili anche dal contenuto stesso (es.: il testo
visibile), o siano incluse attraverso mezzi alternativi, come testo aggiuntivo nascosto con la classe <code>.visually-hidden</code>.</p></div></div>`}}},render:n=>i`
    <div class="bg-dark p-4">
      ${t({...n,variant:"primary"},"Primary")}
      ${t({...n,variant:"secondary"},"Secondary")}
      ${t({...n,variant:"link"},"Link")}
    </div>
  `},b={...g,name:"Con icona",args:{},argTypes:{variant:{table:{disable:!0}},size:{table:{disable:!0}}},parameters:{docs:{description:{story:"\nL’icona può essere posizionata a sinistra o a destra del testo, a seconda della posizione in cui viene inserita all’interno del pulsante.\n<br/><br/>\n#### Dimensione dell'icona\n- Nei pulsanti di dimensione `lg` e `sm` è necessario passare l'attributo `size=\"sm\"` all'icona.\n- Nei pulsaanti di dimensione `xs`, è necessario passare l'attributo `size=\"xs\"` all'icona .\n"}}},render:n=>{var a;const e=((a=n.slot)==null?void 0:a.length)>0?n.slot:null;return i` <div class="flex">
      <it-button
        variant="success"
        size="lg"
        icon
        ?outline="${n.outline}"
        ?block="${n.block}"
        ?disabled="${n.disabled}"
        type="${n.type}"
      >
        <it-icon name="it-star-full" color="white" size="sm"></it-icon>
        <span>${e??"Pulsante Large con icona"}</span>
      </it-button>

      <it-button
        variant="primary"
        icon
        ?outline="${n.outline}"
        ?block="${n.block}"
        ?disabled="${n.disabled}"
        type="${n.type}"
      >
        <it-icon name="it-star-full" color="white" size="sm"></it-icon> <span>${e??"Pulsante con icona"}</span>
      </it-button>

      <it-button
        variant="danger"
        size="xs"
        icon
        ?outline="${n.outline}"
        ?block="${n.block}"
        ?disabled="${n.disabled}"
        type="${n.type}"
      >
        <it-icon name="it-star-full" color="white" size="xs"></it-icon>
        <span>${e??"Pulsante Smal con icona"}</span>
      </it-button>

      <it-button
        variant="link"
        size="xs"
        icon
        ?outline="${n.outline}"
        ?block="${n.block}"
        ?disabled="${n.disabled}"
        type="${n.type}"
      >
        <it-icon name="it-star-full" color="primary" size="xs"></it-icon>
        <span>${e??"Pulsante Extra Small con icona"}</span>
      </it-button>
    </div>`}},v={...g,name:"Con icona cerchiata",args:{},argTypes:{variant:{table:{disable:!0}},size:{table:{disable:!0}}},parameters:{docs:{description:{story:"\nL’icona può essere posizionata a sinistra o a destra del testo, a seconda della posizione in cui viene inserita all’interno del pulsante.\nDeve essere contenuta all'interno di uno elemento con classe`.rounded-icon` per poter avere il contorno circolare.\n<br/><br/>\n#### Dimensione dell'icona\n- Nei pulsanti di dimensione `lg` e `sm` è necessario passare l'attributo `size=\"sm\"` all'icona.\n- Nei pulsaanti di dimensione `xs`, è necessario passare l'attributo `size=\"xs\"` all'icona .\n"}}},render:n=>{var a;const e=((a=n.slot)==null?void 0:a.length)>0?n.slot:null;return i` <div class="flex">
      <it-button
        variant="success"
        size="lg"
        icon
        ?outline="${n.outline}"
        ?block="${n.block}"
        ?disabled="${n.disabled}"
        type="${n.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="success" size="sm"></it-icon>
        </span>
        <span>${e??"Pulsante Large con icona"}</span>
      </it-button>

      <it-button
        variant="primary"
        size="sm"
        icon
        ?outline="${n.outline}"
        ?block="${n.block}"
        ?disabled="${n.disabled}"
        type="${n.type}"
      >
        <span class="rounded-icon" size="sm">
          <it-icon name="it-user" color="primary" size="sm"></it-icon>
        </span>
        <span>${e??"Pulsante con icona"}</span>
      </it-button>

      <it-button
        variant="danger"
        size="xs"
        icon
        ?outline="${n.outline}"
        ?block="${n.block}"
        ?disabled="${n.disabled}"
        type="${n.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="danger" size="xs"></it-icon>
        </span>
        <span>${e??"Pulsante Small con icona"}</span>
      </it-button>

      <it-button
        variant="link"
        size="xs"
        icon
        ?outline="${n.outline}"
        ?block="${n.block}"
        ?disabled="${n.disabled}"
        type="${n.type}"
      >
        <span class="rounded-icon bg-primary">
          <it-icon name="it-user" color="white" size="xs"></it-icon>
        </span>
        <span>${e??"Pulsante Extra Small con icona"}</span>
      </it-button>
    </div>`}};var z,y,k;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  ...meta,
  name: 'Esempio interattivo',
  args: {
    variant: 'primary'
  },
  tags: ['!autodocs', '!dev'],
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown'
      }
    }
  },
  render: params => html\` \${renderComponent({
    ...params
  })}\`
}`,...(k=(y=l.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};var f,x,h;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'Personalizzazione degli stili',
  tags: ['!dev'],
  parameters: {
    viewMode: 'docs',
    // assicura che si apra la tab Docs anziché Canvas
    docs: {
      canvas: {
        hidden: true,
        sourceState: 'none'
      },
      // nasconde solo il canvas nella docs page
      description: {
        story: \`
Per la personalizzazione degli stili si può usare il selettore \\\`::part\\\` passando il valore \\\`button\\\`. [Vedi qui la guida dettagliata](/docs/personalizzazione-degli-stili--documentazione#selettore-part).
\`
      }
    }
  },
  render: () => html\`<div class="hide-preview"></div>\`
}`,...(h=(x=c.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var S,P,V;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Varianti di colore',
  args: {
    slot: ''
  },
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    },
    outline: {
      table: {
        disable: true
      }
    },
    disabled: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: \`
Gli stili definiti da Bootstrap Italia utilizzano un naming consistente con Bootstrap, con alcune personalizzazioni:

#### Note sullo stato disabilitato
- I pulsanti disabilitati includeranno l’attributo \\\`aria-disabled="true"\\\` per indicare lo stato dell’elemento alle tecnologie assistive.
\`
      }
    }
  },
  render: args => html\`
    \${renderVariant({
    ...args,
    variant: 'primary'
  }, 'Primary')}
    \${renderVariant({
    ...args,
    variant: 'secondary'
  }, 'Secondary')}
    \${renderVariant({
    ...args,
    variant: 'success'
  }, 'Success')}
    \${renderVariant({
    ...args,
    variant: 'danger'
  }, 'Danger')}
    \${renderVariant({
    ...args,
    variant: 'warning'
  }, 'Warning')} \${renderVariant({
    ...args,
    variant: 'link'
  }, 'Link')}
  \`
}`,...(V=(P=d.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var D,C,w;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Varianti di dimensione',
  args: {
    slot: ''
  },
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    },
    size: {
      table: {
        disable: true
      }
    },
    block: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: \`
Per ottenere pulsanti di dimensione più grande o più piccola, è sufficiente utilizzare l'attributo \\\`size\\\` con i valori \\\`"lg"\\\`, \\\`"sm"\\\`, \\\`"xs"\\\`.

Utilizzando invece l'attributo \\\`block\\\` si ottengono pulsanti che prendono tutta l’ampiezza a loro disposizione, a seconda delle dimensioni del loro contenitore.
\`
      }
    }
  },
  render: args => html\`
    \${renderSizeVariant({
    ...args,
    size: 'lg'
  }, 'Large')} \${renderSizeVariant({
    ...args,
    size: 'sm'
  }, 'Small')}
    \${renderSizeVariant({
    ...args,
    size: 'xs'
  }, 'Extra Small')}
    <div class="flex">
      \${renderComponent({
    ...args,
    block: true,
    variant: 'primary'
  }, 'Primary Block')}
    </div>
    <div class="flex">
      \${renderComponent({
    ...args,
    block: true,
    variant: 'secondary'
  }, 'Secondary Block')}
    </div>
  \`
}`,...(w=(C=u.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var T,L,B;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...meta,
  // name: 'Tipologie',
  args: {
    variant: 'primary'
  },
  render: params => html\`
    <div class="flex tipologie-buttons">
      \${renderDefault({
    ...params,
    slot: \`Button - \${params.slot}\`,
    type: 'button'
  })}
      \${renderDefault({
    ...params,
    slot: \`Submit - \${params.slot}\`,
    type: 'submit'
  })}
      \${renderDefault({
    ...params,
    slot: \`Reset - \${params.slot}\`,
    type: 'reset'
  })}
    </div>
  \`
}`,...(B=(L=p.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var E,I,N;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  name: 'Sfondo scuro',
  args: {
    slot: ''
  },
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    },
    outline: {
      table: {
        disable: true
      }
    },
    disabled: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: \`
<div class="callout callout-success"><div class="callout-inner"><div class="callout-title"><span class="text">Trasmettere significato alle tecnologie assistive</span></div>
<p>
L’uso del colore per aggiungere un significato fornisce solo un’indicazione visiva, che non sarà trasmesso agli utenti di tecnologie assistive –
come gli screen reader.
Assicurati che le informazioni denotate dal colore siano rese disponibili anche dal contenuto stesso (es.: il testo
visibile), o siano incluse attraverso mezzi alternativi, come testo aggiuntivo nascosto con la classe <code>.visually-hidden</code>.</p></div></div>\`
      }
    }
  },
  render: args => html\`
    <div class="bg-dark p-4">
      \${renderVariant({
    ...args,
    variant: 'primary'
  }, 'Primary')}
      \${renderVariant({
    ...args,
    variant: 'secondary'
  }, 'Secondary')}
      \${renderVariant({
    ...args,
    variant: 'link'
  }, 'Link')}
    </div>
  \`
}`,...(N=(I=m.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var A,q,G;b.parameters={...b.parameters,docs:{...(A=b.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...meta,
  name: 'Con icona',
  args: {},
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    },
    size: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: \`
L’icona può essere posizionata a sinistra o a destra del testo, a seconda della posizione in cui viene inserita all’interno del pulsante.
<br/><br/>
#### Dimensione dell'icona
- Nei pulsanti di dimensione \\\`lg\\\` e \\\`sm\\\` è necessario passare l'attributo \\\`size="sm"\\\` all'icona.
- Nei pulsaanti di dimensione \\\`xs\\\`, è necessario passare l'attributo \\\`size="xs"\\\` all'icona .
\`
      }
    }
  },
  render: params => {
    const slot = params.slot?.length > 0 ? params.slot : null;
    return html\` <div class="flex">
      <it-button
        variant="success"
        size="lg"
        icon
        ?outline="\${params.outline}"
        ?block="\${params.block}"
        ?disabled="\${params.disabled}"
        type="\${params.type}"
      >
        <it-icon name="it-star-full" color="white" size="sm"></it-icon>
        <span>\${slot ?? 'Pulsante Large con icona'}</span>
      </it-button>

      <it-button
        variant="primary"
        icon
        ?outline="\${params.outline}"
        ?block="\${params.block}"
        ?disabled="\${params.disabled}"
        type="\${params.type}"
      >
        <it-icon name="it-star-full" color="white" size="sm"></it-icon> <span>\${slot ?? 'Pulsante con icona'}</span>
      </it-button>

      <it-button
        variant="danger"
        size="xs"
        icon
        ?outline="\${params.outline}"
        ?block="\${params.block}"
        ?disabled="\${params.disabled}"
        type="\${params.type}"
      >
        <it-icon name="it-star-full" color="white" size="xs"></it-icon>
        <span>\${slot ?? 'Pulsante Smal con icona'}</span>
      </it-button>

      <it-button
        variant="link"
        size="xs"
        icon
        ?outline="\${params.outline}"
        ?block="\${params.block}"
        ?disabled="\${params.disabled}"
        type="\${params.type}"
      >
        <it-icon name="it-star-full" color="primary" size="xs"></it-icon>
        <span>\${slot ?? 'Pulsante Extra Small con icona'}</span>
      </it-button>
    </div>\`;
  }
}`,...(G=(q=b.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var M,Q,R;v.parameters={...v.parameters,docs:{...(M=v.parameters)==null?void 0:M.docs,source:{originalSource:`{
  ...meta,
  name: 'Con icona cerchiata',
  args: {},
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    },
    size: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: \`
L’icona può essere posizionata a sinistra o a destra del testo, a seconda della posizione in cui viene inserita all’interno del pulsante.
Deve essere contenuta all'interno di uno elemento con classe\\\`.rounded-icon\\\` per poter avere il contorno circolare.
<br/><br/>
#### Dimensione dell'icona
- Nei pulsanti di dimensione \\\`lg\\\` e \\\`sm\\\` è necessario passare l'attributo \\\`size="sm"\\\` all'icona.
- Nei pulsaanti di dimensione \\\`xs\\\`, è necessario passare l'attributo \\\`size="xs"\\\` all'icona .
\`
      }
    }
  },
  render: params => {
    const slot = params.slot?.length > 0 ? params.slot : null;
    return html\` <div class="flex">
      <it-button
        variant="success"
        size="lg"
        icon
        ?outline="\${params.outline}"
        ?block="\${params.block}"
        ?disabled="\${params.disabled}"
        type="\${params.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="success" size="sm"></it-icon>
        </span>
        <span>\${slot ?? 'Pulsante Large con icona'}</span>
      </it-button>

      <it-button
        variant="primary"
        size="sm"
        icon
        ?outline="\${params.outline}"
        ?block="\${params.block}"
        ?disabled="\${params.disabled}"
        type="\${params.type}"
      >
        <span class="rounded-icon" size="sm">
          <it-icon name="it-user" color="primary" size="sm"></it-icon>
        </span>
        <span>\${slot ?? 'Pulsante con icona'}</span>
      </it-button>

      <it-button
        variant="danger"
        size="xs"
        icon
        ?outline="\${params.outline}"
        ?block="\${params.block}"
        ?disabled="\${params.disabled}"
        type="\${params.type}"
      >
        <span class="rounded-icon">
          <it-icon name="it-user" color="danger" size="xs"></it-icon>
        </span>
        <span>\${slot ?? 'Pulsante Small con icona'}</span>
      </it-button>

      <it-button
        variant="link"
        size="xs"
        icon
        ?outline="\${params.outline}"
        ?block="\${params.block}"
        ?disabled="\${params.disabled}"
        type="\${params.type}"
      >
        <span class="rounded-icon bg-primary">
          <it-icon name="it-user" color="white" size="xs"></it-icon>
        </span>
        <span>\${slot ?? 'Pulsante Extra Small con icona'}</span>
      </it-button>
    </div>\`;
  }
}`,...(R=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:R.source}}};const J=["EsempioInterattivo","PersonalizzazioneDegliStili","VariantiColore","VariantiDimensione","Tipologie","SfondoScuro","ConIcona","ConIconaCerchiata"];export{b as ConIcona,v as ConIconaCerchiata,l as EsempioInterattivo,c as PersonalizzazioneDegliStili,m as SfondoScuro,p as Tipologie,d as VariantiColore,u as VariantiDimensione,J as __namedExportsOrder,g as default};
