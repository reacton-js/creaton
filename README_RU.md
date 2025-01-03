<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

<h3>Расширенные Веб-компоненты</h3>

<br>

![creaton](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [GitFlic](https://gitflic.ru/project/reacton/creaton) | [GitVerse](https://gitverse.ru/awc/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Скачать⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/ctn.global.min.js)

<br>

Creaton (сокр. Ctn) – это фреймворк JavaScript для быстрого создания [Веб-компонентов](https://learn.javascript.ru/web-components). Он поддерживает все методы и свойства, которые предоставляются стандартными Веб-компонентами. Кроме этого, фреймворк содержит ряд дополнительных методов и реализует рендеринг Веб-компонентов на стороне сервера.

<br>

Ниже представлен пример создания простого компонента:

```js
class WHello {
  // инициализация свойств объекта состояния
  message = 'Creaton'
  color = 'orange'

  static mode = 'open' // добавить Теневой DOM

  // вернуть HTML-разметку компонента
  static template() {
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
2. [Состояние компонента](#component-state)
3. [Циклы](#cycles)
4. [Примеси](#mixins)
5. [Статические свойства](#static-properties)
6. [Специальные методы](#special-methods)
7. [Эмиттер событий](#event-emitter)
8. [Маршрутизатор](#router)
9. [Серверный рендеринг](#server-rendering)

<br>
<hr>
<br>

<h2 id="quick-start">Быстрый старт</h2>

<br>

Для создания компонентов применяются классы. Классы могут быть как встроенными в основной скрипт, так и импортированы из внешнего модуля. Создайте новый рабочий каталог, например, с названием *app*, и скачайте в этот каталог файл [ctn.global.js](https://raw.githubusercontent.com/reacton-js/creaton/main/ctn.global.js).

Добавьте в каталог файл *index.html* со следующим содержимым:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // инициализация свойств объекта состояния
      message = 'Creaton'
      color = 'orange'

      static mode = 'open' // добавить Теневой DOM

      // вернуть HTML-разметку компонента
      static template() {
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

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)
  </script>
</body>
</html>
```

Чтобы гарантировать отсутствие конфликтов имён между стандартными и пользовательскими HTML-элементами, имя компонента должно содержать дефис «-», например, "my-element" и "super-button" – это правильные имена, а "myelement" – нет.

В большинстве примеров этого руководства, префикс будет состоять из одной буквы «w-». т.е. компонент Hello будет называться "w-hello".

При определении класса компонента, его префикс и имя должны начинаться с заглавной буквы. WHello – это правильное название класса, а wHello – нет.

Открыв файл *index.html* в браузере, на экране отобразится созданное в компоненте Hello сообщение:

<h1 style="color: orange;">Привет, Creaton!</h1>

<br>

Компоненты можно выносить в отдельные модули. В этом случае, файл компонента Hello выглядел бы как показано ниже:

```js
export default class WHello {
  // инициализация свойств объекта состояния
  message = 'Creaton'
  color = 'orange'

  static mode = 'open' // добавить Теневой DOM

  // вернуть HTML-разметку компонента
  static template() {
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

Для работы с внешними компонентами, вам потребуется любой разработочный сервер, такой, например, как [lite-server](https://www.npmjs.com/package/lite-server).

Установить данный сервер можно с помощью команды в терминале:

```
npm install --global lite-server
```

Запуск сервера из каталога, в котором находится приложение, осуществляется с помощью команды в терминале:

```
lite-server
```

<br>

Кроме этого, фреймворк поддерживает однофайловые компоненты, которые могут быть использованы наравне с модульными, при создании проекта в системе сборки [webpack](https://webpack.js.org/).

Ниже показан пример простого однофайлового компонента:

```html
<h1>Привет, ${ this.message }!</h1>
      
<style>
  h1 {
    color: ${ this.color };
  }
</style>

<script>
  exports = class WHello {
    // инициализация свойств объекта состояния
    message = 'Creaton'
    color = 'orange'

    static mode = 'open' // добавить Теневой DOM
  }
</script>
```

Однофайловый компонент должен присваивать свой класс переменной **exports**. Эта переменная будет автоматически объявлена во время создания структуры компонента в системе сборки проекта.

В однофайловых компонентах можно использовать инструкцию [import](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/import), например:

```html
<script>
  // импортировать из модуля объект по умолчанию
  import obj from './module.js'

  exports = class WHello {
    // инициализация свойств объекта состояния
    message = obj.message
    color = obj.color

    static mode = 'open' // добавить Теневой DOM
  }
</script>
```

<br>

Однофайловые компоненты позволяют выделить HTML-разметку из логики компонента. Однако, такие компоненты не могут работать в браузере напрямую. Они требуют специального обработчика, который подключается в *webpack*.

Чтобы иметь возможность работать в браузере с компонентами, в которых логика отделена от HTML-содержимого, существуют встроенные компоненты.

Ниже показан пример простого встроенного компонента:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello></w-hello>

  <!-- определить шаблон компонента Hello -->
  <template id="tempHello">
    <h1>Привет, ${ this.message }!</h1>
          
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>

    <script>
      return class WHello {
        // инициализация свойств объекта состояния
        message = 'Creaton'
        color = 'orange'

        static mode = 'open' // добавить Теневой DOM
      }
    </script>
  </template>

  <script src="ctn.global.js"></script>

  <script>
    // передать шаблон компонента Hello функции Ctn
    Ctn(tempHello)
  </script>
</body>
</html>
```

Встроенный компонент должен возвращать свой класс, а содержимое его тега &lt;script&gt; можно рассматривать как функцию. Однако, встроенные компоненты не подходят для рендеринга на стороне сервера и, кроме этого, в них нельзя использовать инструкцию **import**, но допускается использование выражения [import()](https://learn.javascript.ru/modules-dynamic-imports#vyrazhenie-import), например:

```html
<script>
  // импортировать модуль и сохранить его объект в переменной
  let obj = await import('./module.js')

  return class WHello {
    // инициализация свойств объекта состояния
    message = obj.message
    color = obj.color

    static mode = 'open' // добавить Теневой DOM
  }
</script>
```

Независимо от типа компонента, при использовании в HTML-разметке символа обратная кавычка «&grave;», он должен быть экранирован символом обратного слэша «&bsol;», как показано ниже:

```js
// вернуть HTML-разметку компонента
static template() {
  return `
    <h1>\`Привет\`, ${ this.message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>
  `
}
```

Это связано с тем, что HTML-разметка любого компонента, всегда размещается внутри [шаблонной строки](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals). Для однофайловых и встроенных компонентов, это делается на уровне их преобразования в обычный класс компонента.

<br>

Для быстрого доступа к компоненту, достаточно добавить идентификатор к элементу, который подключает компонент к документу, как показано ниже:

```html
<!-- подключить компонент Hello к документу -->
<w-hello id="hello"></w-hello>
```

Теперь откройте консоль браузера и последовательно введите команды:

```
hello.$state.message = 'Веб-компоненты'
hello.$state.color = 'green'
hello.$update()
```

Цвет и содержимое заголовка изменятся:

<h1 style="color: green;">Привет, Веб-компоненты!</h1>

<br>
<br>
<h2 id="component-state">Состояние компонента</h2>

<br>

Каждый компонент может содержать изменяющиеся данные, которые называются состоянием. Состояние можно определить в конструкторе класса компонента:

```js
class WHello {
  constructor() {
    // инициализация свойств объекта состояния
    this.message = 'Creaton'
    this.color = 'orange'
  }
  ...
}
```

В качестве альтернативы, используя новый синтаксис, можно определить состояние непосредственно в самом классе:

```js
class WHello {
  // инициализация свойств объекта состояния
  message = 'Creaton'
  color = 'orange'
  ...
}
```

<br>

Методы компонента не являются состоянием. Они предназначены для выполнения действий с состоянием компонента и хранятся в прототипе объекта состояния:

```js
class WHello {
  // инициализация свойства объекта состояния
  message = 'Creaton'

  // определить метод объекта состояния
  printStr(str) {
    return this.message
  }

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <h1>Привет, ${ this.printStr() }!</h1>
    `
  }
}
```

<br>

Для доступа к объекту состояния, применяется специальное свойство *$state*. С помощью этого свойства, можно получить или присвоить новое значение состоянию, как показано ниже:

```
hello.$state.message = 'Веб-компоненты'
```

Для обновления содержимого компонента на основе нового состояния, применяется специальный метод *$update()*, например:

```
hello.$update()
```

<br>

Когда содержимое компонента обновляется, то его старый DOM не удаляется. Вместо этого, создаётся временный виртуальный DOM, на основе возвращаемого содержимого статического метода *template()* и обновлённого объекта состояния. Это означает, что обработчики, назначенные элементам внутри компонента, сохраняются, поскольку старый элемент не заменяется новым элементом.

В примере ниже, обработчик элемента &lt;h1&gt; будет работать и после обновления компонента. Поскольку обновление изменит только старое значение его атрибута и текстового содержимого:

```js
class WHello {
  // инициализация свойства объекта состояния
  message = 'Creaton'

  /* этот метод выполняется после подключения компонента к документу
    когда для компонента уже создан DOM, из которого можно выбирать элементы */
  static connected() {
    this.$('h1').addEventListener('click', e => console.log(e.target))
  }

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <h1 title="${ this.message }">Привет, ${ this.message }!</h1>
    `
  }
}
```

<br>
<br>
<h2 id="cycles">Циклы</h2>

<br>

Для вывода циклов, применяются методы [map()](https://learn.javascript.ru/array-methods#map) и [join()](https://learn.javascript.ru/array-methods#split-i-join) или метод [reduce()](https://learn.javascript.ru/array-methods#reduce-reduceright).

При использовании метода *map()*, необходимо в конце добавлять метод *join()* с аргументом пустой строки, чтобы удалить запятые между элементами массива:

```js
class WHello {
  // инициализация свойства объекта состояния
  rgb = ['Красный', 'Зелёный', 'Синий']

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <ul>
        ${ this.rgb.map(col => `<li>${ col }</li>`).join('') }
      </ul>
    `
  }
}
```

При использовании метода *reduce()*, добавлять в конце метод *join()* не нужно:

```js
class WHello {
  // инициализация свойства объекта состояния
  rgb = ['Красный', 'Зелёный', 'Синий']

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <ul>
        ${ this.rgb.reduce((str, col) => str += `<li>${ col }</li>`, '') }
      </ul>
    `
  }
}
```

<br>

Можно воспользоваться специальной теговой функцией *$tag*, которая автоматически добавляет метод *join()* всем массивам и может вызывать методы объекта состояния, когда они указаны в HTML-разметке без скобок "()", например:

```js
class WHello {
  // инициализация свойств объекта состояния
  rgb = ['Красный', 'Зелёный', 'Синий']
  message = 'Creaton'

  // определить метод объекта состояния
  printStr(str) {
    return this.message
  }

  // вернуть HTML-разметку компонента
  static template() {
    return this.$tag`
      <h1>Привет, ${ this.printStr }!</h1>
      <ul>
        ${ this.rgb.map(col => `<li>${ col }</li>`) }
      </ul>
    `
  }
}
```

По умолчанию, все встроенные и однофайловые компоненты, используют для создания своего HTML-содержимого данную функцию:

```html
<ul>
  ${ this.printArr }
</ul>

<script>
  exports = class WHello {
    // инициализация свойства объекта состояния
    rgb = ['Красный', 'Зелёный', 'Синий']

    // определить метод объекта состояния
    printArr() {
      return this.rgb.map(col => `<li>${ col }</li>`)
    }
  }
</script>
```

<br>

Для вывода объектов, используется метод [Object.keys()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), как показано ниже:

```js
class WHello {
  // инициализация свойства объекта состояния
  user = {
    name: 'Иван',
    age: 36
  }

  // определить метод объекта состояния
  printObj() {
    const { user } = this
    return Object.keys(user).map(prop => `<li>${ prop } – ${ user[prop] }</li>`)
  }

  // вернуть HTML-разметку компонента
  static template() {
    return this.$tag`
      <ul>${ this.printObj }</ul>
    `
  }
}
```

или цикл *for-in*, например:

```js
// определить метод объекта состояния
printObj() {
  const { user } = this
  let str = ''
  for (const prop in user) {
    str += `<li>${ prop } – ${ user[prop] }</li>`
  }
  return str
}
```

<br>
<br>
<h2 id="mixins">Примеси</h2>

<br>

Примесь – общий термин в объектно-ориентированном программировании: класс, который содержит в себе методы для других классов. Эти методы могут использовать разные компоненты, что позволяет не создавать методы с одинаковым функционалом для каждого компонента отдельно.

В примере ниже, метод *printName()* из примеси используют компоненты Hello и Goodbye:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello></w-hello>

  <!-- подключить компонент Goodbye к документу -->
  <w-goodbye></w-goodbye>

  <script src="ctn.global.js"></script>

  <script>
    // определить класс Mixin для общих методов
    class Mixin {
      printName() {
        return this.userName
      }
    }

    // расширить класс компонента Hello от класса Mixin
    class WHello extends Mixin {
      // инициализация свойства объекта состояния
      userName = 'Анна'

      // вернуть HTML-разметку компонента
      static template() {
        return `
          <h1>Привет, ${ this.printName() }!</h1>
        `
      }
    }

    // расширить класс компонента Goodbye от класса Mixin
    class WGoodbye extends Mixin {
      // инициализация свойства объекта состояния
      userName = 'Иван'

      // вернуть HTML-разметку компонента
      static template() {
        return `
          <p>До свидания, ${ this.printName() }...</p>
        `
      }
    }
    
    // передать классы компонентов Hello и Goodbye функции Ctn
    Ctn(WHello, WGoodbye)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="static-properties">Статические свойства</h2>

<br>

**name** – это статическое свойство используется, например, когда функции Ctn передаётся анонимный класс, как показано ниже:

```js
// передать анонимный класс компонента Hello функции Ctn
Ctn(class {
  static name = 'w-hello' // название компонента
  
  // инициализация свойства объекта состояния
  message = 'Creaton'

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <h1>Привет, ${ this.message }!</h1>
    `
  }
})
```

<br>

**mode** – это статическое свойство отвечает за добавление компоненту [Теневого DOM](https://learn.javascript.ru/shadow-dom). Оно может содержать два значения: "open" или "closed". В последнем случае, когда компонент является закрытым, то невозможно получить доступ из консоли к свойствам его объекта состояния, методам выборки элементов и обновления содержимого.

Доступ к свойствам объекта состояния, методам выборки и обновления содержимого компонента, в закрытых компонентах возможен только из статических методов, например:

```js
class WHello {
  static mode = 'closed' // добавить закрытый Теневой DOM

  // выполняется в конце подключения компонента к документу
  static connected() {
    // получить элемент с помощью метода выборки
    const elem = this.$('h1')

    // добавить элементу обработчик события
    elem.addEventListener('click', e => console.log(e.target))
  }

  // инициализация свойства объекта состояния
  message = 'Creaton'

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <h1>Привет, ${ this.message }!</h1>
    `
  }
}
```

*Только компоненты имеющие Теневой DOM, могут содержать [локальные стили](https://learn.javascript.ru/shadow-dom-style).*

<br>

**extends** – это статическое свойство отвечает за создание [модифицированных компонентов](https://learn.javascript.ru/custom-elements#modifitsirovannye-vstroennye-elementy), т.е. таких, которые встраиваются в стандартные HTML-элементы, например:

```html
<body>
  <!-- встроить компонент Hello в элемент header -->
  <header is="w-hello"></header>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      static extends = 'header' // название встраиваемого элемента

      // инициализация свойства объекта состояния
      message = 'Creaton'

      // вернуть HTML-разметку компонента
      static template() {
        return `
          <h1>Привет, ${ this.message }!</h1>
        `
      }
    }

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)
  </script>
