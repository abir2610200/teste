import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AccountPage = () => {
  const navigate = useNavigate();

  // Dummy initial user data
  const [user, setUser] = useState({
    name: "Rawaa",
    email: "rawaa@gmail.com",
    phone: "+1234567890",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSaveChanges = () => {
    // Save the changes to the API or local storage (for simplicity, it's just logged here)
    console.log("Saved user data:", user);
    navigate("/profile"); // Redirect back to profile page after saving
  };

  return (
    <Box
      p={6}  // Increased padding
      sx={{
        width: "100%",
        maxWidth: "1000px",  // Increased max width
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        margin: "0 auto", // Center the content
      }}
    >
      <Box display="flex" alignItems="center" mb={4}> {/* Increased margin-bottom */}
        <AccountCircleIcon sx={{ fontSize: 35, color: "#d7141a", mr: 2 }} />
        <Typography
          variant="h4"
          sx={{ color: "#d7141a", fontSize: "2.5rem", fontWeight: "bold" }}  // Increased font size
        >
          Account
        </Typography>
      </Box>
      {/* 🔹 Form */}
      <Box
        display="flex"
        flexDirection="column"
        gap={3}  // Increased gap
        sx={{
          backgroundColor: "#f8f8f8",
          padding: "30px",  // Increased padding
          borderRadius: "15px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Phone"
          variant="outlined"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
          fullWidth
          required
        />

        {/* 🔹 Save Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
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
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default AccountPage;
