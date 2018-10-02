const ApplicationError = require('./ApplicationError');

class DatabaseConnectionError extends ApplicationError {
    constructor (path, message) {
        // Providing default message and overriding status code.
        //super('Could not connect to database: ' + path + ', err: ' + message);
        super('Impossible de se connecter à la base de données: ' + path + ', err: ' + message);
    }
}

class DatabaseRequestError extends ApplicationError {
    constructor (query, message) {
        // Providing default message and overriding status code.
        //super('Failed to execute query : ' + query + ', err : ' + message);
        super('Erreur lors de l\'execution de la query : ' + query + ', err : ' + message);

    }
}

class EmptyResultError extends ApplicationError {
    constructor (query) {
        // Providing default message and overriding status code.
        //super("Result of query is empty :" + query);
        super("Le resultat de la query est vide :" + query);
    }
}

class DuplicateResultError extends ApplicationError {
    constructor (data) {
        // Providing default message and overriding status code.
        //super("Data is already in table :" + JSON.stringify(data));
        super("Donnée(s) déjà sur la base :" + JSON.stringify(data));
    }
}
module.exports = {
    DatabaseRequestError, DatabaseConnectionError, EmptyResultError, DuplicateResultError
};