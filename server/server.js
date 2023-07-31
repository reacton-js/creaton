const express = require("express")
const { readFile } = require('fs/promises')
const { JSDOM } = require("jsdom")
const port = process.env.PORT || 3000

// create an Express application object
const app = express()

// define directory for static files
app.use(express.static(__dirname + "/public"))

// get an array of bot names from an external file
const arrBots = require('./bots.js')

// define the bot agent string to test
const botAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

// define a regular expression to search for bot names in a string
const regBots = new RegExp(`(${arrBots.join(')|(')})`, 'i')


// process favicon
app.get('/favicon.ico', (req, res) => res.sendStatus(204))


// process all other requests
app.use(async (req, res) => {
  // define user agent
  const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
  
  // if the request comes from a bot
  if (regBots.test(userAgent)) {
    // determine the full URL of the request
    const fullURL = req.protocol + "://" + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

    // load the main page file of the application
    const file = await readFile(__dirname + '/index.html')

    // define a new JSDOM object with parameters
    const dom = new JSDOM(file.toString(), {
      url: fullURL, // set page url
      resources: 'usable', // allow loading external resources
      runScripts: 'dangerously', // allow page scripts to execute
    })

    // get the rendered HTML content of the page
    const html = await new Promise(ok => dom.window.onload = () => dom.window.Creaton.ssr().then(ok))

    // return rendered HTML content
    res.send(html)
  }
  
  // otherwise, if the request comes from a user
  else {
    // return the main page file of the application
    res.sendFile(__dirname + "/index.html")
  }
})


// start the server
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))