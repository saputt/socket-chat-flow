const { Router } = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { getAllUsersController, getMyProfileController, getUserController } = require("../controllers/usersController")

const router = Router()

router.get("/api/users", authMiddleware, getAllUsersController)
router.get("/api/me", authMiddleware, getMyProfileController)
router.get("/api/user/:id", authMiddleware, getUserController)

module.exports = router