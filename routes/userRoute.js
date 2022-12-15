// importer express
const express = require('express');
// Importer fichier password.js
const password = require('../middleware/password')
// Importer le controel email
const email = require('../middleware/emailValidator')

// Import rate limit 
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, //Limiter chaque IP à 100 requêtes par fenêtre (ici, par 15 minutes)
  standardHeaders: true, // Informations sur la limite de taux de retour dans les en-têtes « RateLimit-*»
  legacyHeaders: false, // Désactiver les en-têtes X-RateLimit-*
});

// création du routeur 
const router = express.Router();  

const userCtrl = require('../controllers/userController')
   

router.post('/signup', email, password, userCtrl.signup);

router.post('/login', limiter, userCtrl.login);

module.exports = router;                             