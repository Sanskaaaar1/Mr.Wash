import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function EmpHeader() {
  const navigate = useNavigate(); // <-- Add this line

  return (
    <div className="bg-dark m-0">
      <div className="d-flex flex-row align-items-center justify-content-between p-3">
        
        <img 
          src={logo} 
          width="100" 
          height="100" 
          className="border mb-3"
          style={{ borderRadius: '10px' }}
          alt="Logo"
        />

        <div className="ms-auto">
          <button className="btn btn-outline-light mx-2" onClick={() => navigate('/emp-dashboard')}>
            Home
          </button>
          <button className="btn btn-outline-light mx-2" onClick={() => navigate('/emp-dashboard/profile')}>
            Profile
          </button>
          <button className="btn btn-outline-light mx-2" onClick={() => navigate('/login')}>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
