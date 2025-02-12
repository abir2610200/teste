import React, { useState } from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import { Inventory2Outlined } from "@mui/icons-material"; // Icône similaire

export default function Recherche({ onSearch }) {
  const [code, setCode] = useState("");

  const handleSearch = () => {
    onSearch({ code });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      p={4}
      sx={{
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ color: "#d7141a", fontSize: "2.5rem", fontWeight: "bold" }}>
        📦 Suivez votre colis
      </h2>

      <Box
        display="flex"
        alignItems="center"
        sx={{
          backgroundColor: "#fff",
          borderRadius: "30px",
          padding: "10px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
          width: "95%", // Largeur adaptative
          maxWidth: "1000px", // Plus grand pour une meilleure visibilité
        }}
      >
        <TextField
          placeholder="Entrez votre numéro de suivi"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Inventory2Outlined style={{ color: "red", fontSize: "2rem" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px 0 0 30px",
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: "gray" },
              "&.Mui-focused fieldset": { borderColor: "red" },
            },
            "& .MuiInputBase-input": {
              color: "black",
              fontSize: "1.2rem",
              padding: "15px",
            },
            backgroundColor: "#f8f8f8",
            borderRadius: "30px 0 0 30px",
            minHeight: "55px", // Agrandit la hauteur
            flex: 1,
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
            borderRadius: "0 30px 30px 0",
            padding: "15px 30px",
            minHeight: "55px", // Même hauteur que le champ de texte
            "&:hover": { backgroundColor: "#b30000" },
          }}
        >
          🔍 Rechercher
        </Button>
      </Box>

      <p style={{ fontSize: "1rem", color: "#444" }}>
        ✨ Séparez plusieurs numéros par un espace ou une virgule.
      </p>
    </Box>
  );
}







