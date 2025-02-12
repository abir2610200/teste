import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function AddEditJournal({ open, onClose, fetchComptes, journal }) {
  const [form, setForm] = useState(journal || { name: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (journal) {
        await axios.put(`http://localhost:5000/vehicule/${journal._id}`, form);

      } else {
        await axios.post("http://localhost:5000/vehicule", form);
      }
      fetchComptes();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{journal ? "Modifier Vehicule" : "Ajouter Vehicule"}</DialogTitle>
      <DialogContent>
        
        <TextField
          margin="dense"
          label="Libelle Vehicule "
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
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