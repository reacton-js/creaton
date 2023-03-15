<br>

[EN](https://github.com/reacton-js/creaton/blob/main/README.md) / [RU](https://github.com/reacton-js/creaton/blob/main/README_RU.md)

![rigl](https://raw.githubusercontent.com/reacton-js/creaton/main/logo.png)

[GitHub](https://github.com/reacton-js/creaton) | [NpmJS](https://www.npmjs.com/package/creaton-js) | [Creaton⤵️](https://raw.githubusercontent.com/reacton-js/creaton/main/creaton.min.js)

<br>

Creaton is a JavaScript plugin for quickly creating [Web Components](https://javascript.info/web-components). The plugin supports all technologies, methods and properties that are provided by standard Web Components.

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
2. ~~[Component object](#component-object)~~
3. ~~[Expressions](#expressions)~~
4. ~~[Cycles](#cycles)~~
5. ~~[Custom events](#custom-events)~~

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