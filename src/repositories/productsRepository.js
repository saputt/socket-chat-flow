const prisma = require("../config/db");

const products = prisma.products

const getProducts = async () => await products.findMany()

const deleteProduct= async id => await products.delete({
    where : {id}
})

const findProductById = async id => await products.findUnique({
    where : {id}
})

const updateProduct = async (id, updateData) => await products.update({
    where : {id},
    data : updateData
})

const createProduct = async data => await products.create({
    data
})

module.exports = {
    getProducts,
    findProductById,
    deleteProduct,
    updateProduct,
    createProduct
}
