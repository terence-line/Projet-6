
// Importation de express
const express = require('express');

// Importation du router
const router = express.Router();

// Importation de auth pour qu'il soit exécuté avant les gestionnaires de routes
const auth = require('../middleware/auth');

// Importation de multer
const multer = require('../middleware/multer-config');

// Importation du controller sauces
const saucesCtrl = require('../controllers/sauces');

// Appel des fonctions 
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/:id/like', auth, saucesCtrl.createLike);

// Exportation du router
module.exports = router;


