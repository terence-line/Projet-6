// Importation de multer
const multer = require('multer');

// Création d'un dictionnaire de MIME_TYPES qui sera un objet
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/*Création d'un objet de configuration pour multer avec la fonction diskStoage 
(pour l'enregistrer sur le disque)*/
const storage = multer.diskStorage({

    /*1er argument, une fonction pour la destination qui va expliquer à multer dans quel dossier
    enregistrer les fichiers*/
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    //2ème argument, qui va expliquer à multer quel nom de fichier utiliser
    filename: (req, file, callback) => {

        /* Génération du nouveau nom pour le fichier en utilisant le nom d'origine.
       On supprime les espaces et on les remplace par des underscores*/
        const name = file.originalname.split(' ').join('_');

        /* Création de l'extension du fichier qui sera l'élément du dictionnaire
        qui correspond aux MIME_TYPES du fichier envoyé par le frontend*/
        const extension = MIME_TYPES[file.mimetype];

        /* Appel du callback avec un 1er argument (null) et ensuite on crée le filename entier
        (le name créé au-dessus auquel on rajoute un timestamp pour le rendre le plus unique possible,
        on ajoute un point et l'extension du fichier)*/
        callback(null, name + Date.now() + '.' + extension);
    }
});

/*Exportation de multer complètement configuré 
(fonction multer à laquelle on passe l'objet storage et 
on appelle la méthode single pour dire qu'il s'agit d'un fichier unique et 
on explique à multer qu'il s'agit de fichiers images uniquement)*/
module.exports = multer({ storage: storage }).single('image');

