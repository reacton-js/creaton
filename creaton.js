'use strict'

!function() {
  // определить функцию для работы с пользовательскими событиями
  function customEvent (elem, ...args) {
    // если функция была вызвана как конструктор
    if (new.target) {
      return new DocumentFragment // вернуть новый элемент событий
    }
    
    // вызвать пользовательское событие для элемента
    (elem || this).dispatchEvent(new CustomEvent(...args))
  }

  // пустой объект для прокси примесей компонента
  const emptyObject = {}


  // определить функцию создания компонента
  function defineComponent(obj) {
    // определить переменные из свойств объекта компонента
    const { name, extends:extend, mode, data, attributes, changed, mixins, before, after, connected, disconnected, adopted } = obj

    // определить для компонента метод рендеринга
    const render = obj.render instanceof HTMLTemplateElement ? Function(`return \`${obj.render.innerHTML}\``) : obj.render

    // определить для компонента Суперэлемент
    const SUPERElement = extend ? Object.getPrototypeOf(document.createElement(extend)).constructor : HTMLElement

    customElements.define(name, class extends SUPERElement {
      constructor() {
        super()

        // определить специальные свойства компонента
        Object.defineProperties(this, {
          $root: { value: mode ? this.attachShadow({ mode }) : this },
          $host: { value: this },
          $mixins: { value: new Proxy(emptyObject, {
            get: (_, key) => mixins?.[key] ?? Creaton.mixins?.[key] ?? this.$data[key]
          })},
        })
      }

      // создаёт новую разметку для компонента
      async $render() {
        // если в объекте компонента была определена функция "before"
        if (typeof before === 'function') {
          await before.call(this.$data) // вызвать эту функцию
        }

        // если в объекте компонента была определена функция "render"
        if (typeof render === 'function') {
          // вывести значение этой функции в разметку компонента
          this.$root.innerHTML = await render.call(this.$data)
        }

        // если в объекте компонента была определена функция "after"
        if (typeof after === 'function') {
          await after.call(this.$data) // вызвать эту функцию
        }
      }

      // поиск элемента по заданному селектору
      $(sel) {
        return this.$root.querySelector(sel)
      }

      // поиск всех элементов по заданному селектору
      $$(sel) {
        return this.$root.querySelectorAll(sel)
      }

      // возвращает функцию создания пользовательских событий
      get $event() {
        return customEvent
      }

      // массив имён атрибутов для отслеживания их изменений
      static get observedAttributes() {
        // если в объекте компонента был определён массив "attributes"
        if (Array.isArray(attributes)) {
          return attributes // вернуть этот массив
        }
      }

      // вызывается при изменении одного из отслеживаемых атрибутов
      async attributeChangedCallback(...args) {
        // если в объекте компонента была определена функция "changed"
        if (typeof changed === 'function') {
          await changed.apply(this.$data, args) // вызвать эту функцию
        }
      }

      // вызывается при добавлении компонента в документ
      async connectedCallback() {
        // определить объект данных компонента
        Object.defineProperty(this, '$data', {
          value: new Proxy(typeof data === 'function' ? await data.call(this) : {}, {
            get: (target, key, receiver) => {
              // вернуть значение свойства объекта данных или самого компонента
              return target.hasOwnProperty(key) ? Reflect.get(target, key, receiver) : this[key]
            }
          })
        })

        // создать новую разметку для компонента
        await this.$render()

        // если в объекте компонента была определена функция "connected"
        if (typeof connected === 'function') {
          await connected.call(this.$data) // вызвать эту функцию
        }
      }

      // вызывается при удалении компонента из документа
      async disconnectedCallback() {
        // если в объекте компонента была определена функция "disconnected"
        if (typeof disconnected === 'function') {
          await disconnected.call(this.$data) // вызвать эту функцию
        }
      }

      // вызывается при перемещении компонента в новый документ
      async adoptedCallback() {
        // если в объекте компонента была определена функция "adopted"
        if (typeof adopted === 'function') {
          await adopted.call(this.$data) // вызвать эту функцию
        }
      }

      // определить для компонента расширяемый элемент
    }, extend ? { extends: extend } : null)
  }


  // определить главную функцию плагина
  const Creaton = (...args) => args.forEach(defineComponent)

  // определить для главной функции метод "event"
  Creaton.event = customEvent

  // определить глобальную переменную главной функции
  window.Creaton = Creaton
}()