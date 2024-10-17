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
5. [Static properties](#static-properties)
6. [Special methods](#special-methods)
7. [Event Emitter](#event-emitter)
8. [Router](#router)
9. [Server-side rendering](#server-rendering)

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

The embedded component should return its class, and the contents of its  &lt;script&gt; tag can be considered as a function. However, embedded components are not suitable for server-side rendering and, in addition, they cannot use the **import** instruction, but it is allowed to use the expression [import()](https://javascript.info/modules-dynamic-imports#the-import-expression), for example:

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

Regardless of the component type, when using the backquote character «&grave;» in HTML markup, it must be escaped with the backslash character «&bsol;», as shown below:

```js
// return the HTML markup of the component
static template() {
  return `
    <h1>\`Hello\`, ${ this.message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>
  `
}
```

This is due to the fact that the HTML markup of any component is always placed inside a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). For single-file and embedded components, this is done at the level of converting them into a regular component class.

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

The special property *$state* is used to access the state object. Using this property, you can get or assign a new value to the state, as shown below:

```
hello.$state.message = 'Web Components'
```

To update the component content based on the new state, the special method *$update()* is used, as shown below:

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
<h2 id="static-properties">Static properties</h2>

<br>

**name** – this static property used, for example, when an anonymous class is passed to the Ctn function, as shown below:

```js
// pass the anonymous class of the Hello component to the Ctn function
Ctn(class {
  static name = 'w-hello' // name of the component
  
  // initializing the properties of a state object
  message = 'Creaton'

  // return the HTML markup of the component
  static template() {
    return `
      <h1>Hello, ${ this.message }!</h1>
    `
  }
})
```

<br>

**mode** – this static property responsible for adding a [Shadow DOM](https://javascript.info/shadow-dom) to the component. It can contain two values: "open" or "closed". In the latter case, when the component is closed, it is impossible to access the properties of its state object, methods for selecting elements and updating the content from the console.

Access to the properties of the state object, methods for selecting and updating the content of the component, in closed components is possible only from static methods, for example:

```js
class WHello {
  static mode = 'closed' // add a closed Shadow DOM

  // it is performed at the end of connecting the component to the document
  static connected() {
    // get an element using the sampling method
    const elem = this.$('h1')

    // add an event handler to the element
    elem.addEventListener('click', e => console.log(e.target))
  }

  // initializing the properties of a state object
  message = 'Creaton'

  // return the HTML markup of the component
  static template() {
    return `
      <h1>Hello, ${ this.message }!</h1>
    `
  }
}
```

*Only components with a Shadow DOM can contain [local styles](https://javascript.info/shadow-dom-style).*

<br>

**extends** – this static property responsible for creating [customized components](https://javascript.info/custom-elements#customized-built-in-elements), i.e. those that are embedded in standard HTML elements, for example:

```html
<body>
  <!-- embed the Hello component in the header element -->
  <header is="w-hello"></header>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      static extends = 'header' // the name of the embedded element

      // initializing the properties of a state object
      message = 'Creaton'

      // return the HTML markup of the component
      static template() {
        return `
          <h1>Hello, ${ this.message }!</h1>
        `
      }
    }

    // pass the class of the Hello component to the Ctn function
    Ctn(WHello)
  </script>
</body>
```

*The property must contain the name of the embedded element, and the embedded element itself must contain the [is](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) attribute with a value equal to the name of the component embedded in it.*

<br>

**serializable** – this static property responsible for [serializing](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/serializable) the Shadow DOM of the component using the [getHTML()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getHTML) method. By default, it has the value "false".

<br>

**template()** – this static method returns the future HTML content of the component:

```js
// return the HTML markup of the component
static template() {
  return `
    <h1>Hello, ${ this.message }!</h1>
  `
}
```

<br>

**startConnect()** – this static method is executed at the very beginning of connecting the component to the document, before generating the HTML content of the component and calling the static *connected()* method, but after creating the component state object.

In it, you can initialize the properties of the state object with the existing values:

```js
class WHello {
  // it is performed at the beginning of connecting the component to the document
  static startConnect() {
    // initializing the property of a state object
    this.message = 'Creaton'
  }

  // return the HTML markup of the component
  static template() {
    return `
      <h1>Hello, ${ this.message }!</h1>
    `
  }
}
```

or get data from the server to initialize their. But in this case, the method must be asynchronous:

```js
class WHello {
  // it is performed at the beginning of connecting the component to the document
  static async startConnect() {
    // initializing the state object property with data from a conditional server
    this.message = await new Promise(ok => setTimeout(() => ok('Creaton'), 1000))
  }

  // return the HTML markup of the component
  static template() {
    return `
      <h1>Hello, ${ this.message }!</h1>
    `
  }
}
```

*This is the only static method that can be asynchronous.*

<br>

**connected()** – this static method is executed at the very end of connecting the component to the document, after generating the HTML content of the component and calling the static *startConnect()* method.

In it, you can add event handlers to the internal elements of the component:

```js
class WHello {
  // it is performed at the end of connecting the component to the document
  static connected() {
    // get an element using the sampling method
    const elem = this.$('h1')

    // add an event handler to the element
    elem.addEventListener('click', e => console.log(e.target))
  }

  // initializing the properties of a state object
  message = 'Creaton'

  // return the HTML markup of the component
  static template() {
    return `
      <h1>Hello, ${ this.message }!</h1>
    `
  }
}
```

*This and all subsequent static methods are abbreviations of the [standard static](https://javascript.info/custom-elements) methods of the component.*

<br>

**disconnected()** – this static method is executed when a component is removed from a document.

**adopted()** – this static method is executed when the component is moved to a new document.

**changed()** – this static method is executed when one of the monitored attributes is changed.

**attributes** – this static array contains the names of the monitored attributes, for example:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello data-message="Creaton"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // it is performed at the beginning of connecting the component to the document
      static startConnect() {
        // initializing the property of a state object
        this.message = this.$data.message
      }

      // it is performed at the end of connecting the component to the document
      static connected() {
        // get an element using the sampling method
        const elem = this.$('h1')

        // add an event handler to the element
        elem.addEventListener('click', e => this.$data.message = 'Web components')
      }

      // it is executed when one of the monitored attributes is changed
      static changed(name, oldValue, newValue) {
        // if the new attribute value is not equal to the old value 
        if (newValue !== oldValue) {
          // change the value of a state object property
          this.message = newValue

          this.$update() // update the HTML content of the component
        }
      }

      // contains the names of the monitored attributes
      static attributes = ['data-message']

      // return the HTML markup of the component
      static template() {
        return `
          <h1>Hello, ${ this.message }!</h1>
        `
      }
    }

    // pass the class of the Hello component to the Ctn function
    Ctn(WHello)
  </script>
</body>
```

<br>

All static methods are called in the context of the [proxy](https://javascript.info/proxy) of the component state object. This means that if the required property is not found in the state object, then the search takes place in the component itself.

In the example below, the **id** property does not exist in the component state object. Therefore, it is requested from the component itself:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello id="hello"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // return the HTML markup of the component
      static template() {
        return `
          <h1>Hello, the component with the ID ${ this.id }!</h1>
        `
      }
    }

    // pass the class of the Hello component to the Ctn function
    Ctn(WHello)
  </script>
</body>
```

<br>
<br>
<h2 id="special-methods">Special methods</h2>

<br>

All special methods and properties start with the dollar symbol «$» followed by the name of the method or property.

**\$update()** – this special method is performed to update the contents of the component after its state has changed:

```
hello.$state.message = 'Web Components'
hello.$update()
```

*This method updates the contents of private components only if it is called from static methods of the component class. For all other component types, it returns the number of milliseconds it took for the component's contents to be updated.*

<br>

**\$()** – this special method selects an element from the component content by the specified selector, for example, to add an event handler to the element:

```js
// it is performed at the end of connecting the component to the document
static connected() {
  // get an element using the sampling method
  const elem = this.$('h1')

  // add an event handler to the element
  elem.addEventListener('click', e => console.log(e.target))
}
```

*This method fetches the contents of private components only if it is called from static methods of the component class.*

<br>

**\$$()** – this special method selects all elements from the component content by the specified selector, for example, to add event handlers to the elements when iterating through them in a loop:

```js
// it is performed at the end of connecting the component to the document
static connected() {
  // get all elements using the sampling method
  const elems = this.$$('h1')

  // iterate through a collection of elements in a loop
  for (const elem of elems) {
    // add an event handler to the element
    elem.addEventListener('click', e => console.log(e.target))
  }
}
```

*This method fetches the contents of private components only if it is called from static methods of the component class.*

<br>

**\$entities()** – this special method neutralizes a string containing HTML content obtained from unreliable sources. By default, the ampersand character «&amp;» is escaped, characters less than «&lt;» and more than «&gt;», double «&quot;» and single quotes «&#39;», for example:

```js
class WHello {
  // it is performed at the beginning of connecting the component to the document
  static async startConnect() {
    // getting HTML content from a conditional server
    const html = await new Promise(ok => setTimeout(() => ok('<script>dangerous code<\/script>'), 1000))

    // initialization of a state object property with neutralized HTML content
    this.message = this.$entities(html)
  }

  // return the HTML markup of the component
  static template() {
    return this.message
  }
}
```

In addition to the above characters, you can escape any characters by passing an array in the second and subsequent arguments of the form: [regular expression, replacement string], for example:

```js
this.$entities(html, [/\(/g, '&lpar;'], [/\)/g, '&rpar;'])
```

*This method is available as a property of the Ctn function, as shown below:*

```js
Ctn.entities(html)
```

*or [named import](https://javascript.info/import-export#import) when using the modular version of the framework:*

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

  <script type="module">
    import Ctn, { Entities } from "./ctn.esm.js"

    class WHello {
      // return the HTML markup of the component
      static template() {
        return `
          ${ Entities('<script>dangerous code<\/script>') }
        `
      }
    }

    // pass the class of the Hello component to the Ctn function
    Ctn(WHello)
  </script>
</body>
```

<br>

**\$tag()** – this special tagged function, which automatically adds the [join()](https://javascript.info/array-methods#split-and-join) method to all arrays and can call methods of the state object when they are specified in HTML markup without parentheses "()", for example:

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

<br>

The special methods: *\$event()*, *\$router()* and *\$render()* will be discussed in the following sections. As with the *\$entities()* method, they also have their own named imports:

```js
import Ctn, { Tag, Event, Router, Render } from "./ctn.esm.js"
```

*The Ctn function is always imported by default.*

<br>

**\$state** – this special property refers to the [proxy](https://javascript.info/proxy) of the component's data object. This means that if the required property is not found in the state object, the search occurs in the component itself.

In the example below, the **id** property does not exist in the component state object. Therefore, it is requested from the component itself:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello id="hello"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // return the HTML markup of the component
      static template() {
        return `
          <h1>Hello, component with ID ${ this.id }!</h1>
        `
      }
    }

    // pass the class of the Hello component to the Ctn function
    Ctn(WHello)
  </script>
</body>
```

<br>

**\$host** – this special property refers to the element that connects the component to the document, i.e. the component element. This can be useful if properties with the same name are present in both the state object and the component..

The proxy of the state object initially looks for a property in the state object itself, which means that to get the property of the same name from the component element, you must use the special property *$host*, as shown below:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello id="hello"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // initializing the property of a state object
      id = 'Creaton'

      // return the HTML markup of the component
      static template() {
        return `
          <h1>Hello, the ID property with the value ${ this.id }!</h1>
          <h2>Hello, component with ID ${ this.$host.id }!</h2>
        `
      }
    }

    // pass the class of the Hello component to the Ctn function
    Ctn(WHello)
  </script>
</body>
```

<br>

**\$shadow** – this special property refers to the [Shadow DOM](https://javascript.info/shadow-dom) of the component:

```
hello.$shadow
```

*For closed components and components without a Shadow DOM, this property returns "null".*

<br>

**\$data** – this special property refers to the component's [dataset](https://javascript.info/dom-attributes-and-properties#non-standard-attributes-dataset) object, which is used to access [custom attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), for example:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello data-message="Creaton"></w-hello>

  <script src="ctn.global.js"></script>

  <script>
    class WHello {
      // return the HTML markup of the component
      static template() {
        return `
          <h1>Hello, ${ this.$data.message }!</h1>
        `
      }
    }

    // pass the class of the Hello component to the Ctn function
    Ctn(WHello)
  </script>
</body>
```

<br>
<br>
<h2 id="event-emitter">Event Emitter</h2>

<br>

To enable components to interact with each other and exchange data, [custom events](https://javascript.info/dispatch-events#custom-events) are used. To create custom events, a special *$event()* method is used, which is available as a property of the Ctn function.

If the method is called as a constructor, it returns a new emitter object that will generate and track user events, for example:

```js
const emit = new Ctn.event()
```

An ordinary [fragment of a document](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) acts as an emitter. You can create as many new emitters as you want, and each emitter can generate and track as many new user events as you want.

When the *$event()* method is called as a regular function, it receives an emitter in the first argument, the name of the user event is passed in the second, and any data can be passed in the third argument:

```js
this.$event(emit, 'new-array', ['Orange', 'Violet'])
```

This data will then be available in the custom event handler as the **detail** property of the [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object, as shown below:

```js
emit.addEventListener('new-array', event => {
  this.rgb = event.detail
  this.$update()
})
```

*In the [webpack](https://webpack.js.org/) build system, the emitter can be exported from a separate module, for example, from a file Events.js:*

```js
import { Event } from 'creaton-js'
export const Emit = new Event()
```

*for the subsequent import of the emitter in the files of the components that will use it:*


```js
import { Emit } from './Events'
```

<br>

In the example below, a "click" event handler is added to each button from the Hello component, inside which the corresponding user event of the emitter object is triggered.

To track user events, the emitter is assigned the appropriate handlers in the Colors component. In the last handler, through the **detail** property of the Event object, a new array is assigned to the state property:

```html
<body>
  <!-- connect Hello component to the document -->
  <w-hello></w-hello>

   <!-- connect Colors component to the document -->
  <w-colors></w-colors>

  <script src="ctn.global.js"></script>

  <script>
    // create a new emitter object
    const emit = new Ctn.event()

    class WHello {
      // return the HTML markup of the component
      static template() {
        return `
          <button id="reverse">Reverse an array</button>
          <button id="new-array">New array</button>
        `
      }

      // it is performed at the end of connecting the component to the document
      static connected() {
        // add an event handler to the "Reverse an array" button
        this.$('#reverse').addEventListener('click', () => {
          // initiate the "reverse" event
          this.$event(emit, 'reverse')
        })

        // add an event handler to the "New array" button
        this.$('#new-array').addEventListener('click', () => {
          // initiate the "new-array" event
          this.$event(emit, 'new-array', ['Orange', 'Violet'])
        })
      }
    }

    class WColors {
      // initializing the property of a state object
      rgb = ['Red', 'Green', 'Blue']

      // return the HTML markup of the component
      static template() {
        return `
          <ul>
            ${ this.rgb.reduce((str, col) => str += `<li>${ col }</li>`, '') }
          </ul>
        `
      }

      // it is performed at the end of connecting the component to the document
      static connected() {
        // add a "reverse" event handler to the emitter
        emit.addEventListener('reverse', () => {
          this.rgb.reverse() // reverse an array
          this.$update() // update component
        })

        // add a "new-array" event handler to the emitter
        emit.addEventListener('new-array', event => {
          this.rgb = event.detail // assign a new array to the property
          this.$update() // update component
        })
      }
    }

    // pass the Hello and Colors component classes to the Ctn function
    Ctn(WHello, WColors)
  </script>
</body>
```

<br>
<br>
<h2 id="router">Router</h2>

<br>

The [router](https://expressjs.com/en/guide/routing.html) is based on user events. To create route events, a special method *$router()* is used, which is available as a property of the Ctn function.

If the method is called as a constructor, it returns a new emitter object with the redefined [addEventListener()](https://javascript.info/introduction-browser-events#addeventlistener) method, which will generate and track route events, for example:

```js
const emitRouter = new Ctn.router()
```

When the *$router()* method is called as a regular function, it receives an emitter in the first argument, the name of the route event is passed in the second, and any data can be passed in the third argument:

```js
this.$router(emitRouter, '/about', ['Orange', 'Violet'])
```

In a real application, the name of the route event is not specified directly, as in the example above, but is taken from the value of the **href** attribute of the link that was clicked, for example:

```js
this.$router(emitRouter, event.target.href, ['Orange', 'Violet'])
```

<br>

The user data passed in the last argument of the *$router()* method will be available in the route event handler as the **detail** property of the [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object, as shown below:

```js
emitRouter.addEventListener('/about', event => {
  const arr = event.detail
  ...
})
```

The initial slash «/» in the name of the route event is optional:

```js
emitRouter.addEventListener('about', event => {
  const arr = event.detail
  ...
})
```

The rest of the name of the route event, except for the initial slash, must completely match the value of the **href** attribute of the link, after clicking on which the handler corresponding to this value will be triggered:

```html
<a href="/about">About</a>
```

<br>

The difference between user-defined and route events is that the string specified in the route event handler is converted to a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) and can contain [special](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#using_special_characters) regular expression characters, as shown below:

```js
emitRouter.addEventListener('/abou\\w', event => {
  ...
})
```

In order not to have to use the backslash character twice in a regular string to escape special characters of regular expressions, you can use the tagged function [raw()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw) of the built-in [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) object by enclosing the name of the route event in a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), for example:


```js
emitRouter.addEventListener(String.raw`/abou\w`, event => {
  ...
})
```

or so:

```js
const raw = String.raw
emitRouter.addEventListener(raw`/abou\w`, event => {
  ...
})
```

<br>

In addition to the **detail** property, the Event object has an additional **params** property to get [route parameters](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#route_parameters), as shown below:

```js
emitRouter.addEventListener('/categories/:catId/products/:prodId', event => {
  const catId = event.params["catId"]
  const prodId = event.params["prodId"]
  ...
})
```

This handler will be executed for all links of the form:

```html
<a href="/categories/5/products/7">Product</a>
```

then **catId** will have the value 5 and **prodId** will have the value 7.

To support query parameters, the Event object has an additional **search** property, which is a short reference to the [searchParams](https://javascript.info/url#searchparams) property of the built-in [URL](https://javascript.info/url) class, for example:

```js
const raw = String.raw
emitRouter.addEventListener(raw`/categories\?catId=\d&prodId=\d`, event => {
  const catId = event.search.get("catId")
  const prodId = event.search.get("prodId")
  ...
})
```

This handler will be executed for all links of the form:

```html
<a href="/categories?catId=5&prodId=7">Product</a>
```

then **catId** will have the value 5 and **prodId** will have the value 7.

The last addition property of the Event object is called **url**, which is an object of the built-in [URL](https://javascript.info/url) class and helps parse the request into parts:

```js
emitRouter.addEventListener('/about', event => {
  const hostname = event.url.hostname
  const origin = event.url.origin
  ...
})
```

<br>

Below is an example of creating a simple router with three components for pages:

```html
<body>
   <!-- connect Menu component to the document -->
  <w-menu></w-menu>

   <!-- connect Content component to the document -->
  <w-content></w-content>

  <script src="ctn.global.js"></script>

  <script>
    class WHome {
      // return the HTML markup of the component
      static template() {
        return `<h1>Home</h1>`
      }
    }
    class WAbout {
      // return the HTML markup of the component
      static template() {
        return `<h1>About</h1>`
      }
    }
    class WContacts {
      // return the HTML markup of the component
      static template() {
        return `<h1>Contacts</h1>`
      }
    }

    // create a new emitter object for the router
    const emitRouter = new Ctn.router()

    class WMenu {
      // it is performed at the end of connecting the component to the document
      static connected() {
        // add a "click" event handler for the NAV element
        this.$('nav').addEventListener('click', event => {
          event.preventDefault() // undo the default action
          // initiate an event for the "href" value of the current link
          this.$router(emitRouter, event.target.href)
        })
      }
    
      // return the HTML markup of the component
      static template() {
        return `
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contacts">Contacts</a>
          </nav>
        `
      }
    }

    class WContent {
      // initializing the property of a state object
      page = ''

      // it is performed at the end of connecting the component to the document
      static connected() {
        // add an event handler to the emitter with an optional route parameter
        emitRouter.addEventListener(`(:page)?`, event => {
          // assign a page component name to the property
          this.page = `w-${event.params.page || 'home'}` 
          this.$update() // update component
        })
        
        // initiate an event for the "href" value of the current page
        this.$router(emitRouter, location.href)
      }

      // return the HTML markup of the component
      static template() {
        // if the property contains the page name
        if (this.page) {
          return `<${this.page} />`
        }
      }
    }

    // pass component classes to the Ctn function
    Ctn(WHome, WAbout, WContacts, WMenu, WContent)
  </script>
</body>
```

To handle the routes of these pages, the router emitter is assigned a handler with an optional route parameter in the Content component:

```js
// add an event handler to the emitter with an optional route parameter
emitRouter.addEventListener(`(:page)?`, event => {
  // assign a page component name to the property
  this.page = `w-${event.params.page || 'home'}` 
  this.$update() // update component
})
```

In order for this handler to fire immediately when opening the application and connect the page component corresponding to the route, at the end of the *connected()* static method, an event is triggered for the address of the current route from the **href** property of the [location](https://developer.mozilla.org/en-US/docs/Web/API/Location) object:

```js
// initiate an event for the "href" value of the current page
this.$router(emitRouter, location.href)
```

The rest of the pages components are loaded when you click on the corresponding link in the Menu component:

```js
// add a "click" event handler for the NAV element
this.$('nav').addEventListener('click', event => {
  event.preventDefault() // undo the default action
  // initiate an event for the "href" value of the current link
  this.$router(emitRouter, event.target.href)
})
```

To prevent a page component with an undefined name from being created when the application is opened, a conditional check is used on the value of the **page** property of the Content component's state object:

```js
// return the HTML markup of the component
static template() {
  // if the property contains the page name
  if (this.page) {
    return `<${this.page} />`
  }
}
```

This example uses a self-closing tag for the component element to be connected:

```js
`<${this.page} />`
```

If the plug-in component contained [slots](https://javascript.info/slots-composition) into which some HTML content would be passed, then it would be necessary to use the opening and closing tags of the component element:

```js
// return the HTML markup of the component
static template() {
  // if the property contains the page name
  if (this.page) {
    return `
      <${this.page}>
        <div>Some HTML content</div>
      </${this.page}>
    `
  }
}
```

*When the static template() method returns nothing, a component with empty HTML content is created.*

You can only pass HTML content to slots for components that have Shadow DOM. This means that when updating a component, HTML content passed from a component without [Shadow DOM](https://javascript.info/shadow-dom) is simply ignored and no changes are made to it.

To pass data to any components, you can use [custom attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), for example:

```js
// return the HTML markup of the component
static template() {
  // if the property contains the page name
  if (this.page) {
    // pass the color value through the custom "data-color" attribute
    return `<${this.page} data-color="${this.color}" />`
  }
}
```

Unlike HTML content, the attributes of any component's element are always updated.

<br>
<br>
<h2 id="server-rendering">Server-side rendering</h2>

<br>

SSR (Server Side Rendering) is a development technique in which the content of a web page is rendered on the server and not in the client's browser. To render the contents of web pages, the *render()* method is used, which is available as a property of the Ctn function. This method works both on the server side and in the client's browser.

In the example below, this method outputs the contents of the entire page to the browser console:

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
  <w-hello>
    <!-- HTML content transferred to the slot -->
    <span>Advanced Web Components</span>
  </w-hello>

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
          <h1>${ this.message } – это <slot></slot></h1>
          
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

    // output the HTML content of the page to the browser console
    Ctn.render().then(html => console.log(html))
  </script>
</body>
</html>
```

*This method is also available as a named import when using the modular version of the framework:*

```js
import { Render } from "./ctn.esm.js"
```

The method returns a [promise](https://javascript.info/promise-basics), which is resolved after the HTML content of all used components for the current application route is available:

```js
Ctn.render().then(html => console.log(html))
```

*Components of other pages that do not correspond to the current route, if the application uses a router, or components that do not participate in the formation of content when opening the application, will not be taken into account in the promise, otherwise this promise would never have been resolved.*

<br>

To display content in the browser console not for the entire document, but only starting from a specific element, you must pass an object with the **parent** parameter to the method, the value of which will be the element from which the output begins.

In the example below, the contents of the document are displayed starting with the BODY element:

```js
Ctn.render({ parent: document.body }).then(html => console.log(html))
```

By default, the method outputs the cleaned HTML content of the document, i.e. the one in which the tags STYLE, SCRIPT and TEMPLATE have been removed. In order for the method to output the full HTML content, it is necessary to pass it an object with the **clean** parameter and the value "false", as shown below:

```js
Ctn.render({ clean: false }).then(html => console.log(html))
```

In all the examples above, the content transferred to the [slot](https://javascript.info/slots-composition) was output without the SLOT tags themselves. In order for the transmitted content to be displayed inside these tags, i.e. in full accordance with the structure of the location of this content in the component, the method must pass an object with the **slots** parameter and the value "true", for example:

```js
Ctn.render({ slots: true }).then(html => console.log(html))
```

All three parameters can be passed simultaneously:

```js
Ctn.render({
  parent: document.body,
  clean: false,
  slots: true
}).then(html => console.log(html))
```

<br>

The project of the finished application is located at this [link](https://github.com/reacton-js/creaton/tree/main/app). To install all dependencies, including dependencies for the server, use the command:

```
npm i
```

To run the application in development mode, use the command:

```
npm start
```

and for the final build, with all the minimization of the application in production mode, the command:

```
npm run build
```

<br>

This is a regular project using the [Gulp](https://gulpjs.com/) task manager and the [Webpack](https://webpack.js.org/) module builder. The server code is located in the [app.js](https://github.com/reacton-js/creaton/blob/main/app/server/app.js) file, and the server itself is written using the [Express](https://expressjs.com/) framework.

The server file is a typical application on the Express framework:

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

In order for the *render()* method to work on the server, [jsdom](https://github.com/jsdom/jsdom) is used – this is an implementation of Web standards in JavaScript.

Regular users do not need to give the rendered page content. It is only necessary for search bots and other automatic accounting systems for HTML content analysis. The list of these systems is in the array, which can be supplemented with additional names:

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

If any of these names are present in the request header, the server will return the rendered HTML content:

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

For all other requests, the server will return the *index.html* file, which is the only *html* file in this single page application:

```js
// otherwise, if the request comes from a user
else {
  // return the main page file of the application
  res.sendFile(__dirname + '/index.html')
}
```

<br>

Rendering is performed using the *\_$CtnRender\_()* function of the global [window](https://github.com/jsdom/jsdom?tab=readme-ov-file#basic-usage) object, as shown below:

```js
// return the rendered HTML content of the page
dom.window.onload = async () => res.send(await dom.window._$CtnRender_())
```

This function is assigned to an object in the [index.js](https://github.com/reacton-js/creaton/blob/main/app/src/index.js) file, which is the main file of the entire application:

```js
// add the Render method as a property of the window object
window._$CtnRender_ = Render
```

<br>

Rendering does not support [dynamic imports](https://javascript.info/modules-dynamic-imports)  instead, you must use regular module [import and export](https://javascript.info/import-export) statements. Additionally, rendering does not support the global fetch() method. You must use the built-in [XMLHttpRequest](https://javascript.info/xmlhttprequest) object instead.

*The XMLHttpRequest object can be wrapped in a function and then called this function instead of writing the request code for this object manually each time, as shown in the file [helpers.js](https://github.com/reacton-js/creaton/blob/main/app/src/helpers.js), for example:*

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

After installing all the dependencies of the application from the [package.json](https://github.com/reacton-js/creaton/blob/main/app/package.json) file, to start the server in normal mode, you need to open the console from the */server* directory, and enter the following command in it:

```
node app
```

and to see how the server renders the content for search engines, you need to enter the command:

```
node app test
```

<br>
<br>