</body>
```

*Свойство должно содержать название встраиваемого элемента, а сам встраиваемый элемент, должен содержать атрибут [is](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/is) со значением, равным названию встраиваемого в него компонента.*

<br>

**serializable** – это статическое свойство отвечает за [сериализацию](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/serializable) Теневого DOM компонента с помощью метода [getHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getHTML). По умолчанию имеет значение "false".

<br>

**template()** – этот статический метод возвращает будущее HTML-содержимое компонента:

```js
// вернуть HTML-разметку компонента
static template() {
  return `
    <h1>Привет, ${ this.message }!</h1>
  `
}
```

<br>

**startConnect()** – этот статический метод выполняется в самом начале подключения компонента к документу, до формирования HTML-содержимого компонента и вызова статического метода *connected()*, но после создания объекта состояния компонента.

В нём можно инициализировать свойства объекта состояния имеющимися значениями:

```js
class WHello {
  // выполняется в начале подключения компонента к документу
  static startConnect() {
    // инициализация свойства объекта состояния
    this.message = 'Creaton'
  }

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <h1>Привет, ${ this.message }!</h1>
    `
  }
}
```

или получить данные с сервера для их инициализации. Но в этом случае, метод должен быть асинхронным:

```js
class WHello {
  // выполняется в начале подключения компонента к документу
  static async startConnect() {
    // инициализация свойства объекта состояния данными с условного сервера
    this.message = await new Promise(ok => setTimeout(() => ok('Creaton'), 1000))
  }

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <h1>Привет, ${ this.message }!</h1>
    `
  }
}
```

*Это единственный статический метод, который можеть быть асинхронным.*

<br>

**connected()** – этот статический метод выполняется в самом конце подключения компонента к документу, после формирования HTML-содержимого компонента и вызова статического метода *startConnect()*.

В нём можно добавлять обработчики событий внутренним элементам компонента:

```js
class WHello {
  // выполняется в конце подключения компонента к документу
  static connected() {
    // получить элемент с помощью метода выборки
    const elem = this.$('h1')

    // добавить элементу обработчик события
    elem.addEventListener('click', e => console.log(e.target))
  }

