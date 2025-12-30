const jwt = require("jsonwebtoken")

const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET)
const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET)

module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}