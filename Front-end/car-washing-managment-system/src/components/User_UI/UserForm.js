import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
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
  const [usernameAvailable, setUsernameAvailable] = useState(true);
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

    if (!usernameAvailable) newErrors.username = 'Username already taken. Try another.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });

    // Live check for username availability
    if (name === 'username') {
      if (value.trim().length > 2) { // only check if username length > 2
        try {
          const response = await axios.get(`http://localhost:9091/SearchUsername/${value}`);
          console.log(response.data);
          if (response.data) {
            setUsernameAvailable(false); // username already exists
          } else {
            setUsernameAvailable(true);  // username available
          }
        } catch (err) {
          setUsernameAvailable(true); // if any error (e.g., 404 Not Found), assume username is available
        }
      } else {
        setUsernameAvailable(true); // if typing too short, reset
      }
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const role = localStorage.getItem('role');
      const response = await axios.post('http://localhost:9091/register', formData);
      alert('Successfully Created New Account');
      if(role==='admin'){
        navigate('/admin-dashboard')
      }else{
        navigate('/login');
      }
      navigate('/login');
      console.log(response);
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ global: error.response?.data || error.message });
      
    } finally {
      setLoading(false);
    }
  };
  const role = localStorage.getItem('role');
  
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="card shadow-lg p-5" style={{ maxWidth: '700px', width: '100%' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Create User Account</h2>

        <form onSubmit={handleSubmitForm}>
          <div className="row g-3">
            {/* First Column */}
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

            {/* Second Column */}
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
                    className={`form-control ${name === 'username' && !usernameAvailable ? 'is-invalid' : ''}`}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    min={name === 'age' ? 18 : undefined}
                  />
                  {errors[name] && <small className="text-danger">{errors[name]}</small>}
                </div>
              ))}

              {/* Gender Select */}
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
            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