  // инициализация свойства объекта состояния
  message = 'Creaton'

  // вернуть HTML-разметку компонента
  static template() {
    return `
      <h1>Привет, ${ this.message }!</h1>
    `
  }
}
```

*Этот и все последующие статические методы, являются сокращениями [стандартных статических](https://learn.javascript.ru/custom-elements) методов компонента.*

<br>

**disconnected()** – этот статический метод выполняется при удалении компонента из документа.

**adopted()** – этот статический метод выполняется при перемещении компонента в новый документ.

**changed()** – этот статический метод выполняется при изменении одного из отслеживаемых атрибутов.

**attributes** – этот статический массив содержит имена отслеживаемых атрибутов, например:

```html
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello data-message="Creaton"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // выполняется в начале подключения компонента к документу
      static startConnect() {
        // инициализация свойства объекта состояния
        this.message = this.$data.message
      }
      
      // выполняется в конце подключения компонента к документу
      static connected() {
        // получить элемент с помощью метода выборки
        const elem = this.$('h1')

        // добавить элементу обработчик события
        elem.addEventListener('click', e => this.$data.message = 'Веб-компоненты')
      }

      // выполняется при изменении одного из отслеживаемых атрибутов
      static changed(name, oldValue, newValue) {
        // если новое значение атрибута не равно старому значению 
        if (newValue !== oldValue) {
          // изменить значение свойства объекта состояния
          this.message = newValue

          this.$update() // обновить HTML-содержимое компонента
        }
      }

      // содержит имена отслеживаемых атрибутов
      static attributes = ['data-message']

      // вернуть HTML-разметку компонента
      static template() {
        return `
          <h1>Привет, ${ this.message }!</h1>
        `
      }
    }

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)
  </script>
