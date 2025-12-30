const prisma = require("../config/db");

const users = prisma.users

const findUserById = async id => await users.findUnique({
    where : {id}
})

const findUserByEmail = async email => await users.findUnique({
    where : {email}
})

const updateRefreshToken = async (id, token) => await users.update({
    where : {id},
    data : {refreshToken : token}
})

const createUser = async userData => await users.create({
    data : userData
})

const findUserByRefresh = async token => await users.findFirst({
    where : {refreshToken : token}
})

const getAllUsers = async () => await users.findMany({
    select : {
        name : true,
        id : true,
        email : true
    }
})

const getAllUserGroup = async id => await users.findUnique({
    where : {id},
    include : {
        roomMember : true
    }
})

module.exports = {
    findUserByEmail,
    findUserById,
    updateRefreshToken,
    createUser,
    findUserByRefresh,
    getAllUsers,
    getAllUserGroup
}