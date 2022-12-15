// import de helmet pour la sécurité des en tete 
const helmet = require("helmet");


// import d'express
const express = require('express');

// import de path
const path = require('path');

//mise en place dotenv
const dotenv = require("dotenv").config("");   

// Import de mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Import routes user
const routeUser = require('./routes/userRoute');

// Import routes sauce
const routeSauce = require('./routes/sauceRoute');



// application express  
const app = express();   

mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true,
  useUnifiedTopology: true })  
.then(() => console.log('Connexion à MongoDB réussie !'))  
.catch(() => console.log('Connexion à MongoDB échouée !'));

 
app.use(helmet());

// Pour éviter les problèmes CORS
app.use((req, res, next) => {   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    next();
  });
 
// Pour les corps en json pour POST
app.use(express.json());  


//importer notre router user
app.use('/api/auth', routeUser);

//importer notre router sauce
app.use('/api/sauces', routeSauce); 
 
app.use ('/images', express.static(path.join(__dirname, 'images')))
 
// exporter notre application vers serveur
module.exports = app;               