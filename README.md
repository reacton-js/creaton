<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

<h3>Advanced Web Components</h3>

<br>

![creaton](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [GitFlic](https://gitflic.ru/project/reacton/creaton) | [GitVerse](https://gitverse.ru/awc/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Download⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/ctn.global.min.js)

<br>

Creaton (short Ctn) is a JavaScript framework for quickly creating [Web Components](https://javascript.info/web-components). It supports all the methods and properties that are provided by standard Web components. In addition, the framework contains a number of additional methods and implements server-side rendering of Web components.

<br>

Below is an example of creating a simple component:

```js
class WHello {
  // initializing the properties of a state object
  message = 'Creaton'
  color = 'orange'

  static mode = 'open' // add Shadow DOM

  // return the HTML markup of the component
  static template() {
    return `
      <h1>Hello, ${ this.message }!</h1>
      
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

1. [Quick start](#quick-start)
2. [Component state](#component-state)
3. [Cycles](#cycles)
4. [Mixins](#mixins)
5. ~~[Static properties](#static-properties)~~
6. ~~[Service methods](#service-methods)~~
7. ~~[Emitter](#emitter)~~
8. ~~[Router](#router)~~
9. ~~[SSR](#ssr)~~

<br>
<hr>
<br>

<h2 id="quick-start">Quick start</h2>

<br>

Classes are used to create components. Classes can be either built into the main script or imported from an external module. Create a new working directory, for example named *app*, and download the [ctn.global.js](https://raw.githubusercontent.com/reacton-js/creaton/main/ctn.global.js) file into this directory.

Add an *index.html* file to the directory with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // initializing the properties of a state object
      message = 'Creaton'
      color = 'orange'

      static mode = 'open' // add Shadow DOM

      // return the HTML markup of the component
      static template() {
        return `
          <h1>Hello, ${ this.message }!</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // pass the class of the Hello component to the Ctn function
    Ctn(WHello)
  </script>
</body>
</html>
```

To ensure there are no naming conflicts between standard and custom HTML elements, the component name must contain a dash «-», for example, "my-element" and "super-button" are valid names, but "myelement" is not.

In most of the examples in this guide, the prefix will consist of a single letter «w-». that is, the Hello component will be called "w-hello".

When defining a component class, its prefix and name must begin with a capital letter. WHello is the correct class name, but wHello is not.

When you open the *index.html* file in the browser, the screen will display the message created in the Hello component:

<h1 style="color: orange;">Hello, Creaton!</h1>

<br>

The components can be placed in separate modules. In this case, the Hello component file would look like the following:

```js
export default class WHello {
  // initializing the properties of a state object
  message = 'Creaton'
  color = 'orange'

  static mode = 'open' // add Shadow DOM

  // return the HTML markup of the component
  static template() {
    return `
      <h1>Hello, ${ this.message }!</h1>
      
      <style>
        h1 {
          color: ${ this.color };
        }
      </style>
    `
  }
}
```

To work with external components, you will need any development server, such as [lite-server](https://www.npmjs.com/package/lite-server).

You can install this server using the command in the terminal:

```
npm install --global lite-server
```

The server is started from the directory where the application is located using a command in the terminal:

```
lite-server
```

<br>

In addition, the framework supports single-file components that can be used along with modular ones when creating a project in the [webpack](https://webpack.js.org/) build system.

An example of a simple single-file component is shown below:

```html
<h1>Hello, ${ this.message }!</h1>
      
<style>
  h1 {
    color: ${ this.color };
  }
</style>

<script>
  exports = class WHello {
    // initializing the properties of a state object
    message = 'Creaton'
    color = 'orange'

    static mode = 'open' // add Shadow DOM
  }
</script>
```

A single-file component must assign its class to the **exports** variable. This variable will be automatically declared during the creation of the component structure in the project's build system.

In single-file components, you can use the [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) instruction, for example:

```html
<script>
  // import default object from module
  import obj from './module.js'

  exports = class WHello {
    // initializing the properties of a state object
    message = obj.message
    color = obj.color

    static mode = 'open' // add Shadow DOM
  }
</script>
```

<br>

Single-file components allow you to separate HTML markup from component logic. However, such components cannot work directly in the browser. They require a special handler that connects to the *webpack*.

To be able to work in the browser with components in which logic is separated from HTML content, there are built-in components.

An example of a simple embedded component is shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

  <!-- define the template of the Hello component -->
  <template id="tempHello">
    <h1>Hello, ${ this.message }!</h1>
          
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>

    <script>
      return class WHello {
        // initializing the properties of a state object
        message = 'Creaton'
        color = 'orange'

        static mode = 'open' // add Shadow DOM
      }
    </script>
  </template>

  <script src="ctn.global.js"></script>

  <script>
    // pass the template of the Hello component to the Ctn function
    Ctn(tempHello)
  </script>
</body>
</html>
```

The embedded component should return its class, and the contents of its  &lt;script&gt; tag can be considered as a function. However, embedded components are not suitable for server-side rendering and, in addition, they cannot use the *import* instruction, but it is allowed to use the expression [import()](https://javascript.info/modules-dynamic-imports#the-import-expression), for example:

```html
<script>
  // import a module and save its object in a variable
  let obj = await import('./module.js')

  return class WHello {
    // initializing the properties of a state object
    message = obj.message
    color = obj.color

    static mode = 'open' // add Shadow DOM
  }
</script>
```

<br>

For quick access to the component, it is enough to add an identifier to the element that connects the component to the document, as shown below:

```html
<!-- connect Hello component to the document -->
<w-hello id="hello"></w-hello>
```

Now open the browser console and enter the commands sequentially:

```
hello.$state.message = 'Web Components'
hello.$state.color = 'green'
hello.$update()
```

The color and content of the header will change:

<h1 style="color: green;">Hello, Web Components!</h1>

<br>
<br>
<h2 id="component-state">Component state</h2>

<br>

Each component can contain changing data, which is called a state. The state can be defined in the constructor of the component class:

```js
class WHello {
  constructor() {
    // initializing the properties of a state object
    this.message = 'Creaton'
    this.color = 'orange'
  }
  ...
}
```

Alternatively, using the new syntax, you can define the state directly in the class itself:

```js
class WHello {
  // initializing the properties of a state object
  message = 'Creaton'
  color = 'orange'
  ...
}
```

<br>

The methods of a component are not a state. They are designed to perform actions with the state of the component and are stored in the prototype of the state object:

```js
class WHello {
  // initializing the properties of a state object
  message = 'Creaton'

  // define the method of the state object
  printStr(str) {
    return this.message
  }

  // return the HTML markup of the component
  static template() {
    return `
      <h1>Hello, ${ this.printStr() }!</h1>
    `
  }
}
```

<br>

The service property *$state* is used to access the state object. Using this property, you can get or assign a new value to the state, as shown below:

```
hello.$state.message = 'Web Components'
```

To update the component content based on the new state, the service method *$update()* is used, as shown below:

```
hello.$update()
```

<br>

When the content of a component is updated, its old DOM is not deleted. Instead, a temporary virtual DOM is created based on the returned contents of the static *template()* method and the updated state object. This means that the handlers assigned to the elements inside the component are preserved, since the old element is not replaced by a new element.

In the example below, the handler for the &lt;h1&gt; element will still work after the component is updated. Because the update will only change the old value of its attribute and text content:

```js
class WHello {
  // initializing the properties of a state object
  message = 'Creaton'

  /* this method is performed after connecting the component to the document
    when the DOM has already been created for the component from which you can select elements */
  static connected() {
    this.$('h1').addEventListener('click', e => console.log(e.target))
  }

  // return the HTML markup of the component
  static template() {
    return `
      <h1 title="${ this.message }">Hello, ${ this.message }!</h1>
    `
  }
}
```

<br>
<br>
<h2 id="cycles">Cycles</h2>

<br>

To output loops, the [map()](https://javascript.info/array-methods#map) and [join()](https://javascript.info/array-methods#split-and-join) methods or the [reduce()](https://javascript.info/array-methods#reduce-reduceright) method are used.

When using the *map()* method, you must add the *join()* method with an empty string argument at the end to remove commas between array elements:

```js
class WHello {
  // initializing the properties of a state object
  rgb = ['Red', 'Green', 'Blue']

  // return the HTML markup of the component
  static template() {
    return `
      <ul>
        ${ this.rgb.map(col => `<li>${ col }</li>`).join('') }
      </ul>
    `
  }
}
```

When using the *reduce()* method, you do not need to add the *join()* method at the end:

```js
class WHello {
  // initializing the properties of a state object
  rgb = ['Red', 'Green', 'Blue']

  // return the HTML markup of the component
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

You can use the special tagged function *$tag*, which automatically adds the *join()* method to all arrays and can call methods of the state object when they are specified in HTML markup without parentheses "()", for example:

```js
class WHello {
  // initializing the properties of a state object
  rgb = ['Red', 'Green', 'Blue']
  message = 'Creaton'

  // define the method of the state object
  printStr(str) {
    return this.message
  }

  // return the HTML markup of the component
  static template() {
    return this.$tag`
      <h1>Hello, ${ this.printStr }!</h1>
      <ul>
        ${ this.rgb.map(col => `<li>${ col }</li>`) }
      </ul>
    `
  }
}
```

By default, all embedded and single-file components use this function to create their HTML content:

```html
<ul>
  ${ this.printArr }
</ul>

<script>
  exports = class WHello {
    // initializing the properties of a state object
    rgb = ['Red', 'Green', 'Blue']

    // define the method of the state object
    printArr() {
      return this.rgb.map(col => `<li>${ col }</li>`)
    }
  }
</script>
```

<br>

To output objects, the [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) method is used, as shown below:

```js
class WHello {
  // initializing the properties of a state object
  user = {
    name: 'John',
    age: 36
  }

  // define the method of the state object
  printObj() {
    const { user } = this
    return Object.keys(user).map(prop => `<li>${ prop } – ${ user[prop] }</li>`)
  }

  // return the HTML markup of the component
  static template() {
    return this.$tag`
      <ul>${ this.printObj }</ul>
    `
  }
}
```

or a *for-in* loop, for example:

```js
// define the method of the state object
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
<h2 id="mixins">Mixins</h2>

<br>

Mixin is a general term in object-oriented programming: a class that contains methods for other classes. These methods can use different components, which eliminates the need to create methods with the same functionality for each component separately.

In the example below, the mixin's *printName()* method is used by the Hello and Goodbye components:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

   <!-- connect Goodbye component to the document -->
  <w-goodbye></w-goodbye>

  <script src="ctn.global.js"></script>

  <script>
    // define a Mixin class for common methods
    class Mixin {
      printName() {
        return this.userName
      }
    }

    // extend the Hello component class from the Mixin class
    class WHello extends Mixin {
      // initializing the properties of a state object
      userName = 'Anna'

      // return the HTML markup of the component
      static template() {
        return `
          <h1>Hello, ${ this.printName() }!</h1>
        `
      }
    }

    // extend the Goodbye component class from the Mixin class
    class WGoodbye extends Mixin {
      // initializing the properties of a state object
      userName = 'John'

      // return the HTML markup of the component
      static template() {
        return `
          <p>Goodbye, ${ this.printName() }...</p>
        `
      }
    }

    // pass the Hello and Goodbye component classes to the Ctn function
    Ctn(WHello, WGoodbye)
  </script>
</body>
</html>
```

<br>
<br>