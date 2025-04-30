import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Offcanvas, Button } from 'react-bootstrap';
import EmpHeader from './EmpHeader.js';
export default function TodaysTask() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    let response;
    try {
      if(role==='emp'){
        response = await axios.get('http://localhost:9093/empAPI/todaysTask', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }else{
        response = await axios.get('http://localhost:9092/adminAPI/todaysTask', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

      }
       
      setTasks(response.data);
    } catch (err) {
      setError('No task found');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [navigate]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowSidebar(true);
  };

  const handleAddEmpName = async (bookingId) => {
    const token = localStorage.getItem('token');
    try {
      let response;
      if(role==='emp'){
        response = await axios.get(`http://localhost:9093/empAPI/addEmpname/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }else{
        response = await axios.get(`http://localhost:9092/adminAPI/addEmpname/${bookingId}`, {
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
        await axios.put(`http://localhost:9093/empAPI/update/${bookingId}/${newStatus}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }else{
        await axios.put(`http://localhost:9092/adminAPI/update/${bookingId}/${newStatus}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
     
      fetchHistory();
    } catch (err) {
      console.error('Error updating status:', err);
      alert("Status update failed");
    }
  };

  const role = localStorage.getItem('role');
  if (role !== 'emp' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }

  return (
    <div className="bg-dark min-vh-100 p-4">
      {role === 'emp' ? <EmpHeader /> : null}

      
      <div className="container">

        {/* Page Heading */}
        <div className="bg-secondary bg-opacity-25 rounded p-4 mb-4 text-center">
          <h2 className="text-light fw-bold">Your Today's Task</h2>
        </div>

        {/* Error Message */}
        {error && <h4 className="text-danger text-center">{error}</h4>}

        {/* Table Section */}
        {tasks.length > 0 && (
          <div className="table-responsive">
            <table className="table table-dark table-hover table-bordered text-center align-middle">
              <thead className="table-secondary text-dark">
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
                {tasks.map((task) => (
                  <tr key={task.bookingId}>
                    <td>{task.bookingId}</td>
                    <td>{task.serviceType}</td>
                    <td>{task.slotDate}</td>
                    <td>{task.slotTime}</td>
                    <td>{task.vehicleCompany} {task.vehicleName} ({task.vehicleNumber})</td>
                    <td>{task.user.firstName} {task.user.middleName} {task.user.lastname}</td>
                    <td>
                      <span className={`badge ${
                        task.status === 'COMPLETED' ? 'bg-success' :
                        task.status === 'CANCEL' ? 'bg-danger' :
                        'bg-warning text-dark'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <Button variant="info" size="sm" onClick={() => handleUserClick(task.user)}>
                        View
                      </Button>
                    </td>
                    <td>
                      <Button variant="success" size="sm" onClick={() => handleStatusUpdate(task.bookingId, 'COMPLETED')}>
                        Complete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Offcanvas Sidebar */}
        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end" backdrop="static">
          <Offcanvas.Header closeButton className="bg-secondary text-light">
            <Offcanvas.Title>User Details</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-dark text-light">
            {selectedUser && (
              <div>
                <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastname}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
                <p><strong>Address:</strong> {selectedUser.address}, {selectedUser.city}</p>
                <p><strong>Gender:</strong> {selectedUser.gender}</p>
                <p><strong>Age:</strong> {selectedUser.age}</p>
                <p><strong>User ID:</strong> {selectedUser.userId}</p>
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}
