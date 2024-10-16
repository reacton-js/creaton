import { emitRouter } from '../helpers'

export default class WContent {
  static mode = 'open'
  static extends = 'main'

  page = ''

  static connected() {
    // add an event handler to the emitter with an optional route parameter
    emitRouter.addEventListener(`(:page)?`, event => {
      this.page = `w-${event.params.page || 'home'}` 
      this.$update()
    })
    
    // initiate an event for the "href" value of the current page
    this.$router(emitRouter, location.href)
  }

  static template() {
    if (this.page) {
      return `<${this.page} />`
    }
  }
}