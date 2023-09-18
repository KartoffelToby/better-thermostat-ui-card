function t(t,e,i,o){var r,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(s=(n<3?r(s):n>3?r(e,i,s):r(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;class n{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}}const s=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new n(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},m=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:m},f="finalized";class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))})),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const r=this[t];this[e]=o,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const o=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{i?t.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):o.forEach((i=>{const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o)}))})(o,this.constructor.elementStyles),o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var o;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,r=o._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=o.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||m)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;_[f]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:_}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const b=window,y=b.trustedTypes,w=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,C="?"+$,A=`<${C}>`,k=document,E=()=>k.createComment(""),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,L="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,P=/>/g,O=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,z=/"/g,D=/^(?:script|style|textarea|title)$/i,N=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),R=N(1),H=N(2),j=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),U=new WeakMap,B=k.createTreeWalker(k,129,null,!1);function W(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let r,n=2===e?"<svg>":"",s=M;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(s.lastIndex=d,l=s.exec(i),null!==l);)d=s.lastIndex,s===M?"!--"===l[1]?s=I:void 0!==l[1]?s=P:void 0!==l[2]?(D.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=O):void 0!==l[3]&&(s=O):s===O?">"===l[0]?(s=null!=r?r:M,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?O:'"'===l[3]?z:V):s===z||s===V?s=O:s===I||s===P?s=M:(s=O,r=void 0);const h=s===O&&t[e+1].startsWith("/>")?" ":"";n+=s===M?i+A:c>=0?(o.push(a),i.slice(0,c)+x+i.slice(c)+$+h):i+$+(-2===c?(o.push(void 0),e):h)}return[W(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),o]};class q{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,n=0;const s=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=q.createElement(l,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=B.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(x)||e.startsWith($)){const i=c[n++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+x).split($),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?tt:"@"===e[1]?et:G})}else a.push({type:6,index:r})}for(const e of t)o.removeAttribute(e)}if(D.test(o.tagName)){const t=o.textContent.split($),e=t.length-1;if(e>0){o.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],E()),B.nextNode(),a.push({type:2,index:++r});o.append(t[e],E())}}}else if(8===o.nodeType)if(o.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf($,t+1));)a.push({type:7,index:r}),t+=$.length-1}r++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){var r,n,s,a;if(e===j)return e;let l=void 0!==o?null===(r=i._$Co)||void 0===r?void 0:r[o]:i._$Cl;const c=S(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,o)),void 0!==o?(null!==(s=(a=i)._$Co)&&void 0!==s?s:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(e=X(t,l._$AS(t,e.values),l,o)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(i,!0);B.currentNode=r;let n=B.nextNode(),s=0,a=0,l=o[0];for(;void 0!==l;){if(s===l.index){let e;2===l.type?e=new K(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new it(n,this,t)),this._$AV.push(e),l=o[++a]}s!==(null==l?void 0:l.index)&&(n=B.nextNode(),s++)}return B.currentNode=k,r}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,o){var r;this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(r=null==o?void 0:o.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),S(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==F&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=q.createElement(W(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.v(i);else{const t=new Z(r,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new q(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new K(this.k(E()),this.k(E()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,i,o,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const r=this.strings;let n=!1;if(void 0===r)t=X(this,t,e,0),n=!S(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const o=t;let s,a;for(t=r[0],s=0;s<r.length-1;s++)a=X(this,o[i+s],e,s),a===j&&(a=this._$AH[s]),n||(n=!S(a)||a!==this._$AH[s]),a===F?t=F:t!==F&&(t+=(null!=a?a:"")+r[s+1]),this._$AH[s]=a}n&&!o&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}const Q=y?y.emptyScript:"";class tt extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==F?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class et extends G{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=X(this,t,e,0))&&void 0!==i?i:F)===j)return;const o=this._$AH,r=t===F&&o!==F||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==F&&(o===F||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot=b.litHtmlPolyfillSupport;null==ot||ot(q,K),(null!==(g=b.litHtmlVersions)&&void 0!==g?g:b.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt,nt;class st extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,r;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let s=n._$litPart$;if(void 0===s){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=s=new K(e.insertBefore(E(),t),t,void 0,null!=i?i:{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return j}}st.finalized=!0,st._$litElement$=!0,null===(rt=globalThis.litElementHydrateSupport)||void 0===rt||rt.call(globalThis,{LitElement:st});const at=globalThis.litElementPolyfillSupport;null==at||at({LitElement:st}),(null!==(nt=globalThis.litElementVersions)&&void 0!==nt?nt:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ct=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}},dt=(t,e,i)=>{e.constructor.createProperty(i,t)};function ht(t){return(e,i)=>void 0!==i?dt(t,e,i):ct(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ut(t){return ht({...t,state:!0})}
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
function pt(t,e){return(({finisher:t,descriptor:e})=>(i,o)=>{var r;if(void 0===o){const o=null!==(r=i.originalKey)&&void 0!==r?r:i.key,n=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(n.finisher=function(e){t(e,o)}),n}{const r=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(r,o)}})({descriptor:i=>{const o={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;o.get=function(){var i,o;return void 0===this[e]&&(this[e]=null!==(o=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==o?o:null),this[e]}}return o}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var mt;null===(mt=window.HTMLSlotElement)||void 0===mt||mt.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt=1;class ft{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ft{constructor(t){var e;if(super(t),t.type!==vt||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(t))&&this.it.add(t);return this.render(e)}const r=t.element.classList;this.it.forEach((t=>{t in e||(r.remove(t),this.it.delete(t))}));for(const t in e){const i=!!e[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(r.add(t),this.it.add(t)):(r.remove(t),this.it.delete(t)))}return j}});var gt="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4",bt="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5C10.8 5 11.6 5.2 12.4 5.4M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19C20.66 19 22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12C5 14.8 7.2 17 10 17C12.8 17 15 14.8 15 12C15 9.2 12.8 7 10 7M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z",yt="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",wt="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var xt={version:"version",current:"current"},$t={card:{climate:{disable_window:"Disable window",disable_summer:"Disable summer",disable_eco:"Disable eco",disable_heat:"Disable heat",disable_off:"Disable off",disable_menu:"Disable menu",disable_battery_warning:"Disable battery warning",disable_buttons:"Disable plus/minus buttons",eco_temperature:"Eco temperature",set_current_as_main:"Swap target with current temperature places"}}},Ct={window_open:"Window open",night_mode:"Night mode",eco:"Eco",summer:"Summer"},At={common:xt,editor:$t,extra_states:Ct},kt=Object.freeze({__proto__:null,common:xt,editor:$t,extra_states:Ct,default:At}),Et={version:"Version",current:"Aktuell"},St={card:{climate:{disable_window:"Fenster-offen-Anzeige deaktivieren",disable_summer:"Sommer-Anzeige deaktivieren",disable_eco:"Eco-Anzeige deaktivieren",disable_heat:"Heiz-Anzeige deaktivieren",disable_off:"Aus-Anzeige deaktivieren",disable_menu:"Menü deaktivieren",disable_battery_warning:"Batterie-Warnung deaktivieren",disable_buttons:"Plus/Minus Buttons deaktivieren",eco_temperature:"Eco Temperatur",set_current_as_main:"Zieltemperatur mit aktueller Temperatur tauschen"}}},Tt={window_open:"Fenster offen",night_mode:"Nachtmodus",eco:"Eco",summer:"Sommer"},Lt={common:Et,editor:St,extra_states:Tt},Mt=Object.freeze({__proto__:null,common:Et,editor:St,extra_states:Tt,default:Lt}),It={version:"version",current:"Actuelle"},Pt={card:{climate:{disable_window:"Desactiver fenêtre",disable_summer:"Desactiver été",disable_eco:"Desactiver mode eco",disable_heat:"Desactiver mode chauffe",disable_off:"Desactiver arret",eco_temperature:"Temperature Eco",set_current_as_main:"Echanger temperature cible avec temperature locale"}}},Ot={window_open:"Fenêtre ouverte",night_mode:"Mode nuit",eco:"Eco",summer:"Été"},Vt={common:It,editor:Pt,extra_states:Ot},zt=Object.freeze({__proto__:null,common:It,editor:Pt,extra_states:Ot,default:Vt}),Dt={version:"версия",current:"текущий"},Nt={window_open:"Окно открыто",night_mode:"Ночной режим",eco:"Эко",summer:"Лето"},Rt={common:Dt,extra_states:Nt},Ht=Object.freeze({__proto__:null,common:Dt,extra_states:Nt,default:Rt}),jt={version:"wersja",current:"aktualna"},Ft={window_open:"otwarte okno",night_mode:"tryb nocny",eco:"tryb ekonomiczny",summer:"lato"},Ut={common:jt,extra_states:Ft},Bt=Object.freeze({__proto__:null,common:jt,extra_states:Ft,default:Ut}),Wt={version:"verzia",current:"aktuálny"},Yt={card:{climate:{disable_window:"Zakázať okno",disable_summer:"Zakázať leto",disable_eco:"Zakázať eco",disable_heat:"Zakázať kúrenie",disable_off:"Vypnúť",eco_temperature:"Eco teplota",set_current_as_main:"Vymeňte cieľ za miesta s aktuálnou teplotou"}}},qt={window_open:"Okno otvorené",night_mode:"Nočný mód",eco:"Eco",summer:"Leto"},Xt={common:Wt,editor:Yt,extra_states:qt},Zt={version:"Verzió",current:"Aktuális"},Kt={card:{climate:{disable_window:"Ablak kikapcsolás",disable_summer:"Nyár kikapcsolás",disable_eco:"Eco kikapcsolás",disable_heat:"Fűtés kikacsolás",disable_off:"Kikapcsolás inaktiválás",eco_temperature:"Eco hőmérséklet",set_current_as_main:"Aktuális hőmérséklet használata"}}},Gt={window_open:"Ablak nyitva",night_mode:"Éjszakai mód",eco:"Eco",summer:"Nyár"},Jt={common:Zt,editor:Kt,extra_states:Gt},Qt={version:"version",current:"nuværende"},te={window_open:"Vindue åben",night_mode:"Nattilstand",eco:"Eco",summer:"Sommer"},ee={common:Qt,extra_states:te},ie={version:"version",current:"Actual"},oe={window_open:"Ventana abierta",night_mode:"Modo noche",eco:"Eco",summer:"Verano"},re={common:ie,extra_states:oe},ne={version:"versiyon",current:"şimdiki"},se={window_open:"Pencere açık",night_mode:"Gece modu",eco:"Eco",summer:"Yaz"},ae={common:ne,extra_states:se},le={version:"versione",current:"Corrente"},ce={card:{climate:{disable_window:"Disabilita indicatore Finestra",disable_summer:"Disabilita indicatore Estate",disable_eco:"Disabilita tasto eco",disable_heat:"Disabilita tasto heat",disable_off:"Disabililita tasto off",eco_temperature:"Temperatura target",set_current_as_main:"Imposta la temperatura attuale come target"}}},de={window_open:"Finestra aperta",night_mode:"Modalità notturna",eco:"Eco",summer:"Estate"},he={common:le,editor:ce,extra_states:de},ue={version:"versão",current:"actual"},pe={card:{climate:{disable_window:"Desactivar Janela",disable_summer:"Desactivar Verão",disable_eco:"Desactivar Eco",disable_heat:"Desactivar Aquecimento",disable_off:"Desactivar Off",eco_temperature:"Modo Eco",set_current_as_main:"Mudar para a temperatura local actual"}}},me={window_open:"Janela Aberta",night_mode:"Modo Noturno",eco:"Eco",summer:"Verão"},ve={common:ue,editor:pe,extra_states:me},fe={version:"版本",current:"当前"},_e={window_open:"窗户打开",night_mode:"夜间模式",eco:"节能",summer:"夏季"},ge={common:fe,extra_states:_e},be={version:"версія",current:"поточний"},ye={window_open:"Вікно відчинено",night_mode:"Нічний режим",eco:"Економія",summer:"Літо"},we={common:be,extra_states:ye},xe={version:"έκδοση",current:"τρέχουσα"},$e={window_open:"Παράθυρο ανοικτό",night_mode:"Λειτουργία νυκτός",eco:"Εξοικονόμηση",summer:"Καλοκαίρι"},Ce={common:xe,extra_states:$e},Ae={version:"versie",current:"huidig"},ke={window_open:"Raam open",night_mode:"Nacht modus",eco:"Eco",summer:"Zomer"},Ee={common:Ae,extra_states:ke},Se={version:"versjon",current:"nåværende"},Te={window_open:"Vindu åpent",night_mode:"Nattmodus",eco:"Eco",summer:"Sommer"},Le={common:Se,extra_states:Te},Me={version:"verze",current:"aktuální"},Ie={window_open:"Otevřené okno",night_mode:"Noční režim",eco:"Eco",summer:"Léto"},Pe={common:Me,extra_states:Ie},Oe={version:"različica",current:"trenutno"},Ve={window_open:"Okno odprto",night_mode:"Nočni način",eco:"Eko",summer:"Poletje"},ze={common:Oe,extra_states:Ve},De={version:"version",current:"Nuvarande"},Ne={window_open:"Fönster öppet",night_mode:"Nattläge",eco:"Eco",summer:"Sommar"},Re={common:De,extra_states:Ne},He={version:"версия",currrent:"текущий"},je={window_open:"Отворен прозорец",night_mode:"Нощен режим",eco:"Екологичен режим",summer:"Лято"},Fe={common:He,extra_states:je},Ue={version:"version",current:"Nykyinen"},Be={window_open:"Ikkuna auki",night_mode:"Yötila",eco:"Eco",summer:"Kesä"},We={common:Ue,extra_states:Be},Ye={version:"versiune",current:"curent"},qe={window_open:"Fereastră deschisă",night_mode:"Mod noapte",eco:"Eco",summer:"Vară"},Xe={common:Ye,extra_states:qe},Ze={version:"versió",current:"Actual"},Ke={window_open:"Finestra oberta",night_mode:"Mode nocturn",eco:"Eco",summer:"Estiu"},Ge={common:Ze,extra_states:Ke};const Je={en:kt,de:Mt,fr:zt,ru:Ht,sk:Object.freeze({__proto__:null,common:Wt,editor:Yt,extra_states:qt,default:Xt}),hu:Object.freeze({__proto__:null,common:Zt,editor:Kt,extra_states:Gt,default:Jt}),pl:Bt,da:Object.freeze({__proto__:null,common:Qt,extra_states:te,default:ee}),es:Object.freeze({__proto__:null,common:ie,extra_states:oe,default:re}),tr:Object.freeze({__proto__:null,common:ne,extra_states:se,default:ae}),it:Object.freeze({__proto__:null,common:le,editor:ce,extra_states:de,default:he}),pt:Object.freeze({__proto__:null,common:ue,editor:pe,extra_states:me,default:ve}),cn:Object.freeze({__proto__:null,common:fe,extra_states:_e,default:ge}),uk:Object.freeze({__proto__:null,common:be,extra_states:ye,default:we}),el:Object.freeze({__proto__:null,common:xe,extra_states:$e,default:Ce}),nl:Object.freeze({__proto__:null,common:Ae,extra_states:ke,default:Ee}),no:Object.freeze({__proto__:null,common:Se,extra_states:Te,default:Le}),cs:Object.freeze({__proto__:null,common:Me,extra_states:Ie,default:Pe}),sl:Object.freeze({__proto__:null,common:Oe,extra_states:Ve,default:ze}),sv:Object.freeze({__proto__:null,common:De,extra_states:Ne,default:Re}),bg:Object.freeze({__proto__:null,common:He,extra_states:je,default:Fe}),fi:Object.freeze({__proto__:null,common:Ue,extra_states:Be,default:We}),ro:Object.freeze({__proto__:null,common:Ye,extra_states:qe,default:Xe}),ca:Object.freeze({__proto__:null,common:Ze,extra_states:Ke,default:Ge})},Qe="en";function ti({hass:t,string:e,search:i="",replace:o=""}){var r;const n=null!==(r=null==t?void 0:t.locale.language)&&void 0!==r?r:Qe;let s;try{s=e.split(".").reduce(((t,e)=>t[e]),Je[n])}catch(t){s=e.split(".").reduce(((t,e)=>t[e]),Je.en)}return void 0===s&&(s=e.split(".").reduce(((t,e)=>t[e]),Je.en)),""!==i&&""!==o&&(s=s.replace(i,o)),s}function ei(t,e){try{return t.split(".").reduce(((t,e)=>t[e]),Je[e])}catch(t){return}}var ii,oi,ri=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function ni(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(o=t[i],r=e[i],!(o===r||ri(o)&&ri(r)))return!1;var o,r;return!0}function si(t,e){void 0===e&&(e=ni);var i=null;function o(){for(var o=[],r=0;r<arguments.length;r++)o[r]=arguments[r];if(i&&i.lastThis===this&&e(o,i.lastArgs))return i.lastResult;var n=t.apply(this,o);return i={lastResult:n,lastArgs:o,lastThis:this},n}return o.clear=function(){i=null},o}si((t=>new Intl.DateTimeFormat(t.language,{weekday:"long",month:"long",day:"numeric"}))),si((t=>new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"}))),si((t=>new Intl.DateTimeFormat(t.language,{year:"numeric",month:"numeric",day:"numeric"}))),si((t=>new Intl.DateTimeFormat(t.language,{day:"numeric",month:"short"}))),si((t=>new Intl.DateTimeFormat(t.language,{month:"long",year:"numeric"}))),si((t=>new Intl.DateTimeFormat(t.language,{month:"long"}))),si((t=>new Intl.DateTimeFormat(t.language,{year:"numeric"}))),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ii||(ii={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(oi||(oi={}));const ai=si((t=>{if(t.time_format===oi.language||t.time_format===oi.system){const e=t.time_format===oi.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===oi.am_pm}));si((t=>new Intl.DateTimeFormat("en"!==t.language||ai(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"long",day:"numeric",hour:ai(t)?"numeric":"2-digit",minute:"2-digit",hour12:ai(t)}))),si((t=>new Intl.DateTimeFormat("en"!==t.language||ai(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"long",day:"numeric",hour:ai(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:ai(t)}))),si((t=>new Intl.DateTimeFormat("en"!==t.language||ai(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:ai(t)}))),si((t=>new Intl.DateTimeFormat("en"!==t.language||ai(t)?t.language:"en-u-hc-h23",{hour:"numeric",minute:"2-digit",hour12:ai(t)}))),si((t=>new Intl.DateTimeFormat("en"!==t.language||ai(t)?t.language:"en-u-hc-h23",{hour:ai(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:ai(t)}))),si((t=>new Intl.DateTimeFormat("en"!==t.language||ai(t)?t.language:"en-u-hc-h23",{weekday:"long",hour:ai(t)?"numeric":"2-digit",minute:"2-digit",hour12:ai(t)})));const li=(t,e,i,o)=>{o=o||{},i=null==i?{}:i;const r=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return r.detail=i,t.dispatchEvent(r),r},ci=(t,e,i)=>{const o=e?(t=>{switch(t.number_format){case ii.comma_decimal:return["en-US","en"];case ii.decimal_comma:return["de","es","it"];case ii.space_comma:return["fr","sv","cs"];case ii.system:return;default:return t.language}})(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==ii.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(o,di(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,di(t,i)).format(Number(t))}return"string"==typeof t?t:`${((t,e=2)=>Math.round(t*10**e)/10**e)(t,null==i?void 0:i.maximumFractionDigits).toString()}${"currency"===(null==i?void 0:i.style)?` ${i.currency}`:""}`},di=(t,e)=>{const i=Object.assign({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){const e=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=e,i.maximumFractionDigits=e}return i};class hi extends TypeError{constructor(t,e){let i;const{message:o,...r}=t,{path:n}=t;super(0===n.length?o:"At path: "+n.join(".")+" -- "+o),this.value=void 0,this.key=void 0,this.type=void 0,this.refinement=void 0,this.path=void 0,this.branch=void 0,this.failures=void 0,Object.assign(this,r),this.name=this.constructor.name,this.failures=()=>{var o;return null!=(o=i)?o:i=[t,...e()]}}}function ui(t){return"object"==typeof t&&null!=t}function pi(t){return"string"==typeof t?JSON.stringify(t):""+t}function mi(t,e,i,o){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:r,branch:n}=e,{type:s}=i,{refinement:a,message:l="Expected a value of type `"+s+"`"+(a?" with refinement `"+a+"`":"")+", but received: `"+pi(o)+"`"}=t;return{value:o,type:s,refinement:a,key:r[r.length-1],path:r,branch:n,...t,message:l}}function*vi(t,e,i,o){(function(t){return ui(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const r of t){const t=mi(r,e,i,o);t&&(yield t)}}function*fi(t,e,i){void 0===i&&(i={});const{path:o=[],branch:r=[t],coerce:n=!1,mask:s=!1}=i,a={path:o,branch:r};if(n&&(t=e.coercer(t,a),s&&"type"!==e.type&&ui(e.schema)&&ui(t)&&!Array.isArray(t)))for(const i in t)void 0===e.schema[i]&&delete t[i];let l=!0;for(const i of e.validator(t,a))l=!1,yield[i,void 0];for(let[i,c,d]of e.entries(t,a)){const e=fi(c,d,{path:void 0===i?o:[...o,i],branch:void 0===i?r:[...r,c],coerce:n,mask:s});for(const o of e)o[0]?(l=!1,yield[o[0],void 0]):n&&(c=o[1],void 0===i?t=c:t instanceof Map?t.set(i,c):t instanceof Set?t.add(c):ui(t)&&(t[i]=c))}if(l)for(const i of e.refiner(t,a))l=!1,yield[i,void 0];l&&(yield[void 0,t])}class _i{constructor(t){this.TYPE=void 0,this.type=void 0,this.schema=void 0,this.coercer=void 0,this.validator=void 0,this.refiner=void 0,this.entries=void 0;const{type:e,schema:i,validator:o,refiner:r,coercer:n=(t=>t),entries:s=function*(){}}=t;this.type=e,this.schema=i,this.entries=s,this.coercer=n,this.validator=o?(t,e)=>vi(o(t,e),e,this,t):()=>[],this.refiner=r?(t,e)=>vi(r(t,e),e,this,t):()=>[]}assert(t){return gi(t,this)}create(t){return function(t,e){const i=bi(t,e,{coerce:!0});if(i[0])throw i[0];return i[1]}(t,this)}is(t){return function(t,e){const i=bi(t,e);return!i[0]}(t,this)}mask(t){return function(t,e){const i=bi(t,e,{coerce:!0,mask:!0});if(i[0])throw i[0];return i[1]}(t,this)}validate(t,e){return void 0===e&&(e={}),bi(t,this,e)}}function gi(t,e){const i=bi(t,e);if(i[0])throw i[0]}function bi(t,e,i){void 0===i&&(i={});const o=fi(t,e,i),r=function(t){const{done:e,value:i}=t.next();return e?void 0:i}(o);if(r[0]){const t=new hi(r[0],(function*(){for(const t of o)t[0]&&(yield t[0])}));return[t,void 0]}return[void 0,r[1]]}function yi(t,e){return new _i({type:t,schema:null,validator:e})}function wi(t){return new _i({type:"array",schema:t,*entries(e){if(t&&Array.isArray(e))for(const[i,o]of e.entries())yield[i,o,t]},coercer:t=>Array.isArray(t)?t.slice():t,validator:t=>Array.isArray(t)||"Expected an array value, but received: "+pi(t)})}function xi(){return yi("boolean",(t=>"boolean"==typeof t))}function $i(t){const e=pi(t),i=typeof t;return new _i({type:"literal",schema:"string"===i||"number"===i||"boolean"===i?t:null,validator:i=>i===t||"Expected the literal `"+e+"`, but received: "+pi(i)})}function Ci(){return yi("number",(t=>"number"==typeof t&&!isNaN(t)||"Expected a number, but received: "+pi(t)))}function Ai(t){const e=t?Object.keys(t):[],i=yi("never",(()=>!1));return new _i({type:"object",schema:t||null,*entries(o){if(t&&ui(o)){const r=new Set(Object.keys(o));for(const i of e)r.delete(i),yield[i,o[i],t[i]];for(const t of r)yield[t,o[t],i]}},validator:t=>ui(t)||"Expected an object, but received: "+pi(t),coercer:t=>ui(t)?{...t}:t})}function ki(t){return new _i({...t,validator:(e,i)=>void 0===e||t.validator(e,i),refiner:(e,i)=>void 0===e||t.refiner(e,i)})}function Ei(){return yi("string",(t=>"string"==typeof t||"Expected a string, but received: "+pi(t)))}function Si(t){const e=Object.keys(t);return new _i({type:"type",schema:t,*entries(i){if(ui(i))for(const o of e)yield[o,i[o],t[o]]},validator:t=>ui(t)||"Expected an object, but received: "+pi(t)})}function Ti(t){const e=t.map((t=>t.type)).join(" | ");return new _i({type:"union",schema:null,coercer(e,i){const o=t.find((t=>{const[i]=t.validate(e,{coerce:!0});return!i}))||yi("unknown",(()=>!0));return o.coercer(e,i)},validator(i,o){const r=[];for(const e of t){const[...t]=fi(i,e,o),[n]=t;if(!n[0])return[];for(const[e]of t)e&&r.push(e)}return["Expected the value to satisfy a union of `"+e+"`, but received: "+pi(i),...r]}})}const Li=Ai({user:Ei()}),Mi=Ti([xi(),Ai({text:ki(Ei()),excemptions:ki(wi(Li))})]),Ii=Ai({action:$i("url"),url_path:Ei(),confirmation:ki(Mi)}),Pi=Ai({action:$i("call-service"),service:Ei(),service_data:ki(Ai()),data:ki(Ai()),target:ki(Ai({entity_id:ki(Ti([Ei(),wi(Ei())])),device_id:ki(Ti([Ei(),wi(Ei())])),area_id:ki(Ti([Ei(),wi(Ei())]))})),confirmation:ki(Mi)}),Oi=Ai({action:$i("navigate"),navigation_path:Ei(),confirmation:ki(Mi)}),Vi=Si({action:$i("fire-dom-event")}),zi=Ai({action:function(t){const e={},i=t.map((t=>pi(t))).join();for(const i of t)e[i]=i;return new _i({type:"enums",schema:e,validator:e=>t.includes(e)||"Expected one of `"+i+"`, but received: "+pi(e)})}(["none","toggle","more-info","call-service","url","navigate"]),confirmation:ki(Mi)});var Di;Di=t=>{if(t&&"object"==typeof t&&"action"in t)switch(t.action){case"call-service":return Pi;case"fire-dom-event":return Vi;case"navigate":return Oi;case"url":return Ii}return zi},new _i({type:"dynamic",schema:null,*entries(t,e){const i=Di(t,e);yield*i.entries(t,e)},validator:(t,e)=>Di(t,e).validator(t,e),coercer:(t,e)=>Di(t,e).coercer(t,e),refiner:(t,e)=>Di(t,e).refiner(t,e)}),s`
    #sortable a:nth-of-type(2n) paper-icon-item {
        animation-name: keyframes1;
        animation-iteration-count: infinite;
        transform-origin: 50% 10%;
        animation-delay: -0.75s;
        animation-duration: 0.25s;
    }

    #sortable a:nth-of-type(2n-1) paper-icon-item {
        animation-name: keyframes2;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        transform-origin: 30% 5%;
        animation-delay: -0.5s;
        animation-duration: 0.33s;
    }

    #sortable a {
        height: 48px;
        display: flex;
    }

    #sortable {
        outline: none;
        display: block !important;
    }

    .hidden-panel {
        display: flex !important;
    }

    .sortable-fallback {
        display: none;
    }

    .sortable-ghost {
        opacity: 0.4;
    }

    .sortable-fallback {
        opacity: 0;
    }

    @keyframes keyframes1 {
        0% {
            transform: rotate(-1deg);
            animation-timing-function: ease-in;
        }

        50% {
            transform: rotate(1.5deg);
            animation-timing-function: ease-out;
        }
    }

    @keyframes keyframes2 {
        0% {
            transform: rotate(1deg);
            animation-timing-function: ease-in;
        }

        50% {
            transform: rotate(-1.5deg);
            animation-timing-function: ease-out;
        }
    }

    .show-panel,
    .hide-panel {
        display: none;
        position: absolute;
        top: 0;
        right: 4px;
        --mdc-icon-button-size: 40px;
    }

    :host([rtl]) .show-panel {
        right: initial;
        left: 4px;
    }

    .hide-panel {
        top: 4px;
        right: 8px;
    }

    :host([rtl]) .hide-panel {
        right: initial;
        left: 8px;
    }

    :host([expanded]) .hide-panel {
        display: block;
    }

    :host([expanded]) .show-panel {
        display: inline-flex;
    }

    paper-icon-item.hidden-panel,
    paper-icon-item.hidden-panel span,
    paper-icon-item.hidden-panel ha-icon[slot="item-icon"] {
        color: var(--secondary-text-color);
        cursor: pointer;
    }
`;const Ni=([[t,e],[i,o]],[r,n])=>[t*r+e*n,i*r+o*n],Ri=([t,e],[i,o])=>[t+i,e+o],Hi=t=>t/180*Math.PI,ji=t=>{const{x:e,y:i,r:o,start:r,end:n,rotate:s=0}=t,a=e,l=i,c=o,d=o,h=Hi(r),u=(Hi(n)-h)%(2*Math.PI),p=Hi(s),m=(t=>[[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]])(p),[v,f]=Ri(Ni(m,[c*Math.cos(h),d*Math.sin(h)]),[a,l]),[_,g]=Ri(Ni(m,[c*Math.cos(h+u),d*Math.sin(h+u)]),[a,l]),b=u>Math.PI?1:0,y=u>0?1:0;return["M",v,f,"A",c,d,p/(2*Math.PI)*360,b,y,_,g].join(" ")};function Fi(){return Fi=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t},Fi.apply(this,arguments)}function Ui(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function Bi(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var Wi,Yi="function"!=typeof Object.assign?function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var o=arguments[i];if(null!=o)for(var r in o)o.hasOwnProperty(r)&&(e[r]=o[r])}return e}:Object.assign,qi=["","webkit","Moz","MS","ms","o"],Xi="undefined"==typeof document?{style:{}}:document.createElement("div"),Zi=Math.round,Ki=Math.abs,Gi=Date.now;function Ji(t,e){for(var i,o,r=e[0].toUpperCase()+e.slice(1),n=0;n<qi.length;){if((o=(i=qi[n])?i+r:e)in t)return o;n++}}Wi="undefined"==typeof window?{}:window;var Qi=Ji(Xi.style,"touchAction"),to=void 0!==Qi;var eo="compute",io="auto",oo="manipulation",ro="none",no="pan-x",so="pan-y",ao=function(){if(!to)return!1;var t={},e=Wi.CSS&&Wi.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach((function(i){return t[i]=!e||Wi.CSS.supports("touch-action",i)})),t}(),lo="ontouchstart"in Wi,co=void 0!==Ji(Wi,"PointerEvent"),ho=lo&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),uo="touch",po="mouse",mo=25,vo=1,fo=4,_o=8,go=1,bo=2,yo=4,wo=8,xo=16,$o=bo|yo,Co=wo|xo,Ao=$o|Co,ko=["x","y"],Eo=["clientX","clientY"];function So(t,e,i){var o;if(t)if(t.forEach)t.forEach(e,i);else if(void 0!==t.length)for(o=0;o<t.length;)e.call(i,t[o],o,t),o++;else for(o in t)t.hasOwnProperty(o)&&e.call(i,t[o],o,t)}function To(t,e){return"function"==typeof t?t.apply(e&&e[0]||void 0,e):t}function Lo(t,e){return t.indexOf(e)>-1}var Mo=function(){function t(t,e){this.manager=t,this.set(e)}var e=t.prototype;return e.set=function(t){t===eo&&(t=this.compute()),to&&this.manager.element.style&&ao[t]&&(this.manager.element.style[Qi]=t),this.actions=t.toLowerCase().trim()},e.update=function(){this.set(this.manager.options.touchAction)},e.compute=function(){var t=[];return So(this.manager.recognizers,(function(e){To(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))})),function(t){if(Lo(t,ro))return ro;var e=Lo(t,no),i=Lo(t,so);return e&&i?ro:e||i?e?no:so:Lo(t,oo)?oo:io}(t.join(" "))},e.preventDefaults=function(t){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var o=this.actions,r=Lo(o,ro)&&!ao[ro],n=Lo(o,so)&&!ao[so],s=Lo(o,no)&&!ao[no];if(r){var a=1===t.pointers.length,l=t.distance<2,c=t.deltaTime<250;if(a&&l&&c)return}if(!s||!n)return r||n&&i&$o||s&&i&Co?this.preventSrc(e):void 0}},e.preventSrc=function(t){this.manager.session.prevented=!0,t.preventDefault()},t}();function Io(t,e){for(;t;){if(t===e)return!0;t=t.parentNode}return!1}function Po(t){var e=t.length;if(1===e)return{x:Zi(t[0].clientX),y:Zi(t[0].clientY)};for(var i=0,o=0,r=0;r<e;)i+=t[r].clientX,o+=t[r].clientY,r++;return{x:Zi(i/e),y:Zi(o/e)}}function Oo(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:Zi(t.pointers[i].clientX),clientY:Zi(t.pointers[i].clientY)},i++;return{timeStamp:Gi(),pointers:e,center:Po(e),deltaX:t.deltaX,deltaY:t.deltaY}}function Vo(t,e,i){i||(i=ko);var o=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return Math.sqrt(o*o+r*r)}function zo(t,e,i){i||(i=ko);var o=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return 180*Math.atan2(r,o)/Math.PI}function Do(t,e){return t===e?go:Ki(t)>=Ki(e)?t<0?bo:yo:e<0?wo:xo}function No(t,e,i){return{x:e/t||0,y:i/t||0}}function Ro(t,e){var i=t.session,o=e.pointers,r=o.length;i.firstInput||(i.firstInput=Oo(e)),r>1&&!i.firstMultiple?i.firstMultiple=Oo(e):1===r&&(i.firstMultiple=!1);var n=i.firstInput,s=i.firstMultiple,a=s?s.center:n.center,l=e.center=Po(o);e.timeStamp=Gi(),e.deltaTime=e.timeStamp-n.timeStamp,e.angle=zo(a,l),e.distance=Vo(a,l),function(t,e){var i=e.center,o=t.offsetDelta||{},r=t.prevDelta||{},n=t.prevInput||{};e.eventType!==vo&&n.eventType!==fo||(r=t.prevDelta={x:n.deltaX||0,y:n.deltaY||0},o=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=r.x+(i.x-o.x),e.deltaY=r.y+(i.y-o.y)}(i,e),e.offsetDirection=Do(e.deltaX,e.deltaY);var c,d,h=No(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=h.x,e.overallVelocityY=h.y,e.overallVelocity=Ki(h.x)>Ki(h.y)?h.x:h.y,e.scale=s?(c=s.pointers,Vo((d=o)[0],d[1],Eo)/Vo(c[0],c[1],Eo)):1,e.rotation=s?function(t,e){return zo(e[1],e[0],Eo)+zo(t[1],t[0],Eo)}(s.pointers,o):0,e.maxPointers=i.prevInput?e.pointers.length>i.prevInput.maxPointers?e.pointers.length:i.prevInput.maxPointers:e.pointers.length,function(t,e){var i,o,r,n,s=t.lastInterval||e,a=e.timeStamp-s.timeStamp;if(e.eventType!==_o&&(a>mo||void 0===s.velocity)){var l=e.deltaX-s.deltaX,c=e.deltaY-s.deltaY,d=No(a,l,c);o=d.x,r=d.y,i=Ki(d.x)>Ki(d.y)?d.x:d.y,n=Do(l,c),t.lastInterval=e}else i=s.velocity,o=s.velocityX,r=s.velocityY,n=s.direction;e.velocity=i,e.velocityX=o,e.velocityY=r,e.direction=n}(i,e);var u,p=t.element,m=e.srcEvent;Io(u=m.composedPath?m.composedPath()[0]:m.path?m.path[0]:m.target,p)&&(p=u),e.target=p}function Ho(t,e,i){var o=i.pointers.length,r=i.changedPointers.length,n=e&vo&&o-r==0,s=e&(fo|_o)&&o-r==0;i.isFirst=!!n,i.isFinal=!!s,n&&(t.session={}),i.eventType=e,Ro(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function jo(t){return t.trim().split(/\s+/g)}function Fo(t,e,i){So(jo(e),(function(e){t.addEventListener(e,i,!1)}))}function Uo(t,e,i){So(jo(e),(function(e){t.removeEventListener(e,i,!1)}))}function Bo(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||window}var Wo=function(){function t(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){To(t.options.enable,[t])&&i.handler(e)},this.init()}var e=t.prototype;return e.handler=function(){},e.init=function(){this.evEl&&Fo(this.element,this.evEl,this.domHandler),this.evTarget&&Fo(this.target,this.evTarget,this.domHandler),this.evWin&&Fo(Bo(this.element),this.evWin,this.domHandler)},e.destroy=function(){this.evEl&&Uo(this.element,this.evEl,this.domHandler),this.evTarget&&Uo(this.target,this.evTarget,this.domHandler),this.evWin&&Uo(Bo(this.element),this.evWin,this.domHandler)},t}();function Yo(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var o=0;o<t.length;){if(i&&t[o][i]==e||!i&&t[o]===e)return o;o++}return-1}var qo={pointerdown:vo,pointermove:2,pointerup:fo,pointercancel:_o,pointerout:_o},Xo={2:uo,3:"pen",4:po,5:"kinect"},Zo="pointerdown",Ko="pointermove pointerup pointercancel";Wi.MSPointerEvent&&!Wi.PointerEvent&&(Zo="MSPointerDown",Ko="MSPointerMove MSPointerUp MSPointerCancel");var Go=function(t){function e(){var i,o=e.prototype;return o.evEl=Zo,o.evWin=Ko,(i=t.apply(this,arguments)||this).store=i.manager.session.pointerEvents=[],i}return Ui(e,t),e.prototype.handler=function(t){var e=this.store,i=!1,o=t.type.toLowerCase().replace("ms",""),r=qo[o],n=Xo[t.pointerType]||t.pointerType,s=n===uo,a=Yo(e,t.pointerId,"pointerId");r&vo&&(0===t.button||s)?a<0&&(e.push(t),a=e.length-1):r&(fo|_o)&&(i=!0),a<0||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:n,srcEvent:t}),i&&e.splice(a,1))},e}(Wo);function Jo(t){return Array.prototype.slice.call(t,0)}function Qo(t,e,i){for(var o=[],r=[],n=0;n<t.length;){var s=e?t[n][e]:t[n];Yo(r,s)<0&&o.push(t[n]),r[n]=s,n++}return i&&(o=e?o.sort((function(t,i){return t[e]>i[e]})):o.sort()),o}var tr={touchstart:vo,touchmove:2,touchend:fo,touchcancel:_o},er=function(t){function e(){var i;return e.prototype.evTarget="touchstart touchmove touchend touchcancel",(i=t.apply(this,arguments)||this).targetIds={},i}return Ui(e,t),e.prototype.handler=function(t){var e=tr[t.type],i=ir.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:uo,srcEvent:t})},e}(Wo);function ir(t,e){var i,o,r=Jo(t.touches),n=this.targetIds;if(e&(2|vo)&&1===r.length)return n[r[0].identifier]=!0,[r,r];var s=Jo(t.changedTouches),a=[],l=this.target;if(o=r.filter((function(t){return Io(t.target,l)})),e===vo)for(i=0;i<o.length;)n[o[i].identifier]=!0,i++;for(i=0;i<s.length;)n[s[i].identifier]&&a.push(s[i]),e&(fo|_o)&&delete n[s[i].identifier],i++;return a.length?[Qo(o.concat(a),"identifier",!0),a]:void 0}var or={mousedown:vo,mousemove:2,mouseup:fo},rr=function(t){function e(){var i,o=e.prototype;return o.evEl="mousedown",o.evWin="mousemove mouseup",(i=t.apply(this,arguments)||this).pressed=!1,i}return Ui(e,t),e.prototype.handler=function(t){var e=or[t.type];e&vo&&0===t.button&&(this.pressed=!0),2&e&&1!==t.which&&(e=fo),this.pressed&&(e&fo&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:po,srcEvent:t}))},e}(Wo),nr=2500;function sr(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var i={x:e.clientX,y:e.clientY},o=this.lastTouches;this.lastTouches.push(i);setTimeout((function(){var t=o.indexOf(i);t>-1&&o.splice(t,1)}),nr)}}function ar(t,e){t&vo?(this.primaryTouch=e.changedPointers[0].identifier,sr.call(this,e)):t&(fo|_o)&&sr.call(this,e)}function lr(t){for(var e=t.srcEvent.clientX,i=t.srcEvent.clientY,o=0;o<this.lastTouches.length;o++){var r=this.lastTouches[o],n=Math.abs(e-r.x),s=Math.abs(i-r.y);if(n<=25&&s<=25)return!0}return!1}var cr=function(){return function(t){function e(e,i){var o;return(o=t.call(this,e,i)||this).handler=function(t,e,i){var r=i.pointerType===uo,n=i.pointerType===po;if(!(n&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(r)ar.call(Bi(Bi(o)),e,i);else if(n&&lr.call(Bi(Bi(o)),i))return;o.callback(t,e,i)}},o.touch=new er(o.manager,o.handler),o.mouse=new rr(o.manager,o.handler),o.primaryTouch=null,o.lastTouches=[],o}return Ui(e,t),e.prototype.destroy=function(){this.touch.destroy(),this.mouse.destroy()},e}(Wo)}();function dr(t,e,i){return!!Array.isArray(t)&&(So(t,i[e],i),!0)}var hr=32,ur=1;function pr(t,e){var i=e.manager;return i?i.get(t):t}function mr(t){return 16&t?"cancel":8&t?"end":4&t?"move":2&t?"start":""}var vr=function(){function t(t){void 0===t&&(t={}),this.options=Fi({enable:!0},t),this.id=ur++,this.manager=null,this.state=1,this.simultaneous={},this.requireFail=[]}var e=t.prototype;return e.set=function(t){return Yi(this.options,t),this.manager&&this.manager.touchAction.update(),this},e.recognizeWith=function(t){if(dr(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=pr(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},e.dropRecognizeWith=function(t){return dr(t,"dropRecognizeWith",this)||(t=pr(t,this),delete this.simultaneous[t.id]),this},e.requireFailure=function(t){if(dr(t,"requireFailure",this))return this;var e=this.requireFail;return-1===Yo(e,t=pr(t,this))&&(e.push(t),t.requireFailure(this)),this},e.dropRequireFailure=function(t){if(dr(t,"dropRequireFailure",this))return this;t=pr(t,this);var e=Yo(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},e.hasRequireFailures=function(){return this.requireFail.length>0},e.canRecognizeWith=function(t){return!!this.simultaneous[t.id]},e.emit=function(t){var e=this,i=this.state;function o(i){e.manager.emit(i,t)}i<8&&o(e.options.event+mr(i)),o(e.options.event),t.additionalEvent&&o(t.additionalEvent),i>=8&&o(e.options.event+mr(i))},e.tryEmit=function(t){if(this.canEmit())return this.emit(t);this.state=hr},e.canEmit=function(){for(var t=0;t<this.requireFail.length;){if(!(33&this.requireFail[t].state))return!1;t++}return!0},e.recognize=function(t){var e=Yi({},t);if(!To(this.options.enable,[this,e]))return this.reset(),void(this.state=hr);56&this.state&&(this.state=1),this.state=this.process(e),30&this.state&&this.tryEmit(e)},e.process=function(t){},e.getTouchAction=function(){},e.reset=function(){},t}(),fr=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,Fi({event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},e))||this).pTime=!1,i.pCenter=!1,i._timer=null,i._input=null,i.count=0,i}Ui(e,t);var i=e.prototype;return i.getTouchAction=function(){return[oo]},i.process=function(t){var e=this,i=this.options,o=t.pointers.length===i.pointers,r=t.distance<i.threshold,n=t.deltaTime<i.time;if(this.reset(),t.eventType&vo&&0===this.count)return this.failTimeout();if(r&&n&&o){if(t.eventType!==fo)return this.failTimeout();var s=!this.pTime||t.timeStamp-this.pTime<i.interval,a=!this.pCenter||Vo(this.pCenter,t.center)<i.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,a&&s?this.count+=1:this.count=1,this._input=t,0===this.count%i.taps)return this.hasRequireFailures()?(this._timer=setTimeout((function(){e.state=8,e.tryEmit()}),i.interval),2):8}return hr},i.failTimeout=function(){var t=this;return this._timer=setTimeout((function(){t.state=hr}),this.options.interval),hr},i.reset=function(){clearTimeout(this._timer)},i.emit=function(){8===this.state&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))},e}(vr),_r=function(t){function e(e){return void 0===e&&(e={}),t.call(this,Fi({pointers:1},e))||this}Ui(e,t);var i=e.prototype;return i.attrTest=function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},i.process=function(t){var e=this.state,i=t.eventType,o=6&e,r=this.attrTest(t);return o&&(i&_o||!r)?16|e:o||r?i&fo?8|e:2&e?4|e:2:hr},e}(vr);function gr(t){return t===xo?"down":t===wo?"up":t===bo?"left":t===yo?"right":""}var br=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,Fi({event:"pan",threshold:10,pointers:1,direction:Ao},e))||this).pX=null,i.pY=null,i}Ui(e,t);var i=e.prototype;return i.getTouchAction=function(){var t=this.options.direction,e=[];return t&$o&&e.push(so),t&Co&&e.push(no),e},i.directionTest=function(t){var e=this.options,i=!0,o=t.distance,r=t.direction,n=t.deltaX,s=t.deltaY;return r&e.direction||(e.direction&$o?(r=0===n?go:n<0?bo:yo,i=n!==this.pX,o=Math.abs(t.deltaX)):(r=0===s?go:s<0?wo:xo,i=s!==this.pY,o=Math.abs(t.deltaY))),t.direction=r,i&&o>e.threshold&&r&e.direction},i.attrTest=function(t){return _r.prototype.attrTest.call(this,t)&&(2&this.state||!(2&this.state)&&this.directionTest(t))},i.emit=function(e){this.pX=e.deltaX,this.pY=e.deltaY;var i=gr(e.direction);i&&(e.additionalEvent=this.options.event+i),t.prototype.emit.call(this,e)},e}(_r),yr=function(t){function e(e){return void 0===e&&(e={}),t.call(this,Fi({event:"swipe",threshold:10,velocity:.3,direction:$o|Co,pointers:1},e))||this}Ui(e,t);var i=e.prototype;return i.getTouchAction=function(){return br.prototype.getTouchAction.call(this)},i.attrTest=function(e){var i,o=this.options.direction;return o&($o|Co)?i=e.overallVelocity:o&$o?i=e.overallVelocityX:o&Co&&(i=e.overallVelocityY),t.prototype.attrTest.call(this,e)&&o&e.offsetDirection&&e.distance>this.options.threshold&&e.maxPointers===this.options.pointers&&Ki(i)>this.options.velocity&&e.eventType&fo},i.emit=function(t){var e=gr(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)},e}(_r),wr=function(t){function e(e){return void 0===e&&(e={}),t.call(this,Fi({event:"pinch",threshold:0,pointers:2},e))||this}Ui(e,t);var i=e.prototype;return i.getTouchAction=function(){return[ro]},i.attrTest=function(e){return t.prototype.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||2&this.state)},i.emit=function(e){if(1!==e.scale){var i=e.scale<1?"in":"out";e.additionalEvent=this.options.event+i}t.prototype.emit.call(this,e)},e}(_r),xr=function(t){function e(e){return void 0===e&&(e={}),t.call(this,Fi({event:"rotate",threshold:0,pointers:2},e))||this}Ui(e,t);var i=e.prototype;return i.getTouchAction=function(){return[ro]},i.attrTest=function(e){return t.prototype.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||2&this.state)},e}(_r),$r=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,Fi({event:"press",pointers:1,time:251,threshold:9},e))||this)._timer=null,i._input=null,i}Ui(e,t);var i=e.prototype;return i.getTouchAction=function(){return[io]},i.process=function(t){var e=this,i=this.options,o=t.pointers.length===i.pointers,r=t.distance<i.threshold,n=t.deltaTime>i.time;if(this._input=t,!r||!o||t.eventType&(fo|_o)&&!n)this.reset();else if(t.eventType&vo)this.reset(),this._timer=setTimeout((function(){e.state=8,e.tryEmit()}),i.time);else if(t.eventType&fo)return 8;return hr},i.reset=function(){clearTimeout(this._timer)},i.emit=function(t){8===this.state&&(t&&t.eventType&fo?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=Gi(),this.manager.emit(this.options.event,this._input)))},e}(vr),Cr={domEvents:!1,touchAction:eo,enable:!0,inputTarget:null,inputClass:null,cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},Ar=[[xr,{enable:!1}],[wr,{enable:!1},["rotate"]],[yr,{direction:$o}],[br,{direction:$o},["swipe"]],[fr],[fr,{event:"doubletap",taps:2},["tap"]],[$r]];function kr(t,e){var i,o=t.element;o.style&&(So(t.options.cssProps,(function(r,n){i=Ji(o.style,n),e?(t.oldCssProps[i]=o.style[i],o.style[i]=r):o.style[i]=t.oldCssProps[i]||""})),e||(t.oldCssProps={}))}var Er=function(){function t(t,e){var i,o=this;this.options=Yi({},Cr,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=new((i=this).options.inputClass||(co?Go:ho?er:lo?cr:rr))(i,Ho),this.touchAction=new Mo(this,this.options.touchAction),kr(this,!0),So(this.options.recognizers,(function(t){var e=o.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])}),this)}var e=t.prototype;return e.set=function(t){return Yi(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},e.stop=function(t){this.session.stopped=t?2:1},e.recognize=function(t){var e=this.session;if(!e.stopped){var i;this.touchAction.preventDefaults(t);var o=this.recognizers,r=e.curRecognizer;(!r||r&&8&r.state)&&(e.curRecognizer=null,r=null);for(var n=0;n<o.length;)i=o[n],2===e.stopped||r&&i!==r&&!i.canRecognizeWith(r)?i.reset():i.recognize(t),!r&&14&i.state&&(e.curRecognizer=i,r=i),n++}},e.get=function(t){if(t instanceof vr)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event===t)return e[i];return null},e.add=function(t){if(dr(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},e.remove=function(t){if(dr(t,"remove",this))return this;var e=this.get(t);if(t){var i=this.recognizers,o=Yo(i,e);-1!==o&&(i.splice(o,1),this.touchAction.update())}return this},e.on=function(t,e){if(void 0===t||void 0===e)return this;var i=this.handlers;return So(jo(t),(function(t){i[t]=i[t]||[],i[t].push(e)})),this},e.off=function(t,e){if(void 0===t)return this;var i=this.handlers;return So(jo(t),(function(t){e?i[t]&&i[t].splice(Yo(i[t],e),1):delete i[t]})),this},e.emit=function(t,e){this.options.domEvents&&function(t,e){var i=document.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var o=0;o<i.length;)i[o](e),o++}},e.destroy=function(){this.element&&kr(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null},t}(),Sr={touchstart:vo,touchmove:2,touchend:fo,touchcancel:_o},Tr=function(t){function e(){var i,o=e.prototype;return o.evTarget="touchstart",o.evWin="touchstart touchmove touchend touchcancel",(i=t.apply(this,arguments)||this).started=!1,i}return Ui(e,t),e.prototype.handler=function(t){var e=Sr[t.type];if(e===vo&&(this.started=!0),this.started){var i=Lr.call(this,t,e);e&(fo|_o)&&i[0].length-i[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:uo,srcEvent:t})}},e}(Wo);function Lr(t,e){var i=Jo(t.touches),o=Jo(t.changedTouches);return e&(fo|_o)&&(i=Qo(i.concat(o),"identifier",!0)),[i,o]}function Mr(t,e,i){var o="DEPRECATED METHOD: "+e+"\n"+i+" AT \n";return function(){var e=new Error("get-stack-trace"),i=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",r=window.console&&(window.console.warn||window.console.log);return r&&r.call(window.console,o,i),t.apply(this,arguments)}}var Ir=Mr((function(t,e,i){for(var o=Object.keys(e),r=0;r<o.length;)(!i||i&&void 0===t[o[r]])&&(t[o[r]]=e[o[r]]),r++;return t}),"extend","Use `assign`."),Pr=Mr((function(t,e){return Ir(t,e,!0)}),"merge","Use `assign`.");function Or(t,e,i){var o,r=e.prototype;(o=t.prototype=Object.create(r)).constructor=t,o._super=r,i&&Yi(o,i)}function Vr(t,e){return function(){return t.apply(e,arguments)}}(function(){var t=function(t,e){return void 0===e&&(e={}),new Er(t,Fi({recognizers:Ar.concat()},e))};return t.VERSION="2.0.17-rc",t.DIRECTION_ALL=Ao,t.DIRECTION_DOWN=xo,t.DIRECTION_LEFT=bo,t.DIRECTION_RIGHT=yo,t.DIRECTION_UP=wo,t.DIRECTION_HORIZONTAL=$o,t.DIRECTION_VERTICAL=Co,t.DIRECTION_NONE=go,t.DIRECTION_DOWN=xo,t.INPUT_START=vo,t.INPUT_MOVE=2,t.INPUT_END=fo,t.INPUT_CANCEL=_o,t.STATE_POSSIBLE=1,t.STATE_BEGAN=2,t.STATE_CHANGED=4,t.STATE_ENDED=8,t.STATE_RECOGNIZED=8,t.STATE_CANCELLED=16,t.STATE_FAILED=hr,t.Manager=Er,t.Input=Wo,t.TouchAction=Mo,t.TouchInput=er,t.MouseInput=rr,t.PointerEventInput=Go,t.TouchMouseInput=cr,t.SingleTouchInput=Tr,t.Recognizer=vr,t.AttrRecognizer=_r,t.Tap=fr,t.Pan=br,t.Swipe=yr,t.Pinch=wr,t.Rotate=xr,t.Press=$r,t.on=Fo,t.off=Uo,t.each=So,t.merge=Pr,t.extend=Ir,t.bindFn=Vr,t.assign=Yi,t.inherit=Or,t.bindFn=Vr,t.prefixed=Ji,t.toArray=Jo,t.inArray=Yo,t.uniqueArray=Qo,t.splitStr=jo,t.boolOrFn=To,t.hasParent=Io,t.addEventListeners=Fo,t.removeEventListeners=Uo,t.defaults=Yi({},Cr,{preset:Ar}),t})().defaults;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zr=270;const Dr=new Set(["ArrowRight","ArrowUp","ArrowLeft","ArrowDown","PageUp","PageDown","Home","End"]);let Nr=class extends st{constructor(){super(...arguments),this.disabled=!1,this.step=1,this.min=0,this.max=100,this._localValue=this.value,this._localLow=this.low,this._localHigh=this.high,this._getPercentageFromEvent=t=>{const e=this._slider.getBoundingClientRect(),i=2*(t.center.x-e.left-e.width/2)/e.width,o=2*(t.center.y-e.top-e.height/2)/e.height,[,r]=function(t,e){return[Math.sqrt(t*t+e*e),Math.atan2(e,t)]}(i,o),n=(r/(2*Math.PI)*360+45-135+360)%360-45;return Math.max(Math.min(n/zr,1),0)}}_valueToPercentage(t){return(((t,e,i)=>Math.min(Math.max(t,e),i))(t,this.min,this.max)-this.min)/(this.max-this.min)}_percentageToValue(t){return(this.max-this.min)*t+this.min}_steppedValue(t){return Math.round(t/this.step)*this.step}_boundedValue(t){var e,i;const o="high"===this._activeSlider?Math.min(null!==(e=this._localLow)&&void 0!==e?e:this.max):this.min,r="low"===this._activeSlider?Math.max(null!==(i=this._localHigh)&&void 0!==i?i:this.min):this.max;return Math.min(Math.max(t,o),r)}firstUpdated(t){super.firstUpdated(t),this._setupListeners()}updated(t){super.updated(t),this._activeSlider||(t.has("value")&&(this._localValue=this.value),t.has("low")&&(this._localLow=this.low),t.has("high")&&(this._localHigh=this.high))}connectedCallback(){super.connectedCallback(),this._setupListeners()}disconnectedCallback(){super.disconnectedCallback()}_findActiveSlider(t){var e,i;if(!this.dual)return"value";const o=Math.max(null!==(e=this._localLow)&&void 0!==e?e:this.min,this.min),r=Math.min(null!==(i=this._localHigh)&&void 0!==i?i:this.max,this.max);if(o>=t)return"low";if(r<=t)return"high";return Math.abs(t-o)<=Math.abs(t-r)?"low":"high"}_setActiveValue(t){switch(this._activeSlider){case"high":this._localHigh=t;break;case"low":this._localLow=t;break;case"value":this._localValue=t}}_getActiveValue(){switch(this._activeSlider){case"high":return this._localHigh;case"low":return this._localLow;case"value":return this._localValue}}_setupListeners(){this._interaction&&!this._mc&&(this._mc=new Er(this._interaction,{inputClass:cr}),this._mc.add(new br({direction:Ao,enable:!0,threshold:0})),this._mc.add(new fr({event:"singletap"})),this._mc.on("pan",(t=>{t.srcEvent.stopPropagation(),t.srcEvent.preventDefault()})),this._mc.on("panstart",(t=>{var e,i;if(this.disabled)return;const o=this._getPercentageFromEvent(t),r=this._percentageToValue(o);this._activeSlider=this._findActiveSlider(r),this._lastSlider=this._activeSlider,null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("#slider"))||void 0===i||i.focus()})),this._mc.on("pancancel",(()=>{this.disabled||(this._activeSlider=void 0)})),this._mc.on("panmove",(t=>{if(this.disabled)return;const e=this._getPercentageFromEvent(t),i=this._percentageToValue(e),o=this._boundedValue(i);this._setActiveValue(o);const r=this._steppedValue(o);this._activeSlider&&li(this,`${this._activeSlider}-changing`,{value:r})})),this._mc.on("panend",(t=>{if(this.disabled)return;const e=this._getPercentageFromEvent(t),i=this._percentageToValue(e),o=this._boundedValue(i),r=this._steppedValue(o);this._setActiveValue(r),this._activeSlider&&(li(this,`${this._activeSlider}-changing`,{value:void 0}),li(this,`${this._activeSlider}-changed`,{value:r})),this._activeSlider=void 0})),this._mc.on("singletap",(t=>{var e,i;if(this.disabled)return;const o=this._getPercentageFromEvent(t),r=this._percentageToValue(o);this._activeSlider=this._findActiveSlider(r);const n=this._boundedValue(r),s=this._steppedValue(n);this._setActiveValue(s),this._activeSlider&&(li(this,`${this._activeSlider}-changing`,{value:void 0}),li(this,`${this._activeSlider}-changed`,{value:s})),this._lastSlider=this._activeSlider,null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("#slider"))||void 0===i||i.focus(),this._activeSlider=void 0})))}get _tenPercentStep(){return Math.max(this.step,(this.max-this.min)/10)}_handleKeyDown(t){var e,i,o;if(!Dr.has(t.code))return;t.preventDefault(),this._lastSlider&&(null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById(this._lastSlider))||void 0===i||i.focus()),this._activeSlider=null!==(o=this._lastSlider)&&void 0!==o?o:t.currentTarget.id,this._lastSlider=void 0;const r=this._getActiveValue();switch(t.code){case"ArrowRight":case"ArrowUp":this._setActiveValue(this._boundedValue((null!=r?r:this.min)+this.step));break;case"ArrowLeft":case"ArrowDown":this._setActiveValue(this._boundedValue((null!=r?r:this.min)-this.step));break;case"PageUp":this._setActiveValue(this._steppedValue(this._boundedValue((null!=r?r:this.min)+this._tenPercentStep)));break;case"PageDown":this._setActiveValue(this._steppedValue(this._boundedValue((null!=r?r:this.min)-this._tenPercentStep)));break;case"Home":this._setActiveValue(this._boundedValue(this.min));break;case"End":this._setActiveValue(this._boundedValue(this.max))}li(this,`${this._activeSlider}-changing`,{value:this._getActiveValue()}),this._activeSlider=void 0}_handleKeyUp(t){Dr.has(t.code)&&(this._activeSlider=t.currentTarget.id,t.preventDefault(),li(this,`${this._activeSlider}-changing`,{value:void 0}),li(this,`${this._activeSlider}-changed`,{value:this._getActiveValue()}),this._activeSlider=void 0)}destroyListeners(){this._mc&&(this._mc.destroy(),this._mc=void 0)}_strokeCircleDashArc(t){return this._strokeDashArc(t,t)}_strokeDashArc(t,e){const i=this._valueToPercentage(t),o=this._valueToPercentage(e),r=290*Math.PI*zr/360,n=Math.max((o-i)*r,0);return[`${n} ${r-n}`,`-${i*r-.5}`]}renderArc(t,e,i){var o,r;if(this.disabled)return F;const n=ji({x:0,y:0,start:0,end:zr,r:145}),s="end"===i?this.max:this.min,a=null!==(o=this.current)&&void 0!==o?o:s,l=null!=e?e:s,c="end"===i?l<=a:"start"===i&&a<=l,d=c?"end"===i?this._strokeDashArc(l,a):this._strokeDashArc(a,l):this._strokeCircleDashArc(l),h="full"===i?this._strokeDashArc(this.min,this.max):"end"===i?this._strokeDashArc(l,s):this._strokeDashArc(s,l),u=this._strokeCircleDashArc(l),p=null!=this.current&&this.current<=this.max&&this.current>=this.min&&(c||"full"===this.mode)?this._strokeCircleDashArc(this.current):void 0;return H`
        <g class=${_t({inactive:Boolean(this.inactive)})}>
          <path
            class="arc arc-clear"
            d=${n}
            stroke-dasharray=${h[0]}
            stroke-dashoffset=${h[1]}
          />
          <path
            class="arc arc-colored ${_t({[t]:!0})}"
            d=${n}
            stroke-dasharray=${h[0]}
            stroke-dashoffset=${h[1]}
          />
          <path
            .id=${t}
            d=${n}
            class="arc arc-active ${_t({[t]:!0})}"
            stroke-dasharray=${d[0]}
            stroke-dashoffset=${d[1]}
            role="slider"
            tabindex="0"
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${null!=this._localValue?this._steppedValue(this._localValue):void 0}
            aria-disabled=${this.disabled}
            aria-label=${(t=>null!=t?t:F)(null!==(r=this.lowLabel)&&void 0!==r?r:this.label)}
            @keydown=${this._handleKeyDown}
            @keyup=${this._handleKeyUp}
          />
          ${p?H`
                <path
                  class="current arc-current"
                  d=${n}
                  stroke-dasharray=${p[0]}
                  stroke-dashoffset=${p[1]}
                />
            `:F}
          <path
            class="target-border ${_t({[t]:!0})}"
            d=${n}
            stroke-dasharray=${u[0]}
            stroke-dashoffset=${u[1]}
          />
          <path
            class="target"
            d=${n}
            stroke-dasharray=${u[0]}
            stroke-dashoffset=${u[1]}
          />
        </g>
      `}render(){const t=ji({x:0,y:0,start:0,end:zr,r:145}),e=this.dual?this._localLow:this._localValue,i=this._localHigh,o=this.current,r=o?this._strokeCircleDashArc(o):void 0;return R`
        <svg
          id="slider"
          viewBox="0 0 320 320"
          overflow="visible"
          class=${_t({pressed:Boolean(this._activeSlider)})}
          @keydown=${this._handleKeyDown}
          tabindex=${this._lastSlider?"0":"-1"}
        >
          <g
            id="container"
            transform="translate(160 160) rotate(${135})"
          >
            <g id="interaction">
              <path d=${t} />
            </g>
            <g id="display">
              <path class="background" d=${t} />
              ${r?H`
                    <path
                      class="current"
                      d=${t}
                      stroke-dasharray=${r[0]}
                      stroke-dashoffset=${r[1]}
                    />
                  `:F}
              ${null!=e?this.renderArc(this.dual?"low":"value",e,!this.dual&&this.mode||"start"):F}
              ${this.dual&&null!=i?this.renderArc("high",i,"end"):F}
            </g>
          </g>
        </svg>
      `}static get styles(){return s`
        :host {
          --clear-background-color: #111111;
          --control-circular-slider-color: var(--primary-color);
          --control-circular-slider-background: var(--disabled-color);
          --control-circular-slider-background-opacity: 0.3;
          --control-circular-slider-low-color: var(
            --control-circular-slider-color
          );
          --control-circular-slider-high-color: var(
            --control-circular-slider-color
          );
        }
        svg {
          width: 320px;
          display: block;
        }
        #slider {
          width: 100%;
          max-width: 253px;
          outline: none;
          margin: 0 auto;
          margin-top: 1em;
          position: relative;
          z-index: 2;
        }
        #interaction {
          display: flex;
          fill: none;
          stroke: transparent;
          stroke-linecap: round;
          stroke-width: 48px;
          cursor: pointer;
        }
        #display {
          pointer-events: none;
        }
        :host([disabled]) #interaction {
          cursor: initial;
        }
  
        .background {
          fill: none;
          stroke: var(--control-circular-slider-background);
          opacity: var(--control-circular-slider-background-opacity);
          transition:
            stroke 180ms ease-in-out,
            opacity 180ms ease-in-out;
          stroke-linecap: round;
          stroke-width: 24px;
        }
  
        .arc {
          fill: none;
          stroke-linecap: round;
          stroke-width: 24px;
          transition:
            stroke-width 300ms ease-in-out,
            stroke-dasharray 300ms ease-in-out,
            stroke-dashoffset 300ms ease-in-out,
            stroke 180ms ease-in-out,
            opacity 180ms ease-in-out;
        }
  
        .target {
          fill: none;
          stroke-linecap: round;
          stroke-width: 18px;
          stroke: white;
          transition:
            stroke-width 300ms ease-in-out,
            stroke-dasharray 300ms ease-in-out,
            stroke-dashoffset 300ms ease-in-out,
            stroke 180ms ease-in-out,
            opacity 180ms ease-in-out;
        }
  
        .target-border {
          fill: none;
          stroke-linecap: round;
          stroke-width: 24px;
          stroke: white;
          transition:
            stroke-width 300ms ease-in-out,
            stroke-dasharray 300ms ease-in-out,
            stroke-dashoffset 300ms ease-in-out,
            stroke 180ms ease-in-out,
            opacity 180ms ease-in-out;
        }


  
        .current {
          fill: none;
          stroke-linecap: round;
          stroke-width: 8px;
          stroke: var(--primary-text-color);
          opacity: 0.5;
          transition:
            stroke-width 300ms ease-in-out,
            stroke-dasharray 300ms ease-in-out,
            stroke-dashoffset 300ms ease-in-out,
            stroke 180ms ease-in-out,
            opacity 180ms ease-in-out;
        }
  
        .arc-current {
          stroke: var(--clear-background-color);
        }
  
        .arc-clear {
          stroke: var(--clear-background-color);
        }
        .arc-colored {
          opacity: 0.5;
        }
        .arc-active {
          outline: none;
        }
        .arc-active:focus-visible {
          stroke-width: 28px;
        }
  
        .pressed .arc,
        .pressed .target,
        .pressed .target-border,
        .pressed .current {
          transition:
            stroke-width 300ms ease-in-out,
            stroke 180ms ease-in-out,
            opacity 180ms ease-in-out;
        }
  
        .inactive .arc,
        .inactive .arc-current {
          opacity: 0;
        }
  
        .value {
          stroke: var(--control-circular-slider-color);
        }
  
        .low {
          stroke: var(--control-circular-slider-low-color);
        }
  
        .high {
          stroke: var(--control-circular-slider-high-color);
        }
      `}};t([ht({type:Boolean,reflect:!0})],Nr.prototype,"disabled",void 0),t([ht({type:Boolean})],Nr.prototype,"dual",void 0),t([ht({type:String})],Nr.prototype,"mode",void 0),t([ht({type:Boolean})],Nr.prototype,"inactive",void 0),t([ht({type:String})],Nr.prototype,"label",void 0),t([ht({type:String,attribute:"low-label"})],Nr.prototype,"lowLabel",void 0),t([ht({type:String,attribute:"high-label"})],Nr.prototype,"highLabel",void 0),t([ht({type:Number})],Nr.prototype,"value",void 0),t([ht({type:Number})],Nr.prototype,"low",void 0),t([ht({type:Number})],Nr.prototype,"high",void 0),t([ht({type:Number})],Nr.prototype,"current",void 0),t([ht({type:Number})],Nr.prototype,"step",void 0),t([ht({type:Number})],Nr.prototype,"min",void 0),t([ht({type:Number})],Nr.prototype,"max",void 0),t([ut()],Nr.prototype,"_localValue",void 0),t([ut()],Nr.prototype,"_localLow",void 0),t([ut()],Nr.prototype,"_localHigh",void 0),t([ut()],Nr.prototype,"_activeSlider",void 0),t([ut()],Nr.prototype,"_lastSlider",void 0),t([pt("#slider")],Nr.prototype,"_slider",void 0),t([pt("#interaction")],Nr.prototype,"_interaction",void 0),Nr=t([lt("bt-ha-control-circular-slider")],Nr);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Rr=Symbol("attachableController");let Hr;Hr=new MutationObserver((t=>{for(const e of t)e.target[Rr]?.hostConnected()}));class jr{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(t){null===t?this.host.removeAttribute("for"):this.host.setAttribute("for",t)}get control(){return this.host.hasAttribute("for")?this.htmlFor&&this.host.isConnected?this.host.getRootNode().querySelector(`#${this.htmlFor}`):null:this.currentControl||this.host.parentElement}set control(t){t?this.attach(t):this.detach()}constructor(t,e){this.host=t,this.onControlChange=e,this.currentControl=null,t.addController(this),t[Rr]=this,Hr?.observe(t,{attributeFilter:["for"]})}attach(t){t!==this.currentControl&&(this.setCurrentControl(t),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(t){this.onControlChange(this.currentControl,t),this.currentControl=t}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Fr=["focusin","focusout","pointerdown"];class Ur extends st{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new jr(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(t){this.attachableController.htmlFor=t}get control(){return this.attachableController.control}set control(t){this.attachableController.control=t}attach(t){this.attachableController.attach(t)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(t){if(!t[Br]){switch(t.type){default:return;case"focusin":this.visible=this.control?.matches(":focus-visible")??!1;break;case"focusout":case"pointerdown":this.visible=!1}t[Br]=!0}}onControlChange(t,e){for(const i of Fr)t?.removeEventListener(i,this),e?.addEventListener(i,this)}update(t){t.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(t)}}t([ht({type:Boolean,reflect:!0})],Ur.prototype,"visible",void 0),t([ht({type:Boolean,reflect:!0})],Ur.prototype,"inward",void 0);const Br=Symbol("handledByFocusRing"),Wr=s`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, 9999px)) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}/*# sourceMappingURL=focus-ring-styles.css.map */
