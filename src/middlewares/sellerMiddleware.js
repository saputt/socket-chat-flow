const AppError = require("../utils/errorHandler")

const sellerMiddleware = (req, res, next) => {
    if(!req.user.role.includes("SELLER")) throw new AppError("Only seller can access this")

    next()
}

module.exports = sellerMiddleware