import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { Box, Typography, TextField, Button } from '@mui/material'; 

function Login({ setIsAuthenticated }) {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError('Email and password are required');
        
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            if (result.token) {
                localStorage.setItem('token', result.token);
                setIsAuthenticated(true);
                navigate('/Dashboard');
            } else {
                handleError(result.error?.details[0]?.message || result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh", // Keep full viewport height
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
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={loginInfo.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            name="password"
                            type="password"
                            value={loginInfo.password}
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
                            Login
                        </Button>
                        <Typography variant="body2" textAlign="center">
                            Don't have an account?{" "}
                            <Link to="/signup" style={{ color: "#d7141a" }}>
                                Signup
                            </Link>
                        </Typography>
                    </Box>
                </form>
                <ToastContainer />
            </Box>
        </Box>
    );
}

export default Login;
