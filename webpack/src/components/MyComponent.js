export default class MyComponent {
  constructor(props) {
    this.message = 'Creaton'
    this.color = props.color
  }

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