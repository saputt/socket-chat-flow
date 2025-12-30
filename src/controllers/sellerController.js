const { addSellerService, deleteSellerService } = require("../services/sellerService")
const sendResponse = require("../utils/responseHelper")

const addSellerController = async (req, res, next) => {
    try {
        const seller = await addSellerService(req.body, req.user.id)
        
        req.io.emit("add_seller", {
            id : seller.id
        })

        sendResponse(res, 200, "Create seller account success", seller.id, seller.newAccessToken)
    } catch (error) {
        next(error)
    }
}

const deleteSellerController = async (req, res, next) => {
    try {
        const {id} = await deleteSellerService(req.params.id)
        
        req.io.emit("delete_seller", {
            id
        })

        sendResponse(res, 200, "Success delete seller account")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addSellerController,
    deleteSellerController
}