import{i as A,x as a,a as N}from"./lit-element-Dfkv_UsO.js";import{n as l,t as q}from"./property-D9jmBfGY.js";import{o as k}from"./if-defined--qm2G2ez.js";function i(e,t,n,o){var v=arguments.length,c=v<3?t:o,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,n,o);else for(var x=e.length-1;x>=0;x--)(p=e[x])&&(c=(v<3?p(c):v>3?p(t,n,c):p(t,n))||c);return v>3&&c&&Object.defineProperty(t,n,c),c}function b(e,t){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(e,t)}/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */var z;(function(e){e.NO_ERROR="",e.ERROR_REQUIRED="required"})(z||(z={}));class F extends N{addFocus(t){}composeClass(...t){let n="";return t.filter(o=>o.length>0).forEach(o=>{n+=` ${o}`}),n.trim()}}var G=A`/***************************** 1 ****************************************/
/***************************** 2 ****************************************/
/***************************** 1 ****************************************/
/***************************** 2 ****************************************/
/***************************** 1 ****************************************/
/***************************** 2 ****************************************/
/***************************** 3 ****************************************/
/***************************** 1 ****************************************/
/***************************** 2 ****************************************/
/***************************** 3 ****************************************/
/***************************** NEUTRAL 1 ****************************************/
/***************************** NEUTRAL 2 ****************************************/
/***************************** NEUTRAL 2 / 3 ****************************************/
.d-block {
  display: block !important;
}

.w-100 {
  width: 100% !important;
}

@media (min-width: 576px) {
  .d-sm-block {
    display: block !important;
  }
}
@media (min-width: 768px) {
  .d-md-block {
    display: block !important;
  }
}
@media (min-width: 992px) {
  .d-lg-block {
    display: block !important;
  }
}
@media (min-width: 1200px) {
  .d-xl-block {
    display: block !important;
  }
}
@media (min-width: 1400px) {
  .d-xxl-block {
    display: block !important;
  }
}
@media print {
  .d-print-block {
    display: block !important;
  }
}
.btn {
  --bs-btn-padding-x: var(--bs-spacing-s);
  --bs-btn-padding-y: var(--bs-spacing-xs);
  --bs-btn-font-family: var(--bs-font-sans);
  --bs-btn-font-weight: var(--bs-font-weight-solid);
  --bs-btn-font-size: var(--bs-label-font-size);
  --bs-btn-line-height: var(--bs-font-line-height-3);
  --bs-btn-text-color: var(--bs-color-text-primary);
  --bs-btn-background: transparent;
  --bs-btn-border-size: 0;
  --bs-btn-border-color: transparent;
  --bs-btn-border-radius: var(--bs-radius-smooth);
  --bs-btn-outline-border-size: 2px;
  --bs-btn-outline-border-color: transparent;
  --bs-btn-disabled-opacity: 0.5;
}

.btn {
  display: inline-block;
  padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
  border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
  border-radius: var(--bs-btn-border-radius);
  background: var(--bs-btn-background);
  box-shadow: var(--bs-btn-box-shadow, none);
  color: var(--bs-btn-text-color);
  font-family: var(--bs-btn-font-family);
  font-size: var(--bs-btn-font-size);
  font-weight: var(--bs-btn-font-weight);
  line-height: var(--bs-btn-line-height);
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  white-space: initial;
  width: auto;
  transition: all var(--bs-transition-instant) ease-in-out;
  user-select: none;
}
.btn:disabled, .btn.disabled {
  opacity: var(--bs-btn-disabled-opacity);
  cursor: not-allowed;
  pointer-events: none;
}
.btn:focus-visible {
  border-color: var(--bs-btn-hover-border-color);
  outline: 0;
}
.btn-check:focus-visible + .btn {
  border-color: var(--bs-btn-hover-border-color);
  outline: 0;
}

.btn-link {
  --bs-btn-background: transparent;
  --bs-btn-border-color: transparent;
  text-decoration: underline;
}
.btn-link:hover {
  color: var(--bs-color-link-hover);
}

.btn-xs {
  --bs-btn-padding-x: var(--bs-spacing-xs);
  --bs-btn-padding-y: var(--bs-spacing-xs);
  --bs-btn-font-size: var(--bs-label-font-size-s);
  --bs-btn-line-height: var(--bs-font-line-height-1);
}

.btn-lg {
  --bs-btn-padding-x: var(--bs-spacing-m);
  --bs-btn-padding-y: var(--bs-spacing-s);
  --bs-btn-font-size: var(--bs-label-font-size-m);
  --bs-btn-line-height: var(--bs-font-line-height-5);
}

.btn-progress {
  position: relative;
}

.btn-icon {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--bs-icon-spacing);
}

.btn-full {
  align-self: stretch;
  width: inherit;
  border: none;
  box-shadow: none;
}
@media (min-width: 992px) {
  .btn-full {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
}

.btn:disabled:hover,
.btn.disabled:hover {
  cursor: not-allowed;
}

.btn-primary,
a.btn-primary {
  --bs-btn-text-color: var(--bs-color-text-inverse);
  --bs-btn-background: var(--bs-color-background-primary);
}
.btn-primary:hover,
a.btn-primary:hover {
  --bs-btn-background: var(--bs-color-background-primary-hover);
}
.btn-primary:active,
a.btn-primary:active {
  --bs-btn-background: var(--bs-color-background-primary-active);
}
.btn-primary.btn-progress,
a.btn-primary.btn-progress {
  border-color: hsl(210, 76%, 67%);
  opacity: 1;
  background-color: hsl(210, 76%, 67%);
}

.btn-secondary,
a.btn-secondary {
  --bs-btn-text-color: var(--bs-color-text-inverse);
  --bs-btn-background: var(--bs-color-background-secondary);
}
.btn-secondary:hover,
a.btn-secondary:hover {
  --bs-btn-background: var(--bs-color-background-secondary-hover);
}
.btn-secondary:active,
a.btn-secondary:active {
  --bs-btn-background: var(--bs-color-background-secondary-active);
}
.btn-secondary:disabled.btn-progress, .btn-secondary.disabled.btn-progress,
a.btn-secondary:disabled.btn-progress,
a.btn-secondary.disabled.btn-progress {
  border-color: hsl(210, 12%, 52%);
  opacity: 1;
  background-color: hsl(210, 12%, 52%);
}

.btn-success,
a.btn-success {
  --bs-btn-text-color: var(--bs-color-text-inverse);
  --bs-btn-background: var(--bs-color-background-success);
}
.btn-success:hover,
a.btn-success:hover {
  --bs-btn-background: var(--bs-color-background-success-hover);
}
.btn-success:active,
a.btn-success:active {
  --bs-btn-background: var(--bs-color-background-success-active);
}

.btn-warning,
a.btn-warning {
  --bs-btn-text-color: var(--bs-color-text-inverse);
  --bs-btn-background: var(--bs-color-background-warning);
}
.btn-warning:hover,
a.btn-warning:hover {
  --bs-btn-background: var(--bs-color-background-warning-hover);
}
.btn-warning:active,
a.btn-warning:active {
  --bs-btn-background: var(--bs-color-background-warning-active);
}

.btn-danger,
a.btn-danger {
  --bs-btn-text-color: var(--bs-color-text-inverse);
  --bs-btn-background: var(--bs-color-background-danger);
}
.btn-danger:hover,
a.btn-danger:hover {
  --bs-btn-background: var(--bs-color-background-danger-hover);
}
.btn-danger:active,
a.btn-danger:active {
  --bs-btn-background: var(--bs-color-background-danger-active);
}

.btn[class*=btn-outline-] {
  --bs-btn-box-shadow: inset 0 0 0 var(--bs-btn-outline-border-size) var(--bs-btn-outline-border-color);
}

.btn-outline-primary,
a.btn-outline-primary {
  --bs-btn-outline-border-color: var(--bs-color-border-primary);
  --bs-btn-text-color: var(--bs-color-text-primary);
}
.btn-outline-primary:hover,
a.btn-outline-primary:hover {
  --bs-btn-outline-border-color: var(--bs-color-border-primary-hover);
  --bs-btn-text-color: var(--bs-color-link-hover);
}
.btn-outline-primary:active,
a.btn-outline-primary:active {
  --bs-btn-outline-border-color: var(--bs-color-border-primary-active);
  --bs-btn-text-color: var(--bs-color-link-active);
}
.btn-outline-secondary,
a.btn-outline-secondary {
  --bs-btn-outline-border-color: var(--bs-color-border-secondary);
  --bs-btn-text-color: var(--bs-color-text-secondary);
}
.btn-outline-secondary:hover,
a.btn-outline-secondary:hover {
  --bs-btn-outline-border-color: var(--bs-color-border-secondary-hover);
  --bs-btn-text-color: var(--bs-color-text-secondary-hover);
}
.btn-outline-secondary:active,
a.btn-outline-secondary:active {
  --bs-btn-outline-border-color: var(--bs-color-border-secondary-active);
  --bs-btn-text-color: var(--bs-color-text-secondary-active);
}
.btn-outline-success,
a.btn-outline-success {
  --bs-btn-outline-border-color: var(--bs-color-border-success);
  --bs-btn-text-color: var(--bs-color-text-success);
}
.btn-outline-success:hover,
a.btn-outline-success:hover {
  --bs-btn-outline-border-color: var(--bs-color-border-success-hover);
  --bs-btn-text-color: var(--bs-color-text-success-hover);
}
.btn-outline-success:active,
a.btn-outline-success:active {
  --bs-btn-outline-border-color: var(--bs-color-border-success-active);
  --bs-btn-text-color: var(--bs-color-text-success-active);
}
.btn-outline-warning,
a.btn-outline-warning {
  --bs-btn-outline-border-color: var(--bs-color-border-warning);
  --bs-btn-text-color: var(--bs-color-text-warning);
}
.btn-outline-warning:hover,
a.btn-outline-warning:hover {
  --bs-btn-outline-border-color: var(--bs-color-border-warning-hover);
  --bs-btn-text-color: var(--bs-color-text-warning-hover);
}
.btn-outline-warning:active,
a.btn-outline-warning:active {
  --bs-btn-outline-border-color: var(--bs-color-border-warning-active);
  --bs-btn-text-color: var(--bs-color-text-warning-active);
}
.btn-outline-danger,
a.btn-outline-danger {
  --bs-btn-outline-border-color: var(--bs-color-border-danger);
  --bs-btn-text-color: var(--bs-color-text-danger);
}
.btn-outline-danger:hover,
a.btn-outline-danger:hover {
  --bs-btn-outline-border-color: var(--bs-color-border-danger-hover);
  --bs-btn-text-color: var(--bs-color-text-danger-hover);
}
.btn-outline-danger:active,
a.btn-outline-danger:active {
  --bs-btn-outline-border-color: var(--bs-color-border-danger-active);
  --bs-btn-text-color: var(--bs-color-text-danger-active);
}

.bg-dark .btn-link {
  --bs-btn-text-color: var(--bs-color-text-inverse);
}
.bg-dark .btn-outline-primary,
.bg-dark a.btn-outline-primary,
.bg-dark .btn-outline-secondary,
.bg-dark a.btn-outline-secondary {
  --bs-btn-outline-border-color: var(--bs-color-border-inverse);
  --bs-btn-text-color: var(--bs-color-text-inverse);
}

.btn-close {
  position: relative;
  box-sizing: content-box;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0;
  opacity: 0.5;
  background-color: transparent;
  color: var(--bs-color-text-base);
}
.btn-close .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn-close:hover {
  opacity: 1;
  text-decoration: none;
}
.btn-close:focus {
  opacity: 1;
}
.btn-close:disabled, .btn-close.disabled {
  opacity: var(--bs-btn-disabled-opacity);
  pointer-events: none;
  user-select: none;
}

.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
}`;let r=class extends F{constructor(){super(...arguments),this._buttonClasses="",this.type="button",this.variant="",this.size="sm",this.outline=!1,this.block=!1,this.disabled=!1,this.value="",this.internals=this.attachInternals()}static get formAssociated(){return!0}firstUpdated(t){const n=this.renderRoot.querySelector("button");n&&this.addFocus(n)}updated(){this._buttonClasses=this.composeClass("btn",!this.outline&&this.variant!==""?`btn-${this.variant}`:"",this.outline?`${this.variant?"btn-outline-":""}${this.variant}`:"",this.disabled?"disabled":"",this.size?`btn-${this.size}`:"",this.block?"d-block w-100":"")}surfaceSubmitEvent(t){this.form&&(t.preventDefault(),t.stopPropagation(),this.form.requestSubmit())}get form(){return this.internals?this.internals.form:null}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.block&&this.classList.add("d-block","w-100")}render(){return a`
      <button
        part="${this.variant} ${this.outline?"outline":""}"
        type="${this.type}"
        disabled=${k(this.disabled||void 0)}
        class="${this._buttonClasses}"
        @click="${this.type==="submit"?this.surfaceSubmitEvent:void 0}"
        .value="${k(this.value?this.value:void 0)}"
      >
        <slot></slot>
      </button>
    `}};r.styles=G;i([l({type:String}),b("design:type",Object)],r.prototype,"_buttonClasses",void 0);i([l({type:String}),b("design:type",Object)],r.prototype,"type",void 0);i([l({type:String}),b("design:type",Object)],r.prototype,"variant",void 0);i([l({type:String}),b("design:type",Object)],r.prototype,"size",void 0);i([l({type:Boolean}),b("design:type",Object)],r.prototype,"outline",void 0);i([l({type:Boolean}),b("design:type",Object)],r.prototype,"block",void 0);i([l({type:Boolean}),b("design:type",Object)],r.prototype,"disabled",void 0);i([l({type:String}),b("design:type",Object)],r.prototype,"value",void 0);i([l(),b("design:type",Object)],r.prototype,"internals",void 0);r=i([q("it-button")],r);const Q=["primary","secondary","success","info","danger","warning","link"],W=["lg","sm","xs"],d=(e,t="")=>{var o;const n=((o=e.slot)==null?void 0:o.length)>0?e.slot:t;return a`
    <it-button
      variant="${e.variant}"
      ?outline="${e.outline}"
      size="${e.size}"
      ?block="${e.block}"
      ?disabled="${e.disabled}"
      type="${e.type}"
      >${n}</it-button
    >
  `},u=e=>a`
  <div class="flex">
    ${d(e)}
    ${d({...e,disabled:!0,slot:`${e.slot} disabled`})}
  </div>
`,s=(e,t)=>{var o;const n=((o=e.slot)==null?void 0:o.length)>0?e.slot:null;return a`<div class="flex p-0">
    ${u({...e,slot:n??t})}
    ${u({...e,slot:n??`${t} outline`,outline:!0})}
  </div>`},$=(e,t)=>a`<div class="flex">
    ${d({...e,variant:"primary"},`Primary ${t}`)}
    ${d({...e,variant:"secondary"},`Secondary ${t}`)}
  </div>`,L={title:"Componenti/Button",tags:["autodocs"],component:"it-button",render:e=>u(e),args:{slot:"Testo bottone",variant:"primary",size:"sm",block:!1,outline:!1,disabled:!1,type:"button",value:""},argTypes:{variant:{control:"select",description:"Varianti di colore",options:Q},size:{control:"select",description:"Dimensione del bottone",options:W},block:{control:"boolean",type:"boolean",description:"Quando abilitato, estende il componente Button fino a prendere tutta la larghezza disponibile"},disabled:{control:"boolean",type:"boolean"},outline:{control:"boolean",type:"boolean",description:"Applica il colore solamente al bordo, usando il colore di sfondo come colore interno del bottone."},slot:{control:"text",description:"Testo del bottone"},type:{control:"select",description:"Tipologia di bottone",options:["button","submit","reset"]},value:{control:"text"}},parameters:{docs:{description:{component:`
<Description>Pulsante con etichetta di testo o icona che al clic inizia un'azione o un evento.</Description>
<br/><br/><br/>
## Come usarlo
Per aggiungere un bottone personalizzato, è sufficiente utilizzare il componente
\`<it-button />\` ed i relativi attributi per applicarne le varianti di stile, dimensione, ecc.

- Usa la variante **"primary"** per valorizzare l’azione principale.
- Usa la variante **"secondary"** per valorizzare l’azione secondaria.
- Per comunicare senza ambiguità la gerarchia delle azioni generate dai pulsanti, usa le varianti di grandezza e tipologia.
- Usa un pulsante con icona per aggiungere un’informazione visiva all’interazione (es. pulsante di accesso ad area riservata).
`}}}},g={...L,args:{variant:"primary"},tags:["!autodocs","!dev"],render:e=>a` ${d({...e})}`},m={...L,args:{variant:"primary"},render:e=>a`
    <div class="flex tipologie-buttons">
      ${u({...e,slot:`Button - ${e.slot}`,type:"button"})}
      ${u({...e,slot:`Submit - ${e.slot}`,type:"submit"})}
      ${u({...e,slot:`Reset - ${e.slot}`,type:"reset"})}
    </div>
  `},y={args:{slot:""},argTypes:{variant:{table:{disable:!0}},outline:{table:{disable:!0}},disabled:{table:{disable:!0}}},parameters:{docs:{description:{story:`
Gli stili definiti da Bootstrap Italia utilizzano un naming consistente con Bootstrap, con alcune personalizzazioni:

#### Note sullo stato disabilitato
- I bottoni disabilitati includeranno l’attributo aria-disabled="true" per indicare lo stato dell’elemento alle tecnologie assistive.
`}}},render:e=>a`
    ${s({...e,variant:"primary"},"Primary")}
    ${s({...e,variant:"secondary"},"Secondary")}
    ${s({...e,variant:"success"},"Success")}
    ${s({...e,variant:"danger"},"Danger")}
    ${s({...e,variant:"warning"},"Warning")} ${s({...e,variant:"info"},"Info")}
  `},h={args:{slot:""},argTypes:{variant:{table:{disable:!0}},outline:{table:{disable:!0}},disabled:{table:{disable:!0}}},parameters:{docs:{description:{story:`
<div class="success callout"><div class="callout-inner"><div class="callout-title"><span class="text">Trasmettere significato alle tecnologie assistive</span></div>
<p>
L’uso del colore per aggiungere un significato fornisce solo un’indicazione visiva, che non sarà trasmesso agli utenti di tecnologie assistive –
come gli screen reader.
Assicurati che le informazioni denotate dal colore siano rese disponibili anche dal contenuto stesso (es.: il testo
visibile), o siano incluse attraverso mezzi alternativi, come testo aggiuntivo nascosto con la classe <code>.visually-hidden</code>.</p></div></div>`}}},render:e=>a`
    <div class="bg-dark p-4">
      ${s({...e,variant:"primary"},"Primary")}
      ${s({...e,variant:"secondary"},"Secondary")}
      ${s({...e,variant:"link"},"Link")}
    </div>
  `},f={args:{slot:""},argTypes:{variant:{table:{disable:!0}},size:{table:{disable:!0}},block:{table:{disable:!0}}},parameters:{docs:{description:{story:'\nPer ottenere bottoni di dimensione più grande o più piccola, è sufficiente utilizzare l\'attributo `size` con i valori `"lg"`, `"sm"`, `"xs"`.\n\nUtilizzando invece l\'attributo `block` si ottengono bottoni che prendono tutta l’ampiezza a loro disposizione, a seconda delle dimensioni del loro contenitore.\n'}}},render:e=>a`
    ${$({...e,size:"lg"},"large")} ${$({...e,size:"sm"},"small")}
    <div class="flex">
      ${d({...e,block:!0,variant:"primary"},"Primary block")}
    </div>
    <div class="flex">
      ${d({...e,block:!0,variant:"secondary"},"Secondary block")}
    </div>
  `};var w,S,R;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  ...meta,
  args: {
    variant: 'primary'
  },
  tags: ['!autodocs', '!dev'],
  render: params => html\` \${renderComponent({
    ...params
  })}\`
}`,...(R=(S=g.parameters)==null?void 0:S.docs)==null?void 0:R.source}}};var C,V,E;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  ...meta,
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
}`,...(E=(V=m.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var D,P,T;y.parameters={...y.parameters,docs:{...(D=y.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
- I bottoni disabilitati includeranno l’attributo aria-disabled="true" per indicare lo stato dell’elemento alle tecnologie assistive.
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
    variant: 'info'
  }, 'Info')}
  \`
}`,...(T=(P=y.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var j,B,O;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
<div class="success callout"><div class="callout-inner"><div class="callout-title"><span class="text">Trasmettere significato alle tecnologie assistive</span></div>
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
}`,...(O=(B=h.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var _,I,U;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
Per ottenere bottoni di dimensione più grande o più piccola, è sufficiente utilizzare l'attributo \\\`size\\\` con i valori \\\`"lg"\\\`, \\\`"sm"\\\`, \\\`"xs"\\\`.

Utilizzando invece l'attributo \\\`block\\\` si ottengono bottoni che prendono tutta l’ampiezza a loro disposizione, a seconda delle dimensioni del loro contenitore.
\`
      }
    }
  },
  render: args => html\`
    \${renderSizeVariant({
    ...args,
    size: 'lg'
  }, 'large')} \${renderSizeVariant({
    ...args,
    size: 'sm'
  }, 'small')}
    <div class="flex">
      \${renderComponent({
    ...args,
    block: true,
    variant: 'primary'
  }, 'Primary block')}
    </div>
    <div class="flex">
      \${renderComponent({
    ...args,
    block: true,
    variant: 'secondary'
  }, 'Secondary block')}
    </div>
  \`
}`,...(U=(I=f.parameters)==null?void 0:I.docs)==null?void 0:U.source}}};const X=["EsempioInterattivo","Tipologie","VariantiColore","SfondoScuro","VariantiDiDimensione"];export{g as EsempioInterattivo,h as SfondoScuro,m as Tipologie,y as VariantiColore,f as VariantiDiDimensione,X as __namedExportsOrder,L as default};
