import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
} from "@mui/material";
import axios from "axios";

// Fonction pour formater la date actuelle au format YYYY-MM-DD
const currentDate = new Date().toISOString().split('T')[0]; 

export default function AddEditColis({ livraison }) {
  const navigate = useNavigate();

  const [rues, setRues] = useState([ { id: "1", code: "Colis A" },
    { id: "2", code: "Colis B" },
    { id: "3", code: "Colis C" }]);
  const [expediteurs, setExpediteurs] = useState([]);
  const [vehicules, setVehicules] = useState([]);

  const [form, setForm] = useState({
    expediteur: "",
    dateliv: currentDate,
    vehicule: "",
    rue: [],  
  });

  useEffect(() => {
    if (livraison) {
      setForm({
        expediteur: livraison.code_expediteur || "",
        dateliv: currentDate,
        vehicule: livraison.code_gouvernorat || "",
        rue: livraison.code_rue || [],
      });
    }
  }, [livraison]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ruesRes, expRes, vehRes] = await Promise.all([
          axios.get("http://localhost:5000/Livraison/api/endepot"),
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/vehicule/get"),
        ]);

        setRues(ruesRes.data.map((rue) => ({ id: rue._id, code: rue.code })));
        setExpediteurs(expRes.data.map((user) => ({ id: user._id, name: user.name })));
        setVehicules(vehRes.data.map((veh) => ({ id: veh._id, name: veh.name })));
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (livraison) {
        await axios.put(`http://localhost:5000/livraison/${livraison._id}`, form);
      } else {
        await axios.post("http://localhost:5000/livraisons", form);
      }
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error.response?.data || error);
    }
  };

  return (
    <Dialog open={true} onClose={() => {}}>
      <DialogTitle>{livraison ? "Modifier Data Sheet" : "Ajouter Data Sheet"}</DialogTitle>
      <DialogContent>
        <TextField   
          select
          id="expediteur"
          name="expediteur"
          margin="dense" 
          label="Livreur"
          value={form.expediteur}
          fullWidth
          onChange={handleChange}
        >
          <MenuItem disabled value="">Choisir un Livreur</MenuItem>
          {expediteurs.map((exp) => (
            <MenuItem key={exp.id} value={exp.id}>{exp.name}</MenuItem>
          ))}
        </TextField>

        <TextField   
          select
          id="vehicule"
          name="vehicule"
          label="Véhicule"
          margin="dense"
          value={form.vehicule}
          fullWidth
          onChange={handleChange}
        >
          <MenuItem disabled value="">Choisir un Véhicule</MenuItem>
          {vehicules.map((veh) => (
            <MenuItem key={veh.id} value={veh.id}>{veh.name}</MenuItem>
          ))}
        </TextField>

        <Autocomplete
          multiple
          id="Rue"
          options={rues}
          getOptionLabel={(option) => option.code || "Inconnu"}
          value={rues.filter((rue) => form.rue.includes(rue.id))}
          onChange={(event, newValue) => {
            setForm({
              ...form,
              rue: newValue.map((rue) => rue.id),
            });
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={option.id} label={option.code} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Colis" margin="dense" fullWidth variant="outlined" />
          )}
        />

        <TextField 
          margin="dense"  
          name="dateliv" 
          fullWidth 
          type="date" 
          value={form.dateliv} 
          onChange={(e) => setForm({ ...form, dateliv: e.target.value })}
          disabled 
        />
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between", padding: "16px" }}>
        <Button 
          onClick={() => navigate('/')} 
          variant="contained" 
          color="error" 
          sx={{ padding: "12px 24px", fontSize: "16px", fontWeight: "bold", borderRadius: "8px", minWidth: "120px" }}
        >
          Annuler
        </Button>

        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" }, padding: "12px 24px", fontSize: "16px", fontWeight: "bold", borderRadius: "8px", minWidth: "100px" }}
        >
          + Ajouter & Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
