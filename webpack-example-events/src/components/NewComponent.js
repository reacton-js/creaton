import { myEvent } from '../Events'

export default class NewComponent {
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

    // add a "new-colors" event handler to the myEvent element
    myEvent.addEventListener('new-colors', event => {
      this.colors = event.detail // assign new array

      // update the DOM of the component
      this.$update()
    })

    // add a "clear-colors" event handler to the myEvent element
    myEvent.addEventListener('clear-colors', event => {
      this.colors.length = 0 //  clear array

      // update the DOM of the component
      this.$update()
    })
  }
}