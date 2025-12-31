const { Router } = require("express");
const globalErrorHandler = require("../middlewares/globalErrorHandler");
const authRoute = require('./authRoute')
const sellerRoute = require('./sellerRoute')
const productsRoute = require('./productsRoute')
const chatRoute = require('./chatRoute')
const userRoute = require('./userRoute')

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