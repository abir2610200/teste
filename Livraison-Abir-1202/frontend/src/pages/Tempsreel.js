import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { LocalShipping, CheckCircle, Replay } from "@mui/icons-material";


export default function TempsReel() {
  // État pour les différentes catégories de colis
  const [colisEnCours, setColisEnCours] = useState(0);
  const [colisLivres, setColisLivres] = useState(0);
  const [colisRetour, setColisRetour] = useState(0);

  // Calcul du total des colis
  const totalColis = colisEnCours + colisLivres + colisRetour;

  // Fonction pour formater la date actuelle au format YYYY-MM-DD
  const currentDate = new Date().toISOString().split('T')[0]; // Format: 2025-02-06

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 4,
        height: "100vh", // La hauteur de la fenêtre
        overflowY: "auto", // Ascenseur vertical
      }}
    >
      {/* Titre avec la date actuelle */}
      <Box
        sx={{
          backgroundColor: "#F9F9F9",
          padding: "10px 15px",
          borderRadius: "8px",
          mb: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#333">
          Tableau de bord Temps réel - {currentDate}
        </Typography>
      </Box>

      {/* Case pour les colis en cours */}
      <Card
        sx={{
          backgroundColor: "#4caf50", // Vert
          color: "white",
          padding: 2,
          flex: 1,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Colis en cours
          </Typography>
          <Typography variant="h4">{colisEnCours}</Typography>
        </CardContent>
        <LocalShipping fontSize="large" />
      </Card>

      {/* Case pour les colis livrés */}
      <Card
        sx={{
          backgroundColor: "#2196f3", // Bleu
          color: "white",
          padding: 2,
          flex: 1,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Colis livrés
          </Typography>
          <Typography variant="h4">{colisLivres}</Typography>
        </CardContent>
        <CheckCircle fontSize="large" />
      </Card>

      {/* Case pour les colis retour */}
      <Card
        sx={{
          backgroundColor: "#ffeb3b", // Jaune
          color: "black",
          padding: 2,
          flex: 1,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            Colis retour
          </Typography>
          <Typography variant="h4">{colisRetour}</Typography>
        </CardContent>
        <Replay fontSize="large" />
      </Card>

      {/* Total des colis */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: 2,
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Total des colis : {totalColis}
        </Typography>
      </Box>
    </Box>
  );
}
