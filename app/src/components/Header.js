export default class WHeader {
  message = 'Creaton'
  
  static mode = 'open'

  static template() {
    return `
      <w-menu></w-menu>
      <h1>${ this.message } is <slot></slot></h1>
      <img src="img/banner.jpg" alt="banner">

      <style>
        :host {
          margin-bottom: 50px;
        }
        h1 {
          color: ${ this.$data.color };
        }
        img {
          max-width: 100%;
        }
      </style>
    `
  }
}