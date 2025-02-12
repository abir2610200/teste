
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

import Select from '@mui/material/Select';
import axios from "axios";

export default function AddEditJournal({ open, onClose, fetchComptes, journal }) {
  const [form, setForm] = useState(journal || { rue: "" });
  const [rues, setRues] = useState([]);
  const [personName, setPersonName] = useState([]);

  useEffect(() => {
    const fetchRues = async () => {
      try {
        const response = await axios.get("http://localhost:5000/livraisons/api/enattente");
        console.log(response.data);
        const usersWithId = response.data.map((rue) => ({
          ...rue,
          id: rue._id,
        }));
        setRues(usersWithId);
      } catch (error) {
        console.error("Error fetching Rue:", error);
      }
    };

    fetchRues();
  }, []);
  const handleChange = (e) => {
    const {
        target: { value },
      } = e;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
  };

  const handleSubmit = async () => {
    try {
        console.log(form);
        /*
      if (journal) {
        await axios.put(`http://localhost:5000/vehicule/${journal._id}`, form);

      } else {
        await axios.post("http://localhost:5000/vehicule", form);
      }*/
      fetchComptes();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{journal ? "Entre En depot Par Liste" : "Entre En depot Par Liste"}</DialogTitle>
      <DialogContent>
        
      <Select
                    multiple
                    id="Rue"
                    name="rue"
                    margin="dense" label="Colis"
                    value={personName}
                    fullWidth
                    onChange={handleChange}

                  >
                   
                    {rues.map((rue) => (
                      <MenuItem key={rue.id} value={rue.id}>
                        {rue.code}
                      </MenuItem>
                    ))}
                  </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSubmit} variant="contained">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}