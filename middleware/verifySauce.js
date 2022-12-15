// module.exports = (req, res, next) => {


//     const regexTitle = new RegExp("^[A-Za-zéèêëàçâ -]{10,35}$");
//     const regexDescription = new RegExp ("^[A-Za-zéèêëàçâ -]{10,550}$");
//     const regexManufacture = new RegExp("^[A-Za-zéèêëàçâ -]{5,35}$");
//     const regexIngredient = new RegExp("^[A-Za-zéèêëàçâ -]{5,35}$");

    
//     const verifyTitle = regexTitle.test(req.body.name);
//     const verifyDescription = regexDescription.test(req.body.description);
//     const verifyManufacture = regexManufacture.test(req.body.manufacturer);
//     const verifyIngredient = regexIngredient.test(req.body.mainPepper);
    
    
//     if (verifyTitle && verifyDescription && verifyManufacture && verifyIngredient)
//         {next()}
//     else {
//         return res.status(400).json({
//           message:
//             "Champs du produit n'est pas bon" 
            
//         });
//       }
// }                             