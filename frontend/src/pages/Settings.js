import React, { useState } from 'react';
import axios from 'axios';

const AssignStudentToClass = () => {
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to your admin endpoint
      const response = await axios.put('http://localhost:5000/admin/assign-student', {
        studentId,
        classId,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error assigning student to class');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Assign Student to Class</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            className="form-control"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="classId">Class ID</label>
          <input
            type="text"
            id="classId"
            className="form-control"
            placeholder="Enter Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Assign Student
        </button>
      </form>
      {message && (
        <div className="alert alert-info mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default AssignStudentToClass;
