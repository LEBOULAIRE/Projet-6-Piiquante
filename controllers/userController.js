// import bcrypt pour le hachage du mot de passe
const bcrypt = require("bcrypt");
//  import jsonwebtoken
const jwt = require("jsonwebtoken");

// importer le model
const User = require("../models/User");

// fonction nouvelle utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => { 
      const user = new User({
        // on crée un nouveau objet identifiant
        email: req.body.email, // mail client
        password: hash // mot de passe crypter client
      }); 
      user.save()
        .then(() =>
          {res.status(201).json({ messsage: "Un utilsateur a été crée!" })}
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); //erreur serveur
};

// Pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // promesse retournée par findOne
    .then((user) => {
      // Vérifier si l'utilisateur existe
      if (user === null) {
        res
          .status(401)
          //Important de ne pas préciser la raison du problème de connexion pour éviter le piratage
          .json({ message: "Paire identifiant / mot de passe incorrecte" });   
      } else {                                        
        // Check si le mdp correspond à celui associé à l'utilisateur dans la bdd
        bcrypt
          .compare(req.body.password, user.password) //méthode pour comparer le mdp avec bdd
          .then((valid) => {
            if (!valid) {   
              res
                .status(401)
                .json({
                  message: "Paire identifiant / mot de passe incorrecte",
                });
            } else { console.log (user._id)
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  //payload = les données que l'on veut encoder dans un TOKEN
                  { userId: user._id },
                  process.env.TOKEN,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
