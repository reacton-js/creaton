import { myRoute } from '../Routes'

export default class MyContent {
  page = '' // initial state value
  user = ''
  age = ''

  static render() {
    // if the state is missing
    if (!this.page) return ''

    // else if there is no such component
    else if (!customElements.get(this.page)) {
      return '<h2>Page not found</h2>'
    }

    // output the requested component
    return `
      <${this.page}>
        <p slot="user">${this.user}</p>
        <p slot="age">${this.age}</p>
      </${this.page}>
    `
  }

  static connected() {
    // add a "/" event handler to the myRoute element
    myRoute.addEventListener('/', () => {
      this.page = 'my-home' // assign a value

      // update the DOM of the component
      this.$update()
    })

    // add a "/abo\\w+" event handler to the myRoute element
    myRoute.addEventListener('/abo\\w+', () => {
      this.page = 'my-about' // assign a value

      // update the DOM of the component
      this.$update()
    })

    // add a "/contacts" event handler to the myRoute element
    myRoute.addEventListener('/contacts', () => {
      this.page = 'my-contacts' // assign a value

      // update the DOM of the component
      this.$update()
    })

    // add a "/:user/:age" event handler to the myRoute element
    myRoute.addEventListener('/:user/:age', event => {
      this.page = 'my-users' // component name
      this.user = event.params.user // username
      this.age = event.params.age // user age

      // update the DOM of the component
      this.$update()
    })

    // add a "/:user\\?age=32" event handler to the myRoute element
    myRoute.addEventListener('/:user\\?age=32', event => {
      this.page = 'my-users' // component name
      this.user = event.params.user // username
      this.age = event.url.searchParams.get('age') // user age
      
      // update the DOM of the component
      this.$update()
    })

    // trigger page address event on myRoute element
    this.$route(myRoute, location.href)
  }
}