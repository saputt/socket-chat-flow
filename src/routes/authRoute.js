const { Router } = require("express");
const { loginController, registerController, refreshTokenController, logoutController } = require("../controllers/authController");
const validateRequest = require("../middlewares/validateRequest");
const { loginSchema, registerSchema } = require("../validators/authValidate");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router()

router.post("/api/login", validateRequest(loginSchema), loginController)
router.post("/api/register", validateRequest(registerSchema), registerController)
router.post("/api/refresh", refreshTokenController)
router.post("/api/logout", authMiddleware, logoutController)

module.exports = router