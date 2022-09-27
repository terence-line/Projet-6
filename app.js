
// Importation de express
const express = require('express');

// Importation de mongoose
const mongoose = require('mongoose');

// Importation du model sauce
const Sauce = require('./models/sauces');

// Importation du routeur sauces
const saucesRoutes = require('./routes/sauces');

// Importation du routeur user
const userRoutes = require('./routes/user');

/* Importation de cors (permet de prendre en charge des requêtes multi-origines sécurisées 
et des transferts de données entre des navigateurs et des serveurs web.*/
const cors = require('cors');

//Le pathmodule fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires.
const path = require('path');

/*Importation de helmet. 
Helmet aide à sécuriser les applications Express en définissant divers en-têtes HTTP*/
const helmet = require('helmet');

/*Ce module recherche toutes les clés dans les objets commençant par un $signe ou contenant un ., 
req.bodyde req.queryou req.params. 
Il peut alors soit :
supprimer complètement ces clés et les données associées de l'objet, ou
remplacer les caractères interdits par un autre caractère autorisé.
Le comportement est régi par l'option passée, replaceWith.*/
const mongoSanitize = require('express-mongo-sanitize');

/*Dotenv est un module sans dépendance qui charge les variables d'environnement 
d'un.envfichier dans process.env.*/
require('dotenv').config()

// Création de l'application app avec la méthode express()
const app = express();

// Connection à mongodb
mongoose.connect('mongodb+srv://SCOTT:toto520@cluster0.hjemxeh.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



// Pour accèder au corps de la requête
app.use(express.json());
app.use(cors());

// Application pour les images
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);


