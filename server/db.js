const fs = require('fs')
const path = require('path')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


module.exports = class DB {

  constructor() {
    const adapter = new FileSync(path.resolve(__dirname, './data/index.json'))
    this.db = low(adapter)

    const dataFilename = path.resolve(__dirname, './default-data/users.json')
    let users = ''
    fs.readFile(dataFilename, 'utf8', (error, raw) => {
      if (error) throw error
      users = raw
      this.db.defaults({users})
      .write()
    })
  }

  getUsers() {
    return this.db.get('users').value()
  }

}
