function t(t,e,i,n){var r,o=arguments.length,a=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new o(i,t,n)},s=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:l,defineProperty:c,getOwnPropertyDescriptor:u,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:m}=Object,p=globalThis,_=p.trustedTypes,v=_?_.emptyScript:"",f=p.reactiveElementPolyfillSupport,g=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:r}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const o=n?.call(this);r.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of n){const n=document.createElement("style"),r=e.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n,this[n]=r.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i,n=!1,r){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??y)(n?r:this[t],e))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[g("elementProperties")]=new Map,k[g("finalized")]=new Map,f?.({ReactiveElement:k}),(p.reactiveElementVersions??=[]).push("2.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,A=$.trustedTypes,x=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,T="?"+E,S=`<${T}>`,z=document,D=()=>z.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,M="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,P=/>/g,H=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,I=/"/g,R=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),U=F(1),B=F(2),Z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,Y=z.createTreeWalker(z,129);function X(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,n=[];let r,o=2===e?"<svg>":"",a=O;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,u=0;for(;u<i.length&&(a.lastIndex=u,l=a.exec(i),null!==l);)u=a.lastIndex,a===O?"!--"===l[1]?a=V:void 0!==l[1]?a=P:void 0!==l[2]?(R.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=H):void 0!==l[3]&&(a=H):a===H?">"===l[0]?(a=r??O,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?H:'"'===l[3]?I:N):a===I||a===N?a=H:a===V||a===P?a=O:(a=H,r=void 0);const d=a===H&&t[e+1].startsWith("/>")?" ":"";o+=a===O?i+S:c>=0?(n.push(s),i.slice(0,c)+C+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[X(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};class J{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,o=0;const a=t.length-1,s=this.parts,[l,c]=K(t,e);if(this.el=J.createElement(l,i),Y.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Y.nextNode())&&s.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=n.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);s.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?nt:"@"===a[1]?rt:et}),n.removeAttribute(t)}else t.startsWith(E)&&(s.push({type:6,index:r}),n.removeAttribute(t));if(R.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],D()),Y.nextNode(),s.push({type:2,index:++r});n.append(t[e],D())}}}else if(8===n.nodeType)if(n.data===T)s.push({type:2,index:r});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)s.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,n){if(e===Z)return e;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const o=j(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,n)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??z).importNode(e,!0);Y.currentNode=n;let r=Y.nextNode(),o=0,a=0,s=i[0];for(;void 0!==s;){if(o===s.index){let e;2===s.type?e=new tt(r,r.nextSibling,this,t):1===s.type?e=new s.ctor(r,s.name,s.strings,this,t):6===s.type&&(e=new ot(r,this,t)),this._$AV.push(e),s=i[++a]}o!==s?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=z,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),j(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==W&&j(this._$AH)?this._$AA.nextSibling.data=t:this.$(z.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Q(n,this),i=t.u(this.options);t.p(e),this.$(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}T(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const r of t)n===e.length?e.push(i=new tt(this.k(D()),this.k(D()),this,this.options)):i=e[n],i._$AI(r),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,n){const r=this.strings;let o=!1;if(void 0===r)t=G(this,t,e,0),o=!j(t)||t!==this._$AH&&t!==Z,o&&(this._$AH=t);else{const n=t;let a,s;for(t=r[0],a=0;a<r.length-1;a++)s=G(this,n[i+a],e,a),s===Z&&(s=this._$AH[a]),o||=!j(s)||s!==this._$AH[a],s===W?t=W:t!==W&&(t+=(s??"")+r[a+1]),this._$AH[a]=s}o&&!n&&this.O(t)}O(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===W?void 0:t}}class nt extends et{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends et{constructor(t,e,i,n,r){super(t,e,i,n,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??W)===Z)return;const i=this._$AH,n=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==W&&(i===W||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const at=$.litHtmlPolyfillSupport;at?.(J,tt),($.litHtmlVersions??=[]).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class st extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let r=n._$litPart$;if(void 0===r){const t=i?.renderBefore??null;n._$litPart$=r=new tt(e.insertBefore(D(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}st._$litElement$=!0,st.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:st});const lt=globalThis.litElementPolyfillSupport;lt?.({LitElement:st}),(globalThis.litElementVersions??=[]).push("4.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},dt=(t=ut,e,i)=>{const{kind:n,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),o.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,r,t)},init(e){return void 0!==e&&this.C(n,void 0,t),e}}}if("setter"===n){const{name:n}=i;return function(i){const r=this[n];e.call(this,i),this.requestUpdate(n,r,t)}}throw Error("Unsupported decorator location: "+n)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,n?{...t,wrapped:!0}:t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function mt(t){return ht({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function _t(t,e){return(i,n,r)=>{const o=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:a}="object"==typeof n?i:r??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return pt(i,n,{get(){if(e){let e=t.call(this);return void 0===e&&(e=o(this),a.call(this,e)),e}return o(this)}})}return pt(i,n,{get(){return o(this)}})}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt=1;class ft{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ft{constructor(t){if(super(t),t.type!==vt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.st?.has(t)&&this.it.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.it)t in e||(i.remove(t),this.it.delete(t));for(const t in e){const n=!!e[t];n===this.it.has(t)||this.st?.has(t)||(n?(i.add(t),this.it.add(t)):(i.remove(t),this.it.delete(t)))}return Z}});var bt="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5C10.8 5 11.6 5.2 12.4 5.4M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19C20.66 19 22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12C5 14.8 7.2 17 10 17C12.8 17 15 14.8 15 12C15 9.2 12.8 7 10 7M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z",yt="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",wt="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var kt={version:"version",current:"current"},$t={card:{climate:{disable_window:"Disable window",disable_summer:"Disable summer",disable_eco:"Disable eco",disable_heat:"Disable heat",disable_off:"Disable off",disable_menu:"Disable menu",disable_battery_warning:"Disable battery warning",disable_buttons:"Disable plus/minus buttons",eco_temperature:"Eco temperature",set_current_as_main:"Swap target with current temperature places"}}},At={window_open:"Window open",night_mode:"Night mode",eco:"Eco",summer:"Summer",cooling:"Cooling",heating:"Heating",cooling_off:"Cooling off",heating_off:"Heating off"},xt={common:kt,editor:$t,extra_states:At},Ct=Object.freeze({__proto__:null,common:kt,default:xt,editor:$t,extra_states:At}),Et={version:"Version",current:"Aktuell",current_humidity:"Aktuelle Luftfeuchtigkeit",current_temperature:"Aktuelle Temperatur",target_temperature:"Zieltemperatur"},Tt={card:{climate:{disable_window:"Fenster-offen-Anzeige deaktivieren",disable_summer:"Sommer-Anzeige deaktivieren",disable_eco:"Eco-Anzeige deaktivieren",disable_heat:"Heiz-Anzeige deaktivieren",disable_off:"Aus-Anzeige deaktivieren",disable_menu:"Menü deaktivieren",disable_battery_warning:"Batterie-Warnung deaktivieren",disable_buttons:"Plus/Minus Buttons deaktivieren",eco_temperature:"Eco Temperatur",set_current_as_main:"Zieltemperatur mit aktueller Temperatur tauschen"}}},St={window_open:"Fenster offen",window_closed:"Fenster geschlossen",night_mode:"Nachtmodus",eco:"Eco",summer:"Sommer",cooling:"Kühlen",heating:"Heizen",cooling_off:"Kühlung aus",heating_off:"Heizung aus"},zt={common:Et,editor:Tt,extra_states:St},Dt=Object.freeze({__proto__:null,common:Et,default:zt,editor:Tt,extra_states:St}),jt={version:"Version",current:"Actuel",current_humidity:"Humidité actuelle",current_temperature:"Température actuelle",target_temperature:"Température cible"},Lt={card:{climate:{disable_window:"Désactiver fenêtre",disable_summer:"Désactiver été",disable_eco:"Désactiver mode Éco",disable_heat:"Désactiver mode chauffe",disable_off:"Désactiver arrêt",disable_menu:"Désactiver le menu",disable_battery_warning:"Désactiver l'avertissement de batterie",disable_buttons:"Désactiver les boutons plus/moins",eco_temperature:"Température Éco",set_current_as_main:"Échanger température cible avec température locale"}}},Mt={window_open:"Fenêtre ouverte",window_closed:"Fenêtre fermée",night_mode:"Mode nuit",eco:"Éco",summer:"Été",cooling:"Refroidissement",heating:"Chauffage",cooling_off:"Refroidissement éteint",heating_off:"Chauffage éteint"},Ot={common:jt,editor:Lt,extra_states:Mt},Vt=Object.freeze({__proto__:null,common:jt,default:Ot,editor:Lt,extra_states:Mt}),Pt={version:"версия",current:"текущий",current_humidity:"Текущая влажность",current_temperature:"Текущая температура",target_temperature:"Целевая температура"},Ht={card:{climate:{disable_window:"Отключить окно",disable_summer:"Отключить лето",disable_eco:"Отключить режим eco",disable_heat:"Отключить обогрев",disable_off:"Отключить",disable_menu:"Отключить меню",disable_battery_warning:"Отключить предупреждение о разряде батареи",disable_buttons:"Отключить кнопку плюс/минус",eco_temperature:"Eco температура",set_current_as_main:"Поменять местами требуемую и текущую температуру"}}},Nt={window_open:"Окно открыто",window_closed:"Окно закрыто",night_mode:"Ночной режим",eco:"Эко",summer:"Лето",cooling:"Охлаждение",heating:"Отопление",cooling_off:"Охлаждение выключено",heating_off:"Отопление выключено"},It={common:Pt,editor:Ht,extra_states:Nt},Rt=Object.freeze({__proto__:null,common:Pt,default:It,editor:Ht,extra_states:Nt}),Ft={version:"Wersja",current:"Aktualna",current_humidity:"Aktualna wilgotność",current_temperature:"Aktualna temperatura",target_temperature:"Temperatura docelowa"},Ut={card:{climate:{disable_window:"Wyłącz okno",disable_summer:"Wyłacz lato",disable_eco:"Wyłącz tryb eko",disable_heat:"Wyłącz grzanie",disable_off:"Wyłącz wyłącznik",disable_menu:"Wyłącz menu",disable_battery_warning:"Wyłącz ostrzeżenie o baterii",disable_buttons:"Wyłącz przyciski plus/minus",eco_temperature:"Temperatura eko",set_current_as_main:"Zamień miejscami temperature docelową z aktualną"}}},Bt={window_open:"Otwarte okno",window_closed:"Okno zamknięte",night_mode:"Tryb nocny",eco:"Tryb ekonomiczny",summer:"Lato",cooling:"Chłodzenie",heating:"Ogrzewanie",cooling_off:"Chłodzenie wyłączone",heating_off:"Ogrzewanie wyłączone"},Zt={common:Ft,editor:Ut,extra_states:Bt},Wt=Object.freeze({__proto__:null,common:Ft,default:Zt,editor:Ut,extra_states:Bt}),qt={version:"verzia",current:"aktuálny",current_humidity:"Aktuálna vlhkosť",current_temperature:"Aktuálna teplota",target_temperature:"Cieľová teplota"},Yt={card:{climate:{disable_window:"Zakázať okno",disable_summer:"Zakázať leto",disable_eco:"Zakázať eco",disable_heat:"Zakázať kúrenie",disable_off:"Vypnúť",disable_menu:"Zakázať menu",disable_battery_warning:"Zakázať upozornenie na batériu",disable_buttons:"Zakázať plus/mínus tlačidlá",eco_temperature:"Eco teplota",set_current_as_main:"Vymeňte cieľ za miesta s aktuálnou teplotou"}}},Xt={window_open:"Okno otvorené",window_closed:"Okno zatvorené",night_mode:"Nočný mód",eco:"Eco",summer:"Leto",cooling:"Chladenie",heating:"Kúrenie",cooling_off:"Chladenie vypnuté",heating_off:"Kúrenie vypnuté"},Kt={common:qt,editor:Yt,extra_states:Xt},Jt={version:"verzija",current:"trenutno",current_humidity:"Trenutna vlažnost",current_temperature:"Trenutna temperatura",target_temperature:"Ciljana temperatura"},Gt={card:{climate:{disable_window:"Isključi indikator prozora",disable_summer:"Isključi indikator ljeta",disable_eco:"Isključi prikaz eco gumba",disable_heat:"Isključi prikaz gumba paljenja",disable_off:"Isključi prikaz gumba gašenja",disable_menu:"Isključi prikaz izbornika",disable_battery_warning:"Isključi upozorenje baterije",disable_buttons:"Isključi prikaz plus/minus gumbi",eco_temperature:"Eco temperatura",set_current_as_main:"Zamijeni prikaz željene i trenutne temperature"}}},Qt={window_open:"Prozor otvoren",window_closed:"Prozor zatvoren",night_mode:"Noćni način",eco:"Eco",summer:"Ljeto",cooling:"Hlađenje",heating:"Grijanje",cooling_off:"Hlađenje isključeno",heating_off:"Grijanje isključeno"},te={common:Jt,editor:Gt,extra_states:Qt},ee={version:"Verzió",current:"Aktuális",current_humidity:"Jelenlegi páratartalom",current_temperature:"Jelenlegi hőmérséklet",target_temperature:"Célhőmérséklet"},ie={card:{climate:{disable_window:"Ablak kikapcsolás",disable_summer:"Nyár kikapcsolás",disable_eco:"Eco kikapcsolás",disable_heat:"Fűtés kikacsolás",disable_off:"Kikapcsolás inaktiválás",disable_menu:"Menü letiltása",disable_battery_warning:"Akkumulátor figyelmeztetés letiltása",disable_buttons:"Plusz/mínusz gombok letiltása",eco_temperature:"Eco hőmérséklet",set_current_as_main:"Aktuális hőmérséklet használata"}}},ne={window_open:"Ablak nyitva",window_closed:"Ablak zárva",night_mode:"Éjszakai mód",eco:"Eco",summer:"Nyár",cooling:"Hűtés",heating:"Fűtés",cooling_off:"Hűtés kikapcsolva",heating_off:"Fűtés kikapcsolva"},re={common:ee,editor:ie,extra_states:ne},oe={version:"Version",current:"Nuværende",current_humidity:"Nuværende fugtighed",current_temperature:"Nuværende temperatur",target_temperature:"Målt temperatur"},ae={card:{climate:{disable_window:"Deaktiver vindue-åben indikator",disable_summer:"Deaktiver sommer indikator",disable_eco:"Deaktiver Eco indikator",disable_heat:"Deaktiver varme indikator",disable_off:"Deaktiver slukket indikator",disable_menu:"Deaktiver menu",disable_battery_warning:"Deaktiver batteriadvarsel",disable_buttons:"Deaktiver plus/minus knapper",eco_temperature:"Eco temperatur",set_current_as_main:"Erstat målt temperatur med nuværende temperatur"}}},se={window_open:"Vindue åbent",window_closed:"Vindue lukket",night_mode:"Nattetilstand",eco:"Eco",summer:"Sommer",cooling:"Køling",heating:"Opvarmning",cooling_off:"Køling slukket",heating_off:"Opvarmning slukket"},le={common:oe,editor:ae,extra_states:se},ce={version:"Versión",current:"Actual",current_humidity:"Humedad actual",current_temperature:"Temperatura actual",target_temperature:"Temperatura objetivo"},ue={card:{climate:{disable_window:"Deshabilitar ventana",disable_summer:"Deshabilitar verano",disable_eco:"Deshabilitar eco",disable_heat:"Deshabilitar calor",disable_off:"Deshabilitar apagado",disable_menu:"Deshabilitar menú",disable_battery_warning:"Deshabilitar alerta de batería",disable_buttons:"Deshabilitar botones más/menos",eco_temperature:"Temperatura Eco",set_current_as_main:"Fijar temperatura objetivo a temperatura actual"}}},de={window_open:"Ventana abierta",window_closed:"Ventana cerrada",night_mode:"Modo noche",eco:"Eco",summer:"Verano",cooling:"Enfriamiento",heating:"Calefacción",cooling_off:"Enfriamiento apagado",heating_off:"Calefacción apagada"},he={common:ce,editor:ue,extra_states:de},me={version:"versiyon",current:"şimdiki",current_humidity:"Mevcut Nem",current_temperature:"Mevcut Sıcaklık",target_temperature:"Hedef Sıcaklık"},pe={card:{climate:{disable_window:"Pencereyi devre dışı bırak",disable_summer:"Yazı devre dışı bırak",disable_eco:"Eco'yu devre dışı bırak",disable_heat:"Isıtmayı devre dışı bırak",disable_off:"Kapatmayı devre dışı bırak",disable_menu:"Menüyü devre dışı bırak",disable_battery_warning:"Pil uyarısını devre dışı bırak",disable_buttons:"Artı/eksi düğmelerini devre dışı bırak",eco_temperature:"Eco sıcaklık",set_current_as_main:"Hedef ve mevcut sıcaklık yerlerini değiştir"}}},_e={window_open:"Pencere açık",window_closed:"Pencere kapalı",night_mode:"Gece modu",eco:"Eco",summer:"Yaz",cooling:"Soğutma",heating:"Isıtma",cooling_off:"Soğutma kapalı",heating_off:"Isıtma kapalı"},ve={common:me,editor:pe,extra_states:_e},fe={version:"versione",current:"Corrente",current_humidity:"Umidità attuale",current_temperature:"Temperatura attuale",target_temperature:"Temperatura obiettivo"},ge={card:{climate:{disable_window:"Disabilita indicatore Finestra",disable_summer:"Disabilita indicatore Estate",disable_eco:"Disabilita tasto eco",disable_heat:"Disabilita tasto heat",disable_off:"Disabililita tasto off",disable_menu:"Disabilita menu",disable_battery_warning:"Disabilita avviso batteria",disable_buttons:"Disabilita pulsanti più/meno",eco_temperature:"Temperatura target",set_current_as_main:"Imposta la temperatura attuale come target"}}},be={window_open:"Finestra aperta",window_closed:"Finestra chiusa",night_mode:"Modalità notturna",eco:"Eco",summer:"Estate",cooling:"Raffreddamento",heating:"Riscaldamento",cooling_off:"Raffreddamento spento",heating_off:"Riscaldamento spento"},ye={common:fe,editor:ge,extra_states:be},we={version:"Versão",current:"Atual",current_humidity:"Humidade atual",current_temperature:"Temperatura atual",target_temperature:"Temperatura alvo"},ke={card:{climate:{disable_window:"Desactivar Janela",disable_summer:"Desactivar Verão",disable_eco:"Desactivar Eco",disable_heat:"Desactivar Aquecimento",disable_off:"Desactivar Off",disable_menu:"Desativar menu",disable_battery_warning:"Desativar aviso de bateria",disable_buttons:"Desativar botões de mais/menos",eco_temperature:"Modo Eco",set_current_as_main:"Mudar para a temperatura local actual"}}},$e={window_open:"Janela aberta",window_closed:"Janela fechada",night_mode:"Modo noturno",eco:"Eco",summer:"Verão",cooling:"Refrigeração",heating:"Aquecimento",cooling_off:"Refrigeração desligada",heating_off:"Aquecimento desligado"},Ae={common:we,editor:ke,extra_states:$e},xe={version:"版本",current:"当前",current_humidity:"当前湿度",current_temperature:"当前温度",target_temperature:"目标温度"},Ce={card:{climate:{disable_window:"禁用窗口打开显示",disable_summer:"禁用夏季显示",disable_eco:"禁用节能显示",disable_heat:"禁用加热显示",disable_off:"禁用关闭显示",disable_menu:"禁用菜单",disable_battery_warning:"禁用电池警告",disable_buttons:"禁用加/减按钮",eco_temperature:"节能温度",set_current_as_main:"将目标温度与当前温度交换"}}},Ee={window_open:"窗口打开",window_closed:"窗口关闭",night_mode:"夜间模式",eco:"节能",summer:"夏季",cooling:"冷却",heating:"加热",cooling_off:"冷却关闭",heating_off:"加热关闭"},Te={common:xe,editor:Ce,extra_states:Ee},Se={version:"версія",current:"поточний",current_humidity:"Поточна вологість",current_temperature:"Поточна температура",target_temperature:"Цільова температура"},ze={card:{climate:{disable_window:"Прибрати вікно",disable_summer:"Прибрати літо",disable_eco:"Прибрати еко",disable_heat:"Прибрати обігрів",disable_off:"Прибрати відключення",disable_menu:"Прибрати меню",disable_battery_warning:"Прибрати попередження про акумулятор",disable_buttons:"Прибрати кнопки плюс/мінус",eco_temperature:"Еко температура",set_current_as_main:"Поміняйте місцями цільову з поточною температурою"}}},De={window_open:"Вікно відкрите",window_closed:"Вікно закрите",night_mode:"Нічний режим",eco:"Еко",summer:"Літо",cooling:"Охолодження",heating:"Опалення",cooling_off:"Охолодження вимкнено",heating_off:"Опалення вимкнено"},je={common:Se,editor:ze,extra_states:De},Le={version:"Έκδοση",current:"Τρέχων",current_humidity:"Τρέχουσα υγρασία",current_temperature:"Τρέχουσα θερμοκρασία",target_temperature:"Στόχος θερμοκρασίας"},Me={card:{climate:{disable_window:"Απενεργοποίηση ένδειξης ανοιχτού παραθύρου",disable_summer:"Απενεργοποίηση ένδειξης καλοκαιριού",disable_eco:"Απενεργοποίηση ένδειξης eco",disable_heat:"Απενεργοποίηση ένδειξης θέρμανσης",disable_off:"Απενεργοποίηση ένδειξης απενεργοποίησης",disable_menu:"Απενεργοποίηση μενού",disable_battery_warning:"Απενεργοποίηση προειδοποίησης μπαταρίας",disable_buttons:"Απενεργοποίηση κουμπιών συν/πλην",eco_temperature:"Eco θερμοκρασία",set_current_as_main:"Ανταλλαγή στόχου θερμοκρασίας με την τρέχουσα θερμοκρασία"}}},Oe={window_open:"Παράθυρο ανοιχτό",window_closed:"Παράθυρο κλειστό",night_mode:"Λειτουργία νυκτός",eco:"Εξοικονόμηση",summer:"Καλοκαίρι",cooling:"Ψύξη",heating:"Θέρμανση",cooling_off:"Ψύξη απενεργοποιημένη",heating_off:"Θέρμανση απενεργοποιημένη"},Ve={common:Le,editor:Me,extra_states:Oe},Pe={version:"versie",current:"huidig",current_humidity:"Huidige luchtvochtigheid",current_temperature:"Huidige temperatuur",target_temperature:"Doeltemperatuur"},He={card:{climate:{disable_window:"Venster-open-weergave uitschakelen",disable_summer:"Zomerweergave uitschakelen",disable_eco:"Eco-weergave uitschakelen",disable_heat:"Verwarmingsweergave uitschakelen",disable_off:"Uit-weergave uitschakelen",disable_menu:"Menu uitschakelen",disable_battery_warning:"Batterijwaarschuwing uitschakelen",disable_buttons:"Plus/min-knoppen uitschakelen",eco_temperature:"Eco temperatuur",set_current_as_main:"Doeltemperatuur verwisselen met huidige temperatuur"}}},Ne={window_open:"Venster open",window_closed:"Venster gesloten",night_mode:"Nachtmodus",eco:"Eco",summer:"Zomer",cooling:"Koeling",heating:"Verwarming",cooling_off:"Koeling uit",heating_off:"Verwarming uit"},Ie={common:Pe,editor:He,extra_states:Ne},Re={version:"versjon",current:"nåværende",current_humidity:"Nåværende luftfuktighet",current_temperature:"Nåværende temperatur",target_temperature:"Måltemperatur"},Fe={card:{climate:{disable_window:"Deaktiver vindu-åpen visning",disable_summer:"Deaktiver sommer visning",disable_eco:"Deaktiver eco visning",disable_heat:"Deaktiver varme visning",disable_off:"Deaktiver av visning",disable_menu:"Deaktiver meny",disable_battery_warning:"Deaktiver batterivarsel",disable_buttons:"Deaktiver pluss/minus knapper",eco_temperature:"Eco temperatur",set_current_as_main:"Bytt måltemperatur med nåværende temperatur"}}},Ue={window_open:"Vindu åpent",window_closed:"Vindu lukket",night_mode:"Nattmodus",eco:"Eco",summer:"Sommer",cooling:"Kjøling",heating:"Oppvarming",cooling_off:"Kjøling av",heating_off:"Oppvarming av"},Be={common:Re,editor:Fe,extra_states:Ue},Ze={version:"Verze",current:"Aktuální",current_humidity:"Aktuální vlhkost",current_temperature:"Aktuální teplota",target_temperature:"Cílová teplota"},We={card:{climate:{disable_window:"Zakázat okno",disable_summer:"Zakázat léto",disable_eco:"Zakázat eco",disable_heat:"Zakázat topení",disable_off:"Zakázat vypnuto",disable_menu:"Zakázat menu",disable_battery_warning:"Zakázat upozornění baterie",disable_buttons:"Zakázat tlačítka plus/minus",eco_temperature:"Eco teplota",set_current_as_main:"Prohodit místa cílovoé a aktáalní teploty"}}},qe={window_open:"Okno otevřeno",window_closed:"Okno zavřeno",night_mode:"Noční režim",eco:"Eco",summer:"Léto",cooling:"Chlazení",heating:"Topení",cooling_off:"Chlazení vypnuto",heating_off:"Topení vypnuto"},Ye={common:Ze,editor:We,extra_states:qe},Xe={version:"različica",current:"trenutno",current_humidity:"Trenutna vlažnost",current_temperature:"Trenutna temperatura",target_temperature:"Ciljna temperatura"},Ke={card:{climate:{disable_window:"Onemogoči prikaz odprtega okna",disable_summer:"Onemogoči prikaz poletja",disable_eco:"Onemogoči prikaz eco",disable_heat:"Onemogoči prikaz ogrevanja",disable_off:"Onemogoči prikaz izklopa",disable_menu:"Onemogoči meni",disable_battery_warning:"Onemogoči opozorilo o bateriji",disable_buttons:"Onemogoči gumbe plus/minus",eco_temperature:"Eco temperatura",set_current_as_main:"Zamenjaj ciljno temperaturo s trenutno temperaturo"}}},Je={window_open:"Okno odprto",window_closed:"Okno zaprto",night_mode:"Nočni način",eco:"Eko",summer:"Poletje",cooling:"Hlajenje",heating:"Ogrevanje",cooling_off:"Hlajenje izklopljeno",heating_off:"Ogrevanje izklopljeno"},Ge={common:Xe,editor:Ke,extra_states:Je},Qe={version:"version",current:"Nuvarande",current_humidity:"Nuvarande luftfuktighet",current_temperature:"Nuvarande temperatur",target_temperature:"Måltemperatur"},ti={card:{climate:{disable_window:"Inaktivera fönster-öppen visning",disable_summer:"Inaktivera sommar visning",disable_eco:"Inaktivera eco visning",disable_heat:"Inaktivera värme visning",disable_off:"Inaktivera av visning",disable_menu:"Inaktivera meny",disable_battery_warning:"Inaktivera batterivarning",disable_buttons:"Inaktivera plus/minus knappar",eco_temperature:"Eco temperatur",set_current_as_main:"Byt måltemperatur med nuvarande temperatur"}}},ei={window_open:"Fönster öppet",window_closed:"Fönster stängt",night_mode:"Nattläge",eco:"Eco",summer:"Sommar",cooling:"Kylning",heating:"Uppvärmning",cooling_off:"Kylning av",heating_off:"Uppvärmning av"},ii={common:Qe,editor:ti,extra_states:ei},ni={version:"Версия",current:"Текущ",current_humidity:"Текуща влажност",current_temperature:"Текуща температура",target_temperature:"Целева температура"},ri={card:{climate:{disable_window:"Деактивиране на показване на отворен прозорец",disable_summer:"Деактивиране на показване на лято",disable_eco:"Деактивиране на показване на еко",disable_heat:"Деактивиране на показване на отопление",disable_off:"Деактивиране на показване на изключено",disable_menu:"Деактивиране на менюто",disable_battery_warning:"Деактивиране на предупреждение за батерията",disable_buttons:"Деактивиране на бутоните плюс/минус",eco_temperature:"Еко температура",set_current_as_main:"Размяна на целевата температура с текущата температура"}}},oi={window_open:"Прозорецът е отворен",window_closed:"Прозорецът е затворен",night_mode:"Нощен режим",eco:"Екологичен режим",summer:"Лято",cooling:"Охлаждане",heating:"Отопление",cooling_off:"Охлаждането е изключено",heating_off:"Отоплението е изключено"},ai={common:ni,editor:ri,extra_states:oi},si={version:"Versio",current:"Nykyinen",current_humidity:"Nykyinen kosteus",current_temperature:"Nykyinen lämpötila",target_temperature:"Tavoitelämpötila"},li={card:{climate:{disable_window:"Poista ikkuna auki -ilmoitus käytöstä",disable_summer:"Poista kesä -ilmoitus käytöstä",disable_eco:"Poista Eco -ilmoitus käytöstä",disable_heat:"Poista lämmitys -ilmoitus käytöstä",disable_off:"Poista pois päältä -ilmoitus käytöstä",disable_menu:"Poista valikko käytöstä",disable_battery_warning:"Poista akun varoitus käytöstä",disable_buttons:"Poista plus/miinus -painikkeet käytöstä",eco_temperature:"Eco lämpötila",set_current_as_main:"Vaihda tavoitelämpötila nykyiseen lämpötilaan"}}},ci={window_open:"Ikkuna auki",window_closed:"Ikkuna kiinni",night_mode:"Yötila",eco:"Eco",summer:"Kesä",cooling:"Jäähdytys",heating:"Lämmitys",cooling_off:"Jäähdytys pois päältä",heating_off:"Lämmitys pois päältä"},ui={common:si,editor:li,extra_states:ci},di={version:"versiune",current:"curent",current_humidity:"Umiditate curentă",current_temperature:"Temperatură curentă",target_temperature:"Temperatură țintă"},hi={card:{climate:{disable_window:"Dezactivează fereastra",disable_summer:"Dezactivează vara",disable_eco:"Dezactivează eco",disable_heat:"Dezactivează încălzirea",disable_off:"Dezactivează oprirea",disable_menu:"Dezactivează meniul",disable_battery_warning:"Dezactivează avertizarea bateriei",disable_buttons:"Dezactivează butoanele plus/minus",eco_temperature:"Temperatura eco",set_current_as_main:"Schimbă locurile temperaturii țintă cu cea curentă"}}},mi={window_open:"Fereastră deschisă",window_closed:"Fereastră închisă",night_mode:"Mod noapte",eco:"Eco",summer:"Vara",cooling:"Răcire",heating:"Încălzire",cooling_off:"Răcire oprită",heating_off:"Încălzire oprită"},pi={common:di,editor:hi,extra_states:mi},_i={version:"Versió",current:"Actual",current_humidity:"Humitat actual",current_temperature:"Temperatura actual",target_temperature:"Temperatura objectiu"},vi={card:{climate:{disable_window:"Desactivar indicador de finestra oberta",disable_summer:"Desactivar indicador d'estiu",disable_eco:"Desactivar indicador eco",disable_heat:"Desactivar indicador de calefacció",disable_off:"Desactivar indicador d'apagat",disable_menu:"Desactivar menú",disable_battery_warning:"Desactivar advertència de bateria",disable_buttons:"Desactivar botons de més/menys",eco_temperature:"Temperatura eco",set_current_as_main:"Intercanviar la temperatura objectiu amb la temperatura actual"}}},fi={window_open:"Finestra oberta",window_closed:"Finestra tancada",night_mode:"Mode nocturn",eco:"Eco",summer:"Estiu",cooling:"Refredament",heating:"Escalfament",cooling_off:"Refredament apagat",heating_off:"Escalfament apagat"},gi={common:_i,editor:vi,extra_states:fi},bi={version:"versijas",current:"pašreizējais",current_humidity:"Pašreizējais mitrums",current_temperature:"Pašreizējā temperatūra",target_temperature:"Mērķa temperatūra"},yi={card:{climate:{disable_window:"Atspējot logu indikatoru",disable_summer:"Atspējot vasaras režīmu",disable_eco:"Atspējot ekonomisko režīmu",disable_heat:"Atspējot sildīšanas režīmu",disable_off:"Atspējot izslēgšanu",disable_menu:"Atspējot izvēlni",disable_battery_warning:"Atspējot baterijas brīdinājumu",disable_buttons:"Atspējot plus/mīnus pogas",eco_temperature:"Eko režīma temperatūra",set_current_as_main:"Apmainīt pašreizējo un mērķa temperatūru vietām"}}},wi={window_open:"Logs atvērts",window_closed:"Logs aizvērts",night_mode:"Nakts režīms",eco:"Eko režīms",summer:"Vasaras režīms",cooling:"Dzesēšana",heating:"Apkure",cooling_off:"Dzesēšana izslēgta",heating_off:"Apkure izslēgta"},ki={common:bi,editor:yi,extra_states:wi};const $i={en:Ct,de:Dt,fr:Vt,ru:Rt,sk:Object.freeze({__proto__:null,common:qt,default:Kt,editor:Yt,extra_states:Xt}),hr:Object.freeze({__proto__:null,common:Jt,default:te,editor:Gt,extra_states:Qt}),hu:Object.freeze({__proto__:null,common:ee,default:re,editor:ie,extra_states:ne}),pl:Wt,da:Object.freeze({__proto__:null,common:oe,default:le,editor:ae,extra_states:se}),es:Object.freeze({__proto__:null,common:ce,default:he,editor:ue,extra_states:de}),tr:Object.freeze({__proto__:null,common:me,default:ve,editor:pe,extra_states:_e}),it:Object.freeze({__proto__:null,common:fe,default:ye,editor:ge,extra_states:be}),pt:Object.freeze({__proto__:null,common:we,default:Ae,editor:ke,extra_states:$e}),cn:Object.freeze({__proto__:null,common:xe,default:Te,editor:Ce,extra_states:Ee}),uk:Object.freeze({__proto__:null,common:Se,default:je,editor:ze,extra_states:De}),el:Object.freeze({__proto__:null,common:Le,default:Ve,editor:Me,extra_states:Oe}),nl:Object.freeze({__proto__:null,common:Pe,default:Ie,editor:He,extra_states:Ne}),no:Object.freeze({__proto__:null,common:Re,default:Be,editor:Fe,extra_states:Ue}),cs:Object.freeze({__proto__:null,common:Ze,default:Ye,editor:We,extra_states:qe}),sl:Object.freeze({__proto__:null,common:Xe,default:Ge,editor:Ke,extra_states:Je}),sv:Object.freeze({__proto__:null,common:Qe,default:ii,editor:ti,extra_states:ei}),bg:Object.freeze({__proto__:null,common:ni,default:ai,editor:ri,extra_states:oi}),fi:Object.freeze({__proto__:null,common:si,default:ui,editor:li,extra_states:ci}),ro:Object.freeze({__proto__:null,common:di,default:pi,editor:hi,extra_states:mi}),ca:Object.freeze({__proto__:null,common:_i,default:gi,editor:vi,extra_states:fi}),lv:Object.freeze({__proto__:null,common:bi,default:ki,editor:yi,extra_states:wi})},Ai="en";function xi({hass:t,string:e,search:i="",replace:n=""}){var r;const o=null!==(r=null==t?void 0:t.locale.language)&&void 0!==r?r:Ai;let a;try{a=e.split(".").reduce(((t,e)=>t[e]),$i[o])}catch(t){a=e.split(".").reduce(((t,e)=>t[e]),$i.en)}return void 0===a&&(a=e.split(".").reduce(((t,e)=>t[e]),$i.en)),""!==i&&""!==n&&(a=a.replace(i,n)),a}function Ci(t,e){try{return t.split(".").reduce(((t,e)=>t[e]),$i[e])}catch(t){return}}var Ei,Ti,Si=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function zi(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(n=t[i],r=e[i],!(n===r||Si(n)&&Si(r)))return!1;var n,r;return!0}function Di(t,e){void 0===e&&(e=zi);var i=null;function n(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];if(i&&i.lastThis===this&&e(n,i.lastArgs))return i.lastResult;var o=t.apply(this,n);return i={lastResult:o,lastArgs:n,lastThis:this},o}return n.clear=function(){i=null},n}Di((t=>new Intl.DateTimeFormat(t.language,{weekday:"long",month:"long",day:"numeric"}))),Di((t=>new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"}))),Di((t=>new Intl.DateTimeFormat(t.language,{year:"numeric",month:"numeric",day:"numeric"}))),Di((t=>new Intl.DateTimeFormat(t.language,{day:"numeric",month:"short"}))),Di((t=>new Intl.DateTimeFormat(t.language,{month:"long",year:"numeric"}))),Di((t=>new Intl.DateTimeFormat(t.language,{month:"long"}))),Di((t=>new Intl.DateTimeFormat(t.language,{year:"numeric"}))),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Ei||(Ei={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Ti||(Ti={}));const ji=Di((t=>{if(t.time_format===Ti.language||t.time_format===Ti.system){const e=t.time_format===Ti.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===Ti.am_pm}));Di((t=>new Intl.DateTimeFormat("en"!==t.language||ji(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"long",day:"numeric",hour:ji(t)?"numeric":"2-digit",minute:"2-digit",hour12:ji(t)}))),Di((t=>new Intl.DateTimeFormat("en"!==t.language||ji(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"long",day:"numeric",hour:ji(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:ji(t)}))),Di((t=>new Intl.DateTimeFormat("en"!==t.language||ji(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:ji(t)}))),Di((t=>new Intl.DateTimeFormat("en"!==t.language||ji(t)?t.language:"en-u-hc-h23",{hour:"numeric",minute:"2-digit",hour12:ji(t)}))),Di((t=>new Intl.DateTimeFormat("en"!==t.language||ji(t)?t.language:"en-u-hc-h23",{hour:ji(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:ji(t)}))),Di((t=>new Intl.DateTimeFormat("en"!==t.language||ji(t)?t.language:"en-u-hc-h23",{weekday:"long",hour:ji(t)?"numeric":"2-digit",minute:"2-digit",hour12:ji(t)})));const Li=(t,e,i,n)=>{n=n||{},i=null==i?{}:i;const r=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,t.dispatchEvent(r),r},Mi=(t,e,i)=>Math.min(Math.max(t,e),i),Oi=(t,e,i)=>{const n=e?(t=>{switch(t.number_format){case Ei.comma_decimal:return["en-US","en"];case Ei.decimal_comma:return["de","es","it"];case Ei.space_comma:return["fr","sv","cs"];case Ei.system:return;default:return t.language}})(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==Ei.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(n,Vi(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,Vi(t,i)).format(Number(t))}return"string"==typeof t?t:`${((t,e=2)=>Math.round(t*10**e)/10**e)(t,null==i?void 0:i.maximumFractionDigits).toString()}${"currency"===(null==i?void 0:i.style)?` ${i.currency}`:""}`},Vi=(t,e)=>{const i=Object.assign({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){const e=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=e,i.maximumFractionDigits=e}return i};class Pi extends TypeError{constructor(t,e){let i;const{message:n,explanation:r,...o}=t,{path:a}=t,s=0===a.length?n:`At path: ${a.join(".")} -- ${n}`;super(r??s),null!=r&&(this.cause=s),Object.assign(this,o),this.name=this.constructor.name,this.failures=()=>i??(i=[t,...e()])}}function Hi(t){return"object"==typeof t&&null!=t}function Ni(t){return"symbol"==typeof t?t.toString():"string"==typeof t?JSON.stringify(t):`${t}`}function Ii(t,e,i,n){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:r,branch:o}=e,{type:a}=i,{refinement:s,message:l=`Expected a value of type \`${a}\`${s?` with refinement \`${s}\``:""}, but received: \`${Ni(n)}\``}=t;return{value:n,type:a,refinement:s,key:r[r.length-1],path:r,branch:o,...t,message:l}}function*Ri(t,e,i,n){(function(t){return Hi(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const r of t){const t=Ii(r,e,i,n);t&&(yield t)}}function*Fi(t,e,i={}){const{path:n=[],branch:r=[t],coerce:o=!1,mask:a=!1}=i,s={path:n,branch:r};if(o&&(t=e.coercer(t,s),a&&"type"!==e.type&&Hi(e.schema)&&Hi(t)&&!Array.isArray(t)))for(const i in t)void 0===e.schema[i]&&delete t[i];let l="valid";for(const n of e.validator(t,s))n.explanation=i.message,l="not_valid",yield[n,void 0];for(let[c,u,d]of e.entries(t,s)){const e=Fi(u,d,{path:void 0===c?n:[...n,c],branch:void 0===c?r:[...r,u],coerce:o,mask:a,message:i.message});for(const i of e)i[0]?(l=null!=i[0].refinement?"not_refined":"not_valid",yield[i[0],void 0]):o&&(u=i[1],void 0===c?t=u:t instanceof Map?t.set(c,u):t instanceof Set?t.add(u):Hi(t)&&(void 0!==u||c in t)&&(t[c]=u))}if("not_valid"!==l)for(const n of e.refiner(t,s))n.explanation=i.message,l="not_refined",yield[n,void 0];"valid"===l&&(yield[void 0,t])}class Ui{constructor(t){const{type:e,schema:i,validator:n,refiner:r,coercer:o=(t=>t),entries:a=function*(){}}=t;this.type=e,this.schema=i,this.entries=a,this.coercer=o,this.validator=n?(t,e)=>Ri(n(t,e),e,this,t):()=>[],this.refiner=r?(t,e)=>Ri(r(t,e),e,this,t):()=>[]}assert(t,e){return Bi(t,this,e)}create(t,e){return function(t,e,i){const n=Zi(t,e,{coerce:!0,message:i});if(n[0])throw n[0];return n[1]}(t,this,e)}is(t){return function(t,e){const i=Zi(t,e);return!i[0]}(t,this)}mask(t,e){return function(t,e,i){const n=Zi(t,e,{coerce:!0,mask:!0,message:i});if(n[0])throw n[0];return n[1]}(t,this,e)}validate(t,e={}){return Zi(t,this,e)}}function Bi(t,e,i){const n=Zi(t,e,{message:i});if(n[0])throw n[0]}function Zi(t,e,i={}){const n=Fi(t,e,i),r=function(t){const{done:e,value:i}=t.next();return e?void 0:i}(n);if(r[0]){const t=new Pi(r[0],(function*(){for(const t of n)t[0]&&(yield t[0])}));return[t,void 0]}return[void 0,r[1]]}function Wi(t,e){return new Ui({type:t,schema:null,validator:e})}function qi(t){return new Ui({type:"array",schema:t,*entries(e){if(t&&Array.isArray(e))for(const[i,n]of e.entries())yield[i,n,t]},coercer:t=>Array.isArray(t)?t.slice():t,validator:t=>Array.isArray(t)||`Expected an array value, but received: ${Ni(t)}`})}function Yi(){return Wi("boolean",(t=>"boolean"==typeof t))}function Xi(t){const e=Ni(t),i=typeof t;return new Ui({type:"literal",schema:"string"===i||"number"===i||"boolean"===i?t:null,validator:i=>i===t||`Expected the literal \`${e}\`, but received: ${Ni(i)}`})}function Ki(){return Wi("number",(t=>"number"==typeof t&&!isNaN(t)||`Expected a number, but received: ${Ni(t)}`))}function Ji(t){const e=t?Object.keys(t):[],i=Wi("never",(()=>!1));return new Ui({type:"object",schema:t||null,*entries(n){if(t&&Hi(n)){const r=new Set(Object.keys(n));for(const i of e)r.delete(i),yield[i,n[i],t[i]];for(const t of r)yield[t,n[t],i]}},validator:t=>Hi(t)||`Expected an object, but received: ${Ni(t)}`,coercer:t=>Hi(t)?{...t}:t})}function Gi(t){return new Ui({...t,validator:(e,i)=>void 0===e||t.validator(e,i),refiner:(e,i)=>void 0===e||t.refiner(e,i)})}function Qi(){return Wi("string",(t=>"string"==typeof t||`Expected a string, but received: ${Ni(t)}`))}function tn(t){const e=Object.keys(t);return new Ui({type:"type",schema:t,*entries(i){if(Hi(i))for(const n of e)yield[n,i[n],t[n]]},validator:t=>Hi(t)||`Expected an object, but received: ${Ni(t)}`,coercer:t=>Hi(t)?{...t}:t})}function en(t){const e=t.map((t=>t.type)).join(" | ");return new Ui({type:"union",schema:null,coercer(e){for(const i of t){const[t,n]=i.validate(e,{coerce:!0});if(!t)return n}return e},validator(i,n){const r=[];for(const e of t){const[...t]=Fi(i,e,n),[o]=t;if(!o[0])return[];for(const[e]of t)e&&r.push(e)}return[`Expected the value to satisfy a union of \`${e}\`, but received: ${Ni(i)}`,...r]}})}const nn=Ji({user:Qi()}),rn=en([Yi(),Ji({text:Gi(Qi()),excemptions:Gi(qi(nn))})]),on=Ji({action:Xi("url"),url_path:Qi(),confirmation:Gi(rn)}),an=Ji({action:Xi("call-service"),service:Qi(),service_data:Gi(Ji()),data:Gi(Ji()),target:Gi(Ji({entity_id:Gi(en([Qi(),qi(Qi())])),device_id:Gi(en([Qi(),qi(Qi())])),area_id:Gi(en([Qi(),qi(Qi())]))})),confirmation:Gi(rn)}),sn=Ji({action:Xi("navigate"),navigation_path:Qi(),confirmation:Gi(rn)}),ln=tn({action:Xi("fire-dom-event")}),cn=Ji({action:function(t){const e={},i=t.map((t=>Ni(t))).join();for(const i of t)e[i]=i;return new Ui({type:"enums",schema:e,validator:e=>t.includes(e)||`Expected one of \`${i}\`, but received: ${Ni(e)}`})}(["none","toggle","more-info","call-service","url","navigate"]),confirmation:Gi(rn)});var un;un=t=>{if(t&&"object"==typeof t&&"action"in t)switch(t.action){case"call-service":return an;case"fire-dom-event":return ln;case"navigate":return sn;case"url":return on}return cn},new Ui({type:"dynamic",schema:null,*entries(t,e){const i=un(t,e);yield*i.entries(t,e)},validator:(t,e)=>un(t,e).validator(t,e),coercer:(t,e)=>un(t,e).coercer(t,e),refiner:(t,e)=>un(t,e).refiner(t,e)}),a`
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
`;const dn=([[t,e],[i,n]],[r,o])=>[t*r+e*o,i*r+n*o],hn=([t,e],[i,n])=>[t+i,e+n],mn=t=>t/180*Math.PI,pn=t=>{const{x:e,y:i,r:n,start:r,end:o,rotate:a=0}=t,s=e,l=i,c=n,u=n,d=mn(r),h=(mn(o)-d)%(2*Math.PI),m=mn(a),p=(t=>[[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]])(m),[_,v]=hn(dn(p,[c*Math.cos(d),u*Math.sin(d)]),[s,l]),[f,g]=hn(dn(p,[c*Math.cos(d+h),u*Math.sin(d+h)]),[s,l]),b=h>Math.PI?1:0,y=h>0?1:0;return["M",_,v,"A",c,u,m/(2*Math.PI)*360,b,y,f,g].join(" ")};function _n(){return _n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},_n.apply(this,arguments)}function vn(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function fn(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var gn,bn="function"!=typeof Object.assign?function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var n=arguments[i];if(null!=n)for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}return e}:Object.assign,yn=["","webkit","Moz","MS","ms","o"],wn="undefined"==typeof document?{style:{}}:document.createElement("div"),kn=Math.round,$n=Math.abs,An=Date.now;function xn(t,e){for(var i,n,r=e[0].toUpperCase()+e.slice(1),o=0;o<yn.length;){if((n=(i=yn[o])?i+r:e)in t)return n;o++}}gn="undefined"==typeof window?{}:window;var Cn=xn(wn.style,"touchAction"),En=void 0!==Cn;var Tn="compute",Sn="auto",zn="manipulation",Dn="none",jn="pan-x",Ln="pan-y",Mn=function(){if(!En)return!1;var t={},e=gn.CSS&&gn.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach((function(i){return t[i]=!e||gn.CSS.supports("touch-action",i)})),t}(),On="ontouchstart"in gn,Vn=void 0!==xn(gn,"PointerEvent"),Pn=On&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),Hn="touch",Nn="mouse",In=25,Rn=1,Fn=4,Un=8,Bn=1,Zn=2,Wn=4,qn=8,Yn=16,Xn=Zn|Wn,Kn=qn|Yn,Jn=Xn|Kn,Gn=["x","y"],Qn=["clientX","clientY"];function tr(t,e,i){var n;if(t)if(t.forEach)t.forEach(e,i);else if(void 0!==t.length)for(n=0;n<t.length;)e.call(i,t[n],n,t),n++;else for(n in t)t.hasOwnProperty(n)&&e.call(i,t[n],n,t)}function er(t,e){return"function"==typeof t?t.apply(e&&e[0]||void 0,e):t}function ir(t,e){return t.indexOf(e)>-1}var nr=function(){function t(t,e){this.manager=t,this.set(e)}var e=t.prototype;return e.set=function(t){t===Tn&&(t=this.compute()),En&&this.manager.element.style&&Mn[t]&&(this.manager.element.style[Cn]=t),this.actions=t.toLowerCase().trim()},e.update=function(){this.set(this.manager.options.touchAction)},e.compute=function(){var t=[];return tr(this.manager.recognizers,(function(e){er(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))})),function(t){if(ir(t,Dn))return Dn;var e=ir(t,jn),i=ir(t,Ln);return e&&i?Dn:e||i?e?jn:Ln:ir(t,zn)?zn:Sn}(t.join(" "))},e.preventDefaults=function(t){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var n=this.actions,r=ir(n,Dn)&&!Mn[Dn],o=ir(n,Ln)&&!Mn[Ln],a=ir(n,jn)&&!Mn[jn];if(r){var s=1===t.pointers.length,l=t.distance<2,c=t.deltaTime<250;if(s&&l&&c)return}if(!a||!o)return r||o&&i&Xn||a&&i&Kn?this.preventSrc(e):void 0}},e.preventSrc=function(t){this.manager.session.prevented=!0,t.preventDefault()},t}();function rr(t,e){for(;t;){if(t===e)return!0;t=t.parentNode}return!1}function or(t){var e=t.length;if(1===e)return{x:kn(t[0].clientX),y:kn(t[0].clientY)};for(var i=0,n=0,r=0;r<e;)i+=t[r].clientX,n+=t[r].clientY,r++;return{x:kn(i/e),y:kn(n/e)}}function ar(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:kn(t.pointers[i].clientX),clientY:kn(t.pointers[i].clientY)},i++;return{timeStamp:An(),pointers:e,center:or(e),deltaX:t.deltaX,deltaY:t.deltaY}}function sr(t,e,i){i||(i=Gn);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return Math.sqrt(n*n+r*r)}function lr(t,e,i){i||(i=Gn);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return 180*Math.atan2(r,n)/Math.PI}function cr(t,e){return t===e?Bn:$n(t)>=$n(e)?t<0?Zn:Wn:e<0?qn:Yn}function ur(t,e,i){return{x:e/t||0,y:i/t||0}}function dr(t,e){var i=t.session,n=e.pointers,r=n.length;i.firstInput||(i.firstInput=ar(e)),r>1&&!i.firstMultiple?i.firstMultiple=ar(e):1===r&&(i.firstMultiple=!1);var o=i.firstInput,a=i.firstMultiple,s=a?a.center:o.center,l=e.center=or(n);e.timeStamp=An(),e.deltaTime=e.timeStamp-o.timeStamp,e.angle=lr(s,l),e.distance=sr(s,l),function(t,e){var i=e.center,n=t.offsetDelta||{},r=t.prevDelta||{},o=t.prevInput||{};e.eventType!==Rn&&o.eventType!==Fn||(r=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=r.x+(i.x-n.x),e.deltaY=r.y+(i.y-n.y)}(i,e),e.offsetDirection=cr(e.deltaX,e.deltaY);var c,u,d=ur(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=d.x,e.overallVelocityY=d.y,e.overallVelocity=$n(d.x)>$n(d.y)?d.x:d.y,e.scale=a?(c=a.pointers,sr((u=n)[0],u[1],Qn)/sr(c[0],c[1],Qn)):1,e.rotation=a?function(t,e){return lr(e[1],e[0],Qn)+lr(t[1],t[0],Qn)}(a.pointers,n):0,e.maxPointers=i.prevInput?e.pointers.length>i.prevInput.maxPointers?e.pointers.length:i.prevInput.maxPointers:e.pointers.length,function(t,e){var i,n,r,o,a=t.lastInterval||e,s=e.timeStamp-a.timeStamp;if(e.eventType!==Un&&(s>In||void 0===a.velocity)){var l=e.deltaX-a.deltaX,c=e.deltaY-a.deltaY,u=ur(s,l,c);n=u.x,r=u.y,i=$n(u.x)>$n(u.y)?u.x:u.y,o=cr(l,c),t.lastInterval=e}else i=a.velocity,n=a.velocityX,r=a.velocityY,o=a.direction;e.velocity=i,e.velocityX=n,e.velocityY=r,e.direction=o}(i,e);var h,m=t.element,p=e.srcEvent;rr(h=p.composedPath?p.composedPath()[0]:p.path?p.path[0]:p.target,m)&&(m=h),e.target=m}function hr(t,e,i){var n=i.pointers.length,r=i.changedPointers.length,o=e&Rn&&n-r==0,a=e&(Fn|Un)&&n-r==0;i.isFirst=!!o,i.isFinal=!!a,o&&(t.session={}),i.eventType=e,dr(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function mr(t){return t.trim().split(/\s+/g)}function pr(t,e,i){tr(mr(e),(function(e){t.addEventListener(e,i,!1)}))}function _r(t,e,i){tr(mr(e),(function(e){t.removeEventListener(e,i,!1)}))}function vr(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||window}var fr=function(){function t(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){er(t.options.enable,[t])&&i.handler(e)},this.init()}var e=t.prototype;return e.handler=function(){},e.init=function(){this.evEl&&pr(this.element,this.evEl,this.domHandler),this.evTarget&&pr(this.target,this.evTarget,this.domHandler),this.evWin&&pr(vr(this.element),this.evWin,this.domHandler)},e.destroy=function(){this.evEl&&_r(this.element,this.evEl,this.domHandler),this.evTarget&&_r(this.target,this.evTarget,this.domHandler),this.evWin&&_r(vr(this.element),this.evWin,this.domHandler)},t}();function gr(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}var br={pointerdown:Rn,pointermove:2,pointerup:Fn,pointercancel:Un,pointerout:Un},yr={2:Hn,3:"pen",4:Nn,5:"kinect"},wr="pointerdown",kr="pointermove pointerup pointercancel";gn.MSPointerEvent&&!gn.PointerEvent&&(wr="MSPointerDown",kr="MSPointerMove MSPointerUp MSPointerCancel");var $r=function(t){function e(){var i,n=e.prototype;return n.evEl=wr,n.evWin=kr,(i=t.apply(this,arguments)||this).store=i.manager.session.pointerEvents=[],i}return vn(e,t),e.prototype.handler=function(t){var e=this.store,i=!1,n=t.type.toLowerCase().replace("ms",""),r=br[n],o=yr[t.pointerType]||t.pointerType,a=o===Hn,s=gr(e,t.pointerId,"pointerId");r&Rn&&(0===t.button||a)?s<0&&(e.push(t),s=e.length-1):r&(Fn|Un)&&(i=!0),s<0||(e[s]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),i&&e.splice(s,1))},e}(fr);function Ar(t){return Array.prototype.slice.call(t,0)}function xr(t,e,i){for(var n=[],r=[],o=0;o<t.length;){var a=e?t[o][e]:t[o];gr(r,a)<0&&n.push(t[o]),r[o]=a,o++}return i&&(n=e?n.sort((function(t,i){return t[e]>i[e]})):n.sort()),n}var Cr={touchstart:Rn,touchmove:2,touchend:Fn,touchcancel:Un},Er=function(t){function e(){var i;return e.prototype.evTarget="touchstart touchmove touchend touchcancel",(i=t.apply(this,arguments)||this).targetIds={},i}return vn(e,t),e.prototype.handler=function(t){var e=Cr[t.type],i=Tr.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:Hn,srcEvent:t})},e}(fr);function Tr(t,e){var i,n,r=Ar(t.touches),o=this.targetIds;if(e&(2|Rn)&&1===r.length)return o[r[0].identifier]=!0,[r,r];var a=Ar(t.changedTouches),s=[],l=this.target;if(n=r.filter((function(t){return rr(t.target,l)})),e===Rn)for(i=0;i<n.length;)o[n[i].identifier]=!0,i++;for(i=0;i<a.length;)o[a[i].identifier]&&s.push(a[i]),e&(Fn|Un)&&delete o[a[i].identifier],i++;return s.length?[xr(n.concat(s),"identifier",!0),s]:void 0}var Sr={mousedown:Rn,mousemove:2,mouseup:Fn},zr=function(t){function e(){var i,n=e.prototype;return n.evEl="mousedown",n.evWin="mousemove mouseup",(i=t.apply(this,arguments)||this).pressed=!1,i}return vn(e,t),e.prototype.handler=function(t){var e=Sr[t.type];e&Rn&&0===t.button&&(this.pressed=!0),2&e&&1!==t.which&&(e=Fn),this.pressed&&(e&Fn&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:Nn,srcEvent:t}))},e}(fr),Dr=2500;function jr(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var i={x:e.clientX,y:e.clientY},n=this.lastTouches;this.lastTouches.push(i);setTimeout((function(){var t=n.indexOf(i);t>-1&&n.splice(t,1)}),Dr)}}function Lr(t,e){t&Rn?(this.primaryTouch=e.changedPointers[0].identifier,jr.call(this,e)):t&(Fn|Un)&&jr.call(this,e)}function Mr(t){for(var e=t.srcEvent.clientX,i=t.srcEvent.clientY,n=0;n<this.lastTouches.length;n++){var r=this.lastTouches[n],o=Math.abs(e-r.x),a=Math.abs(i-r.y);if(o<=25&&a<=25)return!0}return!1}var Or=function(){return function(t){function e(e,i){var n;return(n=t.call(this,e,i)||this).handler=function(t,e,i){var r=i.pointerType===Hn,o=i.pointerType===Nn;if(!(o&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(r)Lr.call(fn(fn(n)),e,i);else if(o&&Mr.call(fn(fn(n)),i))return;n.callback(t,e,i)}},n.touch=new Er(n.manager,n.handler),n.mouse=new zr(n.manager,n.handler),n.primaryTouch=null,n.lastTouches=[],n}return vn(e,t),e.prototype.destroy=function(){this.touch.destroy(),this.mouse.destroy()},e}(fr)}();function Vr(t,e,i){return!!Array.isArray(t)&&(tr(t,i[e],i),!0)}var Pr=32,Hr=1;function Nr(t,e){var i=e.manager;return i?i.get(t):t}function Ir(t){return 16&t?"cancel":8&t?"end":4&t?"move":2&t?"start":""}var Rr=function(){function t(t){void 0===t&&(t={}),this.options=_n({enable:!0},t),this.id=Hr++,this.manager=null,this.state=1,this.simultaneous={},this.requireFail=[]}var e=t.prototype;return e.set=function(t){return bn(this.options,t),this.manager&&this.manager.touchAction.update(),this},e.recognizeWith=function(t){if(Vr(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=Nr(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},e.dropRecognizeWith=function(t){return Vr(t,"dropRecognizeWith",this)||(t=Nr(t,this),delete this.simultaneous[t.id]),this},e.requireFailure=function(t){if(Vr(t,"requireFailure",this))return this;var e=this.requireFail;return-1===gr(e,t=Nr(t,this))&&(e.push(t),t.requireFailure(this)),this},e.dropRequireFailure=function(t){if(Vr(t,"dropRequireFailure",this))return this;t=Nr(t,this);var e=gr(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},e.hasRequireFailures=function(){return this.requireFail.length>0},e.canRecognizeWith=function(t){return!!this.simultaneous[t.id]},e.emit=function(t){var e=this,i=this.state;function n(i){e.manager.emit(i,t)}i<8&&n(e.options.event+Ir(i)),n(e.options.event),t.additionalEvent&&n(t.additionalEvent),i>=8&&n(e.options.event+Ir(i))},e.tryEmit=function(t){if(this.canEmit())return this.emit(t);this.state=Pr},e.canEmit=function(){for(var t=0;t<this.requireFail.length;){if(!(33&this.requireFail[t].state))return!1;t++}return!0},e.recognize=function(t){var e=bn({},t);if(!er(this.options.enable,[this,e]))return this.reset(),void(this.state=Pr);56&this.state&&(this.state=1),this.state=this.process(e),30&this.state&&this.tryEmit(e)},e.process=function(t){},e.getTouchAction=function(){},e.reset=function(){},t}(),Fr=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,_n({event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},e))||this).pTime=!1,i.pCenter=!1,i._timer=null,i._input=null,i.count=0,i}vn(e,t);var i=e.prototype;return i.getTouchAction=function(){return[zn]},i.process=function(t){var e=this,i=this.options,n=t.pointers.length===i.pointers,r=t.distance<i.threshold,o=t.deltaTime<i.time;if(this.reset(),t.eventType&Rn&&0===this.count)return this.failTimeout();if(r&&o&&n){if(t.eventType!==Fn)return this.failTimeout();var a=!this.pTime||t.timeStamp-this.pTime<i.interval,s=!this.pCenter||sr(this.pCenter,t.center)<i.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,s&&a?this.count+=1:this.count=1,this._input=t,0===this.count%i.taps)return this.hasRequireFailures()?(this._timer=setTimeout((function(){e.state=8,e.tryEmit()}),i.interval),2):8}return Pr},i.failTimeout=function(){var t=this;return this._timer=setTimeout((function(){t.state=Pr}),this.options.interval),Pr},i.reset=function(){clearTimeout(this._timer)},i.emit=function(){8===this.state&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))},e}(Rr),Ur=function(t){function e(e){return void 0===e&&(e={}),t.call(this,_n({pointers:1},e))||this}vn(e,t);var i=e.prototype;return i.attrTest=function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},i.process=function(t){var e=this.state,i=t.eventType,n=6&e,r=this.attrTest(t);return n&&(i&Un||!r)?16|e:n||r?i&Fn?8|e:2&e?4|e:2:Pr},e}(Rr);function Br(t){return t===Yn?"down":t===qn?"up":t===Zn?"left":t===Wn?"right":""}var Zr=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,_n({event:"pan",threshold:10,pointers:1,direction:Jn},e))||this).pX=null,i.pY=null,i}vn(e,t);var i=e.prototype;return i.getTouchAction=function(){var t=this.options.direction,e=[];return t&Xn&&e.push(Ln),t&Kn&&e.push(jn),e},i.directionTest=function(t){var e=this.options,i=!0,n=t.distance,r=t.direction,o=t.deltaX,a=t.deltaY;return r&e.direction||(e.direction&Xn?(r=0===o?Bn:o<0?Zn:Wn,i=o!==this.pX,n=Math.abs(t.deltaX)):(r=0===a?Bn:a<0?qn:Yn,i=a!==this.pY,n=Math.abs(t.deltaY))),t.direction=r,i&&n>e.threshold&&r&e.direction},i.attrTest=function(t){return Ur.prototype.attrTest.call(this,t)&&(2&this.state||!(2&this.state)&&this.directionTest(t))},i.emit=function(e){this.pX=e.deltaX,this.pY=e.deltaY;var i=Br(e.direction);i&&(e.additionalEvent=this.options.event+i),t.prototype.emit.call(this,e)},e}(Ur),Wr=function(t){function e(e){return void 0===e&&(e={}),t.call(this,_n({event:"swipe",threshold:10,velocity:.3,direction:Xn|Kn,pointers:1},e))||this}vn(e,t);var i=e.prototype;return i.getTouchAction=function(){return Zr.prototype.getTouchAction.call(this)},i.attrTest=function(e){var i,n=this.options.direction;return n&(Xn|Kn)?i=e.overallVelocity:n&Xn?i=e.overallVelocityX:n&Kn&&(i=e.overallVelocityY),t.prototype.attrTest.call(this,e)&&n&e.offsetDirection&&e.distance>this.options.threshold&&e.maxPointers===this.options.pointers&&$n(i)>this.options.velocity&&e.eventType&Fn},i.emit=function(t){var e=Br(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)},e}(Ur),qr=function(t){function e(e){return void 0===e&&(e={}),t.call(this,_n({event:"pinch",threshold:0,pointers:2},e))||this}vn(e,t);var i=e.prototype;return i.getTouchAction=function(){return[Dn]},i.attrTest=function(e){return t.prototype.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||2&this.state)},i.emit=function(e){if(1!==e.scale){var i=e.scale<1?"in":"out";e.additionalEvent=this.options.event+i}t.prototype.emit.call(this,e)},e}(Ur),Yr=function(t){function e(e){return void 0===e&&(e={}),t.call(this,_n({event:"rotate",threshold:0,pointers:2},e))||this}vn(e,t);var i=e.prototype;return i.getTouchAction=function(){return[Dn]},i.attrTest=function(e){return t.prototype.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||2&this.state)},e}(Ur),Xr=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,_n({event:"press",pointers:1,time:251,threshold:9},e))||this)._timer=null,i._input=null,i}vn(e,t);var i=e.prototype;return i.getTouchAction=function(){return[Sn]},i.process=function(t){var e=this,i=this.options,n=t.pointers.length===i.pointers,r=t.distance<i.threshold,o=t.deltaTime>i.time;if(this._input=t,!r||!n||t.eventType&(Fn|Un)&&!o)this.reset();else if(t.eventType&Rn)this.reset(),this._timer=setTimeout((function(){e.state=8,e.tryEmit()}),i.time);else if(t.eventType&Fn)return 8;return Pr},i.reset=function(){clearTimeout(this._timer)},i.emit=function(t){8===this.state&&(t&&t.eventType&Fn?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=An(),this.manager.emit(this.options.event,this._input)))},e}(Rr),Kr={domEvents:!1,touchAction:Tn,enable:!0,inputTarget:null,inputClass:null,cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},Jr=[[Yr,{enable:!1}],[qr,{enable:!1},["rotate"]],[Wr,{direction:Xn}],[Zr,{direction:Xn},["swipe"]],[Fr],[Fr,{event:"doubletap",taps:2},["tap"]],[Xr]];function Gr(t,e){var i,n=t.element;n.style&&(tr(t.options.cssProps,(function(r,o){i=xn(n.style,o),e?(t.oldCssProps[i]=n.style[i],n.style[i]=r):n.style[i]=t.oldCssProps[i]||""})),e||(t.oldCssProps={}))}var Qr=function(){function t(t,e){var i,n=this;this.options=bn({},Kr,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=new((i=this).options.inputClass||(Vn?$r:Pn?Er:On?Or:zr))(i,hr),this.touchAction=new nr(this,this.options.touchAction),Gr(this,!0),tr(this.options.recognizers,(function(t){var e=n.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])}),this)}var e=t.prototype;return e.set=function(t){return bn(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},e.stop=function(t){this.session.stopped=t?2:1},e.recognize=function(t){var e=this.session;if(!e.stopped){var i;this.touchAction.preventDefaults(t);var n=this.recognizers,r=e.curRecognizer;(!r||r&&8&r.state)&&(e.curRecognizer=null,r=null);for(var o=0;o<n.length;)i=n[o],2===e.stopped||r&&i!==r&&!i.canRecognizeWith(r)?i.reset():i.recognize(t),!r&&14&i.state&&(e.curRecognizer=i,r=i),o++}},e.get=function(t){if(t instanceof Rr)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event===t)return e[i];return null},e.add=function(t){if(Vr(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},e.remove=function(t){if(Vr(t,"remove",this))return this;var e=this.get(t);if(t){var i=this.recognizers,n=gr(i,e);-1!==n&&(i.splice(n,1),this.touchAction.update())}return this},e.on=function(t,e){if(void 0===t||void 0===e)return this;var i=this.handlers;return tr(mr(t),(function(t){i[t]=i[t]||[],i[t].push(e)})),this},e.off=function(t,e){if(void 0===t)return this;var i=this.handlers;return tr(mr(t),(function(t){e?i[t]&&i[t].splice(gr(i[t],e),1):delete i[t]})),this},e.emit=function(t,e){this.options.domEvents&&function(t,e){var i=document.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},e.destroy=function(){this.element&&Gr(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null},t}(),to={touchstart:Rn,touchmove:2,touchend:Fn,touchcancel:Un},eo=function(t){function e(){var i,n=e.prototype;return n.evTarget="touchstart",n.evWin="touchstart touchmove touchend touchcancel",(i=t.apply(this,arguments)||this).started=!1,i}return vn(e,t),e.prototype.handler=function(t){var e=to[t.type];if(e===Rn&&(this.started=!0),this.started){var i=io.call(this,t,e);e&(Fn|Un)&&i[0].length-i[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:Hn,srcEvent:t})}},e}(fr);function io(t,e){var i=Ar(t.touches),n=Ar(t.changedTouches);return e&(Fn|Un)&&(i=xr(i.concat(n),"identifier",!0)),[i,n]}function no(t,e,i){var n="DEPRECATED METHOD: "+e+"\n"+i+" AT \n";return function(){var e=new Error("get-stack-trace"),i=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",r=window.console&&(window.console.warn||window.console.log);return r&&r.call(window.console,n,i),t.apply(this,arguments)}}var ro=no((function(t,e,i){for(var n=Object.keys(e),r=0;r<n.length;)(!i||i&&void 0===t[n[r]])&&(t[n[r]]=e[n[r]]),r++;return t}),"extend","Use `assign`."),oo=no((function(t,e){return ro(t,e,!0)}),"merge","Use `assign`.");function ao(t,e,i){var n,r=e.prototype;(n=t.prototype=Object.create(r)).constructor=t,n._super=r,i&&bn(n,i)}function so(t,e){return function(){return t.apply(e,arguments)}}(function(){var t=function(t,e){return void 0===e&&(e={}),new Qr(t,_n({recognizers:Jr.concat()},e))};return t.VERSION="2.0.17-rc",t.DIRECTION_ALL=Jn,t.DIRECTION_DOWN=Yn,t.DIRECTION_LEFT=Zn,t.DIRECTION_RIGHT=Wn,t.DIRECTION_UP=qn,t.DIRECTION_HORIZONTAL=Xn,t.DIRECTION_VERTICAL=Kn,t.DIRECTION_NONE=Bn,t.DIRECTION_DOWN=Yn,t.INPUT_START=Rn,t.INPUT_MOVE=2,t.INPUT_END=Fn,t.INPUT_CANCEL=Un,t.STATE_POSSIBLE=1,t.STATE_BEGAN=2,t.STATE_CHANGED=4,t.STATE_ENDED=8,t.STATE_RECOGNIZED=8,t.STATE_CANCELLED=16,t.STATE_FAILED=Pr,t.Manager=Qr,t.Input=fr,t.TouchAction=nr,t.TouchInput=Er,t.MouseInput=zr,t.PointerEventInput=$r,t.TouchMouseInput=Or,t.SingleTouchInput=eo,t.Recognizer=Rr,t.AttrRecognizer=Ur,t.Tap=Fr,t.Pan=Zr,t.Swipe=Wr,t.Pinch=qr,t.Rotate=Yr,t.Press=Xr,t.on=pr,t.off=_r,t.each=tr,t.merge=oo,t.extend=ro,t.bindFn=so,t.assign=bn,t.inherit=ao,t.bindFn=so,t.prefixed=xn,t.toArray=Ar,t.inArray=gr,t.uniqueArray=xr,t.splitStr=mr,t.boolOrFn=er,t.hasParent=rr,t.addEventListeners=pr,t.removeEventListeners=_r,t.defaults=bn({},Kr,{preset:Jr}),t})().defaults;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lo=270;const co=new Set(["ArrowRight","ArrowUp","ArrowLeft","ArrowDown","PageUp","PageDown","Home","End"]);let uo=class extends st{constructor(){super(...arguments),this.disabled=!1,this.step=1,this.min=0,this.max=100,this._localValue=this.value,this._localLow=this.low,this._localHigh=this.high,this._getPercentageFromEvent=t=>{const e=this._slider.getBoundingClientRect(),i=2*(t.center.x-e.left-e.width/2)/e.width,n=2*(t.center.y-e.top-e.height/2)/e.height,[,r]=function(t,e){return[Math.sqrt(t*t+e*e),Math.atan2(e,t)]}(i,n),o=(r/(2*Math.PI)*360+45-135+360)%360-45;return Math.max(Math.min(o/lo,1),0)}}_valueToPercentage(t){return(Mi(t,this.min,this.max)-this.min)/(this.max-this.min)}_percentageToValue(t){return(this.max-this.min)*t+this.min}_steppedValue(t){return Math.round(t/this.step)*this.step}_boundedValue(t){var e,i;const n="high"===this._activeSlider?Math.min(null!==(e=this._localLow)&&void 0!==e?e:this.max):this.min,r="low"===this._activeSlider?Math.max(null!==(i=this._localHigh)&&void 0!==i?i:this.min):this.max;return Math.min(Math.max(t,n),r)}firstUpdated(t){super.firstUpdated(t),this._setupListeners()}updated(t){super.updated(t),this._activeSlider||(t.has("value")&&(this._localValue=this.value),t.has("low")&&(this._localLow=this.low),t.has("high")&&(this._localHigh=this.high))}connectedCallback(){super.connectedCallback(),this._setupListeners()}disconnectedCallback(){super.disconnectedCallback()}_findActiveSlider(t){var e,i;if(!this.dual)return"value";const n=Math.max(null!==(e=this._localLow)&&void 0!==e?e:this.min,this.min),r=Math.min(null!==(i=this._localHigh)&&void 0!==i?i:this.max,this.max);if(n>=t)return"low";if(r<=t)return"high";return Math.abs(t-n)<=Math.abs(t-r)?"low":"high"}_setActiveValue(t){switch(this._activeSlider){case"high":this._localHigh=t;break;case"low":this._localLow=t;break;case"value":this._localValue=t}}_getActiveValue(){switch(this._activeSlider){case"high":return this._localHigh;case"low":return this._localLow;case"value":return this._localValue}}_setupListeners(){this._interaction&&!this._mc&&(this._mc=new Qr(this._interaction,{inputClass:Or}),this._mc.add(new Zr({direction:Jn,enable:!0,threshold:0})),this._mc.add(new Fr({event:"singletap"})),this._mc.on("pan",(t=>{t.srcEvent.stopPropagation(),t.srcEvent.preventDefault()})),this._mc.on("panstart",(t=>{var e,i;if(this.disabled)return;const n=this._getPercentageFromEvent(t),r=this._percentageToValue(n);this._activeSlider=this._findActiveSlider(r),this._lastSlider=this._activeSlider,null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("#slider"))||void 0===i||i.focus()})),this._mc.on("pancancel",(()=>{this.disabled||(this._activeSlider=void 0)})),this._mc.on("panmove",(t=>{if(this.disabled)return;const e=this._getPercentageFromEvent(t),i=this._percentageToValue(e),n=this._boundedValue(i);this._setActiveValue(n);const r=this._steppedValue(n);this._activeSlider&&Li(this,`${this._activeSlider}-changing`,{value:r})})),this._mc.on("panend",(t=>{if(this.disabled)return;const e=this._getPercentageFromEvent(t),i=this._percentageToValue(e),n=this._boundedValue(i),r=this._steppedValue(n);this._setActiveValue(r),this._activeSlider&&(Li(this,`${this._activeSlider}-changing`,{value:void 0}),Li(this,`${this._activeSlider}-changed`,{value:r})),this._activeSlider=void 0})),this._mc.on("singletap",(t=>{var e,i;if(this.disabled)return;const n=this._getPercentageFromEvent(t),r=this._percentageToValue(n);this._activeSlider=this._findActiveSlider(r);const o=this._boundedValue(r),a=this._steppedValue(o);this._setActiveValue(a),this._activeSlider&&(Li(this,`${this._activeSlider}-changing`,{value:void 0}),Li(this,`${this._activeSlider}-changed`,{value:a})),this._lastSlider=this._activeSlider,null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("#slider"))||void 0===i||i.focus(),this._activeSlider=void 0})))}get _tenPercentStep(){return Math.max(this.step,(this.max-this.min)/10)}_handleKeyDown(t){var e,i,n;if(!co.has(t.code))return;t.preventDefault(),this._lastSlider&&(null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById(this._lastSlider))||void 0===i||i.focus()),this._activeSlider=null!==(n=this._lastSlider)&&void 0!==n?n:t.currentTarget.id,this._lastSlider=void 0;const r=this._getActiveValue();switch(t.code){case"ArrowRight":case"ArrowUp":this._setActiveValue(this._boundedValue((null!=r?r:this.min)+this.step));break;case"ArrowLeft":case"ArrowDown":this._setActiveValue(this._boundedValue((null!=r?r:this.min)-this.step));break;case"PageUp":this._setActiveValue(this._steppedValue(this._boundedValue((null!=r?r:this.min)+this._tenPercentStep)));break;case"PageDown":this._setActiveValue(this._steppedValue(this._boundedValue((null!=r?r:this.min)-this._tenPercentStep)));break;case"Home":this._setActiveValue(this._boundedValue(this.min));break;case"End":this._setActiveValue(this._boundedValue(this.max))}Li(this,`${this._activeSlider}-changing`,{value:this._getActiveValue()}),this._activeSlider=void 0}_handleKeyUp(t){co.has(t.code)&&(this._activeSlider=t.currentTarget.id,t.preventDefault(),Li(this,`${this._activeSlider}-changing`,{value:void 0}),Li(this,`${this._activeSlider}-changed`,{value:this._getActiveValue()}),this._activeSlider=void 0)}destroyListeners(){this._mc&&(this._mc.destroy(),this._mc=void 0)}_strokeCircleDashArc(t){return this._strokeDashArc(t,t)}_strokeDashArc(t,e){const i=this._valueToPercentage(t),n=this._valueToPercentage(e),r=290*Math.PI*lo/360,o=Math.max((n-i)*r,0);return[`${o} ${r-o}`,`-${i*r-.5}`]}renderArc(t,e,i){var n,r;if(this.disabled)return W;const o=pn({x:0,y:0,start:0,end:lo,r:145}),a="end"===i?this.max:this.min,s=null!==(n=this.current)&&void 0!==n?n:a,l=null!=e?e:a,c="end"===i?l<=s:"start"===i&&s<=l,u=c?"end"===i?this._strokeDashArc(l,s):this._strokeDashArc(s,l):this._strokeCircleDashArc(l),d="full"===i?this._strokeDashArc(this.min,this.max):"end"===i?this._strokeDashArc(l,a):this._strokeDashArc(a,l),h=this._strokeCircleDashArc(l),m=null!=this.current&&this.current<=this.max&&this.current>=this.min&&(c||"full"===this.mode)?this._strokeCircleDashArc(this.current):void 0;return B`
        <g class=${gt({inactive:Boolean(this.inactive)})}>
          <path
            class="arc arc-clear"
            d=${o}
            stroke-dasharray=${d[0]}
            stroke-dashoffset=${d[1]}
          />
          <path
            class="arc arc-colored ${gt({[t]:!0})}"
            d=${o}
            stroke-dasharray=${d[0]}
            stroke-dashoffset=${d[1]}
          />
          <path
            .id=${t}
            d=${o}
            class="arc arc-active ${gt({[t]:!0})}"
            stroke-dasharray=${u[0]}
            stroke-dashoffset=${u[1]}
            role="slider"
            tabindex="0"
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${null!=this._localValue?this._steppedValue(this._localValue):void 0}
            aria-disabled=${this.disabled}
            aria-label=${(t=>t??W)(null!==(r=this.lowLabel)&&void 0!==r?r:this.label)}
            @keydown=${this._handleKeyDown}
            @keyup=${this._handleKeyUp}
          />
          ${m?B`
                <path
                  class="current arc-current"
                  d=${o}
                  stroke-dasharray=${m[0]}
                  stroke-dashoffset=${m[1]}
                />
            `:W}
          <path
            class="target-border ${gt({[t]:!0})}"
            d=${o}
            stroke-dasharray=${h[0]}
            stroke-dashoffset=${h[1]}
          />
          <path
            class="target"
            d=${o}
            stroke-dasharray=${h[0]}
            stroke-dashoffset=${h[1]}
          />
        </g>
      `}render(){const t=pn({x:0,y:0,start:0,end:lo,r:145}),e=this.dual?this._localLow:this._localValue,i=this._localHigh,n=this.current,r=n?this._strokeCircleDashArc(n):void 0;return U`
        <svg
          id="slider"
          viewBox="0 0 320 320"
          overflow="visible"
          class=${gt({pressed:Boolean(this._activeSlider)})}
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
              ${r?B`
                    <path
                      class="current"
                      d=${t}
                      stroke-dasharray=${r[0]}
                      stroke-dashoffset=${r[1]}
                    />
                  `:W}
              ${null!=e?this.renderArc(this.dual?"low":"value",e,!this.dual&&this.mode||"start"):W}
              ${this.dual&&null!=i?this.renderArc("high",i,"end"):W}
            </g>
          </g>
        </svg>
        <slot></slot>
      `}static get styles(){return a`
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
        #wrapper {
          position: relative;
        }
        svg {
          width: 320px;
          display: block;
        }
        #slider {
          width: 100%;
          max-width: 233px;
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
          stroke: var(--state-climate-cool-color);
        }
      `}};t([ht({type:Boolean,reflect:!0})],uo.prototype,"disabled",void 0),t([ht({type:Boolean})],uo.prototype,"dual",void 0),t([ht({type:String})],uo.prototype,"mode",void 0),t([ht({type:Boolean})],uo.prototype,"inactive",void 0),t([ht({type:String})],uo.prototype,"label",void 0),t([ht({type:String,attribute:"low-label"})],uo.prototype,"lowLabel",void 0),t([ht({type:String,attribute:"high-label"})],uo.prototype,"highLabel",void 0),t([ht({type:Number})],uo.prototype,"value",void 0),t([ht({type:Number})],uo.prototype,"low",void 0),t([ht({type:Number})],uo.prototype,"high",void 0),t([ht({type:Number})],uo.prototype,"current",void 0),t([ht({type:Number})],uo.prototype,"step",void 0),t([ht({type:Number})],uo.prototype,"min",void 0),t([ht({type:Number})],uo.prototype,"max",void 0),t([mt()],uo.prototype,"_localValue",void 0),t([mt()],uo.prototype,"_localLow",void 0),t([mt()],uo.prototype,"_localHigh",void 0),t([mt()],uo.prototype,"_activeSlider",void 0),t([mt()],uo.prototype,"_lastSlider",void 0),t([_t("#slider")],uo.prototype,"_slider",void 0),t([_t("#interaction")],uo.prototype,"_interaction",void 0),uo=t([ct("bt-ha-control-circular-slider")],uo);const ho="unavailable",mo={auto:"M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z",heat_cool:"M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",heat:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",cool:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",off:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",fan_only:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",dry:yt,window_open:wt,eco:"M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z",summer:bt,temperature:"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",current_humidity:yt,ok:"M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z"};function po(t){const e=window;e.customCards=e.customCards||[],e.customCards.push(Object.assign(Object.assign({},t),{preview:!0}))}console.info("%c  BetterThermostatUI-CARD \n%c  version: 2.2.0    ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),po({type:"better-thermostat-ui-card",name:"Better Thermostat Climate Card",description:"Card for climate entity"});let _o=class extends st{constructor(){super(),this.value={},this._selectTargetTemperature="low",this.current=0,this.current_humidity=0,this.min=0,this.max=35,this.step=1,this.window=!1,this.summer=!1,this.status="loading",this.mode="off",this.dragging=!1,this.target="value",this._debouncedCallService=((t,e,i=!1)=>{let n;const r=(...r)=>{const o=i&&!n;clearTimeout(n),n=window.setTimeout((()=>{n=void 0,i||t(...r)}),e),o&&t(...r)};return r.cancel=()=>{clearTimeout(n)},r})((t=>this._callService(t)),1e3),this._init=!0,this._firstRender=!0,this._ignore=!1,this._hasWindow=!1,this._hasSummer=!1,this._oldValueMin=0,this._oldValueMax=0,this._display_bottom=0,this._display_top=0,this.modes=[],this.error=[],this.render=()=>{var t,e,i,n,r,o,a,s,l,c,u,d,h,m,p,_,v,f,g,b,y,w,k,$,A,x,C,E,T,S,z,D,j,L,M,O;const V=this.window?xi({hass:this.hass,string:"extra_states.window_open"}):xi({hass:this.hass,string:"extra_states.window_closed"}),P=B`
      <g transform="translate(57.5,37) scale(0.35)">
      ${this._hasWindow&&!(null===(t=this._config)||void 0===t?void 0:t.disable_window)?B`
        <path title="${V}" class="window ${this.window?"active":""}" fill="none" transform="${this._hasSummer&&!(null===(e=this._config)||void 0===e?void 0:e.disable_summer)?"translate(-31.25,0)":""}" id="window" d=${wt}><title>${V}</title></path>
      `:""}
      ${this._hasSummer&&!(null===(i=this._config)||void 0===i?void 0:i.disable_summer)?B`
        <path class="summer ${this.summer?"active":""}" fill="none" transform="${this._hasWindow&&!(null===(n=this._config)||void 0===n?void 0:n.disable_window)?"translate(31.25,0)":""}" id="summer" d=${bt}><title>${xi({hass:this.hass,string:"extra_states.summer"})}</title></path>
      `:""}
     </g>`,H=(null===(r=null==this?void 0:this._config)||void 0===r?void 0:r.set_current_as_main)?xi({hass:this.hass,string:"common.current_temperature"}):xi({hass:this.hass,string:"common.target_temperature"}),N=B`
      <text class="main-value" x="62.5" y="60%" dominant-baseline="middle" text-anchor="middle" style="font-size:15px;">
        <title>${H}</title>
        ${Oi(this._display_top,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}
        <tspan dx="-2" dy="-5.5" style="font-size: 5px;">
          ${this.hass.config.unit_system.temperature}
        </tspan>
      </text>`,I=B`${(null===(o=null==this?void 0:this.stateObj)||void 0===o?void 0:o.state)===ho||"unknown"===(null===(a=null==this?void 0:this.stateObj)||void 0===a?void 0:a.state)?B`
      <text x="62.5" y="63%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
        ${this.hass.localize("state.default.unavailable")}
      </text>`:""}`,R=B`<line x1="35" y1="72" x2="90" y2="72" stroke="#e7e7e8" stroke-width="0.5" />`,F=(null===(s=null==this?void 0:this._config)||void 0===s?void 0:s.set_current_as_main)?xi({hass:this.hass,string:"common.target_temperature"}):xi({hass:this.hass,string:"common.current_temperature"}),Z=B`
    <g class="current-info" transform="translate(62.5,80)">
      ${0===this.current_humidity?B`
        <text x="-5%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
          <title>${F}</title>
        ${B`${Oi(this._display_bottom,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
          <tspan dx="-1" dy="-2" style="font-size: 3px;">
            ${B`${this.hass.config.unit_system.temperature}`}
          </tspan>
        </text>
        ${this._renderHVACAction()}
      `:B`
        <text x="-12.25%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
          <title>${F}</title>  
        ${B`${Oi(this._display_bottom,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
        <tspan dx="-0.3" dy="-2" style="font-size: 3px;">
          ${B`${this.hass.config.unit_system.temperature}`}
        </tspan>
      </text>
      <text x="12.25%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
          <title>${xi({hass:this.hass,string:"common.current_humidity"})}</title>  
        ${B`${Oi(this.current_humidity,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
        <tspan dx="-0.3" dy="-2" style="font-size: 3px;">%</tspan>
      </text>
      ${this._renderHVACAction(!0)}
      `}
    </g>`,W=U`<div id="modes">
          ${(null==this?void 0:this._hasSummer)?B`
            ${(null===(l=null==this?void 0:this._config)||void 0===l?void 0:l.disable_heat)||!this.modes.includes("heat")?U``:this._renderIcon("heat",this.mode)}
            ${(null===(c=null==this?void 0:this._config)||void 0===c?void 0:c.disable_heat)||!this.modes.includes("heat_cool")?U``:this._renderHVACIcon(this.mode)}
            ${(null===(u=null==this?void 0:this._config)||void 0===u?void 0:u.disable_eco)?U``:(null===(h=null===(d=null==this?void 0:this.stateObj)||void 0===d?void 0:d.attributes)||void 0===h?void 0:h.saved_temperature)&&"none"!==(null===(p=null===(m=null==this?void 0:this.stateObj)||void 0===m?void 0:m.attributes)||void 0===p?void 0:p.saved_temperature)&&(null===(_=null==this?void 0:this.stateObj)||void 0===_?void 0:_.state)!==ho?this._renderIcon("eco","eco"):this._renderIcon("eco","none")}
            ${(null===(v=null==this?void 0:this._config)||void 0===v?void 0:v.disable_off)?U``:this._renderIcon("off",this.mode)}
          `:B`
            ${this.modes.map((t=>{var e,i,n;return!(null===(e=this._config)||void 0===e?void 0:e.disable_heat)||"heat"!==t&&"heat_cool"!==t?(null===(i=this._config)||void 0===i?void 0:i.disable_eco)&&"eco"===t||(null===(n=this._config)||void 0===n?void 0:n.disable_off)&&"off"===t?U``:this._renderIcon(t,this.mode):U``}))}`}
        </div>`,q=(null===(f=null==this?void 0:this._config)||void 0===f?void 0:f.disable_buttons)?U``:U`
      <div id="bt-control-buttons">
          <div class="button">
            <bt-ha-outlined-icon-button
              .target=${this.target}
              .step=${-this.step}
              @click=${this._handleButton}
            >
              <ha-svg-icon .path=${"M19,13H5V11H19V13Z"}></ha-svg-icon>
            </bt-ha-outlined-icon-button>
          </div>
          <div class="button">
            <bt-ha-outlined-icon-button 
              .target=${this.target}
              .step=${this.step}
              @click=${this._handleButton}
            >
            <ha-svg-icon .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}></ha-svg-icon>
          </bt-ha-outlined-icon-button>
          </div>
      </div>
    </div>`;return U`
    <ha-card id="${(null===(g=null==this?void 0:this._config)||void 0===g?void 0:g.disable_buttons)?"":"expand"}" class=${gt({[this.mode]:!0})}
    >
    ${(null===(b=this._config)||void 0===b?void 0:b.disable_menu)?"":U`
      <ha-icon-button
        class="more-info"
        .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
        .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
        @click=${this._handleMoreInfo}
        tabindex="0"
      ></ha-icon-button>
      `}
      ${(null===(w=null===(y=null==this?void 0:this._config)||void 0===y?void 0:y.name)||void 0===w?void 0:w.length)?U`
        <div class="name">${null===(k=this._config)||void 0===k?void 0:k.name}</div>
        `:U`<div class="name">&nbsp;</div>`}
      ${this.lowBattery?U`
        <div class="low_battery">
          <ha-icon-button class="alert" .path=${"M13 14H11V8H13M13 18H11V16H13M16.7 4H15V2H9V4H7.3C6.6 4 6 4.6 6 5.3V20.6C6 21.4 6.6 22 7.3 22H16.6C17.3 22 17.9 21.4 17.9 20.7V5.3C18 4.6 17.4 4 16.7 4Z"}>
          </ha-icon-button>
          <span>${this.lowBattery.name}</span>
          <span>${this.lowBattery.battery}%</span>
        </div>
      `:""}
      ${this.error.length>0?U`
        <div class="error">
          <ha-icon-button class="alert" .path=${"M3.27,1.44L2,2.72L4.05,4.77C2.75,5.37 1.5,6.11 0.38,7C4.2,11.8 8.14,16.67 12,21.5L15.91,16.63L19.23,19.95L20.5,18.68C14.87,13.04 3.27,1.44 3.27,1.44M12,3C10.6,3 9.21,3.17 7.86,3.5L9.56,5.19C10.37,5.07 11.18,5 12,5C15.07,5 18.09,5.86 20.71,7.45L16.76,12.38L18.18,13.8C20.08,11.43 22,9 23.65,7C20.32,4.41 16.22,3 12,3M5.57,6.29L14.5,15.21L12,18.3L3.27,7.44C4,7 4.78,6.61 5.57,6.29Z"}>
          </ha-icon-button>
          <span>${this.error}</span>
        </div>
      `:""}

      ${null!=this.value.low&&null!=this.value.high&&(null===($=this.stateObj)||void 0===$?void 0:$.state)!==ho?U`
        <bt-ha-control-circular-slider
          class="${(null===(x=null===(A=null==this?void 0:this.stateObj)||void 0===A?void 0:A.attributes)||void 0===x?void 0:x.saved_temperature)&&null!==(null===(E=null===(C=null==this?void 0:this.stateObj)||void 0===C?void 0:C.attributes)||void 0===E?void 0:E.saved_temperature)?"eco":""} ${this.lowBattery||this.error.length>0?"battery":""} ${this.window?"window_open":""}  ${this.summer?"summer":""} "
          .inactive=${this.window}
          dual
          .low=${this.value.low}
          .high=${this.value.high}
          .min=${this.min}
          .max=${this.max}
          .step=${this.step}
          .current=${this.current}
          @low-changed=${this._highChanged}
          @low-changing=${this._highChanging}
          @high-changed=${this._highChanged}
          @high-changing=${this._highChanging}
        >
        `:U`
        <bt-ha-control-circular-slider
          class="${(null===(S=null===(T=null==this?void 0:this.stateObj)||void 0===T?void 0:T.attributes)||void 0===S?void 0:S.saved_temperature)&&null!==(null===(D=null===(z=null==this?void 0:this.stateObj)||void 0===z?void 0:z.attributes)||void 0===D?void 0:D.saved_temperature)?"eco":""} ${this.lowBattery||this.error.length>0?"battery":""} ${this.window?"window_open":""}  ${this.summer?"summer":""} "
          .inactive=${this.window}
          .mode="start"
          @value-changed=${this._highChanged}
          @value-changing=${this._highChanging}
          .value=${this.value.value}
          .current=${this.current}
          step=${this.step}
          min=${this.min}
          max=${this.max}
        >
        `}
        <div class="content ${this.lowBattery||this.error.length>0?"battery":""} ${this.window?"window_open":""}  ${(null===(L=null===(j=null==this?void 0:this.stateObj)||void 0===j?void 0:j.attributes)||void 0===L?void 0:L.saved_temperature)&&null!==(null===(O=null===(M=null==this?void 0:this.stateObj)||void 0===M?void 0:M.attributes)||void 0===O?void 0:O.saved_temperature)?"eco":""} ${this.summer?"summer":""} ">
          <svg id="main" viewbox="0 0 125 100">
            ${P}
            ${N}
            ${I}
            ${R}
            ${Z}
          </svg>
        </div>
      </bt-ha-control-circular-slider>
      ${W}
      ${q}
  </ha-card>
  `}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}static async getConfigElement(){return await Promise.resolve().then((function(){return ko})),document.createElement("better-thermostat-ui-card-editor")}static async getStubConfig(t){const e=Object.keys(t.states).filter((t=>["climate"].includes(t.split(".")[0]))),i=e.filter((e=>{var i;return null===(i=t.states[e].attributes)||void 0===i?void 0:i.call_for_heat}));return{type:"custom:better-thermostat-ui-card",entity:i[0]||e[0]}}_highChanged(t){const e=t.detail.value;if(isNaN(e))return;const i=t.type.replace("-changed","");this.value=Object.assign(Object.assign({},this.value),{[i]:e}),this._selectTargetTemperature=i,this._callService(i)}_highChanging(t){const e=t.detail.value;if(isNaN(e))return;const i=t.type.replace("-changing","");this.value=Object.assign(Object.assign({},this.value),{[i]:e}),this._selectTargetTemperature=i,this._updateDisplay(),this._vibrate(20)}_callService(t){"high"!==t&&"low"!==t?this.hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,temperature:this.value.value}):this.hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,target_temp_low:this.value.low,target_temp_high:this.value.high})}_handleButton(t){var e;const i=t.currentTarget.target,n=t.currentTarget.step,r="high"===i?this.max:this.min;let o=null!==(e=this.value[i])&&void 0!==e?e:r;o+=n,o=Mi(o,this.min,this.max),"high"===i&&null!=this.value.low&&(o=Mi(o,this.value.low,this.max)),"low"===i&&null!=this.value.high&&(o=Mi(o,this.min,this.value.high)),this.value=Object.assign(Object.assign({},this.value),{[i]:o}),this._updateDisplay(),this._vibrate(40),this._debouncedCallService(i)}_handleSelectTemp(t){const e=t.currentTarget.target;this._selectTargetTemperature=e,this._updateDisplay(),this._vibrate(40)}setConfig(t){this._config=Object.assign({tap_action:{action:"toggle"},hold_action:{action:"more-info"}},t)}getCardSize(){return 1}_vibrate(t){try{navigator.vibrate(t)}catch(t){}}firstUpdated(t){this._init=!1}shouldUpdate(t){return void 0!==t.has("_config")&&void 0!==t.get("_config")&&(this._hasSummer=!1,this._hasWindow=!1,this.current_humidity=0),void 0!==t.get("hass")&&(this._init=!1),!0}updated(t){var e,i;super.updated(t),this._firstRender=!1,null===(i=null===(e=null==this?void 0:this.shadowRoot)||void 0===e?void 0:e.querySelector(".low_battery"))||void 0===i||i.addEventListener("click",(()=>{var t,e,i,n;null===(e=null===(t=null==this?void 0:this.shadowRoot)||void 0===t?void 0:t.querySelector(".low_battery"))||void 0===e||e.remove(),null===(n=null===(i=null==this?void 0:this.shadowRoot)||void 0===i?void 0:i.querySelector(".content"))||void 0===n||n.classList.remove("battery"),this._vibrate(2)}))}willUpdate(t){var e,i;if(!this.hass||!this._config||!t.has("hass")&&!t.has("_config"))return;const n=this._config.entity,r=this.hass.states[n];if(!r)return;const o=t.get("hass");if(!o||o.states[n]!==r){if(!this._config||!this.hass||!this._config.entity)return;this.stateObj=r;const t=this.stateObj.attributes,n=this.stateObj.state;this.mode=n||"off",t.hvac_modes&&(this.modes=Object.values(t.hvac_modes)),this.value={value:(null==t?void 0:t.temperature)||0,low:(null==t?void 0:t.target_temp_low)||null,high:(null==t?void 0:t.target_temp_high)||null},t.target_temp_step&&(this.step=t.target_temp_step),t.min_temp&&(this.min=t.min_temp),t.max_temp&&(this.max=t.max_temp),t.current_temperature&&(this.current=t.current_temperature);const o=null!==(e=t.current_humidity)&&void 0!==e?e:null==t?void 0:t.humidity;if(void 0!==o&&(this.current_humidity=parseFloat(o.toString())),void 0!==(null==t?void 0:t.window_open)&&(this._hasWindow=!0,this.window=t.window_open),void 0!==(null==t?void 0:t.call_for_heat)&&(this._hasSummer=!0,this.summer=!t.call_for_heat),void 0===(null==t?void 0:t.batteries)||(null===(i=null==this?void 0:this._config)||void 0===i?void 0:i.disable_battery_warning))this.lowBattery=void 0;else{const e=Object.entries(JSON.parse(t.batteries)).map((t=>({name:t[0],battery:"on"===t[1].battery?5:"off"===t[1].battery?100:parseFloat(t[1].battery)}))).filter((t=>t.battery<10));this.lowBattery=e[0]}if(void 0!==(null==t?void 0:t.errors)){const e=JSON.parse(t.errors);e.length>0?this.error=e[0]:this.error=[]}else this.error=[];this._updateDisplay()}}_updateDisplay(){var t;(null===(t=null==this?void 0:this._config)||void 0===t?void 0:t.set_current_as_main)?(this._display_bottom=this._getCurrentSetpoint(),this._display_top=this.current):(this._display_bottom=this.current,this._display_top=this._getCurrentSetpoint())}_handleAction(t){var e,i,n,r,o;if("eco"===t.currentTarget.mode){null===((null===(i=null===(e=null==this?void 0:this.stateObj)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.saved_temperature)||null)?this.hass.callService("better_thermostat","set_temp_target_temperature",{entity_id:this._config.entity,temperature:(null===(n=this._config)||void 0===n?void 0:n.eco_temperature)||18}):this.hass.callService("better_thermostat","restore_saved_target_temperature",{entity_id:this._config.entity})}else{null!==((null===(o=null===(r=null==this?void 0:this.stateObj)||void 0===r?void 0:r.attributes)||void 0===o?void 0:o.saved_temperature)||null)&&this.hass.callService("better_thermostat","restore_saved_target_temperature",{entity_id:this._config.entity}),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t.currentTarget.mode})}}_setTemperature(){this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:this.value})}_getCurrentSetpoint(){var t,e,i,n,r,o,a,s;return null!==(null===(t=null==this?void 0:this.value)||void 0===t?void 0:t.high)&&null!==(null===(e=null==this?void 0:this.value)||void 0===e?void 0:e.low)?((null===(i=null==this?void 0:this.value)||void 0===i?void 0:i.low)||0)>=this.current?(null===(n=null==this?void 0:this.value)||void 0===n?void 0:n.low)||0:((null===(r=null==this?void 0:this.value)||void 0===r?void 0:r.high)||0)<=this.current?(null===(o=null==this?void 0:this.value)||void 0===o?void 0:o.high)||0:(null===(a=null==this?void 0:this.value)||void 0===a?void 0:a.low)||0:(null===(s=null==this?void 0:this.value)||void 0===s?void 0:s.value)||0}_renderHVACAction(t=!1){var e,i,n,r,o;const a="heating"===(null===(e=this.stateObj)||void 0===e?void 0:e.attributes.hvac_action)&&"off"!==this.mode,s="cooling"===(null===(i=this.stateObj)||void 0===i?void 0:i.attributes.hvac_action)&&"off"!==this.mode,l=t?"translate(-3,-3.5) scale(0.25)":"translate(5,-4) scale(0.25)",c="#9d9d9d";if(void 0!==(null===(n=null==this?void 0:this.value)||void 0===n?void 0:n.high)&&null!==(null===(r=null==this?void 0:this.value)||void 0===r?void 0:r.high)&&(null===(o=null==this?void 0:this.value)||void 0===o?void 0:o.high)<=this.current){const t=xi(s?{hass:this.hass,string:"extra_states.cooling"}:{hass:this.hass,string:"extra_states.cooling_off"});return B`<path class="status cooler ${s?"active":""}" transform="${l}" fill="${c}" d="${"M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z"}" title="Cooling"><title>${t}</title></path>`}const u=xi(a?{hass:this.hass,string:"extra_states.heating"}:{hass:this.hass,string:"extra_states.heating_off"});return B`<path class="status ${a?"active":""}" transform="${l}" fill="${c}" d="${"M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4"}" title="Heating"><title>${u}</title></path>`}_renderHVACIcon(t){var e,i;return((null===(e=null==this?void 0:this.value)||void 0===e?void 0:e.low)||0)>=this.current?this._renderIcon("heat",t):((null===(i=null==this?void 0:this.value)||void 0===i?void 0:i.high)||0)<=this.current?this._renderIcon("cool",t):this._renderIcon("ok",t)}_renderIcon(t,e){if(!mo[t])return U``;const i=this.hass.localize(`component.climate.state._.${t}`)||xi({hass:this.hass,string:`extra_states.${t}`});return U`
      <ha-icon-button
        title="${e===t?t:""}"
        class=${gt({"selected-icon":e===t})}
        .mode=${t}
        @click=${this._handleAction}
        tabindex="0"
        .path=${mo[t]}
        .label=${i}
      >
      </ha-icon-button>
    `}_handleMoreInfo(){Li(this,"hass-more-info",{entityId:this._config.entity})}};_o.styles=a`
      :host {
          display: block;
          box-sizing: border-box;
          position: relative;
          container: bt-card / inline-size;
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
        padding-top: 1.5em;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: center;
        align-items: center;
      }

      bt-ha-outlined-icon-button {
        border: 1px solid var(--secondary-text-color);
        border-radius: 100%;
        padding: 0.5em;
        cursor: pointer;
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
        position: absolute;
        width: calc(70% - 40px);
        height: calc(70% - 100px);
        box-sizing: border-box;
        border-radius: 100%;
        left: 50%;
        top: calc(50% - 20px);
        text-align: center;
        overflow-wrap: break-word;
        pointer-events: none;
        display: flex;
        align-items: center;
        place-content: center;
        flex-flow: wrap;
        z-index: 3; /* TODO: refactor z-index - bumping this up is messy but has less potential for side effects */
        transform: translate(-50%,-50%);
        max-width: 155px;
      }

      .content > svg * {
        pointer-events: auto; /* reenable pointer events on all children */
      }

      #expand .content {
        top: calc(50% - 40px);
      }

      #main {
        transform: scale(2.3);
      }

      .name {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 20px;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
      svg {
        height: auto;
        margin: auto;
        display: block;
        width: 100%;
        -webkit-backface-visibility: hidden;
        max-width: 233px;
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
        --mode-color: var(--label-badge-red);
      }
      .heat, .heat_cool {
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
        margin-top: -3em;
        margin-bottom: 1em;
      }

      #bt-control-buttons {
        z-index: 3;
        position: relative;
        display: flex;
        width: auto;
        justify-content: center;
        padding-bottom: 0.2em;
      }

      #bt-control-buttons .button {
        z-index: 3;
        position: relative;
        display: flex;
        width: auto;
        justify-content: center;
        padding: 1em;
        padding-top: 0.2em;
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

      .status.cooler.active {
        fill: #03A9F4;
        filter: drop-shadow(0px 0px 6px #03A9F4);
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
      @container bt-card (max-width: 280px) {
        .content {
          top: calc(50% - 10px);
        }
      }
      @container bt-card (max-width: 255px) {
        #modes {
          margin-top: -2em;
        }
        ha-card {
          padding-top: 2em;
        }
      }
  `,t([ht({attribute:!1})],_o.prototype,"hass",void 0),t([ht({type:Number})],_o.prototype,"value",void 0),t([mt()],_o.prototype,"_selectTargetTemperature",void 0),t([ht({type:Number})],_o.prototype,"current",void 0),t([ht({type:Number})],_o.prototype,"current_humidity",void 0),t([ht({type:Number})],_o.prototype,"min",void 0),t([ht({type:Number})],_o.prototype,"max",void 0),t([ht({type:Number})],_o.prototype,"step",void 0),t([ht({type:Boolean})],_o.prototype,"window",void 0),t([ht({type:Boolean})],_o.prototype,"summer",void 0),t([ht({type:String})],_o.prototype,"status",void 0),t([ht({type:String})],_o.prototype,"mode",void 0),t([ht({type:Boolean,reflect:!0})],_o.prototype,"dragging",void 0),t([mt()],_o.prototype,"changingHigh",void 0),t([mt()],_o.prototype,"_config",void 0),_o=t([ct("better-thermostat-ui-card")],_o);const vo=function(...t){const e="type"===t[0].type,i=t.map((t=>t.schema)),n=Object.assign({},...i);return e?tn(n):Ji(n)}(Ji({index:Gi(Ki()),view_index:Gi(Ki()),view_layout:Wi("any",(()=>!0)),type:Qi()}),Ji({entity:Gi(Qi()),name:Gi(Qi()),icon:Gi(Qi())}),Ji({disable_window:Gi(Yi()),disable_summer:Gi(Yi()),disable_eco:Gi(Yi()),disable_heat:Gi(Yi()),disable_off:Gi(Yi()),disable_battery_warning:Gi(Yi()),set_current_as_main:Gi(Yi()),eco_temperature:Gi(Ki()),disable_menu:Gi(Yi()),disable_buttons:Gi(Yi())})),fo=["icon_color","layout","fill_container","primary_info","secondary_info","icon_type","content_info","use_entity_picture","collapsible_controls","icon_animation"],go=t=>{var e,i;customElements.get("ha-form")&&(customElements.get("hui-action-editor")||((t,e,i,n)=>{const[r,o,a]=t.split(".",3);return Number(r)>e||Number(r)===e&&(void 0===n?Number(o)>=i:Number(o)>i)||void 0!==n&&Number(r)===e&&Number(o)===i&&Number(a)>=n})(t,2022,11))||null===(e=customElements.get("hui-button-card"))||void 0===e||e.getConfigElement(),customElements.get("ha-entity-picker")||null===(i=customElements.get("hui-entities-card"))||void 0===i||i.getConfigElement()},bo=["eco_temperature","disable_window","disable_summer","disable_eco","disable_heat","disable_off","disable_menu","disable_battery_warning","set_current_as_main","disable_buttons"],yo=Di((()=>[{name:"entity",selector:{entity:{domain:["climate"]}}},{name:"name",selector:{text:{}}},{name:"eco_temperature",selector:{number:{placeholder:20,min:5,max:45,default:20}}},{type:"grid",name:"",schema:[{name:"disable_window",selector:{boolean:{}}},{name:"disable_summer",selector:{boolean:{}}},{name:"disable_eco",selector:{boolean:{}}},{name:"disable_heat",selector:{boolean:{}}},{name:"disable_off",selector:{boolean:{}}},{name:"disable_menu",selector:{boolean:{}}},{name:"disable_battery_warning",selector:{boolean:{}}},{name:"set_current_as_main",selector:{boolean:{}}},{name:"disable_buttons",selector:{boolean:{}}}]}]));let wo=class extends st{constructor(){super(...arguments),this._computeLabel=t=>{const e=(i=this.hass,function(t){var e;let n=Ci(t,null!==(e=null==i?void 0:i.locale.language)&&void 0!==e?e:Ai);return n||(n=Ci(t,Ai)),null!=n?n:t});var i;return fo.includes(t.name)?e(`editor.card.generic.${t.name}`):bo.includes(t.name)?e(`editor.card.climate.${t.name}`):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}connectedCallback(){super.connectedCallback(),go(this.hass.connection.haVersion)}setConfig(t){Bi(t,vo),this._config=t}render(){if(!this.hass||!this._config)return U``;const t=yo();return U`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${t}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `}_valueChanged(t){Li(this,"config-changed",{config:t.detail.value}),Li(this,"hass",{config:t.detail.value})}};t([mt()],wo.prototype,"_config",void 0),t([ht({attribute:!1})],wo.prototype,"hass",void 0),wo=t([ct("better-thermostat-ui-card-editor")],wo);var ko=Object.freeze({__proto__:null,get ClimateCardEditor(){return wo}});export{_o as BetterThermostatUi,po as registerCustomCard};
