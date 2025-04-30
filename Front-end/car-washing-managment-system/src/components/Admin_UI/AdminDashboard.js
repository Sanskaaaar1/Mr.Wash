import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../Admin_UI/AdminHeader';
import Footer from '../User_UI/Footer';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const actions = [
    { label: 'Update Details', icon: 'bi-pencil-square', path: '/admin-dashboard/UserUpdate' },
    { label: 'Add User', icon: 'bi-person-plus', path: '/admin-dashboard/AddUser' },
    { label: 'Add Employee', icon: 'bi-person-badge', path: '/admin-dashboard/AddEmployee' },
    { label: 'Today Task', icon: 'bi-calendar-check', path: '/admin-dashboard/TodayTask' },
    { label: 'Cancel Booking', icon: 'bi-x-circle', path: '/admin-dashboard/BookingCancel' },
    { label: 'Booking Request', icon: 'bi-list-check', path: '/admin-dashboard/requested-list' },
    { label: 'Search By Name', icon: 'bi-search', path: '/admin-dashboard/seachName' },
    { label: 'Search By Status', icon: 'bi-funnel', path: '/admin-dashboard/status' },
    { label: 'Search By ID', icon: 'bi-funnel', path: '/admin-dashboard/searchByID' },
  ];

  return (
    <div className="min-vh-100 bg-light">
      <AdminHeader />

      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold text-dark"></h2>

        <div className="row g-4">
          {actions.map((action, index) => (
            <div className="col-sm-6 col-lg-4" key={index}>
              <div
                className="card h-100 shadow-sm border-0 text-center dashboard-card hover-card"
                onClick={() => navigate(action.path)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <i className={`bi ${action.icon} fs-1 text-primary mb-3`}></i>
                  <h5 className="card-title">{action.label}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hover-card:hover {
          background-color: #f0f8ff;
          transform: scale(1.03);
          transition: all 0.3s ease-in-out;
        }
      `}</style>
      
    </div>
  );
}
