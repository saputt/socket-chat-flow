const { deleteProduct, updateProduct, getProducts, createProduct, findProductById } = require("../repositories/productsRepository")
const { findSellerByUserId } = require("../repositories/sellersRepository")
const AppError = require("../utils/errorHandler")
const { isSellerAllow } = require("../utils/serviceHelper")

const addProductService = async (data, userId) => {
    const {name, stock, description} = data

    const seller = await findSellerByUserId(userId)

    const dataProduct = {
        name,
        stock,
        description,
        sellerId : seller.id
    }

    return createProduct(dataProduct)
}

const deleteProductService = async (productId, userId) => {
    await isSellerAllow(productId, userId)

    return deleteProduct(productId)
}   

const updateProductService = async (productId, data, userId) => {
    await isSellerAllow(productId, userId)
    
    return updateProduct(productId, data)
}

const getProductsService = async () => {
    return getProducts()
}

const getProductsByIdService = async id => {
    return findProductById(id)
}

module.exports = {
    addProductService,
    deleteProductService,
    updateProductService,
    getProductsService,
    getProductsByIdService
}