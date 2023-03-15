<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

![rigl](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Creaton⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js)

<br>

Creaton - это плагин JavaScript для быстрого создания [Веб-компонентов](https://learn.javascript.ru/web-components). Плагин поддерживает все технологии, методы и свойства, такие, например, как [слоты](https://learn.javascript.ru/slots-composition) и [Теневой DOM](https://learn.javascript.ru/shadow-dom), которые предоставляются стандартными Веб-компонентами.

Ниже представлен пример простого модульного компонента:

```js
export default {
  name: 'r-hello',
  data() {
    return {
      message: 'Creaton',
      mainColor: 'red'
    }
  },
  render() {
    return `
      <h1>Привет, ${ this.message }!</h1>
      
      <style>
        h1 {
          color: ${ this.mainColor };
        }
      </style>
    `
  }
}
```

<br>

1. [Быстрый старт](#quick-start)
2. [Объект компонента](#component-object)
3. [Циклы](#cycles)
4. ~~[Пользовательские события](#custom-events)~~
5. ~~[Особенности работы](#features-work)~~

<br>
<hr>
<br>

<h2 id="quick-start">Быстрый старт</h2>

<br>

Creaton позволяет создавать компоненты двух типов: Встроенные и Модульные. Мы начнём со Встроенных компонентов. Создайте новый рабочий каталог, например, с названием *app*, и скачайте в этот каталог файл [creaton.min.js](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js).

Добавьте в каталог файл *index.html* со следующим содержимым:

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
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать объект компонента Hello
    const Hello = {
      name: 'r-hello',
      data() {
        return {
          message: 'Creaton',
          mainColor: 'red'
        }
      },
      render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
          
          <style>
            h1 {
              color: ${ this.mainColor };
            }
          </style>
        `
      }
    }

    // передать объект компонента Hello в плагин Creaton
    Creaton(Hello)
  </script>
</body>
</html>
```

Чтобы гарантировать отсутствие конфликтов имён между стандартными и пользовательскими HTML-элементами, имя компонента должно содержать дефис «-», например, my-element и super-button – это правильные имена, а myelement – нет.

Открыв файл *index.html* в браузере, на экране отобразится созданное в компоненте Hello сообщение:

> <h1 style="color: red;">Привет, Creaton!</h1>

<br>

В этом примере был создан простой, встроенный в общий скрипт компонент. Давайте теперь вынесем этот компонент в отдельный модуль. 

Создайте в каталоге *app* файл *Hello.js* со следующим содержимым:

```js
// экспортировать объект компонента Hello
export default {
  name: 'r-hello',
  data() {
    return {
      message: 'Creaton',
      mainColor: 'red'
    }
  },
  render() {
    return `
      <h1>Привет, ${ this.message }!</h1>
      
      <style>
        h1 {
          color: ${ this.mainColor };
        }
      </style>
    `
  }
}
```

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
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script type="module">
    // импортировать объект компонента Hello
    import Hello from './Hello.js'

    // передать объект компонента Hello в плагин Creaton
    Creaton(Hello)
  </script>
</body>
</html>
```

Для работы с Модульными компонентами, нам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

Установите данный сервер с помощью команды в терминале:

```
npm install --global lite-server
```

Теперь перейдите в каталог *app* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
lite-server
```

После этого откроется окно браузера по умолчанию, в котором будет отображаться показанное выше приветственное сообщение.

<br>
<br>
<h2 id="component-object">Объект компонента</h2>

<br>

Каждый объект Встроенного и Модульного компонента, должен содержать обязательное свойство **name**, которое определяет название компонента, как показано ниже:

```js
const Hello = {
  name: 'r-hello'
}
```

<br>

Метод **data()** должен возвращать объект с пользовательскими данными (свойствами и методами) компонента:

```js
data() {
  return {
    message: 'Creaton',
    printHello() {
      return 'Привет, Мир!'
    }
  }
}
```

Этот метод может быть асинхронным. В примере ниже, для пользовательского свойства **message** имитируется получение данных от сервера:

```js
async data() {
  const message = await new Promise(ok => setTimeout(() => ok('Creaton'), 1000))

  return {
    message
  }
}
```

<br>

Для Встроенных и Модульных компонентов, метод **render()** возвращает HTML-содержимое компонента в виде [шаблонной строки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals):

```js
render() {
  return `
    <h1>Привет, ${ this.message }!</h1>
    
    <style>
      h1 {
        color: ${ this.mainColor };
      }
    </style>
  `
}
```

Внутри шаблонных строк можно использовать [подстановки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals#%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F_%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9) для выставки выражений:

```js
${ 5 + 6 }
```

и пользовательских данных, добавляя перед их названием ключевое слово *this*:

```js
${ this.message }
```

Кроме метода возвращающего шаблонную строку, свойству **render** можно передать ссылку на элемент [TEMPLATE](https://developer.mozilla.org/ru/docs/Web/HTML/Element/template), как показано ниже:

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
  <!-- монтировать компонент Hello -->
  <r-hello></r-hello>

  <!-- шаблон компонента Hello -->
  <template id="template-hello">
    <h1>Привет, ${ this.message }!</h1>
          
    <style>
      h1 {
        color: ${ this.mainColor };
      }
    </style>
  </template>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать объект компонента Hello
    const Hello = {
      name: 'r-hello',
      data() {
        return {
          message: 'Creaton',
          mainColor: 'red'
        }
      },
      // передать ссылку на шаблон компонента
      render: document.querySelector('#template-hello')
    }

    // передать объект компонента Hello в плагин Creaton
    Creaton(Hello)
  </script>
</body>
</html>
```

Всё HTML-содержимое элемента TEMPLATE будет обёрнуто в шаблонную строку. Это означает, что внутри данного элемента необходимо экранировать символы обратных кавычек «`», например:

```html
<template id="template-hello">
  <h1>Привет, \`${ this.message }\`!</h1>
        
  <style>
    h1 {
      color: ${ this.mainColor };
    }
  </style>
</template>
```

<br>

По умолчанию, все компоненты создаются без [Теневого DOM](https://learn.javascript.ru/shadow-dom). Свойство **mode** определяет [уровень инкапсуляции](https://learn.javascript.ru/shadow-dom#tenevoe-derevo) компонента для использования [локальных стилей](https://learn.javascript.ru/shadow-dom-style) и может иметь значение либо "open", либо значение "closed":

```js
mode: 'open'
```

<br>

Свойство **extends** позволяет [монтировать компонент](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy) в стандартный HTML-элемент:

```js
extends: 'header'
```

Элемент, в который монтируется компонент, должен содержать атрибут ***is*** со значением, соответствующим названию компонента, который в него монтируется:

```html
<header is="r-hello"></header>
```

<br>

Свойство **attributes** содержит массив с названиями атрибутов при изменении которых, будет вызываться метод **changed()**, например:

```js
attributes: ['title'],

changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

Отслеживаемые атрибуты являются технологией Веб-компонентов, а метод **changed()** - сокращённым аналогом метода [attributeChangedCallback()](https://learn.javascript.ru/custom-elements).

Добавьте атрибуты ***id*** и ***title*** к элементу монтирования компонента Hello в файле *index.html*, как показано ниже:

```html
<r-hello id="hello" title="Привет"></r-hello>
```

Атрибут ***id*** используется для быстрого доступа к компоненту в консоли браузера. Теперь откройте эту консоль и введите команду:

```
hello.title = 'Пока'
```

После нажатия клавиши Enter, метод **changed()** выведет на консоль следующую строку:

```
title Привет Пока
```

<br>

Методы **connected()**, **disconnected()** и **adopted()** - являются сокращёнными аналогами методов [connectedCallback(), disconnectedCallback() и adoptedCallback()](https://learn.javascript.ru/custom-elements).

Они вызываются при добавлении компонента в документ - метод **connected()**; удалении компонента из документа - метод **disconnected()**; и при перемещении компонента в новый документ - метод **adopted()**.

К наиболее часто применяемым методам, можно отнести метод **connected()**, который позволяет обратиться к HTML-содержимому компонента, после его добавления в [DOM](https://learn.javascript.ru/dom-nodes):

```js
connected() {
  console.log(this.$('h1'))
}
```

В данном примере, на консоль браузера выводится выбранный элемент H1 с помощью вспомогательного метода **$()**, который доступен в методе **connected()** через ключевое слово *this*. Этот метод является сокращённым аналогом метода [querySelector()](https://learn.javascript.ru/searching-elements-dom#querySelector).

Второй вспомогательный метод называется **$$()** и является сокращённым аналогом метода [querySelectorAll()](https://learn.javascript.ru/searching-elements-dom#querySelectorAll), как показано ниже:

```js
connected() {
  console.log(this.$$('h1')[0])
}
```

Для доступа к пользовательским данным, внутри методов объекта компонента применяется ключевое слово *this*, поскольку все эти методы выполняются в контексте объекта данных компонента:

```js
connected() {
  console.log(this.message)
}
```

Если необходимо получить доступ к самому компоненту, то применяется специальное свойство **$host**, которое ссылается на элемент монтирования компонента:

```js
connected() {
  console.log(this.$host)
}
```

Кроме этого, все рассмотренные выше методы могут быть асинхронными. 

В примере ниже, пользовательскому свойству **message** присваивается новое значение через одну секунду после добавления компонента в документ:

```js
async connected() {
  // присвоить свойству новое значение
  this.message = await new Promise(ok => setTimeout(() => ok('Быстрые компоненты'), 1000))

  // обновить DOM компонента
  this.$render()
}
```

В этом примере, после присвоения свойству **message** нового значения, вызывается специальный метод **$render()**, который полностью переписывает DOM компонента. Т.е. на внутреннем уровне, он вызывает рассмотренный ранее метод **render()**.

Это означает, что любые назначаемые в методе **connected()** выбранным элементам события:

```js
connected() {
  this.$$('h1')[0].addEventListener('click', () => console.log('Привет'))
}
```

полностью пропадают, поскольку разметка компонента заново переписывается.

Специальный метод **$render()** наиболее полезен при совместной работе компонентов выступающих в роли циклов и пользовательских событий, как будет продемонстрировано позже.

<br>

Методы **before()** и **after()** вызываются *Перед* и *После* обновления DOM компонента, т.е. вызова специального метода **$render()**, например:

```js
before() {
  console.time('Update')
},

after() {
  console.timeEnd('Update')
}
```

Данный пример показывает, за сколько времени обновляется DOM компонента.

<br>

Последнее свойство, которое можно определить в объекте любого компонента, называется **mixins** и позволяет создавать общие для всех одноимённых компонентов свойства и методы:

```js
mixins: {
  printMessage() {
    return this.message
  }
}
```

Теперь метод **printMessage()** будет доступен всем компонентам Hello. Для обращения к свойствам и методам примеси, внути разметки компонента применяется специальное свойство **$mixins**, после которого, через точку указывается название запрашиваемого метода или свойства:

```js
render() {
  return `
    <h1>Привет, ${ this.$mixins.printMessage() }!</h1>
  `
}
```

Примеси работают следующим образом. Сначала свойства запрашиваются в локальном объекте **mixins**, который мы создали выше, затем, свойство запрашивается в глобальном объекте примесей, который мы создадим далее, и в конце, свойство запрашивается в объекте данных компонента.

По этой причине, внутри метода **printMessage()** мы смогли получить доступ к пользовательскому свойству **message** через ключевое слово *this*, как показано ниже:

```js
printMessage() {
  return this.message
}
```

Чтобы создаваемые методы и свойства были доступны всем компонента, а не только одноимённым, необходимо определить для них глобальную примесь через функцию Creaton и её свойство **mixins**.

Это необходимо сделать до того, как компоненты будут переданы в эту функцию для их определения в приложении:

```js
// глобальная примесь
Creaton.mixins = {
  printMessage() {
    return this.message
  }
}

// передать компоненты Hello и Bye в библиотеку Creaton
Creaton(Hello, Bye)
```

<br>
<br>
<h2 id="cycles">Циклы</h2>

<br>

Для вывода массивов в [шаблонных строках](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals), применяются методы [map()](https://learn.javascript.ru/array-methods#map) и [join()](https://learn.javascript.ru/array-methods#split-i-join), как показано ниже:

```js
const Hello = {
  name: 'r-hello',
  data() {
    return {
      colors: ['красный', 'зелёный', 'синий']
    }
  },
  render() {
    return `
      <ul>
        ${ this.colors.map(col => `<li>${ col }</li>`).join('') }
      </ul>
    `
  }
}
```

Методу **join()** передаётся пустая строка для удаления запятых между элементами отображаемого массива.

<br>

Аналогичным образом можно выводить и объекты, обернув их предварительно в массив:

```js
const Hello = {
  name: 'r-hello',
  data() {
    return {
      user: {
        name: 'Дмитрий Петров',
        age: 28
      }
    }
  },
  render() {
    return `
      <ul>
        ${ [this.user].map(prop => `<li>Имя: ${ prop.name } <br> Возраст: ${ prop.age }</li>`).join('') }
      </ul>
    `
  }
}
```

<br>
<br>