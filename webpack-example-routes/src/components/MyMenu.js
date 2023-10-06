import { myRoute } from '../Routes'

export default class MyMenu {
  static render() {
    return `
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contacts">Contacts</a>
        <a href="/john/32">John</a>
        <a href="/john?age=32">Age</a>
      </nav>
    `
  }

  static connected() {
    // add a "click" event handler to the NAV element
    this.$('nav').addEventListener('click', event => {
      // cancel clicking on the link
      event.preventDefault()

      // trigger a link address event on myRoute element
      this.$route(myRoute, event.target.href)
    })
  }
}