</body>
```

<br>

Все статические методы вызываются в контексте [прокси](https://learn.javascript.ru/proxy) объекта состояния компонента. Это означает, что если необходимое свойство не обнаруживается в объекте состояния, то поиск происходит в самом компоненте.

В примере ниже, свойства **id** не существует в объекте состояния компонента. Поэтому оно запрашивается из самого компонента:

```html
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello id="hello"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // вернуть HTML-разметку компонента
      static template() {
        return `
          <h1>Привет, компонент с ID ${ this.id }!</h1>
        `
      }
    }

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)
  </script>
</body>
```

<br>
<br>
<h2 id="special-methods">Специальные методы</h2>

<br>

Все специальные методы и свойства начинаются с символа доллара «$», за которым следует название метода или свойства.

**\$update()** – этот специальный метод выполняется для обновления содержимого компонента, после изменения его состояния:

```
hello.$state.message = 'Веб-компоненты'
hello.$update()
```

*Этот метод обновляет содержимое закрытых компонентов, только если он вызывается из статических методов класса компонента. Для всех остальных типов компонентов, он возвращает количество миллисекунд, за которое содержимое компонента было обновлено.*

<br>

**\$()** – этот специальный метод выбирает элемент из содержимого компонента по указаному селектору, например, для добавления элементу обработчика события:

```js
// выполняется в конце подключения компонента к документу
static connected() {
  // получить элемент с помощью метода выборки
  const elem = this.$('h1')

  // добавить элементу обработчик события
  elem.addEventListener('click', e => console.log(e.target))
}
```

*Этот метод выбирает содержимое закрытых компонентов, только если он вызывается из статических методов класса компонента.*

<br>

**\$$()** – этот специальный метод выбирает все элементы из содержимого компонента по указаному селектору, например, для добавления элементам обработчиков событий при переборе их в цикле:

```js
// выполняется в конце подключения компонента к документу
static connected() {
  // получить все элементы с помощью метода выборки
  const elems = this.$$('h1')

  // перебрать коллекцию элементов в цикле
  for (const elem of elems) {
    // добавить элементу обработчик события
    elem.addEventListener('click', e => console.log(e.target))
  }
}
```

*Этот метод выбирает содержимое закрытых компонентов, только если он вызывается из статических методов класса компонента.*

<br>

**\$entities()** – этот специальный метод обезвреживает строку, содержащую HTML-содержимое полученное из недостоверных источников. По умолчанию, экранируется символ амперсанда «&amp;», символы меньше «&lt;» и больше «&gt;», двойные «&quot;» и одинарные кавычки «&#39;», например:

```js
class WHello {
  // выполняется в начале подключения компонента к документу
  static async startConnect() {
    // получение HTML-содержимого с условного сервера
    const html = await new Promise(ok => setTimeout(() => ok('<script>опасный код<\/script>'), 1000))

    // инициализация свойства объекта состояния обезвреженным HTML-содержимым
    this.message = this.$entities(html)
  }

  // вернуть HTML-разметку компонента
  static template() {
    return this.message
  }
}
```

Кроме вышеперечисленных символов, можно экранировать любые символы, передав во втором и последующих аргументах массив вида: [регулярное выражение, строка замены], например:

```js
this.$entities(html, [/\(/g, '&lpar;'], [/\)/g, '&rpar;'])
```

*Этот метод доступен в качестве свойства функции Ctn, как показано ниже:*

```js
Ctn.entities(html)
```

*или [именованного импорта](https://learn.javascript.ru/import-export#import), когда используется модульная версия фреймворка:*

```html
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello></w-hello>

  <script type="module">
    import Ctn, { Entities } from "./ctn.esm.js"

    class WHello {
      // вернуть HTML-разметку компонента
      static template() {
        return `
          ${ Entities('<script>опасный код<\/script>') }
        `
      }
    }

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)
  </script>
</body>
```

<br>

**\$tag()** – этот специальный метод является теговой функцией, которая автоматически добавляет метод [join()](https://learn.javascript.ru/array-methods#split-i-join) с аргументом пустой строки всем массивам, для удаления запятых между элементами, и может вызывать методы объекта состояния, когда они указаны в HTML-разметке без скобок "()", например:

```js
class WHello {
  // инициализация свойств объекта состояния
  rgb = ['Красный', 'Зелёный', 'Синий']
  message = 'Creaton'

  // определить метод объекта состояния
  printStr(str) {
    return this.message
  }

  // вернуть HTML-разметку компонента
  static template() {
    return this.$tag`
      <h1>Привет, ${ this.printStr }!</h1>
      <ul>
        ${ this.rgb.map(col => `<li>${ col }</li>`) }
      </ul>
    `
  }
}
```

<br>

Специальные методы: *\$event()*, *\$router()* и *\$render()*, будут рассмотрены в следующих разделах. Как и для метода *\$entities()*, для них так же имеются свои именованные импорты:

```js
import Ctn, { Tag, Event, Router, Render } from "./ctn.esm.js"
```

*Функция Ctn всегда импортируется по умолчанию.*

<br>

**\$state** – это специальное свойство ссылается на [прокси](https://learn.javascript.ru/proxy) объекта состояния компонента. Это означает, что если необходимое свойство не обнаруживается в объекте состояния, то поиск происходит в самом компоненте.

В примере ниже, свойства **id** не существует в объекте состояния компонента. Поэтому оно запрашивается из самого компонента:

```html
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello id="hello"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // вернуть HTML-разметку компонента
      static template() {
        return `
          <h1>Привет, компонент с ID ${ this.id }!</h1>
        `
      }
    }

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)
  </script>
</body>
```

<br>

**\$host** – это специальное свойство ссылается на элемент, который подключает компонент к документу, т.е. на элемент компонента. Это может пригодиться, если свойства с одинаковыми именами имеются и объекте состояния и в компоненте.

Прокси объекта состояния изначально ищет свойство в самом объекте состояния, это значит, что для получения одноимённого свойства из элемента компонента, необходимо использовать специальное свойство *$host*, как показано ниже:

```html
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello id="hello"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // инициализация свойства объекта состояния
      id = 'Creaton'

      // вернуть HTML-разметку компонента
      static template() {
        return `
          <h1>Привет, свойство ID со значением ${ this.id }!</h1>
          <h2>Привет, компонент с ID ${ this.$host.id }!</h2>
        `
      }
    }

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)
  </script>
