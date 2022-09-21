![rigl](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[github](https://github.com/reacton-js/creaton) | [npmjs](https://www.npmjs.com/package/creaton-js) | [module](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.mjs)

<br>

Creaton - это модуль JavaScript для быстрого создания [Веб-компонентов](https://learn.javascript.ru/web-components). Модуль Creaton поддерживает все технологии, методы и свойства, предоставляемые стандартными Веб-компонентами. Поскольку Creaton является модулем JavaScript, перед его использованием необходимо установить любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server), с помощью команды:

```
npm install --global lite-server
```

Создайте рабочий каталог, например, с названием *app*. Добавьте в этот какталог файл [creaton.mjs](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.mjs) и файл *index.html* со следующим содержимым:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello></my-hello>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      data() {
        return {
          message: 'Creaton'
        }
      },
      render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
        `
      }
    }

    // передать компонент Hello в модуль Creaton
    creaton(Hello)
  </script>
</body>
</html>
```

Для запуска приложения перейдите из терминала в каталог *app*, или запустите терминал из этого каталога, и в терминале введите команду:

```
lite-server
```

После выполнения данной команды, откроется окно браузера по умолчанию с приветственным сообщением:

<h1>Привет, Creaton!</h1>

В примере выше, в самом начале содержимого файла *index.html*, монтируется компонент *&lt;my-hello&gt;*. Все имена компонентов должны содержать в себе дефис *-*, как показано ниже:

```html
<!-- монтировать компонент Hello в приложение -->
<my-hello></my-hello>

<!-- Ошибка! Имя компонента должно содержать дефис -->
<myhello></myhello>
```

После монтирования компонента следует тег *&lt;script&gt;* с типом "module", в котором происходит импортирование модуля Creaton, определение объекта компонента и передача этого объекта в импортированный модуль:

```html
<script type="module">
  // импортировать модуль Creaton
  import creaton from './creaton.mjs'

  // создать объект компонента Hello
  const Hello = {
    name: 'my-hello',
    data() {
      return {
        message: 'Creaton'
      }
    },
    render() {
      return `
        <h1>Привет, ${ this.message }!</h1>
      `
    }
  }

  // передать компонент Hello в модуль Creaton
  creaton(Hello)
</script>
```

Модуль Creaton может принимать любое количество создаваемых объектов компонентов, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello></my-hello>

  <!-- монтировать компонент Test в приложение -->
  <my-test></my-test>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      data() {
        return {
          message: 'Creaton'
        }
      },
      render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
        `
      }
    }

    // создать объект компонента Test
    const Test = {
      name: 'my-test',
      render() {
        return 'Компонент Test'
      }
    }

    // передать компоненты Hello и Test в модуль Creaton
    creaton(Hello, Test)
  </script>
</body>
</html>
```

Объекты компонентов можно определять во внешних модулях. В качестве примера, создайте в каталоге *app* файл *Hello.mjs* со следующим содержимым:

```js
// экспортировать объект компонента Hello
export default {
  name: 'my-hello',
  data() {
    return {
      message: 'Creaton'
    }
  },
  render() {
    return `
      <h1>Привет, ${ this.message }!</h1>
    `
  }
}
```

Теперь внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello></my-hello>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // импортировать компонент Hello
    import Hello from './Hello.mjs'

    // передать компонент Hello в модуль Creaton
    creaton(Hello)
  </script>
</body>
</html>
```

В примере выше, компонент был импортирован из внешнего файла *Hello.mjs*. Это становится особенно актуальным, при использовании таких сборщиков модулей JavaScript, как, например, сборщик модулей [webpack](https://webpack.js.org/). Во всём же остальном, внешние компоненты ничем не отличаются от локальных.

<blockquote>
  <a href="https://www.npmjs.com/package/lite-server">Lite-server</a> не поддерживает по умолчанию автоматическую перезагрузку браузера при изменении файлов с расширением <i>.mjs</i>, представляющих модули компонентов. Вместо этого, вы можете задавать файлам компонентов расширение <i>.js</i>, и указывать его при импорте модулей:

  ```js
  // импортировать компонент Hello с раcширением .js
  import Hello from './Hello.js'
  ```
</blockquote>

Структура объекта компонента включает в себя ряд обязательных свойств и методов, необходимых для определения компонента:

```js
export default {
  // название компонента
  name: 'my-hello',

  // данные компонента
  data() {
    return {
      message: 'Creaton'
    }
  },

  // представление компонента
  render() {
    return `
      <h1>Привет, ${ this.message }!</h1>
    `
  }
}
```

Свойство **name** содержит название компонента, которое в точности соответствует названию его тега монтирования.

Метод **data()** возвращает объект, который содержит пользовательские данные и методы компонента. В примере выше, метод возвращает объект содержащий одно единственное пользовательское свойство **message**.

Метод **render()** возвращает представление компонента в виде строки. На основе этого текстового содержимого, будет создано *HTML*-содержимое компонента. Данный метод выполняется в контексте объекта данных компонента, который возвращается методом **data()**, что позволяет обращаться к свойствам этого объекта данных в шаблонных строках, используя ключевое слово *this*, например:

```js
render() {
  return `
    <h1>Привет, ${ this.message }!</h1>
  `
}
```

Все перечисленные выше и рассмотренные далее методы могут быть асинхронными. Внесите изменения в файл модуля компонента:

```js
export default {
  name: 'my-hello',

  async data() {
    // задержка на одну секунду
    await new Promise(ready => setTimeout(ready, 1000))
    return {
      message: 'Creaton'
    }
  },

  async render() {
    // задержка на полторы секунды
    await new Promise(ready => setTimeout(ready, 1500))
    return `
      <h1>Привет, ${ this.message }!</h1>
    `
  }
}
```

Здесь используется искусственная задержка имитирующая, например, загрузку данных с сервера. Компонент отобразится на экране через две с половиной секунды.

Компонентов может быть множество и они могут содержать различные асинхронные методы. Импортированный модуль Creaton возвращает [промис](https://learn.javascript.ru/promise-basics), который разрешается после загрузки всех компонентов на страницу и выполнения в них всех асинхронных методов.

Например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello></my-hello>

  <!-- монтировать компонент Test в приложение -->
  <my-test></my-test>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      async data() {
        // задержка на одну секунду
        await new Promise(ready => setTimeout(ready, 1000))
        return {
          message: 'Creaton'
        }
      },
      render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
        `
      }
    }

    // создать объект компонента Test
    const Test = {
      name: 'my-test',
      async render() {
         // задержка на полторы секунды
        await new Promise(ready => setTimeout(ready, 1500))
        return 'Компонент Test'
      }
    }

    // передать компоненты Hello и Test в модуль Creaton
    creaton(Hello, Test)
      // вызывается при загрузке всех компонентов
      .then(() => console.log('Все компоненты загружены'))
  </script>
</body>
</html>
```

Результатом данного промиса является массив всех загруженных компонентов:

```js
// передать компоненты Hello и Test в модуль Creaton
creaton(Hello, Test)
  // возвращает массив всех загруженных компонентов
  .then(components => console.log(components))
```

Рассмотренные выше свойства и методы объекта компонента являются основными определяющими данный компонент. Все остальные свойства и методы представляются опциональными и могут указываться лишь при необходимости. Большая из них часть, являются сокращёнными аналогами [стандартных методов](https://learn.javascript.ru/custom-elements) компонента:

```js
export default {
  ...

  // модифицирует компонент для встраивания в стандартный HTML-элемент
  extends: 'имя стандартного HTML-элемента',

  // определяет уровень инкапсуляции Теневого DOM компонента  
  mode: 'open/closed',

  // сокращённый аналог стандартного метода connectedCallback
  connected() {
    console.log('вызывается при добавлении компонента в документ')
  },

  // сокращённый аналог стандартного метода disconnectedCallback
  disconnected() {
    console.log('вызывается при удалении компонента из документа')
  },

  // сокращённый аналог стандартного метода adoptedCallback
  adopted() {
    console.log('вызывается при перемещении компонента в новый документ')
  },

  // сокращённый аналог статического геттера observedAttributes
  attributes: [/* массив имён атрибутов для отслеживания их изменений */],

  // сокращённый аналог стандартного метода attributeChangedCallback
  changed(name, oldValue, newValue) {
    console.log('вызывается при изменении одного из перечисленных выше атрибутов')
  },

  // собственный метод модуля Creaton, который вызывается перед обновлением DOM
  before() {
    console.time('Update')
  },

  // собственный метод модуля Creaton, который вызывается после обновления DOM
  after() {
    console.timeEnd('Update')
  }
}
```

С первыми тремя методами всё относительно просто и понятно. Подробнее об этом можно прочитать в [руководстве](https://learn.javascript.ru/custom-elements).

Свойство **extends** позволяет [модифицировать](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy) компонент таким образом, чтобы при его монтировании можно было использовать стандартный HTML-элемент, например:

```js
extends: 'header'
```

При этом, такой элемент обязательно должен содержать атрибут ***is*** со значением, соответствующем названию компонента:

```html
<body>
  <!-- монтировать компонент Hello в элемент Header -->
  <header is="my-hello"></header>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      // модифицировать компонент для его монтирования в элемент Header
      extends: 'header',
      data() {
        return {
          message: 'Creaton'
        }
      },
      render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
        `
      }
    }

    // передать компонент Hello в модуль Creaton
    creaton(Hello)
  </script>
</body>
```

Свойство **mode** определяет уровень инкапсуляции [Теневого DOM](https://learn.javascript.ru/shadow-dom#tenevoe-derevo) компонента:

```js
mode: 'closed'
```

 Это свойство может иметь значение "open" или "closed". По умолчанию, компоненту добавляется открытый Теневой DOM. Кроме этого, данное свойство нельзя использовать с модифицированными при помощи свойства **extends** компонентами, что приведёт к ошибке:

```js
// Ошибка! Свойство extends здесь недопустимо
extends: 'header',
mode: 'closed'
```

Теперь рассмотрим работу с отслеживаемыми атрибутами и обновлением [DOM](https://learn.javascript.ru/dom-nodes) компонента, при изменении в них значений.

Внесите изменения в файл модуля компонента, как показано ниже:

```js
export default {
  name: 'my-hello',
  
  render() {
    // вывести содержимое атрибута data-message
    return `<h1>Привет, ${ this.dataset.message }!</h1>`
  },
  
  // добавить атрибут data-message в массив наблюдаемых атрибутов
  attributes: ['data-message'],

  // вызывается при изменении одного из наблюдаемх атрибутов
  changed() {
    // обновить DOM компонента
    this.$render()
  }
}
```

Когда в компоненте отсутствует метод **data()**, возвращающий его объект данных, то метод **render()** выполняется в контексте самого компонента, что позволяет напрямую обращаться ко всем стандартным свойствам компонента через ключевое слово *this*.

В примере выше, внутри метода **render()** выводится значение пользовательского атрибута ***data-message***, с помощью стандартного свойства элемента компонента [dataset](https://learn.javascript.ru/dom-attributes-and-properties#nestandartnye-atributy-dataset).

Давайте добавим этот атрибут в тег монтирования компонента и зададим ему значение "Creaton", а заодно, добавим этому тегу идентификатор для быстрого доступа к компоненту в консоли:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент Hello в приложение
    добавить ему атрибуты data-message и id -->
  <my-hello id="hello" data-message="Creaton"></my-hello>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // импортировать компонент Hello
    import Hello from './Hello.mjs'

    // передать компонент Hello в модуль Creaton
    creaton(Hello)
  </script>
</body>
</html>
```

Атрибут ***data-message*** был добавлен в массив наблюдаемых атрибутов:

```js
attributes: ['data-message']
```

При изменении любого наблюдаемого атрибута, происходит вызов сокращённого метода **changed()**, внутри которого, осуществляется вызов специального метода **$render()**, используя для этого ключевое слово *this*, как показано ниже:

```js
changed() {
  // обновить DOM компонента
  this.$render()
}
```

Все специальные свойства и методы, такие, например, как метод **\$render()**, в Creaton начинаются с символа **$**. Доступ к ним может быть получен как внутри остальных методов компонента, так и через консоль. Выше мы добавили тегу монтирования компонента атрибут ***id*** со значением "hello".

Откройте консоль браузера и введите следующую команду:

```
hello.dataset.message = 'Мир'
```

после чего нажмите Enter.

Здесь мы изменяем значение атрибута ***data-message*** через стандартное свойство **dataset**, которое присутствует у элемента компонента. Доступ к элементу компонента осуществляется с помощью установленного ранее индентификатора *hello*. 

После изменения значения наблюдаемого атрибута, экран браузера будет сразу же обновлён, поскольку в методе **changed()** присходит вызов специального метода **$render()**, который полностью переписывает содержимое Теневого DOM компонента:

<h1>Привет, Мир!</h1>

Метод **changed()** может содержать три параметра, например:

```js
changed(name, oldValue, newValue) {
  // вывести название, старое и новоое значение атрибута
  console.log(name, oldValue, newValue)
}
```

Доступ ко всем специальным свойствам и методам компонента, может осуществляться как во внутренних методах, через ключевое слово *this*, так и через консоль, при обращении к элементу самого компонента.

Например, если из метода **changed()** убрать вызов метода **$render()**, то для обновления DOM компонента потребуется ввести в консоли две команды:

```
hello.dataset.message = 'Мир'
hello.$render()
```

Помимо специального метода **$render()**, в Creaton присутствуют и специальные свойства.

Свойство **$data** ссылается на возвращаемый методом **data()** объект компонента:

```
hello.$data
```

Свойство **$host** ссылается на тег монтирования (элемент) компонента:

```
hello.$host === hello
```

Свойство **$root** ссылается на Теневой DOM компонента:

```
hello.$root === hello.shadowRoot
```

Кроме специальных, в Creaton имеется и два вспомогательных метода, которые служат для быстрого доступа к содержимому Теневого DOM компонента. Доступ к содержимому DOM компонента можно получить после его определения на странице.

Для рассмотрения вспомогательных методов, идеально подходит метод **connected()**, который вызывается сразу же после определения компонента на странице.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello></my-hello>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      data() {
        return {
           arr: [1, 2, 3, 4, 5]
        }
      },
      render() {
        return `
          <button>Обратить массив</button>
          <ul>
            ${ this.arr.map(item => `<li>Элемент: ${ item }</li>`).join('') }
          </ul>
        `
      },
      connected() {
        // получить массив из объекта данных компонента
        const { arr } = this.$data

        // назначить кнопке обработчик события click
        this.$('button').addEventListener('click', e => {
          // обратить массив
          arr.reverse()
          
          // обновить DOM компонента
          this.$render()
        })
      }
    }

    // передать компонент Hello в модуль Creaton
    creaton(Hello)
  </script>
</body>
</html>
```

В методе **render()** осуществляется вывод массива элементов, используя для этого стандартный метод массива [map()](https://learn.javascript.ru/array-methods#map) и [шаблонные](https://learn.javascript.ru/string#kavychki) строки:

```js
render() {
  return `
    <button>Обратить массив</button>
    <ul>
      ${ this.arr.map(item => `<li>Элемент: ${ item }</li>`).join('') }
    </ul>
  `
}
```

Добавляемый в конце метод [join()](https://learn.javascript.ru/array-methods#split-i-join) с переданным ему аргументом пустой строки, просто удаляет запятые между элементами массива при стандартном выводе на экран.

В методе **connected()** происходит [деструктуризация ](https://learn.javascript.ru/destructuring-assignment#destrukturizatsiya-obekta) объекта данных компонента и назначение обработчика события *click* выбранной кнопке:

```js
connected() {
  // получить массив из объекта данных компонента
  const { arr } = this.$data

  // назначить кнопке обработчик события click
  this.$('button').addEventListener('click', e => {
    // обратить массив
    arr.reverse()

    // обновить DOM компонента
    this.$render()
  })
}
```

Кнопка выбирается с помощью вспомогательного метода **$()**, который является сокращённым аналогом стандартного метода [querySelector()](https://learn.javascript.ru/searching-elements-dom#querySelector). Без вспомогательного метода **\$()**, процесс выбора кнопки и назначения ей обработчика выглядел бы следующим образом:

```js
// назначить кнопке обработчик события click
this.$root.querySelector('button').addEventListener('click', e => {
  // обратить массив
  arr.reverse()

  // обновить DOM компонента
  this.$render()
})
```

Второй вспомогательный метод называется **$$()** и является сокращённым аналогом стандартного метода [querySelectorAll()](https://learn.javascript.ru/searching-elements-dom#querySelectorAll). Ниже показан пример использования этого метода:

```js
// назначить кнопке обработчик события click
this.$$('button')[0].addEventListener('click', e => {
  // обратить массив
  arr.reverse()

  // обновить DOM компонента
  this.$render()
})
```

Во всех трёх показанных случаях, обработчик события выполнится всего один раз. Это объясняется тем, что после выполнения метода **$render()**, старое содержимое Теневого DOM компонента удаляется и создаётся новое содержимое в котором, новой кнопке уже не назначен никакой обработчик.

Решить эту проблему можно путём вынесения массива в отдельный компонент и обновления только содержимого DOM этого компонента:

```html
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello></my-hello>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      data() {
        return {
           arr: [1, 2, 3, 4, 5]
        }
      },
      render() {
        return `
          <button>Обратить массив</button>
          <my-array></my-array>
        `
      },
      connected() {
        // получить элемент компонента ArrComponent
        const ArrComponent = this.$('my-array')

        // получить массив из объекта данных компонента ArrComponent
        const { arr } = ArrComponent.$data

        // назначить кнопке обработчик события click
        this.$('button').addEventListener('click', e => {
          // обратить массив
          arr.reverse()

          // обновить DOM компонента ArrComponent
          ArrComponent.$render()
        })
      }
    }

    // создать объект компонента ArrComponent
    const ArrComponent = {
      name: 'my-array',
      data() {
        return {
           arr: [1, 2, 3, 4, 5]
        }
      },
      render() {
        return `<ul>${ this.arr.map(item => `<li>Элемент: ${ item }</li>`).join('') }</ul>`
      }
    }

    // передать компоненты Hello и ArrComponent в модуль Creaton
    creaton(Hello, ArrComponent)
  </script>
</body>
```

В данном примере, внутри метода **connected()** компонента *Hello*, с помощью метода **\$()** выбирается из содержимого его Теневого DOM элемент компонента *ArrComponent*. После получения элемента компонента, мы имеем доступ ко всем его специальным методам и свойствам, в том числе, к свойству **\$data** и к методу **$render()**, как показано ниже:

```js
connected() {
  // получить элемент компонента ArrComponent
  const ArrComponent = this.$('my-array')

  // получить массив из объекта данных компонента ArrComponent
  const { arr } = ArrComponent.$data

  // назначить кнопке обработчик события click
  this.$('button').addEventListener('click', e => {
    // обратить массив
    arr.reverse()

    // обновить DOM компонента ArrComponent
    ArrComponent.$render()
  })
}
```

После нажатия на кнопку, происходит обращение массива и обновление Теневого DOM компонента *ArrComponent*, не затрагивая содержимого самого компонента *Hello*, ввиду чего, обработчик кнопки будет работать множество раз, поскольку кнопка больше не удаляется из DOM компонента *Hello*.

У этого примера есть один существенный недостаток. Если компонент *ArrComponent* будет не вложенным, а, например, соседним, по отношению к компоненту *Hello*:

```html
<!-- монтировать компонент Hello в приложение -->
<my-hello></my-hello>

<!-- монтировать компонент ArrComponent в приложение -->
<my-array></my-array>
```

Компонент *ArrComponent* будет отображён на экране, однако, кнопка обращения массива из компонента *Hello*, не будет на него воздействовать никаким образом.

На помощь приходит последний специальный метод, который называется **$event()** и является обёрткой над стандартным конструктором пользовательских событий [new CustomEvent](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya).

Метод **\$event()** используется в двух вариантах. Если этот метод вызывается из любого метода компонента, такого, например, как метод **connected()**, то передаваемое в метод **$event()** название события будет вызвано для элемента компонента, внутри которого данный метод был вызван, например:

```html
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello id="hello"></my-hello>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      data() {
        return {
          message: 'Creaton'
        }
      },
      render() {
        // добавить компоненту событие render
        this.$host.addEventListener('render', () => console.log('Событие Render'))

        return `
          <h1>Привет, ${ this.message }!</h1>
        `
      },
      connected() {
        // вызват событие render для компонента
        this.$event('render')
      }
    }

    // передать компонент Hello в модуль Creaton
    creaton(Hello)
  </script>
</body>
```

Данный пример не имеет особой пользы и используется лишь в качестве демонстрации метода **\$event()**. Здесь стоит обратить внимание на тот факт, что для установки события *render* в методе **render()**, используется специальное свойство **$host**, как показано ниже:

```js
this.$host.addEventListener('render', () => console.log('Событие Render'))
```

Метод **render()** выполняется в контексте объекта данных компонента, или в контексте самого компонента, если у него отсутствует объект данных. В данном случае, у компонента объект данных присутствует. Однако, в объекте данных нет никакого свойства **$host**. Так почему же не возникает ошибки?

Объект данных компонента представляет собой [прокси-объект](https://learn.javascript.ru/proxy), который сначала проверяет наличие свойства в целевом объекте данных, возвращаемом методом **data()** и, если такого свойства в объекте данных нет, то возвращается свойство из самого компонента. Как было сказано ранее, свойство **$host** является специальным свойством компонента, поэтому ошибки и не происходит.

Данная возможность позволяет, например, получить доступ к атрибутам компонента, как показано в примере ниже:

```js
render() {
  return `
    <h1>Привет, ${ this.message } с id="${ this.id }"! </h1>
  `
}
```

Выведет на экран браузера сообщение:

<h1>Привет, Creaton с id="hello"!</h1>

Однако, если у объекта данных компонента присутствовало бы свойсто **id**, например:

```js
data() {
  return {
    message: 'Creaton',
    id: 1
  }
}
```

то вывелось бы именно значение этого свойства:

<h1>Привет, Creaton с id="1"!</h1>

Для того, чтобы из метода **render()** можно было бы получить значение любого свойства компонента, в данном случае атрибута ***id***, а не только его объекта данных, и было добавлено специальное свойство **$host**.

Пример ниже сработает правильно:

```js
render() {
  return `
    <h1>Привет, ${ this.message } с id="${ this.$host.id }"! </h1>
  `
}
```

Это было небольшое пояснение того, как правильно использовать свойство **\$host** внутри метода **render()**.

Возвращаясь к специальному методу **\$event()**, как уже было сказано ранее, особой пользы от его использования его в рамках одного компонента не наблюдается. Вся его мощь проявляется когда метод **$event()** вызывается в контексте глобального объекта [document](https://learn.javascript.ru/browser-environment#dom-document-object-model), позволяя обмениваться событиями между различными компонентами приложения.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello></my-hello>

  <!-- монтировать компонент ArrComponent в приложение -->
  <my-array></my-array>
  
  <script type="module">
    // импортировать модуль Creaton
    import creaton from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      data() {
        return {
           arr: [1, 2, 3, 4, 5]
        }
      },
      render() {
        return `<button>Обратить массив</button>`
      },
      connected() {
        // назначить кнопке обработчик события click
        this.$('button').addEventListener('click', e => {
          /* вызвать пользовательское событие reverse-array
            глобального объекта document */
          this.$event.call(document, 'reverse-array')
        })
      }
    }

    // создать объект компонента ArrComponent
    const ArrComponent = {
      name: 'my-array',
      data() {
        return {
           arr: [1, 2, 3, 4, 5]
        }
      },
      render() {
        return `<ul>${ this.arr.map(item => `<li>Элемент: ${ item }</li>`).join('') }</ul>`
      },
      connected() {
        // получить массив из объекта данных компонента
        const { arr } = this.$data

        /* добавить обработчик события reverse-array
          для глобального объекта document */
        document.addEventListener('reverse-array', e => {
          // обратить массив
          arr.reverse()

          // обновить DOM компонента
          this.$render()
        })
      }
    }

    // передать компоненты Hello и ArrComponent в модуль Creaton
    creaton(Hello, ArrComponent)
  </script>
</body>
```

Разберём этот пример подробнее. В самом начале содержимого файла *index.html*, монтируются два независимых друг от друга компонента:

```html
<!-- монтировать компонент Hello в приложение -->
<my-hello></my-hello>

<!-- монтировать компонент ArrComponent в приложение -->
<my-array></my-array>
```

В методе **connected()** компонента *ArrComponent* происходит деструктуризация объекта данных компонента и добавляется обработчик пользовательского события *reverse-array* для глобального объекта *Document*, как показано ниже: 

```js
connected() {
  // получить массив из объекта данных компонента
  const { arr } = this.$data

  /* добавить обработчик события reverse-array
    для глобального объекта document */
  document.addEventListener('reverse-array', e => {
    // обратить массив
    arr.reverse()

    // обновить DOM компонента
    this.$render()
  })
}
```

Внутри этого обработчика происходит обращение массива **arr** и обновление Теневого DOM компонента *ArrComponent*.

В свою очередь, в методе **connected()** компонента *Hello*, обработчик события назначается его кнопке:

```js
connected() {
  // назначить кнопке обработчик события click
  this.$('button').addEventListener('click', e => {
    /* вызвать пользовательское событие reverse-array
      глобального объекта document */
    this.$event.call(document, 'reverse-array')
  })
}
```

Внутри данного обработчика происходит вызов пользовательского события *reverse-array* глобального объекта *Document*. Метод **$event()** здесь вызывается с помощью метода функции [call()](https://learn.javascript.ru/call-apply-decorators#primenenie-func-call-dlya-peredachi-konteksta), которому в первом аргументе передаётся глобальный объект *Document* в виде свойства **document**, глобального объекта [window](https://learn.javascript.ru/global-object).

Метод **$event()** является единственным экспортируемым методом из модуля Creaton. Предыдущий пример можно было бы переписать следующим образом:

```js
// импортировать модуль Creaton и метод event
import creaton, { event } from './creaton.mjs'

// создать объект компонента Hello
const Hello = {
  name: 'my-hello',
  data() {
    return {
        arr: [1, 2, 3, 4, 5]
    }
  },
  render() {
    return `<button>Обратить массив</button>`
  },
  connected() {
    // назначить кнопке обработчик события click
    this.$('button').addEventListener('click', e => {
      /* вызвать пользовательское событие reverse-array
        глобального объекта document */
      event('reverse-array')
    })
  }
}
```

При импорте используется название метода без символа **$**, как показано ниже:

```js
import creaton, { event } from './creaton.mjs'
```

Кроме этого, при вызове метода **event()** больше нет необходимости прибегать к методу функции **call()**, поскольку метод **event()**, изначально выполняется в контексте глобального объекта *Document*:

```js
event('reverse-array')
```

Пользовательские события позволяют передавать в обработчики любые данные, используя для этого свойство [detail](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya), как показано в примере ниже:

```html
<body>
  <!-- монтировать компонент Hello в приложение -->
  <my-hello></my-hello>

  <!-- монтировать компонент ArrComponent в приложение -->
  <my-array></my-array>
  
  <script type="module">
    // импортировать модуль Creaton и метод event
    import creaton, { event } from './creaton.mjs'

    // создать объект компонента Hello
    const Hello = {
      name: 'my-hello',
      data() {
        return {
           arr: [1, 2, 3, 4, 5]
        }
      },
      render() {
        return `<button>Получить массив</button>`
      },
      connected() {
        this.$('button').addEventListener('click', e => {
          event('new-array', {
            // передать в обработчик новый массив
            detail: ['A', 'B', 'C']
          })
        })
      }
    }

    // создать объект компонента ArrComponent
    const ArrComponent = {
      name: 'my-array',
      data() {
        return {
           arr: [1, 2, 3, 4, 5]
        }
      },
      render() {
        return `<ul>${ this.arr.map(item => `<li>Элемент: ${ item }</li>`).join('') }</ul>`
      },
      connected() {
        document.addEventListener('new-array', e => {
          // присвоить свойству arr переданный массив
          this.$data.arr = e.detail

          // обновить DOM компонента
          this.$render()
        })
      }
    }

    // передать компоненты Hello и ArrComponent в модуль Creaton
    creaton(Hello, ArrComponent)
  </script>
</body>
```

Новый массив передаётся в свойстве **detail** второго аргумента метода **event()**, во время вызова пользовательского события *new-array*:

```js
connected() {
  this.$('button').addEventListener('click', e => {
    event('new-array', {
      // передать в обработчик новый массив
      detail: ['A', 'B', 'C']
    })
  })
}
```

Этот массив присваивается свойству **arr** объекта данных компонента *ArrComponent*, во время возникновения данного пользовательского события:

```js
connected() {
  document.addEventListener('new-array', e => {
    // присвоить свойству arr переданный массив
    this.$data.arr = e.detail
    
    // обновить DOM компонента
    this.$render()
  })
}
```