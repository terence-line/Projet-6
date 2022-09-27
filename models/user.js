// Importation de mongoose
const mongoose = require('mongoose');

// Importation du pluging validator
const uniqueValidator = require('mongoose-unique-validator');

// Création du schema user avec impossibilité de s'inscrire avec la même adresse mail
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Application de uniqueValidator au schema avant d'en faire un model
userSchema.plugin(uniqueValidator);

// Exportation du model userSchema
module.exports = mongoose.model('User', userSchema);

