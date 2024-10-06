!function(){"use strict";const t=/[A-Z]/g,e=/:(\w+)/g,n=/\.\w+$/,a=(new DOMParser).parseFromString("","text/html"),s=[[/&/g,"&amp;"],[/</g,"&lt;"],[/>/g,"&gt;"],[/"/g,"&quot;"],[/'/g,"&#39;"]],o=Object.getPrototypeOf((async function(){})).constructor,getNameKebab=(t,e)=>(e>0?"-":"")+t,r=new DocumentFragment,i=new Set,c=Symbol(),l=Symbol(),d=Symbol(),h=Symbol(),u=Symbol(),m=Symbol(),p=Symbol();async function _ctn(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];for(let e of n){if(e instanceof HTMLTemplateElement){const t=e.content,n=[...t.querySelectorAll("script")].map((e=>t.removeChild(e).innerHTML)).join(""),a=await(n?new o(n)():null);if("function"!=typeof a){console.error(`Error: return value "${a}" is not a class`);continue}a.template=Function(`return this.$tag\`${e.innerHTML}\``),e=a}else if("function"!=typeof e){console.error(`Error: argument "${e}" is not a class or <template> element`);continue}const n=e.name.replace(t,getNameKebab).toLocaleLowerCase(),a=e.mode?e.mode.toLocaleLowerCase():e.mode,s=e.extends?e.extends.toLocaleLowerCase():e.extends,m=!!e.hasOwnProperty("serializable")&&e.serializable,g=s?Object.getPrototypeOf(document.createElement(s)).constructor:HTMLElement;customElements.define(n,class extends g{constructor(){super(),i.add(this);const t=a?this.attachShadow({mode:a,serializable:m}):this,n=new Proxy(new e,{get:(e,n)=>n===l?t:n in e?e[n]:this[n]});Object.defineProperties(this,{$host:{value:this},$shadow:{value:this.shadowRoot},$data:{value:this.dataset},$state:{value:new Proxy(n,{get:(t,e)=>{if("closed"!==a)return t[e]},set:(t,e,n)=>{if("closed"===a)throw new Error("cannot change the state of a closed component");return t[e]=n,!0}})},[c]:{value:t},[d]:{value:n},[h]:{value:(new DOMParser).parseFromString("","text/html").body},[p]:{value:t===this}})}async connectedCallback(){"function"==typeof e.startConnect&&await e.startConnect.call(this[d]),this[c].innerHTML=e.template.call(this[d])||"","function"==typeof e.connected&&e.connected.call(this[d]),setTimeout((()=>{i.delete(this),0===i.size&&r.dispatchEvent(new CustomEvent("load"))}),1)}disconnectedCallback(){"function"==typeof e.disconnected&&e.disconnected.call(this[d])}adoptedCallback(){"function"==typeof e.adopted&&e.adopted.call(this[d])}attributeChangedCallback(t,n,a){"function"==typeof e.changed&&null!==n&&e.changed.call(this[d],t,n,a)}static get observedAttributes(){if(Array.isArray(e.attributes))return e.attributes}[u](){const t=performance.now();if("function"==typeof e.template){this[h].innerHTML=e.template.call(this[d])||"";const t=this[c].childNodes,a=this[h].childNodes;for(var n=0;n<t.length||n<a.length;n++)updateDOM(this[c],t[n],a[n],n)||n--;this[h].innerHTML=""}return performance.now()-t+" ms"}get $event(){return _ctn.event}get $router(){return _ctn.router}$(t){return(this[l]||this.$shadow||this).querySelector(t)}$$(t){return(this[l]||this.$shadow||this).querySelectorAll(t)}$update(){if("closed"!==a||this[l])return this[u]()}$entities(){return _ctn.entities(...arguments)}$tag(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return _ctn.tag.call(this,...e)}},s?{extends:s}:null)}}function updateDOM(t,e,n){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(e){if(!n)return!t.removeChild(t.childNodes[a]);if(e.nodeName!==n.nodeName)t.replaceChild(n.cloneNode(!0),t.childNodes[a]);else if(e.nodeValue!==n.nodeValue)e.nodeValue=n.nodeValue;else if(e.attributes&&((e.attributes.length||n.attributes.length)&&function updateAttr(t,e){const n=t.attributes,a=e.attributes;new Set([...t.getAttributeNames(),...e.getAttributeNames()]).forEach((e=>{a[e]&&!n[e]?t.setAttribute(e,a[e].value):n[e]&&!a[e]?t.removeAttribute(e):n[e]&&a[e]&&n[e].value!==a[e].value&&(n[e].value=a[e].value)}))}(e,n),!e[p])){const o=e.childNodes,r=n.childNodes;for(var s=0;s<o.length||s<r.length;s++)updateDOM(t.childNodes[a],o[s],r[s],s)||s--}}else t.append(n.cloneNode(!0));return!0}function routerCallback(t,e,n){const a=t[m].regs,s=e.replace(location.origin,"");for(const[o,r]of a){const a=o.exec(s);if(a){const s=new CustomEvent(r,{detail:n});s.url=new URL(e),s.params=a.groups,s.search=s.url.searchParams,t.dispatchEvent(s)}}}function renderCallback(t,e,n,s){if(s&&("STYLE"===t.nodeName||"SCRIPT"===t.nodeName||"TEMPLATE"===t.nodeName||8===t.nodeType))return;let o;if("SLOT"!==t.nodeName||n)if(t[c]){for(var r of(o=a.createElement(t.nodeName),t.attributes))o.setAttribute(r.name,r.value);t=t[c]}else o=t.cloneNode(!1);else o=new DocumentFragment;const i=t.assignedNodes?t.assignedNodes({flatten:!1}):(t.content||t).childNodes;if(i)for(var l=0;l<i.length;l++)renderCallback(i[l],o.content||o,n,s);e.append(o)}_ctn.entities=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];return(n.length?[...s,...n]:s).reduce(((t,e)=>t.replace(...e)),t)},_ctn.tag=function(t){let e="";for(var n=arguments.length,a=new Array(n>1?n-1:0),s=1;s<n;s++)a[s-1]=arguments[s];for(var o=0;o<t.length;o++)if(e+=t.raw[o],o<a.length)if(Array.isArray(a[o]))e+=a[o].join("");else if("function"==typeof a[o]){const t=a[o].call(this);e+=Array.isArray(t)?t.join(""):t}else e+=a[o];return e},_ctn.event=function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(new.target)return new DocumentFragment;t.dispatchEvent(new CustomEvent(e,{detail:n}))},_ctn.router=function(t,a){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(new.target){const t={},n=new Map,a=new class extends DocumentFragment{addEventListener(){for(var t=arguments.length,a=new Array(t),s=0;s<t;s++)a[s]=arguments[s];n.set(new RegExp(`^/?${a[0].replace(e,((t,e)=>`(?<${e}>\\w+)`))}/?$`),a[0]),document.addEventListener.call(this,...a)}};return a[m]={idx:0,vals:t,regs:n},window.addEventListener("popstate",(e=>{routerCallback(a,location.href,t[e.state])})),a}if(!a||!a.startsWith(location.origin)||n.test(a))return;const o=t[m];history.pushState(o.idx,"",a),o.vals[o.idx++]=s,routerCallback(t,a,s)},_ctn.render=async function(){let{parent:t=document.children[0],slots:e=!1,clean:n=!0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};await new Promise((t=>r.addEventListener("load",t)));const a=document.createElement("template");return renderCallback(t,a.content,e,n),t===document.children[0]?`<!DOCTYPE html>\n${a.innerHTML}`:a.innerHTML};_ctn.entities,_ctn.event;const g=_ctn.render,f=_ctn.router;var w=_ctn;const v=new f,httpRequest=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"json";const a=new XMLHttpRequest;return a.open(e,t),a.responseType=n,a.send(),new Promise((t=>a.onload=()=>t(a.response)))};let b;b=class WHome{static mode="open";static async startConnect(){const t=await httpRequest("/db?page=home");this.title=t.title,this.message=t.message}static template(){return`\n        <h2>${this.title}</h2>\n        <p>${this.message}</p>\n      `}},b.template=function(){return String.raw`<h2>${this.title}</h2>
<p>${this.message}</p>

`};var y=b;let $;$=class WAbout{static mode="open";static async startConnect(){const t=await httpRequest("/db?page=about");this.title=t.title,this.message=t.message}static template(){return`\n        <h2>${this.title}</h2>\n        <p>${this.message}</p>\n      `}},$.template=function(){return String.raw`<h2>${this.title}</h2>
<p>${this.message}</p>

`};var C=$;let E;E=class WContacts{static mode="open";static async startConnect(){const t=await httpRequest("/db?page=contacts");this.title=t.title,this.message=t.message}static template(){return`\n        <h2>${this.title}</h2>\n        <p>${this.message}</p>\n      `}},E.template=function(){return String.raw`<h2>${this.title}</h2>
<p>${this.message}</p>

`};var L=E;window._$CtnRender_=g,w(class WHeader{static mode="open";static extends="header";message="Creaton";static template(){return`\n      <nav is="w-router"></nav>\n      <h1>${this.message} is <slot name="abbr"></slot></h1>\n      <img src="img/banner.jpg" alt="banner">\n\n      <style>\n        :host {\n          margin-bottom: 50px;\n        }\n        h1 {\n          color: ${this.$data.color};\n        }\n        img {\n          max-width: 100%;\n        }\n      </style>\n    `}},class WRouter{static mode="open";static extends="nav";static connected(){this.$host.addEventListener("click",(t=>{t.preventDefault(),this.$router(v,t.composedPath()[0].href)}))}static template(){return'\n      <a href="/">Home</a>\n      <a href="/about">About</a>\n      <a href="/contacts">Contacts</a>\n\n      <style>\n        a {\n          text-decoration: none; \n          padding-right: 3px;\n        }\n      </style>\n    '}},class WContent{static mode="open";static extends="main";page="";static connected(){v.addEventListener("/",(t=>{this.page="w-home",this.$update()})),v.addEventListener("/about",(t=>{this.page="w-about",this.$update()})),v.addEventListener("/contacts",(t=>{this.page="w-contacts",this.$update()})),this.$router(v,location.href)}static template(){if(this.page)return`<${this.page} />`}},y,C,L)}();