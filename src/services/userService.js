const { getAllUsers, findUserById } = require("../repositories/usersRepository")

const getAllUsersService = async () => {
    return getAllUsers()
}

const getMyProfileService = async id => {
    const userData = findUserById(id)

    const {password, refreshToken, ...data} = userData

    return {...data}
}

module.exports = {
    getAllUsersService,
    getMyProfileService
}