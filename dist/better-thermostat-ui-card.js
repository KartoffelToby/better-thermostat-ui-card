function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,m={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:_};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;null!==(e=this.h)&&void 0!==e||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=p){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:m).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:m;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.4.1");const g=window,$=g.trustedTypes,y=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,w="?"+b,A=`<${w}>`,C=document,x=(t="")=>C.createComment(t),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,M=/>/g,z=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),N=/'/g,k=/"/g,j=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=H(1),T=H(2),P=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),R=new WeakMap,D=C.createTreeWalker(C,129,null,!1),I=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=L;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===L?"!--"===l[1]?r=O:void 0!==l[1]?r=M:void 0!==l[2]?(j.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=null!=o?o:L,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?k:N):r===k||r===N?r=z:r===O||r===M?r=L:(r=z,o=void 0);const h=r===z&&t[e+1].startsWith("/>")?" ":"";n+=r===L?i+A:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+b+h):i+b+(-2===c?(s.push(void 0),e):h)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(a):a,s]};class F{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=I(t,e);if(this.el=F.createElement(l,i),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=D.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(b)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(b),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?K:"?"===e[1]?Y:"@"===e[1]?G:W})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(j.test(s.tagName)){const t=s.textContent.split(b),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],x()),D.nextNode(),a.push({type:2,index:++o});s.append(t[e],x())}}}else if(8===s.nodeType)if(s.data===w)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(b,t+1));)a.push({type:7,index:o}),t+=b.length-1}o++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function B(t,e,i=t,s){var o,n,r,a;if(e===P)return e;let l=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const c=S(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Cl)&&void 0!==r?r:a._$Cl=[])[s]=l:i._$Cu=l),void 0!==l&&(e=B(t,l._$AS(t,e.values),l,s)),e}class q{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);D.currentNode=o;let n=D.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new Z(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new Q(n,this,t)),this.v.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=D.nextNode(),r++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{constructor(t,e,i,s){var o;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$C_=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$C_}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),S(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==P&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.O(t):this.$(t)}S(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}$(t){this._$AH!==U&&S(this._$AH)?this._$AA.nextSibling.data=t:this.k(C.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=F.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new q(o,this),e=t.p(this.options);t.m(i),this.k(e),this._$AH=t}}_$AC(t){let e=R.get(t.strings);return void 0===e&&R.set(t.strings,e=new F(t)),e}O(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Z(this.S(x()),this.S(x()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$C_=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class W{constructor(t,e,i,s,o){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=B(this,t,e,0),n=!S(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=B(this,s[i+r],e,r),a===P&&(a=this._$AH[r]),n||(n=!S(a)||a!==this._$AH[r]),a===U?t=U:t!==U&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.P(t)}P(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class K extends W{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===U?void 0:t}}const J=$?$.emptyScript:"";class Y extends W{constructor(){super(...arguments),this.type=4}P(t){t&&t!==U?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class G extends W{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=B(this,t,e,0))&&void 0!==i?i:U)===P)return;const s=this._$AH,o=t===U&&s!==U||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==U&&(s===U||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}}const X=g.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var tt,et;null==X||X(F,Z),(null!==(f=g.litHtmlVersions)&&void 0!==f?f:g.litHtmlVersions=[]).push("2.3.1");class it extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new Z(e.insertBefore(x(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return P}}it.finalized=!0,it._$litElement$=!0,null===(tt=globalThis.litElementHydrateSupport)||void 0===tt||tt.call(globalThis,{LitElement:it});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:it}),(null!==(et=globalThis.litElementVersions)&&void 0!==et?et:globalThis.litElementVersions=[]).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function rt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):nt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function at(t){return rt({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var lt;null===(lt=window.HTMLSlotElement)||void 0===lt||lt.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=1;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){var e;if(super(t),t.type!==ct||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,s;if(void 0===this.nt){this.nt=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.st)||void 0===i?void 0:i.has(t))&&this.nt.add(t);return this.render(e)}const o=t.element.classList;this.nt.forEach((t=>{t in e||(o.remove(t),this.nt.delete(t))}));for(const t in e){const i=!!e[t];i===this.nt.has(t)||(null===(s=this.st)||void 0===s?void 0:s.has(t))||(i?(o.add(t),this.nt.add(t)):(o.remove(t),this.nt.delete(t)))}return P}});var ht,ut;function mt(){return(mt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ht||(ht={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ut||(ut={}));var _t=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o};const pt={required:{icon:"tune",name:"Required",secondary:"Required options for this card to function",show:!0}};let vt=class extends it{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _show_warning(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_warning)||!1}get _show_error(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_error)||!1}get _tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.tap_action)||{action:"more-info"}}get _hold_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.hold_action)||{action:"none"}}get _double_tap_action(){var t;return(null===(t=this._config)||void 0===t?void 0:t.double_tap_action)||{action:"none"}}render(){if(!this.hass||!this._helpers)return V``;this._helpers.importMoreInfoControl("climate");const t=Object.keys(this.hass.states).filter((t=>"climate"===t.split(".")[0]));return V`
      <div class="card-config">
        <div class="option" @click=${this._toggleOption} .option=${"required"}>
          <div class="row">
            <ha-icon .icon=${`mdi:${pt.required.icon}`}></ha-icon>
            <div class="title">${pt.required.name}</div>
          </div>
          <div class="secondary">${pt.required.secondary}</div>
        </div>
        ${pt.required.show?V`
              <div class="values">
                <paper-dropdown-menu
                  label="Entity (Required)"
                  @value-changed=${this._valueChanged}
                  .configValue=${"entity"}
                >
                  <paper-listbox slot="dropdown-content" .selected=${t.indexOf(this._entity)}>
                    ${t.map((t=>V`
                        <paper-item>${t}</paper-item>
                      `))}
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            `:""}
      </div>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleOption(t){this._toggleThing(t,pt)}_toggleThing(t,e){const i=!e[t.target.option].show;for(const[t]of Object.entries(e))e[t].show=!1;e[t.target.option].show=i,this._toggle=!this._toggle}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(this[`_${e.configValue}`]!==e.value){if(e.configValue)if(""===e.value){const t=Object.assign({},this._config);delete t[e.configValue],this._config=t}else this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value});_t(this,"config-changed",{config:this._config})}}static get styles(){return r`
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
    `}};t([rt({attribute:!1})],vt.prototype,"hass",void 0),t([at()],vt.prototype,"_config",void 0),t([at()],vt.prototype,"_toggle",void 0),t([at()],vt.prototype,"_helpers",void 0),vt=t([ot("better-thermostat-ui-card-editor")],vt);var ft={version:"version"},gt={window_open:"Window open",night_mode:"Night mode",summer:"Summer"},$t={common:ft,extra_states:gt},yt=Object.freeze({__proto__:null,common:ft,extra_states:gt,default:$t}),bt={version:"version"},wt={window_open:"Fenster offen",night_mode:"Nachtmodus",summer:"Sommer"},At={common:bt,extra_states:wt},Ct=Object.freeze({__proto__:null,common:bt,extra_states:wt,default:At}),xt={version:"version"},St={window_open:"Fenêtre ouverte",night_mode:"Mode nuit",summer:"Été"},Et={common:xt,extra_states:St},Lt=Object.freeze({__proto__:null,common:xt,extra_states:St,default:Et}),Ot={version:"версия"},Mt={window_open:"Окно открыто",night_mode:"Ночной режим",summer:"Лето"},zt={common:Ot,extra_states:Mt},Nt=Object.freeze({__proto__:null,common:Ot,extra_states:Mt,default:zt}),kt={version:"wersja"},jt={window_open:"otwarte okno",night_mode:"tryb nocny",summer:"lato"},Ht={common:kt,extra_states:jt},Vt=Object.freeze({__proto__:null,common:kt,extra_states:jt,default:Ht}),Tt={version:"verzia"},Pt={window_open:"Okno otvorené",night_mode:"Nočný mód",summer:"Leto"},Ut={common:Tt,extra_states:Pt},Rt={version:"Verzió"},Dt={window_open:"Ablak nyitva",night_mode:"Éjszakai mód",summer:"Nyár"},It={common:Rt,extra_states:Dt},Ft={version:"version"},Bt={window_open:"Vindue åben",night_mode:"Nattilstand",summer:"Sommer"},qt={common:Ft,extra_states:Bt},Zt={version:"version"},Wt={window_open:"Ventana abierta",night_mode:"Modo noche",summer:"Verano"},Kt={common:Zt,extra_states:Wt},Jt={version:"versiyon"},Yt={window_open:"Pencere açık",night_mode:"Gece modu",summer:"Yaz"},Gt={common:Jt,extra_states:Yt},Qt={version:"versione"},Xt={window_open:"Finestra aperta",night_mode:"Modalità notturna",summer:"Estate"},te={common:Qt,extra_states:Xt},ee={version:"versão"},ie={window_open:"Janela Aberta",night_mode:"Modo Noturno",summer:"Verão"},se={common:ee,extra_states:ie},oe={version:"版本"},ne={window_open:"窗户打开",night_mode:"夜间模式",summer:"夏季"},re={common:oe,extra_states:ne},ae={version:"версія"},le={window_open:"Вікно відчинено",night_mode:"Нічний режим",summer:"Літо"},ce={common:ae,extra_states:le},de={version:"έκδοση"},he={window_open:"Παράθυρο ανοικτό",night_mode:"Λειτουργία νυκτός",summer:"Καλοκαίρι"},ue={common:de,extra_states:he},me={version:"versie"},_e={window_open:"Raam open",night_mode:"Nacht modus",summer:"Zomer"},pe={common:me,extra_states:_e},ve={version:"versjon"},fe={window_open:"Vindu åpent",night_mode:"Nattmodus",summer:"Sommer"},ge={common:ve,extra_states:fe},$e={version:"verze"},ye={window_open:"Otevřené okno",night_mode:"Noční režim",summer:"Léto"},be={common:$e,extra_states:ye},we={version:"različica"},Ae={window_open:"Okno odprto",night_mode:"Nočni način",summer:"Poletje"},Ce={common:we,extra_states:Ae},xe={version:"version"},Se={window_open:"Fönster öppet",night_mode:"Nattläge",summer:"Sommar"},Ee={common:xe,extra_states:Se},Le={version:"версия"},Oe={window_open:"Отворен прозорец",night_mode:"Нощен режим",summer:"Лято"},Me={common:Le,extra_states:Oe},ze={version:"version"},Ne={window_open:"Ikkuna auki",night_mode:"Yötila",summer:"Kesä"},ke={common:ze,extra_states:Ne},je={version:"versiune"},He={window_open:"Fereastră deschisă",night_mode:"Mod noapte",summer:"Vară"},Ve={common:je,extra_states:He};const Te={en:yt,de:Ct,fr:Lt,ru:Nt,sk:Object.freeze({__proto__:null,common:Tt,extra_states:Pt,default:Ut}),hu:Object.freeze({__proto__:null,common:Rt,extra_states:Dt,default:It}),pl:Vt,da:Object.freeze({__proto__:null,common:Ft,extra_states:Bt,default:qt}),es:Object.freeze({__proto__:null,common:Zt,extra_states:Wt,default:Kt}),tr:Object.freeze({__proto__:null,common:Jt,extra_states:Yt,default:Gt}),it:Object.freeze({__proto__:null,common:Qt,extra_states:Xt,default:te}),pt:Object.freeze({__proto__:null,common:ee,extra_states:ie,default:se}),cn:Object.freeze({__proto__:null,common:oe,extra_states:ne,default:re}),uk:Object.freeze({__proto__:null,common:ae,extra_states:le,default:ce}),el:Object.freeze({__proto__:null,common:de,extra_states:he,default:ue}),nl:Object.freeze({__proto__:null,common:me,extra_states:_e,default:pe}),no:Object.freeze({__proto__:null,common:ve,extra_states:fe,default:ge}),cs:Object.freeze({__proto__:null,common:$e,extra_states:ye,default:be}),sl:Object.freeze({__proto__:null,common:we,extra_states:Ae,default:Ce}),sv:Object.freeze({__proto__:null,common:xe,extra_states:Se,default:Ee}),bg:Object.freeze({__proto__:null,common:Le,extra_states:Oe,default:Me}),fi:Object.freeze({__proto__:null,common:ze,extra_states:Ne,default:ke}),ro:Object.freeze({__proto__:null,common:je,extra_states:He,default:Ve})};function Pe(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||navigator.language).replace(/['"]+/g,"").replace("-","_");let o;try{o=t.split(".").reduce(((t,e)=>t[e]),Te[s])}catch(e){o=t.split(".").reduce(((t,e)=>t[e]),Te.en)}return void 0===o&&(o=t.split(".").reduce(((t,e)=>t[e]),Te.en)),""!==e&&""!==i&&(o=o.replace(e,i)),o}const Ue={auto:"M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z",heat_cool:"M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",heat:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",cool:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",off:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",fan_only:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",dry:"M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",window_open:"M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z",eco:"M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z",summer:"M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5C10.8 5 11.6 5.2 12.4 5.4M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19C20.66 19 22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12C5 14.8 7.2 17 10 17C12.8 17 15 14.8 15 12C15 9.2 12.8 7 10 7M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z"};console.info(`%c  BetterThermostatUI-CARD \n%c  ${Pe("common.version")} 0.3.0    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"better-thermostat-ui-card",name:"Better Thermostat UI Card",description:"A template custom card for you to create something awesome"});let Re=class extends it{static async getConfigElement(){return document.createElement("better-thermostat-ui-card-editor")}static getStubConfig(t){return Object.keys(t.states).filter((t=>"climate"===t.split(".")[0])),{}}getCardSize(){return 7}setConfig(t){if(!t.entity||"climate"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the climate domain");this._config=t}render(){if(!this.hass||!this._config)return V``;const t=this.hass.states[this._config.entity];if(!t)return V`
            <hui-warning>
              Not found: ${this._config.entity}
            </hui-warning>
          `;const e=t.state in Ue?t.state:"unknown-mode",i=this._config.name||this.computeStateName(this.hass.states[this._config.entity]),s=null!==t.attributes.temperature&&Number.isFinite(Number(t.attributes.temperature))?t.attributes.temperature:t.attributes.min_temp,o="unavailable"===t.state?V` <round-slider disabled="true"></round-slider> `:V`
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
              `,n=T`
            <svg viewBox="0 0 40 20">
              <text
                x="50%"
                dx="1"
                y="60%"
                text-anchor="middle"
                style="font-size: 11px;"
              >
                ${null===t.attributes.current_temperature||isNaN(t.attributes.current_temperature)?"":T`${this.formatNumber(t.attributes.current_temperature,this.hass.locale)}
                <tspan dx="-1" dy="-3.5" style="font-size: 4px;">
                  ${this.hass.config.unit_system.temperature}
                </tspan>`}
              </text>
            </svg>
          `,r=T`
          <svg id="set-values">
            <g>
              <text text-anchor="middle" class="set-value">
                ${"unavailable"===t.state?this.hass.localize("state.default.unavailable"):void 0===this._setTemp||null===this._setTemp?"":Array.isArray(this._setTemp)?1===this._stepSize?T`
                          ${this.formatNumber(this._setTemp[0],this.hass.locale,{maximumFractionDigits:0})} -
                          ${this.formatNumber(this._setTemp[1],this.hass.locale,{maximumFractionDigits:0})}
                          `:T`
                          ${this.formatNumber(this._setTemp[0],this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})} -
                          ${this.formatNumber(this._setTemp[1],this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}
                          `:1===this._stepSize?T`
                          ${this.formatNumber(this._setTemp,this.hass.locale,{maximumFractionDigits:0})}
                          `:T`
                          ${this.formatNumber(this._setTemp,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}
                          `}
              </text>
              <text
                dy="22"
                text-anchor="middle"
                id="set-mode"
              >
                ${t.attributes.hvac_action?this.hass.localize(`state_attributes.climate.hvac_action.${t.attributes.hvac_action}`):this.hass.localize(`component.climate.state._.${t.state}`)}
              </text>
            </g>
          </svg>
        `;return setTimeout((()=>this._rescale_svg()),100),V`
          <ha-card
            class=${dt({[e]:!0})}
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
                  <div id="title">${i}</div><div id="bt_status">
                  ${t.attributes.window_open&&"none"!==t.attributes.window_open?this._renderStatusIcon("window_open"):""}
                  ${t.attributes.saved_temperature&&"none"!==t.attributes.saved_temperature?this._renderStatusIcon("eco"):""}
                  ${t.attributes.call_for_heat||"none"===t.attributes.call_for_heat?"":this._renderStatusIcon("summer")}
                  </div>
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
        `}shouldUpdate(t){return!0}updated(t){if(super.updated(t),!this._config||!this.hass||!t.has("hass")&&!t.has("_config"))return;const e=t.get("hass"),i=t.get("_config");e&&i&&e.themes===this.hass.themes&&i.theme===this._config.theme||function(t,e,i,s){void 0===s&&(s=!1),t._themes||(t._themes={});var o=e.default_theme;("default"===i||i&&e.themes[i])&&(o=i);var n=mt({},t._themes);if("default"!==o){var r=e.themes[o];Object.keys(r).forEach((function(e){var i="--"+e;t._themes[i]="",n[i]=r[e]}))}if(t.updateStyles?t.updateStyles(n):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,n),s){var a=document.querySelector("meta[name=theme-color]");if(a){a.hasAttribute("default-content")||a.setAttribute("default-content",a.getAttribute("content"));var l=n["--primary-color"]||a.getAttribute("default-content");a.setAttribute("content",l)}}}(this,this.hass.themes,this._config.theme);const s=this.hass.states[this._config.entity];s&&(e&&e.states[this._config.entity]===s||this._rescale_svg())}willUpdate(t){if(!this.hass||!this._config||!t.has("hass"))return;const e=this.hass.states[this._config.entity];if(!e)return;const i=t.get("hass");i&&i.states[this._config.entity]===e||(this._setTemp=this._getSetTemp(e))}_rescale_svg(){const t=this._card;t&&t.updateComplete.then((()=>{const t=this.shadowRoot.querySelector("#set-values"),e=t.querySelector("g").getBBox();t.setAttribute("viewBox",`${e.x} ${e.y} ${e.width} ${e.height}`),t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`)}))}get _stepSize(){const t=this.hass.states[this._config.entity];return t.attributes.target_temp_step?t.attributes.target_temp_step:"°F"===this.hass.config.unit_system.temperature?1:.5}_getSetTemp(t){if("unavailable"!==t.state)return t.attributes.target_temp_low&&t.attributes.target_temp_high?[t.attributes.target_temp_low,t.attributes.target_temp_high]:t.attributes.temperature}_dragEvent(t){const e=this.hass.states[this._config.entity];t.detail.low?this._setTemp=[t.detail.low,e.attributes.target_temp_high]:t.detail.high?this._setTemp=[e.attributes.target_temp_low,t.detail.high]:this._setTemp=t.detail.value}_setTemperature(t){const e=this.hass.states[this._config.entity];t.detail.low?this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,target_temp_low:t.detail.low,target_temp_high:e.attributes.target_temp_high}):t.detail.high?this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,target_temp_low:e.attributes.target_temp_low,target_temp_high:t.detail.high}):this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:t.detail.value})}_getExtraStatus(){const t=this.hass.states[this._config.entity],e={window_open:t.attributes.window_open,night_mode:t.attributes.night_mode,summer:t.attributes.summer},i=Object.entries(e).filter((([,t])=>!0===t));return Object.keys(Object.fromEntries(i))}_renderStatusIcon(t){return Ue[t]?V`
          <ha-svg-icon
            class="status-icon ${t}"
            tabindex="0"
            .path=${Ue[t]}
            .title=${Pe(`extra_states.${t}`)}
          >
          </ha-svg-icon>
        `:V``}_renderIcon(t,e){return Ue[t]?V`
          <ha-icon-button
            class=${dt({"selected-icon":e===t})}
            .mode=${t}
            @click=${this._handleAction}
            tabindex="0"
            .path=${Ue[t]}
            .label=${this.hass.localize(`component.climate.state._.${t}`)}
          >
          </ha-icon-button>
        `:V``}_handleMoreInfo(){_t(this,"hass-more-info",{entityId:this._config.entity})}_handleAction(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t.currentTarget.mode})}hasConfigChanged(t,e){if(e.has("_config"))return!0;const i=e.get("hass");return!i||(i.connected!==t.hass.connected||i.themes!==t.hass.themes||i.locale!==t.hass.locale||i.localize!==t.hass.localize||i.config.state!==t.hass.config.state)}hasConfigOrEntityChanged(t,e){if(this.hasConfigChanged(t,e))return!0;return e.get("hass").states[t._config.entity]!==t.hass.states[t._config.entity]}compareClimateHvacModes(t,e){const i={auto:1,heat_cool:2,heat:3,cool:4,dry:5,fan_only:6,off:7};return i[t]-i[e]}computeObjectId(t){return t.substr(t.indexOf(".")+1)}computeStateName(t){return void 0===t.attributes.friendly_name?this.computeObjectId(t.entity_id).replace(/_/g," "):t.attributes.friendly_name||""}numberFormatToLocale(t){switch(t.number_format){case ht.comma_decimal:return["en-US","en"];case ht.decimal_comma:return["de","es","it"];case ht.space_comma:return["fr","sv","cs"];case ht.system:return;default:return t.language}}getDefaultFormatOptions(t,e){const i=Object.assign({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){const e=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=e,i.maximumFractionDigits=e}return i}round(t,e=2){return Math.round(t*10**e)/10**e}formatNumber(t,e,i){const s=e?this.numberFormatToLocale(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==ht.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(s,this.getDefaultFormatOptions(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,this.getDefaultFormatOptions(t,i)).format(Number(t))}return"string"==typeof t?t:`${this.round(t,null==i?void 0:i.maximumFractionDigits).toString()}${"currency"===(null==i?void 0:i.style)?` ${i.currency}`:""}`}static get styles(){return r`
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
          #bt_status {
            padding: 0 0 0.8em 0;
            display: flex;
            flex-flow: row;
            justify-content: center;
            gap: 0.3em;
            min-height: 30px;
          }
          ha-svg-icon.status-icon.window_open {
            color: #1d9187 !important;
          }
          ha-svg-icon.status-icon.eco {
            color: #6cff71 !important;
          }
          ha-svg-icon.status-icon.summer {
            color: #ff6046 !important;
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
            padding: 0.6em;
            font-weight: 600;
            font-size: 1.4em;
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
            transform: translate(-50%, -35%);
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
            font-size: 18px;
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
        `}};t([rt({attribute:!1})],Re.prototype,"hass",void 0),t([at()],Re.prototype,"_config",void 0),t([at()],Re.prototype,"_setTemp",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t,e){return(({finisher:t,descriptor:e})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,n=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(n.finisher=function(e){t(e,s)}),n}{const o=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(o,s)}})({descriptor:i=>{const s={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[e]&&(this[e]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null),this[e]}}return s}})}("ha-card")],Re.prototype,"_card",void 0),Re=t([ot("better-thermostat-ui-card")],Re);export{Re as BetterThermostatUiCard};
