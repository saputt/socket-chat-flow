const { findUserById } = require("../repositories/usersRepository")
const AppError = require("../utils/errorHandler")
const { verifyAccessToken } = require("../utils/verifyToken")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(" ")[1]

        if(!token) throw new AppError("You are not authenticated", 401)

        try {
            const decoded = verifyAccessToken(token);
            

            const userExist = await findUserById(decoded.id)

            if(!userExist) throw new AppError("User no longer exist", 400)

            req.user = decoded

            next()
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    code: "TOKEN_EXPIRED", 
                    message: "Token lu udah basi jirr, buruan refresh!" 
                });
            }

            if (error.name === 'JsonWebTokenError') {
                return res.status(403).json({ 
                    message: "Token palsu nih, jangan macem-macem ya!" 
                });
            }

            return res.status(500).json({ message: "Gagal verifikasi token" });
        }
        
    } catch (error) {
        next(error)
    }
}

module.exports = authMiddleware