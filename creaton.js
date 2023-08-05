/*!
 * Creaton.js v2.6.0
 * (c) 2022-2023 | github.com/reacton-js
 * Released under the MIT License.
 */
'use strict'

!function () {
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

  // определить символ для получения элемента компонентов
  const getThis = Symbol()

  // определить множество для хранения определяемых компонентов
  const setDefs = new Set()

  // определить элемент события готовности компонентов
  const okEvent = new customEvent()

  // определить событие инициализации компонента
  const initEvent = new CustomEvent('init', { bubbles: true, composed: true })

  // определить дескриптор для свойства "detail" с возможностью записи 
  Object.defineProperty(initEvent, 'detail', { writable: true })


  // определить функцию создания компонентов
  function createComponent (INITClass) {
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

        // добавить определяемый компонент во множество
        setDefs.add(this)

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
          get: (target, key, receiver) => {
            if (key === getThis) return this // вернуть элемент компонента
            // или значение запрашиваемого свойства
            return key in target ? Reflect.get(target, key, receiver) : this[key]
          }
        })

        // определить прокси для атрибутов компонента
        const attributes = new Proxy(this.attributes, attrHooks)

        // определить специальные свойства для элемента компонента
        Object.defineProperties(this, {
          // возвращает объект состояния компонента
          $state: { get() { if (mode !== 'closed') return state }},
          // возвращает прокси атрибутов компонента
          $props: { get() { if (mode !== 'closed') return attributes }},
          // возвращает хозяина теневого DOM компонента
          $host: { get() { if (mode !== 'closed') return root.host }},
          // возвращает Истину, если компонент не содержит теневой DOM
          $light: { value: root === this || false },
          // возвращает теневой DOM компонента
          $shadow: { value: this.shadowRoot },
          // возвращает функцию создания пользовательских событий
          $event: { value: customEvent },
          // возвращает функцию создания маршрутных событий
          $route: { value: routeEvent },
        })
        
        // добавить в хранилище служебные свойства компонента
        SERVICE.set(this, { root, template, state })

        // добавить компоненту обработчик события инициализации
        this.addEventListener('init', event => {
          // удалить передаваемый компонент из множества
          setDefs.delete(event.detail)

          // если множество определяемых компонентов пусто
          if (setDefs.size === 0) {
            // остановить всплытие события инициализации
            event.stopPropagation()
            
            // вызвать событие готовности компонентов
            customEvent(okEvent, 'ok')
          }
        })
      }

      
      // вызывается при добавлении компонента в документ
      async connectedCallback() {
        // обновить состояние компонента
        await updateState.call(this, undefined, INITClass)

        // если была определена статическая функция "connected"
        await (!INITClass.connected || INITClass.connected.call(SERVICE.get(this).state))

        // перейти к следующей итерации цикла событий
        setTimeout(() => {
          // определить передаваемый во множество компонент
          initEvent.detail = this
          
          // вызвать обработчик события инициализации компонента
          this.dispatchEvent(initEvent)
        }, 0)
      }

      // вызывается при удалении компонента из документа
      async disconnectedCallback() {
        // если была определена статическая функция "disconnected"
        await (!INITClass.disconnected || INITClass.disconnected.call(SERVICE.get(this).state))
      }

      // вызывается при перемещении компонента в новый документ
      async adoptedCallback() {
        // если была определена статическая функция "adopted"
        await (!INITClass.adopted || INITClass.adopted.call(SERVICE.get(this).state))
      }

      // вызывается при изменении одного из отслеживаемых атрибутов
      async attributeChangedCallback(...args) {
        // если была определена статическая функция "changed"
        await (!INITClass.changed || INITClass.changed.apply(SERVICE.get(this).state, args))
      }

      // массив имён атрибутов для отслеживания их изменений
      static get observedAttributes() {
        // если был определён статический массив "attributes"
        if (Array.isArray(INITClass.attributes)) {
          return INITClass.attributes
        }
      }
      

      // вызывает функцию обновления состояния и HTML-содержимого компонента
      async $update(obj) {
        if (mode !== 'closed' || this[getThis]) {
          return await updateState.call(this[getThis] || this, obj, INITClass)
        }
      }
      
      // поиск элемента по заданному селектору
      $(selector) {
        if (mode !== 'closed' || this[getThis]) {
          return SERVICE.get(this[getThis] || this).root.querySelector(selector)
        }
        return null
      }

      // поиск всех элементов по заданному селектору
      $$(selector) {
        if (mode !== 'closed' || this[getThis]) {
          return SERVICE.get(this[getThis] || this).root.querySelectorAll(selector)
        }
        return null
      }

      // теговая функция для обработки массивов в шаблонных строках
      $tag(str, ...vals) {
        let result = ''
        for (let i = 0; i < str.length; i++) {
          result += str[i]
          if (i < vals.length) {
            // если значение является массивом, то удалить запятые при выводе строки
            result += Array.isArray(vals[i]) ? vals[i].join('') : vals[i]
          }
        }
        return result
      }

      // определить для компонента расширяемый элемент
    }, extend ? { extends: extend } : null)
  }

  
  // обновляет состояние и выводит HTML-содержимое компонента
  async function updateState (obj, INITClass) {
    const start = Date.now() // определить начало обновления

    // получить корневой элемент, шаблон и объект состояния компонента
    const { root, template, state } = SERVICE.get(this)

    // если был передан объект с новыми значениями
    if (obj) {
      // копировать новые значения состояния в его объект
      Object.assign(state, obj)
    }

    // если была определена статическая функция "before"
    await (!INITClass.before || INITClass.before.call(state))

    // добавить сгенерированное HTML-содержимое в шаблон
    template.innerHTML = await (INITClass.render ? INITClass.render.call(state) : '')

    // обновить HTML-содержимое компонента в соответствии с шаблоном
    new updateDOM(root, template.content || template, root)

    // очистить HTML-содержимое шаблона
    template.innerHTML = ''

    // если была определена статическая функция "after"
    await (!INITClass.after || INITClass.after.call(state))

    return Date.now() - start + ' ms' // вернуть время обновления
  }


  // обновляет HTML-содержимое компонента
  function updateDOM ($parent, newNode, oldNode, index = 0) {
    // если нет старой ноды
    if (!oldNode) {
      $parent.append(newNode.cloneNode(true)) // добавить ноду
    }
    // иначе, если нет новой ноды
    else if (!newNode) {
      return !$parent.removeChild($parent.childNodes[index]) // удалить ноду и вернуть Ложь
    }
    // иначе, если типы или названия нод не совпадают
    else if (newNode.nodeType !== oldNode.nodeType || newNode.nodeName !== oldNode.nodeName) {
      $parent.replaceChild(newNode.cloneNode(true), $parent.childNodes[index]) // заменить ноду
    }
    // иначе, если значения нод не совпадают
    else if (newNode.nodeValue !== oldNode.nodeValue) {
      oldNode.nodeValue = newNode.nodeValue // заменить значение
    }
    // иначе,
    else {
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
  function updateAttr (newAttrs, oldNode, oldAttrs = oldNode.attributes) {
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
        // вызвать маршрутное событие для элемента
        callRoute(elem, location.href.replace(location.origin, ''), event.state)
      })
    }

    // если маршрут не передан, то выйти из функции
    if (!href) return

    // определить маршрут без значения "origin"
    const path = href.replace(location.origin, '')

    // добавить в историю браузера текущий маршрут
    history.pushState(props, '', path)

    // вызвать маршрутное событие для элемента
    callRoute(elem, path, props)
  }


  // определить функцию для вызова маршрутных событий
  function callRoute (elem, path, props) {
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

        // вызвать маршрутное событие для элемента
        elem.dispatchEvent(event, props)
      }
    }
  }


  // возвращает промис для рендеринга содержимого документа
  function ssr ({ node, slots, clean = true } = {}) {
    return new Promise(ready => okEvent.addEventListener('ok', () => {
      // определить хранилище для вывода отрендеренного содержимого
      const outNode = document.createElement('template')

      // установить датчик очистки от мусорного содержимого
      renderDOM.clean = clean

      // определить массив для хранения слотов
      renderDOM.slots = []
  
      // вызвать функцию рендеринга документа
      renderDOM(node || document.children[0], outNode.content)

      // если в отрендеренном содержимом слоты не нужны
      if (!slots) {
        // заменить слоты их дочерними узлами
        renderDOM.slots.forEach(slot => slot.replaceWith(...slot.childNodes))
      }
  
      // вернуть отрендеренное содержимое документа
      ready(node ? outNode.innerHTML : `<!DOCTYPE html>\n${outNode.innerHTML}`)
    }))
  }


  // выполняет рендеринг содержимого документа
  function renderDOM (inNode, outNode, index = 0) {
    // если установлен датчик очистки и нода является мусорным узлом
    if (renderDOM.clean && (inNode.nodeName === 'STYLE' || inNode.nodeName === 'SCRIPT'
      || inNode.nodeName === 'TEMPLATE' || inNode.nodeType === 8)) {
        return false // вернуть Ложь
    }

    /* определить переменные для хранения новой ноды
      и дочерних узлов входной ноды */
    let newNode, inChildNodes

    // если входная нода является компонентом
    if (inNode.$state) {
      // создать пустой элемент компонента
      newNode = HTMLDocument.createElement(inNode.nodeName)

      // добавить элементу атрибуты входной ноды
      for (const attr of inNode.attributes) {
        newNode.setAttribute(attr.name, attr.value)
      }
    }
    // иначе, клонировать входную ноду без содержимого
    else {
      newNode = inNode.cloneNode(false)
    }

    // добавить новую ноду в отрендеренное содержимое
    outNode.append(newNode)
    
    // если новая нода является слотом
    if (newNode.nodeName === 'SLOT') {
      // вернуть последовательность узлов назначенных входному слоту
      inChildNodes = inNode.assignedNodes({ flatten: true })
      // добавить новую ноду в массив
      renderDOM.slots.push(newNode)
    }
    // иначе, вернуть коллекцию дочерних узлов входной ноды
    else {
      inChildNodes = (inNode.$shadow || inNode).childNodes
    }

    // вызвать функцию рендеринга для дочерних узлов входной и выходной ноды
    for (let i = 0, y = 0; i < inChildNodes.length; i++, y++) {
      renderDOM(inChildNodes[i], outNode.childNodes[index], y) || y--
    }

    return true // вернуть Истину
  }


  // определить главную функцию в глобальной переменной
  window.Creaton = (...args) => args.forEach(arg => typeof arg !== 'function' || createComponent(arg))

  // определить для главной функции метод "event"
  window.Creaton.event = customEvent

  // определить для главной функции метод "route"
  window.Creaton.route = routeEvent

  // определить для главной функции метод "ssr"
  window.Creaton.ssr = ssr
}();