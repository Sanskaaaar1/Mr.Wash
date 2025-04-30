import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HoverImage.css';
import { useNavigate } from 'react-router-dom';
import EmpHeader from './EmpHeader.js';
import Footer from '../User_UI/Footer';

export default function EmpDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  if (role !== 'emp' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }

  return (
    <div className="bg-dark min-vh-100 d-flex flex-column">
     <EmpHeader/>
      {/* Heading */}
      <div className="bg-secondary bg-opacity-25 p-4 text-center">
       
      </div>

      {/* Main Buttons Area */}
      <div className="container py-5 flex-grow-1">
        <div className="row g-5 justify-content-center">
          
          {/* Card 1 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
            <div className="card bg-secondary bg-opacity-25 text-light shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={require('../assets/todayTask.png')}
                  width="150"
                  height="120"
                  className="hover-effect mb-3"
                  alt="Today's Task"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/emp-dashboard/todayTask')}
                />
                <h5>Today's Task</h5>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/emp-dashboard/todayTask')}>
                  View Tasks
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
            <div className="card bg-secondary bg-opacity-25 text-light shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={require('../assets/cancel.png')}
                  width="150"
                  height="120"
                  className="hover-effect mb-3"
                  alt="Cancel Booking"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/emp-dashboard/cancelBooking')}
                />
                <h5>Cancel Booking</h5>
                <button className="btn btn-danger mt-3" onClick={() => navigate('/emp-dashboard/cancelBooking')}>
                  Cancel Now
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
            <div className="card bg-secondary bg-opacity-25 text-light shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={require('../assets/searchcar.png')}
                  width="150"
                  height="120"
                  className="hover-effect mb-3"
                  alt="Search by Customer Name"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/emp-dashboard/searchByName')}
                />
                <h5>Search Customer</h5>
                <button className="btn btn-success mt-3" onClick={() => navigate('/emp-dashboard/searchByName')}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
            <div className="card bg-secondary bg-opacity-25 text-light shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={require('../assets/searchstatus.png')}
                  width="150"
                  height="120"
                  className="hover-effect mb-3"
                  alt="Search by Status"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/emp-dashboard/searchByStatus')}
                />
                <h5>Search by Status</h5>
                <button className="btn btn-warning mt-3" onClick={() => navigate('/emp-dashboard/searchByStatus')}>
                  Check Status
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
            <div className="card bg-secondary bg-opacity-25 text-light shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img 
                  src={require('../assets/history.png')} 
                  width="150" 
                  height="120" 
                  className="hover-effect mb-4"
                  alt="Booking History"
                  onClick={() => navigate('/emp-dashboard/history')}
                  style={{ cursor: 'pointer' }}
                />
                <h4 className="mb-3">My History</h4>
                <button 
                  className="btn btn-success"
                  onClick={() => navigate('/emp-dashboard/history')}
                >
                  View History
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
            <div className="card bg-secondary bg-opacity-25 text-light shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img 
                  src={require('../assets/searchID.png')} 
                  width="150" 
                  height="120" 
                  className="hover-effect mb-4"
                  alt="Booking History"
                  onClick={() => navigate('/emp-dashboard/searchByID')}
                  style={{ cursor: 'pointer' }}
                />
                <h4 className="mb-3">Search By ID</h4>
                <button 
                  className="btn btn-success"
                  onClick={() => navigate('/emp-dashboard/searchByID')}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
     
    </div>
  );
}
