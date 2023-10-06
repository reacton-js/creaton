export default class MyUsers {
  static mode = 'open' // add Shadow DOM
  
  static render() {
    return `
      <slot name="user"></slot>
      <slot name="age"></slot>
    `
  }
}