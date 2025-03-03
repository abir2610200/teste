import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [userType, setUserType] = useState('prof'); // "prof" or "parent"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    telephone: '',
    matiereId: '',
  });
  const [matieres, setMatieres] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch all matieres from the DB when userType is prof
  useEffect(() => {
    if (userType === 'prof') {
      const fetchMatieres = async () => {
        try {
          const response = await axios.get('/api/matieres');
          setMatieres(response.data);
        } catch (err) {
          console.error('Failed to fetch matieres', err);
        }
      };
      fetchMatieres();
    }
  }, [userType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (e) => {
    const type = e.target.value;
    setUserType(type);
    // Reset form data when switching user type
    setFormData({
      name: '',
      email: '',
      password: '',
      telephone: '',
      matiereId: '',
    });
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = '';
      let data = {};
      if (userType === 'prof') {
        url = '/api/auth/register/prof';
        data = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          telephone: formData.telephone,
          matiereId: formData.matiereId,
        };
      } else {
        url = '/api/auth/register/parent';
        data = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          telephone: formData.telephone,
          // No need to send enfants for a parent
        };
      }
      
      const response = await axios.post(url, data);
      setMessage(response.data.message || 'Registration successful!');
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
      setMessage('');
    }
  };

  // Inline style objects for a clean, modern look
  const containerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '5px 0 15px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>
        Register as {userType === 'prof' ? 'Professeur' : 'Parent'}
      </h2>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '15px' }}>
          <input 
            type="radio" 
            name="userType" 
            value="prof" 
            checked={userType === 'prof'} 
            onChange={handleUserTypeChange}
          /> Professeur
        </label>
        <label>
          <input 
            type="radio" 
            name="userType" 
            value="parent" 
            checked={userType === 'parent'} 
            onChange={handleUserTypeChange}
          /> Parent
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Telephone:</label>
          <input 
            type="text" 
            name="telephone" 
            value={formData.telephone}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        {userType === 'prof' && (
          <div>
            <label style={labelStyle}>Matière:</label>
            <select 
              name="matiereId" 
              value={formData.matiereId} 
              onChange={handleInputChange} 
              style={inputStyle}
              required
            >
              <option value="">Select Matière</option>
              {matieres.map((matiere) => (
                <option key={matiere._id} value={matiere._id}>
                  {matiere.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default RegistrationForm;
