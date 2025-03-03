const mongoose = require('mongoose');

const CoursSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: true,
    },
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prof', // Changed from User to Prof
        required: true,
    },
    datedebut: {
        type: Date,
        required: true,
    },
    datefin: {
        type: Date,
        required: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class', // Reference to the Class model
        required: true,
    },
    color: { type: String, default: "#b64fc8" },

}, { timestamps: true });

module.exports = mongoose.models.Cours || mongoose.model('Cours', CoursSchema);

