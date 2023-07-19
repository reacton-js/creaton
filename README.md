<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

![creaton](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Creaton⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js)

<br>

Creaton is a JavaScript plugin for quickly creating [Web Components](https://javascript.info/web-components). The plugin supports all technologies, methods and properties such as [slots](https://javascript.info/slots-composition) and [Shadow DOM](https://javascript.info/shadow-dom) that are provided by standard Web Components.

> The second version of the plugin has been completely rewritten to optimize DOM redrawing and better organization of components. Components from the first version are not suitable for use in the second.

Below is an example of a simple component:

```js
class MyComponent {
  message = 'Creaton'
  color = 'red'

  static render() {
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
2. [Component class](#component-class)
3. [Special properties](#special-properties)
4. [General methods](#general-methods)
5. [Cycles](#cycles)
6. [Styles](#styles)
7. [Slots](#slots)
8. [Events](#events)

<br>
<hr>
<br>

<h2 id="quick-start">Quick start</h2>

<br>

Classes are used to create components. Classes can be either built into the main script or imported from an external module. Create a new working directory, for example named *app*, and download the [creaton.min.js](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js) file into this directory.

Add an *index.html* file to the directory with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component></my-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      static render() {
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

    // pass component class MyComponent to Creaton plugin
    Creaton(MyComponent)
  </script>
</body>
</html>
```

To ensure there are no naming conflicts between standard and custom HTML elements, the component name must contain a dash «-», for example, my-element and super-button are valid names, but myelement is not.

When you open the *index.html* file in the browser, the screen will display the message created in the Hello component:

<h1 style="color: red;">Hello, Creaton!</h1>

<br>

In this example, a simple component has been created that is embedded in a common script. Let's now move this component into a separate module.

Create a *MyComponent.js* file in the *app* directory with the following content:

```js
// export the MyComponent component class
export default class MyComponent {
  message = 'Creaton'
  color = 'red'

  static render() {
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

Make changes to the *index.html* file, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component></my-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script type="module">
    // import the MyComponent component class
    import MyComponent from './MyComponent.js'

    // pass component class MyComponent to Creaton plugin
    Creaton(MyComponent)
  </script>
</body>
</html>
```

To work with external components, we need any development server, such as, for example, [lite-server](https://www.npmjs.com/package/lite-server).

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

To quickly access a component in the browser console, add the identifier "mycomp" to its mount element, as shown below:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp"></my-component>
```

Now open the browser console and enter the command:

```
mycomp.$update({ message: 'Web Components', color: 'green' })
```

The title color and message will change immediately:

<h1 style="color: green;">Hello, Web Components!</h1>

<br>
<br>
<h2 id="component-class">Component class</h2>

<br>

The name of the component class defines the name of the component in the DOM. For example, the class MyComponent or myComponent will match the name *my-component* in the DOM. Each component class may contain an optional static property **name** that defines the name of this class.

This property must be specified, for example, when passing an anonymous class directly to a plugin:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // pass anonymous class to Creaton plugin
    Creaton(class {
      message = 'Creaton'
      color = 'red'

      static name = 'MyComponent' // component name

      static render() {
        return `
          <h1>Hello, ${ this.message }!</h1>
          
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

The class name can be specified in camel case, as in the example above, or kebab notation:

```js
static name = 'my-component'
```

<br>

The state of a component is defined as properties of an instance of the component's class. In the example above, there are two states:

```js
message = 'Creaton'
color = 'red'
```

This is a new way of defining properties for objects. You can also use the old way, by specifying a constructor:

```js
constructor() {
  this.message = 'Creaton'
  this.color = 'red'
}
```

<br>

In addition to state, class objects can also have methods, for example:

```js
class MyComponent {
  message = 'Creaton'
  color = 'red'

  // class object method
  printHello() {
    return `Hello, ${ this.message }!`
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

In this example, the **printHello()** method of the MyComponent class object has been defined, which simply prints out a hello message.

<br>

To render the component's HTML content, the class must have a static **render()** method that returns a string. From this line, the HTML markup of the future component will be created.

This method is executed in the context of the component's state object, which allows you to refer to the properties of this object using the *this* keyword and using template literals, for example:

```js
static render() {
  return `
    <h1>Hello, ${ this.message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>
  `
}
```

Inside template literals, you can use [substitutions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation) to expose any expressions:

```js
${ 5 + 6 }
```

The **render()** method, like all the static methods of the component class discussed below, can be asynchronous. The example below simulates downloading data from the server:

```js
static async render() {
  // get data one second after method call
  const message = await new Promise(ok => setTimeout(() => ok('Web components'), 1000))

  return `
    <h1>Hello, ${ message }!</h1>
    
    <style>
      h1 {
        color: ${ this.color };
      }
    </style>
  `
}
```

<br>

By default, all components are created without [Shadow DOM](https://javascript.info/shadow-dom). This means that the styles they use affect the DOM of the entire [document](https://developer.mozilla.org/en-US/docs/Web/API/Document), not a specific component.

The static **mode** property determines the [level of encapsulation](https://javascript.info/shadow-dom#shadow-tree) for the component to use [local styles](https://javascript.info/shadow-dom-style) and can be either "open" or "closed":

```js
static mode = 'open'
```

The example below creates a component with a closed Shadow DOM:

```js
class MyComponent {
  message = 'Creaton'
  color = 'red'

  static mode = 'closed' // add closed Shadow DOM

  static render() {
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

This type of components is the most secure, since access to the DOM of such a component is possible only from static methods of the class.

<br>

The **extends** static property allows [mount the component](https://javascript.info/custom-elements#customized-built-in-elements) into a standard HTML element, for example:

```js
static extends = 'header'
```

The element into which the component is mounted must contain the [*is*](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) attribute with a value corresponding to the name of the component that is mounted into it:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component to the Header element -->
  <header is="my-component"></header>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      static extends = 'header' // mount the component to the Header element

      static render() {
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

    // pass component class MyComponent to Creaton plugin
    Creaton(MyComponent)
  </script>
</body>
</html>
```

<br>

The static property **attributes** contains an array with the names of attributes, when changing which, the static method **changed()** will be called, for example:

```js
static attributes = ['title'] // tracked attributes

// called when the tracked attribute changes
static changed(name, oldValue, newValue) {
  console.log(name, oldValue, newValue)
}
```

Tracked attributes are a Web Component technology, and the **changed()** method is a shorthand for the [attributeChangedCallback()](https://javascript.info/custom-elements) method.

Add the ***id*** and ***title*** attributes to the MyComponent component's mount element in the *index.html* file as shown below:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp" title="Creaton"></my-component>
```

The ***id*** attribute is used for quick access to the component in the browser console. Now open this console and enter the command:

```
mycomp.title = 'Web Components'
```

After pressing the Enter key, the **changed()** method will print the following line to the console:

```
title Creaton Web Components
```

<br>

Tracked attributes can be used to determine the state in a component, without having to define the state in a class, for example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp" message="Creaton" color="red"></my-component>

  <!-- include Creaton plugin -->
  <script src="creaton.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      static attributes = ['message', 'color'] // tracked attributes

      // called when the tracked attribute changes
      static changed(name, oldValue, newValue) {
        // update the HTML content of the component based on the new state
        this.$update( { [name]: newValue } )
      }

      static render() {
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

    // pass component class MyComponent to Creaton plugin
    Creaton(MyComponent)
  </script>
</body>
</html>
```

As you can see from this example, there is no state definition in the class:

```js
message = 'Creaton'
color = 'red'
```

The initial state values are defined in the tracked attributes ***message*** and ***color*** as shown below:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp" message="Creaton" color="red"></my-component>
```

The assignment of these values to properties of the state object occurs in the **changed()** method, which is called every time values are assigned/changed to tracked attributes:

```js
// called when the tracked attribute changes
static changed(name, oldValue, newValue) {
  // update the HTML content of the component based on the new state
  this.$update( { [name]: newValue } )
}
```

Inside this method, the special method **$update()** is called, which takes an object in its first argument and combines all its properties with the properties of the state object:

```js
// update the HTML content of the component based on the new state
this.$update( { [name]: newValue } )
```

Now open the browser console and enter the command:

```
mycomp.$update({ message: 'Web Components', color: 'green' })
```

The title color and message will change immediately:

<h1 style="color: green;">Hello, Web Components!</h1>

The second way to update the component's HTML content based on the new state value is to use the **$props** special property, which is used to quickly access all of the component's attributes.

Enter the command in the browser console:

```
mycomp.$props.color = 'blue'
```

The title color will change immediately:

<h1 style="color: blue;">Hello, Web Components!</h1>

Special methods and properties will be discussed in the next section. They all begin with a dollar sign and are defined internally by the component.

<br>

The static methods **connected()**, **disconnected()** and **adopted()** are shorthand analogs of the [connectedCallback(), disconnectedCallback() and adoptedCallback()](https://javascript.info/custom-elements) methods.

They are called when a component is added to the document - the **connected()** method; removing a component from a document - the **disconnected()** method; and when moving the component to a new document - the **adopted()** method.

The most commonly used methods include the **connected()** method, which allows you to access the HTML content of the component after it has been added to the [DOM](https://javascript.info/dom-nodes), for example , add an event to the element:

```js
// called when the component is added to the document
static connected() {
  // output the element that generated the event to the console
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

<br>

The static methods **before()** and **after()** are called *Before* and *After* updating the component's DOM, using the special **$update()** method, for example:

```js
static before() {
  console.time('Update')
}

static after() {
  console.timeEnd('Update')
}
```

This example shows how long it takes for a component's DOM to update.

Another good example is using the **before()** method to check the type of a new state value:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      name = 'John'
      age = 32

      // called before updating the component's DOM
      static before() {
        // if the value is not a number, then generate an error
        if (typeof this.age !== 'number') {
          throw new Error('Value must be a number...')
        }
      }

      static render() {
        return `
          <p>Name: ${this.name}</p>
          <p>Age: ${this.age}</p>
        `
      }
    }

    // pass component class MyComponent to Creaton plugin
    Creaton(MyComponent)
  </script>
</body>
</html>
```

If you enter the command in the browser console:

```
mycomp.$update({ age: 'thirty five' })
```

then you will receive an error message:

```
Error: Value must be a number...
```

<br>
<br>
<h2 id="special-properties">Special properties</h2>

<br>

Unlike methods and properties defined by the user in the component class, special methods and properties are defined at the internal level of the component and always start with a dollar sign.

The **$shadow** property returns the [Shadow DOM](https://javascript.info/shadow-dom) of the component, which is created if the **mode** static property was defined in the component class:

```js
static mode = 'open' // add Shadow DOM
```

However, if the component has a closed Shadow DOM:

```js
static mode = 'closed' // add closed Shadow DOM
```

then the **$shadow** property returns «null», as shown below:

```
mycomp.$shadow
null
```

<br>

The **$host** property returns a reference to the component itself if the component has an open Shadow DOM or is created without it. If the component has a closed Shadow DOM, then this property returns «undefined», as shown below:

```
mycomp.$host
undefined
```

<br>

The **$props** property allows you to quickly set and get component attribute values. Add the ***title*** attribute to the component, as shown below:

```html
<!-- mount the MyComponent component -->
<my-component id="mycomp" title="Creaton"></my-component>
```

To get the value of the ***title*** attribute, enter the command in the browser console:

```
mycomp.$props.title
```

To set a new value for this attribute, enter the command:

```
mycomp.$props.title = 'Web Components'
```

<br>

The **$state** property allows you to get/set the value of any state directly. To get the state value of **message**, enter the command in the browser console:

```
mycomp.$state.message
```

To change this state, issue the command:

```
mycomp.$state.message = 'Web Components'
```

Updating the state does not automatically update the component's DOM. To update the DOM, you will need to call the special **$update()** method with no arguments:

```
mycomp.$update()
```

<br>

All of the custom and static methods of the bean class discussed earlier are executed in the context of the state object referenced by the **$state** property. This object is a [proxy](https://javascript.info/proxy). This means that if the requested state does not exist in the given object, then the requested property is searched for in the component itself.

Thanks to this, any property of the component can be accessed from the state object, such as the [attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) property:


```
mycomp.$state.attributes['id'].value
```

This applies to all methods that are executed in the context of a state object, such as the static **render()** method, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      static render() {
        return `
          <h1>Hello, ${ this.message } 
            from the ${this.attributes['id'].value.toUpperCase()} component!</h1>
          
          <style>
            h1 {
              color: ${ this.color };
            }
          </style>
        `
      }
    }

    // pass component class MyComponent to Creaton plugin
    Creaton(MyComponent)
  </script>
</body>
</html>
```

<br>

The **$update()** method is used to update the component's DOM. It can take one argument as an object. The property values of this object become new state values, for example:

```
mycomp.$update({ message: 'Web Components', color: 'green' })
```

When this method is called with no arguments, the state object is not changed and the component's DOM is simply redrawn:

```
mycomp.$update()
```

In the first version of the plugin, a simple replacement of the old DOM with a new one was used. The second version of Creaton uses a matching principle based on comparing the old DOM with the new one. If a mismatch is found, then the value in the old DOM is replaced by the new [node](https://javascript.info/dom-nodes#other-node-types).

This avoids losing events assigned to elements using the [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) method and does not overload the browser with unnecessary redrawing of the entire HTML content of the component.

<br>

The **$()** method is a shorthand analog of the [querySelector()](https://javascript.info/searching-elements-dom#querySelector) method and is used for quick access to a component's DOM element. For example, to assign an event listener:

```js
// called when the component is added to the document
static connected() {
  // output the element that generated the event to the console
  this.$('h1').addEventListener('click', event => console.log(event.target))
}
```

The **$$()** method is a shorthand analog of the [querySelectorAll()](https://javascript.info/searching-elements-dom#querySelectorAll) method and is used for quick access to a component's DOM element. For example, to iterate over a collection of elements:

```js
// called when the component is added to the document
static connected() {
  // output all paragraph elements to the console
  this.$$('p').forEach(elem => console.log(elem))
}
```

<br>

The **$event()** method is used to create custom events that allow different components to interact with each other. This method will be discussed later, as it requires a separate section for its explanation.

<br>
<br>
<h2 id="general-methods">General methods</h2>

<br>

In addition to state, class objects can also have methods, for example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp1"></my-component>

  <!-- mount the MyComponent component -->
  <my-component id="mycomp2"></my-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      message = 'Creaton'
      color = 'red'

      // class object method
      printHello() {
        return `Hello, ${ this.message }!`
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

    // pass component class MyComponent to Creaton plugin
    Creaton(MyComponent)
  </script>
</body>
</html>
```

In this example, the **printHello()** method of the MyComponent class object has been defined, which simply prints out a hello message for all components of this type.

In order not to create the same methods for different types of components, you can create a separate class for common methods, and then, inherit component classes from this method class, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- mount the NewComponent component -->
  <new-component id="newcomp"></new-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create a Methods class to store common methods
    class Methods {
      printHello() {
        return `Hello, ${ this.message }!`
      }
    }

    // inherit the MyComponent class from the Methods class
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

    // inherit the NewComponent class from the Methods class
    class NewComponent extends Methods {
      message = 'NewComponent'

      static render() {
        return `
          <h2>${ this.printHello() }</h2>
        `
      }
    }

    // pass component classes to Creaton plugin
    Creaton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="cycles">Cycles</h2>

<br>

To output arrays in [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), use the [map()](https://javascript.info/array-methods#map) and [join()](https://javascript.info/array-methods#split-and-join) methods, as shown below:

```js
class MyComponent {
  colors = ['red', 'green', 'blue']

  static render() {
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
class MyComponent {
  user = {
    name: 'John',
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
<h2 id="styles">Styles</h2>

<br>

To create [local styles](https://javascript.info/shadow-dom-style), the component needs to add a [Shadow DOM](https://javascript.info/shadow-dom) using the static property **mode**, as shown below:

```js
class MyComponent {
  message = 'Creaton'
  color = 'red'

  static mode = 'open' // add Shadow DOM

  static render() {
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
<br>
<h2 id="slots">Slots</h2>

<br>

To work with [slots](https://javascript.info/slots-composition), the component needs to add a [Shadow DOM](https://javascript.info/shadow-dom) using the static property **mode**, as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component>
    <span slot="username">John</span>
    <span slot="age">32</span>
    <span>Hardworking</span>
  </my-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create component class MyComponent
    class MyComponent {
      static mode = 'open' // add Shadow DOM

      static render() {
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

    // pass component class MyComponent to Creaton plugin
    Creaton(MyComponent)
  </script>
</body>
</html>
```

<br>
<br>
<h2 id="events">Events</h2>

<br>

For interaction between different components, an improved mechanism of [custom events](https://javascript.info/dispatch-events) is used. This mechanism involves the use of the **event()** method of the Creaton plugin and the special **$event()** method that is available in every component.

When the Creaton plugin's **event()** method is called as a constructor, it returns a new [document fragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) that is the source and receiver of custom events. And when this method is not called as a constructor, it works similarly to the special method **$event()**. This allows you to link components not only to each other, but also to any external code.

Make changes to the *index.html* file as shown below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creaton</title>
</head>
<body>
  <!-- mount the MyComponent component -->
  <my-component id="mycomp"></my-component>

  <!-- mount the NewComponent component -->
  <new-component id="newcomp"></new-component>

  <!-- include Creaton plugin -->
  <script src="creaton.min.js"></script>

  <script>
    // create event element myEvent
    const myEvent = new Creaton.event()

    // create component class NewComponent
    class NewComponent {
      colors = ['red', 'green', 'blue']

      static render() {
        return `
          <ul>
            ${ this.colors.map(col => `<li>${ col }</li>`).join('') }
          </ul>
        `
      }

      static connected() {
        // add a "reverse" event handler to the myEvent element
        myEvent.addEventListener('reverse', () => {
          this.colors.reverse() // reverse array

          // update the DOM of the component
          this.$update()
        })
      }
    }

    // create component class MyComponent
    class MyComponent {
      static render() {
        return `
          <button id="btn-reverse">Reverse array</button>
        `
      }

      static connected() {
        // add a "click" event handler for the button
        this.$('#btn-reverse').addEventListener('click', () => {
          // trigger "reverse" event on element myEvent
          this.$event(myEvent, 'reverse')
        })
      }
    }

    // pass component classes to Creaton plugin
    Creaton(MyComponent, NewComponent)
  </script>
</body>
</html>
```

In this example, a new event element myEvent is first created:

```js
// create event element myEvent
const myEvent = new Creaton.event()
```

This element will be assigned custom event handlers in some components and invoked in others.

In the static method **connected()** of the NewComponent component class, the handler for the custom event *"reverse"* is assigned to the myEvent element. Inside this handler, the array is reverse and the DOM of the component is updated:

```js
static connected() {
  // add a "reverse" event handler to the myEvent element
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // reverse array

    // update the DOM of the component
    this.$update()
  })
}
```

In the static method **connected()** of the MyComponent component class, a *"click"* event handler is added to the button, inside which the *"reverse"* event is called for the myEvent element, as shown below:

```js
static connected() {
  // add a "click" event handler for the button
  this.$('#btn-reverse').addEventListener('click', () => {
    // trigger "reverse" event on element myEvent
    this.$event(myEvent, 'reverse')
  })
}
```

The first argument of the special **$event()** method is the event element myEvent, and the second argument is the name of the event to be called:

```js
this.$event(myEvent, 'reverse')
```

The **$event()** method can also receive a third argument, in which you can pass parameters that fully correspond to the parameters of the [CustomEvent](https://javascript.info/dispatch-events#custom-events) constructor. For example, you can pass the **detail** property, which allows you to share data between components.

<br>

Add a new *"new-colors"* event handler to the static **connected()** method of the NewComponent component, as shown below:

```js
static connected() {
  // add a "reverse" event handler to the myEvent element
  myEvent.addEventListener('reverse', () => {
    this.colors.reverse() // reverse array

    // update the DOM of the component
    this.$update()
  })

  // add a "new-colors" event handler to the myEvent element
  myEvent.addEventListener('new-colors', event => {
    this.colors = event.detail // assign new array

    // update the DOM of the component
    this.$update()
  })
}
```

Note that the event handler now has an **event** parameter through which you can access the **detail** property. In addition, it is recommended to add a hyphen to the names of custom events so that they do not overlap with the names of standard events.

Now modify the markup of the MyComponent component by adding a new button to it:

```js
static render() {
  return `
    <button id="btn-reverse">Reverse array</button>
    <button id="btn-new">New array</button>
  `
}
```

and the *"click"* event handler, inside which a new array of colors is passed to the *"new-colors"* event handler:

```js
static connected() {
  // add a "click" event handler for the button
  this.$('#btn-reverse').addEventListener('click', () => {
    // trigger "reverse" event on element myEvent
    this.$event(myEvent, 'reverse')
  })

  // add a "click" event handler for the button
  this.$('#btn-new').addEventListener('click', () => {
    // trigger "new-colors" event on element myEvent
    this.$event(myEvent, 'new-colors', {
      // pass a new array to the event handler
      detail: ['blue', 'orange', 'purple', 'gold']
    })
  })
}
```

In this way, data can be easily exchanged between different components.

<br>
<br>