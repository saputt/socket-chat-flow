const sendResponse = (res, statusCode = 200, message = null, data = null, accessToken = null) => {
    return res.status(statusCode).json({
        status : statusCode === 200 ? "Success" : "Error",
        ...(message && {message}),
        ...(data && { data }),
        ...(accessToken && { accessToken })    
    })
}

module.exports = sendResponse