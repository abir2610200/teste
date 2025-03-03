require('dotenv').config();
const express = require('express');
const connectToDatabase = require('../backend/Models/db');
const authRouter = require('./Routes/AuthRouter');
const adminRouter = require('./Routes/AdminRouter');
const coursRoutes = require('./Routes/CoursRoutes');
const classRouter = require('./Routes/ClassRouter');
const eleveRouter = require('./Routes/EleveRouter');
const planningRoutes = require('./Routes/PlanningRoutes');

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
app.use('/', coursRoutes);
app.use('/', eleveRouter);
app.use('/', classRouter);
app.use('/admin', adminRouter);
app.use('/api/eleves', eleveRouter);
app.use('/api/planning', planningRoutes);
 // ✅ Route prefix

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
