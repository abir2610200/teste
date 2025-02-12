const express = require('express');
const multer = require('multer');
const Societe = require('../Models/Societe');
const router = express.Router();

// Configuration de multer pour le stockage des fichiers en mémoire
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // Limite à 5MB pour le logo
}).single('logo');  // Le champ de fichier doit être 'logo'

// Route pour créer une société (POST)
router.post('/api/societes', upload, async (req, res) => {
    try {
        const { code, raisonSociale, adresse, MF, type } = req.body;
        let logo = null;

        // Vérifier si un fichier a été téléchargé
        if (req.file) {
            logo = req.file.buffer;  // Stocke l'image du logo sous forme de Buffer
        }

        // Créer une nouvelle société avec les données
        const societe = new Societe({
            code,
            raisonSociale,
            adresse,
            MF,
            type,
            logo
        });

        // Sauvegarder la société dans la base de données
        await societe.save();
        res.status(201).send(societe); // Réponse avec l'objet société créé
    } catch (err) {
        res.status(400).send({ error: 'Erreur lors de la création de la société', details: err });
    }
});

// Route pour obtenir toutes les sociétés (GET)
router.get('/api/societes', async (req, res) => {
    try {
        const societes = await Societe.find().select('-__v'); // Exclure le champ __v
        res.status(200).send(societes); // Réponse avec la liste des sociétés
    } catch (err) {
        res.status(500).send({ error: 'Erreur lors de la récupération des sociétés', details: err });
    }
});

// Route pour obtenir une société par son ID (GET)
router.get('/api/societes/:id', async (req, res) => {
    try {
        const societe = await Societe.findById(req.params.id).select('-__v'); // Exclure le champ __v
        if (!societe) {
            return res.status(404).send({ error: 'Société non trouvée' });
        }
        res.status(200).send(societe);
    } catch (err) {
        res.status(500).send({ error: 'Erreur lors de la récupération de la société', details: err });
    }
});

// Route pour mettre à jour une société par son ID (PUT)
router.put('/api/societes/:id', upload, async (req, res) => {
    try {
        const { code, raisonSociale, adresse, MF, type } = req.body;
        let logo = null;

        // Vérifier si un nouveau fichier a été téléchargé
        if (req.file) {
            logo = req.file.buffer;  // Stocke l'image du logo sous forme de Buffer
        }

        // Mettre à jour la société
        const societe = await Societe.findByIdAndUpdate(
            req.params.id,
            { code, raisonSociale, adresse, MF, type, logo },
            { new: true } // Retourner l'objet mis à jour
        ).select('-__v'); // Exclure le champ __v

        if (!societe) {
            return res.status(404).send({ error: 'Société non trouvée' });
        }

        res.status(200).send(societe);
    } catch (err) {
        res.status(400).send({ error: 'Erreur lors de la mise à jour de la société', details: err });
    }
});

// Route pour supprimer une société par son ID (DELETE)
router.delete('/api/societes/:id', async (req, res) => {
    try {
        const societe = await Societe.findByIdAndDelete(req.params.id).select('-__v'); // Exclure le champ __v

        if (!societe) {
            return res.status(404).send({ error: 'Société non trouvée' });
        }

        res.status(200).send({ message: 'Société supprimée avec succès' });
    } catch (err) {
        res.status(500).send({ error: 'Erreur lors de la suppression de la société', details: err });
    }
});

module.exports = router;
