const { findProductById } = require("../repositories/productsRepository")
const { findRoomById } = require("../repositories/roomChatRepository")
const { findSellerByUserId, findSellerById } = require("../repositories/sellersRepository")
const { findUserById } = require("../repositories/usersRepository")
const AppError = require("./errorHandler")

const isUserExistById = async id => {
    const userExist = await findUserById(id)
    if(!userExist) throw new AppError("User doesnt exist", 401)

    return userExist
}

const isSellerAllow = async (productId, userId) => {
    const seller = await findSellerByUserId(userId)

    const productExist = await findProductById(productId)

    if(!productExist) throw new AppError("Product doesnt exist", 401)

    if(productExist.sellerId !== seller.id) throw new AppError("You are not allow to delete this product", 400)
}



const isSendToExist = async sendToId => {
    const checkSendToIsSeller = await findSellerById(sendToId)

    if(!checkSendToIsSeller) {
        const checkSendToIsUser = await findUserById(sendToId)

        if(!checkSendToIsUser) throw new AppError("User doesnt exist")
    }
}

const isRoomExist = async roomId => {
    const roomExist = await findRoomById(roomId)

    if(!roomExist) throw new AppError("Room doesnt exist", 400)

    return roomExist
}

module.exports = {
    isUserExistById,
    isSellerAllow,
    isSendToExist,
    isRoomExist
}