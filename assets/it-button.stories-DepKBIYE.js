import{i as Y,x as a,a as Z}from"./lit-element-Dfkv_UsO.js";import{n as r,o as P,t as nn}from"./it-icon-BD9BJp4h.js";import"./iframe-pJPTdTLt.js";function s(n,e,t,i){var p=arguments.length,b=p<3?e:i,v;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")b=Reflect.decorate(n,e,t,i);else for(var w=n.length-1;w>=0;w--)(v=n[w])&&(b=(p<3?v(b):p>3?v(e,t,b):v(e,t))||b);return p>3&&b&&Object.defineProperty(e,t,b),b}function l(n,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(n,e)}/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */var C;(function(n){n.NO_ERROR="",n.ERROR_REQUIRED="required"})(C||(C={}));class en extends Z{addFocus(e){}composeClass(...e){let t="";return e.filter(i=>i.length>0).forEach(i=>{t+=` ${i}`}),t.trim()}}var tn=Y`/***************************** 1 ****************************************/
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
}`;let o=class extends en{constructor(){super(...arguments),this._buttonClasses="",this.type="button",this.variant="",this.size="sm",this.outline=!1,this.block=!1,this.disabled=!1,this.icon=!1,this.value="",this.internals=this.attachInternals()}static get formAssociated(){return!0}firstUpdated(e){const t=this.renderRoot.querySelector("button");t&&this.addFocus(t)}updated(){this._buttonClasses=this.composeClass("btn",!this.outline&&this.variant!==""?`btn-${this.variant}`:"",this.outline?`${this.variant?"btn-outline-":""}${this.variant}`:"",this.disabled?"disabled":"",this.size?`btn-${this.size}`:"",this.block?"d-block w-100":"",this.icon?"btn-icon":"")}surfaceSubmitEvent(e){this.form&&(e.preventDefault(),e.stopPropagation(),this.form.requestSubmit())}get form(){return this.internals?this.internals.form:null}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.block&&this.classList.add("d-block","w-100")}render(){return a`
      <button
        part="${this.variant} ${this.outline?"outline":""}"
        type="${this.type}"
        disabled=${P(this.disabled||void 0)}
        class="${this._buttonClasses}"
        @click="${this.type==="submit"?this.surfaceSubmitEvent:void 0}"
        .value="${P(this.value?this.value:void 0)}"
      >
        <slot></slot>
      </button>
    `}};o.styles=tn;s([r({type:String}),l("design:type",Object)],o.prototype,"_buttonClasses",void 0);s([r({type:String}),l("design:type",Object)],o.prototype,"type",void 0);s([r({type:String}),l("design:type",Object)],o.prototype,"variant",void 0);s([r({type:String}),l("design:type",Object)],o.prototype,"size",void 0);s([r({type:Boolean}),l("design:type",Object)],o.prototype,"outline",void 0);s([r({type:Boolean}),l("design:type",Object)],o.prototype,"block",void 0);s([r({type:Boolean}),l("design:type",Object)],o.prototype,"disabled",void 0);s([r({type:Boolean}),l("design:type",Object)],o.prototype,"icon",void 0);s([r({type:String}),l("design:type",Object)],o.prototype,"value",void 0);s([r(),l("design:type",Object)],o.prototype,"internals",void 0);o=s([nn("it-button")],o);const on=["primary","secondary","success","danger","warning","link"],an=["lg","sm","xs"],d=(n,e="")=>{var i;const t=((i=n.slot)==null?void 0:i.length)>0?n.slot:e;return a`
    <it-button
      variant="${n.variant}"
      ?outline="${n.outline}"
      size="${n.size}"
      ?block="${n.block}"
      ?disabled="${n.disabled}"
      type="${n.type}"
      >${t}</it-button
    >
  `},u=n=>a`
  <div class="flex">
    ${d(n)}
    ${d({...n,disabled:!0,slot:`${n.slot} disabled`})}
  </div>
