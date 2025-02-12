import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Dummy user data
  const user = {
    name: "Rawaa",
    email: "rawaa@gmail.com",
    phone: "+1234567890",
  };

  return (
    <Box
      p={6}  // Increased padding
      sx={{
        width: "100%",
        maxWidth: "1000px",  // Increased max width
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "0 auto", // Center the content
      }}
    >
      {/* 🛑 Title with Profile Icon */}
      <Box display="flex" alignItems="center" mb={4}> {/* Increased margin-bottom */}
        <AccountCircleIcon sx={{ fontSize: 35, color: "#d7141a", mr: 2 }} />
        <Typography
          variant="h4"
          sx={{ color: "#d7141a", fontSize: "2.5rem", fontWeight: "bold" }}  // Increased font size
        >
          Profile
        </Typography>
      </Box>

      {/* 📝 User Information */}
      <Box
        display="flex"
        flexDirection="column"
        gap={3}  // Increased gap
        sx={{
          backgroundColor: "#f8f8f8",
          padding: "30px",  // Increased padding
          borderRadius: "15px",
          marginTop: "20px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Name:</Typography>
          <Typography variant="body1">{user.name}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Email:</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Phone:</Typography>
          <Typography variant="body1">{user.phone}</Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/account")}
          sx={{
            backgroundColor: "#d7141a",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.1rem",  // Increased font size
            borderRadius: "10px",
            padding: "12px 24px",
            "&:hover": { backgroundColor: "#b30000" },
          }}
        >
          Edit Account
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
