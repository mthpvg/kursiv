const http = require('http')

const CLIENT = 'http://192.168.1.13:1234'
const PORT = 3000

const DB = require('./db')
const db = new DB()


http.createServer(router).listen(PORT, () => {console.log(`Started: ${PORT}`)})


function router(req, res) {
  res.setHeader('Access-Control-Allow-Origin', CLIENT)
  res.setHeader('Access-Control-Allow-Headers', 'authorization')

  if (req.url.includes('data')) return res.end(db.getUsers())
  else return notFound(req, res)
}

function notFound(req, res) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not found\n')
}
