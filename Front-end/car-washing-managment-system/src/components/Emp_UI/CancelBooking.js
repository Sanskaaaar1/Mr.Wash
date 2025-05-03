import React, { useState } from 'react';
import axios from 'axios';
import EmpHeader from './EmpHeader.js';

export default function CancelBooking() {
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error2, setError2] = useState('');

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      let response;
      if(role==='emp'){
        response = await axios.get(`http://localhost:3333/emp/empAPI/searchByID/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
      }if(role==='admin'){response = await axios.get(`http://localhost:3333/admin/adminAPI/searchByID/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      }
     

      console.log(response)
      if (!response.data) {
        setError("No Data Found");
        setData(null);
      } else {
        setError('');
        setData(response.data);
      }
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError("Failed to fetch booking.");
      setData(null);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowSidebar(true);
  };

  const handleAddEmpName = async (bookingId) => {
    const token = localStorage.getItem('token');
    try {
      let response;
      if(role==='emp'){
        response = await axios.get(`http://localhost:3333/emp/empAPI/addEmpname/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }else{
          response = await axios.get(`http://localhost:3333/admin/adminAPI/addEmpname/${bookingId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
      }
      
      console.log("Employee name added successfully:", response.data);
    } catch (err) {
      console.error("Failed to add employee name:", err);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      await handleAddEmpName(bookingId);
      if(role==='emp'){
        await axios.put(`http://localhost:3333/emp/empAPI/update/${bookingId}/${newStatus}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }else{
        await axios.put(`http://localhost:3333/admin/adminAPI/update/${bookingId}/${newStatus}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
      

      setData(null);
      setError2('Booking marked as CANCELLED successfully.');
    } catch (err) {
      console.error("Error updating status:", err);
      if (data && data.status === "CANCEL") {
        setError2("Booking of this car is already cancelled.");
      } else if (data && data.status === "COMPLETED") {
        setError2("Washing of this car is already completed.");
      } else {
        setError2("Something went wrong while cancelling booking.");
      }
    }
  };

  const role = localStorage.getItem('role');
  if (role !== 'emp' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }

  return (
    <div className="bg-dark min-vh-100 p-5">
      {role === 'emp' ? <EmpHeader /> : null}
      <div className="container">

        {/* Heading */}
        <div className="bg-secondary bg-opacity-25 p-4 rounded mb-4 text-center">
          <h2 className="fw-bold text-light">Cancel a Booking</h2>
        </div>

        {/* Search Input */}
        <div className="d-flex flex-column align-items-center mb-4">
          <input
            type="text"
            placeholder="Enter Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="form-control w-50 mb-3 text-center"
          />
          <button className="btn btn-primary" onClick={() => { handleCancel(bookingId); setError2(''); }}>
            Search
          </button>
        </div>

        {/* Error if no data */}
        {error && (
          <div className="alert alert-danger text-center w-50 mx-auto">{error}</div>
        )}

        {/* Table when data found */}
        {data && (
          <div className="table-responsive">
            <table className="table table-dark table-bordered text-center align-middle">
              <thead className="table-light text-dark">
                <tr>
                  <th>Booking ID</th>
                  <th>Service</th>
                  <th>Slot Date</th>
                  <th>Slot Time</th>
                  <th>Vehicle</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr key={data.bookingId}>
                  <td>{data.bookingId}</td>
                  <td>{data.serviceType}</td>
                  <td>{data.slotDate}</td>
                  <td>{data.slotTime}</td>
                  <td>{data.vehicleCompany} {data.vehicleName} ({data.vehicleNumber})</td>
                  <td>{`${data.user.firstName} ${data.user.middleName || ''} ${data.user.lastname}`}</td>
                  <td>
                    <span className={`badge ${
                      data.status === 'CANCEL' ? 'bg-danger' :
                      data.status === 'COMPLETED' ? 'bg-success' :
                      'bg-warning text-dark'
                    }`}>
                      {data.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => handleUserClick(data.user)}>
                      View User
                    </button>
                  </td>
                  <td>
                    <button 
                      className="btn btn-danger btn-sm" 
                      disabled={data.status === 'CANCEL' || data.status==='COMPLETED'} 
                      onClick={() => handleStatusUpdate(data.bookingId, 'CANCEL')}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Success/Error Message */}
        {error2 && (
          <div className="alert alert-warning text-center mt-3 w-50 mx-auto">{error2}</div>
        )}

        {/* Sidebar for user details */}
        {showSidebar && selectedUser && (
          <div className="offcanvas offcanvas-end show bg-secondary text-light" tabIndex="-1" style={{ visibility: 'visible', width: '300px' }}>
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">User Details</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setShowSidebar(false)}></button>
            </div>
            <div className="offcanvas-body">
              <p><strong>Name:</strong> {`${selectedUser.firstName} ${selectedUser.middleName || ''} ${selectedUser.lastname}`}</p>
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
