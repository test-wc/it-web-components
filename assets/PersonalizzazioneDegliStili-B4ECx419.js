import{j as e,M as l}from"./index-gNeCQ56a.js";import{useMDXComponents as t}from"./index-DaMaO-nz.js";import"./iframe-DY3sXhhL.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";function o(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Personalizzazione degli stili"}),`
`,e.jsx(n.h1,{id:"personalizzazione-degli-stili-dei-componenti",children:"Personalizzazione degli stili dei componenti"}),`
`,e.jsx(n.p,{children:"Il componenti di design-web-components utilizzano Shadow DOM per incapsulare internamente il contenuto HTML e proteggerne gli stili."}),`
`,e.jsx(n.h2,{id:"selettore-part",children:"Selettore ::part"}),`
`,e.jsxs(n.p,{children:["Per consentire la personalizzazione degli stili da parte degli utilizzatori, espongono l'attributo ",e.jsx(n.code,{children:"part"}),` nativo direttamente sull'elemento renderizzato.
Grazie a questo attributo, si possono applicare gli stili sull'elemento dall’esterno dello Shadow DOM usando il selettore `,e.jsx(n.code,{children:"::part()"}),". ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/::part:",rel:"nofollow",children:"https://developer.mozilla.org/en-US/docs/Web/CSS/::part:"}),"."]}),`
`,e.jsx(n.h3,{id:"esempio",children:"Esempio"}),`
`,e.jsxs(n.p,{children:["Applichiamo all'icona creata con il componente ",e.jsx(n.code,{children:"<it-icon>"})," il colore ",e.jsx(n.code,{children:"#6c007a"})," (viola):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`it-icon::part(icon) {
  width: 48px;
  height: 48px;
  fill: #6c007a;
  stroke: #000;
  stroke-width: 1px;
}
`})})]})}function p(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{p as default};
