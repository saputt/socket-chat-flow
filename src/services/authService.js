const { haveSeller } = require("../repositories/sellersRepository")
const { findUserByEmail, createUser, updateRefreshToken, findUserByRefresh, findUserById } = require("../repositories/usersRepository")
const AppError = require("../utils/errorHandler")
const { isUserExistById } = require("../utils/serviceHelper")
const { generateAccessToken, generateRefreshToken, generateNewRefreshToken } = require("../utils/generateToken")
const { comparePassword, hashPassword } = require("../utils/passwrod")
const { verifyRefreshToken } = require("../utils/verifyToken")

const loginService = async data => {
    const {email, password} = data
    
    const emailExist = await findUserByEmail(email)  

    if(!emailExist) throw new AppError("Email doesnt exist", 401)

    const passwordCorrect = await comparePassword(password, emailExist.password)

    if(!passwordCorrect) throw new AppError("Password incorrect", 400)
    
    const sellerExist = await haveSeller(emailExist.id)

    const payload = {
        id : emailExist.id,
        role : sellerExist ? ["USER", "SELLER"] : ["USER"],
        name : emailExist.name,
        email : emailExist.email
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    await updateRefreshToken(emailExist.id, refreshToken)

    return {accessToken, refreshToken, payload}
}

const registerService = async data => {
    const {email, name, password} = data
    
    const emailHasBeenUsed = await findUserByEmail(email)

    if(emailHasBeenUsed) throw new AppError("Email has been used", 400)

    const dataUser = {
        name,
        email,
        password : await hashPassword(password)
    }

    return createUser(dataUser)
}

const refreshTokenService = async token => {
    if(!token) throw new AppError("Not authorized", 401)

    const refreshExistInDb = await findUserByRefresh(token)
    
    if(!refreshExistInDb) throw new Error("Token not valid", 400)
    
    const decoded = verifyRefreshToken(token)

    await isUserExistById(decoded.id)

    const payload = {
        id : decoded.id,
        role : decoded.role
    }
    
    const remainingTime = Math.floor(decoded.exp - (Date.now() / 1000)) + 1 

    const newAccessToken = generateAccessToken(payload)
    const newRefreshToken = generateNewRefreshToken(payload, remainingTime)

    await updateRefreshToken(decoded.id, newRefreshToken)

    return {newAccessToken, newRefreshToken, remainingTime}
}

const logoutService = async id => {
    await isUserExistById(id)

    return updateRefreshToken(id, null)
}

module.exports = {
    loginService,
    registerService,
    refreshTokenService,
    logoutService
}