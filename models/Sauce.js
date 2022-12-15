// Import de mongoose
const mongoose = require('mongoose');

// Création du schéma pour identification 
const sauce = mongoose.Schema ({
    userId: {type: String, required: true},
    name: {type: String, required: true}, // nom de la sauce
    manufacturer: {type: String, required: true}, // fabricant de la sauce
    description: {type: String, required: true}, // description de  la sauce
    mainPepper: {type: String, required: true}, // pricipal ingrédient épicé
    imageUrl: {type: String, required: true}, // Url image 
    heat: {type: Number, required: true}, // nombre entre 1 à 10
    likes: {type: Number, default: 0}, // nombre de like           
    dislikes: {type: Number, default: 0}, // nombre de dislike
    usersLiked: {type: [String], default: []}, // Tableau des identifiants qui like
    usersDisliked : {type: [String], default: []} // Tableau des identifiants qui dislike
});                 


// Exporter en format model
module.exports = mongoose.model("Sauce", sauce);