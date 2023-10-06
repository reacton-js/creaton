import { myEvent } from '../Events'

export default class MyComponent {
  static render() {
    return `
      <button id="btn-reverse">Reverse array</button>
      <button id="btn-new">New array</button>
      <button id="btn-clear">Clear array</button>
    `
  }

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

    // add a "click" event handler for the button
    this.$('#btn-clear').addEventListener('click', () => {
      // trigger "clear-colors" event on element myEvent
      this.$event(myEvent, 'clear-colors')
    })
  }
}