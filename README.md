<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

![rigl](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Creaton⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js)

<br>

Creaton is a JavaScript plugin for quickly creating [Web Components](https://javascript.info/web-components). The plugin supports all technologies, methods and properties such as [slots](https://javascript.info/slots-composition) and [Shadow DOM](https://javascript.info/shadow-dom) that are provided by standard Web Components.

Below is an example of a simple modular component:

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
      <h1>Hello, ${ this.message }!</h1>
      
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

1. [Quick start](#quick-start)
2. [Component object](#component-object)
3. [Cycles](#cycles)
4. [Slots](#slots)
5. [Custom events](#custom-events)
6. ~~[Features work](#features-work)~~

<br>
<hr>
<br>

<h2 id="quick-start">Quick start</h2>

<br>

Creaton allows you to create several types of components: Embedded and Modular. We'll start with Embedded Components. Create a new working directory, for example named *app*, and download the [creaton.min.js](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js) file into this directory.

Add an *index.html* file to the directory with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create a Hello component object
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
          <h1>Hello, ${ this.message }!</h1>
          
          <style>
            h1 {
              color: ${ this.mainColor };
            }
          </style>
        `
      }
    }

    // pass Hello component object to Creaton plugin
    Creaton(Hello)
  </script>
</body>
</html>
```

To ensure there are no naming conflicts between standard and custom HTML elements, the component name must contain a dash «-», for example, my-element and super-button are valid names, but myelement is not.

When you open the *index.html* file in the browser, the screen will display the message created in the Hello component:

> <h1 style="color: red;">Hello, Creaton!</h1>

<br>

In this example, a simple component has been created that is embedded in a common script. Let's now move this component into a separate module.

Create a *Hello.js* file in the *app* directory with the following content:

```js
// export the Hello component object
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
      <h1>Hello, ${ this.message }!</h1>
      
      <style>
        h1 {
          color: ${ this.mainColor };
        }
      </style>
    `
  }
}
```

Make changes to the *index.html* file, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script type="module">
    // import Hello component object
    import Hello from './Hello.js'

    // pass Hello component object to Creaton plugin
    Creaton(Hello)
  </script>
</body>
</html>
```

To work with Modular components, we need any development server, such as, for example, [lite-server](https://www.npmjs.com/package/lite-server).

Install this server using the command in the terminal:

```
npm install --global lite-server
```

Now navigate to the *app* directory using a terminal or open a terminal in that directory and in the terminal enter the command:

```
lite-server
```

This will open a default browser window displaying the welcome message shown above.

<br>
<br>
<h2 id="component-object">Component object</h2>

<br>

Each Embedded and Modular component object must contain a required name property that defines the **name** of the component, as shown below:

```js
const Hello = {
  name: 'r-hello'
}
```

<br>

The **data()** method must return an object with user data (properties and methods) of the component:

```js
data() {
  return {
    message: 'Creaton',
    printHello() {
      return 'Hello, World!'
    }
  }
}
```

This method can be asynchronous. In the example below, the **message** custom property simulates receiving data from the server:

```js
async data() {
  const message = await new Promise(ok => setTimeout(() => ok('Creaton'), 1000))

  return {
    message
  }
}
```

<br>

For Embedded and Modular components, the **render()** method returns the component's HTML content as a [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

```js
render() {
  return `
    <h1>Hello, ${ this.message }!</h1>
    
    <style>
      h1 {
        color: ${ this.mainColor };
      }
    </style>
  `
}
```

Inside template literals, you can use [substitutions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation) to expose expressions:

```js
${ 5 + 6 }
```

and user data by adding the *this* keyword before their name:

```js
${ this.message }
```

In addition to the method that returns a template literal, you can pass a reference to the [TEMPLATE](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) element to the **render** property, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>

  <!-- Hello component template -->
  <template id="template-hello">
    <h1>Hello, ${ this.message }!</h1>
          
    <style>
      h1 {
        color: ${ this.mainColor };
      }
    </style>
  </template>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create a Hello component object
    const Hello = {
      name: 'r-hello',
      data() {
        return {
          message: 'Creaton',
          mainColor: 'red'
        }
      },
      // pass a reference to the component template
      render: document.querySelector('#template-hello')
    }

    // pass Hello component object to Creaton plugin
    Creaton(Hello)
  </script>
</body>
</html>
```

All HTML content of the TEMPLATE element will be wrapped in a template literal. This means that the backticks «`» must be escaped inside this element, for example:

```html
<template id="template-hello">
  <h1>Hello, \`${ this.message }\`!</h1>
        
  <style>
    h1 {
      color: ${ this.mainColor };
    }
  </style>
</template>
```

<br>

By default, all components are created without [Shadow DOM](https://javascript.info/shadow-dom). The mode property determines the [level of encapsulation](https://javascript.info/shadow-dom#shadow-tree) for the component to use [local styles](https://javascript.info/shadow-dom-style) and can be either "open" or "closed":

```js
mode: 'open'
```

<br>

The **extends** property allows you to [mount the component](https://javascript.info/custom-elements#customized-built-in-elements) into a standard HTML element:

```js
extends: 'header'
```

The element into which the component is mounted must contain the ***is*** attribute with a value corresponding to the name of the component that is mounted into it:

```html
<header is="r-hello"></header>
```

<br>

The **attributes** property contains an array with attribute names, when changed, the **changed()** method will be called, for example:

```js
attributes: ['title'],

changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

Tracked attributes are a Web Component technology, and the **changed()** method is a shorthand for the [attributeChangedCallback()](https://javascript.info/custom-elements) method.

Add the ***id*** and ***title*** attributes to the Hello component's mount element in the *index.html* file as shown below:

```html
<r-hello id="hello" title="Hello"></r-hello>
```

The ***id*** attribute is used for quick access to the component in the browser console. Now open this console and enter the command:

```
hello.title = 'Bye'
```

After pressing the Enter key, the **changed()** method will print the following line to the console:

```
title Hello Bye
```

<br>

The **connected()**, **disconnected()** and **adopted()** methods are shorthand analogs of the [connectedCallback(), disconnectedCallback() and adoptedCallback()](https://javascript.info/custom-elements) methods.

They are called when a component is added to the document - the **connected()** method; removing a component from a document - the **disconnected()** method; and when moving the component to a new document, the **adopted()** method.

The most commonly used methods include the **connected()** method, which allows you to access the HTML content of the component after it has been added to the [DOM](https://javascript.info/dom-nodes):

```js
connected() {
  console.log(this.$('h1'))
}
```

In this example, the selected H1 element is displayed on the browser console using the **$()** helper method, which is available in the **connected()** method through the *this* keyword. This method is a shorthand analog of the [querySelector()](https://javascript.info/searching-elements-dom#querySelector) method.

The second helper method is called **$$()** and is shorthand for the [querySelectorAll()](https://javascript.info/searching-elements-dom#querySelectorAll) method, as shown below:

```js
connected() {
  console.log(this.$$('h1')[0])
}
```

To access user data, the *this* keyword is used within the methods of the component object, since all of these methods are executed in the context of the component's data object:

```js
connected() {
  console.log(this.message)
}
```

If you need to access the component itself, then the special **$host** property is used, which refers to the component's mount element:

```js
connected() {
  console.log(this.$host)
}
```

In addition, all the methods discussed above can be asynchronous.

In the example below, the **message** custom property is set to a new value one second after the component is added to the document:

```js
async connected() {
  // assign a new value to a property
  this.message = await new Promise(ok => setTimeout(() => ok('Quick Components'), 1000))

  // update component DOM
  this.$render()
}
```

In this example, after assigning a new value to the **message** property, a special method **$render()** is called, which completely rewrites the DOM of the component. That is, at the internal level, it calls the previously discussed **render()** method.

This means that any events prescribed in the **connected()** elements of the events:

```js
connected() {
  this.$$('h1')[0].addEventListener('click', () => console.log('Hello'))
}
```

completely disappear, since the marking of the component rewrites.

The special method **$render()** is most useful when components acting as loops and user events work together, as will be demonstrated later.

<br>

The **before()** and **after()** methods are called *Before* and *After* updating the DOM component, i.e. calling a special method **$render()**, for example:

```js
before() {
  console.time('Update')
},

after() {
  console.timeEnd('Update')
}
```

This example shows how much time the component is updated.

<br>

The last property that can be defined in the object of any component is called **mixins** and allows you to create properties and methods common to all components of the same name:

```js
mixins: {
  printMessage() {
    return this.message
  }
}
```

Now the **printMessage()** method will be available to all Hello components. To access the properties and methods of a mixin, a special **$mixins** property is used inside the component markup, after which, through a dot, the name of the requested method or property is indicated:

```js
render() {
  return `
    <h1>Hello, ${ this.$mixins.printMessage() }!</h1>
  `
}
```

Impurities work in the following way. First, the properties are queried on the local **mixins** object we created above, then the property is queried on the global mixins object that we will create next, and finally, the property is queried on the component's data object.

For this reason, inside the **printMessage()** method, we were able to access the **message** custom property via the *this* keyword, as shown below:

```js
printMessage() {
  return this.message
}
```

In order for the created methods and properties to be available to all the component, and not just the ones of the same name, it is necessary to define a global mixin for them through the Creaton function and its **mixins** property.

This must be done before components are passed to this function to define them in the application:

```js
// global admixture
Creaton.mixins = {
  printMessage() {
    return this.message
  }
}

// pass Hello and Bye components to Creaton plugin
Creaton(Hello, Bye)
```

<br>
<br>
<h2 id="cycles">Cycles</h2>

<br>

To output arrays in [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), use the [map()](https://javascript.info/array-methods#map) and [join()](https://javascript.info/array-methods#split-and-join) methods, as shown below:

```js
const Hello = {
  name: 'r-hello',
  data() {
    return {
      colors: ['red', 'green', 'blue']
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

The **join()** method is passed an empty string to remove commas between the elements of the array to be displayed.

<br>

Similarly, you can display objects using the [Object.keys()](https://javascript.info/keys-values-entries) method, for example:

```js
const Hello = {
  name: 'r-hello',
  data() {
    return {
      user: {
        name: 'Leanne Graham',
        age: 28
      }
    }
  },
  render() {
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
<h2 id="slots">Slots</h2>

<br>

To work with [slots](https://javascript.info/slots-composition), the component needs to add a [Shadow DOM](https://javascript.info/shadow-dom) using the **mode** property, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello>
    <span slot="username">Leanne Graham</span>
    <span slot="age">28</span>
    <span>Hardworking</span>
  </r-hello>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create a Hello component object
    const Hello = {
      name: 'r-hello',
      mode: 'open', // add an open Shadow DOM for the component
      render() {
        return `
          <div>
            Name: <slot name="username"></slot>
          </div>
          
          <div>
            Age: <slot name="age"></slot>
          </div>

          <div>
            Character: <slot><slot>
          </div>
        `
      }
    }

    // pass Hello component object to Creaton plugin
    Creaton(Hello)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="custom-events">Custom events</h2>

<br>

For interaction between different components, an improved mechanism of [custom events](https://javascript.info/dispatch-events) is used. This mechanism involves the use of the **event()** method of the Creaton plugin and the special **$event()** method that is available in every component.

Create an *Events.js* file in the *app* directory with the following content:

```js
// export event element eventReverse
export const eventReverse = new Creaton.event()
```

When the Creaton plugin's **event()** method is called as a constructor, it returns a new [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) that is the source and receiver of custom events.

Now make changes to the *index.html* file, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the Hello component -->
  <r-hello></r-hello>

  <!-- mount the Colors component -->
  <r-colors></r-colors>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create a Hello component object
    const Hello = {
      name: 'r-hello',
      render() {
        return `
          <button id="button-reverse">Reverse array</button>
        `
      },
      async connected() {
        // import event element eventReverse
        const { eventReverse } = await import('./Events.js')

        // add a "click" event handler for the button
        this.$('#button-reverse').addEventListener('click', () => {
          // trigger "reverse-colors" event on element eventReverse
          this.$event(eventReverse, 'reverse-colors')
        })
      }
    }

    // create a Colors component object
    const Colors = {
      name: 'r-colors',
      data() {
        return {
          arr: ['red', 'green', 'blue']
        }
      },
      render() {
        return `
          <ul>
            ${ this.arr.map(item => `<li>${ item }</li>`).join('') }
          </ul>
        `
      },
      async connected() {
        // import event element eventReverse
        const { eventReverse } = await import('./Events.js')

        // add the "reverse-colors" event handler to the eventReverse element
        eventReverse.addEventListener('reverse-colors', () => {
          this.arr.reverse() // reverse array

          // update component DOM
          this.$render()
        })
      }
    }

    // pass Hello and Colors component objects to Creaton plugin
    Creaton(Hello, Colors)
  </script>
</body>
</html>
```

In this example, an asynchronous **connected()** method is created in the Colors component object. Inside this method, the event element created at the previous step is imported from an external file and a handler is assigned to it:

```js
async connected() {
  // import event element eventReverse
  const { eventReverse } = await import('./Events.js')

  // add the "reverse-colors" event handler to the eventReverse element
  eventReverse.addEventListener('reverse-colors', () => {
    this.arr.reverse() // reverse array

    // update component DOM
    this.$render()
  })
}
```

<br>

Inside the Hello component object, the **connected()** method is also asynchronous so that the outer event element can be imported:

```js
async connected() {
  // import event element eventReverse
  const { eventReverse } = await import('./Events.js')

  // add a "click" event handler for the button
  this.$('#button-reverse').addEventListener('click', () => {
    // trigger "reverse-colors" event on element eventReverse
    this.$event(eventReverse, 'reverse-colors')
  })
}
```

In addition, the *"click"* event handler has been added to the button, inside which, using the special **$event()** method, the *"reverse-colors"* event is called for the imported element when the button is clicked, as shown below:

```js
// add a "click" event handler for the button
this.$('#button-reverse').addEventListener('click', () => {
  // trigger "reverse-colors" event on element eventReverse
  this.$event(eventReverse, 'reverse-colors')
})
```

The first argument of the special **$event()** method is the event element eventReverse, and the second argument is the name of the event to be called:

```js
this.$event(eventReverse, 'reverse-colors')
```

The **$event()** method can also receive a third argument, in which you can pass parameters that fully correspond to the parameters of the [CustomEvent](https://javascript.info/dispatch-events#custom-events) constructor. For example, you can pass the **detail** property, which allows you to share data between components.

When the **event()** method of the Creaton plugin is called not as a constructor, it works similarly to the special **$event()** method.

<br>

Add a new *"new-colors"* event handler to the **connected()** method of the Colors component, as shown below:

```js
async connected() {
  // import event element eventReverse
  const { eventReverse } = await import('./Events.js')

  // add the "reverse-colors" event handler to the eventReverse element
  eventReverse.addEventListener('reverse-colors', () => {
    this.arr.reverse() // reverse array

    // update component DOM
    this.$render()
  })

  // add the "new-colors" event handler to the eventReverse element
  eventReverse.addEventListener('new-colors', event => {
    this.arr = event.detail // new array

    // update component DOM
    this.$render()
  })
}
```

Note that the event handler now has an **event** parameter through which you can access the **detail** property.

Now modify the contents of the Hello component object by adding a new button and a *"click"* event handler, inside which a new array of colors is passed to the *"new-colors"* event handler:

```js
const Hello = {
  name: 'r-hello',
  render() {
    return `
      <button id="button-reverse">Reverse array</button>
      <button id="button-new">New array</button>
    `
  },
  async connected() {
    // import event element eventReverse
    const { eventReverse } = await import('./Events.js')

    // add a "click" event handler for the button
    this.$('#button-reverse').addEventListener('click', () => {
      // trigger "reverse-colors" event on element eventReverse
      this.$event(eventReverse, 'reverse-colors')
    })

    // add a "click" event handler for the button
    this.$('#button-new').addEventListener('click', () => {
      // trigger "new-colors" event on element eventReverse
      this.$event(eventReverse, 'new-colors', {
        // pass a new array to the event handler
        detail: ['blue', 'orange', 'purple', 'gold']
      })
    })
  }
}
```

Thus, data can be easily exchanged between different components.

<br>

To avoid having to import the event element into each individual component, you can resort to creating the event element in a global mixin before passing the components to the Creaton plugin:

```js
Creaton.mixins = {
  // create event element eventReverse
  eventReverse: new Creaton.event()
}

// pass Hello and Colors component objects to Creaton plugin
Creaton(Hello, Colors)
```

Then instead of importing the event element from an external file:

```js
// import event element eventReverse
const { eventReverse } = await import('./Events.js')
```

you need to get the event element from the global mixin:

```js
// get event element eventReverse
const eventReverse = this.$mixins.eventReverse
```

<br>
<br>