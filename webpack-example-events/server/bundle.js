(()=>{var e={443:()=>{"use strict";!function(){const e=/[A-Z]/g,t=new WeakMap,n=document.implementation.createHTMLDocument(),r={get:(e,t)=>e.hasOwnProperty(t)?e[t].value:e[t],set:(e,t,n)=>(e[t].value=n,!0)},o=new Set,a=new customEvent,i=new CustomEvent("init-event",{bubbles:!0,composed:!0});async function updateState(e,n){const r=Date.now(),{root:o,template:a,state:i}=t.get(this);return e&&Object.assign(i,e),await(!n.before||n.before.call(i)),a.innerHTML=await(n.render?n.render.call(i):""),new updateDOM(o,a.content||a,o),a.innerHTML="",await(!n.after||n.after.call(i)),Date.now()-r+" ms"}function updateDOM(e,t,n,r=0){if(n){if(!t)return!e.removeChild(e.childNodes[r]);if(t.nodeType!==n.nodeType||t.nodeName!==n.nodeName)e.replaceChild(t.cloneNode(!0),e.childNodes[r]);else if(t.nodeValue!==n.nodeValue)n.nodeValue=t.nodeValue;else{if(!new.target&&(t.attributes&&function updateAttr(e,t,n=t.attributes){for(let r=0;r<e.length||r<n.length;r++)e[r]&&!n[e[r].name]?(t.setAttribute(e[r].name,e[r].value),r--):n[r]&&!e[n[r].name]?(t.removeAttribute(n[r].name),r--):n[e[r].name].value!==e[r].value&&(n[r].value=e[r].value)}(t.attributes,n),n.$light))return!0;for(let o=0;o<t.childNodes.length||o<n.childNodes.length;o++)updateDOM(new.target?e:e.childNodes[r],t.childNodes[o],n.childNodes[o],o)||o--}}else e.append(t.cloneNode(!0));return!0}function customEvent(e,...t){if(new.target)return new DocumentFragment;e.dispatchEvent(new CustomEvent(...t))}Object.defineProperty(i,"detail",{writable:!0});const s=/:(\w+)/g,c=new WeakSet;function routeEvent(e,t,n=null){if(new.target){const e={};return new class extends DocumentFragment{addEventListener(...t){e[t[0]]=new RegExp(`^${t[0].replace(s,((e,t)=>`(?<${t}>\\w+)`))}/?$`),document.addEventListener.call(this,...t)}getEventRegs(){return e}}}if(c.has(e)||(c.add(e),window.addEventListener("popstate",(t=>{callRoute(e,location.href.replace(location.origin,""),t.state)}))),!t)return;const r=t.replace(location.origin,"");history.pushState(n,"",r),callRoute(e,r,n)}function callRoute(e,t,n){const r=e.getEventRegs();for(const o in r){const a=r[o].exec(t);if(a){const t=new CustomEvent(o);t.url=new URL(location.href),t.params=a.groups,e.dispatchEvent(t,n)}}}function renderDOM(e,t,r=0){if(renderDOM.clean&&("STYLE"===e.nodeName||"SCRIPT"===e.nodeName||"TEMPLATE"===e.nodeName||8===e.nodeType))return!1;let o,a;if(e.$state){o=n.createElement(e.nodeName);for(const t of e.attributes)o.setAttribute(t.name,t.value)}else o=e.cloneNode(!1);t.append(o),"SLOT"===o.nodeName?(a=e.assignedNodes({flatten:!0}),renderDOM.slots.push(o)):a=(e.$shadow||e).childNodes;for(let e=0,n=0;e<a.length;e++,n++)renderDOM(a[e],t.childNodes[r],n)||n--;return!0}window.Creaton=(...s)=>s.forEach((s=>"function"!=typeof s||function createComponent(s){const c=(s.mode||"").toLowerCase(),l=(s.extends||"").toLowerCase(),u=s.name.replace(e,((e,t)=>(t>0?"-":"")+e.toLowerCase())),d=l?Object.getPrototypeOf(document.createElement(l)).constructor:HTMLElement;customElements.define(u,class extends d{constructor(){super(),o.add(this);const e=c?this.attachShadow({mode:c}):this;let i;i=e===this?n.createElement(this.nodeName):document.createElement("template");const l=new Proxy(this.attributes,r),u=e.host,update=async e=>await updateState.call(this,e,s),$=t=>e.querySelector(t),$$=t=>e.querySelectorAll(t),d=new s(l),p=new Proxy(d,{get:(e,t,n)=>{switch(t){case"$state":return p;case"$props":return l;case"$host":return u;case"$update":return update;case"$":return $;case"$$":return $$}return"symbol"==typeof t||t in e?Reflect.get(e,t,n):this[t]}});Object.defineProperties(this,{$state:{get(){if("closed"!==c)return p}},$props:{get(){if("closed"!==c)return l}},$host:{get(){if("closed"!==c)return u}},$update:{get(){if("closed"!==c)return update}},$:{get(){if("closed"!==c)return $}},$$:{get(){if("closed"!==c)return $$}},$light:{value:e===this||!1},$shadow:{value:this.shadowRoot},$event:{value:customEvent},$route:{value:routeEvent}}),t.set(this,{root:e,template:i,state:p}),this.addEventListener("init-event",(e=>{o.delete(e.detail),0===o.size&&(e.stopPropagation(),customEvent(a,"ok"))}))}async connectedCallback(){await updateState.call(this,void 0,s),await(!s.connected||s.connected.call(t.get(this).state)),setTimeout((()=>{i.detail=this,this.dispatchEvent(i)}),0)}async disconnectedCallback(){await(!s.disconnected||s.disconnected.call(t.get(this).state))}async adoptedCallback(){await(!s.adopted||s.adopted.call(t.get(this).state))}attributeChangedCallback(...e){setTimeout((()=>!s.changed||s.changed.apply(t.get(this).state,e)),0)}static get observedAttributes(){if(Array.isArray(s.attributes))return s.attributes}$entities(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}$tag(e,...t){let n="";for(let r=0;r<e.length;r++)n+=e[r],r<t.length&&(n+=Array.isArray(t[r])?t[r].join(""):t[r]);return n}},l?{extends:l}:null)}(s))),window.Creaton.event=customEvent,window.Creaton.route=routeEvent,window.Creaton.ssr=function ssr({node:e,slots:t,clean:n=!0}={}){return new Promise((r=>a.addEventListener("ok",(()=>{const o=document.createElement("template");renderDOM.clean=n,renderDOM.slots=[],renderDOM(e||document.children[0],o.content),t||renderDOM.slots.forEach((e=>e.replaceWith(...e.childNodes))),r(e?o.innerHTML:`<!DOCTYPE html>\n${o.innerHTML}`)}))))}}()},144:(e,t,n)=>{n(443)}},t={};function __webpack_require__(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,__webpack_require__),o.exports}(()=>{"use strict";__webpack_require__(144);function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _toPropertyKey(e){var t=function _toPrimitive(e,t){if("object"!==_typeof(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!==_typeof(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===_typeof(t)?t:String(t)}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_toPropertyKey(r.key),r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var e=new Creaton.event;Creaton(function(){function MyComponent(){_classCallCheck(this,MyComponent)}return _createClass(MyComponent,null,[{key:"render",value:function render(){return'\n      <button id="btn-reverse">Reverse array</button>\n      <button id="btn-new">New array</button>\n      <button id="btn-clear">Clear array</button>\n    '}},{key:"connected",value:function connected(){var t=this;this.$("#btn-reverse").addEventListener("click",(function(){t.$event(e,"reverse")})),this.$("#btn-new").addEventListener("click",(function(){t.$event(e,"new-colors",{detail:["blue","orange","purple","gold"]})})),this.$("#btn-clear").addEventListener("click",(function(){t.$event(e,"clear-colors")}))}}]),MyComponent}(),function(){function NewComponent(){_classCallCheck(this,NewComponent),function _defineProperty(e,t,n){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(this,"colors",["red","green","blue"])}return _createClass(NewComponent,null,[{key:"render",value:function render(){return"\n      <ul>\n        ".concat(this.colors.map((function(e){return"<li>".concat(e,"</li>")})).join(""),"\n      </ul>\n    ")}},{key:"connected",value:function connected(){var t=this;e.addEventListener("reverse",(function(){t.colors.reverse(),t.$update()})),e.addEventListener("new-colors",(function(e){t.colors=e.detail,t.$update()})),e.addEventListener("clear-colors",(function(e){t.colors.length=0,t.$update()}))}}]),NewComponent}())})()})();