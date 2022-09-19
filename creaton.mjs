export function event(...args) {
  (this || document).dispatchEvent(new CustomEvent(...args))
}

class Methods extends HTMLElement {
  constructor() {
    super()
  }
  $(selector) {
    return this.$root.querySelector(selector)
  }
  $$(selector) {
    return this.$root.querySelectorAll(selector)
  }
  $event(...args) {
    event.apply(this, args)
  }
}

export default (...args) => Promise.all(args.map(object => new Promise(ready => {
  const { name, extends:extend, mode = 'open', data, render,
    attributes, changed, before, after, connected, disconnected, adopted } = object

  customElements.define(name, class extends Methods {
    constructor() {
      super()
      Object.defineProperties(this, {
        $root: { value: this.attachShadow({ mode }) },
        $host: { value: this }
      })
    }

    async $render() {
      const time = Date.now()
      if (typeof before === 'function') await before.call(this)
      if (typeof render === 'function') this.$root.innerHTML = await render.call(this.$data)
      if (typeof after === 'function') await after.call(this)
      return Date.now() - time
    }

    static get observedAttributes() {
      if (Array.isArray(attributes)) return attributes
    }

    async attributeChangedCallback(...args) {
      if (typeof changed === 'function') await changed.apply(this, args)
    }

    async connectedCallback() {
      if (typeof data === 'function') {
        Object.defineProperty(this, '$data', {
          value: new Proxy(await data.call(this), {
            get: (target, key, receiver) => {
              return Reflect.has(target, key) ? Reflect.get(target, key, receiver) : Reflect.get(this, key)
            }
          }
        )})
      }
      await this.$render()
      if (typeof connected === 'function') await connected.call(this)
      ready()
    }

    async disconnectedCallback() {
      if (typeof disconnected === 'function') await disconnected.call(this)
    }

    async adoptedCallback() {
      if (typeof adopted === 'function') await adopted.call(this)
    }
  }, extend ? { extends: extend } : null)
})))