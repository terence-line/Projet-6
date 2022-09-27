// Importation du model
const Sauce = require('../models/sauces');

/*fs  signifie « file system » (soit « système de fichiers », en français). 
Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
y compris aux fonctions permettant de supprimer les fichiers.*/
// Importation du package fs de node
const fs = require('fs');

// Exportation de la fonction createSauce pour la création d'une sauce
exports.createSauce = (req, res, next) => {

    // On commence par parser la sauce
    const sauceObject = JSON.parse(req.body.sauce);

    // Suppression de ._userId (nous ne voulons pas faire confiance au client)
    delete sauceObject._userId;

    // Création d'une sauce
    const sauce = new Sauce({
        ...sauceObject,
        // On extrait userId de la sauce requête grâce au middleware
        userId: req.auth.userId,
        /*On génère l'url de l'image avec des propriétés de la sauce requête (protocol,le nom d'hôte,
        le nom du fichier tel qu'il est donné par multer)*/
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    // Enregistrement de la sauce dans la base de données
    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce ajoutée !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

// Exportation de la fonction getOneSauce pour trouver une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({ error: error });
        }
    );
};

// Exportation de la fonction modifySauce pour modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObject._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Modification non autorisée !' });
            } else {
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Exportation de la fonction deleteSauce pour supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Suppression non autorisée !' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Sauce supprimée !' })})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// Exportation de la fonction getAllSauce pour afficher toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({ error: error });
        }
    );
};

// Exportation de la fonction createLike pour liker ou disliker une sauce
exports.createLike = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Si l'utilisateur n'aime pas la sauce.
            if (req.body.like == -1) {
                // On ajoute un dislike.
                sauce.dislikes++;
                // Ajout du username et  dislike dans le tableau 
                sauce.usersDisliked.push(req.body.userId);
                sauce.save();
            }
            // Si l'utilisateur aime la sauce.
            if (req.body.like == 1) {
                //On ajoute un like.
                sauce.likes++;
                // Ajout du username et like dans le tableau 
                sauce.usersLiked.push(req.body.userId);
                sauce.save();
            }
            // Si l'utilisateur change d'avis.
            if (req.body.like == 0) {
                // Ajout de conditions pour que la modification du like soit attribuée à l'Id
                if (sauce.usersLiked.indexOf(req.body.userId) != -1) {
                    // Suppression du like 
                    sauce.likes--;
                    // Suppression du like en fonction de son Id
                    sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId), 1);
                }
                else {
                    // Suppression du dislike 
                    sauce.dislikes--;
                    // Suppression du dislike en fonction de son Id
                    sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1);
                }
                sauce.save();

            }
            res.status(200).json({ message: 'Modification  prise en compte !' });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};



