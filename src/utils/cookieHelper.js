const { patch } = require("../routes")

const setRefreshTokenCookie = (res, token, remainingTime = null) => {
    res.cookie("refreshToken", token, {
        httpOnly : true,
        secure : false,
        sameSite : "lax",
        maxAge :  remainingTime !== null ? remainingTime : 1000 * 60 * 60 * 24 * 7,
        path : '/'
    })
}

module.exports = {
    setRefreshTokenCookie
}