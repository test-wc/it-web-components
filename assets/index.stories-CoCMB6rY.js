import{i as k,a as E,x as p}from"./lit-element-Dfkv_UsO.js";import{n as w,t as A}from"./property-D9jmBfGY.js";function b(t,e,r,h){var l=arguments.length,o=l<3?e:h,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,h);else for(var u=t.length-1;u>=0;u--)(d=t[u])&&(o=(l<3?d(o):l>3?d(e,r,o):d(e,r))||o);return l>3&&o&&Object.defineProperty(e,r,o),o}function j(t,e){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(t,e)}var O=k`:host {
  display: block;
  padding: 25px;
  color: var(--it-tabs-text-color, #000);
}`;let c=class extends E{constructor(){super(...arguments),this.header="Hey there",this.counter=5}__increment(){this.counter+=1}render(){return p`
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>
        <slot name="content">increment</slot>
      </button>
    `}};c.styles=O;b([w({type:String}),j("design:type",Object)],c.prototype,"header",void 0);b([w({type:Number}),j("design:type",Object)],c.prototype,"counter",void 0);c=b([A("it-tabs")],c);const q={title:"ItTabs",component:"it-tabs",argTypes:{header:{control:"text"},counter:{control:"number"},textColor:{control:"color"}}},m=({header:t="Hello world",counter:e=5,textColor:r})=>p`
  <it-tabs style="--it-tabs-text-color: ${r||"black"}" .header=${t} .counter=${e}> </it-tabs>
`,i=m.bind({}),n=m.bind({});n.args={header:"My header"};const s=m.bind({});s.args={counter:123456};const I=({header:t="Hello world",counter:e=5,textColor:r})=>p`
  <it-tabs style="--it-tabs-text-color: ${r||"black"}" .header=${t} .counter=${e}>
    <p slot="content">Slotted content</p>
  </it-tabs>
`,a=I.bind({});a.argTypes={slot:{table:{disable:!0}}};var y,f,x;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`({
  header = 'Hello world',
  counter = 5,
  textColor
}: ArgTypes) => html\`
  <it-tabs style="--it-tabs-text-color: \${textColor || 'black'}" .header=\${header} .counter=\${counter}> </it-tabs>
\``,...(x=(f=i.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var $,g,C;n.parameters={...n.parameters,docs:{...($=n.parameters)==null?void 0:$.docs,source:{originalSource:`({
  header = 'Hello world',
  counter = 5,
  textColor
}: ArgTypes) => html\`
  <it-tabs style="--it-tabs-text-color: \${textColor || 'black'}" .header=\${header} .counter=\${counter}> </it-tabs>
\``,...(C=(g=n.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var S,T,_;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`({
  header = 'Hello world',
  counter = 5,
  textColor
}: ArgTypes) => html\`
  <it-tabs style="--it-tabs-text-color: \${textColor || 'black'}" .header=\${header} .counter=\${counter}> </it-tabs>
\``,...(_=(T=s.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var H,R,v;a.parameters={...a.parameters,docs:{...(H=a.parameters)==null?void 0:H.docs,source:{originalSource:`({
  header = 'Hello world',
  counter = 5,
  textColor
}: ArgTypes) => html\`
  <it-tabs style="--it-tabs-text-color: \${textColor || 'black'}" .header=\${header} .counter=\${counter}>
    <p slot="content">Slotted content</p>
  </it-tabs>
\``,...(v=(R=a.parameters)==null?void 0:R.docs)==null?void 0:v.source}}};const z=["Regular","CustomHeader","CustomCounter","SlottedContent"];export{s as CustomCounter,n as CustomHeader,i as Regular,a as SlottedContent,z as __namedExportsOrder,q as default};
