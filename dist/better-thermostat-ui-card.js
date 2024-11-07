function t(t,e,i,n){var o,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(r<3?o(s):r>3?o(e,i,s):o(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new r(i,t,n)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:l,defineProperty:c,getOwnPropertyDescriptor:u,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,m=globalThis,v=m.trustedTypes,_=v?v.emptyScript:"",f=m.reactiveElementPolyfillSupport,g=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const r=n?.call(this);o.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of n){const n=document.createElement("style"),o=e.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??y)(n?o:this[t],e))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[g("elementProperties")]=new Map,$[g("finalized")]=new Map,f?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,x=A.trustedTypes,k=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,T="?"+E,S=`<${T}>`,L=document,M=()=>L.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,j="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,P=/>/g,N=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,I=/"/g,R=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),U=F(1),B=F(2),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),q=new WeakMap,Y=L.createTreeWalker(L,129);function X(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,n=[];let o,r=2===e?"<svg>":"",s=V;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,u=0;for(;u<i.length&&(s.lastIndex=u,l=s.exec(i),null!==l);)u=s.lastIndex,s===V?"!--"===l[1]?s=D:void 0!==l[1]?s=P:void 0!==l[2]?(R.test(l[2])&&(o=RegExp("</"+l[2],"g")),s=N):void 0!==l[3]&&(s=N):s===N?">"===l[0]?(s=o??V,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?N:'"'===l[3]?I:H):s===I||s===H?s=N:s===D||s===P?s=V:(s=N,o=void 0);const h=s===N&&t[e+1].startsWith("/>")?" ":"";r+=s===V?i+S:c>=0?(n.push(a),i.slice(0,c)+C+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[X(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};class J{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,r=0;const s=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=J.createElement(l,i),Y.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=Y.nextNode())&&a.length<s;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(C)){const e=c[r++],i=n.getAttribute(t).split(E),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?it:"?"===s[1]?nt:"@"===s[1]?ot:et}),n.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:o}),n.removeAttribute(t));if(R.test(n.tagName)){const t=n.textContent.split(E),e=t.length-1;if(e>0){n.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],M()),Y.nextNode(),a.push({type:2,index:++o});n.append(t[e],M())}}}else if(8===n.nodeType)if(n.data===T)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(E,t+1));)a.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,n){if(e===W)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const r=z(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,n)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??L).importNode(e,!0);Y.currentNode=n;let o=Y.nextNode(),r=0,s=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new tt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new rt(o,this,t)),this._$AV.push(e),a=i[++s]}r!==a?.index&&(o=Y.nextNode(),r++)}return Y.currentNode=L,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),z(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Z&&z(this._$AH)?this._$AA.nextSibling.data=t:this.$(L.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new Q(n,this),i=t.u(this.options);t.p(e),this.$(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}T(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new tt(this.k(M()),this.k(M()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(void 0===o)t=G(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const n=t;let s,a;for(t=o[0],s=0;s<o.length-1;s++)a=G(this,n[i+s],e,s),a===W&&(a=this._$AH[s]),r||=!z(a)||a!==this._$AH[s],a===Z?t=Z:t!==Z&&(t+=(a??"")+o[s+1]),this._$AH[s]=a}r&&!n&&this.O(t)}O(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===Z?void 0:t}}class nt extends et{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class ot extends et{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??Z)===W)return;const i=this._$AH,n=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Z&&(i===Z||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const st=A.litHtmlPolyfillSupport;st?.(J,tt),(A.litHtmlVersions??=[]).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class at extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new tt(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:at});const lt=globalThis.litElementPolyfillSupport;lt?.({LitElement:at}),(globalThis.litElementVersions??=[]).push("4.0.1");
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
 */,ut={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ht=(t=ut,e,i)=>{const{kind:n,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),r.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,o,t)},init(e){return void 0!==e&&this.C(n,void 0,t),e}}}if("setter"===n){const{name:n}=i;return function(i){const o=this[n];e.call(this,i),this.requestUpdate(n,o,t)}}throw Error("Unsupported decorator location: "+n)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,n?{...t,wrapped:!0}:t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function pt(t){return dt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function vt(t,e){return(i,n,o)=>{const r=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:s}="object"==typeof n?i:o??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return mt(i,n,{get(){if(e){let e=t.call(this);return void 0===e&&(e=r(this),s.call(this,e)),e}return r(this)}})}return mt(i,n,{get(){return r(this)}})}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t=1;class ft{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ft{constructor(t){if(super(t),t.type!==_t||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.st?.has(t)&&this.it.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.it)t in e||(i.remove(t),this.it.delete(t));for(const t in e){const n=!!e[t];n===this.it.has(t)||this.st?.has(t)||(n?(i.add(t),this.it.add(t)):(i.remove(t),this.it.delete(t)))}return W}});var bt="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4",yt="M10 2L7.6 5.4C8.4 5.2 9.2 5 10 5C10.8 5 11.6 5.2 12.4 5.4M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19C20.66 19 22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M5.5 6.7L1.3 7L3.1 10.8C3.2 10 3.5 9.2 3.9 8.5C4.4 7.8 4.9 7.2 5.5 6.7M10 7C7.2 7 5 9.2 5 12C5 14.8 7.2 17 10 17C12.8 17 15 14.8 15 12C15 9.2 12.8 7 10 7M3.2 13.2L1.4 17L5.5 17.4C5 16.9 4.4 16.2 4 15.5C3.5 14.8 3.3 14 3.2 13.2M7.6 18.6L10 22L12.4 18.6C11.6 18.8 10.8 19 10 19C9.1 19 8.3 18.8 7.6 18.6Z",wt="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",$t="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z",At="M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z";var xt={version:"version",current:"current"},kt={card:{climate:{disable_window:"Disable window",disable_summer:"Disable summer",disable_eco:"Disable eco",disable_heat:"Disable heat",disable_off:"Disable off",disable_menu:"Disable menu",disable_battery_warning:"Disable battery warning",disable_buttons:"Disable plus/minus buttons",eco_temperature:"Eco temperature",set_current_as_main:"Swap target with current temperature places"}}},Ct={window_open:"Window open",night_mode:"Night mode",eco:"Eco",summer:"Summer"},Et={common:xt,editor:kt,extra_states:Ct},Tt=Object.freeze({__proto__:null,common:xt,default:Et,editor:kt,extra_states:Ct}),St={version:"Version",current:"Aktuell"},Lt={card:{climate:{disable_window:"Fenster-offen-Anzeige deaktivieren",disable_summer:"Sommer-Anzeige deaktivieren",disable_eco:"Eco-Anzeige deaktivieren",disable_heat:"Heiz-Anzeige deaktivieren",disable_off:"Aus-Anzeige deaktivieren",disable_menu:"Menü deaktivieren",disable_battery_warning:"Batterie-Warnung deaktivieren",disable_buttons:"Plus/Minus Buttons deaktivieren",eco_temperature:"Eco Temperatur",set_current_as_main:"Zieltemperatur mit aktueller Temperatur tauschen"}}},Mt={window_open:"Fenster offen",night_mode:"Nachtmodus",eco:"Eco",summer:"Sommer"},zt={common:St,editor:Lt,extra_states:Mt},Ot=Object.freeze({__proto__:null,common:St,default:zt,editor:Lt,extra_states:Mt}),jt={version:"version",current:"Actuelle"},Vt={card:{climate:{disable_window:"Désactiver fenêtre",disable_summer:"Désactiver été",disable_eco:"Désactiver mode Éco",disable_heat:"Désactiver mode chauffe",disable_off:"Désactiver arrêt",disable_menu:"Désactiver le menu",disable_battery_warning:"Désactiver l'avertissement de batterie",disable_buttons:"Désactiver les boutons plus/moins",eco_temperature:"Température Éco",set_current_as_main:"Échanger température cible avec température locale"}}},Dt={window_open:"Fenêtre ouverte",night_mode:"Mode nuit",eco:"Éco",summer:"Été"},Pt={common:jt,editor:Vt,extra_states:Dt},Nt=Object.freeze({__proto__:null,common:jt,default:Pt,editor:Vt,extra_states:Dt}),Ht={version:"версия",current:"текущий"},It={card:{climate:{disable_window:"Отключить окно",disable_summer:"Отключить лето",disable_eco:"Отключить режим eco",disable_heat:"Отключить обогрев",disable_off:"Отключить",disable_menu:"Отключить меню",disable_battery_warning:"Отключить предупреждение о разряде батареи",disable_buttons:"Отключить кнопку плюс/минус",eco_temperature:"Eco температура",set_current_as_main:"Поменять местами требуемую и текущую температуру"}}},Rt={window_open:"Окно открыто",night_mode:"Ночной режим",eco:"Eco",summer:"Лето"},Ft={common:Ht,editor:It,extra_states:Rt},Ut=Object.freeze({__proto__:null,common:Ht,default:Ft,editor:It,extra_states:Rt}),Bt={version:"Wersja",current:"Aktualna"},Wt={card:{climate:{disable_window:"Wyłącz okno",disable_summer:"Wyłacz lato",disable_eco:"Wyłącz tryb eko",disable_heat:"Wyłącz grzanie",disable_off:"Wyłącz wyłącznik",disable_menu:"Wyłącz menu",disable_battery_warning:"Wyłącz ostrzeżenie o baterii",disable_buttons:"Wyłącz przyciski plus/minus",eco_temperature:"Temperatura eko",set_current_as_main:"Zamień miejscami temperature docelową z aktualną"}}},Zt={window_open:"Otwarte okno",night_mode:"Tryb nocny",eco:"Tryb ekonomiczny",summer:"Lato"},qt={common:Bt,editor:Wt,extra_states:Zt},Yt=Object.freeze({__proto__:null,common:Bt,default:qt,editor:Wt,extra_states:Zt}),Xt={version:"verzia",current:"aktuálny"},Kt={card:{climate:{disable_window:"Zakázať okno",disable_summer:"Zakázať leto",disable_eco:"Zakázať eco",disable_heat:"Zakázať kúrenie",disable_off:"Vypnúť",disable_menu:"Zakázať menu",disable_battery_warning:"Zakázať upozornenie na batériu",disable_buttons:"Zakázať plus/mínus tlačidlá",eco_temperature:"Eco teplota",set_current_as_main:"Vymeňte cieľ za miesta s aktuálnou teplotou"}}},Jt={window_open:"Okno otvorené",night_mode:"Nočný mód",eco:"Eco",summer:"Leto"},Gt={common:Xt,editor:Kt,extra_states:Jt},Qt={version:"verzija",current:"trenutno"},te={card:{climate:{disable_window:"Isključi indikator prozora",disable_summer:"Isključi indikator ljeta",disable_eco:"Isključi prikaz eco gumba",disable_heat:"Isključi prikaz gumba paljenja",disable_off:"Isključi prikaz gumba gašenja",disable_menu:"Isključi prikaz izbornika",disable_battery_warning:"Isključi upozorenje baterije",disable_buttons:"Isključi prikaz plus/minus gumbi",eco_temperature:"Eco temperatura",set_current_as_main:"Zamijeni prikaz željene i trenutne temperature"}}},ee={window_open:"Prozor otvoren",night_mode:"Noćni način",eco:"Eco",summer:"Ljeto"},ie={common:Qt,editor:te,extra_states:ee},ne={version:"Verzió",current:"Aktuális"},oe={card:{climate:{disable_window:"Ablak kikapcsolás",disable_summer:"Nyár kikapcsolás",disable_eco:"Eco kikapcsolás",disable_heat:"Fűtés kikacsolás",disable_off:"Kikapcsolás inaktiválás",eco_temperature:"Eco hőmérséklet",set_current_as_main:"Aktuális hőmérséklet használata"}}},re={window_open:"Ablak nyitva",night_mode:"Éjszakai mód",eco:"Eco",summer:"Nyár"},se={common:ne,editor:oe,extra_states:re},ae={version:"version",current:"nuværende"},le={window_open:"Vindue åben",night_mode:"Nattilstand",eco:"Eco",summer:"Sommer"},ce={common:ae,extra_states:le},ue={version:"versión",current:"Actual"},he={card:{climate:{disable_window:"Deshabilitar ventana",disable_summer:"Deshabilitar verano",disable_eco:"Deshabilitar eco",disable_heat:"Deshabilitar calor",disable_off:"Deshabilitar apagado",disable_menu:"Deshabilitar menú",disable_battery_warning:"Deshabilitar alerta de batería",disable_buttons:"Deshabilitar botones más/menos",eco_temperature:"Temperatura Eco",set_current_as_main:"Fijar temperatura objetivo a temperatura actual"}}},de={window_open:"Ventana abierta",night_mode:"Modo noche",eco:"Eco",summer:"Verano"},pe={common:ue,editor:he,extra_states:de},me={version:"versiyon",current:"şimdiki"},ve={window_open:"Pencere açık",night_mode:"Gece modu",eco:"Eco",summer:"Yaz"},_e={common:me,extra_states:ve},fe={version:"versione",current:"Corrente"},ge={card:{climate:{disable_window:"Disabilita indicatore Finestra",disable_summer:"Disabilita indicatore Estate",disable_eco:"Disabilita tasto eco",disable_heat:"Disabilita tasto heat",disable_off:"Disabililita tasto off",eco_temperature:"Temperatura target",set_current_as_main:"Imposta la temperatura attuale come target"}}},be={window_open:"Finestra aperta",night_mode:"Modalità notturna",eco:"Eco",summer:"Estate"},ye={common:fe,editor:ge,extra_states:be},we={version:"versão",current:"actual"},$e={card:{climate:{disable_window:"Desactivar Janela",disable_summer:"Desactivar Verão",disable_eco:"Desactivar Eco",disable_heat:"Desactivar Aquecimento",disable_off:"Desactivar Off",eco_temperature:"Modo Eco",set_current_as_main:"Mudar para a temperatura local actual"}}},Ae={window_open:"Janela Aberta",night_mode:"Modo Noturno",eco:"Eco",summer:"Verão"},xe={common:we,editor:$e,extra_states:Ae},ke={version:"版本",current:"当前"},Ce={window_open:"窗户打开",night_mode:"夜间模式",eco:"节能",summer:"夏季"},Ee={common:ke,extra_states:Ce},Te={version:"версія",current:"поточний"},Se={card:{climate:{disable_window:"Прибрати вікно",disable_summer:"Прибрати літо",disable_eco:"Прибрати еко",disable_heat:"Прибрати обігрів",disable_off:"Прибрати відключення",disable_menu:"Прибрати меню",disable_battery_warning:"Прибрати попередження про акумулятор",disable_buttons:"Прибрати кнопки плюс/мінус",eco_temperature:"Еко температура",set_current_as_main:"Поміняйте місцями цільову з поточною температурою"}}},Le={window_open:"Вікно відчинено",night_mode:"Нічний режим",eco:"Економія",summer:"Літо"},Me={common:Te,editor:Se,extra_states:Le},ze={version:"έκδοση",current:"τρέχουσα"},Oe={window_open:"Παράθυρο ανοικτό",night_mode:"Λειτουργία νυκτός",eco:"Εξοικονόμηση",summer:"Καλοκαίρι"},je={common:ze,extra_states:Oe},Ve={version:"versie",current:"huidig"},De={window_open:"Raam open",night_mode:"Nacht modus",eco:"Eco",summer:"Zomer"},Pe={common:Ve,extra_states:De},Ne={version:"versjon",current:"nåværende"},He={window_open:"Vindu åpent",night_mode:"Nattmodus",eco:"Eco",summer:"Sommer"},Ie={common:Ne,extra_states:He},Re={version:"verze",current:"aktuální"},Fe={card:{climate:{disable_window:"Zakázat okno",disable_summer:"Zakázat léto",disable_eco:"Zakázat eco",disable_heat:"Zakázat topení",disable_off:"Zakázat vypnuto",disable_menu:"Zakázat menu",disable_battery_warning:"Zakázat upozornění baterie",disable_buttons:"Zakázat tlačítka plus/minus",eco_temperature:"Eco teplota",set_current_as_main:"Prohodit místa cílovoé a aktáalní teploty"}}},Ue={window_open:"okno otevřeno",night_mode:"Noční režim",eco:"Eco",summer:"Léto"},Be={common:Re,editor:Fe,extra_states:Ue},We={version:"različica",current:"trenutno"},Ze={window_open:"Okno odprto",night_mode:"Nočni način",eco:"Eko",summer:"Poletje"},qe={common:We,extra_states:Ze},Ye={version:"version",current:"Nuvarande"},Xe={window_open:"Fönster öppet",night_mode:"Nattläge",eco:"Eco",summer:"Sommar"},Ke={common:Ye,extra_states:Xe},Je={version:"версия",current:"текущий"},Ge={window_open:"Отворен прозорец",night_mode:"Нощен режим",eco:"Екологичен режим",summer:"Лято"},Qe={common:Je,extra_states:Ge},ti={version:"version",current:"Nykyinen"},ei={window_open:"Ikkuna auki",night_mode:"Yötila",eco:"Eco",summer:"Kesä"},ii={common:ti,extra_states:ei},ni={version:"versiune",current:"curent"},oi={window_open:"Fereastră deschisă",night_mode:"Mod noapte",eco:"Eco",summer:"Vară"},ri={common:ni,extra_states:oi},si={version:"versió",current:"Actual"},ai={window_open:"Finestra oberta",night_mode:"Mode nocturn",eco:"Eco",summer:"Estiu"},li={common:si,extra_states:ai},ci={version:"versijas",current:"pašreizējais"},ui={card:{climate:{disable_window:"Atspējot logu indikatoru",disable_summer:"Atspējot vasaras režīmu",disable_eco:"Atspējot ekonomisko režīmu",disable_heat:"Atspējot sildīšanas režīmu",disable_off:"Atspējot izslēgšanu",disable_menu:"Atspējot izvēlni",disable_battery_warning:"Atspējot baterijas brīdinājumu",disable_buttons:"Atspējot plus/mīnus pogas",eco_temperature:"Eko režīma temperatūra",set_current_as_main:"Apmainīt pašreizējo un mērķa temperatūru vietām"}}},hi={window_open:"Atvērts logs",night_mode:"Nakts režīms",eco:"Eko režīms",summer:"Vasaras režīms"},di={common:ci,editor:ui,extra_states:hi};const pi={en:Tt,de:Ot,fr:Nt,ru:Ut,sk:Object.freeze({__proto__:null,common:Xt,default:Gt,editor:Kt,extra_states:Jt}),hr:Object.freeze({__proto__:null,common:Qt,default:ie,editor:te,extra_states:ee}),hu:Object.freeze({__proto__:null,common:ne,default:se,editor:oe,extra_states:re}),pl:Yt,da:Object.freeze({__proto__:null,common:ae,default:ce,extra_states:le}),es:Object.freeze({__proto__:null,common:ue,default:pe,editor:he,extra_states:de}),tr:Object.freeze({__proto__:null,common:me,default:_e,extra_states:ve}),it:Object.freeze({__proto__:null,common:fe,default:ye,editor:ge,extra_states:be}),pt:Object.freeze({__proto__:null,common:we,default:xe,editor:$e,extra_states:Ae}),cn:Object.freeze({__proto__:null,common:ke,default:Ee,extra_states:Ce}),uk:Object.freeze({__proto__:null,common:Te,default:Me,editor:Se,extra_states:Le}),el:Object.freeze({__proto__:null,common:ze,default:je,extra_states:Oe}),nl:Object.freeze({__proto__:null,common:Ve,default:Pe,extra_states:De}),no:Object.freeze({__proto__:null,common:Ne,default:Ie,extra_states:He}),cs:Object.freeze({__proto__:null,common:Re,default:Be,editor:Fe,extra_states:Ue}),sl:Object.freeze({__proto__:null,common:We,default:qe,extra_states:Ze}),sv:Object.freeze({__proto__:null,common:Ye,default:Ke,extra_states:Xe}),bg:Object.freeze({__proto__:null,common:Je,default:Qe,extra_states:Ge}),fi:Object.freeze({__proto__:null,common:ti,default:ii,extra_states:ei}),ro:Object.freeze({__proto__:null,common:ni,default:ri,extra_states:oi}),ca:Object.freeze({__proto__:null,common:si,default:li,extra_states:ai}),lv:Object.freeze({__proto__:null,common:ci,default:di,editor:ui,extra_states:hi})},mi="en";function vi({hass:t,string:e,search:i="",replace:n=""}){var o;const r=null!==(o=null==t?void 0:t.locale.language)&&void 0!==o?o:mi;let s;try{s=e.split(".").reduce(((t,e)=>t[e]),pi[r])}catch(t){s=e.split(".").reduce(((t,e)=>t[e]),pi.en)}return void 0===s&&(s=e.split(".").reduce(((t,e)=>t[e]),pi.en)),""!==i&&""!==n&&(s=s.replace(i,n)),s}function _i(t,e){try{return t.split(".").reduce(((t,e)=>t[e]),pi[e])}catch(t){return}}var fi,gi,bi=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function yi(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(n=t[i],o=e[i],!(n===o||bi(n)&&bi(o)))return!1;var n,o;return!0}function wi(t,e){void 0===e&&(e=yi);var i=null;function n(){for(var n=[],o=0;o<arguments.length;o++)n[o]=arguments[o];if(i&&i.lastThis===this&&e(n,i.lastArgs))return i.lastResult;var r=t.apply(this,n);return i={lastResult:r,lastArgs:n,lastThis:this},r}return n.clear=function(){i=null},n}wi((t=>new Intl.DateTimeFormat(t.language,{weekday:"long",month:"long",day:"numeric"}))),wi((t=>new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"}))),wi((t=>new Intl.DateTimeFormat(t.language,{year:"numeric",month:"numeric",day:"numeric"}))),wi((t=>new Intl.DateTimeFormat(t.language,{day:"numeric",month:"short"}))),wi((t=>new Intl.DateTimeFormat(t.language,{month:"long",year:"numeric"}))),wi((t=>new Intl.DateTimeFormat(t.language,{month:"long"}))),wi((t=>new Intl.DateTimeFormat(t.language,{year:"numeric"}))),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(fi||(fi={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gi||(gi={}));const $i=wi((t=>{if(t.time_format===gi.language||t.time_format===gi.system){const e=t.time_format===gi.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===gi.am_pm}));wi((t=>new Intl.DateTimeFormat("en"!==t.language||$i(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"long",day:"numeric",hour:$i(t)?"numeric":"2-digit",minute:"2-digit",hour12:$i(t)}))),wi((t=>new Intl.DateTimeFormat("en"!==t.language||$i(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"long",day:"numeric",hour:$i(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:$i(t)}))),wi((t=>new Intl.DateTimeFormat("en"!==t.language||$i(t)?t.language:"en-u-hc-h23",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:$i(t)}))),wi((t=>new Intl.DateTimeFormat("en"!==t.language||$i(t)?t.language:"en-u-hc-h23",{hour:"numeric",minute:"2-digit",hour12:$i(t)}))),wi((t=>new Intl.DateTimeFormat("en"!==t.language||$i(t)?t.language:"en-u-hc-h23",{hour:$i(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:$i(t)}))),wi((t=>new Intl.DateTimeFormat("en"!==t.language||$i(t)?t.language:"en-u-hc-h23",{weekday:"long",hour:$i(t)?"numeric":"2-digit",minute:"2-digit",hour12:$i(t)})));const Ai=(t,e,i,n)=>{n=n||{},i=null==i?{}:i;const o=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return o.detail=i,t.dispatchEvent(o),o},xi=(t,e,i)=>Math.min(Math.max(t,e),i),ki=(t,e,i)=>{const n=e?(t=>{switch(t.number_format){case fi.comma_decimal:return["en-US","en"];case fi.decimal_comma:return["de","es","it"];case fi.space_comma:return["fr","sv","cs"];case fi.system:return;default:return t.language}})(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==fi.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(n,Ci(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,Ci(t,i)).format(Number(t))}return"string"==typeof t?t:`${((t,e=2)=>Math.round(t*10**e)/10**e)(t,null==i?void 0:i.maximumFractionDigits).toString()}${"currency"===(null==i?void 0:i.style)?` ${i.currency}`:""}`},Ci=(t,e)=>{const i=Object.assign({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){const e=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=e,i.maximumFractionDigits=e}return i};class Ei extends TypeError{constructor(t,e){let i;const{message:n,explanation:o,...r}=t,{path:s}=t,a=0===s.length?n:`At path: ${s.join(".")} -- ${n}`;super(o??a),null!=o&&(this.cause=a),Object.assign(this,r),this.name=this.constructor.name,this.failures=()=>i??(i=[t,...e()])}}function Ti(t){return"object"==typeof t&&null!=t}function Si(t){return"symbol"==typeof t?t.toString():"string"==typeof t?JSON.stringify(t):`${t}`}function Li(t,e,i,n){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:o,branch:r}=e,{type:s}=i,{refinement:a,message:l=`Expected a value of type \`${s}\`${a?` with refinement \`${a}\``:""}, but received: \`${Si(n)}\``}=t;return{value:n,type:s,refinement:a,key:o[o.length-1],path:o,branch:r,...t,message:l}}function*Mi(t,e,i,n){(function(t){return Ti(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const o of t){const t=Li(o,e,i,n);t&&(yield t)}}function*zi(t,e,i={}){const{path:n=[],branch:o=[t],coerce:r=!1,mask:s=!1}=i,a={path:n,branch:o};if(r&&(t=e.coercer(t,a),s&&"type"!==e.type&&Ti(e.schema)&&Ti(t)&&!Array.isArray(t)))for(const i in t)void 0===e.schema[i]&&delete t[i];let l="valid";for(const n of e.validator(t,a))n.explanation=i.message,l="not_valid",yield[n,void 0];for(let[c,u,h]of e.entries(t,a)){const e=zi(u,h,{path:void 0===c?n:[...n,c],branch:void 0===c?o:[...o,u],coerce:r,mask:s,message:i.message});for(const i of e)i[0]?(l=null!=i[0].refinement?"not_refined":"not_valid",yield[i[0],void 0]):r&&(u=i[1],void 0===c?t=u:t instanceof Map?t.set(c,u):t instanceof Set?t.add(u):Ti(t)&&(void 0!==u||c in t)&&(t[c]=u))}if("not_valid"!==l)for(const n of e.refiner(t,a))n.explanation=i.message,l="not_refined",yield[n,void 0];"valid"===l&&(yield[void 0,t])}class Oi{constructor(t){const{type:e,schema:i,validator:n,refiner:o,coercer:r=(t=>t),entries:s=function*(){}}=t;this.type=e,this.schema=i,this.entries=s,this.coercer=r,this.validator=n?(t,e)=>Mi(n(t,e),e,this,t):()=>[],this.refiner=o?(t,e)=>Mi(o(t,e),e,this,t):()=>[]}assert(t,e){return ji(t,this,e)}create(t,e){return function(t,e,i){const n=Vi(t,e,{coerce:!0,message:i});if(n[0])throw n[0];return n[1]}(t,this,e)}is(t){return function(t,e){const i=Vi(t,e);return!i[0]}(t,this)}mask(t,e){return function(t,e,i){const n=Vi(t,e,{coerce:!0,mask:!0,message:i});if(n[0])throw n[0];return n[1]}(t,this,e)}validate(t,e={}){return Vi(t,this,e)}}function ji(t,e,i){const n=Vi(t,e,{message:i});if(n[0])throw n[0]}function Vi(t,e,i={}){const n=zi(t,e,i),o=function(t){const{done:e,value:i}=t.next();return e?void 0:i}(n);if(o[0]){const t=new Ei(o[0],(function*(){for(const t of n)t[0]&&(yield t[0])}));return[t,void 0]}return[void 0,o[1]]}function Di(t,e){return new Oi({type:t,schema:null,validator:e})}function Pi(t){return new Oi({type:"array",schema:t,*entries(e){if(t&&Array.isArray(e))for(const[i,n]of e.entries())yield[i,n,t]},coercer:t=>Array.isArray(t)?t.slice():t,validator:t=>Array.isArray(t)||`Expected an array value, but received: ${Si(t)}`})}function Ni(){return Di("boolean",(t=>"boolean"==typeof t))}function Hi(t){const e=Si(t),i=typeof t;return new Oi({type:"literal",schema:"string"===i||"number"===i||"boolean"===i?t:null,validator:i=>i===t||`Expected the literal \`${e}\`, but received: ${Si(i)}`})}function Ii(){return Di("number",(t=>"number"==typeof t&&!isNaN(t)||`Expected a number, but received: ${Si(t)}`))}function Ri(t){const e=t?Object.keys(t):[],i=Di("never",(()=>!1));return new Oi({type:"object",schema:t||null,*entries(n){if(t&&Ti(n)){const o=new Set(Object.keys(n));for(const i of e)o.delete(i),yield[i,n[i],t[i]];for(const t of o)yield[t,n[t],i]}},validator:t=>Ti(t)||`Expected an object, but received: ${Si(t)}`,coercer:t=>Ti(t)?{...t}:t})}function Fi(t){return new Oi({...t,validator:(e,i)=>void 0===e||t.validator(e,i),refiner:(e,i)=>void 0===e||t.refiner(e,i)})}function Ui(){return Di("string",(t=>"string"==typeof t||`Expected a string, but received: ${Si(t)}`))}function Bi(t){const e=Object.keys(t);return new Oi({type:"type",schema:t,*entries(i){if(Ti(i))for(const n of e)yield[n,i[n],t[n]]},validator:t=>Ti(t)||`Expected an object, but received: ${Si(t)}`,coercer:t=>Ti(t)?{...t}:t})}function Wi(t){const e=t.map((t=>t.type)).join(" | ");return new Oi({type:"union",schema:null,coercer(e){for(const i of t){const[t,n]=i.validate(e,{coerce:!0});if(!t)return n}return e},validator(i,n){const o=[];for(const e of t){const[...t]=zi(i,e,n),[r]=t;if(!r[0])return[];for(const[e]of t)e&&o.push(e)}return[`Expected the value to satisfy a union of \`${e}\`, but received: ${Si(i)}`,...o]}})}const Zi=Ri({user:Ui()}),qi=Wi([Ni(),Ri({text:Fi(Ui()),excemptions:Fi(Pi(Zi))})]),Yi=Ri({action:Hi("url"),url_path:Ui(),confirmation:Fi(qi)}),Xi=Ri({action:Hi("call-service"),service:Ui(),service_data:Fi(Ri()),data:Fi(Ri()),target:Fi(Ri({entity_id:Fi(Wi([Ui(),Pi(Ui())])),device_id:Fi(Wi([Ui(),Pi(Ui())])),area_id:Fi(Wi([Ui(),Pi(Ui())]))})),confirmation:Fi(qi)}),Ki=Ri({action:Hi("navigate"),navigation_path:Ui(),confirmation:Fi(qi)}),Ji=Bi({action:Hi("fire-dom-event")}),Gi=Ri({action:function(t){const e={},i=t.map((t=>Si(t))).join();for(const i of t)e[i]=i;return new Oi({type:"enums",schema:e,validator:e=>t.includes(e)||`Expected one of \`${i}\`, but received: ${Si(e)}`})}(["none","toggle","more-info","call-service","url","navigate"]),confirmation:Fi(qi)});var Qi;Qi=t=>{if(t&&"object"==typeof t&&"action"in t)switch(t.action){case"call-service":return Xi;case"fire-dom-event":return Ji;case"navigate":return Ki;case"url":return Yi}return Gi},new Oi({type:"dynamic",schema:null,*entries(t,e){const i=Qi(t,e);yield*i.entries(t,e)},validator:(t,e)=>Qi(t,e).validator(t,e),coercer:(t,e)=>Qi(t,e).coercer(t,e),refiner:(t,e)=>Qi(t,e).refiner(t,e)}),s`
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
`;const tn=([[t,e],[i,n]],[o,r])=>[t*o+e*r,i*o+n*r],en=([t,e],[i,n])=>[t+i,e+n],nn=t=>t/180*Math.PI,on=t=>{const{x:e,y:i,r:n,start:o,end:r,rotate:s=0}=t,a=e,l=i,c=n,u=n,h=nn(o),d=(nn(r)-h)%(2*Math.PI),p=nn(s),m=(t=>[[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]])(p),[v,_]=en(tn(m,[c*Math.cos(h),u*Math.sin(h)]),[a,l]),[f,g]=en(tn(m,[c*Math.cos(h+d),u*Math.sin(h+d)]),[a,l]),b=d>Math.PI?1:0,y=d>0?1:0;return["M",v,_,"A",c,u,p/(2*Math.PI)*360,b,y,f,g].join(" ")};function rn(){return rn=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},rn.apply(this,arguments)}function sn(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function an(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var ln,cn="function"!=typeof Object.assign?function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var n=arguments[i];if(null!=n)for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o])}return e}:Object.assign,un=["","webkit","Moz","MS","ms","o"],hn="undefined"==typeof document?{style:{}}:document.createElement("div"),dn=Math.round,pn=Math.abs,mn=Date.now;function vn(t,e){for(var i,n,o=e[0].toUpperCase()+e.slice(1),r=0;r<un.length;){if((n=(i=un[r])?i+o:e)in t)return n;r++}}ln="undefined"==typeof window?{}:window;var _n=vn(hn.style,"touchAction"),fn=void 0!==_n;var gn="compute",bn="auto",yn="manipulation",wn="none",$n="pan-x",An="pan-y",xn=function(){if(!fn)return!1;var t={},e=ln.CSS&&ln.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach((function(i){return t[i]=!e||ln.CSS.supports("touch-action",i)})),t}(),kn="ontouchstart"in ln,Cn=void 0!==vn(ln,"PointerEvent"),En=kn&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),Tn="touch",Sn="mouse",Ln=25,Mn=1,zn=4,On=8,jn=1,Vn=2,Dn=4,Pn=8,Nn=16,Hn=Vn|Dn,In=Pn|Nn,Rn=Hn|In,Fn=["x","y"],Un=["clientX","clientY"];function Bn(t,e,i){var n;if(t)if(t.forEach)t.forEach(e,i);else if(void 0!==t.length)for(n=0;n<t.length;)e.call(i,t[n],n,t),n++;else for(n in t)t.hasOwnProperty(n)&&e.call(i,t[n],n,t)}function Wn(t,e){return"function"==typeof t?t.apply(e&&e[0]||void 0,e):t}function Zn(t,e){return t.indexOf(e)>-1}var qn=function(){function t(t,e){this.manager=t,this.set(e)}var e=t.prototype;return e.set=function(t){t===gn&&(t=this.compute()),fn&&this.manager.element.style&&xn[t]&&(this.manager.element.style[_n]=t),this.actions=t.toLowerCase().trim()},e.update=function(){this.set(this.manager.options.touchAction)},e.compute=function(){var t=[];return Bn(this.manager.recognizers,(function(e){Wn(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))})),function(t){if(Zn(t,wn))return wn;var e=Zn(t,$n),i=Zn(t,An);return e&&i?wn:e||i?e?$n:An:Zn(t,yn)?yn:bn}(t.join(" "))},e.preventDefaults=function(t){var e=t.srcEvent,i=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var n=this.actions,o=Zn(n,wn)&&!xn[wn],r=Zn(n,An)&&!xn[An],s=Zn(n,$n)&&!xn[$n];if(o){var a=1===t.pointers.length,l=t.distance<2,c=t.deltaTime<250;if(a&&l&&c)return}if(!s||!r)return o||r&&i&Hn||s&&i&In?this.preventSrc(e):void 0}},e.preventSrc=function(t){this.manager.session.prevented=!0,t.preventDefault()},t}();function Yn(t,e){for(;t;){if(t===e)return!0;t=t.parentNode}return!1}function Xn(t){var e=t.length;if(1===e)return{x:dn(t[0].clientX),y:dn(t[0].clientY)};for(var i=0,n=0,o=0;o<e;)i+=t[o].clientX,n+=t[o].clientY,o++;return{x:dn(i/e),y:dn(n/e)}}function Kn(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:dn(t.pointers[i].clientX),clientY:dn(t.pointers[i].clientY)},i++;return{timeStamp:mn(),pointers:e,center:Xn(e),deltaX:t.deltaX,deltaY:t.deltaY}}function Jn(t,e,i){i||(i=Fn);var n=e[i[0]]-t[i[0]],o=e[i[1]]-t[i[1]];return Math.sqrt(n*n+o*o)}function Gn(t,e,i){i||(i=Fn);var n=e[i[0]]-t[i[0]],o=e[i[1]]-t[i[1]];return 180*Math.atan2(o,n)/Math.PI}function Qn(t,e){return t===e?jn:pn(t)>=pn(e)?t<0?Vn:Dn:e<0?Pn:Nn}function to(t,e,i){return{x:e/t||0,y:i/t||0}}function eo(t,e){var i=t.session,n=e.pointers,o=n.length;i.firstInput||(i.firstInput=Kn(e)),o>1&&!i.firstMultiple?i.firstMultiple=Kn(e):1===o&&(i.firstMultiple=!1);var r=i.firstInput,s=i.firstMultiple,a=s?s.center:r.center,l=e.center=Xn(n);e.timeStamp=mn(),e.deltaTime=e.timeStamp-r.timeStamp,e.angle=Gn(a,l),e.distance=Jn(a,l),function(t,e){var i=e.center,n=t.offsetDelta||{},o=t.prevDelta||{},r=t.prevInput||{};e.eventType!==Mn&&r.eventType!==zn||(o=t.prevDelta={x:r.deltaX||0,y:r.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=o.x+(i.x-n.x),e.deltaY=o.y+(i.y-n.y)}(i,e),e.offsetDirection=Qn(e.deltaX,e.deltaY);var c,u,h=to(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=h.x,e.overallVelocityY=h.y,e.overallVelocity=pn(h.x)>pn(h.y)?h.x:h.y,e.scale=s?(c=s.pointers,Jn((u=n)[0],u[1],Un)/Jn(c[0],c[1],Un)):1,e.rotation=s?function(t,e){return Gn(e[1],e[0],Un)+Gn(t[1],t[0],Un)}(s.pointers,n):0,e.maxPointers=i.prevInput?e.pointers.length>i.prevInput.maxPointers?e.pointers.length:i.prevInput.maxPointers:e.pointers.length,function(t,e){var i,n,o,r,s=t.lastInterval||e,a=e.timeStamp-s.timeStamp;if(e.eventType!==On&&(a>Ln||void 0===s.velocity)){var l=e.deltaX-s.deltaX,c=e.deltaY-s.deltaY,u=to(a,l,c);n=u.x,o=u.y,i=pn(u.x)>pn(u.y)?u.x:u.y,r=Qn(l,c),t.lastInterval=e}else i=s.velocity,n=s.velocityX,o=s.velocityY,r=s.direction;e.velocity=i,e.velocityX=n,e.velocityY=o,e.direction=r}(i,e);var d,p=t.element,m=e.srcEvent;Yn(d=m.composedPath?m.composedPath()[0]:m.path?m.path[0]:m.target,p)&&(p=d),e.target=p}function io(t,e,i){var n=i.pointers.length,o=i.changedPointers.length,r=e&Mn&&n-o==0,s=e&(zn|On)&&n-o==0;i.isFirst=!!r,i.isFinal=!!s,r&&(t.session={}),i.eventType=e,eo(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function no(t){return t.trim().split(/\s+/g)}function oo(t,e,i){Bn(no(e),(function(e){t.addEventListener(e,i,!1)}))}function ro(t,e,i){Bn(no(e),(function(e){t.removeEventListener(e,i,!1)}))}function so(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||window}var ao=function(){function t(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){Wn(t.options.enable,[t])&&i.handler(e)},this.init()}var e=t.prototype;return e.handler=function(){},e.init=function(){this.evEl&&oo(this.element,this.evEl,this.domHandler),this.evTarget&&oo(this.target,this.evTarget,this.domHandler),this.evWin&&oo(so(this.element),this.evWin,this.domHandler)},e.destroy=function(){this.evEl&&ro(this.element,this.evEl,this.domHandler),this.evTarget&&ro(this.target,this.evTarget,this.domHandler),this.evWin&&ro(so(this.element),this.evWin,this.domHandler)},t}();function lo(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}var co={pointerdown:Mn,pointermove:2,pointerup:zn,pointercancel:On,pointerout:On},uo={2:Tn,3:"pen",4:Sn,5:"kinect"},ho="pointerdown",po="pointermove pointerup pointercancel";ln.MSPointerEvent&&!ln.PointerEvent&&(ho="MSPointerDown",po="MSPointerMove MSPointerUp MSPointerCancel");var mo=function(t){function e(){var i,n=e.prototype;return n.evEl=ho,n.evWin=po,(i=t.apply(this,arguments)||this).store=i.manager.session.pointerEvents=[],i}return sn(e,t),e.prototype.handler=function(t){var e=this.store,i=!1,n=t.type.toLowerCase().replace("ms",""),o=co[n],r=uo[t.pointerType]||t.pointerType,s=r===Tn,a=lo(e,t.pointerId,"pointerId");o&Mn&&(0===t.button||s)?a<0&&(e.push(t),a=e.length-1):o&(zn|On)&&(i=!0),a<0||(e[a]=t,this.callback(this.manager,o,{pointers:e,changedPointers:[t],pointerType:r,srcEvent:t}),i&&e.splice(a,1))},e}(ao);function vo(t){return Array.prototype.slice.call(t,0)}function _o(t,e,i){for(var n=[],o=[],r=0;r<t.length;){var s=e?t[r][e]:t[r];lo(o,s)<0&&n.push(t[r]),o[r]=s,r++}return i&&(n=e?n.sort((function(t,i){return t[e]>i[e]})):n.sort()),n}var fo={touchstart:Mn,touchmove:2,touchend:zn,touchcancel:On},go=function(t){function e(){var i;return e.prototype.evTarget="touchstart touchmove touchend touchcancel",(i=t.apply(this,arguments)||this).targetIds={},i}return sn(e,t),e.prototype.handler=function(t){var e=fo[t.type],i=bo.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:Tn,srcEvent:t})},e}(ao);function bo(t,e){var i,n,o=vo(t.touches),r=this.targetIds;if(e&(2|Mn)&&1===o.length)return r[o[0].identifier]=!0,[o,o];var s=vo(t.changedTouches),a=[],l=this.target;if(n=o.filter((function(t){return Yn(t.target,l)})),e===Mn)for(i=0;i<n.length;)r[n[i].identifier]=!0,i++;for(i=0;i<s.length;)r[s[i].identifier]&&a.push(s[i]),e&(zn|On)&&delete r[s[i].identifier],i++;return a.length?[_o(n.concat(a),"identifier",!0),a]:void 0}var yo={mousedown:Mn,mousemove:2,mouseup:zn},wo=function(t){function e(){var i,n=e.prototype;return n.evEl="mousedown",n.evWin="mousemove mouseup",(i=t.apply(this,arguments)||this).pressed=!1,i}return sn(e,t),e.prototype.handler=function(t){var e=yo[t.type];e&Mn&&0===t.button&&(this.pressed=!0),2&e&&1!==t.which&&(e=zn),this.pressed&&(e&zn&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:Sn,srcEvent:t}))},e}(ao),$o=2500;function Ao(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var i={x:e.clientX,y:e.clientY},n=this.lastTouches;this.lastTouches.push(i);setTimeout((function(){var t=n.indexOf(i);t>-1&&n.splice(t,1)}),$o)}}function xo(t,e){t&Mn?(this.primaryTouch=e.changedPointers[0].identifier,Ao.call(this,e)):t&(zn|On)&&Ao.call(this,e)}function ko(t){for(var e=t.srcEvent.clientX,i=t.srcEvent.clientY,n=0;n<this.lastTouches.length;n++){var o=this.lastTouches[n],r=Math.abs(e-o.x),s=Math.abs(i-o.y);if(r<=25&&s<=25)return!0}return!1}var Co=function(){return function(t){function e(e,i){var n;return(n=t.call(this,e,i)||this).handler=function(t,e,i){var o=i.pointerType===Tn,r=i.pointerType===Sn;if(!(r&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(o)xo.call(an(an(n)),e,i);else if(r&&ko.call(an(an(n)),i))return;n.callback(t,e,i)}},n.touch=new go(n.manager,n.handler),n.mouse=new wo(n.manager,n.handler),n.primaryTouch=null,n.lastTouches=[],n}return sn(e,t),e.prototype.destroy=function(){this.touch.destroy(),this.mouse.destroy()},e}(ao)}();function Eo(t,e,i){return!!Array.isArray(t)&&(Bn(t,i[e],i),!0)}var To=32,So=1;function Lo(t,e){var i=e.manager;return i?i.get(t):t}function Mo(t){return 16&t?"cancel":8&t?"end":4&t?"move":2&t?"start":""}var zo=function(){function t(t){void 0===t&&(t={}),this.options=rn({enable:!0},t),this.id=So++,this.manager=null,this.state=1,this.simultaneous={},this.requireFail=[]}var e=t.prototype;return e.set=function(t){return cn(this.options,t),this.manager&&this.manager.touchAction.update(),this},e.recognizeWith=function(t){if(Eo(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=Lo(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},e.dropRecognizeWith=function(t){return Eo(t,"dropRecognizeWith",this)||(t=Lo(t,this),delete this.simultaneous[t.id]),this},e.requireFailure=function(t){if(Eo(t,"requireFailure",this))return this;var e=this.requireFail;return-1===lo(e,t=Lo(t,this))&&(e.push(t),t.requireFailure(this)),this},e.dropRequireFailure=function(t){if(Eo(t,"dropRequireFailure",this))return this;t=Lo(t,this);var e=lo(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},e.hasRequireFailures=function(){return this.requireFail.length>0},e.canRecognizeWith=function(t){return!!this.simultaneous[t.id]},e.emit=function(t){var e=this,i=this.state;function n(i){e.manager.emit(i,t)}i<8&&n(e.options.event+Mo(i)),n(e.options.event),t.additionalEvent&&n(t.additionalEvent),i>=8&&n(e.options.event+Mo(i))},e.tryEmit=function(t){if(this.canEmit())return this.emit(t);this.state=To},e.canEmit=function(){for(var t=0;t<this.requireFail.length;){if(!(33&this.requireFail[t].state))return!1;t++}return!0},e.recognize=function(t){var e=cn({},t);if(!Wn(this.options.enable,[this,e]))return this.reset(),void(this.state=To);56&this.state&&(this.state=1),this.state=this.process(e),30&this.state&&this.tryEmit(e)},e.process=function(t){},e.getTouchAction=function(){},e.reset=function(){},t}(),Oo=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,rn({event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},e))||this).pTime=!1,i.pCenter=!1,i._timer=null,i._input=null,i.count=0,i}sn(e,t);var i=e.prototype;return i.getTouchAction=function(){return[yn]},i.process=function(t){var e=this,i=this.options,n=t.pointers.length===i.pointers,o=t.distance<i.threshold,r=t.deltaTime<i.time;if(this.reset(),t.eventType&Mn&&0===this.count)return this.failTimeout();if(o&&r&&n){if(t.eventType!==zn)return this.failTimeout();var s=!this.pTime||t.timeStamp-this.pTime<i.interval,a=!this.pCenter||Jn(this.pCenter,t.center)<i.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,a&&s?this.count+=1:this.count=1,this._input=t,0===this.count%i.taps)return this.hasRequireFailures()?(this._timer=setTimeout((function(){e.state=8,e.tryEmit()}),i.interval),2):8}return To},i.failTimeout=function(){var t=this;return this._timer=setTimeout((function(){t.state=To}),this.options.interval),To},i.reset=function(){clearTimeout(this._timer)},i.emit=function(){8===this.state&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))},e}(zo),jo=function(t){function e(e){return void 0===e&&(e={}),t.call(this,rn({pointers:1},e))||this}sn(e,t);var i=e.prototype;return i.attrTest=function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},i.process=function(t){var e=this.state,i=t.eventType,n=6&e,o=this.attrTest(t);return n&&(i&On||!o)?16|e:n||o?i&zn?8|e:2&e?4|e:2:To},e}(zo);function Vo(t){return t===Nn?"down":t===Pn?"up":t===Vn?"left":t===Dn?"right":""}var Do=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,rn({event:"pan",threshold:10,pointers:1,direction:Rn},e))||this).pX=null,i.pY=null,i}sn(e,t);var i=e.prototype;return i.getTouchAction=function(){var t=this.options.direction,e=[];return t&Hn&&e.push(An),t&In&&e.push($n),e},i.directionTest=function(t){var e=this.options,i=!0,n=t.distance,o=t.direction,r=t.deltaX,s=t.deltaY;return o&e.direction||(e.direction&Hn?(o=0===r?jn:r<0?Vn:Dn,i=r!==this.pX,n=Math.abs(t.deltaX)):(o=0===s?jn:s<0?Pn:Nn,i=s!==this.pY,n=Math.abs(t.deltaY))),t.direction=o,i&&n>e.threshold&&o&e.direction},i.attrTest=function(t){return jo.prototype.attrTest.call(this,t)&&(2&this.state||!(2&this.state)&&this.directionTest(t))},i.emit=function(e){this.pX=e.deltaX,this.pY=e.deltaY;var i=Vo(e.direction);i&&(e.additionalEvent=this.options.event+i),t.prototype.emit.call(this,e)},e}(jo),Po=function(t){function e(e){return void 0===e&&(e={}),t.call(this,rn({event:"swipe",threshold:10,velocity:.3,direction:Hn|In,pointers:1},e))||this}sn(e,t);var i=e.prototype;return i.getTouchAction=function(){return Do.prototype.getTouchAction.call(this)},i.attrTest=function(e){var i,n=this.options.direction;return n&(Hn|In)?i=e.overallVelocity:n&Hn?i=e.overallVelocityX:n&In&&(i=e.overallVelocityY),t.prototype.attrTest.call(this,e)&&n&e.offsetDirection&&e.distance>this.options.threshold&&e.maxPointers===this.options.pointers&&pn(i)>this.options.velocity&&e.eventType&zn},i.emit=function(t){var e=Vo(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)},e}(jo),No=function(t){function e(e){return void 0===e&&(e={}),t.call(this,rn({event:"pinch",threshold:0,pointers:2},e))||this}sn(e,t);var i=e.prototype;return i.getTouchAction=function(){return[wn]},i.attrTest=function(e){return t.prototype.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||2&this.state)},i.emit=function(e){if(1!==e.scale){var i=e.scale<1?"in":"out";e.additionalEvent=this.options.event+i}t.prototype.emit.call(this,e)},e}(jo),Ho=function(t){function e(e){return void 0===e&&(e={}),t.call(this,rn({event:"rotate",threshold:0,pointers:2},e))||this}sn(e,t);var i=e.prototype;return i.getTouchAction=function(){return[wn]},i.attrTest=function(e){return t.prototype.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||2&this.state)},e}(jo),Io=function(t){function e(e){var i;return void 0===e&&(e={}),(i=t.call(this,rn({event:"press",pointers:1,time:251,threshold:9},e))||this)._timer=null,i._input=null,i}sn(e,t);var i=e.prototype;return i.getTouchAction=function(){return[bn]},i.process=function(t){var e=this,i=this.options,n=t.pointers.length===i.pointers,o=t.distance<i.threshold,r=t.deltaTime>i.time;if(this._input=t,!o||!n||t.eventType&(zn|On)&&!r)this.reset();else if(t.eventType&Mn)this.reset(),this._timer=setTimeout((function(){e.state=8,e.tryEmit()}),i.time);else if(t.eventType&zn)return 8;return To},i.reset=function(){clearTimeout(this._timer)},i.emit=function(t){8===this.state&&(t&&t.eventType&zn?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=mn(),this.manager.emit(this.options.event,this._input)))},e}(zo),Ro={domEvents:!1,touchAction:gn,enable:!0,inputTarget:null,inputClass:null,cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},Fo=[[Ho,{enable:!1}],[No,{enable:!1},["rotate"]],[Po,{direction:Hn}],[Do,{direction:Hn},["swipe"]],[Oo],[Oo,{event:"doubletap",taps:2},["tap"]],[Io]];function Uo(t,e){var i,n=t.element;n.style&&(Bn(t.options.cssProps,(function(o,r){i=vn(n.style,r),e?(t.oldCssProps[i]=n.style[i],n.style[i]=o):n.style[i]=t.oldCssProps[i]||""})),e||(t.oldCssProps={}))}var Bo=function(){function t(t,e){var i,n=this;this.options=cn({},Ro,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=new((i=this).options.inputClass||(Cn?mo:En?go:kn?Co:wo))(i,io),this.touchAction=new qn(this,this.options.touchAction),Uo(this,!0),Bn(this.options.recognizers,(function(t){var e=n.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])}),this)}var e=t.prototype;return e.set=function(t){return cn(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},e.stop=function(t){this.session.stopped=t?2:1},e.recognize=function(t){var e=this.session;if(!e.stopped){var i;this.touchAction.preventDefaults(t);var n=this.recognizers,o=e.curRecognizer;(!o||o&&8&o.state)&&(e.curRecognizer=null,o=null);for(var r=0;r<n.length;)i=n[r],2===e.stopped||o&&i!==o&&!i.canRecognizeWith(o)?i.reset():i.recognize(t),!o&&14&i.state&&(e.curRecognizer=i,o=i),r++}},e.get=function(t){if(t instanceof zo)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event===t)return e[i];return null},e.add=function(t){if(Eo(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},e.remove=function(t){if(Eo(t,"remove",this))return this;var e=this.get(t);if(t){var i=this.recognizers,n=lo(i,e);-1!==n&&(i.splice(n,1),this.touchAction.update())}return this},e.on=function(t,e){if(void 0===t||void 0===e)return this;var i=this.handlers;return Bn(no(t),(function(t){i[t]=i[t]||[],i[t].push(e)})),this},e.off=function(t,e){if(void 0===t)return this;var i=this.handlers;return Bn(no(t),(function(t){e?i[t]&&i[t].splice(lo(i[t],e),1):delete i[t]})),this},e.emit=function(t,e){this.options.domEvents&&function(t,e){var i=document.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},e.destroy=function(){this.element&&Uo(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null},t}(),Wo={touchstart:Mn,touchmove:2,touchend:zn,touchcancel:On},Zo=function(t){function e(){var i,n=e.prototype;return n.evTarget="touchstart",n.evWin="touchstart touchmove touchend touchcancel",(i=t.apply(this,arguments)||this).started=!1,i}return sn(e,t),e.prototype.handler=function(t){var e=Wo[t.type];if(e===Mn&&(this.started=!0),this.started){var i=qo.call(this,t,e);e&(zn|On)&&i[0].length-i[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:Tn,srcEvent:t})}},e}(ao);function qo(t,e){var i=vo(t.touches),n=vo(t.changedTouches);return e&(zn|On)&&(i=_o(i.concat(n),"identifier",!0)),[i,n]}function Yo(t,e,i){var n="DEPRECATED METHOD: "+e+"\n"+i+" AT \n";return function(){var e=new Error("get-stack-trace"),i=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",o=window.console&&(window.console.warn||window.console.log);return o&&o.call(window.console,n,i),t.apply(this,arguments)}}var Xo=Yo((function(t,e,i){for(var n=Object.keys(e),o=0;o<n.length;)(!i||i&&void 0===t[n[o]])&&(t[n[o]]=e[n[o]]),o++;return t}),"extend","Use `assign`."),Ko=Yo((function(t,e){return Xo(t,e,!0)}),"merge","Use `assign`.");function Jo(t,e,i){var n,o=e.prototype;(n=t.prototype=Object.create(o)).constructor=t,n._super=o,i&&cn(n,i)}function Go(t,e){return function(){return t.apply(e,arguments)}}(function(){var t=function(t,e){return void 0===e&&(e={}),new Bo(t,rn({recognizers:Fo.concat()},e))};return t.VERSION="2.0.17-rc",t.DIRECTION_ALL=Rn,t.DIRECTION_DOWN=Nn,t.DIRECTION_LEFT=Vn,t.DIRECTION_RIGHT=Dn,t.DIRECTION_UP=Pn,t.DIRECTION_HORIZONTAL=Hn,t.DIRECTION_VERTICAL=In,t.DIRECTION_NONE=jn,t.DIRECTION_DOWN=Nn,t.INPUT_START=Mn,t.INPUT_MOVE=2,t.INPUT_END=zn,t.INPUT_CANCEL=On,t.STATE_POSSIBLE=1,t.STATE_BEGAN=2,t.STATE_CHANGED=4,t.STATE_ENDED=8,t.STATE_RECOGNIZED=8,t.STATE_CANCELLED=16,t.STATE_FAILED=To,t.Manager=Bo,t.Input=ao,t.TouchAction=qn,t.TouchInput=go,t.MouseInput=wo,t.PointerEventInput=mo,t.TouchMouseInput=Co,t.SingleTouchInput=Zo,t.Recognizer=zo,t.AttrRecognizer=jo,t.Tap=Oo,t.Pan=Do,t.Swipe=Po,t.Pinch=No,t.Rotate=Ho,t.Press=Io,t.on=oo,t.off=ro,t.each=Bn,t.merge=Ko,t.extend=Xo,t.bindFn=Go,t.assign=cn,t.inherit=Jo,t.bindFn=Go,t.prefixed=vn,t.toArray=vo,t.inArray=lo,t.uniqueArray=_o,t.splitStr=no,t.boolOrFn=Wn,t.hasParent=Yn,t.addEventListeners=oo,t.removeEventListeners=ro,t.defaults=cn({},Ro,{preset:Fo}),t})().defaults;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qo=270;const tr=new Set(["ArrowRight","ArrowUp","ArrowLeft","ArrowDown","PageUp","PageDown","Home","End"]);let er=class extends at{constructor(){super(...arguments),this.disabled=!1,this.step=1,this.min=0,this.max=100,this._localValue=this.value,this._localLow=this.low,this._localHigh=this.high,this._getPercentageFromEvent=t=>{const e=this._slider.getBoundingClientRect(),i=2*(t.center.x-e.left-e.width/2)/e.width,n=2*(t.center.y-e.top-e.height/2)/e.height,[,o]=function(t,e){return[Math.sqrt(t*t+e*e),Math.atan2(e,t)]}(i,n),r=(o/(2*Math.PI)*360+45-135+360)%360-45;return Math.max(Math.min(r/Qo,1),0)}}_valueToPercentage(t){return(xi(t,this.min,this.max)-this.min)/(this.max-this.min)}_percentageToValue(t){return(this.max-this.min)*t+this.min}_steppedValue(t){return Math.round(t/this.step)*this.step}_boundedValue(t){var e,i;const n="high"===this._activeSlider?Math.min(null!==(e=this._localLow)&&void 0!==e?e:this.max):this.min,o="low"===this._activeSlider?Math.max(null!==(i=this._localHigh)&&void 0!==i?i:this.min):this.max;return Math.min(Math.max(t,n),o)}firstUpdated(t){super.firstUpdated(t),this._setupListeners()}updated(t){super.updated(t),this._activeSlider||(t.has("value")&&(this._localValue=this.value),t.has("low")&&(this._localLow=this.low),t.has("high")&&(this._localHigh=this.high))}connectedCallback(){super.connectedCallback(),this._setupListeners()}disconnectedCallback(){super.disconnectedCallback()}_findActiveSlider(t){var e,i;if(!this.dual)return"value";const n=Math.max(null!==(e=this._localLow)&&void 0!==e?e:this.min,this.min),o=Math.min(null!==(i=this._localHigh)&&void 0!==i?i:this.max,this.max);if(n>=t)return"low";if(o<=t)return"high";return Math.abs(t-n)<=Math.abs(t-o)?"low":"high"}_setActiveValue(t){switch(this._activeSlider){case"high":this._localHigh=t;break;case"low":this._localLow=t;break;case"value":this._localValue=t}}_getActiveValue(){switch(this._activeSlider){case"high":return this._localHigh;case"low":return this._localLow;case"value":return this._localValue}}_setupListeners(){this._interaction&&!this._mc&&(this._mc=new Bo(this._interaction,{inputClass:Co}),this._mc.add(new Do({direction:Rn,enable:!0,threshold:0})),this._mc.add(new Oo({event:"singletap"})),this._mc.on("pan",(t=>{t.srcEvent.stopPropagation(),t.srcEvent.preventDefault()})),this._mc.on("panstart",(t=>{var e,i;if(this.disabled)return;const n=this._getPercentageFromEvent(t),o=this._percentageToValue(n);this._activeSlider=this._findActiveSlider(o),this._lastSlider=this._activeSlider,null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("#slider"))||void 0===i||i.focus()})),this._mc.on("pancancel",(()=>{this.disabled||(this._activeSlider=void 0)})),this._mc.on("panmove",(t=>{if(this.disabled)return;const e=this._getPercentageFromEvent(t),i=this._percentageToValue(e),n=this._boundedValue(i);this._setActiveValue(n);const o=this._steppedValue(n);this._activeSlider&&Ai(this,`${this._activeSlider}-changing`,{value:o})})),this._mc.on("panend",(t=>{if(this.disabled)return;const e=this._getPercentageFromEvent(t),i=this._percentageToValue(e),n=this._boundedValue(i),o=this._steppedValue(n);this._setActiveValue(o),this._activeSlider&&(Ai(this,`${this._activeSlider}-changing`,{value:void 0}),Ai(this,`${this._activeSlider}-changed`,{value:o})),this._activeSlider=void 0})),this._mc.on("singletap",(t=>{var e,i;if(this.disabled)return;const n=this._getPercentageFromEvent(t),o=this._percentageToValue(n);this._activeSlider=this._findActiveSlider(o);const r=this._boundedValue(o),s=this._steppedValue(r);this._setActiveValue(s),this._activeSlider&&(Ai(this,`${this._activeSlider}-changing`,{value:void 0}),Ai(this,`${this._activeSlider}-changed`,{value:s})),this._lastSlider=this._activeSlider,null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById("#slider"))||void 0===i||i.focus(),this._activeSlider=void 0})))}get _tenPercentStep(){return Math.max(this.step,(this.max-this.min)/10)}_handleKeyDown(t){var e,i,n;if(!tr.has(t.code))return;t.preventDefault(),this._lastSlider&&(null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.getElementById(this._lastSlider))||void 0===i||i.focus()),this._activeSlider=null!==(n=this._lastSlider)&&void 0!==n?n:t.currentTarget.id,this._lastSlider=void 0;const o=this._getActiveValue();switch(t.code){case"ArrowRight":case"ArrowUp":this._setActiveValue(this._boundedValue((null!=o?o:this.min)+this.step));break;case"ArrowLeft":case"ArrowDown":this._setActiveValue(this._boundedValue((null!=o?o:this.min)-this.step));break;case"PageUp":this._setActiveValue(this._steppedValue(this._boundedValue((null!=o?o:this.min)+this._tenPercentStep)));break;case"PageDown":this._setActiveValue(this._steppedValue(this._boundedValue((null!=o?o:this.min)-this._tenPercentStep)));break;case"Home":this._setActiveValue(this._boundedValue(this.min));break;case"End":this._setActiveValue(this._boundedValue(this.max))}Ai(this,`${this._activeSlider}-changing`,{value:this._getActiveValue()}),this._activeSlider=void 0}_handleKeyUp(t){tr.has(t.code)&&(this._activeSlider=t.currentTarget.id,t.preventDefault(),Ai(this,`${this._activeSlider}-changing`,{value:void 0}),Ai(this,`${this._activeSlider}-changed`,{value:this._getActiveValue()}),this._activeSlider=void 0)}destroyListeners(){this._mc&&(this._mc.destroy(),this._mc=void 0)}_strokeCircleDashArc(t){return this._strokeDashArc(t,t)}_strokeDashArc(t,e){const i=this._valueToPercentage(t),n=this._valueToPercentage(e),o=290*Math.PI*Qo/360,r=Math.max((n-i)*o,0);return[`${r} ${o-r}`,`-${i*o-.5}`]}renderArc(t,e,i){var n,o;if(this.disabled)return Z;const r=on({x:0,y:0,start:0,end:Qo,r:145}),s="end"===i?this.max:this.min,a=null!==(n=this.current)&&void 0!==n?n:s,l=null!=e?e:s,c="end"===i?l<=a:"start"===i&&a<=l,u=c?"end"===i?this._strokeDashArc(l,a):this._strokeDashArc(a,l):this._strokeCircleDashArc(l),h="full"===i?this._strokeDashArc(this.min,this.max):"end"===i?this._strokeDashArc(l,s):this._strokeDashArc(s,l),d=this._strokeCircleDashArc(l),p=null!=this.current&&this.current<=this.max&&this.current>=this.min&&(c||"full"===this.mode)?this._strokeCircleDashArc(this.current):void 0;return B`
        <g class=${gt({inactive:Boolean(this.inactive)})}>
          <path
            class="arc arc-clear"
            d=${r}
            stroke-dasharray=${h[0]}
            stroke-dashoffset=${h[1]}
          />
          <path
            class="arc arc-colored ${gt({[t]:!0})}"
            d=${r}
            stroke-dasharray=${h[0]}
            stroke-dashoffset=${h[1]}
          />
          <path
            .id=${t}
            d=${r}
            class="arc arc-active ${gt({[t]:!0})}"
            stroke-dasharray=${u[0]}
            stroke-dashoffset=${u[1]}
            role="slider"
            tabindex="0"
            aria-valuemin=${this.min}
            aria-valuemax=${this.max}
            aria-valuenow=${null!=this._localValue?this._steppedValue(this._localValue):void 0}
            aria-disabled=${this.disabled}
            aria-label=${(t=>t??Z)(null!==(o=this.lowLabel)&&void 0!==o?o:this.label)}
            @keydown=${this._handleKeyDown}
            @keyup=${this._handleKeyUp}
          />
          ${p?B`
                <path
                  class="current arc-current"
                  d=${r}
                  stroke-dasharray=${p[0]}
                  stroke-dashoffset=${p[1]}
                />
            `:Z}
          <path
            class="target-border ${gt({[t]:!0})}"
            d=${r}
            stroke-dasharray=${d[0]}
            stroke-dashoffset=${d[1]}
          />
          <path
            class="target"
            d=${r}
            stroke-dasharray=${d[0]}
            stroke-dashoffset=${d[1]}
          />
        </g>
      `}render(){const t=on({x:0,y:0,start:0,end:Qo,r:145}),e=this.dual?this._localLow:this._localValue,i=this._localHigh,n=this.current,o=n?this._strokeCircleDashArc(n):void 0;return U`
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
              ${o?B`
                    <path
                      class="current"
                      d=${t}
                      stroke-dasharray=${o[0]}
                      stroke-dashoffset=${o[1]}
                    />
                  `:Z}
              ${null!=e?this.renderArc(this.dual?"low":"value",e,!this.dual&&this.mode||"start"):Z}
              ${this.dual&&null!=i?this.renderArc("high",i,"end"):Z}
            </g>
          </g>
        </svg>
        <slot></slot>
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
      `}};t([dt({type:Boolean,reflect:!0})],er.prototype,"disabled",void 0),t([dt({type:Boolean})],er.prototype,"dual",void 0),t([dt({type:String})],er.prototype,"mode",void 0),t([dt({type:Boolean})],er.prototype,"inactive",void 0),t([dt({type:String})],er.prototype,"label",void 0),t([dt({type:String,attribute:"low-label"})],er.prototype,"lowLabel",void 0),t([dt({type:String,attribute:"high-label"})],er.prototype,"highLabel",void 0),t([dt({type:Number})],er.prototype,"value",void 0),t([dt({type:Number})],er.prototype,"low",void 0),t([dt({type:Number})],er.prototype,"high",void 0),t([dt({type:Number})],er.prototype,"current",void 0),t([dt({type:Number})],er.prototype,"step",void 0),t([dt({type:Number})],er.prototype,"min",void 0),t([dt({type:Number})],er.prototype,"max",void 0),t([pt()],er.prototype,"_localValue",void 0),t([pt()],er.prototype,"_localLow",void 0),t([pt()],er.prototype,"_localHigh",void 0),t([pt()],er.prototype,"_activeSlider",void 0),t([pt()],er.prototype,"_lastSlider",void 0),t([vt("#slider")],er.prototype,"_slider",void 0),t([vt("#interaction")],er.prototype,"_interaction",void 0),er=t([ct("bt-ha-control-circular-slider")],er);const ir="unavailable",nr={auto:"M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z",heat_cool:"M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",heat:"M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",cool:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",off:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",fan_only:"M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",dry:wt,window_open:At,eco:"M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z",summer:yt,temperature:"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",current_humidity:wt,ok:"M6.59,0.66C8.93,-1.15 11.47,1.06 12.04,4.5C12.47,4.5 12.89,4.62 13.27,4.84C13.79,4.24 14.25,3.42 14.07,2.5C13.65,0.35 16.06,-1.39 18.35,1.58C20.16,3.92 17.95,6.46 14.5,7.03C14.5,7.46 14.39,7.89 14.16,8.27C14.76,8.78 15.58,9.24 16.5,9.06C18.63,8.64 20.38,11.04 17.41,13.34C15.07,15.15 12.53,12.94 11.96,9.5C11.53,9.5 11.11,9.37 10.74,9.15C10.22,9.75 9.75,10.58 9.93,11.5C10.35,13.64 7.94,15.39 5.65,12.42C3.83,10.07 6.05,7.53 9.5,6.97C9.5,6.54 9.63,6.12 9.85,5.74C9.25,5.23 8.43,4.76 7.5,4.94C5.37,5.36 3.62,2.96 6.59,0.66M5,16H7A2,2 0 0,1 9,18V24H7V22H5V24H3V18A2,2 0 0,1 5,16M5,18V20H7V18H5M12.93,16H15L12.07,24H10L12.93,16M18,16H21V18H18V22H21V24H18A2,2 0 0,1 16,22V18A2,2 0 0,1 18,16Z"};function or(t){const e=window;e.customCards=e.customCards||[],e.customCards.push(Object.assign(Object.assign({},t),{preview:!0}))}console.info("%c  BetterThermostatUI-CARD \n%c  version: 2.2.0    ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),or({type:"better-thermostat-ui-card",name:"Better Thermostat Climate Card",description:"Card for climate entity"});let rr=class extends at{constructor(){super(),this.value={},this._selectTargetTemperature="low",this.current=0,this.current_humidity=0,this.min=0,this.max=35,this.step=1,this.window=!1,this.summer=!1,this.status="loading",this.mode="off",this.dragging=!1,this.target="value",this._debouncedCallService=((t,e,i=!1)=>{let n;const o=(...o)=>{const r=i&&!n;clearTimeout(n),n=window.setTimeout((()=>{n=void 0,i||t(...o)}),e),r&&t(...o)};return o.cancel=()=>{clearTimeout(n)},o})((t=>this._callService(t)),1e3),this._init=!0,this._firstRender=!0,this._ignore=!1,this._hasWindow=!1,this._hasSummer=!1,this._oldValueMin=0,this._oldValueMax=0,this._display_bottom=0,this._display_top=0,this.modes=[],this.lowBattery={},this.error=[],this.render=()=>{var t,e,i,n,o,r,s,a,l,c,u,h,d,p,m,v,_,f,g,b,y,w,$,A,x,k,C,E,T,S,L,M,z;return U`
    <ha-card id="${(null===(t=null==this?void 0:this._config)||void 0===t?void 0:t.disable_buttons)?"":"expand"}" class=${gt({[this.mode]:!0})}
    >
    ${(null===(e=this._config)||void 0===e?void 0:e.disable_menu)?"":U`
      <ha-icon-button
        class="more-info"
        .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
        .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
        @click=${this._handleMoreInfo}
        tabindex="0"
      ></ha-icon-button>
      `}
      ${(null===(n=null===(i=null==this?void 0:this._config)||void 0===i?void 0:i.name)||void 0===n?void 0:n.length)?U`
        <div class="name">${null===(o=this._config)||void 0===o?void 0:o.name}</div>
        `:U`<div class="name">&nbsp;</div>`}
      ${null!==this.lowBattery?U`
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

      ${null!=this.value.low&&null!=this.value.high&&this.stateObj.state!==ir?U`
        <bt-ha-control-circular-slider
          class="${(null===(s=null===(r=null==this?void 0:this.stateObj)||void 0===r?void 0:r.attributes)||void 0===s?void 0:s.saved_temperature)&&null!==(null===(l=null===(a=null==this?void 0:this.stateObj)||void 0===a?void 0:a.attributes)||void 0===l?void 0:l.saved_temperature)?"eco":""} ${null!==this.lowBattery||this.error.length>0?"battery":""} ${this.window?"window_open":""}  ${this.summer?"summer":""} "
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
          class="${(null===(u=null===(c=null==this?void 0:this.stateObj)||void 0===c?void 0:c.attributes)||void 0===u?void 0:u.saved_temperature)&&null!==(null===(d=null===(h=null==this?void 0:this.stateObj)||void 0===h?void 0:h.attributes)||void 0===d?void 0:d.saved_temperature)?"eco":""} ${null!==this.lowBattery||this.error.length>0?"battery":""} ${this.window?"window_open":""}  ${this.summer?"summer":""} "
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
      <div class="content ${null!==this.lowBattery||this.error.length>0?"battery":""} ${this.window?"window_open":""}  ${(null===(m=null===(p=null==this?void 0:this.stateObj)||void 0===p?void 0:p.attributes)||void 0===m?void 0:m.saved_temperature)&&null!==(null===(_=null===(v=null==this?void 0:this.stateObj)||void 0===v?void 0:v.attributes)||void 0===_?void 0:_.saved_temperature)?"eco":""} ${this.summer?"summer":""} ">
            <svg id="main" viewbox="0 0 125 100">
              <g transform="translate(57.5,37) scale(0.35)">
                ${this._hasWindow&&!(null===(f=this._config)||void 0===f?void 0:f.disable_window)?B`
                  <path title="${vi({hass:this.hass,string:"extra_states.window_open"})}" class="window ${this.window?"active":""}" fill="none" transform="${this._hasSummer&&!(null===(g=this._config)||void 0===g?void 0:g.disable_summer)?"translate(-31.25,0)":""}" id="window" d=${At} />
                `:""}
                ${this._hasSummer&&!(null===(b=this._config)||void 0===b?void 0:b.disable_summer)?B`
                  <path class="summer ${this.summer?"active":""}" fill="none" transform="${this._hasWindow&&!(null===(y=this._config)||void 0===y?void 0:y.disable_window)?"translate(31.25,0)":""}" id="summer" d=${yt} />
                `:""}
              </g>



              <text class="main-value" x="62.5" y="60%" dominant-baseline="middle" text-anchor="middle" style="font-size:15px;">
                ${B`${ki(this._display_top,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
                <tspan dx="-2" dy="-5.5" style="font-size: 5px;">
                  ${B`
                    ${this.hass.config.unit_system.temperature}
                  `}
                </tspan>
              </text>
              ${(null===(w=null==this?void 0:this.stateObj)||void 0===w?void 0:w.state)===ir||"unknown"===(null===($=null==this?void 0:this.stateObj)||void 0===$?void 0:$.state)?B`
              <text x="62.5" y="63%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">${this.hass.localize("state.default.unavailable")}</text>
              `:""}
              <line x1="35" y1="72" x2="90" y2="72" stroke="#e7e7e8" stroke-width="0.5" />
              <g class="current-info" transform="translate(62.5,80)">
                ${0===this.current_humidity?B`
                    <text x="-5%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
                    ${B`${ki(this._display_bottom,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
                    <tspan dx="-1" dy="-2" style="font-size: 3px;">
                      ${B`
                        ${this.hass.config.unit_system.temperature}
                      `}
                    </tspan>
                  </text>
                  ${this._renderHVACAction()}
                `:B`
                  <text x="-12.25%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
                    ${B`${ki(this._display_bottom,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
                    <tspan dx="-0.3" dy="-2" style="font-size: 3px;">
                      ${B`
                        ${this.hass.config.unit_system.temperature}
                      `}
                    </tspan>
                  </text>
                  <text x="12.25%" y="0%" dominant-baseline="middle" text-anchor="middle" style="font-size:6px;">
                    ${B`${ki(this.current_humidity,this.hass.locale,{minimumFractionDigits:1,maximumFractionDigits:1})}`}
                    <tspan dx="-0.3" dy="-2" style="font-size: 3px;">
                    %
                    </tspan>
                  </text>
                  ${this._renderHVACAction(!0)}
                `}

              </g>
                </svg>
            </div>
            </bt-ha-control-circular-slider>
            <div id="modes">
              ${(null==this?void 0:this._hasSummer)?B`
                ${(null===(A=null==this?void 0:this._config)||void 0===A?void 0:A.disable_heat)||!this.modes.includes("heat")?U``:this._renderIcon("heat",this.mode)}
                ${(null===(x=null==this?void 0:this._config)||void 0===x?void 0:x.disable_heat)||!this.modes.includes("heat_cool")?U``:this._renderHVACIcon(this.mode)}
                ${(null===(k=null==this?void 0:this._config)||void 0===k?void 0:k.disable_eco)?U``:(null===(E=null===(C=null==this?void 0:this.stateObj)||void 0===C?void 0:C.attributes)||void 0===E?void 0:E.saved_temperature)&&"none"!==(null===(S=null===(T=null==this?void 0:this.stateObj)||void 0===T?void 0:T.attributes)||void 0===S?void 0:S.saved_temperature)&&(null===(L=null==this?void 0:this.stateObj)||void 0===L?void 0:L.state)!==ir?this._renderIcon("eco","eco"):this._renderIcon("eco","none")}
                ${(null===(M=null==this?void 0:this._config)||void 0===M?void 0:M.disable_off)?U``:this._renderIcon("off",this.mode)}
              `:B`
                ${this.modes.map((t=>{var e,i,n;return!(null===(e=this._config)||void 0===e?void 0:e.disable_heat)||"heat"!==t&&"heat_cool"!==t?(null===(i=this._config)||void 0===i?void 0:i.disable_eco)&&"eco"===t||(null===(n=this._config)||void 0===n?void 0:n.disable_off)&&"off"===t?U``:this._renderIcon(t,this.mode):U``}))}
              `}

            </div>
            ${(null===(z=null==this?void 0:this._config)||void 0===z?void 0:z.disable_buttons)?U``:U`
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
            `}
          </div>
  </ha-card>
  `}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}static async getConfigElement(){return await Promise.resolve().then((function(){return dr})),document.createElement("better-thermostat-ui-card-editor")}static async getStubConfig(t){const e=Object.keys(t.states).filter((t=>["climate"].includes(t.split(".")[0]))),i=e.filter((e=>{var i;return null===(i=t.states[e].attributes)||void 0===i?void 0:i.call_for_heat}));return{type:"custom:better-thermostat-ui-card",entity:i[0]||e[0]}}_highChanged(t){const e=t.detail.value;if(isNaN(e))return;const i=t.type.replace("-changed","");this.value=Object.assign(Object.assign({},this.value),{[i]:e}),this._selectTargetTemperature=i,this._callService(i)}_highChanging(t){const e=t.detail.value;if(isNaN(e))return;const i=t.type.replace("-changing","");this.value=Object.assign(Object.assign({},this.value),{[i]:e}),this._selectTargetTemperature=i,this._updateDisplay(),this._vibrate(20)}_callService(t){"high"!==t&&"low"!==t?this.hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,temperature:this.value.value}):this.hass.callService("climate","set_temperature",{entity_id:this.stateObj.entity_id,target_temp_low:this.value.low,target_temp_high:this.value.high})}_handleButton(t){var e;const i=t.currentTarget.target,n=t.currentTarget.step,o="high"===i?this.max:this.min;let r=null!==(e=this.value[i])&&void 0!==e?e:o;r+=n,r=xi(r,this.min,this.max),"high"===i&&null!=this.value.low&&(r=xi(r,this.value.low,this.max)),"low"===i&&null!=this.value.high&&(r=xi(r,this.min,this.value.high)),this.value=Object.assign(Object.assign({},this.value),{[i]:r}),this._updateDisplay(),this._vibrate(40),this._debouncedCallService(i)}_handleSelectTemp(t){const e=t.currentTarget.target;this._selectTargetTemperature=e,this._updateDisplay(),this._vibrate(40)}setConfig(t){this._config=Object.assign({tap_action:{action:"toggle"},hold_action:{action:"more-info"}},t)}getCardSize(){return 1}_vibrate(t){try{navigator.vibrate(t)}catch(t){}}firstUpdated(t){this._init=!1}shouldUpdate(t){return void 0!==t.has("_config")&&void 0!==t.get("_config")&&(this._hasSummer=!1,this._hasWindow=!1,this.current_humidity=0),void 0!==t.get("hass")&&(this._init=!1),!0}updated(t){var e,i;super.updated(t),this._firstRender=!1,null===(i=null===(e=null==this?void 0:this.shadowRoot)||void 0===e?void 0:e.querySelector(".low_battery"))||void 0===i||i.addEventListener("click",(()=>{var t,e,i,n;null===(e=null===(t=null==this?void 0:this.shadowRoot)||void 0===t?void 0:t.querySelector(".low_battery"))||void 0===e||e.remove(),null===(n=null===(i=null==this?void 0:this.shadowRoot)||void 0===i?void 0:i.querySelector(".content"))||void 0===n||n.classList.remove("battery"),this._vibrate(2)}))}willUpdate(t){var e;if(!this.hass||!this._config||!t.has("hass")&&!t.has("_config"))return;const i=this._config.entity,n=this.hass.states[i];if(!n)return;const o=t.get("hass");if(!o||o.states[i]!==n){if(!this._config||!this.hass||!this._config.entity)return;this.stateObj=n;const t=this.stateObj.attributes,i=this.stateObj.state;if(this.mode=i||"off",t.hvac_modes&&(this.modes=Object.values(t.hvac_modes)),this.value={value:(null==t?void 0:t.temperature)||0,low:(null==t?void 0:t.target_temp_low)||null,high:(null==t?void 0:t.target_temp_high)||null},t.target_temp_step&&(this.step=t.target_temp_step),t.min_temp&&(this.min=t.min_temp),t.max_temp&&(this.max=t.max_temp),t.current_temperature&&(this.current=t.current_temperature),void 0!==(null==t?void 0:t.current_humidity)&&(this.current_humidity=parseFloat(t.current_humidity)),void 0!==(null==t?void 0:t.window_open)&&(this._hasWindow=!0,this.window=t.window_open),void 0!==(null==t?void 0:t.call_for_heat)&&(this._hasSummer=!0,this.summer=!t.call_for_heat),void 0===(null==t?void 0:t.batteries)||(null===(e=null==this?void 0:this._config)||void 0===e?void 0:e.disable_battery_warning))this.lowBattery=null;else{const e=Object.entries(JSON.parse(t.batteries)).filter((t=>t[1].battery<10));e.length>0?this.lowBattery=e.map((t=>({name:t[0],battery:t[1].battery})))[0]:this.lowBattery=null}if(void 0!==(null==t?void 0:t.errors)){const e=JSON.parse(t.errors);e.length>0?this.error=e[0]:this.error=[]}else this.error=[];this._updateDisplay()}}_updateDisplay(){var t;(null===(t=null==this?void 0:this._config)||void 0===t?void 0:t.set_current_as_main)?(this._display_bottom=this._getCurrentSetpoint(),this._display_top=this.current):(this._display_bottom=this.current,this._display_top=this._getCurrentSetpoint())}_handleAction(t){var e,i,n,o,r;if("eco"===t.currentTarget.mode){null===((null===(i=null===(e=null==this?void 0:this.stateObj)||void 0===e?void 0:e.attributes)||void 0===i?void 0:i.saved_temperature)||null)?this.hass.callService("better_thermostat","set_temp_target_temperature",{entity_id:this._config.entity,temperature:(null===(n=this._config)||void 0===n?void 0:n.eco_temperature)||18}):this.hass.callService("better_thermostat","restore_saved_target_temperature",{entity_id:this._config.entity})}else{null!==((null===(r=null===(o=null==this?void 0:this.stateObj)||void 0===o?void 0:o.attributes)||void 0===r?void 0:r.saved_temperature)||null)&&this.hass.callService("better_thermostat","restore_saved_target_temperature",{entity_id:this._config.entity}),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t.currentTarget.mode})}}_setTemperature(){this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:this.value})}_getCurrentSetpoint(){var t,e,i,n,o,r,s,a;return null!==(null===(t=null==this?void 0:this.value)||void 0===t?void 0:t.high)&&null!==(null===(e=null==this?void 0:this.value)||void 0===e?void 0:e.low)?((null===(i=null==this?void 0:this.value)||void 0===i?void 0:i.low)||0)>=this.current?(null===(n=null==this?void 0:this.value)||void 0===n?void 0:n.low)||0:((null===(o=null==this?void 0:this.value)||void 0===o?void 0:o.high)||0)<=this.current?(null===(r=null==this?void 0:this.value)||void 0===r?void 0:r.high)||0:(null===(s=null==this?void 0:this.value)||void 0===s?void 0:s.low)||0:(null===(a=null==this?void 0:this.value)||void 0===a?void 0:a.value)||0}_renderHVACAction(t=!1){var e,i,n,o,r,s,a,l;return t?null===(null===(e=null==this?void 0:this.value)||void 0===e?void 0:e.low)&&null===(null===(i=null==this?void 0:this.value)||void 0===i?void 0:i.high)||((null===(n=null==this?void 0:this.value)||void 0===n?void 0:n.low)||0)>=this.current?B`<path class="status ${"heating"===this.stateObj.attributes.hvac_action&&"off"!==this.mode?"active":""}"  transform="translate(-3,-3.5) scale(0.25)" fill="#9d9d9d"  d="${bt}" />`:((null===(o=null==this?void 0:this.value)||void 0===o?void 0:o.high)||0)<=this.current?B`<path class="status cooler ${"cooling"===this.stateObj.attributes.hvac_action&&"off"!==this.mode?"active":""}"  transform="translate(-3,-3.5) scale(0.25)" fill="#9d9d9d"  d="${$t}" />`:B`<path class="status ${"heating"===this.stateObj.attributes.hvac_action&&"off"!==this.mode?"active":""}"  transform="translate(-3,-3.5) scale(0.25)" fill="#9d9d9d"  d="${bt}" />`:null===(null===(r=null==this?void 0:this.value)||void 0===r?void 0:r.low)&&null===(null===(s=null==this?void 0:this.value)||void 0===s?void 0:s.high)||((null===(a=null==this?void 0:this.value)||void 0===a?void 0:a.low)||0)>=this.current?B`<path class="status ${"heating"===this.stateObj.attributes.hvac_action&&"off"!==this.mode?"active":""}"  transform="translate(5,-4) scale(0.25)" fill="#9d9d9d"  d="${bt}" />`:((null===(l=null==this?void 0:this.value)||void 0===l?void 0:l.high)||0)<=this.current?B`<path class="status cooler ${"cooling"===this.stateObj.attributes.hvac_action&&"off"!==this.mode?"active":""}"  transform="translate(5,-4) scale(0.25)" fill="#9d9d9d"  d="${$t}" />`:B`<path class="status ${"heating"===this.stateObj.attributes.hvac_action&&"off"!==this.mode?"active":""}"  transform="translate(5,-4) scale(0.25)" fill="#9d9d9d"  d="${bt}" />`}_renderHVACIcon(t){var e,i;return((null===(e=null==this?void 0:this.value)||void 0===e?void 0:e.low)||0)>=this.current?this._renderIcon("heat",t):((null===(i=null==this?void 0:this.value)||void 0===i?void 0:i.high)||0)<=this.current?this._renderIcon("cool",t):this._renderIcon("ok",t)}_renderIcon(t,e){if(!nr[t])return U``;const i=this.hass.localize(`component.climate.state._.${t}`)||vi({hass:this.hass,string:`extra_states.${t}`});return U`
      <ha-icon-button
        title="${e===t?t:""}"
        class=${gt({"selected-icon":e===t})}
        .mode=${t}
        @click=${this._handleAction}
        tabindex="0"
        .path=${nr[t]}
        .label=${i}
      >
      </ha-icon-button>
    `}_handleMoreInfo(){Ai(this,"hass-more-info",{entityId:this._config.entity})}};rr.styles=s`
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
  `,t([dt({attribute:!1})],rr.prototype,"hass",void 0),t([dt({type:Number})],rr.prototype,"value",void 0),t([pt()],rr.prototype,"_selectTargetTemperature",void 0),t([dt({type:Number})],rr.prototype,"current",void 0),t([dt({type:Number})],rr.prototype,"current_humidity",void 0),t([dt({type:Number})],rr.prototype,"min",void 0),t([dt({type:Number})],rr.prototype,"max",void 0),t([dt({type:Number})],rr.prototype,"step",void 0),t([dt({type:Boolean})],rr.prototype,"window",void 0),t([dt({type:Boolean})],rr.prototype,"summer",void 0),t([dt({type:String})],rr.prototype,"status",void 0),t([dt({type:String})],rr.prototype,"mode",void 0),t([dt({type:Boolean,reflect:!0})],rr.prototype,"dragging",void 0),t([pt()],rr.prototype,"changingHigh",void 0),t([pt()],rr.prototype,"_config",void 0),rr=t([ct("better-thermostat-ui-card")],rr);const sr=function(...t){const e="type"===t[0].type,i=t.map((t=>t.schema)),n=Object.assign({},...i);return e?Bi(n):Ri(n)}(Ri({index:Fi(Ii()),view_index:Fi(Ii()),view_layout:Di("any",(()=>!0)),type:Ui()}),Ri({entity:Fi(Ui()),name:Fi(Ui()),icon:Fi(Ui())}),Ri({disable_window:Fi(Ni()),disable_summer:Fi(Ni()),disable_eco:Fi(Ni()),disable_heat:Fi(Ni()),disable_off:Fi(Ni()),disable_battery_warning:Fi(Ni()),set_current_as_main:Fi(Ni()),eco_temperature:Fi(Ii()),disable_menu:Fi(Ni()),disable_buttons:Fi(Ni())})),ar=["icon_color","layout","fill_container","primary_info","secondary_info","icon_type","content_info","use_entity_picture","collapsible_controls","icon_animation"],lr=t=>{var e,i;customElements.get("ha-form")&&(customElements.get("hui-action-editor")||((t,e,i,n)=>{const[o,r,s]=t.split(".",3);return Number(o)>e||Number(o)===e&&(void 0===n?Number(r)>=i:Number(r)>i)||void 0!==n&&Number(o)===e&&Number(r)===i&&Number(s)>=n})(t,2022,11))||null===(e=customElements.get("hui-button-card"))||void 0===e||e.getConfigElement(),customElements.get("ha-entity-picker")||null===(i=customElements.get("hui-entities-card"))||void 0===i||i.getConfigElement()},cr=["eco_temperature","disable_window","disable_summer","disable_eco","disable_heat","disable_off","disable_menu","disable_battery_warning","set_current_as_main","disable_buttons"],ur=wi((()=>[{name:"entity",selector:{entity:{domain:["climate"]}}},{name:"name",selector:{text:{}}},{name:"eco_temperature",selector:{number:{placeholder:20,min:5,max:45,default:20}}},{type:"grid",name:"",schema:[{name:"disable_window",selector:{boolean:{}}},{name:"disable_summer",selector:{boolean:{}}},{name:"disable_eco",selector:{boolean:{}}},{name:"disable_heat",selector:{boolean:{}}},{name:"disable_off",selector:{boolean:{}}},{name:"disable_menu",selector:{boolean:{}}},{name:"disable_battery_warning",selector:{boolean:{}}},{name:"set_current_as_main",selector:{boolean:{}}},{name:"disable_buttons",selector:{boolean:{}}}]}]));let hr=class extends at{constructor(){super(...arguments),this._computeLabel=t=>{const e=(i=this.hass,function(t){var e;let n=_i(t,null!==(e=null==i?void 0:i.locale.language)&&void 0!==e?e:mi);return n||(n=_i(t,mi)),null!=n?n:t});var i;return ar.includes(t.name)?e(`editor.card.generic.${t.name}`):cr.includes(t.name)?e(`editor.card.climate.${t.name}`):this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)}}connectedCallback(){super.connectedCallback(),lr(this.hass.connection.haVersion)}setConfig(t){ji(t,sr),this._config=t}render(){if(!this.hass||!this._config)return U``;const t=ur();return U`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${t}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `}_valueChanged(t){Ai(this,"config-changed",{config:t.detail.value}),Ai(this,"hass",{config:t.detail.value})}};t([pt()],hr.prototype,"_config",void 0),t([dt({attribute:!1})],hr.prototype,"hass",void 0),hr=t([ct("better-thermostat-ui-card-editor")],hr);var dr=Object.freeze({__proto__:null,get ClimateCardEditor(){return hr}});export{rr as BetterThermostatUi,or as registerCustomCard};
