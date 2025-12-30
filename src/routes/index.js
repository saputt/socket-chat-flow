const { Router } = require("express");
const globalErrorHandler = require("../middlewares/globalErrorHandler");
const authRoute = require('../routes/authRoute')
const sellerRoute = require('../routes/sellerRoute')
const productsRoute = require('../routes/productsRoute')
const chatRoute = require('../routes/chatRoute')
const userRoute = require('../routes/userRoute')

const router = Router()

//routes
router.use(authRoute)
router.use(sellerRoute)
router.use(productsRoute)
router.use(chatRoute)
router.use(userRoute)

//middleware global error handler
router.use(globalErrorHandler)

module.exports = router