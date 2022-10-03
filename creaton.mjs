export function event(...args) {
  (this || document).dispatchEvent(new CustomEvent(...args))
}

export default (...args) => Promise.all(args.map(config => new Promise(ready => {
  const { name, extends:extend, mode, data, attributes, changed, before, after, connected, disconnected, adopted } = config,
    render = config.render instanceof HTMLTemplateElement ? Function(`return\`${config.render.innerHTML}\``) : config.render,
      SUPERElement = extend ? Object.getPrototypeOf(document.createElement(extend)).constructor : HTMLElement

  customElements.define(name, class extends SUPERElement {
    constructor() {
      super()
      Object.defineProperties(this, {
        $root: { value: mode ? this.attachShadow({ mode }) : this },
        $host: { value: this }
      })
    }

    async $render() {
      const time = Date.now()
      if (typeof before === 'function') await before.call(this)
      if (typeof render === 'function') {
        this.$root.innerHTML = await render.call(this.$data || this)
      }
      if (typeof after === 'function') await after.call(this)
      return Date.now() - time
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
      ready(this)
    }

    async disconnectedCallback() {
      if (typeof disconnected === 'function') await disconnected.call(this)
    }

    async adoptedCallback() {
      if (typeof adopted === 'function') await adopted.call(this)
    }
  }, extend ? { extends: extend } : null)
})))