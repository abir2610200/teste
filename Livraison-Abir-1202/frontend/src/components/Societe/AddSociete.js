import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";


export default function AddEditSociete({ open, onClose, fetchSocietes, societe }) {
  const [form, setForm] = useState({
    code: "",
    raisonSociale: "",
    adresse: "",
    MF: "",
    type: "",
    logo: null,
  });
  const [logo, setLogo] = useState(null); // Stocke le fichier logo
  const [preview, setPreview] = useState(null); // Prévisualisation du logo

  // Mettre à jour le formulaire si `societe` change (mode édition)
  useEffect(() => {
    if (societe) {
      setForm({
        code: societe.code || "",
        raisonSociale: societe.raisonSociale || "",
        adresse: societe.adresse || "",
        MF: societe.MF || "",
        type: societe.type || "",
        logo: societe.logo || null,
      });
      if (societe.logo) {
        setPreview(`http://localhost:5000/uploads/${societe.logo}`); // Modifier selon ton API
      }
    } else {
      setForm({
        code: "",
        raisonSociale: "",
        adresse: "",
        MF: "",
        type: "",
        logo: null,
      });
      setPreview(null);
    }
  }, [societe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Gestion de l'upload du logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file)); // Prévisualisation de l'image
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("code", form.code);
    formData.append("raisonSociale", form.raisonSociale);
    formData.append("adresse", form.adresse);
    formData.append("MF", form.MF);
    formData.append("type", form.type);
    if (logo) {
      formData.append("logo", logo);
    }

    try {
      if (societe) {
        await axios.put(`http://localhost:5000/api/societes/${societe._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5000/api/societes", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchSocietes();
      onClose();
      setLogo(null);
      setPreview(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error.response?.data || error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{societe ? "Modifier Société" : "Ajouter Société"}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Code Société" name="code" fullWidth value={form.code} onChange={handleChange} />
        <TextField margin="dense" label="Raison Sociale" name="raisonSociale" fullWidth value={form.raisonSociale} onChange={handleChange} />
        <TextField margin="dense" label="Adresse" name="adresse" fullWidth value={form.adresse} onChange={handleChange} />
        <TextField margin="dense" label="Matricule Fiscal (MF)" name="MF" fullWidth value={form.MF} onChange={handleChange} />
        <TextField
          margin="dense"
          select
          label="Type de Société"
          name="type"
          fullWidth
          value={form.type}
          onChange={handleChange}
        >
          <MenuItem value="Personne physique">Personne physique</MenuItem>
          <MenuItem value="Personne morale">Personne morale</MenuItem>
        </TextField>

        {/* Affichage du logo si existant */}
        {preview && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <img src={preview} alt="Logo" style={{ maxWidth: "100%", height: "100px", borderRadius: "5px" }} />
          </div>
        )}
         <input type="file" accept="image/*" onChange={handleLogoChange} style={{ marginTop: 16, Padding:4 }} />

        {/* Champ pour télécharger un logo */}
              </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
