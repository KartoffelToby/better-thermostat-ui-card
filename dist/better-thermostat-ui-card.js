/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;class o{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=s.get(this.cssText);return e&&void 0===t&&(s.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a;const l=window.trustedTypes,c=l?l.emptyScript:"",h=window.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:u};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=m){var s,o;const n=this.constructor._$Eh(t,i);if(void 0!==n&&!0===i.reflect){const r=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:d.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,e){var i,s,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),a=t.converter,l=null!==(o=null!==(s=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof a?a:null)&&void 0!==o?o:d.fromAttribute;this._$Ei=r,this[r]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:p}),(null!==(a=globalThis.reactiveElementVersions)&&void 0!==a?a:globalThis.reactiveElementVersions=[]).push("1.0.2");const g=globalThis.trustedTypes,v=g?g.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,y="?"+f,$=`<${y}>`,b=document,A=(t="")=>b.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,x=/-->/g,L=/>/g,E=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,M=/'/g,N=/"/g,T=/^(?:script|style|textarea)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),O=H(1),V=H(2),k=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),P=new WeakMap,z=b.createTreeWalker(b,129,null,!1),R=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=S;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===S?"!--"===l[1]?r=x:void 0!==l[1]?r=L:void 0!==l[2]?(T.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=E):void 0!==l[3]&&(r=E):r===E?">"===l[0]?(r=null!=o?o:S,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?E:'"'===l[3]?N:M):r===N||r===M?r=E:r===x||r===L?r=S:(r=E,o=void 0);const d=r===E&&t[e+1].startsWith("/>")?" ":"";n+=r===S?i+$:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+f+d):i+f+(-2===c?(s.push(void 0),e):d)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==v?v.createHTML(a):a,s]};class D{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=R(t,e);if(this.el=D.createElement(l,i),z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=z.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?q:"?"===e[1]?W:"@"===e[1]?J:B})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(T.test(s.tagName)){const t=s.textContent.split(f),e=t.length-1;if(e>0){s.textContent=g?g.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],A()),z.nextNode(),a.push({type:2,index:++o});s.append(t[e],A())}}}else if(8===s.nodeType)if(s.data===y)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(f,t+1));)a.push({type:7,index:o}),t+=f.length-1}o++}}static createElement(t,e){const i=b.createElement("template");return i.innerHTML=t,i}}function j(t,e,i=t,s){var o,n,r,a;if(e===k)return e;let l=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const c=w(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Cl)&&void 0!==r?r:a._$Cl=[])[s]=l:i._$Cu=l),void 0!==l&&(e=j(t,l._$AS(t,e.values),l,s)),e}class F{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:b).importNode(i,!0);z.currentNode=o;let n=z.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new I(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new K(n,this,t)),this.v.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=z.nextNode(),r++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class I{constructor(t,e,i,s){var o;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=j(this,t,e),w(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==k&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return C(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==U&&w(this._$AH)?this._$AA.nextSibling.data=t:this.S(b.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=D.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new F(o,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=P.get(t.strings);return void 0===e&&P.set(t.strings,e=new D(t)),e}M(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new I(this.A(A()),this.A(A()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class B{constructor(t,e,i,s,o){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=j(this,t,e,0),n=!w(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=j(this,s[i+r],e,r),a===k&&(a=this._$AH[r]),n||(n=!w(a)||a!==this._$AH[r]),a===U?t=U:t!==U&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.k(t)}k(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class q extends B{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===U?void 0:t}}const Z=g?g.emptyScript:"";class W extends B{constructor(){super(...arguments),this.type=4}k(t){t&&t!==U?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class J extends B{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=j(this,t,e,0))&&void 0!==i?i:U)===k)return;const s=this._$AH,o=t===U&&s!==U||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==U&&(s===U||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){j(this,t)}}const G=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Q,X;null==G||G(D,I),(null!==(_=globalThis.litHtmlVersions)&&void 0!==_?_:globalThis.litHtmlVersions=[]).push("2.0.2");class Y extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new I(e.insertBefore(A(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return k}}Y.finalized=!0,Y._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:Y});const tt=globalThis.litElementPolyfillSupport;null==tt||tt({LitElement:Y}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,it=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function st(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):it(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ot(t){return st({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt=1;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){var e;if(super(t),t.type!==nt||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,s;if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.et)||void 0===i?void 0:i.has(t))&&this.st.add(t);return this.render(e)}const o=t.element.classList;this.st.forEach((t=>{t in e||(o.remove(t),this.st.delete(t))}));for(const t in e){const i=!!e[t];i===this.st.has(t)||(null===(s=this.et)||void 0===s?void 0:s.has(t))||(i?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return k}});var at="[^\\s]+";function lt(t,e){for(var i=[],s=0,o=t.length;s<o;s++)i.push(t[s].substr(0,e));return i}var ct=function(t){return function(e,i){var s=i[t].map((function(t){return t.toLowerCase()})),o=s.indexOf(e.toLowerCase());return o>-1?o:null}};function ht(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var s=0,o=e;s<o.length;s++){var n=o[s];for(var r in n)t[r]=n[r]}return t}var dt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ut=["January","February","March","April","May","June","July","August","September","October","November","December"],mt=lt(ut,3),pt={dayNamesShort:lt(dt,3),dayNames:dt,monthNamesShort:mt,monthNames:ut,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},_t=(ht({},pt),function(t){return+t-1}),gt=[null,"[1-9]\\d?"],vt=[null,at],ft=["isPm",at,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],yt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];ct("monthNamesShort"),ct("monthNames");function $t(){return($t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();var bt,At;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(bt||(bt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(At||(At={}));var wt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o};const Ct={required:{icon:"tune",name:"Required",secondary:"Required options for this card to function",show:!0}};let St=class extends Y{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _show_warning(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_warning)||!1}get _show_error(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_error)||!1}get _tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.tap_action)||{action:"more-info"}}get _hold_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.hold_action)||{action:"none"}}get _double_tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.double_tap_action)||{action:"none"}}render(){if(!this.hass||!this._helpers)return O``;this._helpers.importMoreInfoControl("climate");const t=Object.keys(this.hass.states).filter((t=>"climate"===t.split(".")[0]));return O`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"required"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${Ct.required.icon}`}></ha-icon>
            <div class="title">${Ct.required.name}</div>
          </div>
          <div class="secondary">${Ct.required.secondary}</div>
        </div>
        ${Ct.required.show?O`
              <div class="values">
                <paper-dropdown-menu
                  label="Entity (Required)"
                  @value-changed=${this._valueChanged}
                  .configValue=${"entity"}
                >
                  <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
                    ${t.map((t=>O`
                        <paper-item>${t}</paper-item>
                      `))}
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            `:""}
      </div>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleOption(t){this._toggleThing(t,Ct)}_toggleThing(t,e){const i=!e[t.target.option].show;for(const[t]of Object.entries(e))e[t].show=!1;e[t.target.option].show=i,this._toggle=!this._toggle}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(this[`_${e.configValue}`]!==e.value){if(e.configValue)if(""===e.value){const t=Object.assign({},this._config);delete t[e.configValue],this._config=t}else this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value});wt(this,"config-changed",{config:this._config})}}static get styles(){return n`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `}};t([st({attribute:!1})],St.prototype,"hass",void 0),t([ot()],St.prototype,"_config",void 0),t([ot()],St.prototype,"_toggle",void 0),t([ot()],St.prototype,"_helpers",void 0),St=t([et("better-thermostat-ui-card-editor")],St);var xt={version:"version"},Lt={window_open:"Window open",night_mode:"Night mode",summer:"Summer"},Et={common:xt,extra_states:Lt},Mt={version:"version"},Nt={window_open:"Fenster offen",night_mode:"Nacht modus",summer:"Sommer"},Tt={common:Mt,extra_states:Nt};const Ht={en:Object.freeze({__proto__:null,common:xt,extra_states:Lt,default:Et}),de:Object.freeze({__proto__:null,common:Mt,extra_states:Nt,default:Tt})};function Ot(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||navigator.language).replace(/['"]+/g,"").replace("-","_");let o;try{o=t.split(".").reduce(((t,e)=>t[e]),Ht[s])}catch(e){o=t.split(".").reduce(((t,e)=>t[e]),Ht.en)}return void 0===o&&(o=t.split(".").reduce(((t,e)=>t[e]),Ht.en)),""!==e&&""!==i&&(o=o.replace(e,i)),o}const Vt={auto:"M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z",heat_cool:"M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",heat:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",cool:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",off:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",fan_only:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",dry:"M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",window_open:"M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z",night_mode:"M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",summer:"M10 7C7.2 7 5 9.2 5 12S7.2 17 10 17 15 14.8 15 12 12.8 7 10 7M10 2L12.4 5.4C11.6 5.2 10.8 5 10 5S8.4 5.2 7.6 5.4L10 2M1.3 7L5.5 6.7C4.9 7.2 4.4 7.8 3.9 8.5C3.5 9.2 3.2 10 3.1 10.8L1.3 7M1.4 17L3.2 13.2C3.3 14 3.5 14.8 4 15.5C4.4 16.2 5 16.9 5.5 17.4L1.4 17M10 22L7.6 18.6C8.3 18.8 9.1 19 10 19C10.8 19 11.6 18.8 12.4 18.6L10 22M20.8 13.6V6.8C20.8 5.8 20 5 19 5S17.2 5.8 17.2 6.8V13.6C16.5 14.1 16 15 16 16C16 17.7 17.3 19 19 19S22 17.7 22 16C22 15 21.5 14.1 20.8 13.6M18.2 6.8C18.2 6.3 18.6 6 19 6S19.8 6.3 19.8 6.8V8H18.3V6.8Z"};console.info(`%c  BetterThermostatUI-CARD \n%c  ${Ot("common.version")} 0.0.2    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"better-thermostat-ui-card",name:"Better Thermostat UI Card",description:"A template custom card for you to create something awesome"});let kt=class extends Y{static async getConfigElement(){return document.createElement("better-thermostat-ui-card-editor")}static getStubConfig(t){return Object.keys(t.states).filter((t=>"climate"===t.split(".")[0])),{}}getCardSize(){return 7}setConfig(t){if(!t.entity||"climate"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the climate domain");this._config=t}render(){if(!this.hass||!this._config)return O``;const t=this.hass.states[this._config.entity];if(!t)return O`
            <hui-warning>
              Not found: ${this._config.entity}
            </hui-warning>
          `;const e=t.state in Vt?t.state:"unknown-mode",i=this._config.name||this.computeStateName(this.hass.states[this._config.entity]),s=null!==t.attributes.temperature&&Number.isFinite(Number(t.attributes.temperature))?t.attributes.temperature:t.attributes.min_temp,o="unavailable"===t.state?O` <round-slider disabled="true"></round-slider> `:O`
                <round-slider
                  .value=${s}
                  .low=${t.attributes.target_temp_low}
                  .high=${t.attributes.target_temp_high}
                  .min=${t.attributes.min_temp}
                  .max=${t.attributes.max_temp}
                  .step=${this._stepSize}
                  @value-changing=${this._dragEvent}
                  @value-changed=${this._setTemperature}
                ></round-slider>
              `,n=V`
            <svg viewBox="0 0 40 20">
              <text
                x="50%"
                dx="1"
                y="60%"
                text-anchor="middle"
                style="font-size: 8px;"
              >
                ${null===t.attributes.current_temperature||isNaN(t.attributes.current_temperature)?"":V`${this.formatNumber(t.attributes.current_temperature,this.hass.locale)}
                <tspan dx="-1" dy="-3.5" style="font-size: 4px;">
                  ${this.hass.config.unit_system.temperature}
                </tspan>`}
              </text>
            </svg>
          `,r=V`
          <svg id="set-values">
            <g>
              <text text-anchor="middle" class="set-value">
                ${"unavailable"===t.state?this.hass.localize("state.default.unavailable"):void 0===this._setTemp||null===this._setTemp?"":Array.isArray(this._setTemp)?1===this._stepSize?V`
                          ${this.formatNumber(this._setTemp[0],this.hass.locale,{maximumFractionDigits:0})} -
                          ${this.formatNumber(this._setTemp[1],this.hass.locale,{maximumFractionDigits:0})}
                          `:V`
                          ${this.formatNumber(this._setTemp[0],this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})} -
                          ${this.formatNumber(this._setTemp[1],this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}
                          `:1===this._stepSize?V`
                          ${this.formatNumber(this._setTemp,this.hass.locale,{maximumFractionDigits:0})}
                          `:V`
                          ${this.formatNumber(this._setTemp,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}
                          `}
              </text>
              <text
                dy="22"
                text-anchor="middle"
                id="set-mode"
              >
                ${t.attributes.hvac_action?this.hass.localize(`state_attributes.climate.hvac_action.${t.attributes.hvac_action}`):this.hass.localize(`component.climate.state._.${t.state}`)}
                ${t.attributes.window_open&&"none"!==t.attributes.window_open?O`
                        -
                        ${Ot("extra_states.window_open")}
                      `:""}
                ${t.attributes.night_mode&&"none"!==t.attributes.night_mode?O`
                          -
                          ${Ot("extra_states.night_mode")}
                        `:""}
                ${t.attributes.summer&&"none"!==t.attributes.summer?O`
                        -
                        ${Ot("extra_states.summer")}
                    `:""}
              </text>
            </g>
          </svg>
        `;return setTimeout((()=>this._rescale_svg()),100),O`
          <ha-card
            class=${rt({[e]:!0})}
          >
            <ha-icon-button
              class="more-info"
              .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
              .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
              @click=${this._handleMoreInfo}
              tabindex="0"
            ></ha-icon-button>
            <div class="content">
              <div id="controls">
                <div id="slider" class="${t.attributes.window_open?"window":""}">
                  <div id="title">${i}</div>
                  ${o}
                  <div id="slider-center">
                    <div id="temperature">${n} ${r}</div>
                  </div>
                </div>
              </div>
              <div id="info" .title=${i}>
                <div id="modes">
                  ${(t.attributes.hvac_modes||[]).concat().sort(this.compareClimateHvacModes).map((t=>this._renderIcon(t,e)))}
                </div>
              </div>
            </div>
          </ha-card>
        `}shouldUpdate(t){return!0}updated(t){if(super.updated(t),!this._config||!this.hass||!t.has("hass")&&!t.has("_config"))return;const e=t.get("hass"),i=t.get("_config");e&&i&&e.themes===this.hass.themes&&i.theme===this._config.theme||function(t,e,i,s){void 0===s&&(s=!1),t._themes||(t._themes={});var o=e.default_theme;("default"===i||i&&e.themes[i])&&(o=i);var n=$t({},t._themes);if("default"!==o){var r=e.themes[o];Object.keys(r).forEach((function(e){var i="--"+e;t._themes[i]="",n[i]=r[e]}))}if(t.updateStyles?t.updateStyles(n):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,n),s){var a=document.querySelector("meta[name=theme-color]");if(a){a.hasAttribute("default-content")||a.setAttribute("default-content",a.getAttribute("content"));var l=n["--primary-color"]||a.getAttribute("default-content");a.setAttribute("content",l)}}}(this,this.hass.themes,this._config.theme);const s=this.hass.states[this._config.entity];s&&(e&&e.states[this._config.entity]===s||this._rescale_svg())}willUpdate(t){if(!this.hass||!this._config||!t.has("hass"))return;const e=this.hass.states[this._config.entity];if(!e)return;const i=t.get("hass");i&&i.states[this._config.entity]===e||(this._setTemp=this._getSetTemp(e))}_rescale_svg(){const t=this._card;t&&t.updateComplete.then((()=>{const t=this.shadowRoot.querySelector("#set-values"),e=t.querySelector("g").getBBox();t.setAttribute("viewBox",`${e.x} ${e.y} ${e.width} ${e.height}`),t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`)}))}get _stepSize(){const t=this.hass.states[this._config.entity];return t.attributes.target_temp_step?t.attributes.target_temp_step:"°F"===this.hass.config.unit_system.temperature?1:.5}_getSetTemp(t){if("unavailable"!==t.state)return t.attributes.target_temp_low&&t.attributes.target_temp_high?[t.attributes.target_temp_low,t.attributes.target_temp_high]:t.attributes.temperature}_dragEvent(t){const e=this.hass.states[this._config.entity];t.detail.low?this._setTemp=[t.detail.low,e.attributes.target_temp_high]:t.detail.high?this._setTemp=[e.attributes.target_temp_low,t.detail.high]:this._setTemp=t.detail.value}_setTemperature(t){const e=this.hass.states[this._config.entity];t.detail.low?this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,target_temp_low:t.detail.low,target_temp_high:e.attributes.target_temp_high}):t.detail.high?this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,target_temp_low:e.attributes.target_temp_low,target_temp_high:t.detail.high}):this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:t.detail.value})}_getExtraStatus(){const t=this.hass.states[this._config.entity],e={window_open:t.attributes.window_open,night_mode:t.attributes.night_mode,summer:t.attributes.summer},i=Object.entries(e).filter((([,t])=>!0===t));return Object.keys(Object.fromEntries(i))}_renderStatusIcon(t){return Vt[t]?O`
          <ha-svg-icon
            class="test"
            tabindex="0"
            .path=${Vt[t]}
            .label=${this.hass.localize(`component.climate.extra_state._.${t}`)}
          >
          </ha-svg-icon>
        `:O``}_renderIcon(t,e){return Vt[t]?O`
          <ha-icon-button
            class=${rt({"selected-icon":e===t})}
            .mode=${t}
            @click=${this._handleAction}
            tabindex="0"
            .path=${Vt[t]}
            .label=${this.hass.localize(`component.climate.state._.${t}`)}
          >
          </ha-icon-button>
        `:O``}_handleMoreInfo(){wt(this,"hass-more-info",{entityId:this._config.entity})}_handleAction(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t.currentTarget.mode})}hasConfigChanged(t,e){if(e.has("_config"))return!0;const i=e.get("hass");return!i||(i.connected!==t.hass.connected||i.themes!==t.hass.themes||i.locale!==t.hass.locale||i.localize!==t.hass.localize||i.config.state!==t.hass.config.state)}hasConfigOrEntityChanged(t,e){if(this.hasConfigChanged(t,e))return!0;return e.get("hass").states[t._config.entity]!==t.hass.states[t._config.entity]}compareClimateHvacModes(t,e){const i={auto:1,heat_cool:2,heat:3,cool:4,dry:5,fan_only:6,off:7};return i[t]-i[e]}computeObjectId(t){return t.substr(t.indexOf(".")+1)}computeStateName(t){return void 0===t.attributes.friendly_name?this.computeObjectId(t.entity_id).replace(/_/g," "):t.attributes.friendly_name||""}numberFormatToLocale(t){switch(t.number_format){case bt.comma_decimal:return["en-US","en"];case bt.decimal_comma:return["de","es","it"];case bt.space_comma:return["fr","sv","cs"];case bt.system:return;default:return t.language}}getDefaultFormatOptions(t,e){const i=Object.assign({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){const e=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=e,i.maximumFractionDigits=e}return i}round(t,e=2){return Math.round(t*10**e)/10**e}formatNumber(t,e,i){const s=e?this.numberFormatToLocale(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==bt.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(s,this.getDefaultFormatOptions(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,this.getDefaultFormatOptions(t,i)).format(Number(t))}return"string"==typeof t?t:`${this.round(t,null==i?void 0:i.maximumFractionDigits).toString()}${"currency"===(null==i?void 0:i.style)?` ${i.currency}`:""}`}static get styles(){return n`
          :host {
            display: block;
          }
          ha-card {
            height: 100%;
            position: relative;
            overflow: hidden;
            --name-font-size: 1.2rem;
            --brightness-font-size: 1.2rem;
            --rail-border-color: transparent;
          }
          .auto,
          .heat_cool {
            --mode-color: var(--state-climate-auto-color);
          }
          .cool {
            --mode-color: var(--state-climate-cool-color);
          }
          .heat {
            --mode-color: var(--state-climate-heat-color);
          }
          .manual {
            --mode-color: var(--state-climate-manual-color);
          }
          .off {
            --mode-color: var(--state-climate-off-color);
          }
          .fan_only {
            --mode-color: var(--state-climate-fan_only-color);
          }
          .eco {
            --mode-color: var(--state-climate-eco-color);
          }
          .dry {
            --mode-color: var(--state-climate-dry-color);
          }
          .idle {
            --mode-color: var(--state-climate-idle-color);
          }
          .unknown-mode {
            --mode-color: var(--state-unknown-color);
          }
          .more-info {
            position: absolute;
            cursor: pointer;
            top: 0;
            right: 0;
            border-radius: 100%;
            color: var(--secondary-text-color);
            z-index: 1;
          }
          .content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          #controls {
            display: flex;
            justify-content: center;
            padding: 16px;
            position: relative;
          }
          #slider {
            height: 100%;
            width: 100%;
            position: relative;
            max-width: 250px;
            min-width: 100px;
          }
          #title {
            text-align: center;
            padding: 1em;
          }
          round-slider {
            --round-slider-path-color: var(--slider-track-color);
            --round-slider-bar-color: var(--mode-color);
            padding-bottom: 10%;
            position: relative;
          }
          .window round-slider {
            --round-slider-bar-color: #00bcd461 !important;
          }
          #slider-center {
            position: absolute;
            box-sizing: border-box;
            border-radius: 100%;
            left: 50%;
            top: 50%;
            text-align: center;
            overflow-wrap: break-word;
            pointer-events: none;
            height: 100%;
            width: 100%;
            transform: translate(-50%, -43%);
          }
          #temperature {
            position: absolute;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 50%;
            top: 50%;
            left: 50%;
          }
          #set-values {
            max-width: 80%;
            transform: translate(0, -40%);
            font-size: 14px;
          }
          #set-mode {
            fill: var(--secondary-text-color);
            font-size: 16px;
          }
          #info {
            display: flex-vertical;
            justify-content: center;
            text-align: center;
            padding: 16px;
            margin-top: -60px;
            font-size: var(--name-font-size);
          }
          #modes > * {
            color: var(--disabled-text-color);
            cursor: pointer;
            display: inline-block;
          }
          #modes .selected-icon {
            color: var(--mode-color);
          }
          text {
            fill: var(--primary-text-color);
          }
        `}};t([st({attribute:!1})],kt.prototype,"hass",void 0),t([ot()],kt.prototype,"_config",void 0),t([ot()],kt.prototype,"_setTemp",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t,e){return(({finisher:t,descriptor:e})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,n=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(n.finisher=function(e){t(e,s)}),n}{const o=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(o,s)}})({descriptor:i=>{const s={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[e]&&(this[e]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null),this[e]}}return s}})}("ha-card")],kt.prototype,"_card",void 0),kt=t([et("better-thermostat-ui-card")],kt);export{kt as BetterThermostatUiCard};
