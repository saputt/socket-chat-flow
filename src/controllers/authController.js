const { loginService, registerService, refreshTokenService, logoutService, changeRoleService } = require("../services/authService")
const { setRefreshTokenCookie } = require("../utils/cookieHelper")
const sendResponse = require("../utils/responseHelper")

const loginController = async (req, res, next) => {
    try {
        const {refreshToken, accessToken, payload} = await loginService(req.body)
        
        setRefreshTokenCookie(res, refreshToken)

        sendResponse(res, 200, "Login successfull", {user : payload}, accessToken)
    } catch (error) {
        next(error)
    }
}

const registerController = async (req, res, next) => {
    try {
        const user = await registerService(req.body)
        
        req.io.emit("new_user", {
            id : user.id,
            name : user.name,
            email : user.email
        })

        sendResponse(res, 200, "Success to create new account")
    } catch (error) {
        next(error)
    }
}

const refreshTokenController = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const refresh = await refreshTokenService(req.cookies.refreshToken)

        setRefreshTokenCookie(res, refresh.newRefreshToken, refresh.remainingTime * 1000)

        console.log("berhasil")

        sendResponse(res, 200, null, null, refresh.newAccessToken)

    } catch (error) {
        next(error)
    }
}

const logoutController = async (req, res, next) => {
    try {
        await logoutService(req.user.id)

        res.clearCookie("refreshToken", {
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV === "PRODUCTION"
        })

        sendResponse(res, 200, "Logout successfull")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    loginController,
    registerController,
    refreshTokenController,
    logoutController
}