class ApplicationError extends Error {
    constructor(message) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        //this.message = message || 'Something went wrong. Please try again.';
        this.message = message || "Quelque chose a mal tourné. Essayez à nouveau s'il vous plait.";
    }
}
module.exports = ApplicationError;