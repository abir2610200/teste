import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Pages et composants
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import AddColis from './components/Livraisons/AddColis';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidenav';
import Recherche from './pages/Recherche';
import Reclamation from './pages/Reclamation';
import Tempsreel from './pages/Tempsreel'; 
import Profile from './pages/Profile';
import Account from './pages/Account';
import Simple from './pages/simple'; 
import Multiple from './pages/multiple';
import UserList from './components/User/UsersList';
import Manifeste from './pages/manifeste';
import Adddatasheet from "./pages/Adddatasheet";
import ListeColisEnattente from "./components/Livraisons/ListeColisEnattente"; // Correction du nom
import ListeColisEndepot from "./components/Livraisons/ListeColisEndepot";
import ListeColisLivre from "./components/Livraisons/ListeColisLivre";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" replace />;
    };

    const noHeaderRoutes = ["/login", "/signup"];

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {!noHeaderRoutes.includes(location.pathname) && (
                <>
                    <Navbar handleLogout={handleLogout} />
                    <Sidebar open={open} setOpen={setOpen} />
                </>
            )}

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Routes>
                    <Route 
                        path="/" 
                        element={isAuthenticated ? <Navigate to="/Dashboard" replace /> : <Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/Dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/Recherche" element={<PrivateRoute element={<Recherche />} />} />
                    <Route path="/reclamation" element={<PrivateRoute element={<Reclamation />} />} />
                    <Route path="/Tempsreel" element={<PrivateRoute element={<Tempsreel />} />} />
                    <Route path="/commande-simple" element={<PrivateRoute element={<Simple />} />} />
                    <Route path="/multiple" element={<PrivateRoute element={<Multiple />} />} />
                    <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                    <Route path="/account" element={<PrivateRoute element={<Account />} />} />
                    <Route path="/AddColis" element={<PrivateRoute element={<AddColis compte={null} />} />} />
                    <Route path="/users" element={<PrivateRoute element={<UserList />} />} />
                    <Route path="/manifeste" element={<PrivateRoute element={<Manifeste />} />} />
                    <Route path="/Adddatasheet" element={<PrivateRoute element={<Adddatasheet />} />} />
                    <Route path="/en-attente" element={<PrivateRoute element={<ListeColisEnattente />} />} />
                    <Route path="/au-depot" element={<PrivateRoute element={<ListeColisEndepot />} />} /> {/* Correction ici */}
                    <Route path="/livrés" element={<PrivateRoute element={<ListeColisLivre />} />} /> 
                </Routes>
            </Box>
        </Box>
    );
}

export default App;
