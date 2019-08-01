const http = require('http')
const fs = require('fs')
const path = require('path')

const CLIENT = 'http://192.168.1.13:1234'
const PORT = 3000

const dataFilename = path.resolve(__dirname, './data/index.json')
let dataFile = ''
fs.readFile(dataFilename, 'utf8', (error, raw) => {
  if (error) throw error
  dataFile = raw
})


http.createServer(router).listen(PORT, () => {console.log(`Started: ${PORT}`)})


function router(req, res) {
  res.setHeader('Access-Control-Allow-Origin', CLIENT)
  res.setHeader('Access-Control-Allow-Headers', 'authorization')

  if (req.url.includes('data')) return res.end(dataFile)
  else return notFound(req, res)
}

function notFound(req, res) {
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain')
  res.end('Not found\n')
}
