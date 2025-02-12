import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, TextField, Button } from '@mui/material'; // Material UI imports

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            toast.error('Tous les champs (nom, email et mot de passe) sont requis.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || 'Une erreur est survenue.');
                return;
            }

            if (result.success) {
                toast.success('Inscription réussie! Redirection vers la page de connexion.');
                navigate('/login');
            } else {
                toast.error(result.message || 'Une erreur est survenue.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            toast.error('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                backgroundImage: "url('/livreur.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                justifyContent: "center", // Center the content horizontally
                alignItems: "left", // Center the content vertically
                paddingLeft: "5%", 
                paddingRight: "5%", // Ensures the content doesn't go too far right
                flexDirection: "column", // Stack the logo and form vertically
            }}
        >
            {/* Logo Box */}
            <Box
                sx={{
                    width: "400px", // Matches form width
                    marginBottom: "20px", // Add space between logo and form
                }}
            >
                <img
                    src="/logo.svg" // Replace with your logo's path
                    alt="Logo"
                    width="100%" // Make logo match form width
                    style={{ objectFit: "contain" }} // Prevent logo distortion
                />
            </Box>

            {/* Form Box */}
            <Box
                p={4}
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                <Typography variant="h4" sx={{ color: "#d7141a", fontWeight: "bold", textAlign: "center", mb: 3 }}>
                    Signup
                </Typography>
                <form onSubmit={handleSignup}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            autoFocus
                            value={signupInfo.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={signupInfo.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            name="password"
                            type="password"
                            value={signupInfo.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#d7141a",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "10px",
                                padding: "12px",
                                "&:hover": { backgroundColor: "#b30000" },
                            }}
                        >
                            Signup
                        </Button>
                        <Typography variant="body2" textAlign="center">
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: "#d7141a" }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </form>
                <ToastContainer />
            </Box>
        </Box>
    );
}

export default Signup;
