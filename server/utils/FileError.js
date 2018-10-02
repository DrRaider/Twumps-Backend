const ApplicationError = require('./ApplicationError');

class FileDeleteError extends ApplicationError {
    constructor (path, filename) {
        // Providing default message and overriding status code.
        //super('Could not delete file : ' + path + '/' + filename);
        super('Impossible de effacer le fichier : ' + path + '/' + filename);
    }
}

class FileOpenError extends ApplicationError {
    constructor(path, filename) {
        // Providing default message and overriding status code.
        //super('Could not find file : ' + path + '/' + filename);
        super('Impossible de trouver le fichier  : ' + path + '/' + filename);
    }
}

class FileTypeError extends ApplicationError {
    constructor (filetype) {
        // Providing default message and overriding status code.
        //super('Only ' + filetype + ' files are allowed');
        super('Seulement fichiers ' + filetype + ' sont permis');
    }
}

class FileUploadError extends ApplicationError {
    constructor (message) {
        // Providing default message and overriding status code.
        //super('File could not be uploaded : ' + message);
        super('Impossible de télécharger le fichier : ' + message);
    }
}

module.exports = {
    FileDeleteError, FileOpenError, FileTypeError, FileUploadError
};