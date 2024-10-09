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
5. ~~[Статические свойства](#static-properties)~~
6. ~~[Служебные методы](#service-methods)~~
7. ~~[Эмиттер](#emitter)~~
8. ~~[Маршрутизатор](#router)~~
9. ~~[SSR](#ssr)~~

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

Встроенный компонент должен возвращать свой класс, а содержимое его тега &lt;script&gt; можно рассматривать как функцию. Однако, встроенные компоненты не подходят для рендеринга на стороне сервера и, кроме этого, в них нельзя использовать инструкцию *import*, но допускается использование выражения [import()](https://learn.javascript.ru/modules-dynamic-imports#vyrazhenie-import), например:

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
  // инициализация свойств объекта состояния
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

Для доступа к объекту состояния, применяется служебное свойство *$state*. С помощью этого свойства, можно получить или присвоить новое значение состоянию, как показано ниже:

```
hello.$state.message = 'Веб-компоненты'
```

Для обновления содержимого компонента на основе нового состояния, применяется служебный метод *$update()*, как показано ниже:

```
hello.$update()
```

<br>

Когда содержимое компонента обновляется, то его старый DOM не удаляется. Вместо этого, создаётся временный виртуальный DOM, на основе возвращаемого содержимого статического метода *template()* и обновлённого объекта состояния. Это означает, что обработчики, назначенные элементам внутри компонента, сохраняются, поскольку старый элемент не заменяется новым элементом.

В примере ниже, обработчик элемента &lt;h1&gt; будет работать и после обновления компонента. Поскольку обновление изменит только старое значение его атрибута и текстового содержимого:

```js
class WHello {
  // инициализация свойств объекта состояния
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
  // инициализация свойств объекта состояния
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
  // инициализация свойств объекта состояния
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
    // инициализация свойств объекта состояния
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
  // инициализация свойств объекта состояния
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
      // инициализация свойств объекта состояния
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
      // инициализация свойств объекта состояния
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