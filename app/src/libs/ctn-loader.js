const regScripts = /<script[^]*?>([^]*?)<\/script>/g

module.exports = function(source) {
  let scripts = ''

  const html = source.replace(regScripts, (_, fix) => (scripts += fix, ''))

  return `
    let exports
    ${scripts}
    exports.template = function() { return String.raw\`${html}\` }
    export default exports
  `
}