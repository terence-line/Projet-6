// Importation de express pour créer un routeur
const express = require('express');

// Création du router avec la fonction router express
const router = express.Router();

// Configuration du contoller pour l'associer aux différentes routes
const userCtrl = require('../controllers/user');

// Création de routes post pour l'envoi d'informations du frontend (adresse mail et mot de passe)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du router
module.exports = router;

