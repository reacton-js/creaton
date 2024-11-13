/**
* Creaton v3.0.7
* (c) 2022-2024 | github.com/reacton-js
* Released under the MIT License.
**/
const regUpName = /[A-Z]/g;
const regParams = /:(\w+)/g;
const regFile = /\.\w+$/;
const SERVICE = new WeakMap();
const newDocument = new DOMParser().parseFromString('', 'text/html');
const regEntities = [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/"/g, '&quot;'], [/'/g, '&#39;']];
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const getNameKebab = (char, pos) => (pos > 0 ? '-' : '') + char;
const loadEvent = new DocumentFragment();
const rootStorage = new Set();
const propRouter = Symbol();
const getRoot = Symbol();
const hasRoot = Symbol();
const isLight = Symbol();
async function _ctn(...args) {
  for (let arg of args) {
    if (arg instanceof HTMLTemplateElement) {
      const content = arg.content;
      const scripts = [...content.querySelectorAll('script')].map(script => content.removeChild(script).innerHTML).join('');
      const _class = await (scripts ? new AsyncFunction(scripts)() : null);
      if (typeof _class !== 'function') {
        console.error(`Error: return value "${_class}" is not a class`);
        continue;
      }
      _class.template = Function(`return this.$tag\`${arg.innerHTML}\``);
      arg = _class;
    } else if (typeof arg !== 'function') {
      console.error(`Error: argument "${arg}" is not a class or <template> element`);
      continue;
    }
    const name = arg.name.replace(regUpName, getNameKebab).toLocaleLowerCase();
    const mode = arg.mode ? arg.mode.toLocaleLowerCase() : arg.mode;
    const extend = arg.extends ? arg.extends.toLocaleLowerCase() : arg.extends;
    const serializable = arg.hasOwnProperty('serializable') ? arg.serializable : false;
    const SUPERElement = extend ? Object.getPrototypeOf(document.createElement(extend)).constructor : HTMLElement;
    customElements.define(name, class extends SUPERElement {
      constructor() {
        super();
        rootStorage.add(this);
        const root = mode ? this.attachShadow({
          mode,
          serializable
        }) : this;
        const temp = new DOMParser().parseFromString('', 'text/html').body;
        const state = new Proxy(new arg(), {
          get: (target, prop) => {
            if (prop === getRoot) {
              return root;
            } else if (prop in target) {
              return target[prop];
            }
            return this[prop];
          }
        });
        Object.defineProperties(this, {
          $host: {
            value: this
          },
          $shadow: {
            value: this.shadowRoot
          },
          $data: {
            value: this.dataset
          },
          $state: {
            value: new Proxy(state, {
              get: (target, prop) => {
                if (mode !== 'closed') {
                  return target[prop];
                }
              },
              set: (target, prop, value) => {
                if (mode === 'closed') {
                  throw new Error('cannot change the state of a closed component');
                }
                target[prop] = value;
                return true;
              }
            })
          },
          [isLight]: {
            value: root === this
          }
        });
        SERVICE.set(this, {
          root,
          temp,
          state
        });
      }
      async connectedCallback() {
        const {
          root,
          state
        } = SERVICE.get(this);
        if (typeof arg.startConnect === 'function') {
          await arg.startConnect.call(state);
        }
        if (typeof arg.template === 'function') {
          root.innerHTML = arg.template.call(state) || '';
        }
        if (typeof arg.connected === 'function') {
          arg.connected.call(state);
        }
        setTimeout(() => {
          rootStorage.delete(this);
          if (rootStorage.size === 0) {
            loadEvent.dispatchEvent(new CustomEvent('load'));
          }
        }, 1);
      }
      disconnectedCallback() {
        if (typeof arg.disconnected === 'function') {
          arg.disconnected.call(SERVICE.get(this).state);
        }
      }
      adoptedCallback() {
        if (typeof arg.adopted === 'function') {
          arg.adopted.call(SERVICE.get(this).state);
        }
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (typeof arg.changed === 'function') {
          if (oldValue !== null) {
            arg.changed.call(SERVICE.get(this).state, name, oldValue, newValue);
          }
        }
      }
      static get observedAttributes() {
        if (Array.isArray(arg.attributes)) {
          return arg.attributes;
        }
      }
      get $event() {
        return _ctn.event;
      }
      get $router() {
        return _ctn.router;
      }
      get [hasRoot]() {
        return true;
      }
      $(sel) {
        return (this[getRoot] || this.$shadow || this).querySelector(sel);
      }
      $$(sel) {
        return (this[getRoot] || this.$shadow || this).querySelectorAll(sel);
      }
      $update() {
        if (mode !== 'closed' || this[getRoot]) {
          return getUpdate.call(this, arg);
        }
      }
      $tag(...args) {
        return _ctn.tag.call(this, ...args);
      }
      $entities(...args) {
        return _ctn.entities(...args);
      }
    }, extend ? {
      extends: extend
    } : null);
  }
}
function getUpdate(arg) {
  const start = performance.now();
  if (typeof arg.template === 'function') {
    const {
      root,
      temp,
      state
    } = SERVICE.get(this.$host);
    temp.innerHTML = arg.template.call(state) || '';
    const oldChilds = root.childNodes,
      newChilds = temp.childNodes;
    for (var i = 0; i < oldChilds.length || i < newChilds.length; i++) {
      updateDOM(root, oldChilds[i], newChilds[i], i) || i--;
    }
    temp.innerHTML = '';
  }
  return performance.now() - start + ' ms';
}
function updateDOM($parent, oldNode, newNode, index = 0) {
  if (!oldNode) {
    $parent.append(newNode.cloneNode(true));
  } else if (!newNode) {
    return !$parent.removeChild($parent.childNodes[index]);
  } else if (oldNode.nodeName !== newNode.nodeName) {
    $parent.replaceChild(newNode.cloneNode(true), $parent.childNodes[index]);
  } else if (oldNode.nodeValue !== newNode.nodeValue) {
    oldNode.nodeValue = newNode.nodeValue;
  } else if (oldNode.attributes) {
    if (oldNode.attributes.length || newNode.attributes.length) {
      updateAttr(oldNode, newNode);
    }
    if (!oldNode[isLight]) {
      const oldChilds = oldNode.childNodes,
        newChilds = newNode.childNodes;
      for (var i = 0; i < oldChilds.length || i < newChilds.length; i++) {
        updateDOM($parent.childNodes[index], oldChilds[i], newChilds[i], i) || i--;
      }
    }
  }
  return true;
}
function updateAttr(oldNode, newNode) {
  const oldAttrs = oldNode.attributes,
    newAttrs = newNode.attributes;
  new Set([...oldNode.getAttributeNames(), ...newNode.getAttributeNames()]).forEach(name => {
    if (newAttrs[name] && !oldAttrs[name]) {
      oldNode.setAttribute(name, newAttrs[name].value);
    } else if (oldAttrs[name] && !newAttrs[name]) {
      oldNode.removeAttribute(name);
    } else if (oldAttrs[name] && newAttrs[name] && oldAttrs[name].value !== newAttrs[name].value) {
      oldAttrs[name].value = newAttrs[name].value;
    }
  });
}
_ctn.tag = function (str, ...vals) {
  let result = '';
  for (var i = 0; i < str.length; i++) {
    result += str.raw[i];
    if (i < vals.length) {
      if (Array.isArray(vals[i])) {
        result += vals[i].join('');
      } else if (typeof vals[i] === 'function') {
        const val = vals[i].call(this);
        result += Array.isArray(val) ? val.join('') : val;
      } else {
        result += vals[i];
      }
    }
  }
  return result;
};
_ctn.entities = function (str, ...args) {
  return (args.length ? [...regEntities, ...args] : regEntities).reduce((prev, item) => prev.replace(...item), str);
};
_ctn.event = function (elem, name, detail = null) {
  if (new.target) {
    return new DocumentFragment();
  }
  elem.dispatchEvent(new CustomEvent(name, {
    detail
  }));
};
_ctn.router = function (elem, href, detail = null) {
  if (new.target) {
    const vals = {},
      regs = new Map();
    const elem = new class extends DocumentFragment {
      addEventListener(...args) {
        regs.set(new RegExp(`^/?${args[0].replace(regParams, (_, par) => `(?<${par}>\\w+)`)}/?$`), args[0]);
        document.addEventListener.call(this, ...args);
      }
    }();
    elem[propRouter] = {
      idx: 0,
      vals,
      regs
    };
    window.addEventListener('popstate', event => {
      routerCallback(elem, location.href, vals[event.state]);
    });
    return elem;
  }
  if (!href || !href.startsWith(location.origin) || regFile.test(href)) {
    return;
  }
  const props = elem[propRouter];
  history.pushState(props.idx, '', href);
  props.vals[props.idx++] = detail;
  routerCallback(elem, href, detail);
};
function routerCallback(elem, href, detail) {
  const regs = elem[propRouter].regs;
  const path = href.replace(location.origin, '');
  for (const [reg, name] of regs) {
    const result = reg.exec(path);
    if (result) {
      const event = new CustomEvent(name, {
        detail
      });
      event.url = new URL(href);
      event.params = result.groups;
      event.search = event.url.searchParams;
      elem.dispatchEvent(event);
    }
  }
}
_ctn.render = async function ({
  parent = document.children[0],
  slots = false,
  clean = true
} = {}) {
  await new Promise(ok => loadEvent.addEventListener('load', ok));
  const template = document.createElement('template');
  renderCallback(parent, template.content, slots, clean);
  return parent === document.children[0] ? `<!DOCTYPE html>\n${template.innerHTML}` : template.innerHTML;
};
function renderCallback(inNode, outNode, slots, clean) {
  if (clean && (inNode.nodeName === 'STYLE' || inNode.nodeName === 'SCRIPT' || inNode.nodeName === 'TEMPLATE' || inNode.nodeType === 8)) return;
  let cloneNode;
  if (inNode.nodeName === 'SLOT' && !slots) {
    cloneNode = new DocumentFragment();
  } else if (inNode[hasRoot]) {
    cloneNode = newDocument.createElement(inNode.nodeName);
    for (var attr of inNode.attributes) {
      cloneNode.setAttribute(attr.name, attr.value);
    }
    if (!inNode[isLight]) {
      inNode = SERVICE.get(inNode).root;
    }
  } else {
    cloneNode = inNode.cloneNode(false);
  }
  const childs = inNode.assignedNodes ? inNode.assignedNodes({
    flatten: false
  }) : (inNode.content || inNode).childNodes;
  if (childs) {
    for (var i = 0; i < childs.length; i++) {
      renderCallback(childs[i], cloneNode.content || cloneNode, slots, clean);
    }
  }
  outNode.append(cloneNode);
}
export default _ctn;
export const Tag = _ctn.tag;
export const Event = _ctn.event;
export const Router = _ctn.router;
export const Render = _ctn.render;
export const Entities = _ctn.entities;