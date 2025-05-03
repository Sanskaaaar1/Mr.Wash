import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmpHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3333/emp/empAPI/history', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setBookings(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching booking history:', error);
        setError('Failed to fetch booking history.');
      }
    };

    fetchBookings();
  }, []);

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
      <div className="container">

        {/* Page Heading */}
        <div className="bg-secondary bg-opacity-25 p-4 rounded text-center mb-4">
          <h2 className="text-light fw-bold">Employee Services History</h2>
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
                  <th>Customer Name</th>
                  <th>Vehicle</th>
                  <th>Service Type</th>
                  <th>Slot Date</th>
                  <th>Slot Time</th>
                  <th>Vehicle Number</th>
                  <th>Status</th>
                  <th>Details</th> {/* New column for View button */}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>
                      {booking.user 
                        ? `${booking.user.firstName} ${booking.user.middleName || ''} ${booking.user.lastname}`
                        : 'N/A'}
                    </td>
                    <td>{`${booking.vehicleCompany} ${booking.vehicleName}`}</td>
                    <td>{booking.serviceType}</td>
                    <td>{booking.slotDate}</td>
                    <td>{booking.slotTime}</td>
                    <td>{booking.vehicleNumber}</td>
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
                      {booking.user && (
                        <button className="btn btn-info btn-sm" onClick={() => handleUserClick(booking.user)}>
                          View
                        </button>
                      )}
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
