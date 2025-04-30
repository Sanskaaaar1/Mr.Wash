import React from 'react';
import logo from '../assets/logo.png'; 
import { useNavigate } from 'react-router-dom';

export default function UserHeader() {
    const Navigate =useNavigate();
  return (
    <div className="bg-dark m-0">
      <div className="d-flex flex-row align-items-center justify-content-between p-3">
        <img 
          src={logo} 
          width="100" 
          height="100" 
          className="border mb-3"
          style={{ borderRadius: '10px' }} // reduced roundness here
          alt="Preview"
        />
        <div className="ms-auto">
          <button className="btn btn-outline-light mx-2" onClick={()=>Navigate("/user-dashboard")}>Home</button>
          <button className="btn btn-outline-light mx-2" onClick={()=>Navigate("/user-dashboard/profile")}>Profile</button>
          <button className="btn btn-outline-light mx-2" onClick={()=>Navigate("/login")}>Logout</button>
        </div>
      </div>
    </div>
  );
}
