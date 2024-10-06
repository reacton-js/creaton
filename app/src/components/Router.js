import { emitRouter } from '../helpers'

export default class WRouter {
  static mode = 'open'
  static extends = 'nav'

  static connected() {
    this.$host.addEventListener('click', event => {
      event.preventDefault()
      this.$router(emitRouter, event.composedPath()[0].href)
    })
  }

  static template() {
    return `
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contacts">Contacts</a>

      <style>
        a {
          text-decoration: none; 
          padding-right: 3px;
        }
      </style>
    `
  }
}