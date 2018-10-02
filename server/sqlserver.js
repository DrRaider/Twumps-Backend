const tp = require('tedious-promises');
const DatabaseRequestError = require('./utils/DatabaseError').DatabaseRequestError;
let config = {};

if (process.env.SQLSERVER_USE === '0') {
    config = {
        "userName": process.env.SQLSERVER_CAP_USERNAME,
        "password": process.env.SQLSERVER_CAP_PASSWORD,
        "server": process.env.SQLSERVER_CAP_SERVER,
        "port": "1433",
        "options": {
            "database": process.env.SQLSERVER_CAP_OPTIONS_DATABASE,
            "instanceName": process.env.SQLSERVER_CAP_OPTIONS_INSTANCENAME
        }
    };
} else {
    config = {
        "userName": process.env.SQLSERVER_USERNAME,
        "password": process.env.SQLSERVER_PASSWORD,
        "server": process.env.SQLSERVER_SERVER,
        "options": {
            "database": process.env.SQLSERVER_OPTIONS_DATABASE,
            "port": process.env.SQLSERVER_OPTIONS_PORT
        }
    };
}
tp.setConnectionConfig(config); // global scope

// set of rows read
let all = (query) => {
    return tp.sql(query)
       .execute()
       .then((results) => {
           results.forEach((obj) => {
               transform(obj);
           });
           return results
       })
       .fail((err) => {
           throw new DatabaseRequestError(query, err.message);
       })
};

// first row read
let get = (query) => {
    return tp.sql(query)
        .execute()
        .then((results) => {
            if (results.length > 0) {
            transform(results[0]);
            return results[0]
            } else
                return [];
        })
        .fail((err) => {
            throw new DatabaseRequestError(query, err.message);
        })
};

// date format transformation
let transform = (obj) => {
    let date;
    if (process.env.SQLSERVER_USE === '0')
        date = new Date(obj.JOUR);
    else
        date = new Date(obj.DATE);

    let year = date.getFullYear(),
        month = date.getMonth()+1,
        dt = date.getDate();
        date = new Date(obj.HEURE);
    let hours = date.getUTCHours(),
        minutes = date.getMinutes();

    if (dt < 10)
        dt = '0' + dt;

    if (month < 10)
        month = '0' + month;

    if (hours < 10)
        hours = '0' + hours;

    if (minutes < 10)
        minutes = '0' + minutes;

    obj.JOUR = dt +  '/' + month + '/' + year;
    obj.HEURE = hours +  ':' + minutes;
};

module.exports = {
    all, get
};