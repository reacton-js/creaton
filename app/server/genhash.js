const fs = require("fs")
const { createHmac } = require('node:crypto')

// change to your login, do Not use the login "admin"
const login = process.argv[2] || 'admin'

// change to your password, do Not use the password "1234"
const password = process.argv[3] || '1234'

// generate password hash
const hash = createHmac('sha512', login).update(password).digest('hex')

// write the generated hash to a file
fs.writeFileSync('passwd', hash)
