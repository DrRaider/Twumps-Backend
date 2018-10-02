let fs = require('fs-extra');
const multer = require("multer");
const path = require('path');
const FileDeleteError = require('../utils/FileError').FileDeleteError;
const FileOpenError = require('../utils/FileError').FileOpenError;
const FileTypeError = require('../utils/FileError').FileTypeError;

const delete_file = async (upload_path, filename) => {
    return fs.pathExists(upload_path + "/" + filename).then((exists) => {
        if (exists === true) {
            fs.remove(upload_path + "/" + filename).then(() => {
                console.log("File " + filename + " deleted successfully.");
                return true;
            }).catch(() => {
                throw new FileDeleteError(upload_path, filename);
            });
        } else {
            throw new FileOpenError(upload_path, filename);
        }
    })
};



const upload_img = (upload_path) => {
    // Set The Storage Engine
    const storage = multer.diskStorage({
        destination: upload_path,
        filename: (req, file, cb) => {
            cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    function checkFileType(file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        {
            return cb(null, true);
        } else {
            cb(new FileTypeError('jpg/jpeg/png'));
        }
    }

    return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        }
    }).single('picture');
};

const upload_csv = function (upload_path) {

    // Set The Storage Engine
    const storage = multer.diskStorage({
        destination: upload_path,
        filename: (req, file, cb) => {
            cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    function checkFileType(file, cb) {
        const mimetype = file.mimetype;

        if(mimetype === 'text/csv' || mimetype === 'application/vnd.ms-excel'){
            return cb(null,true);
        } else {
            cb(new FileTypeError('CSV'));
        }
    }

    return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        }
    }).single('csvfile');
};







module.exports = {
    delete_file, upload_img, upload_csv
};