`,c=(n,e)=>{var i;const t=((i=n.slot)==null?void 0:i.length)>0?n.slot:null;return a`<div class="flex p-0">
    ${u({...n,slot:t??e})}
    ${u({...n,slot:t??`${e} outline`,outline:!0})}
  </div>`},S=(n,e)=>a`<div class="flex">
    ${d({...n,variant:"primary"},`Primary ${e}`)}
    ${d({...n,variant:"secondary"},`Secondary ${e}`)}
  </div>`,f={title:"Componenti/Button",tags:["autodocs"],component:"it-button",args:{slot:"Testo del pulsante",variant:"primary",size:"sm",block:!1,outline:!1,disabled:!1,type:"button",value:""},argTypes:{variant:{control:"select",description:"Varianti di colore",options:on},size:{control:"select",description:"Dimensione del pulsante",options:an},block:{control:"boolean",type:"boolean",description:"Quando abilitato, estende il componente Button fino a prendere tutta la larghezza disponibile"},disabled:{control:"boolean",type:"boolean"},outline:{control:"boolean",type:"boolean",description:"Applica il colore solamente al bordo, usando il colore di sfondo come colore interno del pulsante."},slot:{control:"text",description:"Testo del pulsante"},type:{control:"select",description:"Tipologia di pulsante",options:["button","submit","reset"]},value:{control:"text"}},parameters:{docs:{description:{component:`
<Description>Pulsante con etichetta di testo o icona che al click inizia un'azione o un evento.</Description>

