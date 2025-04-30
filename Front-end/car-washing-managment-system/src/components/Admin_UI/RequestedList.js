import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RequestedList() {
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [slotUpdates, setSlotUpdates] = useState({});
  const [messages, setMessages] = useState({});
  const role = localStorage.getItem('role');

  const fetchRequestedBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:9092/adminAPI/status/REQUESTED`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.data || response.data.length === 0) {
        setError('No bookings found with status "REQUESTED".');
        setBookings([]);
        setSlotUpdates({});
      } else {
        setError('');
        setBookings(response.data);

        const initialUpdates = {};
        response.data.forEach((booking) => {
          initialUpdates[booking.bookingId] = {
            date: booking.slotDate || '',
            time: booking.slotTime || '',
          };
        });
        setSlotUpdates(initialUpdates);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookings([]);
      setError('No REQUEST Found');
    }
  };

  useEffect(() => {
    fetchRequestedBookings();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowSidebar(true);
  };

  const handleInputChange = (bookingId, field, value) => {
    setSlotUpdates((prev) => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        [field]: value,
      },
    }));
  };

  const handleUpdateSlot = async (bookingId) => {
    const { date, time } = slotUpdates[bookingId] || {};

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:9092/adminAPI/updateSlot/${bookingId}/${date}/${time}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.put(
        `http://localhost:9092/adminAPI/update/${bookingId}/SCHEDULED`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequestedBookings(); // Refresh
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleCancelRequest = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:9092/adminAPI/update/${bookingId}/CANCEL`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRequestedBookings(); // Refresh list
    } catch (error) {
      console.error('Cancellation failed:', error);
    }
  };

  if (role !== 'admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }

  return (
    <div className="bg-dark min-vh-100 p-4">
      <div className="container">
        <div className="bg-secondary bg-opacity-25 p-4 rounded text-center mb-4">
          <h2 className="text-light fw-bold">Booking Request</h2>
        </div>

        {error && (
          <div className="alert alert-danger text-center w-50 mx-auto">{error}</div>
        )}

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
                  <th>User Details & Update</th>
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
                      <span className="badge bg-warning text-dark">{booking.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-info btn-sm mb-2" onClick={() => handleUserClick(booking.user)}>
                        View
                      </button>

                      {role === 'admin' && (
                        <div className="mt-2">
                          <input
                            type="date"
                            className="form-control mb-1"
                            value={slotUpdates[booking.bookingId]?.date || ''}
                            onChange={(e) =>
                              handleInputChange(booking.bookingId, 'date', e.target.value)
                            }
                          />
                          <input
                            type="time"
                            className="form-control mb-1"
                            value={slotUpdates[booking.bookingId]?.time || ''}
                            onChange={(e) =>
                              handleInputChange(booking.bookingId, 'time', e.target.value)
                            }
                          />
                          <button
                            className="btn btn-sm btn-success w-100"
                            onClick={() => handleUpdateSlot(booking.bookingId)}
                          >
                            Update Slot
                          </button>
                          <button
                            className="btn btn-sm btn-danger w-100 mt-1"
                            onClick={() => handleCancelRequest(booking.bookingId)}
                          >
                            Cancel Request
                          </button>
                          {messages[booking.bookingId] && (
                            <small className="text-white d-block mt-1">{messages[booking.bookingId]}</small>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
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
