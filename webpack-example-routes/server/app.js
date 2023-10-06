const express = require('express')
const { readFile } = require('fs/promises')
const jsdom = require('jsdom')
const { JSDOM } = require('jsdom')
const port = process.env.PORT || 3000

// create an Express application object
const app = express()

// define directory for static files
app.use(express.static(__dirname, { index: false }))

// get an array of bot names from an external file
const arrBots = [
  // Yandex
  'YandexBot', 'YandexAccessibilityBot', 'YandexMobileBot', 'YandexDirectDyn', 'YandexScreenshotBot',
  'YandexImages', 'YandexVideo', 'YandexVideoParser', 'YandexMedia', 'YandexBlogs', 'YandexFavicons',
  'YandexWebmaster', 'YandexPagechecker', 'YandexImageResizer', 'YandexAdNet', 'YandexDirect',
  'YaDirectFetcher', 'YandexCalendar', 'YandexSitelinks', 'YandexMetrika', 'YandexNews',
  'YandexNewslinks', 'YandexCatalog', 'YandexAntivirus', 'YandexMarket', 'YandexVertis',
  'YandexForDomain', 'YandexSpravBot', 'YandexSearchShop', 'YandexMedianaBot', 'YandexOntoDB',
  'YandexOntoDBAPI', 'YandexTurbo', 'YandexVerticals',

  // Google
  'Googlebot', 'Googlebot-Image', 'Mediapartners-Google', 'AdsBot-Google', 'APIs-Google',
  'AdsBot-Google-Mobile', 'AdsBot-Google-Mobile', 'Googlebot-News', 'Googlebot-Video',
  'AdsBot-Google-Mobile-Apps',

  // Other
  'Mail.RU_Bot', 'bingbot', 'Accoona', 'Lighthouse', 'ia_archiver', 'Ask Jeeves', 'OmniExplorer_Bot', 'W3C_Validator',
  'WebAlta', 'YahooFeedSeeker', 'Yahoo!', 'Ezooms', 'Tourlentabot', 'MJ12bot', 'AhrefsBot',
  'SearchBot', 'SiteStatus', 'Nigma.ru', 'Baiduspider', 'Statsbot', 'SISTRIX', 'AcoonBot', 'findlinks',
  'proximic', 'OpenindexSpider', 'statdom.ru', 'Exabot', 'Spider', 'SeznamBot', 'oBot', 'C-T bot',
  'Updownerbot', 'Snoopy', 'heritrix', 'Yeti', 'DomainVader', 'DCPbot', 'PaperLiBot', 'StackRambler',
  'msnbot', 'msnbot-media', 'msnbot-news',
]

// define the bot agent string to test
const botAgent = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

// define a regular expression to search for bot names in a string
const regBots = new RegExp(`(${arrBots.join(')|(')})`, 'i')

// search for script file extensions
const regJS = /\.m?js$/

// loads only scripts and ignores all other resources
class CustomResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    return regJS.test(url) ? super.fetch(url, options) : null
  }
}

// process favicon
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

// process all other requests
app.use(async (req, res) => {
  // define user agent
  const userAgent = (process.argv[2] == 'bot') ? botAgent : req.get('User-Agent')
  
  // if the request comes from a bot
  if (regBots.test(userAgent)) {
    // determine the full URL of the request
    const fullURL = req.protocol + '://' + req.hostname + `${port ? `:${port}` : ''}` + req.originalUrl

    // load the main page file of the application
    const file = await readFile(__dirname + '/index.html')

    // define a new JSDOM object with parameters
    const dom = new JSDOM(file.toString(), {
      url: fullURL, // set page url
      resources: new CustomResourceLoader(), // loading only scripts
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
    res.sendFile(__dirname + '/index.html')
  }
})

// start the server
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`))