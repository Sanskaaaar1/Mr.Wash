import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EmpProfile() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (role !== 'emp') {
      setError('Unauthorized Access');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response=await axios.get('http://localhost:3333/emp/empAPI/MyDetails', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setUserData(response.data);
        console.log(response.data)
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      }
    };

    fetchData();
  }, [role]);

  if (error) {
    return <h2 className="text-danger text-center mt-5">{error}</h2>;
  }

  if (!userData) {
    return <h2 className="text-center mt-5 text-light">Loading...</h2>;
  }


 
  if (role !== 'emp' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }
  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="card text-dark shadow-lg" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="card-body text-center">

          {/* Profile Image */}
          <img 
            src={
              userData.gender === 'Male'
                ? require('../assets/male.png')
                : userData.gender === 'Female'
                ? require('../assets/female.png')
                : require('../assets/other.png')
            }
            width="120"
            height="120"
            className="rounded-circle shadow mb-3"
            alt="Profile"
          />

          {/* Username */}
          <h3 className="card-title">{userData.authentication?.username}</h3>

          <hr />

          {/* Info Rows */}
          <div className="row text-start mb-3">
            <div className="col-6"><strong>First Name:</strong> {userData.firstName}</div>
            <div className="col-6"><strong>Middle Name:</strong> {userData.middleName}</div>
          </div>

          <div className="row text-start mb-3">
            <div className="col-6"><strong>Last Name:</strong> {userData.lastname}</div>
            <div className="col-6"><strong>Gender:</strong> {userData.gender}</div>
          </div>

          <div className="row text-start mb-3">
            <div className="col-6"><strong>Age:</strong> {userData.age}</div>
            <div className="col-6"><strong>Phone:</strong> {userData.phoneNumber}</div>
          </div>

          <div className="row text-start mb-3">
            <div className="col-6"><strong>Address:</strong> {userData.address}</div>
            <div className="col-6"><strong>City:</strong> {userData.city}</div>
          </div>

          <div className="row text-start mb-4">
            <div className="col-12"><strong>Email:</strong> {userData.email}</div>
          </div>

          {/* Dashboard Button */}
          <button className="btn btn-primary w-100" onClick={() => navigate('/emp-dashboard')}>
            Go to Dashboard
          </button>

        </div>
      </div>
    </div>
  );
}
