// Importation de jsonwebtoken
const jwt = require('jsonwebtoken');

/*Dotenv est un module sans dépendance qui charge les variables d'environnement 
d'un.envfichier dans process.env.*/
require('dotenv').config()

/*Exportation d'une fonction qui sera notre middleware pour extraire les informations contenues 
dans le TOKEN, de vérifier que le TOKEN est valide et les transmettre aux autres middlewares ou 
au gestionnaire de routes*/
module.exports = (req, res, next) => {
    try {
        /*Récupération du TOKEN à l'aide du headers (diviser la chaîne de caractères en un tableau
        autour de l'espace qui se trouve entre le mot clé Bearer et le TOKEN. C'est le Token qui est
        en 2ème que nous voulons récupérer*/
        const token = req.headers.authorization.split(' ')[1];

        // Décodage du TOKEN avec la méthode verify de jsonwebtoken
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);

        // Récupération du userId en particulier
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};