`
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */let Yr=class extends Ur{};Yr.styles=[Wr],Yr=t([lt("md-focus-ring")],Yr);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const qr="cubic-bezier(0.2, 0, 0, 1)";
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Xr;!function(t){t[t.INACTIVE=0]="INACTIVE",t[t.TOUCH_DELAY=1]="TOUCH_DELAY",t[t.HOLDING=2]="HOLDING",t[t.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"}(Xr||(Xr={}));const Zr=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"];class Kr extends st{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=Xr.INACTIVE,this.checkBoundsAfterContextMenu=!1,this.attachableController=new jr(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(t){this.attachableController.htmlFor=t}get control(){return this.attachableController.control}set control(t){this.attachableController.control=t}attach(t){this.attachableController.attach(t)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const t={hovered:this.hovered,pressed:this.pressed};return R`<div class="surface ${_t(t)}"></div>`}update(t){t.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(t)}handlePointerenter(t){this.shouldReactToEvent(t)&&(this.hovered=!0)}handlePointerleave(t){this.shouldReactToEvent(t)&&(this.hovered=!1,this.state!==Xr.INACTIVE&&this.endPressAnimation())}handlePointerup(t){if(this.shouldReactToEvent(t)){if(this.state!==Xr.HOLDING)return this.state===Xr.TOUCH_DELAY?(this.state=Xr.WAITING_FOR_CLICK,void this.startPressAnimation(this.rippleStartEvent)):void 0;this.state=Xr.WAITING_FOR_CLICK}}async handlePointerdown(t){if(this.shouldReactToEvent(t)){if(this.rippleStartEvent=t,!this.isTouch(t))return this.state=Xr.WAITING_FOR_CLICK,void this.startPressAnimation(t);this.checkBoundsAfterContextMenu&&!this.inBounds(t)||(this.checkBoundsAfterContextMenu=!1,this.state=Xr.TOUCH_DELAY,await new Promise((t=>{setTimeout(t,150)})),this.state===Xr.TOUCH_DELAY&&(this.state=Xr.HOLDING,this.startPressAnimation(t)))}}handleClick(){this.disabled||(this.state!==Xr.WAITING_FOR_CLICK?this.state===Xr.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation()):this.endPressAnimation())}handlePointercancel(t){this.shouldReactToEvent(t)&&this.endPressAnimation()}handleContextmenu(){this.disabled||(this.checkBoundsAfterContextMenu=!0,this.endPressAnimation())}determineRippleSize(){const{height:t,width:e}=this.getBoundingClientRect(),i=Math.max(t,e),o=Math.max(.35*i,75),r=Math.floor(.2*i),n=Math.sqrt(e**2+t**2)+10;this.initialSize=r,this.rippleScale=""+(n+o)/r,this.rippleSize=`${r}px`}getNormalizedPointerEventCoords(t){const{scrollX:e,scrollY:i}=window,{left:o,top:r}=this.getBoundingClientRect(),n=e+o,s=i+r,{pageX:a,pageY:l}=t;return{x:a-n,y:l-s}}getTranslationCoordinates(t){const{height:e,width:i}=this.getBoundingClientRect(),o={x:(i-this.initialSize)/2,y:(e-this.initialSize)/2};let r;return r=t instanceof PointerEvent?this.getNormalizedPointerEventCoords(t):{x:i/2,y:e/2},r={x:r.x-this.initialSize/2,y:r.y-this.initialSize/2},{startPoint:r,endPoint:o}}startPressAnimation(t){if(!this.mdRoot)return;this.pressed=!0,this.growAnimation?.cancel(),this.determineRippleSize();const{startPoint:e,endPoint:i}=this.getTranslationCoordinates(t),o=`${e.x}px, ${e.y}px`,r=`${i.x}px, ${i.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${o}) scale(1)`,`translate(${r}) scale(${this.rippleScale})`]},{pseudoElement:"::after",duration:450,easing:qr,fill:"forwards"})}async endPressAnimation(){this.state=Xr.INACTIVE;const t=this.growAnimation,e=t?.currentTime??1/0;e>=225?this.pressed=!1:(await new Promise((t=>{setTimeout(t,225-e)})),this.growAnimation===t&&(this.pressed=!1))}shouldReactToEvent(t){if(this.disabled||!t.isPrimary)return!1;if(this.rippleStartEvent&&this.rippleStartEvent.pointerId!==t.pointerId)return!1;if("pointerenter"===t.type||"pointerleave"===t.type)return!this.isTouch(t);const e=1===t.buttons;return this.isTouch(t)||e}inBounds({x:t,y:e}){const{top:i,left:o,bottom:r,right:n}=this.getBoundingClientRect();return t>=o&&t<=n&&e>=i&&e<=r}isTouch({pointerType:t}){return"touch"===t}async handleEvent(t){switch(t.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(t);break;case"pointerdown":await this.handlePointerdown(t);break;case"pointerenter":this.handlePointerenter(t);break;case"pointerleave":this.handlePointerleave(t);break;case"pointerup":this.handlePointerup(t)}}onControlChange(t,e){for(const i of Zr)t?.removeEventListener(i,this),e?.addEventListener(i,this)}}t([ht({type:Boolean,reflect:!0})],Kr.prototype,"disabled",void 0),t([ut()],Kr.prototype,"hovered",void 0),t([ut()],Kr.prototype,"pressed",void 0),t([pt(".surface")],Kr.prototype,"mdRoot",void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const Gr=s`:host{--_hover-color: var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-opacity: var(--md-ripple-hover-opacity, 0.08);--_pressed-color: var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-opacity: var(--md-ripple-pressed-opacity, 0.12);display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--_hover-color);inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--_pressed-color) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--_hover-color);opacity:var(--_hover-opacity)}.pressed::after{opacity:var(--_pressed-opacity);transition-duration:105ms}/*# sourceMappingURL=ripple-styles.css.map */
`
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let Jr=class extends Kr{};Jr.styles=[Gr],Jr=t([lt("md-ripple")],Jr);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qr=Symbol.for(""),tn=t=>{if((null==t?void 0:t.r)===Qr)return null==t?void 0:t._$litStatic$},en=(t,...e)=>({_$litStatic$:e.reduce(((e,i,o)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[o+1]),t[0]),r:Qr}),on=new Map,rn=(t=>(e,...i)=>{const o=i.length;let r,n;const s=[],a=[];let l,c=0,d=!1;for(;c<o;){for(l=e[c];c<o&&void 0!==(n=i[c],r=tn(n));)l+=r+e[++c],d=!0;c!==o&&a.push(n),s.push(l),c++}if(c===o&&s.push(e[o]),d){const t=s.join("$$lit$$");void 0===(e=on.get(t))&&(s.raw=s,on.set(t,e=s)),i=a}return t(e,...i)})(R),nn=["ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"];
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function sn(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */nn.map(sn);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const an=Symbol("internals");
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function ln(t,e=!0){return e&&"rtl"===getComputedStyle(t).getPropertyValue("direction").trim()}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var cn;class dn extends st{constructor(){super(...arguments),this.disabled=!1,this.flipIconInRtl=!1,this.href="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.type="submit",this.value="",this.flipIcon=ln(this,this.flipIconInRtl),this[cn]=this.attachInternals()}get name(){return this.getAttribute("name")??""}set name(t){this.setAttribute("name",t)}get form(){return this[an].form}get labels(){return this[an].labels}willUpdate(){this.href&&(this.disabled=!1)}render(){const t=this.href?en`div`:en`button`,{ariaLabel:e,ariaHasPopup:i,ariaExpanded:o}=this,r=e&&this.ariaLabelSelected,n=this.toggle?this.selected:F;let s=F;return this.href||(s=r&&this.selected?this.ariaLabelSelected:e),rn`<${t}
        class="icon-button ${_t(this.getRenderClasses())}"
        id="button"
        aria-label="${s||F}"
        aria-haspopup="${!this.href&&i||F}"
        aria-expanded="${!this.href&&o||F}"
        aria-pressed="${n}"
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClick}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?F:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():F}
        ${this.renderTouchTarget()}
        ${this.href&&this.renderLink()}
  </${t}>`}renderLink(){const{ariaLabel:t}=this;return R`
      <a class="link"
        id="link"
        href="${this.href}"
        target="${this.target||F}"
        aria-label="${t||F}"
      ></a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return R`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return R`<span class="icon icon--selected"><slot name="selected"><slot></slot></slot></span>`}renderTouchTarget(){return R`<span class="touch"></span>`}renderFocusRing(){return R`<md-focus-ring part="focus-ring" for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){return R`<md-ripple
      for=${this.href?"link":F}
      ?disabled="${!this.href&&this.disabled}"
    ></md-ripple>`}connectedCallback(){this.flipIcon=ln(this,this.flipIconInRtl),super.connectedCallback()}handleClick(){this.toggle&&!this.disabled&&(this.selected=!this.selected,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))}}cn=an,function(t){for(const e of nn)t.createProperty(e,{attribute:sn(e),reflect:!0});t.addInitializer((t=>{const e={hostConnected(){t.setAttribute("role","presentation")}};t.addController(e)}))}(dn),dn.addInitializer((t=>{const e=t;e.addEventListener("click",(async t=>{const{type:i,[an]:o}=e,{form:r}=o;r&&"button"!==i&&(await new Promise((t=>{t()})),t.defaultPrevented||("reset"!==i?(r.addEventListener("submit",(t=>{Object.defineProperty(t,"submitter",{configurable:!0,enumerable:!0,get:()=>e})}),{capture:!0,once:!0}),o.setFormValue(e.value),r.requestSubmit()):r.reset()))}))})),dn.formAssociated=!0,dn.shadowRootOptions={mode:"open",delegatesFocus:!0},t([ht({type:Boolean,reflect:!0})],dn.prototype,"disabled",void 0),t([ht({type:Boolean,attribute:"flip-icon-in-rtl"})],dn.prototype,"flipIconInRtl",void 0),t([ht()],dn.prototype,"href",void 0),t([ht()],dn.prototype,"target",void 0),t([ht({attribute:"aria-label-selected"})],dn.prototype,"ariaLabelSelected",void 0),t([ht({type:Boolean})],dn.prototype,"toggle",void 0),t([ht({type:Boolean,reflect:!0})],dn.prototype,"selected",void 0),t([ht()],dn.prototype,"type",void 0),t([ht()],dn.prototype,"value",void 0),t([ut()],dn.prototype,"flipIcon",void 0);
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const hn=s`:host{--_container-shape: var(--md-outlined-icon-button-container-shape, 9999px);--_container-size: var(--md-outlined-icon-button-container-size, 40px);--_disabled-icon-color: var(--md-outlined-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-icon-button-disabled-icon-opacity, 0.38);--_disabled-selected-container-color: var(--md-outlined-icon-button-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-outlined-icon-button-disabled-selected-container-opacity, 0.12);--_hover-state-layer-opacity: var(--md-outlined-icon-button-hover-state-layer-opacity, 0.08);--_icon-size: var(--md-outlined-icon-button-icon-size, 24px);--_pressed-state-layer-opacity: var(--md-outlined-icon-button-pressed-state-layer-opacity, 0.12);--_selected-container-color: var(--md-outlined-icon-button-selected-container-color, var(--md-sys-color-inverse-surface, #322f35));--_selected-focus-icon-color: var(--md-outlined-icon-button-selected-focus-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-hover-icon-color: var(--md-outlined-icon-button-selected-hover-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-hover-state-layer-color: var(--md-outlined-icon-button-selected-hover-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-icon-color: var(--md-outlined-icon-button-selected-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-pressed-icon-color: var(--md-outlined-icon-button-selected-pressed-icon-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_selected-pressed-state-layer-color: var(--md-outlined-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-inverse-on-surface, #f5eff7));--_disabled-outline-color: var(--md-outlined-icon-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-icon-button-disabled-outline-opacity, 0.12);--_focus-icon-color: var(--md-outlined-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-outlined-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-outlined-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_icon-color: var(--md-outlined-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-outlined-icon-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-icon-button-outline-width, 1px);--_pressed-icon-color: var(--md-outlined-icon-button-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-outlined-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var( --md-outlined-icon-button-container-shape-start-start, var(--_container-shape) );--_container-shape-start-end: var( --md-outlined-icon-button-container-shape-start-end, var(--_container-shape) );--_container-shape-end-end: var( --md-outlined-icon-button-container-shape-end-end, var(--_container-shape) );--_container-shape-end-start: var( --md-outlined-icon-button-container-shape-end-start, var(--_container-shape) )}.outlined{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.outlined::before{border-color:var(--_outline-color);border-width:var(--_outline-width)}.outlined:hover{color:var(--_hover-icon-color)}.outlined:focus{color:var(--_focus-icon-color)}.outlined:active{color:var(--_pressed-icon-color)}.outlined:disabled{color:var(--_disabled-icon-color)}.outlined:disabled::before{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}.outlined:disabled .icon{opacity:var(--_disabled-icon-opacity)}.outlined::before{block-size:100%;border-style:solid;border-radius:inherit;box-sizing:border-box;content:"";inline-size:100%;inset:0;pointer-events:none;position:absolute;z-index:-1}.outlined.selected::before{border-width:0}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.selected:not(:disabled){color:var(--_selected-icon-color)}.selected:not(:disabled):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled):active{color:var(--_selected-pressed-icon-color)}.selected:not(:disabled)::before{background-color:var(--_selected-container-color)}.selected:disabled::before{background-color:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}@media(forced-colors: active){.selected::before{border-color:var(--_outline-color);border-width:var(--_outline-width)}.selected:disabled::before{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}}/*# sourceMappingURL=outlined-styles.css.map */
`
/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */,un=s`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-size);width:var(--_container-size);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-size))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host([disabled]){pointer-events:none}.icon-button{align-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;justify-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{height:100%;outline:none;position:absolute;width:100%}.touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch{display:none}/*# sourceMappingURL=shared-styles.css.map */
`;let pn=class extends dn{getRenderClasses(){return Object.assign(Object.assign({},super.getRenderClasses()),{outlined:!0})}};pn.styles=[un,hn,s`
      :host {
        --ha-icon-display: block;
        --md-sys-color-on-surface: var(--secondary-text-color);
        --md-sys-color-on-surface-variant: var(--secondary-text-color);
        --md-sys-color-on-surface-rgb: var(--rgb-secondary-text-color);
        --md-sys-color-outline: var(--secondary-text-color);
      }
      :host([no-ripple]) .outlined {
        --md-ripple-focus-opacity: 0;
        --md-ripple-hover-opacity: 0;
        --md-ripple-pressed-opacity: 0;
      }
      .outlined {
        /* Fix md-outlined-icon-button padding and margin for iOS */
        padding: 0;
        margin: 0;
      }
    `],pn=t([lt("bt-ha-outlined-icon-button")],pn);const mn="unavailable",vn={auto:"M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z",heat_cool:"M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",heat:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",cool:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",off:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",fan_only:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",dry:yt,window_open:wt,eco:"M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z",summer:bt,temperature:"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",humidity:yt};function fn(t){const e=window;e.customCards=e.customCards||[],e.customCards.push(Object.assign(Object.assign({},t),{preview:!0}))}console.info("%c  BetterThermostatUI-CARD \n%c  version: 2.0.0    ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),fn({type:"better-thermostat-ui-card",name:"Better Thermostat Climate Card",description:"Card for climate entity"});let _n=class extends st{constructor(){super(),this.value=0,this.current=0,this.humidity=0,this.min=0,this.max=35,this.step=1,this.window=!1,this.summer=!1,this.status="loading",this.mode="off",this.dragging=!1,this._init=!0,this._firstRender=!0,this._ignore=!1,this._hasWindow=!1,this._hasSummer=!1,this._oldValueMin=0,this._oldValueMax=0,this._display_bottom=0,this._display_top=0,this.modes=[],this.lowBattery={},this.error=[],this.render=()=>{var t,e,i,o,r,n,s,a,l,c,d,h,u,p,m,v,f,_,g,b,y,w,x,$,C,A;return R`
    <ha-card id="${(null===(t=null==this?void 0:this._config)||void 0===t?void 0:t.disable_buttons)?"":"expand"}" class=${_t({[this.mode]:!0})}
    >
    ${(null===(e=this._config)||void 0===e?void 0:e.disable_menu)?"":R`
      <ha-icon-button
        class="more-info"
        .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
        .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
        @click=${this._handleMoreInfo}
        tabindex="0"
      ></ha-icon-button>
      `}
      <div class="name">${null===(i=this._config)||void 0===i?void 0:i.name}</div>
      ${null!==this.lowBattery?R`
        <div class="low_battery">
          <ha-icon-button class="alert" .path=${"M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z"}>
          </ha-icon-button>
          <span>${this.lowBattery.name}</span>
          <span>${this.lowBattery.battery}%</span>
        </div>
      `:""}
      ${this.error.length>0?R`
        <div class="error">
          <ha-icon-button class="alert" .path=${"M3.27,1.44L2,2.72L4.05,4.77C2.75,5.37 1.5,6.11 0.38,7C4.2,11.8 8.14,16.67 12,21.5L15.91,16.63L19.23,19.95L20.5,18.68C14.87,13.04 3.27,1.44 3.27,1.44M12,3C10.6,3 9.21,3.17 7.86,3.5L9.56,5.19C10.37,5.07 11.18,5 12,5C15.07,5 18.09,5.86 20.71,7.45L16.76,12.38L18.18,13.8C20.08,11.43 22,9 23.65,7C20.32,4.41 16.22,3 12,3M5.57,6.29L14.5,15.21L12,18.3L3.27,7.44C4,7 4.78,6.61 5.57,6.29Z"}>
          </ha-icon-button>
          <span>${this.error}</span>
        </div>
      `:""}
      <bt-ha-control-circular-slider
      class="${(null===(r=null===(o=null==this?void 0:this.stateObj)||void 0===o?void 0:o.attributes)||void 0===r?void 0:r.saved_temperature)&&null!==(null===(s=null===(n=null==this?void 0:this.stateObj)||void 0===n?void 0:n.attributes)||void 0===s?void 0:s.saved_temperature)?"eco":""} ${null!==this.lowBattery||this.error.length>0?"battery":""} ${this.window?"window_open":""}  ${this.summer?"summer":""} "
      .inactive=${this.window}
      .mode="start"
      @value-changed=${this._highChanged}
      @value-changing=${this._highChanging}
      .value=${this.value}
      .current=${this.current}
      step=${this.step}
      min=${this.min}
      max=${this.max}
    ></bt-ha-control-circular-slider>
      <div class="content ${null!==this.lowBattery||this.error.length>0?"battery":""} ${this.window?"window_open":""}  ${(null===(l=null===(a=null==this?void 0:this.stateObj)||void 0===a?void 0:a.attributes)||void 0===l?void 0:l.saved_temperature)&&null!==(null===(d=null===(c=null==this?void 0:this.stateObj)||void 0===c?void 0:c.attributes)||void 0===d?void 0:d.saved_temperature)?"eco":""} ${this.summer?"summer":""} ">
            <svg id="main" viewbox="0 0 125 100">
              <g transform="translate(57.5,37) scale(0.35)">
                ${this._hasWindow&&!(null===(h=this._config)||void 0===h?void 0:h.disable_window)?H`
                  <path title="${ti({hass:this.hass,string:"extra_states.window_open"})}" class="window ${this.window?"active":""}" fill="none" transform="${this._hasSummer&&!(null===(u=this._config)||void 0===u?void 0:u.disable_summer)?"translate(-31.25,0)":""}" id="window" d=${wt} />
                `:""}
                ${this._hasSummer&&!(null===(p=this._config)||void 0===p?void 0:p.disable_summer)?H`
                  <path class="summer ${this.summer?"active":""}" fill="none" transform="${this._hasWindow&&!(null===(m=this._config)||void 0===m?void 0:m.disable_window)?"translate(31.25,0)":""}" id="summer" d=${bt} />
                `:""}
              </g>



              <text class="main-value" x="62.5" y="60%" dominant-baseline="middle" text-anchor="middle" style="font-size:15px;">
                ${H`${ci(this._display_top,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
                <tspan dx="-2" dy="-5.5" style="font-size: 5px;">
                  ${H`
                    ${this.hass.config.unit_system.temperature}
                  `}
                </tspan>
              </text>
              ${(null===(v=null==this?void 0:this.stateObj)||void 0===v?void 0:v.state)===mn||"unknown"===(null===(f=null==this?void 0:this.stateObj)||void 0===f?void 0:f.state)?H`
              <text x="62.5" y="63%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">${this.hass.localize("state.default.unavailable")}</text>
              `:""}
              <line x1="35" y1="72" x2="90" y2="72" stroke="#e7e7e8" stroke-width="0.5" />
              <g class="current-info" transform="translate(62.5,80)">
                ${0===this.humidity?H`
                    <text x="-5%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
                    ${H`${ci(this.current,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
                    <tspan dx="-1" dy="-2" style="font-size: 3px;">
                      ${H`
                        ${this.hass.config.unit_system.temperature}
                      `}
                    </tspan>
                  </text>
                  <path class="status ${"heating"===this.stateObj.attributes.hvac_action&&"off"!==this.mode?"active":""}"  transform="translate(5,-4) scale(0.25)" fill="#9d9d9d"  d="${gt}" />
                `:H`
                  <text x="-12.25%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
                    ${H`${ci(this._display_bottom,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
                    <tspan dx="-1" dy="-2" style="font-size: 3px;">
                      ${H`
                        ${this.hass.config.unit_system.temperature}
                      `}
                    </tspan>
                  </text>
                  <text x="12.25%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
                    ${H`${ci(this.humidity,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
                    <tspan dx="1" dy="-2" style="font-size: 3px;">
                    %
                    </tspan>
                  </text>
                  <path class="status ${"heating"===this.stateObj.attributes.hvac_action&&"off"!==this.mode?"active":""}"  transform="translate(-3,-3.5) scale(0.25)" fill="#9d9d9d"  d=${gt} />
                `}

              </g>
                </svg>
                <div id="modes">
                ${(null==this?void 0:this._hasSummer)?H`
                  ${(null===(_=null==this?void 0:this._config)||void 0===_?void 0:_.disable_heat)?R``:this._renderIcon("heat",this.mode)}
                  ${(null===(g=null==this?void 0:this._config)||void 0===g?void 0:g.disable_eco)?R``:(null===(y=null===(b=null==this?void 0:this.stateObj)||void 0===b?void 0:b.attributes)||void 0===y?void 0:y.saved_temperature)&&"none"!==(null===(x=null===(w=null==this?void 0:this.stateObj)||void 0===w?void 0:w.attributes)||void 0===x?void 0:x.saved_temperature)&&(null===($=null==this?void 0:this.stateObj)||void 0===$?void 0:$.state)!==mn?this._renderIcon("eco","eco"):this._renderIcon("eco","none")}
                  ${(null===(C=null==this?void 0:this._config)||void 0===C?void 0:C.disable_off)?R``:this._renderIcon("off",this.mode)}
                `:H`
                  ${this.modes.map((t=>{var e,i,o;return(null===(e=this._config)||void 0===e?void 0:e.disable_heat)&&"heat"===t||(null===(i=this._config)||void 0===i?void 0:i.disable_eco)&&"eco"===t||(null===(o=this._config)||void 0===o?void 0:o.disable_off)&&"off"===t?R``:this._renderIcon(t,this.mode)}))}
                `}

              </div>
              ${(null===(A=null==this?void 0:this._config)||void 0===A?void 0:A.disable_buttons)?R``:R`
              <div id="bt-control-buttons">
                  <div class="button">
                    <bt-ha-outlined-icon-button
                        @click=${this._decValue}
                    >
                      <ha-svg-icon .path=${"M19,13H5V11H19V13Z"}></ha-svg-icon>
                    </bt-ha-outlined-icon-button>
                  </div>
                  <div class="button">
                    <bt-ha-outlined-icon-button 
                      @click=${this._incValue}
                    >
                    <ha-svg-icon .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}></ha-svg-icon>
                  </bt-ha-outlined-icon-button>
                  </div>
              </div>
              `}
            </div>
          </div>
  </ha-card>
  `}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}static async getConfigElement(){return await Promise.resolve().then((function(){return Cn})),document.createElement("better-thermostat-ui-card-editor")}static async getStubConfig(t){const e=Object.keys(t.states).filter((t=>["climate"].includes(t.split(".")[0]))),i=e.filter((e=>{var i;return null===(i=t.states[e].attributes)||void 0===i?void 0:i.call_for_heat}));return{type:"custom:better-thermostat-ui-card",entity:i[0]||e[0]}}_highChanged(t){this.value=t.detail.value,console.log(this.value),this._setTemperature()}_highChanging(t){"number"==typeof t.detail.value&&(this.value=t.detail.value,this._updateDisplay(),this._vibrate(20))}_incValue(){this.value+=this.step,this._updateDisplay(),this._vibrate(40)}_decValue(){this.value-=this.step,this._updateDisplay(),this._vibrate(40)}setConfig(t){this._config=Object.assign({tap_action:{action:"toggle"},hold_action:{action:"more-info"}},t)}getCardSize(){return 1}_vibrate(t){try{navigator.vibrate(t)}catch(t){}}firstUpdated(t){this._init=!1}shouldUpdate(t){return void 0!==t.has("_config")&&void 0!==t.get("_config")&&(this._hasSummer=!1,this._hasWindow=!1,this.humidity=0),void 0!==t.get("hass")&&(this._init=!1),!0}updated(t){var e,i;super.updated(t),this._firstRender=!1,null===(i=null===(e=null==this?void 0:this.shadowRoot)||void 0===e?void 0:e.querySelector(".low_battery"))||void 0===i||i.addEventListener("click",(()=>{var t,e,i,o;null===(e=null===(t=null==this?void 0:this.shadowRoot)||void 0===t?void 0:t.querySelector(".low_battery"))||void 0===e||e.remove(),null===(o=null===(i=null==this?void 0:this.shadowRoot)||void 0===i?void 0:i.querySelector(".content"))||void 0===o||o.classList.remove("battery"),this._vibrate(2)}))}willUpdate(t){var e;if(!this.hass||!this._config||!t.has("hass")&&!t.has("_config"))return;const i=this._config.entity,o=this.hass.states[i];if(!o)return;const r=t.get("hass");if(!r||r.states[i]!==o){if(!this._config||!this.hass||!this._config.entity)return;this.stateObj=o;const t=this.stateObj.attributes,i=this.stateObj.state;if(this.mode=i||"off",t.hvac_modes&&(this.modes=Object.values(t.hvac_modes)),t.temperature&&(this.value=t.temperature),t.target_temp_step&&(this.step=t.target_temp_step),t.min_temp&&(this.min=t.min_temp),t.max_temp&&(this.max=t.max_temp),t.current_temperature&&(this.current=t.current_temperature),void 0!==(null==t?void 0:t.humidity)&&(this.humidity=parseFloat(t.humidity)),void 0!==(null==t?void 0:t.window_open)&&(this._hasWindow=!0,this.window=t.window_open),void 0!==(null==t?void 0:t.call_for_heat)&&(this._hasSummer=!0,this.summer=!t.call_for_heat),void 0===(null==t?void 0:t.batteries)||(null===(e=null==this?void 0:this._config)||void 0===e?void 0:e.disable_battery_warning))this.lowBattery=null;else{const e=Object.entries(JSON.parse(t.batteries)).filter((t=>t[1].battery<10));e.length>0?this.lowBattery=e.map((t=>({name:t[0],battery:t[1].battery})))[0]:this.lowBattery=null}if(void 0!==(null==t?void 0:t.errors)){const e=JSON.parse(t.errors);e.length>0?this.error=e[0]:this.error=[]}else this.error=[];this._updateDisplay()}}_updateDisplay(){var t;(null===(t=null==this?void 0:this._config)||void 0===t?void 0:t.set_current_as_main)?(this._display_bottom=this.value,this._display_top=this.current):(this._display_bottom=this.current,this._display_top=this.value)}_handleAction(t){var e,i,o,r,n;if("eco"===t.currentTarget.mode){null===((null===(i=null===(e=null==this?void 0:this.stateObj)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.saved_temperature)||null)?this.hass.callService("better_thermostat","set_temp_target_temperature",{entity_id:this._config.entity,temperature:(null===(o=this._config)||void 0===o?void 0:o.eco_temperature)||18}):this.hass.callService("better_thermostat","restore_saved_target_temperature",{entity_id:this._config.entity})}else{null!==((null===(n=null===(r=null==this?void 0:this.stateObj)||void 0===r?void 0:r.attributes)||void 0===n?void 0:n.saved_temperature)||null)&&this.hass.callService("better_thermostat","restore_saved_target_temperature",{entity_id:this._config.entity}),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t.currentTarget.mode})}}_setTemperature(){this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:this.value})}_renderIcon(t,e){if(!vn[t])return R``;const i=this.hass.localize(`component.climate.state._.${t}`)||ti({hass:this.hass,string:`extra_states.${t}`});return R`
      <ha-icon-button
        title="${e===t?t:""}"
        class=${_t({"selected-icon":e===t})}
        .mode=${t}
        @click=${this._handleAction}
        tabindex="0"
        .path=${vn[t]}
        .label=${i}
      >
      </ha-icon-button>
    `}_handleMoreInfo(){li(this,"hass-more-info",{entityId:this._config.entity})}};_n.styles=s`
      :host {
          display: block;
          box-sizing: border-box;
          position: relative;
      }

      ha-card {
        overflow: hidden;
        height: 100%;
        width: 100%;
        vertical-align: middle;
        justify-content: center;
        justify-items: center;
        padding-left: 1em;
        padding-right: 1em;
        box-sizing: border-box;
      }

      ha-card#expand {
        padding-bottom: 20%;
      }

      .content.battery, bt-ha-control-circular-slider.battery {
        opacity: 0.5;
        filter: blur(5px);
        pointer-events: none;
      }
      

      .low_battery, .error {
        position: absolute;
        display: flex;
        flex-flow: column;
        align-items: center;
        place-content: center;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        left: 0px;
        top: 0px;
        background: rgba(200, 200, 200, 0.16);
        border-radius: var(--ha-card-border-radius,12px);
        border-width: var(--ha-card-border-width,1px);
        border-style: solid;
        border-color: var(--ha-card-border-color,var(--divider-color,#e0e0e0));
        pointer-events: all;
        font-size: 22px;
        text-align: center;
        line-height: 40px;
        padding: 1em;
        --mdc-icon-size: 40px;

      }

      .unavailable {
          opacity: 0.3;
      }

      .unavailable #bar, .unavailable .main-value, .unavailable #value,.unavailable #current, .unavailable .current-info,
      .unknown #bar, .unknown .main-value, .unknown #value,.unknown #current, .unknown .current-info {
        display: none;
      }

      .more-info {
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 0px;
        inset-inline-end: 0px;
        inset-inline-start: initial;
        border-radius: 100%;
        color: var(--secondary-text-color);
        z-index: 1;
        direction: var(--direction);
    }
      .container {
          position: relative;
          width: 100%;
          height: 100%;
      }
      bt-ha-control-circular-slider {
        --primary-color: var(--mode-color);
      }

      .content {
        margin: -0.5em auto;
        position: absolute;
        width: 100%;
        top: 15%;
        left: 0;
        z-index: 0
        box-sizing: border-box;
      }
      .name {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 20px;
        padding-top: 1em;
    }
      svg {
        height: auto;
        margin: auto;
        display: block;
        width: 100%;
        
        transform: scale(1.5);
        -webkit-backface-visibility: hidden;
        max-width: 255px;
      }
      
      path {
        stroke-linecap: round;
        stroke-width: 1;
      }

      text {
        fill: var(--primary-text-color);
      }
      .eco {
        --mode-color: var(--energy-non-fossil-color);
      }

      .summer {
        --mode-color: var(--label-badge-yellow)
      }

      .window_open {
        --mode-color: #80a7c4
      }

      .auto,
      .heat_cool {
        --mode-color: var(--state-climate-auto-color);
      }
      .cool {
        --mode-color: var(--state-climate-cool-color);
      }
      .heat {
        --mode-color: var(--label-badge-red);
      }
      .manual {
        --mode-color: var(--state-climate-manual-color);
      }
      .off {
        --mode-color: var(--slider-track-color);
      }
      .fan_only {
        --mode-color: var(--state-climate-fan_only-color);
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

      #modes {
        z-index: 3;
        position: relative;
        display: flex;
        width: auto;
        justify-content: center;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      #bt-control-buttons {
        z-index: 3;
        position: relative;
        display: flex;
        width: auto;
        justify-content: center;
        margin-top: 1em;
        margin-bottom: 1em;
      }

      #bt-control-buttons .button {
        z-index: 3;
        position: relative;
        display: flex;
        width: auto;
        justify-content: center;
        margin-top: -1.5em;
        margin-bottom: 1em;
        padding: 1em;
      }

      #modes > * {
        color: var(--disabled-text-color);
        cursor: pointer;
        display: inline-block;
      }
      #modes .selected-icon {
        color: var(--mode-color);
      }
      
      #shadowpath {
        stroke: #e7e7e8;
      }

      #value {
        fill: var(--mode-color);
        r: 5;
        z-index: 9999 !important;
        transition: r 0.3s ease-in-out, fill 0.6s ease-in-out;
      }

      #value,#current {
        filter: drop-shadow(0px 0px 1px #000);
      }

      #value:hover, #value:active, #value:focus, #value.active {
        r: 8 !important;
      }

      #current {
        pointer-events: none;
        fill: var(--label-badge-grey);
      }
      
      .status {
        transition: fill 0.6s ease-in-out, filter 0.6s ease-in-out;
        filter: none;
      }
      .status.active {
        fill: var(--error-color);
        filter: drop-shadow(0px 0px 6px var(--error-color));
      }

      #bar {
        stroke: var(--mode-color);
        stroke-dasharray: 176;
        stroke-dashoffset: 0;
        transition: stroke-dashoffset 5.1s ease-in-out 0s, stroke 0.6s ease-in-out;
      }

      #bar.drag {
        transition: none !important;
      }
      #c-minus,#c-plus {
        cursor: pointer;
      }
      .control {
        cursor: pointer;
        pointer-events: none;
      }
      ha-icon-button {
        transition: color 0.6s ease-in-out;
      }
      .eco ha-icon-button[title="heat"], .window_open ha-icon-button[title="heat"], .summer ha-icon-button[title="heat"] {
        --mode-color: var(--disabled-text-color);
      }
      .summer,.window {
        transition: fill 0.3s ease;
        fill: var(--disabled-text-color);
      }
      line {
        stroke: var(--disabled-text-color);
      }
      .summer.active {
        fill: var(--label-badge-yellow);
      }
      .window.active {
        fill: #80a7c4;
      }
      ha-icon-button[title="eco"] {
        --mode-color: var(--energy-non-fossil-color) !important;
      }
  `,t([ht({attribute:!1})],_n.prototype,"hass",void 0),t([ht({type:Number})],_n.prototype,"value",void 0),t([ht({type:Number})],_n.prototype,"current",void 0),t([ht({type:Number})],_n.prototype,"humidity",void 0),t([ht({type:Number})],_n.prototype,"min",void 0),t([ht({type:Number})],_n.prototype,"max",void 0),t([ht({type:Number})],_n.prototype,"step",void 0),t([ht({type:Boolean})],_n.prototype,"window",void 0),t([ht({type:Boolean})],_n.prototype,"summer",void 0),t([ht({type:String})],_n.prototype,"status",void 0),t([ht({type:String})],_n.prototype,"mode",void 0),t([ht({type:Boolean,reflect:!0})],_n.prototype,"dragging",void 0),t([ut()],_n.prototype,"changingHigh",void 0),t([ut()],_n.prototype,"_config",void 0),_n=t([lt("better-thermostat-ui-card")],_n);const gn=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];const o="type"===e[0].type,r=e.map((t=>t.schema)),n=Object.assign({},...r);return o?Si(n):Ai(n)}(Ai({index:ki(Ci()),view_index:ki(Ci()),view_layout:yi("any",(()=>!0)),type:Ei()}),Ai({entity:ki(Ei()),name:ki(Ei()),icon:ki(Ei())}),Ai({disable_window:ki(xi()),disable_summer:ki(xi()),disable_eco:ki(xi()),disable_heat:ki(xi()),disable_off:ki(xi()),disable_battery_warning:ki(xi()),set_current_as_main:ki(xi()),eco_temperature:ki(Ci()),disable_menu:ki(xi()),disable_buttons:ki(xi())})),bn=["icon_color","layout","fill_container","primary_info","secondary_info","icon_type","content_info","use_entity_picture","collapsible_controls","icon_animation"],yn=t=>{var e,i;customElements.get("ha-form")&&(customElements.get("hui-action-editor")||((t,e,i,o)=>{const[r,n,s]=t.split(".",3);return Number(r)>e||Number(r)===e&&(void 0===o?Number(n)>=i:Number(n)>i)||void 0!==o&&Number(r)===e&&Number(n)===i&&Number(s)>=o})(t,2022,11))||null===(e=customElements.get("hui-button-card"))||void 0===e||e.getConfigElement(),customElements.get("ha-entity-picker")||null===(i=customElements.get("hui-entities-card"))||void 0===i||i.getConfigElement()},wn=["eco_temperature","disable_window","disable_summer","disable_eco","disable_heat","disable_off","disable_menu","disable_battery_warning","set_current_as_main","disable_buttons"],xn=si((()=>[{name:"entity",selector:{entity:{domain:["climate"]}}},{name:"name",selector:{text:{}}},{name:"eco_temperature",selector:{number:{placeholder:20,min:5,max:45,default:20}}},{type:"grid",name:"",schema:[{name:"disable_window",selector:{boolean:{}}},{name:"disable_summer",selector:{boolean:{}}},{name:"disable_eco",selector:{boolean:{}}},{name:"disable_heat",selector:{boolean:{}}},{name:"disable_off",selector:{boolean:{}}},{name:"disable_menu",selector:{boolean:{}}},{name:"disable_battery_warning",selector:{boolean:{}}},{name:"set_current_as_main",selector:{boolean:{}}},{name:"disable_buttons",selector:{boolean:{}}}]}]));let $n=class extends st{constructor(){super(...arguments),this._computeLabel=t=>{const e=(i=this.hass,function(t){var e;let o=ei(t,null!==(e=null==i?void 0:i.locale.language)&&void 0!==e?e:Qe);return o||(o=ei(t,Qe)),null!=o?o:t});var i;return bn.includes(t.name)?e(`editor.card.generic.${t.name}`):wn.includes(t.name)?e(`editor.card.climate.${t.name}`):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}connectedCallback(){super.connectedCallback(),yn(this.hass.connection.haVersion)}setConfig(t){gi(t,gn),this._config=t}render(){if(!this.hass||!this._config)return R``;const t=xn();return R`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${t}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `}_valueChanged(t){li(this,"config-changed",{config:t.detail.value}),li(this,"hass",{config:t.detail.value})}};t([ut()],$n.prototype,"_config",void 0),t([ht({attribute:!1})],$n.prototype,"hass",void 0),$n=t([lt("better-thermostat-ui-card-editor")],$n);var Cn=Object.freeze({__proto__:null,get ClimateCardEditor(){return $n}});export{_n as BetterThermostatUi,fn as registerCustomCard};
