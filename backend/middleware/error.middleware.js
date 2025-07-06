const Error = (err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong'
    const data = err.data
    return res.status(statusCode).json({
        status: 'failed',
        message,
        data
    })
}

module.exports = Error;