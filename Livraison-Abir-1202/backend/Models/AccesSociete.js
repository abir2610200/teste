const mongoose = require('mongoose');

// Définition du schéma pour AccesSociete
const accesSocieteSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Référence à la collection des utilisateurs
    },
    id_societes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Societe' // Référence à la collection des sociétés
    }]
});

// Création du modèle AccesSociete
const AccesSociete = mongoose.model('AccesSociete', accesSocieteSchema);

module.exports = AccesSociete;
 

