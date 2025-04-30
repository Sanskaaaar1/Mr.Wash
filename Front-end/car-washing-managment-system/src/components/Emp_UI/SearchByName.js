import React, { useState } from 'react';
import axios from 'axios';
import EmpHeader from './EmpHeader.js';

export default function SearchBookingByName() {
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      let response;
      if(role==='emp'){
        response = await axios.get(`http://localhost:9093/empAPI/searchByName/${customerName}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }else{
        response = await axios.get(`http://localhost:9092/adminAPI/searchByName/${customerName}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      if (!response.data || response.data.length === 0) {
        setError('No bookings found for this name.');
        setBookings([]);
        
      } else {
        setError('');
        setBookings(response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookings([]);
      setError('No booking found for this Name.');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowSidebar(true);
  };

  

  const role = localStorage.getItem('role');
  if (role !== 'emp' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }
  return (
    <div className="bg-dark min-vh-100 p-4">
       {role === 'emp' && <EmpHeader />}
      
      <div className="container">

        {/* Page Heading */}
        <div className="bg-secondary bg-opacity-25 p-4 rounded text-center mb-4">
          <h2 className="text-light fw-bold">Search Booking by Customer Name</h2>
        </div>

        {/* Search Box */}
        <div className="d-flex flex-column align-items-center mb-4">
          <input
            type="text"
            placeholder="Enter Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="form-control w-50 text-center mb-3"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger text-center w-50 mx-auto">{error}</div>
        )}

        {/* Table when bookings available */}
        {bookings.length > 0 && (
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
                {bookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.serviceType}</td>
                    <td>{booking.slotDate}</td>
                    <td>{booking.slotTime}</td>
                    <td>{booking.vehicleCompany} {booking.vehicleName} ({booking.vehicleNumber})</td>
                    <td>{booking.user.firstName} {booking.user.middleName} {booking.user.lastname}</td>
                    <td>
                    <span className={`badge ${
                        booking.status === 'COMPLETED' || booking.status === 'Completed' ? 'bg-success' :
                        booking.status === 'CANCEL' || booking.status === 'Cancel' ? 'bg-danger' :
                        booking.status === 'REQUESTED' || booking.status === 'Requested' ? 'bg-primary' :
                        booking.status === 'SCHEDULED' || booking.status === 'Scheduled' ? 'bg-warning text-dark' :
                        'bg-secondary'
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Offcanvas Sidebar for user details */}
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
