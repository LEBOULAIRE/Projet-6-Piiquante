// Import du model sauce
const Sauce = require("../models/Sauce");
//import de fs
const fs = require('fs');

// Pour récupérer l'ensemble des sauces par get
exports.allSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
// Pour récupérer une sauce particulière
exports.sauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

// Pour envoyer une nouvelle sauce
exports.moreSauce = (req, res, next) => {                              
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject)
  delete sauceObject._id; //Créer auto par bdd
  delete sauceObject._userId; //Pas faire confiance au client
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce // enregistre dans la base de donnée
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
 
// Mise à jour d'une sauce
exports.updateSauce = (req, res, next) => {
  // On demande si il y a un champs file en créant un objet
  const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce), //parse la nouvelle chaine
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; //si pas le cas on récupere objet de la requete

  delete sauceObject._userId; // on supprime user id pour éviter de l'assigner à quelqu'un d'autre
  Sauce
    .findOne ({_id: req.params.id}) // on check si id produit dans BDD
      .then ((sauce)=> {
        if(sauce.userId != req.auth.userId){ //on vérifie si le userId en bdd correspond à celui du token recupérer
           res.status(401).json({message: "not authorized"});
        }
        else { 
          Sauce.updateOne(
            {_id : req.params.id}, 
            {...sauceObject, _id: req.params.id}
          )
          .then (() => res.status(200).json({ message: "Sauce modifiée!" }))
          .catch((error) => { res.status(401).json({ error })})
        
        }})
      .catch((error)=> {res.status(400).json({error})})
    
    }                              
;                                                                                                                                                   

// Supprimer un sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    if(sauce.userId != req.auth.userId){ //on vérifie si le userId en bdd correspond à celui du token recupérer
      res.status(401).json({message: "not authorized"});
    }
    else {
      const filename = sauce.imageUrl.split('/images/')[1];   
      fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({_id: req.params.id})
            .then(res.status(200).json({message: 'Objet supprimé !'}))
            .catch(error => res.status(401).json({ error }))    
      })    

    }
  
  })
  .catch((error) => res.status(400).json({ error }));                       
};

// Envoyer les likes des sauces
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.body.like === 1) {
        sauce.usersLiked.push(req.body.userId);
      } else if (req.body.like === -1) {
        sauce.usersDisliked.push(req.body.userId);
      } else if (req.body.like === 0) {
        if (sauce.usersLiked.includes(req.body.userId)) {
          const userIdIndex = sauce.usersLiked.indexOf(req.body.userId);
          sauce.usersLiked.splice(userIdIndex, 1);
        }
        if (sauce.usersDisliked.includes(req.body.userId)) { 
          const userIdDisliked = sauce.usersDisliked.indexOf(req.body.userId);
          sauce.usersDisliked.splice(userIdDisliked, 1);
        }
      }
      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;
      sauce
        .save()
        .then(() =>
          res.status(200).json({ message: "mise à jour likes, dislikes" })
        )
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(400).json({ error }));
};
