const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { //default middleware pattern used in express js
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY) //try decoding
        req.userData = decoded;
        next();
    } catch {
        return res.status(402).json({
            message : "Auth Failed"
        })
    }
}