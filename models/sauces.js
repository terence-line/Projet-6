
// Importation de mongoose
const mongoose = require('mongoose');

// Création d'un schéma de données
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String },
    description: { type: String },
    mainPepper: { type: String },
    imageUrl: { type: String },
    heat: { type: Number },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: Array, default: [] },
    usersDisliked: { type: Array, default: [] },

});

// Exportation du modèle terminé
module.exports = mongoose.model('Sauce', sauceSchema);

