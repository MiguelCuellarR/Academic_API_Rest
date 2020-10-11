const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
    let tk = req.headers["access-token"];
    if(tk){
        let secretkey = config.get("secretkeys").jwt;
        let tkDecoded = jwt.verify(tk, secretkey);
        let currentDate = Math.floor(Date.now() / 1000);
        if(tkDecoded.exp >= currentDate){
            next();
        }else{
            return res.status(400).json({
                message: "This Token Is Not Valid."
            })
        }
    }else{
        return res.status(400).json({
            message: "Not Access Token Set."
        })
    }
};