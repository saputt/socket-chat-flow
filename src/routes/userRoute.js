const { Router } = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { getAllUsersController, getMyProfileController, getUserController } = require("../controllers/usersController")

const router = Router()

router.get("/api/users", authMiddleware, getAllUsersController)
router.get("/api/user/:userId", authMiddleware, getUserController)
router.get("/api/me", authMiddleware, getMyProfileController)

module.exports = router