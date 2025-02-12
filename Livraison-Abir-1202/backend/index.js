require('dotenv').config();
const express = require('express');
const connectToDatabase = require('../backend/Models/db');
const authRouter = require('./Routes/AuthRouter');
const journalRoutes = require('./Routes/journalRoutes');
const CompteComptable = require('./Routes/CompteComptableRoutes');
const societeRoutes = require('./Routes/SocieteRoutes');
const accesSocieteRoutes = require('./Routes/AccesRoutes');
const userRoutes = require('./Routes/UserRoutes');
const gouvernements = require('./Routes/gouvernoratRoutes.js');
const regions = require('./Routes/regionsRoutes');
const rues = require('./Routes/rueRoutes');
const livraisons = require('./Routes/livraisonRoutes');
const vehicules = require('./Routes/VehiculeRoutes');

const cors = require('cors');

const app = express();
// Autoriser toutes les origines
app.use(cors());

// Middleware
app.use(express.json());
app.use(cors());
// Connexion à MongoDB
connectToDatabase();

// Routes
app.use('/api/auth', authRouter);
app.use('/', journalRoutes);
app.use('/', CompteComptable);
app.use('/', societeRoutes);
app.use('/', accesSocieteRoutes);
app.use('/', userRoutes);
app.use('/gouvernorats', gouvernements);
app.use('/regions', regions);
app.use('/vehicule', vehicules);
app.use('/rues', rues);
app.use('/api/livraisons', livraisons);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
