const Database = require('better-sqlite3')
const DatabaseConnectionError = require('./utils/DatabaseError').DatabaseConnectionError
const DatabaseRequestError = require('./utils/DatabaseError').DatabaseRequestError
const EmptyResultError = require('./utils/DatabaseError').EmptyResultError

let open = (path) => {
  return new Promise((resolve, reject) => {
    this.db = new Database(path)
    if (this.db.open) resolve(path + ' opened')
    else reject(new DatabaseConnectionError(path, 'Could not open database'))
  })
}

// any query: insert/delete/update
let run = (query, params) => {
  return new Promise((resolve, reject) => {
    try {
      const result = this.db.prepare(query).run(params)
      resolve(result)
    } catch (e) {
      reject(new DatabaseRequestError(query, e.message))
    }
  })
}

// first row read
let get = (query, params) => {
  return new Promise((resolve, reject) => {
    try {
      const result = this.db.prepare(query).get(params)
      if (result === undefined) { reject(new EmptyResultError(query)) }
      resolve(result)
    } catch (e) {
      reject(new DatabaseRequestError(query, e.message))
    }
  })
}

// set of rows read
let all = (query, params) => {
  return new Promise((resolve, reject) => {
    try {
      const result = this.db.prepare(query).all(params)
      if (result.length < 1) { reject(new EmptyResultError(query)) }
      resolve(result)
    } catch (e) {
      reject(new DatabaseRequestError(query, e.message))
    }
  })
}

try {
  process.nextTick(() => open(process.env.SQLITE_PATH))
} catch (err) {
  throw err
}
module.exports = {
  all, get, run
}
