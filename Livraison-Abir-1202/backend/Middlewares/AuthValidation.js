const Joi = require('joi');

// Validation pour l'enregistrement de l'utilisateur
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        raisonSociale: Joi.string().required(),
        telephone: Joi.number().required(),
        role: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        photo: Joi.string().optional() // La photo est optionnelle et envoyée sous forme de fichier (chemin ou base64)
    });
    return schema.validate(data);
};

// Validation pour la connexion (email ou téléphone)
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().optional(),  // Email peut être fourni, mais n'est pas obligatoire
        telephone: Joi.number().optional(),    // Téléphone peut être fourni, mais n'est pas obligatoire
        password: Joi.string().min(6).required(), // Le mot de passe est requis
    }).or('email', 'telephone'); // L'un ou l'autre doit être présent, mais pas les deux obligatoirement

    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
