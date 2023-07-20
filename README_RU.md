<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

![creaton](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Creaton⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js)

<br>

Creaton - это плагин JavaScript для быстрого создания [Веб-компонентов](https://learn.javascript.ru/web-components). Плагин поддерживает все технологии, методы и свойства, такие, например, как [слоты](https://learn.javascript.ru/slots-composition) и [Теневой DOM](https://learn.javascript.ru/shadow-dom), которые предоставляются стандартными Веб-компонентами.

> Вторая версия плагина была полностью переписана, с целью оптимизации перерисовки DOM и лучшей организации компонентов. Компоненты из первой версии не подходят для применения их во второй.

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

Открыв файл *index.html* в браузере, на экране отобразится созданное в компоненте Hello сообщение:

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

Данный тип компонентов является наиболее защищённым, поскольку доступ к DOM такого компонента возможен только из статических методов класса.

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
  <script src="creaton.js"></script>

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

В отличие от методов и свойств определяемых пользователем в классе компонента, специальные методы и свойства определяются на внутреннем уровне компонента и всегда начинаются со знака доллара.

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

Свойство **$host** возвращает ссылку на сам компонент, если компонент имеет открытый Теневой DOM или создаётся без него. Если компонент имеет закрытый Теневой DOM, то данное свойство возвращает значение «undefined», как показано ниже:

```
mycomp.$host
undefined
```

<br>

Свойство **$props** позволяет быстро устанавливать и получать значения атрибутов компонента. Добавьте компоненту атрибут ***title***, как показано ниже:

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

Свойство **$state** позволяет получить/установить значение любого состояния напрямую. Чтобы получить значение состояния **message**, введите в консоли браузера команду:

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

Все рассмотренные ранее пользовательские и статические методы класса компонента, выполняются в контексте объекта состояния, на который ссылается свойство **$state**. Данный объект представляет собой [прокси](https://learn.javascript.ru/proxy). Это означает, что если запрашиваемого состояния нет в данном объекте, то происходит поиск запрашиваемого свойства в самом компоненте.

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

Метод **$update()** используется для обновления DOM компонента. Он может принимать один аргумент в виде объекта. Значения свойств этого объекта становятся новыми значениями состояний, например:

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

Метод **$()**  является сокращённым аналогом метода [querySelector()](https://learn.javascript.ru/searching-elements-dom#querySelector) и применяется для быстрого доступа к элементу DOM компонента. Например, для назначения слушателя события:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль элемент породивший событие
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

Метод **$$()**  является сокращённым аналогом метода [querySelectorAll()](https://learn.javascript.ru/searching-elements-dom#querySelectorAll) и применяется для быстрого доступа к элементу DOM компонента. Например, для перебора коллекции элементов:

```js
// вызывается при добавлении компонента в документ
static connected() {
  // вывести в консоль все элементы параграфов
  this.$$('p').forEach(elem => console.log(elem))
}
```

<br>

Метод **$event()** применяется для создания пользовательских событий, позволяющих различным компонентам взаимодействовать между собой. Этот метот будет рассмотрен позже, поскольку требует для своего объяснения отдельный раздел.

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

<br>

Аналогичным образом можно выводить и объекты, используя для этого метод [Object.keys()](https://learn.javascript.ru/keys-values-entries), например:

```js
class MyComponent {
  user = {
    name: 'Иван',
    age: 32
  }

  static render() {
    return `
      <ul>
        ${ Object.keys(this.user).map(key => `<li>${ key }: ${ this.user[key] }</li>`).join('') }
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