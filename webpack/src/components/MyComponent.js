export default class MyComponent {
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