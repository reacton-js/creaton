import { emitRouter } from '../helpers'

export default class WContent {
  static mode = 'open'
  static extends = 'main'

  page = ''

  static connected() {
    emitRouter.addEventListener(`/`, event => {
      this.page = 'w-home'
      this.$update()
    })
    emitRouter.addEventListener(`/about`, event => {
      this.page = 'w-about'
      this.$update()
    })
    emitRouter.addEventListener(`/contacts`, event => {
      this.page = 'w-contacts'
      this.$update()
    })
    
    // start router for current page
    this.$router(emitRouter, location.href)
  }

  static template() {
    if (this.page) {
      return `<${this.page} />`
    }
  }
}