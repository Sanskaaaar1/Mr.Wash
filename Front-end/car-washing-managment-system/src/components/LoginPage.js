import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showForm, setShowForm] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowForm = (type) => {
    setShowForm(type);
    setError('');
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    localStorage.setItem('token', null);
    localStorage.setItem('role', null);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginData = { username, password };

    try {
      let url = '';
      if (showForm === "user") {
        url = 'http://localhost:9091/login';
      } else if (showForm === "emp") {
        url = 'http://localhost:9093/login';
      } else if (showForm === "admin") {
        url = 'http://localhost:9092/login'; 
      }
      const response = await axios.post(url, loginData);
      const token = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', showForm);
      if (showForm === "user") {
        navigate('/user-dashboard');
      } else if (showForm === "emp") {
        navigate('/emp-dashboard');
      } else if (showForm === "admin") {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <div className="card p-5 w-100 text-white" style={{
      maxWidth: '400px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
    }}>
      <h3 className="mb-4 text-center">
        {showForm === 'user' ? 'User Login' : showForm === 'emp' ? 'Emp Login' : 'Admin Login'}
      </h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control bg-transparent text-white border-light"
            placeholder={
              showForm === 'user' ? 'Username' :
              showForm === 'emp' ? 'Emp ID' : 'Admin ID'
            }
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control bg-transparent text-white border-light"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button className="btn w-100" style={{
          background: 'linear-gradient(135deg, #6f42c1, #007bff)',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(111, 66, 193, 0.5)'
        }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {showForm === 'user' && (
          <button 
            type="button" 
            className="btn btn-link w-100 mt-3 text-info" 
            onClick={() => navigate('/user-form')}>
            Create New Account
          </button>
        )}
      </form>
    </div>
  );

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4" style={{
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      color: 'white'
    }}>
      <img 
        src={require('./assets/logo.png')} 
        alt="Logo" 
        style={{
          width: '150px', 
          height: '120px', 
          marginBottom: '30px', 
          borderRadius: '12px', 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          padding: '10px'
        }}
      />
      <div className="d-flex mb-4 gap-3">
        <button 
          onClick={() => handleShowForm('user')} 
          className={`btn ${showForm === 'user' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill`}
        >
          User Login
        </button>
        <button 
          onClick={() => handleShowForm('emp')} 
          className={`btn ${showForm === 'emp' ? 'btn-success' : 'btn-outline-success'} rounded-pill`}
        >
          Emp Login
        </button>
        <button 
          onClick={() => handleShowForm('admin')} 
          className={`btn ${showForm === 'admin' ? 'btn-warning' : 'btn-outline-warning'} rounded-pill`}
        >
          Admin Login
        </button>
      </div>
      {showForm && renderForm()}
    </div>
  );
}
