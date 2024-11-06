!function(){var e={211:function(e,t,n){"use strict";n.d(t,{Render:function(){return w},Router:function(){return g}});const a=/[A-Z]/g,o=/:(\w+)/g,r=/\.\w+$/,s=new WeakMap,i=(new DOMParser).parseFromString("","text/html"),c=[[/&/g,"&amp;"],[/</g,"&lt;"],[/>/g,"&gt;"],[/"/g,"&quot;"],[/'/g,"&#39;"]],l=Object.getPrototypeOf((async function(){})).constructor,getNameKebab=(e,t)=>(t>0?"-":"")+e,u=new DocumentFragment,d=new Set,h=Symbol(),p=Symbol(),m=Symbol(),f=Symbol();async function _ctn(...e){for(let t of e){if(t instanceof HTMLTemplateElement){const e=t.content,n=[...e.querySelectorAll("script")].map((t=>e.removeChild(t).innerHTML)).join(""),a=await(n?new l(n)():null);if("function"!=typeof a){console.error(`Error: return value "${a}" is not a class`);continue}a.template=Function(`return this.$tag\`${t.innerHTML}\``),t=a}else if("function"!=typeof t){console.error(`Error: argument "${t}" is not a class or <template> element`);continue}const e=t.name.replace(a,getNameKebab).toLocaleLowerCase(),n=t.mode?t.mode.toLocaleLowerCase():t.mode,o=t.extends?t.extends.toLocaleLowerCase():t.extends,r=!!t.hasOwnProperty("serializable")&&t.serializable,i=o?Object.getPrototypeOf(document.createElement(o)).constructor:HTMLElement;customElements.define(e,class extends i{constructor(){super(),d.add(this);const e=n?this.attachShadow({mode:n,serializable:r}):this,a=(new DOMParser).parseFromString("","text/html").body,o=new Proxy(new t,{get:(t,n)=>n===p?e:n in t?t[n]:this[n]});Object.defineProperties(this,{$host:{value:this},$shadow:{value:this.shadowRoot},$data:{value:this.dataset},$state:{value:new Proxy(o,{get:(e,t)=>{if("closed"!==n)return e[t]},set:(e,t,a)=>{if("closed"===n)throw new Error("cannot change the state of a closed component");return e[t]=a,!0}})},[f]:{value:e===this}}),s.set(this,{root:e,temp:a,state:o})}async connectedCallback(){const{root:e,state:n}=s.get(this);"function"==typeof t.startConnect&&await t.startConnect.call(n),"function"==typeof t.template&&(e.innerHTML=t.template.call(n)||""),"function"==typeof t.connected&&t.connected.call(n),setTimeout((()=>{d.delete(this),0===d.size&&u.dispatchEvent(new CustomEvent("load"))}),1)}disconnectedCallback(){"function"==typeof t.disconnected&&t.disconnected.call(s.get(this).state)}adoptedCallback(){"function"==typeof t.adopted&&t.adopted.call(s.get(this).state)}attributeChangedCallback(e,n,a){"function"==typeof t.changed&&null!==n&&t.changed.call(s.get(this).state,e,n,a)}static get observedAttributes(){if(Array.isArray(t.attributes))return t.attributes}get $event(){return _ctn.event}get $router(){return _ctn.router}get[m](){return!0}$(e){return(this[p]||this.$shadow||this).querySelector(e)}$$(e){return(this[p]||this.$shadow||this).querySelectorAll(e)}$update(){if("closed"!==n||this[p])return getUpdate.call(this,t)}$tag(...e){return _ctn.tag.call(this,...e)}$entities(...e){return _ctn.entities(...e)}},o?{extends:o}:null)}}function getUpdate(e){const t=performance.now();if("function"==typeof e.template){const{root:t,temp:a,state:o}=s.get(this.$host);a.innerHTML=e.template.call(o)||"";const r=t.childNodes,i=a.childNodes;for(var n=0;n<r.length||n<i.length;n++)updateDOM(t,r[n],i[n],n)||n--;a.innerHTML=""}return performance.now()-t+" ms"}function updateDOM(e,t,n,a=0){if(t){if(!n)return!e.removeChild(e.childNodes[a]);if(t.nodeName!==n.nodeName)e.replaceChild(n.cloneNode(!0),e.childNodes[a]);else if(t.nodeValue!==n.nodeValue)t.nodeValue=n.nodeValue;else if(t.attributes&&((t.attributes.length||n.attributes.length)&&function updateAttr(e,t){const n=e.attributes,a=t.attributes;new Set([...e.getAttributeNames(),...t.getAttributeNames()]).forEach((t=>{a[t]&&!n[t]?e.setAttribute(t,a[t].value):n[t]&&!a[t]?e.removeAttribute(t):n[t]&&a[t]&&n[t].value!==a[t].value&&(n[t].value=a[t].value)}))}(t,n),!t[f])){const r=t.childNodes,s=n.childNodes;for(var o=0;o<r.length||o<s.length;o++)updateDOM(e.childNodes[a],r[o],s[o],o)||o--}}else e.append(n.cloneNode(!0));return!0}function routerCallback(e,t,n){const a=e[h].regs,o=t.replace(location.origin,"");for(const[r,s]of a){const a=r.exec(o);if(a){const o=new CustomEvent(s,{detail:n});o.url=new URL(t),o.params=a.groups,o.search=o.url.searchParams,e.dispatchEvent(o)}}}function renderCallback(e,t,n,a){if(a&&("STYLE"===e.nodeName||"SCRIPT"===e.nodeName||"TEMPLATE"===e.nodeName||8===e.nodeType))return;let o;if("SLOT"!==e.nodeName||n)if(e[m]){for(var r of(o=i.createElement(e.nodeName),e.attributes))o.setAttribute(r.name,r.value);e[f]||(e=s.get(e).root)}else o=e.cloneNode(!1);else o=new DocumentFragment;const c=e.assignedNodes?e.assignedNodes({flatten:!1}):(e.content||e).childNodes;if(c)for(var l=0;l<c.length;l++)renderCallback(c[l],o.content||o,n,a);t.append(o)}_ctn.tag=function(e,...t){let n="";for(var a=0;a<e.length;a++)if(n+=e.raw[a],a<t.length)if(Array.isArray(t[a]))n+=t[a].join("");else if("function"==typeof t[a]){const e=t[a].call(this);n+=Array.isArray(e)?e.join(""):e}else n+=t[a];return n},_ctn.entities=function(e,...t){return(t.length?[...c,...t]:c).reduce(((e,t)=>e.replace(...t)),e)},_ctn.event=function(e,t,n=null){if(new.target)return new DocumentFragment;e.dispatchEvent(new CustomEvent(t,{detail:n}))},_ctn.router=function(e,t,n=null){if(new.target){const e={},t=new Map,n=new class extends DocumentFragment{addEventListener(...e){t.set(new RegExp(`^/?${e[0].replace(o,((e,t)=>`(?<${t}>\\w+)`))}/?$`),e[0]),document.addEventListener.call(this,...e)}};return n[h]={idx:0,vals:e,regs:t},window.addEventListener("popstate",(t=>{routerCallback(n,location.href,e[t.state])})),n}if(!t||!t.startsWith(location.origin)||r.test(t))return;const a=e[h];history.pushState(a.idx,"",t),a.vals[a.idx++]=n,routerCallback(e,t,n)},_ctn.render=async function({parent:e=document.children[0],slots:t=!1,clean:n=!0}={}){await new Promise((e=>u.addEventListener("load",e)));const a=document.createElement("template");return renderCallback(e,a.content,t,n),e===document.children[0]?`<!DOCTYPE html>\n${a.innerHTML}`:a.innerHTML},t.default=_ctn;_ctn.tag,_ctn.event;const g=_ctn.router,w=_ctn.render;_ctn.entities},769:function(e,t,n){e.exports=n(211)}},t={};function __webpack_require__(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,__webpack_require__),o.exports}__webpack_require__.d=function(e,t){for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=__webpack_require__(769);const t=new e.Router,httpRequest=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"json";const a=new XMLHttpRequest;return a.open(t,e),a.responseType=n,a.send(),new Promise((e=>a.onload=()=>e(a.response)))};let n;n=class WMenu{static mode="open";static connected(){this.$("nav").addEventListener("click",(e=>{e.preventDefault(),this.$router(t,e.target.href)}))}},n.template=function(){return this.$tag`<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contacts">Contacts</a>
</nav>

<style>
  a {
    text-decoration: none; 
    padding-right: 3px;
  }
</style>

`};var a=n;let o;o=class WHome{static mode="open";static async startConnect(){const e=await httpRequest("/db?page=home");this.title=e.title,this.message=e.message}},o.template=function(){return this.$tag`<h2>${this.title}</h2>
<p>${this.message}</p>

`};var r=o;let s;s=class WAbout{static mode="open";static async startConnect(){const e=await httpRequest("/db?page=about");this.title=e.title,this.message=e.message}},s.template=function(){return this.$tag`<h2>${this.title}</h2>
<p>${this.message}</p>

`};var i=s;let c;c=class WContacts{static mode="open";static async startConnect(){const e=await httpRequest("/db?page=contacts");this.title=e.title,this.message=e.message}},c.template=function(){return this.$tag`<h2>${this.title}</h2>
<p>${this.message}</p>

`};var l=c;window._$CtnRender_=e.Render,(0,e.default)(class WHeader{static mode="open";static extends="header";message="Creaton";static template(){return`\n      <w-menu></w-menu>\n      <h1>${this.message} is <slot></slot></h1>\n      <img src="img/banner.jpg" alt="banner">\n\n      <style>\n        :host {\n          margin-bottom: 50px;\n        }\n        h1 {\n          color: ${this.$data.color};\n        }\n        img {\n          max-width: 100%;\n        }\n      </style>\n    `}},a,class WContent{static mode="open";static extends="main";page="";static connected(){t.addEventListener("(:page)?",(e=>{this.page=`w-${e.params.page||"home"}`,this.$update()})),this.$router(t,location.href)}static template(){if(this.page)return`<${this.page} />`}},r,i,l)}()}();