import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';

export default function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3333/user/userAPI/history', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setHistory(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch booking history.');
      }
    };

    fetchHistory();
  }, []);

  const role = localStorage.getItem('role');
  if (role !== 'user') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'CANCEL':
        return <span className="badge bg-danger">Cancelled</span>;
      case 'COMPLETED':
        return <span className="badge bg-success">Completed</span>;
      case 'REQUESTED':
        return <span className="badge bg-warning text-dark">Requested</span>;
      case 'SCHEDULED':
        return <span className="badge bg-primary">Scheduled</span>; // Changed to blue
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };
  

 
  if (role !== 'user' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }
  return (
    
    <div className="bg-dark min-vh-100 p-4">
      <UserHeader/>
      <div className="container">
        <div className="bg-secondary bg-opacity-25 shadow p-4 mb-4 rounded text-center">
          <h2 className="fw-bold text-light">My Booking History</h2>
        </div>

        {error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <>
            {history.length === 0 ? (
              <div className="alert alert-info text-center">No booking history available.</div>
            ) : (
              <div className="row g-4">
                {history.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 bg-secondary bg-opacity-25 text-light border-light shadow">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="card-title mb-0">Booking #{item.bookingId}</h5>
                          {getStatusBadge(item.status)}
                        </div>
                        <hr className="border-light" />

                        <div className="row">
                          <div className="col-6 mb-2">
                            <strong>Booking Date:</strong><br /> {item.bookingDate}
                          </div>
                          <div className="col-6 mb-2">
                            <strong>Booking Time:</strong><br /> {item.bookingTime}
                          </div>

                          <div className="col-6 mb-2">
                            <strong>Slot Date:</strong><br /> {item.slotDate}
                          </div>
                          <div className="col-6 mb-2">
                            <strong>Slot Time:</strong><br /> {item.slotTime}
                          </div>

                          <div className="col-12 mb-2">
                            <strong>Service Type:</strong><br /> {item.serviceType}
                          </div>
                          <div className="col-6 mb-2">
                            <strong>Vehicle Type:</strong><br /> {item.vehicleType}
                          </div>
                          <div className="col-6 mb-2">
                            <strong>Vehicle Company:</strong><br /> {item.vehicleCompany}
                          </div>
                          <div className="col-6 mb-2">
                            <strong>Vehicle Name:</strong><br /> {item.vehicleName}
                          </div>
                          <div className="col-6 mb-2">
                            <strong>Vehicle Number:</strong><br /> {item.vehicleNumber}
                          </div>
                          <div className="col-6 mb-2">
                            <strong>Employee Name:</strong><br /> {item.empName}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