</body>
```

<br>

**\$shadow** – это специальное свойство ссылается на [Теневой DOM](https://learn.javascript.ru/shadow-dom) компонента:

```
hello.$shadow
```

*Для закрытых компонентов и компонентов без Теневого DOM, это свойство возвращает значение "null".*

<br>

**\$data** – это специальное свойство ссылается на объект [dataset](https://learn.javascript.ru/dom-attributes-and-properties#nestandartnye-atributy-dataset) компонента, который используется для доступа к [пользовательским атрибутам](https://developer.mozilla.org/ru/docs/Learn/HTML/Howto/Use_data_attributes), например:

```html
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello data-message="Creaton"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // вернуть HTML-разметку компонента
      static template() {
        return `
          <h1>Привет, ${ this.$data.message }!</h1>
        `
      }
    }

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)
  </script>
</body>
```

<br>
<br>
<h2 id="event-emitter">Эмиттер событий</h2>

<br>

Чтобы компоненты могли взаимодействовать между собой и обмениваться друг с другом данными, применяются [пользовательские события](https://learn.javascript.ru/dispatch-events#polzovatelskie-sobytiya). Для создания пользовательских событий, используется специальный метод *$event()*, который доступен в качестве свойства функции Ctn.

Если метод вызывается как конструктор, то он возвращает новый объект эмиттера, который будет генерировать и отслеживать пользовательские события, например:

```js
const emit = new Ctn.event()
```

В роли эмиттера выступает обычный [фрагмент документа](https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment). Можно создавать сколько угодно новых эмиттеров, и каждый эмиттер может генерировать и отслеживать сколько угодно новых пользовательских событий.

Когда метод *$event()* вызывается как обычная функция, то в первом аргументе он получает эмиттер, во втором передаётся название пользовательского события, а в третьем аргументе можно передавать любые данные:

```js
this.$event(emit, 'new-array', ['Оранжевый', 'Фиолетовый'])
```

Эти данные затем будут доступны в обработчике пользовательского события, в качестве свойства **detail** объекта события [Event](https://developer.mozilla.org/ru/docs/Web/API/Event), как показано ниже:

```js
emit.addEventListener('new-array', event => {
  this.rgb = event.detail
  this.$update()
})
```

*В системе сборки [webpack](https://webpack.js.org/), эмиттер можно экспортировать из отдельного модуля, например, из файла Events.js:*

```js
import { Event } from 'creaton-js'
export const Emit = new Event()
```

*для последующего импорта эмиттера в файлы компонентов, которые будут его использовать:*


```js
import { Emit } from './Events'
```

<br>

В примере ниже, каждой кнопке из компонента Hello добавляется обработчик события "click", внутри которого, происходит запуск соответствующего пользовательского события объекта эмиттера.

Для отслеживания пользовательских событий, эмиттеру назначаются соответствующие обработчики в компоненте Colors. В последнем обработчике, через свойство **detail** объекта события Event, свойству состояния присваивается новый массив:

```html
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello></w-hello>

  <!-- подключить компонент Colors к документу -->
  <w-colors></w-colors>

  <script src="ctn.global.js"></script>

  <script>
    // создать новый объект эмиттера
    const emit = new Ctn.event()

    class WHello {
      // вернуть HTML-разметку компонента
      static template() {
        return `
          <button id="reverse">Обратить массив</button>
          <button id="new-array">Новый массив</button>
        `
      }

      // выполняется в конце подключения компонента к документу
      static connected() {
        // добавить обработчик события кнопке "Обратить массив"
        this.$('#reverse').addEventListener('click', () => {
          // инициировать событие "reverse"
          this.$event(emit, 'reverse')
        })

        // добавить обработчик события кнопке "Новый массив"
        this.$('#new-array').addEventListener('click', () => {
          // инициировать событие "new-array"
          this.$event(emit, 'new-array', ['Оранжевый', 'Фиолетовый'])
        })
      }
    }

    class WColors {
      // инициализация свойства объекта состояния
      rgb = ['Красный', 'Зелёный', 'Синий']

      // вернуть HTML-разметку компонента
      static template() {
        return `
          <ul>
            ${ this.rgb.reduce((str, col) => str += `<li>${ col }</li>`, '') }
          </ul>
        `
      }

      // выполняется в конце подключения компонента к документу
      static connected() {
        // добавить эмиттеру обработчик события "reverse"
        emit.addEventListener('reverse', () => {
          this.rgb.reverse() // обратить массив
          this.$update() // обновить компонент
        })

        // добавить эмиттеру обработчик события "new-array"
        emit.addEventListener('new-array', event => {
          this.rgb = event.detail // присвоить свойству новый массив
          this.$update() // обновить компонент
        })
      }
    }

    // передать классы компонентов Hello и Colors функции Ctn
    Ctn(WHello, WColors)
  </script>
