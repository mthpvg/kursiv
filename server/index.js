const http = require('http')

const CLIENT = 'http://192.168.1.13:1234'
const PORT = 3000

const DB = require('./db')
const db = new DB()


http.createServer(router).listen(PORT, () => {console.log(`Started: ${PORT}`)})


function router(req, res) {
  // res.setHeader('Access-Control-Allow-Headers', 'authorization')

  const headers = {
    'Access-Control-Allow-Origin': CLIENT,
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 30 * 24 * 60 * 60,
    'Access-Control-Allow-Headers': 'authorization'
  }

  if (req.method === 'OPTIONS') {
    console.log('OPTIONS')
    res.writeHead(204, headers)
    return res.end()
  }

  if (req.url.includes('data')) {
    res.writeHead(200, headers)
    return res.end(db.getUsers())
  } else if (req.url.includes('sign-in')) {
    res.writeHead(200, headers)
    return signIn(req, res) 
  } else {
    return notFound(req, res)
  }
}

function notFound(req, res) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not found')
}

function signIn(req, res) {
  let rawBody = ''
  req.on('data', chunk => {
    rawBody += chunk.toString() // convert Buffer to string
  })
  req.on('end', () => {
    try {
      const body = JSON.parse(rawBody)
      console.log(body.email)
    } catch (error) {
      console.error(error)
    }
    res.end('ok')
  })
}