Per indicazioni su "Come e Quando usarlo" si fa riferimento alla [guida del design-system](https://designers.italia.it/design-system/componenti/buttons/).
`}}}},m={...f,args:{variant:"primary"},tags:["!autodocs","!dev"],parameters:{docs:{canvas:{sourceState:"shown"}}},render:n=>a` ${d({...n})}`},g={tags:["!dev"],parameters:{viewMode:"docs",docs:{canvas:{hidden:!0,sourceState:"none"},description:{story:"\nPer la personalizzazione degli stili si può usare il selettore `::part` passando il valore `button`. [Vedi qui la guida dettagliata](/docs/personalizzazione-degli-stili--documentazione#selettore-part).\n"}}},render:()=>a`<div></div>`},y={...f,args:{variant:"primary"},render:n=>a`
    <div class="flex tipologie-buttons">
      ${u({...n,slot:`Button - ${n.slot}`,type:"button"})}
      ${u({...n,slot:`Submit - ${n.slot}`,type:"submit"})}
      ${u({...n,slot:`Reset - ${n.slot}`,type:"reset"})}
    </div>
  `},h={args:{slot:""},argTypes:{variant:{table:{disable:!0}},outline:{table:{disable:!0}},disabled:{table:{disable:!0}}},parameters:{docs:{description:{story:`
Gli stili definiti da Bootstrap Italia utilizzano un naming consistente con Bootstrap, con alcune personalizzazioni:

#### Note sullo stato disabilitato
- I pulsanti disabilitati includeranno l’attributo \`aria-disabled="true"\` per indicare lo stato dell’elemento alle tecnologie assistive.
`}}},render:n=>a`
    ${c({...n,variant:"primary"},"Primary")}
    ${c({...n,variant:"secondary"},"Secondary")}
    ${c({...n,variant:"success"},"Success")}
    ${c({...n,variant:"danger"},"Danger")}
    ${c({...n,variant:"warning"},"Warning")} ${c({...n,variant:"link"},"Link")}
  `},$={args:{slot:""},argTypes:{variant:{table:{disable:!0}},outline:{table:{disable:!0}},disabled:{table:{disable:!0}}},parameters:{docs:{description:{story:`
<div class="success callout"><div class="callout-inner"><div class="callout-title"><span class="text">Trasmettere significato alle tecnologie assistive</span></div>
<p>
L’uso del colore per aggiungere un significato fornisce solo un’indicazione visiva, che non sarà trasmesso agli utenti di tecnologie assistive –
come gli screen reader.
Assicurati che le informazioni denotate dal colore siano rese disponibili anche dal contenuto stesso (es.: il testo
visibile), o siano incluse attraverso mezzi alternativi, come testo aggiuntivo nascosto con la classe <code>.visually-hidden</code>.</p></div></div>`}}},render:n=>a`
    <div class="bg-dark p-4">
      ${c({...n,variant:"primary"},"Primary")}
      ${c({...n,variant:"secondary"},"Secondary")}
      ${c({...n,variant:"link"},"Link")}
    </div>
  `},z={args:{slot:""},argTypes:{variant:{table:{disable:!0}},size:{table:{disable:!0}},block:{table:{disable:!0}}},parameters:{docs:{description:{story:'\nPer ottenere pulsanti di dimensione più grande o più piccola, è sufficiente utilizzare l\'attributo `size` con i valori `"lg"`, `"sm"`, `"xs"`.\n\nUtilizzando invece l\'attributo `block` si ottengono pulsanti che prendono tutta l’ampiezza a loro disposizione, a seconda delle dimensioni del loro contenitore.\n'}}},render:n=>a`
    ${S({...n,size:"lg"},"Large")} ${S({...n,size:"sm"},"Small")}
    ${S({...n,size:"xs"},"Extra Small")}
    <div class="flex">
      ${d({...n,block:!0,variant:"primary"},"Primary Block")}
    </div>
    <div class="flex">
      ${d({...n,block:!0,variant:"secondary"},"Secondary Block")}
    </div>
  `},k={...f,args:{},argTypes:{variant:{table:{disable:!0}},size:{table:{disable:!0}}},parameters:{docs:{description:{story:"\nL’icona può essere posizionata a sinistra o a destra del testo, a seconda della posizione in cui viene inserita all’interno del pulsante.\n<br/><br/>\n#### Dimensione dell'icona\n- Nei pulsanti di dimensione `lg` e `sm` è necessario passare l'attributo `size=\"sm\"` all'icona.\n- Nei pulsaanti di dimensione `xs`, è necessario passare l'attributo `size=\"xs\"` all'icona .\n"}}},render:n=>{var t;const e=((t=n.slot)==null?void 0:t.length)>0?n.slot:null;return a` <div class="flex">
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
    </div>`}},x={...f,args:{},argTypes:{variant:{table:{disable:!0}},size:{table:{disable:!0}}},parameters:{docs:{description:{story:"\nL’icona può essere posizionata a sinistra o a destra del testo, a seconda della posizione in cui viene inserita all’interno del pulsante.\nDeve essere contenuta all'interno di uno elemento con classe`.rounded-icon` per poter avere il contorno circolare.\n<br/><br/>\n#### Dimensione dell'icona\n- Nei pulsanti di dimensione `lg` e `sm` è necessario passare l'attributo `size=\"sm\"` all'icona.\n- Nei pulsaanti di dimensione `xs`, è necessario passare l'attributo `size=\"xs\"` all'icona .\n"}}},render:n=>{var t;const e=((t=n.slot)==null?void 0:t.length)>0?n.slot:null;return a` <div class="flex">
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
    </div>`}};var D,E,V;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  ...meta,
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
}`,...(V=(E=m.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var L,R,B;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
  render: () => html\`<div></div>\`
}`,...(B=(R=g.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var T,j,O;y.parameters={...y.parameters,docs:{...(T=y.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(O=(j=y.parameters)==null?void 0:j.docs)==null?void 0:O.source}}};var I,N,_;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(_=(N=h.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};var A,U,q;$.parameters={...$.parameters,docs:{...(A=$.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(q=(U=$.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var Q,F,G;z.parameters={...z.parameters,docs:{...(Q=z.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(G=(F=z.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var M,W,H;k.parameters={...k.parameters,docs:{...(M=k.parameters)==null?void 0:M.docs,source:{originalSource:`{
  ...meta,
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
}`,...(H=(W=k.parameters)==null?void 0:W.docs)==null?void 0:H.source}}};var J,K,X;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`{
  ...meta,
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
}`,...(X=(K=x.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};const bn=["EsempioInterattivo","PersonalizzazioneDegliStili","Tipologie","VariantiColore","SfondoScuro","VariantiDiDimensione","PulsantiConIcona","PulsantiConIconaCerchiata"];export{m as EsempioInterattivo,g as PersonalizzazioneDegliStili,k as PulsantiConIcona,x as PulsantiConIconaCerchiata,$ as SfondoScuro,y as Tipologie,h as VariantiColore,z as VariantiDiDimensione,bn as __namedExportsOrder,f as default};
