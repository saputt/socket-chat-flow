const { Router } = require("express");
const { getProductsController, addProductController, deleteProductController, updateProductController, getProductsByIdController } = require("../controllers/productsController");
const authMiddleware = require("../middlewares/authMiddleware");
const sellerMiddleware = require("../middlewares/sellerMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { addProductSchema } = require("../validators/productsValidate");

const router = Router()

router.get("/api/products", getProductsController)
router.get("/api/products/:id", getProductsByIdController)
router.post("/api/product", authMiddleware, sellerMiddleware, addProductController)
router.delete("/api/product/:id", authMiddleware, sellerMiddleware, deleteProductController)
router.patch("/api/product/:id", authMiddleware, sellerMiddleware, updateProductController)

module.exports = router