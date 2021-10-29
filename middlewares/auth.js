const jwt = require('jsonwebtoken')
const secret = process.env.JW_SECRET

function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers.authorization
        if (!bearerHeader) return res.sendStatus(401)
        const token = bearerHeader.split(' ')[1]
        req.payload = jwt.verify(token, secret)
        next()
    } catch {
        return res.sendStatus(401)
    }
}

module.exports = { verifyToken }
