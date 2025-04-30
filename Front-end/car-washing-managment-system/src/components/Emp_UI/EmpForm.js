import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EmpForm() {
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNo: '',
    mail: '',
    city: '',
    address: '',
    age: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.middleName.trim()) newErrors.middleName = 'Middle Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';

    if (!formData.phoneNo) newErrors.phoneNo = 'Phone Number is required';
    else if (!/^\d{10}$/.test(formData.phoneNo)) newErrors.phoneNo = 'Phone Number must be 10 digits';

    if (!formData.mail) newErrors.mail = 'Email is required';
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.mail)) newErrors.mail = 'Invalid Gmail address';

    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    if (!formData.age) newErrors.age = 'Age is required';
    else if (parseInt(formData.age) < 18) newErrors.age = 'Age must be at least 18';

    if (!formData.gender || !['Male', 'Female'].includes(formData.gender))
      newErrors.gender = 'Gender must be Male or Female';

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const role = localStorage.getItem('role');
      await axios.post('http://localhost:9092/register', formData);
      alert('Account created successfully!');
      if(role==='admin'){
        navigate('/admin-dashboard')
      }else{
        navigate('/login');
      }
      
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ global: error.response?.data || error.message });
    } finally {
      setLoading(false);
    }
  };

  const role = localStorage.getItem('role');
  if (role !== 'emp' && role !=='admin') {
    return <h2 className="text-danger text-center mt-5">Unauthorized Access</h2>;
  }
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="card shadow-lg p-5" style={{ maxWidth: '700px', width: '100%' }}>
        <h2 className="text-center mb-4 text-success fw-bold">Create Admin Account</h2>

        <form onSubmit={handleSubmitForm}>
          <div className="row g-3">
            {/* Left Column */}
            <div className="col-md-6">
              {[
                { label: 'First Name', name: 'firstName' },
                { label: 'Middle Name', name: 'middleName' },
                { label: 'Last Name', name: 'lastName' },
                { label: 'Phone No', name: 'phoneNo' },
                { label: 'Email', name: 'mail' }
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="form-label">{label}</label>
                  <input
                    type={name === 'phoneNo' ? 'tel' : 'text'}
                    className="form-control"
                    name={name}
                    placeholder={name === 'mail' ? 'eg: xyz@gmail.com' : ''}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                  {errors[name] && <small className="text-danger">{errors[name]}</small>}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              {[
                { label: 'City', name: 'city' },
                { label: 'Address', name: 'address' },
                { label: 'Age', name: 'age' },
                { label: 'Username', name: 'username' },
                { label: 'Password', name: 'password' }
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="form-label">{label}</label>
                  <input
                    type={name === 'password' ? 'password' : name === 'age' ? 'number' : 'text'}
                    className="form-control"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    min={name === 'age' ? 18 : undefined}
                  />
                  {errors[name] && <small className="text-danger">{errors[name]}</small>}
                </div>
              ))}

              {/* Gender Dropdown */}
              <div className="mt-2">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <small className="text-danger">{errors.gender}</small>}
              </div>
            </div>
          </div>

          {/* Global Error */}
          {errors.global && <div className="alert alert-danger text-center mt-3">{errors.global}</div>}

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button className="btn btn-success w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
