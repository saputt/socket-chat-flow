const setRefreshTokenCookie = (res, token, remainingTime = null) => {
    res.cookie("refreshToken", token, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "PRODUCTION",
        sameSite : "strict",
        maxAge :  remainingTime !== null ? remainingTime : 1000 * 60 * 60 * 24 * 7 
    })
}

module.exports = {
    setRefreshTokenCookie
}