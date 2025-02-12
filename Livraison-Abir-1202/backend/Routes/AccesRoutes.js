const express = require('express');
const router = express.Router();
const accesSocieteController = require('../Controllers/AccesSocieteController');

// Routes pour les accès sociétés
router.post('/api/acces', accesSocieteController.createAccesSociete);
router.get('/api/acces', accesSocieteController.getAllAccesSociete);
router.get('/api/acces/:id', accesSocieteController.getAccesSocieteById);  // Ajout du ":" pour paramètre d'ID
router.put('/api/acces/:id', accesSocieteController.updateAccesSociete);     // Ajout du ":" pour paramètre d'ID
router.delete('/api/acces/:id', accesSocieteController.deleteAccesSociete);  // Ajout du ":" pour paramètre d'ID

module.exports = router;

