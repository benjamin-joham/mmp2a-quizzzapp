const fs = require('fs')
fs.writeFileSync('./.env', `API_KEY=${process.env.FIREBASE_KEY}\n`)
