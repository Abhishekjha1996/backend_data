const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        const decode = jwt.verify(token, "secretkey")
        if(decode) {
            req.body.userID = decode.userID
            next()
        }else {
            res.status(404).send({"msg": "Please login first!!!!!"})
        }
    }else {
        res.status(404).send({"msg": "Please login first No token !"})
    }
}


module.exports = {
    auth
}