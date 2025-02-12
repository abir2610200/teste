import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Add, ErrorOutline } from "@mui/icons-material"; // Icônes Material-UI

export default function Reclamation() {
  const [bordereau, setBordereau] = useState("");
  const [montant, setMontant] = useState("");
  const [probleme, setProbleme] = useState("");
  const [reclamations, setReclamations] = useState([]);

  const handleAdd = () => {
    if (bordereau && montant && probleme) {
      setReclamations([...reclamations, { bordereau, montant, probleme }]);
      setBordereau("");
      setMontant("");
      setProbleme("");
    }
  };

  return (
    <Box p={4} sx={{ width: "100%", backgroundColor: "#fff" }}>
      {/* 🛑 Titre */}
      <h2 style={{ color: "#d7141a", fontSize: "2rem", fontWeight: "bold" }}>
        ⚠️ Nouvelle Réclamation
      </h2>

      {/* 🔹 Formulaire d'ajout */}
      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        sx={{
          backgroundColor: "#f8f8f8",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          label="📦 Numéro de Bordereau"
          variant="outlined"
          value={bordereau}
          onChange={(e) => setBordereau(e.target.value)}
          fullWidth
          required
          sx={{ flex: 1 }}
        />
        <TextField
          label="💰 Montant du colis"
          variant="outlined"
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          fullWidth
          required
          sx={{ flex: 1 }}
        />
        <TextField
          label="❌ Type de Problème"
          variant="outlined"
          select
          value={probleme}
          onChange={(e) => setProbleme(e.target.value)}
          fullWidth
          required
          sx={{ flex: 1 }}
        >
          <MenuItem value="Perdu">📭 Perdu</MenuItem>
          <MenuItem value="Endommagé">📦 Endommagé</MenuItem>
          <MenuItem value="Retard">⏳ Retard</MenuItem>
        </TextField>

        {/* 🔴 Bouton Ajouter */}
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "10px",
            padding: "12px 24px",
            marginTop: "10px",
            "&:hover": { backgroundColor: "#b30000" },
          }}
        >
          <Add /> Ajouter
        </Button>
      </Box>

      {/* 📊 Tableau des réclamations */}
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7141a" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                📦 Bordereaux
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                💰 Montant
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ❌ Problème
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                🔄 Statut
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                📅 Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                📝 Décision
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reclamations.map((rec, index) => (
              <TableRow key={index}>
                <TableCell>{rec.bordereau}</TableCell>
                <TableCell>{rec.montant} DT</TableCell>
                <TableCell>
                  <ErrorOutline color="error" /> {rec.probleme}
                </TableCell>
                <TableCell>🔄 En cours</TableCell>
                <TableCell>📅 {new Date().toLocaleDateString()}</TableCell>
                <TableCell>📝 En attente</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
