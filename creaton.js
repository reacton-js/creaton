/*!
 * Creaton.js v2.1.2
 * (c) 2022-2023 | github.com/reacton-js
 * Released under the MIT License.
 */
'use strict'

!function() {
  // определить шаблон поиска заглавных букв
  const regUpper = /[A-Z]/g

  // определить хранилище для служебных свойств компонентов
  const SERVICE = new WeakMap()

  // определить документ для создания независимых элементов компонентов
  const HTMLDocument = document.implementation.createHTMLDocument()

  // определить ловушки для прокси атрибутов компонентов
  const attrHooks = {
    get(target, key) {
      return target[key] ? target[key].value : undefined
    },
    set(target, key, val) {
      target[key].value = val
      return true
    }
  }


  // определить функцию создания компонентов
  function createComponent(INITClass) {
    // определить уровень инкапсуляции компонента
    const mode = (INITClass.mode || '').toLowerCase()

    // определить для компонента название расширяемого элемента
    const extend = (INITClass.extends || '').toLowerCase()

    // определить имя компонента в шашлычной нотации
    const name = INITClass.name.replace(regUpper, (str, pos) => (pos > 0 ? '-' : '') + str.toLowerCase())

    // определить для компонента класс расширяемого элемента
    const SUPERElement = extend ? Object.getPrototypeOf(document.createElement(extend)).constructor : HTMLElement

    // выполнить определение нового компонента
    customElements.define(name, class extends SUPERElement {
      constructor() {
        super()

        // определить ссылку на теневой DOM или корневой элемент компонента
        const root = mode ? this.attachShadow({ mode }) : this

        let template // шаблон компонента

        // если элемент не содержит теневой DOM
        if (root === this) {
          // определить независимый элемент компонента из стороннего документа
          template = HTMLDocument.createElement(this.nodeName)
        }
        // иначе, определить обычный элемент для хранения содержимого
        else {
          template = document.createElement('template')
        }

        // определить объект с методом доступа к состоянию или свойству компонента
        const state = new Proxy(new INITClass(), {
          // вернуть значение свойства объекта состояния или компонента
          get: (target, key, receiver) => key in target ? Reflect.get(target, key, receiver) : this[key]
        })

        // определить прокси для атрибутов компонента
        const attributes = new Proxy(this.attributes, attrHooks)

        // определить специальные свойства для элемента компонента
        Object.defineProperties(this, {
          // возвращает объект состояния компонента
          $state: { value: state },
          // возвращает прокси атрибутов компонента
          $props: { value: attributes },
          // возвращает Истину, если компонент не содержит теневой DOM
          $light: { value: root === this || false },
          // возвращает теневой DOM компонента
          $shadow: { value: this.shadowRoot },
          // возвращает хозяина теневого DOM компонента
          $host: { value: !mode || mode === 'closed' ? undefined : this },
          // возвращает функцию создания пользовательских событий
          $event: { value: customEvent },
          // возвращает функцию создания маршрутных событий
          $route: { value: routeEvent },
        })
        
        // добавить в хранилище служебные свойства компонента
        SERVICE.set(this.$state, { root , template })
      }


      // обновляет состояние и выводит HTML-содержимое компонента
      async $update(obj) {
        const start = Date.now() // определить начало обновления

        // получить корневой элемент и шаблон компонента
        const { root, template } = SERVICE.get(this.$state)

        // если был передан объект с новыми значениями
        if (obj) {
          // копировать новые значения состояния в его объект
          Object.assign(this.$state, obj)
        }

        // если была определена статическая функция "before"
        await (!INITClass.before || INITClass.before.call(this.$state))

        // добавить сгенерированное HTML-содержимое в шаблон
        template.innerHTML = await (INITClass.render ? INITClass.render.call(this.$state) : '')

        // обновить HTML-содержимое компонента в соответствии с шаблоном
        new updateDOM(root, template.content || template, root)

        // очистить HTML-содержимое шаблона
        template.innerHTML = ''

        // если была определена статическая функция "after"
        await (!INITClass.after || INITClass.after.call(this.$state))

        return Date.now() - start + ' ms' // вернуть время обновления
      }


      // вызывается при добавлении компонента в документ
      async connectedCallback() {
        // обновить состояние компонента
        await this.$update()

        // если была определена статическая функция "connected"
        await (!INITClass.connected || INITClass.connected.call(this.$state))
      }

      // вызывается при удалении компонента из документа
      async disconnectedCallback() {
        // если была определена статическая функция "disconnected"
        await (!INITClass.disconnected || INITClass.disconnected.call(this.$state))
      }

      // вызывается при перемещении компонента в новый документ
      async adoptedCallback() {
        // если была определена статическая функция "adopted"
        await (!INITClass.adopted || INITClass.adopted.call(this.$state))
      }

      // вызывается при изменении одного из отслеживаемых атрибутов
      async attributeChangedCallback(...args) {
        // если была определена статическая функция "changed"
        await (!INITClass.changed || INITClass.changed.apply(this.$state, args))
      }

      // массив имён атрибутов для отслеживания их изменений
      static get observedAttributes() {
        // если был определён статический массив "attributes"
        if (Array.isArray(INITClass.attributes)) {
          return INITClass.attributes
        }
      }
      
      
      // поиск элемента по заданному селектору
      $(selector) {
        // выполнить поиск элемента в DOM компонента в зависимости от контекста вызова метода
        return (this === this.$state || mode !== 'closed' ? SERVICE.get(this.$state).root : this.$host).querySelector(selector)
      }

      // поиск всех элементов по заданному селектору
      $$(selector) {
        // выполнить поиск элементов в DOM компонента в зависимости от контекста вызова метода
        return (this === this.$state || mode !== 'closed' ? SERVICE.get(this.$state).root : this.$host).querySelectorAll(selector)
      }

      // определить для компонента расширяемый элемент
    }, extend ? { extends: extend } : null)
  }


  // обновляет HTML-содержимое компонента
  function updateDOM($parent, newNode, oldNode, index = 0) {
    // если нет старой ноды
    if (!oldNode) {
      $parent.append(newNode.cloneNode(true)) // добавить ноду
    }
    // если нет новой ноды
    else if (!newNode) {
      return !$parent.removeChild($parent.childNodes[index]) // удалить ноду и вернуть Ложь
    }
    // если типы или названия нод не совпадают
    else if (newNode.nodeType !== oldNode.nodeType || newNode.nodeName !== oldNode.nodeName) {
      $parent.replaceChild(newNode.cloneNode(true), $parent.childNodes[index]) // заменить ноду
    }
    // если значения нод не совпадают
    else if (newNode.nodeValue !== oldNode.nodeValue) {
      oldNode.nodeValue = newNode.nodeValue // заменить значение
    }
    // если у ноды имеются дочерние элементы
    else if (newNode.childNodes.length) {
      // если функция запускается не в режиме конструктора
      if (!new.target) {
        // если у ноды имеются атрибуты
        if (newNode.attributes) {
          updateAttr(newNode.attributes, oldNode) // обновить атрибуты
        }

        // если старая нода компонента не содержит теневой DOM
        if (oldNode.$light) {
          return true // вернуть Истину
        }
      }

      // перебрать дочерние узлы новой и старой ноды
      for (let i = 0; i < newNode.childNodes.length || i < oldNode.childNodes.length; i++) {
        updateDOM(new.target ? $parent : $parent.childNodes[index], newNode.childNodes[i], oldNode.childNodes[i], i) || i--
      }
    }
    
    return true // вернуть Истину
  }


  // обновляет атрибуты элементов компонента
  function updateAttr(newAttrs, oldNode, oldAttrs = oldNode.attributes) {
    // перебрать дочерние атрибуты новой и старой ноды
    for (let i = 0; i < newAttrs.length || i < oldAttrs.length; i++) {
      // если нет старого атрибута
      if (newAttrs[i] && !oldAttrs[newAttrs[i].name]) {
        oldNode.setAttribute(newAttrs[i].name, newAttrs[i].value), i-- // добавить атрибут
      }
      // иначе, если нет нового атрибута
      else if (oldAttrs[i] && !newAttrs[oldAttrs[i].name]) {
        oldNode.removeAttribute(oldAttrs[i].name), i-- // удалить атрибут
      }
      // иначе, если значения атрибутов не совпадают
      else if (oldAttrs[newAttrs[i].name].value !== newAttrs[i].value) {
        oldAttrs[i].value = newAttrs[i].value // присвоить значение
      }
    }
  }


  // определить функцию для работы с пользовательскими событиями
  function customEvent (elem, ...args) {
    // если функция была вызвана как конструктор
    if (new.target) {
      // вернуть новый элемент пользовательских событий
      return new DocumentFragment
    }
    
    // вызвать пользовательское событие для элемента
    elem.dispatchEvent(new CustomEvent(...args))
  }


  // определить шаблон поиска параметров
  const regParams = /:(\w+)/g

  // определить множество для хранения элементов событий
  const setElems = new WeakSet()

  // определить функцию для работы с маршрутными событиями
  function routeEvent (elem, href, props = null) {
    // если функция была вызвана как конструктор
    if (new.target) {
      // определить объект для регулярных выражений маршрутных событий
      const eventRegs = {}
      
      // вернуть новый элемент маршрутных событий
      return new (class extends DocumentFragment {
        addEventListener(...args) {
          // добавить в объект регулярное выражение для маршрутного события
          eventRegs[args[0]] = new RegExp(`^${args[0].replace(regParams, (_, fix) => `(?<${fix}>\\w+)`)}/?$`)

          // добавить обработчик для элемента маршрутных событий
          document.addEventListener.call(this, ...args)
        }
        getEventRegs() {
          return eventRegs // вернуть объект
        }
      })
    }

    // если во множестве нет элемента маршрутных событий
    if (!setElems.has(elem)) {
      // добавить элемент события во множество
      setElems.add(elem)

      // добавить элементу Window обработчик события "popstate"
      window.addEventListener('popstate', event => {
        // отправить маршрутное событие для элемента
        dispRoute(elem, location.href.replace(location.origin, ''), event.state)
      })
    }

    // если маршрут не передан, то выйти из функции
    if (!href) return

    // определить маршрут без значения "origin"
    const path = href.replace(location.origin, '')

    // добавить в историю браузера текущий маршрут
    history.pushState(props, '', path)

    // отправить маршрутное событие для элемента
    dispRoute(elem, path, props)
  }


  // определить функцию для вызова маршрутных событий
  function dispRoute (elem, path, props) {
    // получить объект регулярных выражений маршрутных событий
    const eventRegs = elem.getEventRegs()

    // перебрать регулярные выражения маршрутных событий
    for (const key in eventRegs) {
      // определить результат проверки совпадения пути с регулярным выражением
      const obj = eventRegs[key].exec(path)

      // если имеется совпадение
      if (obj) {
        // определить новое пользовательское событие
        const event = new CustomEvent(key)

        // добавить событию свойство "url" из класса URL
        event.url = new URL(location.href)

        // добавить событию свойство содержащее параметры
        event.params = obj.groups

        // отправить маршрутное событие для элемента
        elem.dispatchEvent(event, props)
      }
    }
  }


  // определить главную функцию в глобальной переменной
  window.Creaton = (...args) => args.forEach(arg => typeof arg !== 'function' || createComponent(arg))

  // определить для главной функции метод "event"
  window.Creaton.event = customEvent

  // определить для главной функции метод "route"
  window.Creaton.route = routeEvent
}();