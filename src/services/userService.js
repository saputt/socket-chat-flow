const { getAllUsers, findUserById } = require("../repositories/usersRepository")
const { isUserExistById } = require("../utils/serviceHelper")

const getAllUsersService = async () => {
    return getAllUsers()
}

const getMyProfileService = async id => {
    const userData = findUserById(id)

    const {password, refreshToken, ...data} = userData

    return {...data}
}

const getUserService = async id => {
    const userExist = await isUserExistById(id)
    return userExist
}

module.exports = {
    getAllUsersService,
    getMyProfileService,
    getUserService
}