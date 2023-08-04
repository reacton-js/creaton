<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

![creaton](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Creaton⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js)

<br>

Creaton - это плагин JavaScript для быстрого создания [Веб-компонентов](https://learn.javascript.ru/web-components). Плагин поддерживает все технологии, методы и свойства, такие, например, как [слоты](https://learn.javascript.ru/slots-composition) и [Теневой DOM](https://learn.javascript.ru/shadow-dom), которые предоставляются стандартными Веб-компонентами.

*- Начиная с версии 2.4.0, безопасность закрытых компонентов значительно возросла. Получить/изменить состояние и HTML-содержимое компонента, возможно только из статических методов.*

*- Начиная с версии 2.5.0, в плагин была добавлена поддержка [рендеринга](https://academy.yandex.com/journal/server-side-rendering) на сервере [Node.js](https://nodejs.org/ru).*

*- Добавлена система [сборки](https://github.com/reacton-js/creaton/tree/main/webpack) на основе [webpack](https://webpack.js.org/).*

<br>

Ниже представлен пример простого компонента:

```js
class MyComponent {
  message = 'Creaton'
  color = 'red'

  static render() {
    return `
      <h1>Привет, ${ this.message }!</h1>
      
      <style>
        h1 {
          color: ${ this.color };
        }
      </style>
    `
  }
}
```

<br>

1. [Быстрый старт](#quick-start)
2. [Класс компонента](#component-class)
3. [Специальные свойства](#special-properties)
4. [Общие методы](#general-methods)
5. [Циклы](#cycles)
6. [Стили](#styles)
7. [Слоты](#slots)
8. [События](#events)
9. [Маршруты](#routes)
10. [SSR](#ssr)

<br>
<hr>
<br>

<h2 id="quick-start">Быстрый старт</h2>

<br>

Для создания компонентов применяются классы. Классы могут быть как встроенными в основной скрипт, так и импортированы из внешнего модуля. Создайте новый рабочий каталог, например, с названием *app*, и скачайте в этот каталог файл [creaton.min.js](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js).

Добавьте в каталог файл *index.html* со следующим содержимым:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component></my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      static render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)
  </script>
</body>
</html>
```

Чтобы гарантировать отсутствие конфликтов имён между стандартными и пользовательскими HTML-элементами, имя компонента должно содержать дефис «-», например, my-element и super-button – это правильные имена, а myelement – нет.

Открыв файл *index.html* в браузере, на экране отобразится созданное в компоненте MyComponent сообщение:

<h1 style="color: red;">Привет, Creaton!</h1>

<br>

В этом примере был создан простой, встроенный в общий скрипт компонент. Давайте теперь вынесем этот компонент в отдельный модуль. 

Создайте в каталоге *app* файл *MyComponent.js* со следующим содержимым:

```js
// экспортировать класс компонента MyComponent
export default class MyComponent {
  message = 'Creaton'
  color = 'red'

  static render() {
    return `
      <h1>Привет, ${ this.message }!</h1>
      
      <style>
        h1 {
          color: ${ this.color };
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component></my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script type="module">
    // импортировать класс компонента MyComponent
    import MyComponent from './MyComponent.js'

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)
  </script>
</body>
</html>
```

Для работы с внешними компонентами, нам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

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

Для работы с модульными компонентами, удобно использовать различные системы сборки модулей. Вы можете настроить свою или [скачать](https://github.com/reacton-js/creaton/tree/main/webpack) уже готовую систему сборки на основе [webpack](https://webpack.js.org/).

<br>

Для быстрого доступа к компоненту в консоли браузера, добавьте его элементу монтирования идентификатор "mycomp", как показано ниже:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp"></my-component>
```

Теперь откройте консоль браузера и введите команду:

```
mycomp.$update({ message: 'Веб-компоненты', color: 'green' })
```

Цвет и сообщение заголовка сразу же изменятся:

<h1 style="color: green;">Привет, Веб-компоненты!</h1>

<br>
<br>
<h2 id="component-class">Класс компонента</h2>

<br>

Название класса компонента определяет название компонента в DOM. Например, класс MyComponent или myComponent, будет соответствовать названию *my-component* в DOM. Каждый класс компонента, может содержать не обязательное статическое свойство **name**, которое определяет название этого класса.

Данное свойство необходимо указывать, например, при передачи анонимного класса напрямую в плагин:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // передать анонимный класс в плагин Creaton
    Creaton(class {
      message = 'Creaton'
      color = 'red'

      static name = 'MyComponent' // название компонента

      static render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    })
  </script>
</body>
</html>
```

Название класса может быть указано в верблюжьей, как в примере выше, или шашлычной нотации:

```js
static name = 'my-component'
```

<br>

Состояние компонента определяется в виде свойств экземпляра класса компонента. В примере выше, имеется два состояния: 

```js
message = 'Creaton'
color = 'red'
```

Это новый способ определения свойств для объектов. Вы можете использовать и старый способ, указывая конструктор:

```js
constructor() {
  this.message = 'Creaton'
  this.color = 'red'
}
```

<br>

Кроме состояния, объекты классов могут иметь и методы, например:

```js
class MyComponent {
  message = 'Creaton'
  color = 'red'

  // метод объекта класса
  printHello() {
    return `Привет, ${ this.message }!`
  }

  static render() {
    return `
      <h1>${ this.printHello() }</h1>
      
      <style>
        h1 {
          color: ${ this.color };
        }
      </style>
    `
  }
}
```

В данном примере был определён метод **printHello()** объекта класса MyComponent, который просто выводит приветственное сообщение.

<br>

Для вывода HTML-содержимого компонента, класс должен иметь статический метод **render()**, который возвращает строку. Из этой строки будет создана HTML-разметка будущего компонента.

Данный метод выполняется в контексте объекта состояния компонента, что позволяет ссылаться на свойства этого объекта с помощью ключевого слова *this* и используя шаблонные строки, например:

```js
static render() {
  return `
    <h1>Привет, ${ this.message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>
  `
}
```

Внутри шаблонных строк можно использовать [подстановки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals#%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F_%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9) для выставки любых выражений:

```js
${ 5 + 6 }
```

Метод **render()**, как и все рассмотренные далее статические методы класса компонента, может быть асинхронным. В примере ниже, имитируется загрузка данных с сервера:

```js
static async render() {
  // получить данные через одну секунду после вызова метода
  const message = await new Promise(ok => setTimeout(() => ok('Веб-компоненты'), 1000))

  return `
    <h1>Привет, ${ message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>
  `
}
```

<br>

По умолчанию, все компоненты создаются без [Теневого DOM](https://learn.javascript.ru/shadow-dom). Это означает, что используемые в них стили влияют на DOM всего [документа](https://developer.mozilla.org/ru/docs/Web/API/Document), а не конкретного компонента. 

Статическое свойство **mode** определяет [уровень инкапсуляции](https://learn.javascript.ru/shadow-dom#tenevoe-derevo) компонента для использования [локальных стилей](https://learn.javascript.ru/shadow-dom-style) и может иметь значение либо "open", либо значение "closed":

```js
static mode = 'open'
```

В примере ниже, создаётся компонент с закрытым Теневым DOM:

```js
class MyComponent {
  message = 'Creaton'
  color = 'red'

  static mode = 'closed' // добавить закрытый Теневой DOM

  static render() {
    return `
      <h1>Привет, ${ this.message }!</h1>
      
      <style>
        h1 {
          color: ${ this.color };
        }
      </style>
    `
  }
}
```

Данный тип компонентов является наиболее защищённым, поскольку доступ к состоянию и DOM такого компонента, возможен только из статических методов класса.

<br>

Статическое свойство **extends** позволяет [монтировать компонент](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy) в стандартный HTML-элемент, например:

```js
static extends = 'header'
```

Элемент, в который монтируется компонент, должен содержать атрибут [*is*](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/is) со значением, соответствующим названию компонента, который в него монтируется:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent в элемент Header -->
  <header is="my-component"></header>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      static extends = 'header' // монтировать компонент в элемент Header

      static render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)
  </script>
</body>
</html>
```

<br>

Статическое свойство **attributes** содержит массив с названиями атрибутов при изменении которых, будет вызываться статический метод **changed()**, например:

```js
static attributes = ['title'] // отслеживаемые атрибуты

// вызывается при изменении отслеживаемого атрибута
static changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

Отслеживаемые атрибуты являются технологией Веб-компонентов, а метод **changed()** - сокращённым аналогом метода [attributeChangedCallback()](https://learn.javascript.ru/custom-elements).

Добавьте атрибуты ***id*** и ***title*** к элементу монтирования компонента MyComponent в файле *index.html*, как показано ниже:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp" title="Creaton"></my-component>
```

Атрибут ***id*** используется для быстрого доступа к компоненту в консоли браузера. Теперь откройте эту консоль и введите команду:

```
mycomp.title = 'Веб-компоненты'
```

После нажатия клавиши Enter, метод **changed()** выведет на консоль следующую строку:

```
title Creaton Веб-компоненты
```

<br>

Отслеживаемые атрибуты можно использовать для определения состояния в компоненте, без необходимости определять состояние в классе, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp" message="Creaton" color="red"></my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      static attributes = ['message', 'color'] // отслеживаемые атрибуты

      // вызывается при изменении отслеживаемого атрибута
      static changed(name, oldValue, newValue) {
        // обновить HTML-содержимое компонента на основе нового состояния
        this.$update( { [name]: newValue } )
      }

      static render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)
  </script>
</body>
</html>
```

Как видно из этого примера, в нём нет определения состояния в классе:

```js
message = 'Creaton'
color = 'red'
```

Начальные значения состояния определяются в отслеживаемых атрибутах ***message*** и ***color***, как показано ниже:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp" message="Creaton" color="red"></my-component>
```

Назначение этих значений свойствам объекта состояния присходит в методе **changed()**, который вызывается каждый раз, при назначении/изменении значений отслеживаемым атрибутам:

```js
// вызывается при изменении отслеживаемого атрибута
static changed(name, oldValue, newValue) {
  // обновить HTML-содержимое компонента на основе нового состояния
  this.$update( { [name]: newValue } )
}
```

Внутри данного метода, вызывается специальный метод **$update()**, который в первом своём аргументе принимает объект и объединяет все его свойства со свойствами объекта состояния:

```js
// обновить HTML-содержимое компонента на основе нового состояния
this.$update( { [name]: newValue } )
```

Теперь откройте консоль браузера и введите команду:

```
mycomp.$update({ message: 'Веб-компоненты', color: 'green' })
```

Цвет и сообщение заголовка сразу же изменятся:

<h1 style="color: green;">Привет, Веб-компоненты!</h1>

Второй способ обновить HTML-содержимое компонента на основе нового значения состояния, это использование специального свойства **$props**, которое применяется для быстрого доступа ко всем атрибутам компонента.

Введите в консоли браузера команду:

```
mycomp.$props.color = 'blue'
```

Цвет заголовка сразу же изменится:

<h1 style="color: blue;">Привет, Веб-компоненты!</h1>

Специальные методы и свойства будут рассмотрены в следующем разделе. Все они начинаются со знака доллара и определяются на внутреннем уровне компонента.

<br>

Статические методы **connected()**, **disconnected()** и **adopted()** - являются сокращёнными аналогами методов [connectedCallback(), disconnectedCallback() и adoptedCallback()](https://learn.javascript.ru/custom-elements).

Они вызываются при добавлении компонента в документ - метод **connected()**; удалении компонента из документа - метод **disconnected()**; и при перемещении компонента в новый документ - метод **adopted()**.

К наиболее часто применяемым методам, можно отнести метод **connected()**, который позволяет обратиться к HTML-содержимому компонента, после его добавления в [DOM](https://learn.javascript.ru/dom-nodes), например, добавить элементу событие:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль элемент породивший событие
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

<br>

Статические методы **before()** и **after()** вызываются *Перед* и *После* обновления DOM компонента, с помощью специального метода **$update()**, например:

```js
static before() {
  console.time('Update')
}

static after() {
  console.timeEnd('Update')
}
```

Данный пример показывает, за сколько времени обновляется DOM компонента.

Другим наглядным примером является использование метода **before()** для проверки типа нового значения состояния:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      name = 'Иван'
      age = 32

      // вызывается перед обновлением DOM компонента
      static before() {
        // если значение не является числом, то сгенерировать ошибку
        if (typeof this.age !== 'number') {
          throw new Error('Значение должно быть числом...')
        }
      }

      static render() {
        return `
          <p>Имя: ${this.name}</p>
          <p>Возраст: ${this.age}</p>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)
  </script>
</body>
</html>
```

Если ввести в консоли браузера команду:

```
mycomp.$update({ age: 'тридцать пять' })
```

то будет получено сообщение об ошибке:

```
Error: Значение должно быть числом...
```

<br>
<br>
<h2 id="special-properties">Специальные свойства</h2>

<br>

В отличие от методов и свойств определяемых пользователем в классе компонента, специальные методы и свойства определяются на внутреннем уровне компонента и всегда начинаются со знака доллара. Не рекомендуется давать состояниям имена, совпадающие с именами специальных свойств. Это может приводить к ошибкам.

Свойство **$shadow** возвращает [Теневой DOM](https://learn.javascript.ru/shadow-dom) компонента, который создаётся если было определено статическое свойство **mode** в классе компонента:

```js
static mode = 'open' // добавить Теневой DOM
```

Однако, если компонент имеет закрытый Теневой DOM:

```js
static mode = 'closed' // добавить закрытый Теневой DOM
```

то свойство **$shadow** возвращает значение «null», как показано ниже:

```
mycomp.$shadow
null
```

<br>

Свойство **$light** возвращает значение Истина, если компонент не содержит [Теневой DOM](https://learn.javascript.ru/shadow-dom), иначе оно возвращает значение Ложь, например:

```
mycomp.$light
true
```

<br>

Свойство **$host** возвращает ссылку на сам компонент, если компонент имеет открытый Теневой DOM. Если компонент имеет закрытый Теневой DOM или создаётся без него, то данное свойство возвращает значение «undefined», как показано ниже:

```
mycomp.$host
undefined
```

<br>

Свойство **$props** позволяет быстро устанавливать и получать значения атрибутов компонента. Для закрытых компонентов, вызов этого свойства извне статических методов, возвращает значение «undefined».

Добавьте компоненту атрибут ***title***, как показано ниже:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp" title="Creaton"></my-component>
```

Чтобы получить значение атрибута ***title***, введите в консоли браузера команду:

```
mycomp.$props.title
```

Чтобы установить новое значение этому атрибуту, введите команду:

```
mycomp.$props.title = 'Веб-компоненты'
```

<br>

Свойство **$state** позволяет получить/установить значение любого состояния напрямую. Для закрытых компонентов, вызов этого свойства извне статических методов, возвращает значение «undefined».

Чтобы получить значение состояния **message**, введите в консоли браузера команду:

```
mycomp.$state.message
```

Чтобы изменить это состояние, введите команду:

```
mycomp.$state.message = 'Веб-компоненты'
```

Обновление состояния, не означает автоматическое обновление DOM компонента. Для обновления DOM, необходимо будет вызвать специальный метод **$update()** без аргументов:

```
mycomp.$update()
```

<br>

Все рассмотренные ранее пользовательские и статические методы класса компонента, выполняются в контексте объекта состояния, на который ссылается свойство **$state**. Данный объект представляет собой [прокси](https://learn.javascript.ru/proxy). Это означает, что если запрашиваемого состояния нет в данном объекте, то происходит поиск запрашиваемого свойства в самом компоненте. Однако, запись нового значения, всегда происходит в объект состояния.

Благодаря этому, из объекта состояния можно получить доступ к любому свойству компонента, такому, например, как свойство [attributes](https://developer.mozilla.org/ru/docs/Web/API/Element/attributes):


```
mycomp.$state.attributes['id'].value
```

Это относится и ко всем методам, которые выполняются в контексте объекта состояния, таким, например, как статический метод **render()**, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      static render() {
        return `
          <h1>Привет, ${ this.message } 
            от компонента ${this.attributes['id'].value.toUpperCase()}!</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)
  </script>
</body>
</html>
```

<br>

Метод **$update()** используется для обновления DOM, на основе новых значений состояния компонента. Он может принимать один аргумент в виде объекта. Для закрытых компонентов, вызов этого метода извне статических методов, не влияет на изменение DOM и состояние компонента.

Значения свойств этого объекта становятся новыми значениями состояний, например:

```
mycomp.$update({ message: 'Веб-компоненты', color: 'green' })
```

При вызове этого метода без аргументов, объект состояния не изменяется и происходит просто перерисовка DOM компонента:

```
mycomp.$update()
```

Кроме этого, метод **$update()** является асинхронным и возвращает [промис](https://learn.javascript.ru/promise-basics), значением которого будет строка, показывающая количество миллисекунд за которое произошло полное обновление DOM компонента, например:

```
await mycomp.$update({ message: 'Веб-компоненты', color: 'green' })
'1 ms'
```

В первой версии плагина использовалась простая замена старого DOM на новый. Во второй версии Creaton применяется принцип соответствия, основанный на сравнении старого DOM с новым. Если находится несоответствие, то значение в старом DOM заменяется новым [узлом](https://learn.javascript.ru/dom-nodes#drugie-tipy-uzlov).

Это позволяет не терять события, назначаемые элементам с помощью метода [addEventListener()](https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener) и не перегружать браузер ненужной перерисовкой всего HTML-содержимого компонента.

<br>

Метод **$()**  является сокращённым аналогом метода [querySelector()](https://learn.javascript.ru/searching-elements-dom#querySelector) и применяется для быстрого доступа к элементу DOM компонента. Для закрытых компонентов, вызов этого метода извне статических методов, возвращает значение «null».

Например, для назначения слушателя события:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль элемент породивший событие
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

Метод **$$()**  является сокращённым аналогом метода [querySelectorAll()](https://learn.javascript.ru/searching-elements-dom#querySelectorAll) и применяется для быстрого доступа к элементу DOM компонента. Для закрытых компонентов, вызов этого метода извне статических методов, возвращает значение «null».

Например, для перебора коллекции элементов:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль все элементы параграфов
  this.$$('p').forEach(elem => console.log(elem))
}
```

<br>

Метод **$tag** является [теговой функцией](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals#%D1%82%D0%B5%D0%B3%D0%BE%D0%B2%D1%8B%D0%B5_%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%8B), которая автоматически добавляет массивам метод **join()** для удаления запятых между элементами, а все остальные вычисляемые значения выводятся как есть:

```js
class MyComponent {
  colors = ['красный', 'зелёный', 'синий']

  static render() {
    return this.$tag`
      <ul>
        ${ this.colors.map(col => `<li>${ col }</li>`) }
      </ul>
    `
  }
}
```

<br>

Метод **$event()** применяется для создания пользовательских событий, позволяющих различным компонентам взаимодействовать между собой, а метод **\$route()** используется для построения маршрутизации. Они будут рассмотрены позже, поскольку требуют для своего пояснения отдельных глав.

<br>
<br>
<h2 id="general-methods">Общие методы</h2>

<br>

Кроме состояния, объекты классов могут иметь и методы, например:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp1"></my-component>

  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp2"></my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      // метод объекта класса
      printHello() {
        return `Привет, ${ this.message }!`
      }

      static render() {
        return `
          <h1>${ this.printHello() }</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)
  </script>
</body>
</html>
```

В данном примере был определён метод **printHello()** объекта класса MyComponent, который просто выводит приветственное сообщение для всех компонентов этого типа.

Чтобы не создавать для разного типа компонентов одинаковые методы, можно создать для общих методов отдельный класс, а затем, наследовать классы компонентов от этого класса методов, как показано ниже: 

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- монтировать компонент NewComponent -->
  <new-component id="newcomp"></new-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать класс Methods для хранения общих методов
    class Methods {
      printHello() {
        return `Привет, ${ this.message }!`
      }
    }

    // наследовать класс MyComponent от класса Methods
    class MyComponent extends Methods {
      message = 'Creaton'
      color = 'red'

      static mode = 'open'

      static render() {
        return `
          <h1>${ this.printHello() }</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // наследовать класс NewComponent от класса Methods
    class NewComponent extends Methods {
      message = 'NewComponent'

      static render() {
        return `
          <h2>${ this.printHello() }</h2>
        `
      }
    }

    // передать классы компонентов в плагин Creaton
    Creaton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="cycles">Циклы</h2>

<br>

Для вывода массивов в [шаблонных строках](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals), применяются методы [map()](https://learn.javascript.ru/array-methods#map) и [join()](https://learn.javascript.ru/array-methods#split-i-join), как показано ниже:

```js
class MyComponent {
  colors = ['красный', 'зелёный', 'синий']

  static render() {
    return `
      <ul>
        ${ this.colors.map(col => `<li>${ col }</li>`).join('') }
      </ul>
    `
  }
}
```

Методу **join()** передаётся пустая строка для удаления запятых между элементами отображаемого массива.

Чтобы выводить массивы без использования метода **join()** в разметке содержимого компонента, шаблонную строку можно передать специальной [теговой функции](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals#%D1%82%D0%B5%D0%B3%D0%BE%D0%B2%D1%8B%D0%B5_%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%8B) **$tag**, которая автоматически добавляет массивам метод **join()**, а все остальные вычисляемые значения выводятся как есть:

```js
class MyComponent {
  colors = ['красный', 'зелёный', 'синий']

  static render() {
    return this.$tag`
      <ul>
        ${ this.colors.map(col => `<li>${ col }</li>`) }
      </ul>
    `
  }
}
```

<br>

Аналогичным образом можно выводить и объекты, используя для этого метод [Object.keys()](https://learn.javascript.ru/keys-values-entries), например:

```js
class MyComponent {
  user = {
    name: 'Иван',
    age: 32
  }

  static render() {
    return this.$tag`
      <ul>
        ${ Object.keys(this.user).map(key => `<li>${ key }: ${ this.user[key] }</li>`) }
      </ul>
    `
  }
}
```

<br>
<br>
<h2 id="styles">Стили</h2>

<br>

Для создания [локальных стилей](https://learn.javascript.ru/shadow-dom-style), компоненту необходимо добавить [Теневой DOM](https://learn.javascript.ru/shadow-dom) с помощью статического свойства **mode**, как показано ниже:

```js
class MyComponent {
  message = 'Creaton'
  color = 'red'

  static mode = 'open' // добавить Теневой DOM

  static render() {
    return `
      <h1>Привет, ${ this.message }!</h1>
      
      <style>
        h1 {
          color: ${ this.color };
        }
      </style>
    `
  }
}
```

<br>
<br>
<h2 id="slots">Слоты</h2>

<br>

Для работы со [слотами](https://learn.javascript.ru/slots-composition), компоненту необходимо добавить [Теневой DOM](https://learn.javascript.ru/shadow-dom) с помощью статического свойства **mode**, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component>
    <span slot="username">Иван</span>
    <span slot="age">32</span>
    <span>Трудолюбивый</span>
  </my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать класс компонента MyComponent
    class MyComponent {
      static mode = 'open' // добавить Теневой DOM

      static render() {
        return `
          <div>
            Имя: <slot name="username"></slot>
          </div>
          
          <div>
            Возраст: <slot name="age"></slot>
          </div>

          <div>
            Характер: <slot><slot>
          </div>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="events">События</h2>

<br>

Для взаимодействия между различными компонентами, применяется усовершенствованный механизм [пользовательских событий](https://learn.javascript.ru/dispatch-events). Этот механизм подразумевает использование метода **event()** плагина Creaton и специального метода **$event()**, который доступен в каждом компоненте.

Когда метод **event()** плагина Creaton вызывается как конструктор, то он возвращает новый [фрагмент документа](https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment), который является источником и получателем пользовательских событий. А когда этот метод вызывается не как конструктор, то он работает аналогично специальному методу **$event()**. Это позволяет связывать компоненты не только между собой, но и с любым внешним кодом.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- монтировать компонент NewComponent -->
  <new-component id="newcomp"></new-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать элемент события myEvent
    const myEvent = new Creaton.event()

    // создать класс компонента NewComponent
    class NewComponent {
      colors = ['красный', 'зелёный', 'синий']

      static render() {
        return `
          <ul>
            ${ this.colors.map(col => `<li>${ col }</li>`).join('') }
          </ul>
        `
      }

      static connected() {
        // добавить элементу myEvent обработчик события "reverse"
        myEvent.addEventListener('reverse', () => {
          this.colors.reverse() // обратить массив

          // обновить DOM компонента
          this.$update()
        })
      }
    }

    // создать класс компонента MyComponent
    class MyComponent {
      static render() {
        return `
          <button id="btn-reverse">Обратить массив</button>
        `
      }

      static connected() {
        // добавить для кнопки обработчик события "click"
        this.$('#btn-reverse').addEventListener('click', () => {
          // вызвать событие "reverse" для элемента myEvent
          this.$event(myEvent, 'reverse')
        })
      }
    }

    // передать классы компонентов в плагин Creaton
    Creaton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

В данном примере, вначале создаётся новый элемент события myEvent:

```js
// создать элемент события myEvent
const myEvent = new Creaton.event()
```

Этому элементу будут назначаться обработчики пользовательских событий в одних компонентах и вызываться в других.

В статическом методе **connected()** класса компонента NewComponent происходит назначение элементу myEvent обработчика для пользовательского события *"reverse"*. Внутри этого обработчика происходит обращение массива и обновление DOM компонента:

```js
static connected() {
  // добавить элементу myEvent обработчик события "reverse"
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // обратить массив

    // обновить DOM компонента
    this.$update()
  })
}
```

В статическом методе **connected()** класса компонента MyComponent кнопке добавляется обработчик события *"click"*, внутри которого, происходит вызов события *"reverse"* для элемента myEvent, как показано ниже:

```js
static connected() {
  // добавить для кнопки обработчик события "click"
  this.$('#btn-reverse').addEventListener('click', () => {
    // вызвать событие "reverse" для элемента myEvent
    this.$event(myEvent, 'reverse')
  })
}
```

В первом аргументе специального метода **$event()** передаётся элемент события myEvent, а во втором, название вызываемого события:

```js
this.$event(myEvent, 'reverse')
```

Метод **$event()** может получать и третий аргумент, в котором можно передать параметры, полностью соответствующие параметрам конструктора [CustomEvent](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya). Например, можно передать свойство **detail**, которое позволяет обмениваться данными между компонентами.

<br>

Добавьте в статический метод **connected()** компонента NewComponent новый обработчик события *"new-colors"*, как показано ниже:

```js
static connected() {
  // добавить элементу myEvent обработчик события "reverse"
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // обратить массив

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myEvent обработчик события "new-colors"
  myEvent.addEventListener('new-colors', event => {
    this.colors = event.detail // присвоить новый массив

    // обновить DOM компонента
    this.$update()
  })
}
```

Обратите внимание, что в обработчике этого события появился параметр **event**, через который можно получить доступ к свойству **detail**. Кроме этого, в названия пользовательских событий рекомендуется добавлять дефис, чтобы они не пересекались с названиями стандартных событий.

Теперь внесите изменения в разметку компонента MyComponent, добавив ему новую кнопку:

```js
static render() {
  return `
    <button id="btn-reverse">Обратить массив</button>
    <button id="btn-new">Новый массив</button>
  `
}
```

и обработчик события *"click"*, внутри которого, в обработчик события *"new-colors"* передаётся новый массив цветов:

```js
static connected() {
  // добавить для кнопки обработчик события "click"
  this.$('#btn-reverse').addEventListener('click', () => {
    // вызвать событие "reverse" для элемента myEvent
    this.$event(myEvent, 'reverse')
  })

  // добавить для кнопки обработчик события "click"
  this.$('#btn-new').addEventListener('click', () => {
    // вызвать событие "new-colors" для элемента myEvent
    this.$event(myEvent, 'new-colors', {
      // передать в обработчик события новый массив
      detail: ['синий', 'оранжевый', 'фиолетовый', 'золотой']
    })
  })
}
```

Таким образом, можно легко обмениваться данными между различными компонентами.

<br>

Для демонстрации взаимодействия компонентов с внешним кодом, добавьте в разметку файла *index.html* кнопку для очистки массива:

```html
<!-- монтировать компонент MyComponent -->
<my-component id="mycomp"></my-component>

<!-- монтировать компонент NewComponent -->
<new-component id="newcomp"></new-component>

<!-- кнопка очистки массива -->
<button id="btn-clear">Очистить массив</button>
```

Добавьте в статический метод **connected()** компонента NewComponent новый обработчик события *"clear-colors"*, как показано ниже:

```js
static connected() {
  // добавить элементу myEvent обработчик события "reverse"
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // обратить массив

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myEvent обработчик события "new-colors"
  myEvent.addEventListener('new-colors', event => {
    this.colors = event.detail // присвоить новый массив

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myEvent обработчик события "clear-colors"
  myEvent.addEventListener('clear-colors', event => {
    this.colors.length = 0 //  очистить массив

    // обновить DOM компонента
    this.$update()
  })
}
```

и обработчик события *"click"* для новой кнопки:

```js
// добавить для кнопки обработчик события "click"
document.querySelector('#btn-clear').addEventListener('click', () => {
  // вызвать событие "clear-colors" для элемента myEvent
  Creaton.event(myEvent, 'clear-colors')
})

// передать классы компонентов в плагин Creaton
Creaton(MyComponent, NewComponent)
```

Внутри этого обработчика, событие *"clear-colors"* для элемента myEvent вызывается с помощью метода **event()** самого плагина:

```js
// вызвать событие "clear-colors" для элемента myEvent
Creaton.event(myEvent, 'clear-colors')
```

а не специального метода **$event()**, который доступен только в компонентах, но по своей сути, просто является ссылкой на метод **event()** плагина Creaton.

Ниже представлено полное содержимое файла *index.html*:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component id="mycomp"></my-component>

  <!-- монтировать компонент NewComponent -->
  <new-component id="newcomp"></new-component>

  <!-- кнопка очистки массива -->
  <button id="btn-clear">Очистить массив</button>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать элемент события myEvent
    const myEvent = new Creaton.event()

    // создать класс компонента NewComponent
    class NewComponent {
      colors = ['красный', 'зелёный', 'синий']

      static render() {
        return `
          <ul>
            ${ this.colors.map(col => `<li>${ col }</li>`).join('') }
          </ul>
        `
      }

      static connected() {
        // добавить элементу myEvent обработчик события "reverse"
        myEvent.addEventListener('reverse', () => {
          this.colors.reverse() // обратить массив

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myEvent обработчик события "new-colors"
        myEvent.addEventListener('new-colors', event => {
          this.colors = event.detail // присвоить новый массив

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myEvent обработчик события "clear-colors"
        myEvent.addEventListener('clear-colors', event => {
          this.colors.length = 0 //  очистить массив

          // обновить DOM компонента
          this.$update()
        })
      }
    }

    // создать класс компонента MyComponent
    class MyComponent {
      static render() {
        return `
          <button id="btn-reverse">Обратить массив</button>
          <button id="btn-new">Новый массив</button>
        `
      }

      static connected() {
        // добавить для кнопки обработчик события "click"
        this.$('#btn-reverse').addEventListener('click', () => {
          // вызвать событие "reverse" для элемента myEvent
          this.$event(myEvent, 'reverse')
        })

        // добавить для кнопки обработчик события "click"
        this.$('#btn-new').addEventListener('click', () => {
          // вызвать событие "new-colors" для элемента myEvent
          this.$event(myEvent, 'new-colors', {
            // передать в обработчик события новый массив
            detail: ['синий', 'оранжевый', 'фиолетовый', 'золотой']
          })
        })
      }
    }

    // добавить для кнопки обработчик события "click"
    document.querySelector('#btn-clear').addEventListener('click', () => {
      // вызвать событие "clear-colors" для элемента myEvent
      Creaton.event(myEvent, 'clear-colors')
    })

    // передать классы компонентов в плагин Creaton
    Creaton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="routes">Маршруты</h2>

<br>

Для создания маршрутизации, применяется усовершенствованный механизм [пользовательских событий](https://learn.javascript.ru/dispatch-events). Этот механизм подразумевает использование метода **route()** плагина Creaton и специального метода **$route()**, который доступен в каждом компоненте.

Когда метод **route()** плагина Creaton вызывается как конструктор, то он возвращает новый [фрагмент документа](https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment), который является источником и получателем пользовательских событий. А когда этот метод вызывается не как конструктор, то он работает аналогично специальному методу **$route()**. Это позволяет связывать компоненты участвующие в маршрутизации не только между собой, но и с любым внешним кодом.

В отличие от метода **event()**, вызываемый как конструктор метод **route()** возвращает фрагменты документа с усовершенствованным методом [addEventListener()](https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener), что позволяет в названиях событий использовать символы регулярных выражений.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyMenu -->
  <my-menu></my-menu>

  <!-- монтировать компонент MyContent -->
  <my-content></my-content>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать элемент события myRoute
    const myRoute = new Creaton.route()

    // создать класс компонента myHome
    class myHome {
      static render() {
        return `
          <h2>Главная</h2>
        `
      }
    }

    // создать класс компонента myAbout
    class myAbout {
      static render() {
        return `
          <h2>О нас</h2>
        `
      }
    }

    // создать класс компонента myContacts
    class myContacts {
      static render() {
        return `
          <h2>Контакты</h2>
        `
      }
    }

    // создать класс компонента MyMenu
    class MyMenu {
      static render() {
        return `
          <nav>
            <a href="/">Главная</a>
            <a href="/about">О нас</a>
            <a href="/contacts">Контакты</a>
          </nav>
        `
      }

      static connected() {
        // добавить для элемента NAV обработчик события "click"
        this.$('nav').addEventListener('click', event => {
          // отменить переход по ссылке
          event.preventDefault()

          // вызвать событие адреса ссылки для элемента myRoute
          this.$route(myRoute, event.target.href)
        })
      }
    }

    // создать класс компонента MyContent
    class MyContent {
      page = 'my-home' // начальное значение состояния

      static render() {
        return `
          <${this.page} />
        `
      }

      static connected() {
        // добавить элементу myRoute обработчик события "/"
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myRoute обработчик события "/about"
        myRoute.addEventListener('/about', () => {
          this.page = 'my-about' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myRoute обработчик события "/contacts"
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })
      }
    }

    // передать классы компонентов в плагин Creaton
    Creaton(myHome, myAbout, myContacts, MyMenu, MyContent)
  </script>
</body>
</html>
```

Для работы с маршрутизацией, нам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

Установите данный сервер с помощью команды в терминале:

```
npm install --global lite-server
```

Теперь перейдите в каталог *app* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
lite-server
```

После этого откроется окно браузера по умолчанию, в котором будет отображаться созданное выше приложение.

<br>

В данном примере, вначале создаётся новый элемент события myRoute:

```js
// создать элемент события myRoute
const myRoute = new Creaton.route()
```

Этому элементу будут назначаться обработчики адресных событий в одних компонентах и вызываться в других.

Затем у нас происходит определение трёх компонентов страниц:

```js
// создать класс компонента myHome
class myHome {
  static render() {
    return `
      <h2>Главная</h2>
    `
  }
}

// создать класс компонента myAbout
class myAbout {
  static render() {
    return `
      <h2>О нас</h2>
    `
  }
}

// создать класс компонента myContacts
class myContacts {
  static render() {
    return `
      <h2>Контакты</h2>
    `
  }
}
```

После создания компонентов страниц, создаётся компонент главного меню:

```js
// создать класс компонента MyMenu
class MyMenu {
  static render() {
    return `
      <nav>
        <a href="/">Главная</a>
        <a href="/about">О нас</a>
        <a href="/contacts">Контакты</a>
      </nav>
    `
  }

  static connected() {
    // добавить для элемента NAV обработчик события "click"
    this.$('nav').addEventListener('click', event => {
      // отменить переход по ссылке
      event.preventDefault()

      // вызвать событие адреса ссылки для элемента myRoute
      this.$route(myRoute, event.target.href)
    })
  }
}
```

Этот компонент монтируется первым в приложении:

```html
<!-- монтировать компонент MyMenu -->
<my-menu></my-menu>
```

В статическом методе **connected()** класса компонента MyMenu элементу NAV добавляется обработчик события *"click"*, внутри которого, приостанавливается переход по ссылке и вызывается адресное событие для элемента myRoute, как показано ниже:

```js
static connected() {
  // добавить для элемента NAV обработчик события "click"
  this.$('nav').addEventListener('click', event => {
    // отменить переход по ссылке
    event.preventDefault()

    // вызвать событие адреса ссылки для элемента myRoute
    this.$route(myRoute, event.target.href)
  })
}
```

В качестве названия адресного события, во втором аргументе метода **$route()** передаётся содержимое атрибута ***href*** ссылки, по которой был произведён щелчок:

```js
// вызвать событие адреса ссылки для элемента myRoute
this.$route(myRoute, event.target.href)
```

Как и при работе с пользовательскими событиями, методу **$route()** можно передать в третьем аргументе объект со свойством **detail**, в котором обработчикам передаются какие-то данные, например:

```js
// вызвать событие адреса ссылки для элемента myRoute
this.$route(myRoute, event.target.href, {
  // передать в обработчик события новый массив
  detail: ['синий', 'оранжевый', 'фиолетовый', 'золотой']
})
```

Важным отличием от пользовательских событий является то, что передаваемые в адресные события данные должны поддаваться сериализации и их размер не должен превышать 16 MiB. Т.е. эти данные должны соответствовать параметру **state** метода [pushState()](https://developer.mozilla.org/ru/docs/Web/API/History/pushState).

<br>

Последним в приложении определяется компонент для вывода страниц: 

```js
// создать класс компонента MyContent
class MyContent {
  page = 'my-home' // начальное значение состояния

  static render() {
    return `
      <${this.page} />
    `
  }

  static connected() {
    // добавить элементу myRoute обработчик события "/"
    myRoute.addEventListener('/', () => {
      this.page = 'my-home' // присвоить значение

      // обновить DOM компонента
      this.$update()
    })

    // добавить элементу myRoute обработчик события "/about"
    myRoute.addEventListener('/about', () => {
      this.page = 'my-about' // присвоить значение

      // обновить DOM компонента
      this.$update()
    })

    // добавить элементу myRoute обработчик события "/contacts"
    myRoute.addEventListener('/contacts', () => {
      this.page = 'my-contacts' // присвоить значение

      // обновить DOM компонента
      this.$update()
    })
  }
}
```

Этот компонент монтируется последним в приложении:

```html
<!-- монтировать компонент MyContent -->
<my-content></my-content>
```

В самом начале класса этого компонента, определяется начальное значение состояния **page**, как показано ниже:

```js
page = 'my-home' // начальное значение состояния
```

Оно соответствует названию компонента страницы myHome:

```js
// создать класс компонента myHome
class myHome {
  static render() {
    return `
      <h2>Главная</h2>
    `
  }
}
```

В HTML-разметке компонента MyContent происходит создание компонента myHome с помощью самозакрывающегося тега:

```js
static render() {
  return `
    <${this.page} />
  `
}
```

Этот пример можно переписать с использованием открывающего и закрывающего тегов:

```js
static render() {
  return `
    <${this.page}></${this.page}>
  `
}
```

Такой способ используется, когда необходимо, например, передать HTML-содержимое в [слоты](https://learn.javascript.ru/slots-composition):

```js
static render() {
  return `
    <${this.page}>
      <span slot="username">Иван</span>
      <span slot="age">32</span>
    </${this.page}>
  `
}
```

В статическом методе **connected()** компонента MyContent происходит назначение трёх обработчиков для элемента myRoute, как показано ниже:

```js
static connected() {
  // добавить элементу myRoute обработчик события "/"
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/about"
  myRoute.addEventListener('/about', () => {
    this.page = 'my-about' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/contacts"
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })
}
```

Внутри каждого обработчика происходит присвоение состоянию **page** нового значения, соответствующего адресу страницы, на котором сработал данный обработчик, например:

```js
this.page = 'my-about' // присвоить значение
```

Этот обработчик сработает, если адрес страницы соответствует */about*.

В конце каждого обработчика, происходит обновление DOM компонента MyContent:

```js
// обновить DOM компонента
this.$update()
```

Если начальное значение состояния **page** не будет соответствовать названию компонента, например:

```js
page = '' // начальное значение состояния
```

или если предполагается открытие приложения не с главной страницы, а, например, со страницы */about* или любой другой, то рекомендуется добавить в конец статического метода **connected()** компонента MyContent, вызов адресного события для элемента myRoute. Таким образом, маршрутизация будет срабатывать сразу после подключения компонента.

При этом, во втором аргументе методу **$route()** передаётся свойство **href** объекта [location](https://developer.mozilla.org/ru/docs/Web/API/Location), как показано ниже:


```js
static connected() {
  // добавить элементу myRoute обработчик события "/"
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/about"
  myRoute.addEventListener('/about', () => {
    this.page = 'my-about' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/contacts"
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // вызвать событие адреса страницы для элемента myRoute
  this.$route(myRoute, location.href)
}
```

<br>

Для элементов событий, созданных с помощью метода **route()** плагина Creaton, допускается использование символов [регулярных выражений](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp) в названии событий создаваемых методом **addEventListener()**, например:

```js
// добавить элементу myRoute обработчик события "/abo\\w+"
myRoute.addEventListener('/abo\\w+', () => {
  this.page = 'my-about' // присвоить значение

  // обновить DOM компонента
  this.$update()
})
```

В данном примере, обработчик будет вызываться для всех страниц, которые начинаются с */abo*.

Важной особенностью создания регулярных выражений в строке является то, что специальные символы необходимо экранировать дважды:

```js
'/abo\\w+'
```

вместо:

```js
'/abo\w+'
```

На внутреннем уровне, такая строка преобразуется в регулярное выражение следующего вида:

```js
/\/abo\w+/
```

<br>

Все обработчики поддерживают [параметры маршрутов](https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/routes#%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B_%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%BE%D0%B2). Добавьте в HTML-разметку компонента MyMenu новую ссылку:

```js
static render() {
  return `
    <nav>
      <a href="/">Главная</a>
      <a href="/about">О нас</a>
      <a href="/contacts">Контакты</a>
      <a href="/ivan/32">Иван</a>
    </nav>
  `
}
```

Создайте новый компонент страницы myUsers:

```js
// создать класс компонента myUsers
class myUsers {
  static mode = 'open' // добавить Теневой DOM
  
  static render() {
    return `
      <slot name="user"></slot>
      <slot name="age"></slot>
    `
  }
}
```

Поскольку этот компонент будет получать в [слоты](https://learn.javascript.ru/slots-composition) HTML-содержимое извне, необходимо было добавить ему [Теневой DOM](https://learn.javascript.ru/shadow-dom), как показано ниже:

```js
static mode = 'open' // добавить Теневой DOM
```

Передайте класс нового компонента в плагин Creaton:

```js
// передать классы компонентов в плагин Creaton
Creaton(myHome, myAbout, myContacts, MyMenu, MyContent, myUsers)
```

Внесите изменения в разметку компонента MyContent, добавив вывод HTML-содержимого в именованные слоты с помощью атрибута [slot](https://learn.javascript.ru/slots-composition#imenovannye-sloty), как показано ниже:

```js
static render() {
  return `
    <${this.page}>
      <p slot="user">${this.user}</p>
      <p slot="age">${this.age}</p>
    </${this.page}>
  `
}
```

Для всех остальных компонентов страниц, кроме компонента myUsers, содержимое, передаваемое в слоты, будет проигнорировано.

Осталось добавить обработчик для этого адресного события в конце статического метода **connected()** компонента MyContent:

```js
static connected() {
  // добавить элементу myRoute обработчик события "/"
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/about"
  myRoute.addEventListener('/abo\\w+', () => {
    this.page = 'my-about' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/contacts"
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/:user/:age"
  myRoute.addEventListener('/:user/:age', event => {
    this.page = 'my-users' // название компонента
    this.user = event.params.user // имя пользователя
    this.age = event.params.age // возраст пользователя

    // обновить DOM компонента
    this.$update()
  })
}
```

Параметры задаются в названии обрабатываемого события с помощью символа «:». В примере выше, было задано два параметра: ***:user*** и ***:age***. Они доступны внутри обработчика через свойство **params** объекта [event](https://learn.javascript.ru/introduction-browser-events#obekt-sobytiya), как показано ниже:

```js
this.user = event.params.user // имя пользователя
this.age = event.params.age // возраст пользователя
```

<br>

Кроме параметров маршрутов, обработчики позволяют работать и с параметрами запросов. Добавьте в HTML-разметку компонента MyMenu новую ссылку:

```js
static render() {
  return `
    <nav>
      <a href="/">Главная</a>
      <a href="/about">О нас</a>
      <a href="/contacts">Контакты</a>
      <a href="/ivan/32">Иван</a>
      <a href="/ivan?age=32">Возраст</a>
    </nav>
  `
}
```

Добавьте последний обработчик для этого адресного события в конце статического метода **connected()** компонента MyContent:

```js
static connected() {
  // добавить элементу myRoute обработчик события "/"
  myRoute.addEventListener('/', () => {
    this.page = 'my-home' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/about"
  myRoute.addEventListener('/abo\\w+', () => {
    this.page = 'my-about' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/contacts"
  myRoute.addEventListener('/contacts', () => {
    this.page = 'my-contacts' // присвоить значение

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/:user/:age"
  myRoute.addEventListener('/:user/:age', event => {
    this.page = 'my-users' // название компонента
    this.user = event.params.user // имя пользователя
    this.age = event.params.age // возраст пользователя

    // обновить DOM компонента
    this.$update()
  })

  // добавить элементу myRoute обработчик события "/:user\\?age=32"
  myRoute.addEventListener('/:user\\?age=32', event => {
    this.page = 'my-users' // название компонента
    this.user = event.params.user // имя пользователя
    this.age = event.url.searchParams.get('age') // возраст пользователя
    
    // обновить DOM компонента
    this.$update()
  })
}
```

Для доступа к параметрам запроса, используется свойство [url](https://learn.javascript.ru/url) объекта [event](https://learn.javascript.ru/introduction-browser-events#obekt-sobytiya). Оно содержит свойство [searchParams](https://learn.javascript.ru/url#searchparams), которое предоставляет удобные методы для работы с параметрами запросов, одним из которых является метод **get()**, как показано ниже:

```js
this.age = event.url.searchParams.get('age') // возраст пользователя
```

<br>

Для демонстрации взаимодействия обработчиков адресных событий с внешним кодом, вместо компонента MyMenu добавьте в разметку файла *index.html* элемент NAV главного меню:

```html
<!-- Главное меню -->
<nav id="mymenu">
  <a href="/">Главная</a>
  <a href="/about">О нас</a>
  <a href="/contacts">Контакты</a>
  <a href="/ivan/32">Иван</a>
  <a href="/ivan?age=32">Возраст</a>
</nav>

<!-- монтировать компонент MyContent -->
<my-content></my-content>
```

Добавьте обработчик события *"click"* для этого меню:

```js
// добавить для элемента NAV обработчик события "click"
document.querySelector('#mymenu').addEventListener('click', () => {
  // отменить переход по ссылке
  event.preventDefault()

  // вызвать событие адреса ссылки для элемента myRoute
  Creaton.route(myRoute, event.target.href)
})

// передать классы компонентов в плагин Creaton
Creaton(myHome, myAbout, myContacts, MyContent, myUsers)
```

Внутри этого обработчика, адресное событие для элемента myRoute вызывается с помощью метода **route()** самого плагина:

```js
// вызвать событие адреса ссылки для элемента myRoute
Creaton.route(myRoute, event.target.href)
```

а не специального метода **$route()**, который доступен только в компонентах, но по своей сути, просто является ссылкой на метод **route()** плагина Creaton.

Ниже представлено полное содержимое файла *index.html*:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- Главное меню -->
  <nav id="mymenu">
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
    <a href="/contacts">Контакты</a>
    <a href="/ivan/32">Иван</a>
    <a href="/ivan?age=32">Возраст</a>
  </nav>

  <!-- монтировать компонент MyContent -->
  <my-content></my-content>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script>
    // создать элемент события myRoute
    const myRoute = new Creaton.route()

    // создать класс компонента myHome
    class myHome {
      static render() {
        return `
          <h2>Главная</h2>
        `
      }
    }

    // создать класс компонента myAbout
    class myAbout {
      static render() {
        return `
          <h2>О нас</h2>
        `
      }
    }

    // создать класс компонента myContacts
    class myContacts {
      static render() {
        return `
          <h2>Контакты</h2>
        `
      }
    }

    // создать класс компонента myUsers
    class myUsers {
      static mode = 'open' // добавить Теневой DOM

      static render() {
        return `
          <slot name="user"></slot>
          <slot name="age"></slot>
        `
      }
    }

    // создать класс компонента MyContent
    class MyContent {
      page = '' // начальное значение состояния

      static render() {
        return `
          <${this.page}>
            <p slot="user">${this.user}</p>
            <p slot="age">${this.age}</p>
          </${this.page}>
        `
      }

      static connected() {
        // добавить элементу myRoute обработчик события "/"
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myRoute обработчик события "/about"
        myRoute.addEventListener('/abo\\w+', () => {
          this.page = 'my-about' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myRoute обработчик события "/contacts"
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myRoute обработчик события "/:user/:age"
        myRoute.addEventListener('/:user/:age', event => {
          this.page = 'my-users' // название компонента
          this.user = event.params.user // имя пользователя
          this.age = event.params.age // возраст пользователя

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myRoute обработчик события "/:user\\?age=32"
        myRoute.addEventListener('/:user\\?age=32', event => {
          this.page = 'my-users' // название компонента
          this.user = event.params.user // имя пользователя
          this.age = event.url.searchParams.get('age') // возраст пользователя
          
          // обновить DOM компонента
          this.$update()
        })

        // вызвать событие адреса страницы для элемента myRoute
        this.$route(myRoute, location.href)
      }
    }

    // добавить для элемента NAV обработчик события "click"
    document.querySelector('#mymenu').addEventListener('click', () => {
      // отменить переход по ссылке
      event.preventDefault()

      // вызвать событие адреса ссылки для элемента myRoute
      Creaton.route(myRoute, event.target.href)
    })

    // передать классы компонентов в плагин Creaton
    Creaton(myHome, myAbout, myContacts, MyContent, myUsers)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="ssr">SSR</h2>

<br>

[SSR](https://academy.yandex.com/journal/server-side-rendering) - это метод отрисовки веб-страницы на сервере, а не в браузере. Для реализации рендеринга Веб-компонентов, используется пакет [jsdom](https://github.com/jsdom/jsdom) - виртуализации DOM в JavaScript.

Перед тем, как переходить к рендерингу на сервере, давайте ознакомимся в браузере с функцией, которая за него отвечает.

Внесите изменения в файл *index.html*, как показано ниже:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component>
    <p>Веб-компоненты - это просто!</p>
  </my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script type="module">
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      static mode = 'open' // добавить Теневой DOM

      static render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
          <slot></slot>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)

    // выполнить рендеринг HTML-содержимого страницы
    const html = await Creaton.ssr()

    // вывести отрендеренное содержимое в консоль
    console.log(html)
  </script>
</body>
</html>
```

Метод **ssr()** плагина Creaton выполняет рендеринг HTML-содержимого страницы. Он возвращает промис, значением которого является строка, содержащая отрендеренное HTML-содержимое:

```js
// выполнить рендеринг HTML-содержимого страницы
const html = await Creaton.ssr()
```

которое будет выведено в консоль браузера:

```
<!DOCTYPE html>
<html lang="ru"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>

  
  <my-component>
          <h1>Привет, Creaton!</h1>
          
    <p>Веб-компоненты - это просто!</p>
  
          
          
        </my-component>

  
  

</body></html>
```

<br>

По умолчанию, метод **ssr()** удаляет все скрипты, стили, комментарии и теги &lt;template&gt; в возвращаемом HTML-содержимом.

Метод **ssr()** принимает один параметр - объект с тремя опциональными свойствами. Добавление свойства **clean** со значением "false":

```js
const html = await Creaton.ssr({ clean: false })
```

отменяет очистку по умолчанию, и всё содержимое выводится как есть:

```
<!DOCTYPE html>
<html lang="ru"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- монтировать компонент MyComponent -->
  <my-component>
          <h1>Привет, Creaton!</h1>
          
    <p>Веб-компоненты - это просто!</p>
  
          
          <style>
            h1 {
              color: red;
            }
          </style>
        </my-component>

  <!-- подключить плагин Creaton -->
  <script src="creaton.min.js"></script>

  <script type="module">
    // создать класс компонента MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      static mode = 'open' // добавить Теневой DOM

      static render() {
        return `
          <h1>Привет, ${ this.message }!</h1>
          <slot></slot>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // передать класс компонента MyComponent в плагин Creaton
    Creaton(MyComponent)

    // выполнить рендеринг HTML-содержимого страницы
    const html = await Creaton.ssr({ clean: false })

    // вывести отрендеренное содержимое в консоль
    console.log(html)
  </script>

</body></html>
```

<br>

По умолчанию, метод **ssr()** удаляет все [слоты](https://learn.javascript.ru/slots-composition). Но если добавить свойство **slots** со значением "true":

```js
const html = await Creaton.ssr({ slots: true })
```

то слоты будут выводиться в содержимое :

```
<h1>Привет, Creaton!</h1>
          <slot>
    <p>Веб-компоненты - это просто!</p>
  </slot>
```

<br>

По умолчанию, метод **ssr()** рендерит всю страницу целиком. Но ему можно добавить свойство **node** со значением равным узлу, с которого должен начинаться рендеринг:

```js
const html = await Creaton.ssr({ node: document.body })
```

Тогда в отрендеренное содержимое попадёт только этот узел и всё, что в нём находится:

```
<body>

  
  <my-component>
          <h1>Привет, Creaton!</h1>
          
    <p>Веб-компоненты - это просто!</p>
  
          
          
        </my-component>

  
  

</body>
```

<br>

Теперь можно переходить к теме рендеринга на сервере. Скачайте каталог [server](https://github.com/reacton-js/creaton/tree/main/server) и давайте рассмотрим его содержимое:

Подкаталог *public* содержит все статические файлы сервера, такие как стили, шрифты, изображения, скрипты и т. д.

В файле *bots.js* содержится массив с названиями известных ботов. Этот массив можно изменять по своему усмотрению:

```js
module.exports = [
  // Yandex
  'YandexBot', 'YandexAccessibilityBot', 'YandexMobileBot', 'YandexDirectDyn',

  // Google
  'Googlebot', 'Googlebot-Image', 'Mediapartners-Google', 'AdsBot-Google', 'APIs-Google',
  'AdsBot-Google-Mobile',

  // Other
  'Mail.RU_Bot', 'bingbot', 'Accoona', 'Lighthouse', 'ia_archiver', 'Ask Jeeves', 'OmniExplorer_Bot', 'W3C_Validator',
]
```

<br>

Файл *index.html* из каталога *server* является главным файлом приложения:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- монтировать компонент MyMenu -->
  <my-menu></my-menu>

  <!-- элемент Header -->
  <header>
    <img src="img/logo.jpg" alt="logo">
  </header>

  <!-- монтировать компонент MyContent -->
  <my-content></my-content>

  <!-- подключить плагин Creaton -->
  <script src="js/creaton.min.js"></script>

  <script>
    // создать элемент события myRoute
    const myRoute = new Creaton.route()

    // создать класс компонента myHome
    class myHome {
      static mode = 'open' // добавить Теневой DOM

      static render() {
        return `
          <h2>Главная</h2>
        `
      }
    }

    // создать класс компонента myAbout
    class myAbout {
      static mode = 'open' // добавить Теневой DOM

      static async render() {
        // получить данные через одну секунду после вызова метода
        const message = await new Promise(ok => setTimeout(() => ok('О нас'), 1000))

        return `
          <h2>${message}</h2>
        `
      }
    }

    // создать класс компонента myContacts
    class myContacts {
      static mode = 'open' // добавить Теневой DOM

      static render() {
        return `
          <h2>Контакты</h2>
        `
      }
    }

    // создать класс компонента MyMenu
    class MyMenu {
      static mode = 'open' // добавить Теневой DOM

      static render() {
        return `
          <nav>
            <a href="/">Главная</a>
            <a href="/about">О нас</a>
            <a href="/contacts">Контакты</a>
          </nav>
        `
      }

      static connected() {
        // добавить для элемента NAV обработчик события "click"
        this.$('nav').addEventListener('click', event => {
          // отменить переход по ссылке
          event.preventDefault()

          // вызвать событие адреса ссылки для элемента myRoute
          this.$route(myRoute, event.target.href)
        })
      }
    }

    // создать класс компонента MyContent
    class MyContent {
      page = 'my-home' // начальное значение состояния

      static mode = 'open' // добавить Теневой DOM

      static render() {
        return `
          <${this.page} />

          <style>
            :host {
              display: block;
              margin-top: 30px;
            }
          </style>
        `
      }

      static connected() {
        // добавить элементу myRoute обработчик события "/"
        myRoute.addEventListener('/', () => {
          this.page = 'my-home' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myRoute обработчик события "/about"
        myRoute.addEventListener('/about', () => {
          this.page = 'my-about' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })

        // добавить элементу myRoute обработчик события "/contacts"
        myRoute.addEventListener('/contacts', () => {
          this.page = 'my-contacts' // присвоить значение

          // обновить DOM компонента
          this.$update()
        })

        // вызвать событие адреса страницы для элемента myRoute
        this.$route(myRoute, location.href)
      }
    }

    // передать классы компонентов в плагин Creaton
    Creaton(myHome, myAbout, myContacts, MyMenu, MyContent)
  </script>
</body>
</html>
```

Этот файл представляет собой немного изменённый маршрутизатор из прошлой главы. Все компоненты имеют открытый [Теневой DOM](https://learn.javascript.ru/shadow-dom), поскольку компоненты с закрытым Теневым DOM не рендерятся.

Компонент MyContent имеет селектор [:host](https://learn.javascript.ru/shadow-dom-style#host) для стилизации элемента компонента:

```js
static render() {
  return `
    <${this.page} />

    <style>
      :host {
        display: block;
        margin-top: 30px;
      }
    </style>
  `
}
```

Кроме этого, компонент myAbout имитирует загрузку данных с сервера через одну секунду:

```js
static async render() {
  // получить данные через одну секунду после вызова метода
  const message = await new Promise(ok => setTimeout(() => ok('О нас'), 1000))

  return `
    <h2>${message}</h2>
  `
}
```

<br>

*Если вы планируете в будущем использовать асинхронные скрипты с типом [module](https://learn.javascript.ru/modules-intro) на странице своего приложения, то обратитесь к [руководству](https://github.com/jsdom/jsdom#asynchronous-script-loading) по jsdom.*

*Используйте в скриптах и компонентах для запросов объект [XMLHttpRequest](https://learn.javascript.ru/xmlhttprequest) вместо метода [fetch()](https://learn.javascript.ru/fetch), поскольку последний приводит к ошибкам при рендеринге.*

```js
// вместо метода fetch()
const response = await fetch('file.txt')
const file = await response.text()

// используйте объект XMLHttpRequest
const xhr = new XMLHttpRequest()
xhr.open('GET', 'file.txt')
xhr.send()
const file = await new Promise(ok => xhr.onload = () => ok(xhr.response))
```

<br>

Самым главным файлом для сервера из каталога *server*, является файл *server.js*, который представляет собой обычное приложение [Express](https://expressjs.com/ru/), как показано ниже:

```js
const express = require('express')
const { readFile } = require('fs/promises')
const jsdom = require('jsdom')
const { JSDOM } = require('jsdom')
const port = process.env.PORT || 3000

// создать объект приложения Express
const app = express()

// определить каталог для статических файлов
app.use(express.static(__dirname + '/public'))

// получить массив названий ботов из внешнего файла
const arrBots = require('./bots.js')

// определить строку агента бота для тестирования
const botAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

// определить регулярное выражение для поиска названий ботов в строке
const regBots = new RegExp(`(${arrBots.join(')|(')})`, 'i')

// поиск расширений файлов скриптов
const regJS = /\.m?js$/

// загружает только скрипты и игнорирует все остальные ресурсы
class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    return regJS.test(url) ? super.fetch(url, options) : null
  }
}

// обработать фавикон
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

// обработать все остальные запросы
app.use(async (req, res) => {
  // определить пользовательского агента
  const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
  
  // если запрос исходит от бота
  if (regBots.test(userAgent)) {
    // определить полный URL запроса
    const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

    // загрузить файл главной страницы приложения
    const file = await readFile(__dirname + '/index.html')

    // определить новый объект JSDOM с параметрами
    const dom = new JSDOM(file.toString(), {
      url: fullURL, // установить URL страницы
      resources: new CustomResourceLoader(), // загрузка только скриптов
      runScripts: 'dangerously', // разрешить выполнять скрипты страницы
    })

    // получить отрендеренное HTML-содержимое страницы
    const html = await new Promise(ok => dom.window.onload = () => dom.window.Creaton.ssr().then(ok))

    // вернуть отрендеренное HTML-содержимое
    res.send(html)
  }

  // иначе, если запрос исходит от пользователя
  else {
    // вернуть файл главной страницы приложения
    res.sendFile(__dirname + '/index.html')
  }
})

// запустить сервер
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))
```

<br>

Все запросы в нём обрабатываются в методе **use()**. Сначала идёт определение пользовательского агента:

```js
// определить пользовательского агента
const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
```

Это позволяет протестировать сервер в режиме бота. Затем, если запрос происходит от бота, то выполняется следующий блок кода:

```js
// если запрос исходит от бота
if (regBots.test(userAgent)) {
  // определить полный URL запроса
  const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

  // загрузить файл главной страницы приложения
  const file = await readFile(__dirname + '/index.html')

  // определить новый объект JSDOM с параметрами
  const dom = new JSDOM(file.toString(), {
    url: fullURL, // установить URL страницы
    resources: new CustomResourceLoader(), // загрузка только скриптов
    runScripts: 'dangerously', // разрешить выполнять скрипты страницы
  })

  // получить отрендеренное HTML-содержимое страницы
  const html = await new Promise(ok => dom.window.onload = () => dom.window.Creaton.ssr().then(ok))

  // вернуть отрендеренное HTML-содержимое
  res.send(html)
}
```

<br>

В нём определяется полный URL запроса, загружается файл главной страницы приложения и формируется новый объект jsdom:

```js
// определить полный URL запроса
const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

// загрузить файл главной страницы приложения
const file = await readFile(__dirname + '/index.html')

// определить новый объект JSDOM с параметрами
const dom = new JSDOM(file.toString(), {
  url: fullURL, // установить URL страницы
  resources: new CustomResourceLoader(), // загрузка только скриптов
  runScripts: 'dangerously', // разрешить выполнять скрипты страницы
})
```

<br>

После этого, в виртуальном DOM созданного объекта запускается метод **ssr()** плагина Creaton, который возвращает промис, значением которого является отрендеренное HTML-содержимое страницы в виде строки:

```js
// получить отрендеренное HTML-содержимое страницы
const html = await new Promise(ok => dom.window.onload = () => dom.window.Creaton.ssr().then(ok))
```

Эта строка отдаётся боту:

```js
// вернуть отрендеренное HTML-содержимое
res.send(html)
```

<br>

Если запрос исходит от пользователя, а не от бота, то ему просто возвращается главный файл приложения:

```js
// иначе, если запрос исходит от пользователя
else {
  // вернуть файл главной страницы приложения
  res.sendFile(__dirname + '/index.html')
}
```

<br>

Теперь перейдите в каталог *server* с помощью терминала или откройте терминал в этом каталоге, и в терминале введите команду:

```
npm i
```

Это установит все зависимости. Для запуска приложения, введите команду:

```
node server
```

Это запустит сервер в обычном режиме. Чтобы протестировать сервер в режиме бота, введите команду:

```
node server bot
```

Для просмотра отрендеренного содержимого, перейдите в режим исходного кода в браузере с помощью комбинации клавиш Ctrl + U.

<br>
<br>