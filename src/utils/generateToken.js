const jwt = require("jsonwebtoken")

const generateAccessToken = payload => jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRED
})

const generateRefreshToken = payload => jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn : process.env.JWT_REFRESH_EXPIRED
})

const generateNewRefreshToken = (payload, expired) => jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn : expired
})

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateNewRefreshToken
}