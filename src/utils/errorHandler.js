class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = 'Error'
        this.isOperational = true

        Error.captureStackTrace(this, constructor)
    }
}

module.exports = AppError