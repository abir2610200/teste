const mongoose = require('mongoose');

const SocieteSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
  
    raisonSociale: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    MF: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['Personne physique', 'Personne morale'],
        required: true
    },
    logo: {
        type: Buffer,
        contentType: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Societe', SocieteSchema);