</body>
```

<br>
<br>
<h2 id="router">Маршрутизатор</h2>

<br>

В основе [маршрутизатора](https://expressjs.com/ru/starter/basic-routing.html) лежат пользовательские события. Для создания маршрутных событий, используется специальный метод *$router()*, который доступен в качестве свойства функции Ctn.

Если метод вызывается как конструктор, то он возвращает новый объект эмиттера с переопределённым методом [addEventListener()](https://learn.javascript.ru/introduction-browser-events#addeventlistener), который будет генерировать и отслеживать маршрутные события, например:

```js
const emitRouter = new Ctn.router()
```

Когда метод *$router()* вызывается как обычная функция, то в первом аргументе он получает эмиттер, во втором передаётся название маршрутного события, а в третьем аргументе можно передавать любые данные:

```js
this.$router(emitRouter, '/about', ['Оранжевый', 'Фиолетовый'])
```

В реальном приложении, название маршрутного события указывается не непосредственно, как в примере выше, а берётся из значения атрибута  **href** ссылки, по которой был произведён клик, например:

```js
this.$router(emitRouter, event.target.href, ['Оранжевый', 'Фиолетовый'])
```

<br>

Передаваемые в последнем аргументе метода *$router()* пользовательские данные, будут доступны в обработчике маршрутного события, в качестве свойства **detail** объекта события [Event](https://developer.mozilla.org/ru/docs/Web/API/Event), как показано ниже:

```js
emitRouter.addEventListener('/about', event => {
  const arr = event.detail
  ...
})
```

Начальный слэш «/» в названии маршрутного события не является обязательным:

```js
emitRouter.addEventListener('about', event => {
  const arr = event.detail
  ...
})
```

Вся остальная часть названия маршрутного события, кроме начального слэша, должна до конца совпадать со значением атрибута **href** ссылки, после нажатия на которую, сработает соответствующий этому значению обработчик:

```html
<a href="/about">О нас</a>
```

<br>

Разница между пользовательскими и маршрутными событиями в том, что строка указанная в обработчике маршрутного события преобразуется в [регулярное выражение](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp) и может содержать [специальные](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp#%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%BE%D0%B2_%D0%B2_%D1%80%D0%B5%D0%B3%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D1%8B%D1%85_%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%D1%85) символы регулярных выражений, как показано ниже:

```js
emitRouter.addEventListener('/abou\\w', event => {
  ...
})
```

Чтобы не приходилось дважды использовать символ обратного слэша в обычной строке для экранирования специальных символов регулярных выражений, можно воспользоваться теговой функцией [raw()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/raw) встроенного объекта [String](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String), заключив название маршрутного события в [шаблонную строку](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals), например:


```js
emitRouter.addEventListener(String.raw`/abou\w`, event => {
  ...
})
```

или так:

```js
const raw = String.raw
emitRouter.addEventListener(raw`/abou\w`, event => {
  ...
})
```

<br>

Кроме свойства **detail**, объект события Event имеет дополнительное свойство **params**, для получения [параметров маршрутов](https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/routes#%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B_%D0%BC%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D0%BE%D0%B2), как показано ниже:

```js
emitRouter.addEventListener('/categories/:catId/products/:prodId', event => {
  const catId = event.params["catId"]
  const prodId = event.params["prodId"]
  ...
})
```

Этот обработчик будет выполняться для всех ссылок вида:

```html
<a href="/categories/5/products/7">Продукт</a>
```

тогда **catId** будет иметь значение 5, а **prodId** значение 7.

Для поддержки параметров запросов, объект события Event имеет дополнительное свойство **search**, которое является короткой ссылкой на свойство [searchParams](https://learn.javascript.ru/url#searchparams) встроенного класса [URL](https://learn.javascript.ru/url), например:

```js
const raw = String.raw
emitRouter.addEventListener(raw`/categories\?catId=\d&prodId=\d`, event => {
  const catId = event.search.get("catId")
  const prodId = event.search.get("prodId")
  ...
})
```

Этот обработчик будет выполняться для всех ссылок вида:

```html
<a href="/categories?catId=5&prodId=7">Продукт</a>
```

тогда **catId** будет иметь значение 5, а **prodId** значение 7.

Последнее дополнительное свойство объекта события Event называется  **url**, оно является объектом встроенного класса [URL](https://learn.javascript.ru/url) и помогает разобрать запрос на составляющие:

```js
emitRouter.addEventListener('/about', event => {
  const hostname = event.url.hostname
  const origin = event.url.origin
  ...
})
```

<br>

Ниже показан пример создания простого маршрутизатора для трёх компонентов страниц:

```html
<body>
  <!-- подключить компонент Menu к документу -->
  <w-menu></w-menu>

  <!-- подключить компонент Content к документу -->
  <w-content></w-content>

  <script src="ctn.global.js"></script>

  <script>
    class WHome {
      // вернуть HTML-разметку компонента
      static template() {
        return `<h1>Главная</h1>`
      }
    }
    class WAbout {
      // вернуть HTML-разметку компонента
      static template() {
        return `<h1>О нас</h1>`
      }
    }
    class WContacts {
      // вернуть HTML-разметку компонента
      static template() {
        return `<h1>Контакты</h1>`
      }
    }

    // создать новый объект эмиттера для маршрутизатора
    const emitRouter = new Ctn.router()

    class WMenu {
      // выполняется в конце подключения компонента к документу
      static connected() {
        // добавить обработчик события "click" для элемента NAV
        this.$('nav').addEventListener('click', event => {
          event.preventDefault() // отменить действие по умолчанию
          // инициировать событие для значения "href" текущей ссылки
          this.$router(emitRouter, event.target.href)
        })
      }
    
      // вернуть HTML-разметку компонента
      static template() {
        return `
          <nav>
            <a href="/">Главная</a>
            <a href="/about">О нас</a>
            <a href="/contacts">Контакты</a>
          </nav>
        `
      }
    }

    class WContent {
      // инициализация свойства объекта состояния
      page = ''

      // выполняется в конце подключения компонента к документу
      static connected() {
        // добавить эмиттеру обработчик события с необязательным параметром маршрута
        emitRouter.addEventListener(`(:page)?`, event => {
          // присвоить свойству название компонента страницы
          this.page = `w-${event.params.page || 'home'}` 
          this.$update() // обновить компонент
        })
        
        // инициировать событие для значения "href" текущей страницы
        this.$router(emitRouter, location.href)
      }

      // вернуть HTML-разметку компонента
      static template() {
        // если свойство содержит название страницы
        if (this.page) {
          return `<${this.page} />`
        }
      }
    }

    // передать классы компонентов функции Ctn
    Ctn(WHome, WAbout, WContacts, WMenu, WContent)
  </script>
