<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

![rigl](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Creaton⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js)

<br>

Creaton - это плагин JavaScript для быстрого создания [Веб-компонентов](https://learn.javascript.ru/web-components). Плагин поддерживает все технологии, методы и свойства, которые предоставляются стандартными Веб-компонентами.

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
2. ~~[Объект компонента](#component-object)~~
3. ~~[Выражения](#expressions)~~
4. ~~[Циклы](#cycles)~~
5. ~~[Пользовательские события](#custom-events)~~

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