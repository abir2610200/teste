import React, { useState } from "react";
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography } from "@mui/material";

export default function Multiple() {
  const [pickups, setPickups] = useState([
    {
      barcode: "112233",
      name: "",
      governorate: "",
      city: "",
      address: "",
      phone1: "",
      phone2: "",
      comment: "",
      designation: "",
      quantity: "1",
      price: "",
    },
  ]);

  const handleAddPickup = () => {
    setPickups([
      ...pickups,
      {
        barcode: "",
        name: "",
        governorate: "",
        city: "",
        address: "",
        phone1: "",
        phone2: "",
        comment: "",
        designation: "",
        quantity: "1",
        price: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedPickups = pickups.map((pickup, i) =>
      i === index ? { ...pickup, [field]: value } : pickup
    );
    setPickups(updatedPickups);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box component="main" sx={{ width: "90%", p: 3 }}>
        {/* Titre centré en rouge */}
        <Typography variant="h4" sx={{ textAlign: "center", color: "#d7141a", fontWeight: "bold", mb: 2 }}>
          Nouveau Pickup
        </Typography>

        {pickups.map((pickup, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 2,
              border: "1px solid #ccc",
              p: 2,
              borderRadius: 2,
              backgroundColor: "white",
            }}
          >
            <TextField
              label="Code à barre"
              value={pickup.barcode}
              onChange={(e) => handleChange(index, "barcode", e.target.value)}
              disabled={index === 0}
              sx={{ width: "32%" }}
            />
            <TextField
              label="Nom complet"
              value={pickup.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              sx={{ width: "32%" }}
            />
            <FormControl sx={{ width: "32%" }}>
              <InputLabel>Gouvernorat</InputLabel>
              <Select
                value={pickup.governorate}
                onChange={(e) => handleChange(index, "governorate", e.target.value)}
              >
                <MenuItem value="">Sélectionner</MenuItem>
                <MenuItem value="Tunis">Tunis</MenuItem>
                <MenuItem value="Ariana">Ariana</MenuItem>
                <MenuItem value="Sfax">Sfax</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Ville" value={pickup.city} onChange={(e) => handleChange(index, "city", e.target.value)} sx={{ width: "32%" }} />
            <TextField label="Adresse complète" value={pickup.address} onChange={(e) => handleChange(index, "address", e.target.value)} sx={{ width: "32%" }} />
            <TextField label="Téléphone" value={pickup.phone1} onChange={(e) => handleChange(index, "phone1", e.target.value)} sx={{ width: "32%" }} />
            
            <TextField label="Téléphone 2" value={pickup.phone2} onChange={(e) => handleChange(index, "phone2", e.target.value)} sx={{ width: "32%" }} />
            <TextField label="Commentaire" value={pickup.comment} onChange={(e) => handleChange(index, "comment", e.target.value)} sx={{ width: "32%" }} />
            <TextField label="Désignation" value={pickup.designation} onChange={(e) => handleChange(index, "designation", e.target.value)} sx={{ width: "32%" }} />
            
            <TextField label="Nombre d'article" value={pickup.quantity} onChange={(e) => handleChange(index, "quantity", e.target.value)} sx={{ width: "32%" }} />
            <TextField label="Prix" placeholder="Prix en DT Exemple" value={pickup.price} onChange={(e) => handleChange(index, "price", e.target.value)} sx={{ width: "32%" }} />
          </Box>
        ))}

        {/* Boutons en rouge */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: "red", color: "white", fontWeight: "bold" }} onClick={handleAddPickup}>
            + Nouveau Pickup
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "red", color: "white", fontWeight: "bold" }}>
            Ajouter
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
