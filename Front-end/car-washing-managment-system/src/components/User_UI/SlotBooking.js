import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SlotBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleCompany: '',
    vehicleName: '',
    vehicleNumber: '',
    services: '',
    date: '',
    time: '',
   

  });
  // empName:'Emp'

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isVehicleNumberValid = (number) => /^[A-Z]{2}\s\d{1,2}\s[A-Z]{1,2}\s\d{4}$/i.test(number);
  const isFutureDate = (dateStr) => {
    const today = new Date();
    const selected = new Date(dateStr);
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    return selected > today; // strictly greater than today
  };
  
  const isTimeInRange = (timeStr) => {
    if (!timeStr) return false;
    const [hour, minute] = timeStr.split(':').map(Number);
    const time = hour + minute / 60;
    return time >= 9 && time <= 18;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setSubmitted(true);

    
    const { vehicleType, vehicleCompany, vehicleName, vehicleNumber, services, date, time} = formData;

    if (!vehicleType || !vehicleCompany || !vehicleName || !vehicleNumber || !services || !date || !time ||
        !isVehicleNumberValid(vehicleNumber) || !isFutureDate(date) || !isTimeInRange(time)) {
      setMessage('Please fix the errors before submitting.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3333/user/userAPI/slotBooking', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Slot booked successfully!');
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  const role = localStorage.getItem('role');
  if (role !== 'user' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }
  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="card p-5 shadow-lg" style={{ maxWidth: '700px', width: '100%' }}>
        
        <h2 className="text-center mb-4 text-primary">Book Your Slot</h2>

        {message && <div className="alert alert-danger text-center">{message}</div>}

        <form onSubmit={handleSubmit}>

          <div className="row g-3">
            {/* Left column */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Vehicle Type</label>
                <select
                  name="vehicleType"
                  className="form-control"
                  value={formData.vehicleType}
                  onChange={handleChange}
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Truck">Truck</option>
                  <option value="Bus">Bus</option>
                  <option value="Auto">Auto</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                </select>

                {submitted && !formData.vehicleType && (
                  <small className="text-danger">Required</small>
                )}
              </div>

              <div className="form-group mt-3">
                <label className="form-label">Vehicle Company</label>
                <input
                  type="text"
                  name="vehicleCompany"
                  className="form-control"
                  value={formData.vehicleCompany}
                  onChange={handleChange}
                />
                {submitted && !formData.vehicleCompany && (
                  <small className="text-danger">Required</small>
                )}
              </div>

              <div className="form-group mt-3">
                <label className="form-label">Vehicle Name</label>
                <input
                  type="text"
                  name="vehicleName"
                  className="form-control"
                  value={formData.vehicleName}
                  onChange={handleChange}
                />
                {submitted && !formData.vehicleName && (
                  <small className="text-danger">Required</small>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  className="form-control"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                />
                {submitted && !formData.vehicleNumber && (
                  <small className="text-danger">Required</small>
                )}
                {submitted && formData.vehicleNumber && !isVehicleNumberValid(formData.vehicleNumber) && (
                  <small className="text-danger">Format: MH 12 AB 1234</small>
                )}
              </div>

              <div className="form-group mt-3">
                <label className="form-label">Service Type</label>
                <select
                  name="services"
                  className="form-control"
                  value={formData.services}
                  onChange={handleChange}
                >
                <option value="">Select Service Type</option>
                <option value="Basic">Basic</option>
                <option value="Delux">Delux</option>
                <option value="Premium">Premium</option>
                </select>

                {submitted && !formData.services && (
                  <small className="text-danger">Required</small>
                )}
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="col-12 mt-3">
              <label className="form-label">Booking Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
              />
              {submitted && !formData.date && (
                <small className="text-danger">Required</small>
              )}
              {submitted && formData.date && !isFutureDate(formData.date) && (
                <small className="text-danger">Date must be in the future</small>
            )}

            </div>

            <div className="col-12 mt-3">
              <label className="form-label">Booking Time</label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={formData.time}
                onChange={handleChange}
              />
              {submitted && !formData.time && (
                <small className="text-danger">Required</small>
              )}
              {submitted && formData.time && !isTimeInRange(formData.time) && (
                <small className="text-danger">Time must be 9 AM - 6 PM</small>
              )}
            </div>

          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary btn-lg w-100">
              Confirm Booking
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
