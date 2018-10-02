const sqlite3 = require('sqlite3').verbose();
const DatabaseConnectionError = require('./utils/DatabaseError').DatabaseConnectionError;
const DatabaseRequestError = require('./utils/DatabaseError').DatabaseRequestError;
const EmptyResultError = require('./utils/DatabaseError').EmptyResultError;
let db;

let open = (path) => {
    return new Promise((resolve, reject) => {
        this.db = new sqlite3.Database(path, err => {
                if(err) reject(new DatabaseConnectionError(path, err.message));
                else    resolve(path + " opened");
            }
        );
    });
};

// any query: insert/delete/update
let run = (query) => {
    return new Promise((resolve, reject) => {
        this.db.run(query, (err) => {
            if(err) reject(new DatabaseRequestError(query, err.message));
            else
                resolve(true)
            });
    });
};

// first row read
let get = (query, params) => {
    return new Promise((resolve, reject) => {
        this.db.get(query, params, (err, row) => {
            if(err) reject(new DatabaseRequestError(query, err.message));
            else {
                if (row === undefined)
                    reject(new EmptyResultError(query));
                resolve(row)
            }
        })
    })
};

// set of rows read
let all = (query, params) => {
    return new Promise((resolve, reject) => {
        if(params === undefined) params=[];
        this.db.all(query, params, (err, rows) => {
            if(err) reject(new DatabaseRequestError(query, err.message));
            else {
                if (rows === undefined || rows.length < 1)
                    reject(new EmptyResultError(query));
                resolve(rows);
            }
        });
    });
};

try {
    process.nextTick(() => open(process.env.SQLITE_PATH));
} catch (err) {
   throw err;
}
module.exports = {
    all, get, run
};