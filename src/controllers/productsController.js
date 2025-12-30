const { addProductService, deleteProductService, updateProductService, getProductsService, getProductsByIdService } = require("../services/productsService")
const sendResponse = require("../utils/responseHelper")

const addProductController = async (req, res, next) => {
    try {
        const product = await addProductService(req.body, req.user.id)

        req.io.emit("add_product", product)

        sendResponse(res, 200, "Product create successfull", product)
    } catch (error) {
        next(error)
    }
}

const deleteProductController = async (req, res, next) => {
    try {
        const product = await deleteProductService(req.params.id, req.user.id)

        req.io.emit("delete_product", product.id)

        sendResponse(res, 200, "Delete product successfull")
    } catch (error) {
        next(error)
    }
}   

const updateProductController = async (req, res, next) => {
    try {
        const product = await updateProductService(req.params.id, req.body, req.user.id)

        req.io.emit("update_product", product)

        sendResponse(res, 200, "Update product successfull", product)
    } catch (error) {
        next(error)
    }
}

const getProductsController = async (req, res, next) => {
    try {
        const products = await getProductsService()
        sendResponse(res, 200, "Get all product successfull", products)
    } catch (error) {
        next(error)
    }
}

const getProductsByIdController = async (req, res, next) => {
    try {
        const product = await getProductsByIdService(req.params.id)
        sendResponse(res, 200, "Get product success", product)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addProductController,
    deleteProductController,
    updateProductController,
    getProductsController,
    getProductsByIdController
}