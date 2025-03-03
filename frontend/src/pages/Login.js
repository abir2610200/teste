import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import '../styles/Auth.css';
import { FaInfinity, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [beamDegrees, setBeamDegrees] = useState(0);

  const navigate = useNavigate();

  // Handle input changes for email and password
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle the password visibility and update a class on body if needed
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    document.body.classList.toggle('show-password');
  };

  // Update the beam rotation based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const beam = document.querySelector('.light-beam');
      if (beam) {
        const rect = beam.getBoundingClientRect();
        const mouseX = rect.right + rect.width / 2;
        const mouseY = rect.top + rect.height / 2;
        const rad = Math.atan2(mouseX - e.pageX, mouseY - e.pageY);
        const degrees = (rad * (20 / Math.PI) * -1) - 350;
        setBeamDegrees(degrees);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    try {
      const url = `http://localhost:5000/api/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      // Destructure additional "matiereId" from the result if applicable
      const { message, token, error, type, userId, matiereId } = result;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', type);
        localStorage.setItem('userId', userId);
        if (type === 'prof' && matiereId) {
          localStorage.setItem('matiereId', matiereId);
        }
        if (type === 'admin') {
          localStorage.setItem('adminId', userId);
        }
        setIsAuthenticated(true);
        handleSuccess('Login successful!');
        navigate('/home');
      } else {
        handleError(error?.details?.[0]?.message || message);
      }
    } catch (err) {
      let errorMessage = 'An unexpected error occurred';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      handleError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-form">
          <div className="logo-section">
            <FaInfinity className="logo-icon" />
            <span className="logo-text">Logo</span>
          </div>

          <h2>Sign into your account</h2>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={loginInfo.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={loginInfo.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="eye-icon" />
                ) : (
                  <FaEye className="eye-icon" />
                )}
              </button>
              <div
                className="light-beam"
                style={{ transform: `rotate(${beamDegrees}deg)` }}
              ></div>
            </div>

            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <p>
              Don't have an account? <Link to="/signup">Register here</Link>
            </p>
          </div>

          <div className="terms-section">
            <Link to="/terms">Terms of use</Link>
            <span className="separator">.</span>
            <Link to="/privacy">Privacy policy</Link>
          </div>
        </div>

        <div className="auth-image">
          <img
            src="https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/03/24185535/Online-Learning.jpg"
            alt="Woman using tablet"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
