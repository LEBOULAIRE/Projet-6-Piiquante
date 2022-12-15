// Import de mongoose
const mongoose = require('mongoose');

// plugin pour traiter les erreurs sur le model
const uniqueValidator = require('mongoose-unique-validator'); 

// Création du schéma pour identification 
const user = mongoose.Schema ({
    email: {type: String, required: true, unique: true}, //Une adresse par utilisateur
    password: {type: String, required: true}
});

user.plugin(uniqueValidator);

// Exporter en format model
module.exports = mongoose.model("User", user);