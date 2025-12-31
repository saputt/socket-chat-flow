const { getMyProfileService, getAllUsersService, getUserService } = require("../services/userService")
const sendResponse = require("../utils/responseHelper")

const getAllUsersController = async (req, res, next) => {
    try {
        const users = await getAllUsersService()
        sendResponse(res, 200, "Get all users successfull", users)
    } catch (error) {
        next(error)
    }
}

const getUserController = async (req, res, next) => {
    try {
        const user = await getUserService(req.params.userId)

        sendResponse(res, 200, "Get user succesfully", user)
    } catch (error) {
        next(error)
    }
}

const getMyProfileController = async (req, res, next) => {
    try {
        const userData = await getMyProfileService(req.user.id)

        sendResponse(res, 200, "Get your profile succesfull", {user : userData})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsersController,
    getMyProfileController,
    getUserController
}