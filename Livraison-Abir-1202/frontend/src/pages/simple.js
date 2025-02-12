import React, { useState } from "react";
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, Select, MenuItem, Box, Typography, Grid, TextareaAutosize } from "@mui/material";

const SimpleCommande = () => {
  const [formData, setFormData] = useState({
    nomComplet: "",
    gouvernorat: "",
    adresse: "",
    telephone: "",
    telephone2: "",
    designation: "",
    nombreArticle: 1,
    prix: "",
    fragile: "Non",
    cheque: "Non",
    echange: "Non",
    commentaire: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Box sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", marginTop: "80px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", color:"#d7141a" }}>
        Nouveau Pickup
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
        <Grid container spacing={2}>
          {/* Nom Complet */}
          <Grid item xs={12}>
            <TextField fullWidth label="Nom complet" name="nomComplet" value={formData.nomComplet} onChange={handleChange} />
          </Grid>

          {/* Gouvernorat */}
          <Grid item xs={12}>
            <FormLabel>Gouvernorat</FormLabel>
            <Select fullWidth name="gouvernorat" value={formData.gouvernorat} onChange={handleChange}>
              {["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili", "La Manouba", "Le Kef", "Mahdia", "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"].map((gov) => (
                <MenuItem key={gov} value={gov}>
                  {gov}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Adresse */}
          <Grid item xs={12}>
            <TextField fullWidth label="Adresse complète" name="adresse" value={formData.adresse} onChange={handleChange} />
          </Grid>

          {/* Téléphone & Téléphone 2 */}
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Téléphone 2" name="telephone2" value={formData.telephone2} onChange={handleChange} />
          </Grid>

          {/* Désignation */}
          <Grid item xs={12}>
            <TextField fullWidth label="Désignation" name="designation" value={formData.designation} onChange={handleChange} />
          </Grid>

          {/* Nombre d'article & Prix */}
          <Grid item xs={12} md={6}>
            <TextField fullWidth type="number" label="Nombre d'article" name="nombreArticle" value={formData.nombreArticle} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Prix" name="prix" value={formData.prix} onChange={handleChange} />
          </Grid>

          {/* Radio Buttons */}
          <Grid item xs={12} md={4}>
            <FormLabel>Fragile</FormLabel>
            <RadioGroup row name="fragile" value={formData.fragile} onChange={handleChange}>
              <FormControlLabel value="Non" control={<Radio />} label="Non" />
              <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormLabel>Accepter les chèques</FormLabel>
            <RadioGroup row name="cheque" value={formData.cheque} onChange={handleChange}>
              <FormControlLabel value="Non" control={<Radio />} label="Non" />
              <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormLabel>Échange</FormLabel>
            <RadioGroup row name="echange" value={formData.echange} onChange={handleChange}>
              <FormControlLabel value="Non" control={<Radio />} label="Non" />
              <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
            </RadioGroup>
          </Grid>

          {/* Commentaire */}
          <Grid item xs={12}>
            <FormLabel>Commentaire</FormLabel>
            <TextareaAutosize
              minRows={3}
              name="commentaire"
              value={formData.commentaire}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ccc" }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="error" fullWidth sx={{ padding: "10px", fontSize: "16px" }}>
              + Ajouter
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SimpleCommande;

