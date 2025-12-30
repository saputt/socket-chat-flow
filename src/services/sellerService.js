const { haveSeller, createSeller, findSellerById, deleteSeller } = require("../repositories/sellersRepository");
const AppError = require("../utils/errorHandler");
const { generateAccessToken } = require("../utils/generateToken");

const addSellerService = async (data, userId) => {
    const {name, description} = data;

    const sellerExist = await haveSeller(userId)

    if(sellerExist) throw new AppError("Seller account is already exist", 400)

    const dataSeller = {
        name,
        description : description ? description : null,
        idUser : userId
    }

    const payload = {
        id : userId,
        role : ["USER", "SELLER"]
    }

    const newAccessToken = generateAccessToken(payload)

    const {id} = await createSeller(dataSeller)

    return {newAccessToken, id}
}

const deleteSellerService = async id => {
    const sellerExist = await findSellerById(id)

    if(!sellerExist) throw new AppError("Seller doesnt exist", 401)

    return deleteSeller(id)
}

module.exports = {
    addSellerService,
    deleteSellerService
}