const express = require('express')
const jsdom = require('jsdom')
const { JSDOM } = require('jsdom')
const { createHmac } = require('node:crypto')
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

// list of cached pages
const cachePages = new Set(['/', '/about', '/contacts'])

// storage of rendered pages
const pageStorage = {}

// favicon request
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

// database request
app.get('/db', (req, res) => res.send(DB[req.query.page]))

// admin page request
app.post('/admin', urlencodedParser, function (req, res) {
  if(!req.body) {
    return res.sendStatus(400)
  }
  // read generated hash from file
  const hash = fs.readFileSync(__dirname + '/passwd').toString()
  const page = req.body.page
  const database = req.body.database
  const login = req.body.login
  const password = req.body.password
  let html
  // if the password hashes match
  if (hash === createHmac('sha512', login).update(password).digest('hex')) {
    // delete pages from storage
    if (page) {
      if (page === 'all') {
        for (const key in pageStorage) {
          delete pageStorage[key]
        }
      }
      else {
        delete pageStorage[page]
      }
    }
    // reload the database
    if (database) {
      DB = JSON.parse(fs.readFileSync(__dirname + '/db.json').toString())
    }
    // create a string of successful completion of the update
    html = `<h2 style="color: green;">Changes successfully made!</h2><a href="/">Home</a>`
  }
  // otherwise, create a string of failed update completion
  else {
    html = `<h2 style="color: red;">Failed to make changes...</h2><a href="/admin">Back</a>`
  }
  // return a string with the answer
  res.send(html)
})

// all other requests
app.use(async (req, res) => {
  // if the request comes from a bot
  if (regBots.test(testAgent || req.get('User-Agent'))) {
    // if the page is in storage
    if (pageStorage[req.path]) {
      res.send(pageStorage[req.path])
    }
    // otherwise, if the page is requested for the first time
    else {
      // define a new JSDOM object with parameters
      const dom = await JSDOM.fromFile('index.html', {
        url: req.protocol + '://' + req.get('host') + req.originalUrl, // determine the full URL
        resources: new CustomResourceLoader(), // loading only scripts
        runScripts: 'dangerously' // allow page scripts to execute
      })

      // return the rendered HTML content of the page
      dom.window.onload = async () => {
        const html = await dom.window._$CtnRender_()
        // add page to storage
        if (cachePages.has(req.path)) {
          pageStorage[req.path] = html
        }
        // return rendered page
        res.send(html)
      }
    }
  }
  // otherwise, if an administrative page is requested
  else if (req.path === '/admin') {
    // return to the application admin page
    res.sendFile(__dirname + '/admin.html')
  }
  // otherwise, if the request comes from a user
  else {
    // return the main page file of the application
    res.sendFile(__dirname + '/index.html')
  }
})

// start the server
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))