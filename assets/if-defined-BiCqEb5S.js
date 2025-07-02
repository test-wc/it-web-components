import{f as u,u as l,E as d}from"./lit-element-DvQWNfDj.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=t=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,r)}):customElements.define(t,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const p={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:u},f=(t=p,r,e)=>{const{kind:i,metadata:a}=e;let o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(e.name,t),i==="accessor"){const{name:s}=e;return{set(n){const c=r.get.call(this);r.set.call(this,n),this.requestUpdate(s,c,t)},init(n){return n!==void 0&&this.C(s,void 0,t,n),n}}}if(i==="setter"){const{name:s}=e;return function(n){const c=this[s];r.call(this,n),this.requestUpdate(s,c,t)}}throw Error("Unsupported decorator location: "+i)};function h(t){return(r,e)=>typeof e=="object"?f(t,r,e):((i,a,o)=>{const s=a.hasOwnProperty(o);return a.constructor.createProperty(o,i),s?Object.getOwnPropertyDescriptor(a,o):void 0})(t,r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(t){return h({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=(t,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(t,r,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(t,r){return(e,i,a)=>{const o=s=>{var n;return((n=s.renderRoot)==null?void 0:n.querySelector(t))??null};return b(e,i,{get(){return o(this)}})}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=t=>t??d;export{v as e,h as n,P as o,g as r,y as t};
