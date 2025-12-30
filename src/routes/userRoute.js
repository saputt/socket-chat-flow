const { Router } = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { getAllUsersController, getMyProfileController } = require("../controllers/usersController")

const router = Router()

router.get("/api/users", authMiddleware, getAllUsersController)
router.get("/api/me", authMiddleware, getMyProfileController)

module.exports = router