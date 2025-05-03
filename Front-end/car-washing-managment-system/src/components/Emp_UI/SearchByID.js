import React, { useState } from 'react';
import axios from 'axios';
import EmpHeader from './EmpHeader.js';

export default function SearchByID() {
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState('');
  const [booking, setBooking] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const role = localStorage.getItem('role');

  const handleSearch = async () => {
    if (!bookingId) {
      setError('Please enter a Booking ID.');
      setBooking(null);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      let response;
      if(role==='admin'){
        response = await axios.get(`http://localhost:3333/admin/adminAPI/searchByID/${bookingId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      }else{
        response = await axios.get(`http://localhost:3333/emp/empAPI/searchByID/${bookingId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      }
      

      if (response.data) {
        setBooking(response.data);
        setError('');
      } else {
        setBooking(null);
        setError('No booking found with this ID.');
      }
    } catch (err) {
      console.error('Error fetching booking:', err);
      setBooking(null);
      setError('Booking not found or request failed.');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowSidebar(true);
  };

  if (role !== 'emp' && role !== 'admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }

  return (
    <div className="bg-dark min-vh-100 p-4">
      {role === 'emp' && <EmpHeader />}
      <div className="container">

        <div className="bg-secondary bg-opacity-25 p-4 rounded text-center mb-4">
          <h2 className="text-light fw-bold">Search Booking by ID</h2>
        </div>

        <div className="d-flex flex-column align-items-center mb-4">
          <input
            type="text"
            placeholder="Enter Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="form-control w-50 text-center mb-3"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {error && <div className="alert alert-danger text-center w-50 mx-auto">{error}</div>}

        {booking && (
          <div className="table-responsive mt-4">
            <table className="table table-dark table-bordered text-center align-middle">
              <thead className="table-light text-dark">
                <tr>
                  <th>Booking ID</th>
                  <th>Service Type</th>
                  <th>Slot Date</th>
                  <th>Slot Time</th>
                  <th>Vehicle</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{booking.bookingId}</td>
                  <td>{booking.serviceType}</td>
                  <td>{booking.slotDate}</td>
                  <td>{booking.slotTime}</td>
                  <td>{booking.vehicleCompany} {booking.vehicleName} ({booking.vehicleNumber})</td>
                  <td>{booking.user.firstName} {booking.user.middleName} {booking.user.lastname}</td>
                  <td>
                    <span className={`badge ${
                      booking.status === 'COMPLETED' ? 'bg-success' :
                      booking.status === 'CANCEL' ? 'bg-danger' :
                      'bg-warning text-dark'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => handleUserClick(booking.user)}>
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {showSidebar && selectedUser && (
          <div className="offcanvas offcanvas-end show bg-secondary text-light" tabIndex="-1" style={{ visibility: 'visible', width: '300px' }}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">User Details</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setShowSidebar(false)}></button>
            </div>
            <div className="offcanvas-body">
              <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastname}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
              <p><strong>Address:</strong> {selectedUser.address}, {selectedUser.city}</p>
              <p><strong>Gender:</strong> {selectedUser.gender}</p>
              <p><strong>Age:</strong> {selectedUser.age}</p>
              <p><strong>User ID:</strong> {selectedUser.userId}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
