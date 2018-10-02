const DatabaseError = require('./DatabaseError');
const FileError = require('./FileError');
const ApiError = require('./ApiError');

let errorHandler = (error, req, res, next) => {

    if (error instanceof DatabaseError.DatabaseRequestError) {
        // respond with 400 status and include relevant error details
        return res.status(503).json({
            type: error.name,
            message: error.message.toString(),
            field: error.field,
        });
    } if (error instanceof DatabaseError.EmptyResultError) {
        // respond with 400 status and include relevant error details
        return res.status(204).json({
            type: error.name,
            message: error.message.toString(),
            field: error.field,
        });
    } if (error instanceof DatabaseError.DuplicateResultError) {
        // respond with 400 status and include relevant error details
        return res.status(400).json({
            type: error.name,
            message: error.message.toString(),
            field: error.field,
        });
    } if (error instanceof FileError.FileTypeError) {
        // respond with 400 status and include relevant error details
        return res.status(400).json({
            type: error.name,
            message: error.message.toString(),
            field: error.field,
        });
    } if (error instanceof FileError.FileOpenError) {
        // respond with 400 status and include relevant error details
        return res.status(500).json({
            type: error.name,
            message: error.message.toString(),
            field: error.field,
        });
    } if (error instanceof FileError.FileUploadError) {
        // respond with 400 status and include relevant error details
        return res.status(400).json({
            type: error.name,
            message: error.message.toString(),
            field: error.field,
        });
    } if (error instanceof ApiError.ApiError) {
        // respond with 400 status and include relevant error details
        return res.status(500).json({
            type: error.name,
            message: error.message.toString(),
            field: error.field
        });
    }  else {
        // This is some other kind of error, let the default error handler deal with it
        return next(error)
    }
};

module.exports = {
    errorHandler
};
