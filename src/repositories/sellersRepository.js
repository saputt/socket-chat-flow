const prisma = require("../config/db");

const sellers = prisma.sellers

const findSellerById = async id => await sellers.findUnique({
    where : {id}
})

const findSellerByUserId = async id => await sellers.findUnique({
    where : {idUser : id}
})

const haveSeller = async userId => await sellers.findUnique({
    where : {
        idUser : userId
    }
})

const createSeller = async data => await sellers.create({
    data
})

const deleteSeller = async id => await sellers.delete({
    where : {id}
})

module.exports = {
    findSellerById,
    haveSeller,
    createSeller,
    deleteSeller,
    findSellerByUserId
}