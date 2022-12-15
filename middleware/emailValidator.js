// Import de validator pour la validation de l'email
const validator = require("validator");

// exporter pour valider email sur la route signup
module.exports = (req, res, next) => {
    const email = req.body.email

    if(validator.isEmail(email)){
        next()
    }
    else {
        return res.status(400).json({error: `email ${email} is not good`})
    }
}