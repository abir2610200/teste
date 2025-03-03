import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import "./App.css";

// Public Layout components (theme pages)
import Header from "./components/Welcome page/common/header/Header";
import Footer from "./components/Welcome page/common/footer/Footer";
import HomePage from "./components/Welcome page/home/HomePage"; // Public theme home page
import About from "./components/Welcome page/about/About";
import CourseHome from "./components/Welcome page/allcourses/CourseHome";
import Team from "./components/Welcome page/team/Team";
import Pricing from "./components/Welcome page/pricing/Pricing";
import Blog from "./components/Welcome page/blog/Blog";
import Contact from "./components/Welcome page/contact/Contact";

// Auth pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Protected pages (for authenticated users)
import Home from './pages/Home'; // Authenticated home page
import Settings from './pages/Settings';
import EventPlaning from './components/Planing/EventPlaning';
import EventCalendar from './components/Calandrie/EventCalendar';
import CreateEleve from './components/Eleve/CreateEleve';

// Protected layout components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

/*  
  PublicLayout wraps pages that any visitor can see.
  It displays the Header and Footer.
*/
function PublicLayout() {
  return (
    <>
      <Header />
      <div className="public-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

/*  
  ProtectedLayout wraps pages that require authentication.
  It displays the Sidebar and Navbar.
*/
function ProtectedLayout({ handleLogout }) {
  return (
    <div className="protected-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar handleLogout={handleLogout} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/*
  PrivateRoute is a helper that checks authentication.
  If the user is authenticated, it renders the desired element;
  otherwise, it redirects to /login.
*/
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // On mount, check if there is a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Logout handler: clear token and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <Routes>
      {/* Public Routes (theme pages) and authentication pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CourseHome />} />
        <Route path="/team" element={<Team />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/journal" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Routes (for authenticated users) */}
      <Route element={<ProtectedLayout handleLogout={handleLogout} />}>
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <EventCalendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/planning"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <EventPlaning />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-eleve"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CreateEleve />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Fallback: Redirect any unknown URL to the public home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
