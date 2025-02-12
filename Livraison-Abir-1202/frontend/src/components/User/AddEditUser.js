import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function AddEditUser({ open, onClose, fetchUsers, user }) {
  const [formData, setFormData] = useState({
    name: "",
    raisonSociale: "",
    telephone: "",
    email: "",
    role: "",
    password: "",
    photo: null,
    prixliv:0,
    prixret:0,
  });

  const [photo, setPhoto] = useState(null); // Stocke la photo sélectionnée
  const [preview, setPreview] = useState(null); // Permet de prévisualiser la photo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        raisonSociale: user.raisonSociale || "",
        telephone: user.telephone || "",
        email: user.email || "",
        role: user.role || "",
        password: "",
        prixliv:user.prixliv,
        prixret:user.prixret,
        photo: null, // La photo sera mise à jour seulement si l'utilisateur en sélectionne une nouvelle
      });

      if (user.photo) {
        setPreview(`http://localhost:5000/uploads/${user.photo}`); // Modifier selon ton API
      }
    } else {
      setFormData({
        name: "",
        raisonSociale: "",
        telephone: "",
        email: "",
        role: "",
        password: "",
        photo: null,
        prixliv:0,
        prixret:0,
      });
      setPreview(null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setPhoto(file);
        setPreview(URL.createObjectURL(file)); // Prévisualisation de l'image
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Vérification des champs obligatoires
    if (!formData.name || !formData.raisonSociale || !formData.telephone || !formData.email || !formData.role || (!user && !formData.password)) {
      setError("Tous les champs obligatoires doivent être remplis.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      });

      if (photo) {
        formDataToSend.append("photo", photo);
      }

      let response;
      if (user && user._id) {
        response = await axios.put(`http://localhost:5000/api/users/${user._id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post("http://localhost:5000/api/users", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      console.log("Réponse du serveur :", response.data);
      fetchUsers();
      onClose();
      setPhoto(null);
      setPreview(null);
    } catch (error) {
      console.error("Détails de l'erreur Axios:", error);
      if (error.response) {
        setError(`Erreur: ${error.response.data.message || "Impossible d'enregistrer l'utilisateur."}`);
      } else if (error.request) {
        setError("Le serveur ne répond pas.");
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField fullWidth margin="dense" label="Nom" name="name" value={formData.name} onChange={handleChange} required />
        <TextField fullWidth margin="dense" label="Raison Sociale" name="raisonSociale" value={formData.raisonSociale} onChange={handleChange} required />
        <TextField fullWidth margin="dense" label="Téléphone" name="telephone" type="number" value={formData.telephone} onChange={handleChange} required />
        <TextField fullWidth margin="dense" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />

        <FormControl fullWidth margin="dense">
          <InputLabel>Rôle</InputLabel>
          <Select name="role" value={formData.role} onChange={handleChange} required>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">Utilisateur</MenuItem>
          </Select>
        </FormControl>

        {!user && (
          <TextField fullWidth margin="dense" label="Mot de passe" name="password" type="password" value={formData.password} onChange={handleChange} required />
        )}

        {/* Prévisualisation de l'image */}
        {preview && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <img src={preview} alt="Photo de profil" style={{ maxWidth: "100%", height: "100px", borderRadius: "5px" }} />
          </div>
        )}

        {/* Champ pour télécharger une image */}
        <input type="file" name="photo" onChange={handleChange} accept="image/*" style={{ marginTop: 10 }} />
        
        <TextField fullWidth margin="dense" label="Prix Livraison" name="prixliv" type="number" value={formData.prixliv} onChange={handleChange}  />
        <TextField fullWidth margin="dense" label="Prix retour" name="prixret" type="number" value={formData.prixret} onChange={handleChange}  />

      
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>Annuler</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : user ? "Modifier" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