</body>
```

Для обработки маршрутов этих страниц, эмиттеру маршрутизатора назначается обработчик с необязательным параметром маршрута в компоненте Content:

```js
// добавить эмиттеру обработчик события с необязательным параметром маршрута
emitRouter.addEventListener(`(:page)?`, event => {
  // присвоить свойству название компонента страницы
  this.page = `w-${event.params.page || 'home'}` 
  this.$update() // обновить компонент
})
```

Для того, чтобы этот обработчик срабатывал сразу при открытии приложения и подключал соответствующий маршруту компонент страницы, в конце статического метода *connected()*, инициируется событие для адреса текущего маршрута из свойства **href** объекта [location](https://developer.mozilla.org/ru/docs/Web/API/Location):

```js
// инициировать событие для значения "href" текущей страницы
this.$router(emitRouter, location.href)
```

Остальные компоненты страниц загружаются при клике по соответствующей им ссылке в компоненте Menu:

```js
// добавить обработчик события "click" для элемента NAV
this.$('nav').addEventListener('click', event => {
  event.preventDefault() // отменить действие по умолчанию
  // инициировать событие для значения "href" текущей ссылки
  this.$router(emitRouter, event.target.href)
})
```

Чтобы при открытии приложения не создавался компонент страницы с неопределённым названием, используется условная проверка на значение свойства **page** объекта состояния компонента Content:

```js
// вернуть HTML-разметку компонента
static template() {
  // если свойство содержит название страницы
  if (this.page) {
    return `<${this.page} />`
  }
}
```

В этом примере используется самозакрывающийся тег для подключаемого элемента компонента:

```js
`<${this.page} />`
```

Если бы подключаемый компонент содержал [слоты](https://learn.javascript.ru/slots-composition), в которое передавалось бы какое-нибудь HTML-содержимое, то необходимо было бы использовать открывающий и закрывающий теги элемента компонента:

```js
// вернуть HTML-разметку компонента
static template() {
  // если свойство содержит название страницы
  if (this.page) {
    return `
      <${this.page}>
        <div>Какое-то HTML-содержимое</div>
      </${this.page}>
    `
  }
}
```

*Когда статический метод template() ничего не возвращает, то создаётся компонент с пустым HTML-содержимым.*

Передавать HTML-содержимое в слоты можно только для компонентов имеющих [Теневой DOM](https://learn.javascript.ru/shadow-dom). Это означает, что при обновлении компонента, HTML-содержимое передаваемое с компоненты без Теневого DOM, просто игнорируется и никакие изменения в него не вносятся.

Чтобы передавать данные в любые компоненты, можно воспользоваться  [пользовательскими атрибутами](https://developer.mozilla.org/ru/docs/Learn/HTML/Howto/Use_data_attributes), например:

```js
// вернуть HTML-разметку компонента
static template() {
  // если свойство содержит название страницы
  if (this.page) {
    // передать через пользовательский атрибут "data-color" значение цвета
    return `<${this.page} data-color="${this.color}" />`
  }
}
```

*В отличие от HTML-содержимого, атрибуты элемента любого компонента обновляются всегда.*

<br>
<br>
<h2 id="server-rendering">Серверный рендеринг</h2>

<br>

SSR (Server Side Rendering) – это методика разработки, при которой содержимое веб-страницы отрисовывается на сервере, а не в браузере клиента. Для рендеринга содержимого веб-страниц используется метод *render()*, который доступен в качестве свойства функции Ctn. Этот метод работает как на стороне сервера, так и в браузере клиента.

В примере ниже, данный метод выводит содержимое всей страницы на консоль браузера:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- подключить компонент Hello к документу -->
  <w-hello>
    <!-- передаваемое в слот HTML-содержимое -->
    <span>Расширенные Веб-компоненты</span>
  </w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // инициализация свойств объекта состояния
      message = 'Creaton'
      color = 'orange'

      static mode = 'open' // добавить Теневой DOM

      // вернуть HTML-разметку компонента
      static template() {
        return `
          <h1>${ this.message } – это <slot></slot></h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // передать класс компонента Hello функции Ctn
    Ctn(WHello)

    // вывести HTML-содержимое страницы на консоль браузера
    Ctn.render().then(html => console.log(html))
  </script>
</body>
</html>
```

*Также этот метод доступен в качестве именованного импорта, при использовании модульной версии фреймворка:*

```js
import { Render } from "./ctn.esm.js"
```

Метод возвращает [промис](https://learn.javascript.ru/promise-basics), который разрешается после того, когда HTML-содержимое всех используемых компонентов для текущего маршрута приложения будет доступно:

```js
Ctn.render().then(html => console.log(html))
```

*Компоненты других страниц, не соответствующих текущему маршруту, если приложение использует маршрутизатор, или компоненты, не принимающие участия в формировании содержимого при открытии приложения, в промисе учитываться не будут, иначе этот промис никогда бы не разрешился.*

<br>

Чтобы вывести в консоль браузера содержимое не всего документа, а только начиная с определённого элемента, необходимо передать в метод объект с параметром **parent**, значением которого будет элемент, с которого начинается вывод.

В примере ниже, содержимое документа выводится начиная с элемента BODY:

```js
Ctn.render({ parent: document.body }).then(html => console.log(html))
```

По умолчанию, метод выводит очищенное HTML-содержимое документа, т.е. такое, в которых удалены теги: STYLE, SCRIPT и TEMPLATE. Чтобы метод выводил полное HTML-содержимое, необходимо передать ему объект с параметром **clean** и значением "false", как показано ниже:

```js
Ctn.render({ clean: false }).then(html => console.log(html))
```

Во всех примерах выше, передаваемое в [слот](https://learn.javascript.ru/slots-composition) содержимое  выводилось без самих тегов SLOT. Чтобы передаваемое содержимое выводилось внутри этих тегов, т.е. в полном соответствии со структурой расположения данного содержимого в компоненте, методу необходимо передать объект с параметром **slots** и значением "true", например:

```js
Ctn.render({ slots: true }).then(html => console.log(html))
```

Все три параметра можно передавать одновременно:

```js
Ctn.render({
  parent: document.body,
  clean: false,
  slots: true
}).then(html => console.log(html))
```

<br>

Проект готового приложения расположен по этой [ссылке](https://github.com/reacton-js/creaton/tree/main/app). Для установки всех завимостей, включая и зависимости для сервера, используется команда:

```
npm i
```

Для запуска приложения в режиме разработки, используется команда:

```
npm start
```

а для финальной сборки, со всеми минимизациями приложения в режиме продакшен, команда:

```
npm run build
```

<br>

Это обычный проект с использованием менеджера задач [Gulp](https://gulpjs.com/) и сборщика модулей [Webpack](https://webpack.js.org/). Код сервера находится в файле [app.js](https://github.com/reacton-js/creaton/blob/main/app/server/app.js), а сам сервер написан с помощью фреймворка [Express](https://expressjs.com/ru/).

Файл сервера представляет собой типичное приложение на фреймворке Express:

```js
const express = require('express')
const jsdom = require('jsdom')
const { JSDOM } = require('jsdom')
const fs = require('fs')
const port = process.env.PORT || 3000

// connect database file
let DB = JSON.parse(fs.readFileSync(__dirname + '/db.json').toString())

// create an Express application object
const app = express()

// create a parser for application/x-www-form-urlencoded data
const urlencodedParser = express.urlencoded({ extended: false })

// define directory for static files and ignore index.html file
app.use(express.static(__dirname + '/public', { index: false }))

