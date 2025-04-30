import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HoverImage.css';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import Footer from '../User_UI/Footer';

export default function UserDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  
  if (role !== 'user' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }

  return (
    <div className="bg-dark min-vh-100 ">
      <UserHeader />

      <div className="container py-5 ">
        {/*<h2 className="text-center mb-5 text-light fw-bold"></h2>*/}

        <div className="row justify-content-center g-5 ">
          
          {/* Slot Booking Card */}
          <div className="col-md-5">
            <div className="card bg-secondary bg-opacity-25 text-light shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img 
                  src={require('../assets/carwash.png')} 
                  width="150" 
                  height="120" 
                  className="hover-effect mb-4"
                  alt="Slot Booking"
                  onClick={() => navigate('/user-dashboard/slot-booking')}
                  style={{ cursor: 'pointer' }}
                />
                <h4 className="mb-3">Slot Booking</h4>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/user-dashboard/slot-booking')}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Booking History Card */}
          <div className="col-md-5">
            <div className="card bg-secondary bg-opacity-25 text-light shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img 
                  src={require('../assets/history.png')} 
                  width="150" 
                  height="120" 
                  className="hover-effect mb-4"
                  alt="Booking History"
                  onClick={() => navigate('/user-dashboard/history')}
                  style={{ cursor: 'pointer' }}
                />
                <h4 className="mb-3">Booking History</h4>
                <button 
                  className="btn btn-success"
                  onClick={() => navigate('/user-dashboard/history')}
                >
                  View History
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}
