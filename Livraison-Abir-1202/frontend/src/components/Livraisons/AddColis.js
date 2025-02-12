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
} from "@mui/material";
import axios from "axios";

export default function AddEditColis({ livraison }) {
  const navigate = useNavigate();
  const [rues, setRues] = useState([
    "Rue Habib Bourguiba",
    "Rue de la République",
    "Rue Taïeb M’hiri",
    "Rue Mongi Slim",
    "Rue Majida Boulila",
    "Rue Ali Belhouane",
    "Rue Hédi Chaker",
    "Rue de la Kasbah",
    "Rue El Ain",
    "Rue El Bahri",
    "Rue El Habib",
    "Rue El Ain",
    "Rue El Matar",
    "Route de Gremda",
    "Route de Teniour",
    "Route Lafrane",
    "Avenue de l'Algérie",
    "Avenue 5 Août",
    "Rue Sokra",
    "Rue Mharza",
    "Rue Ennasria",
    "Rue Tina",
    "Rue Saltnia",
    "Rue Habib Maazoun"
  ]);
  const [expediteur, setexpediteur] = useState([]);
  const [gouvernorat, setGouvernorat] = useState([{
    id: "sfax",
    name: "Sfax"
  }]);  // Set default gouvernorat to "Sfax"

  const [form, setForm] = useState({
    expediteur: "",
    description: "",
    dateliv: new Date(),
    numtel1: "",
    numtel2: "",
    gouvernorat: "sfax",  // Default value set to "Sfax"
    rue: "",
    km: "",
    prixliv: "0",
    qte: "1",
    montant: "0",
    client: "",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (livraison) {
      setForm({
        expediteur: livraison.code_expediteur,
        description: livraison.description,
        dateliv: new Date(),
        numtel1: livraison.numtel1,
        numtel2: livraison.numtel2,
        gouvernorat: livraison.code_gouvernorat,
        rue: livraison.code_rue,
        km: livraison.km,
        prixliv: livraison.prixliv,
        qte: livraison.qte,
        montant: livraison.montant,
        client: livraison.nom_client,
      });
    } else {
      setForm({
        expediteur: "",
        description: "",
        dateliv: new Date(),
        numtel1: "",
        numtel2: "",
        gouvernorat: "sfax",  // Default to Sfax
        rue: "",
        km: "",
        prixliv: "0",
        qte: "1",
        montant: "0",
        client: "",
      });
      setPreview(null);
    }
  }, [livraison]);

  useEffect(() => {
    const fetchexpiditeur = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        const usersWithId = response.data.map((user) => ({
          ...user,
          id: user._id,
        }));
        setexpediteur(usersWithId);
      } catch (error) {
        console.error("Error fetching Expediteur:", error);
      }
    };
    fetchexpiditeur();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("code_expediteur", form.expediteur);
    formData.append("nom_client", form.client);
    formData.append("description", form.description);
    formData.append("numtel1", form.numtel1);
    formData.append("numtel2", form.numtel2);
    formData.append("code_gouvernorat", form.gouvernorat);
    formData.append("code_rue", form.rue);
    formData.append("km", form.km);
    formData.append("prixliv", form.prixliv);
    formData.append("qte", form.qte);
    formData.append("montant", form.montant);
    formData.append("dateliv", form.dateliv);

    try {
      if (livraison) {
        await axios.put(`http://localhost:5000/livraison/${livraison._id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5000/livraisons", form);
      }
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error.response?.data || error);
    }
  };

  return (
    <Dialog open={true} onClose={() => navigate('/')}>
      <DialogTitle>{livraison ? "Modifier Colis" : "Ajouter Colis"}</DialogTitle>
      <DialogContent>
        <TextField
          select
          id="expediteur"
          name="expediteur"
          margin="dense"
          label="Expéditeur"
          value={form.expediteur}
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="">Choisir un Expéditeur</MenuItem>
          {expediteur.map((expiditeur) => (
            <MenuItem key={expiditeur.id} value={expiditeur.id}>
              {expiditeur.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Client"
          name="client"
          fullWidth
          value={form.client}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description Article"
          name="description"
          fullWidth
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          select
          id="gouvernorat"
          name="gouvernorat"
          label="Gouvernorat"
          margin="dense"
          value={form.gouvernorat}
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="">Choisir une Gouvernorat</MenuItem>
          {gouvernorat.map((gouvernorat) => (
            <MenuItem key={gouvernorat.id} value={gouvernorat.id}>
              {gouvernorat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          id="Rue"
          name="rue"
          margin="dense"
          label="Rue"
          value={form.rue}
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="">Choisir une Rue</MenuItem>
          {rues.map((rue, index) => (
            <MenuItem key={index} value={rue}>
              {rue}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          select
          label="KM"
          name="km"
          fullWidth
          value={form.km}
          onChange={handleChange}
        >
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="11">11</MenuItem>
          <MenuItem value="12">12</MenuItem>
          <MenuItem value="13">13</MenuItem>
          <MenuItem value="14">14</MenuItem>
          <MenuItem value="15">15</MenuItem>
          <MenuItem value="16">16</MenuItem>
          <MenuItem value="17">17</MenuItem>
          <MenuItem value="18">18</MenuItem>
          <MenuItem value="19">19</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          label="Numéro Téléphone 1"
          name="numtel1"
          fullWidth
          value={form.numtel1}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Numéro Téléphone 2"
          name="numtel2"
          fullWidth
          value={form.numtel2}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Prix de Livraison"
          name="prixliv"
          fullWidth
          value={form.prixliv}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Quantité"
          name="qte"
          fullWidth
          value={form.qte}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Montant Expéditeur"
          name="montant"
          fullWidth
          value={form.montant}
          onChange={handleChange}
        />
         <TextField
  margin="dense"
  name="dateliv"
  fullWidth
  type="date"
  value={new Date().toISOString().split("T")[0]} // Show today's date
  onChange={handleChange}
  disabled // Disable the field to prevent editing
/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate('/')} color="primary">Annuler</Button>
        <Button onClick={handleSubmit} color="primary">Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}

