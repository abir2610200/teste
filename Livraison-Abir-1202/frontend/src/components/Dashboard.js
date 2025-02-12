import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SyncIcon from "@mui/icons-material/Sync";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

// Dashboard Cards Data
const cardData = [
  { title: "En attente", value: 0, amount: "0,000", color: "#FFC107", icon: <SyncIcon fontSize="medium" /> },
  { title: "Au dépôt", value: 0, amount: "0,000", color: "#03A9F4", icon: <HomeIcon fontSize="medium" /> },
  { title: "Retour dépôt", value: 0, amount: "0,000", color: "#03A9F4", icon: <HomeIcon fontSize="medium" /> },
  { title: "En cours de livraison", value: 0, amount: "0,000", color: "#03A9F4", icon: <LocalShippingIcon fontSize="medium" /> },
  { title: "Livrés", value: 0, amount: "0,000", color: "#4CAF50", icon: <MonetizationOnIcon fontSize="medium" /> },
  { title: "Livrés payés", value: 0, amount: "N.C", color: "#4CAF50", icon: <PeopleIcon fontSize="medium" /> },
  { title: "Livrés Rendez-vous", value: 0, amount: "0,000", color: "#03A9F4", icon: <SyncIcon fontSize="medium" /> },
  { title: "Retour définitif", value: 0, amount: "0,000", color: "#F44336", icon: <ArrowBackIcon fontSize="medium" /> },
  { title: "Inter-Agence", value: 0, amount: "0,000", color: "#F44336", icon: <AssignmentReturnIcon fontSize="medium" /> },
  { title: "Retour Expéditeur", value: 0, amount: "0,000", color: "#F44336", icon: <PeopleIcon fontSize="medium" /> },
  { title: "Retour payé", value: 0, amount: "0,000", color: "#F44336", icon: <ArrowBackIcon fontSize="medium" /> },
  { title: "Non reçus", value: 0, amount: "0,000", color: "#000", icon: <ErrorOutlineIcon fontSize="medium" /> },
];

const Dashboard = () => {
  // Get the logged-in user's name from localStorage
  const username = localStorage.getItem("name") || "Utilisateur";

  return (
    <Box sx={{ p: 2, mt: 2 }}>
      {/* Welcome Message */}
      <Box sx={{
        backgroundColor: "#F9F9F9",
        padding: "10px 15px",
        borderRadius: "8px",
        mb: 2,
        textAlign: "center"
      }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Bienvenue, {username} ! 👋
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.85rem", mt: 0.5 }}>
          Ravi de vous revoir. Consultez vos statistiques et suivez vos commandes ici.
        </Typography>
      </Box>

      {/* Status Cards */}
      <Grid container spacing={1.5}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card 
              sx={{ 
                backgroundColor: card.color, 
                color: "#fff", 
                textAlign: "center", 
                py: 1.5, 
                borderRadius: "8px", 
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)", 
                minHeight: "100px", 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <CardContent sx={{ p: 1 }}>
                {card.icon}
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 0.5 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                  {card.amount}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold", mt: 0.5 }}>
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
