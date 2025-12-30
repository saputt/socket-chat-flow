const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const sellerMiddleware = require("../middlewares/sellerMiddleware");
const { addSellerController, deleteSellerController } = require("../controllers/sellerController");
const validateRequest = require("../middlewares/validateRequest");
const { addSellerSchema } = require("../validators/sellerValidate");

const router = Router()

router.post("/api/seller", validateRequest(addSellerSchema), authMiddleware, addSellerController)
router.delete("/api/seller/:id", authMiddleware, sellerMiddleware, deleteSellerController)

module.exports = router