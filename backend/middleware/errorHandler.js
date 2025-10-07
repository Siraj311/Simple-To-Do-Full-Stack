
const errorHandler = (err, req, res, next) => {
    console.log(err.stack)
    console.log('He he here is the problem');
    

    const status = res.statusCode ? res.statusCode : 500
    res.status(status)
    res.json({ message: err.message })
}

module.exports = errorHandler 