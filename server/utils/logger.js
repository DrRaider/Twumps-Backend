const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        colorize({ all: true }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console({
            filename: './logs.log',
            level: 'info',
            handleExceptions: true
        }),
        new transports.Console({
            level: 'error',
            handleExceptions: true
        }),
        new transports.File({filename: './logs.log'}),
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};