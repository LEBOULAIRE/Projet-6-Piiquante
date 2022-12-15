// importer express
const express = require('express');
// création du routeur 
const router = express.Router();

const auth = require('../middleware/auth');

// Import multer
const multer = require ('../middleware/multer-config')

const sauceCtrl = require('../controllers/sauceController');

router.get('/', auth, sauceCtrl.allSauce);
router.get('/:id', auth, sauceCtrl.sauce);
router.post('/', auth, multer, sauceCtrl.moreSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;