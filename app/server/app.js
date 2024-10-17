const express = require('express')
const jsdom = require('jsdom')
const { JSDOM } = require('jsdom')
const fs = require("fs")
const port = process.env.PORT || 3000

// connect database file
let DB = JSON.parse(fs.readFileSync(__dirname + '/db.json').toString())

// create an Express application object
const app = express()

// create a parser for application/x-www-form-urlencoded data
const urlencodedParser = express.urlencoded({ extended: false })

// define directory for static files and ignore index.html file
app.use(express.static(__dirname + '/public', { index: false }))

// define an array of bot names that will receive the rendered content
const listBots = [
  'Yandex', 'YaDirectFetcher', 'Google', 'Yahoo', 'Mail.RU_Bot', 'bingbot', 'Accoona', 'Lighthouse',
  'ia_archiver', 'Ask Jeeves', 'OmniExplorer_Bot', 'W3C_Validator', 'WebAlta', 'Ezooms', 'Tourlentabot', 'MJ12bot',
  'AhrefsBot', 'SearchBot', 'SiteStatus', 'Nigma.ru', 'Baiduspider', 'Statsbot', 'SISTRIX', 'AcoonBot', 'findlinks',
  'proximic', 'OpenindexSpider', 'statdom.ru', 'Exabot', 'Spider', 'SeznamBot', 'oBot', 'C-T bot', 'Updownerbot',
  'Snoopy', 'heritrix', 'Yeti', 'DomainVader', 'DCPbot', 'PaperLiBot', 'StackRambler', 'msnbot'
]

// loads only scripts and ignores all other resources
class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    return regJSFile.test(url) ? super.fetch(url, options) : null
  }
}

// define the bot agent string to test
const testAgent = process.argv[2] === 'test' ? 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' : ''

// define a regular expression to search for bot names in a string
const regBots = new RegExp(`(${listBots.join(')|(')})`, 'i')

// search for script file extensions
const regJSFile = /\.m?js$/

// favicon request
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

// database request
app.get('/db', (req, res) => res.send(DB[req.query.page]))

// all other requests
app.use(async (req, res) => {
  // if the request comes from a bot
  if (regBots.test(testAgent || req.get('User-Agent'))) {
    // define a new JSDOM object with parameters
    const dom = await JSDOM.fromFile('index.html', {
      url: req.protocol + '://' + req.get('host') + req.originalUrl, // determine the full URL
      resources: new CustomResourceLoader(), // loading only scripts
      runScripts: 'dangerously' // allow page scripts to execute
    })

    // return the rendered HTML content of the page
    dom.window.onload = async () => res.send(await dom.window._$CtnRender_())
  }
  // otherwise, if the request comes from a user
  else {
    // return the main page file of the application
    res.sendFile(__dirname + '/index.html')
  }
})

// start the server
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))