// routes/CoursRoutes.js
const express = require('express');
const router = express.Router();
const coursController = require('../Controllers/CoursController');
const verifyToken = require('../Middlewares/Auth.js');
const Prof = require('../Models/Prof');


// CREATE a course
router.post('/api/cours', verifyToken, coursController.createCours);

// GET all courses
router.get('/api/cours', verifyToken, coursController.getAllCours);

// GET all matieres
router.get('/api/matieres', coursController.getAllMatieres);

// DELETE a course by id
router.delete('/api/cours/:id', verifyToken, coursController.deleteCours);

// GET all profs
router.get('/api/profs', coursController.getAllProfs);


  
module.exports = router;
