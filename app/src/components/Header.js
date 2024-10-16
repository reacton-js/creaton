export default class WHeader {
  static mode = 'open'
  static extends = 'header'

  message = 'Creaton'

  static template() {
    return `
      <w-menu></w-menu>
      <h1>${ this.message } is <slot name="abbr"></slot></h1>
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