const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../Middlewares/AuthValidation');

// Enregistrer un utilisateur avec une photo en base64
const registerUser = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({
            $or: [{ email: req.body.email }, { telephone: req.body.telephone }]
        });
        if (userExists) return res.status(400).json({ message: 'Utilisateur déjà existant' });

        // Hachage du mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hachage avec 10 rounds de salage

        // Création de l'utilisateur avec photo en base64
        const newUser = new User({
            name: req.body.name,
            raisonSociale: req.body.raisonSociale,
            telephone: req.body.telephone,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo ? Buffer.from(req.body.photo, 'base64') : null // Photo en base64
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};

// Connexion d'un utilisateur avec email ou téléphone
const loginUser = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        // Rechercher l'utilisateur par email ou téléphone
        const user = await User.findOne({
            $or: [{ email: req.body.email }, { telephone: req.body.telephone }]
        });

        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        // Comparaison du mot de passe avec celui dans la base de données
        const validPassword = await user.comparePassword(req.body.password);
        if (!validPassword) return res.status(401).json({ message: 'Mot de passe incorrect' });

        // Générer un token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Connexion réussie', token,user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

module.exports = { registerUser, loginUser };