// define an array of bot names that will receive the rendered content
const listBots = [
  'Yandex', 'YaDirectFetcher', 'Google', 'Yahoo', 'Mail.RU_Bot', 'bingbot', 'Accoona', 'Lighthouse',
  'ia_archiver', 'Ask Jeeves', 'OmniExplorer_Bot', 'W3C_Validator', 'WebAlta', 'Ezooms', 'Tourlentabot', 'MJ12bot',
  'AhrefsBot', 'SearchBot', 'SiteStatus', 'Nigma.ru', 'Baiduspider', 'Statsbot', 'SISTRIX', 'AcoonBot', 'findlinks',
  'proximic', 'OpenindexSpider', 'statdom.ru', 'Exabot', 'Spider', 'SeznamBot', 'oBot', 'C-T bot', 'Updownerbot',
  'Snoopy', 'heritrix', 'Yeti', 'DomainVader', 'DCPbot', 'PaperLiBot', 'StackRambler', 'msnbot'
]

// loads only scripts and ignores all other resources
class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    return regJSFile.test(url) ? super.fetch(url, options) : null
  }
}

// define the bot agent string to test
const testAgent = process.argv[2] === 'test' ? 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' : ''

// define a regular expression to search for bot names in a string
const regBots = new RegExp(`(${listBots.join(')|(')})`, 'i')

// search for script file extensions
const regJSFile = /\.m?js$/

// favicon request
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

// database request
app.get('/db', (req, res) => res.send(DB[req.query.page]))

// all other requests
app.use(async (req, res) => {
  // if the request comes from a bot
  if (regBots.test(testAgent || req.get('User-Agent'))) {
    // define a new JSDOM object with parameters
    const dom = await JSDOM.fromFile('index.html', {
      url: req.protocol + '://' + req.get('host') + req.originalUrl, // determine the full URL
      resources: new CustomResourceLoader(), // loading only scripts
      runScripts: 'dangerously' // allow page scripts to execute
    })

    // return the rendered HTML content of the page
    dom.window.onload = async () => res.send(await dom.window._$CtnRender_())
  }
  // otherwise, if the request comes from a user
  else {
    // return the main page file of the application
    res.sendFile(__dirname + '/index.html')
  }
})

// start the server
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))
```

<br>

Чтобы метод *render()* мог работать на сервере, используется [jsdom](https://github.com/jsdom/jsdom) – это реализация Веб-стандартов на JavaScript.

Обычным пользователям не нужно отдавать отрендеренное содержимое страницы. Оно необходимо только поисковым ботам и другим автоматическим системам учёта анализа HTML-содержимого. Список этих систем находится в массиве, который можно пополнить дополнительными названиями:

```js
// define an array of bot names that will receive the rendered content
const listBots = [
  'Yandex', 'YaDirectFetcher', 'Google', 'Yahoo', 'Mail.RU_Bot', 'bingbot', 'Accoona', 'Lighthouse',
  'ia_archiver', 'Ask Jeeves', 'OmniExplorer_Bot', 'W3C_Validator', 'WebAlta', 'Ezooms', 'Tourlentabot', 'MJ12bot',
  'AhrefsBot', 'SearchBot', 'SiteStatus', 'Nigma.ru', 'Baiduspider', 'Statsbot', 'SISTRIX', 'AcoonBot', 'findlinks',
  'proximic', 'OpenindexSpider', 'statdom.ru', 'Exabot', 'Spider', 'SeznamBot', 'oBot', 'C-T bot', 'Updownerbot',
  'Snoopy', 'heritrix', 'Yeti', 'DomainVader', 'DCPbot', 'PaperLiBot', 'StackRambler', 'msnbot'
]
```

Если в заголовке запроса будет присутствовать любое из этих названий, то сервер будет отдавать отрендеренное HTML-содержимое:

```js
// if the request comes from a bot
if (regBots.test(testAgent || req.get('User-Agent'))) {
  // define a new JSDOM object with parameters
  const dom = await JSDOM.fromFile('index.html', {
    url: req.protocol + '://' + req.get('host') + req.originalUrl, // determine the full URL
    resources: new CustomResourceLoader(), // loading only scripts
    runScripts: 'dangerously' // allow page scripts to execute
  })

  // return the rendered HTML content of the page
  dom.window.onload = async () => res.send(await dom.window._$CtnRender_())
}
```

Для всех остальных запросов, сервер будет возвращать файл *index.html*, который является единственным *html*-файлом в этом одностраничном приложении:

```js
// otherwise, if the request comes from a user
else {
  // return the main page file of the application
  res.sendFile(__dirname + '/index.html')
}
```

<br>

Рендеринг осуществляется с помощью функции *\_$CtnRender\_()* глобального объекта [window](https://github.com/jsdom/jsdom?tab=readme-ov-file#basic-usage), как показано ниже:

```js
// return the rendered HTML content of the page
dom.window.onload = async () => res.send(await dom.window._$CtnRender_())
```

Эта функция назначается объекту в файле [index.js](https://github.com/reacton-js/creaton/blob/main/app/src/index.js), который является главным файлом всего приложения:

```js
// add the Render method as a property of the window object
window._$CtnRender_ = Render
```

<br>

Рендеринг не поддерживает [динамические импорты](https://learn.javascript.ru/modules-dynamic-imports), вместо них необходимо использовать обычные инструкции [импорта и экспорта](https://learn.javascript.ru/import-export) модулей. Кроме этого, рендеринг не поддерживает глобальный метод [fetch()](https://learn.javascript.ru/fetch). Вместо него необходимо использовать встроенный объект [XMLHttpRequest](https://learn.javascript.ru/xmlhttprequest).

*Объект XMLHttpRequest можно обернуть в функцию и затем, вызывать эту функцию вместо того, чтобы каждый раз писать код запроса этого объекта вручную, как показано в файле [helpers.js](https://github.com/reacton-js/creaton/blob/main/app/src/helpers.js), например:*

```js
export const httpRequest = (url, method = 'GET', type = 'json') => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.responseType = type
  xhr.send()
  return new Promise(ok => xhr.onload = () => ok(xhr.response))
}
```

<br>

После установки всех зависимостей приложения из файла [package.json](https://github.com/reacton-js/creaton/blob/main/app/package.json), для запуска сервера в обычном режиме, необходимо открыть консоль из каталога */server*, и ввести в ней следующую  команду:

```
node app
```

а чтобы посмотреть, как сервер рендерит содержимое для поисковых систем, необходимо ввести команду:

```
node app test
```

<br>
<br>