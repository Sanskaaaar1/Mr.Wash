import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateUser() {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mail: '',
    address: '',
    city: '',
    age: '',
    phoneNo: '',
    gender: '',
  });

  const handleSearch = async () => {
    if (!searchId) {
      setError('Please enter a User ID.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    setUserData(null);
    try {
      const response = await axios.get(`http://localhost:3333/admin/adminAPI/searchByInfoId/${searchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const user = response.data;
      if (!user || Object.keys(user).length === 0) {
        setError(`Details for ID ${searchId} not found.`);
        setUserData(null);
      } else {
        setUserData(user);
      }

    } catch (err) {
      console.error(err);
      setError(`Details for ID ${searchId} not found.`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    if (!userData) return;
    setUpdateLoading(true);
    setError('');
    setSuccess('');
    try {
      const updatedData = {
        firstName: formData.firstName || userData.firstName,
        middleName: formData.middleName || userData.middleName,
        lastName: formData.lastName || userData.lastname,
        age: formData.age || userData.age,
        gender: formData.gender || userData.gender,
        address: formData.address || userData.address,
        city: formData.city || userData.city,
        phoneNo: formData.phoneNo || userData.phoneNumber,
        mail: formData.mail || userData.email,
      };

      await axios.post(`http://localhost:3333/admin/adminAPI/UpdateUser/${searchId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('User updated successfully!');
      alert("Update Successful");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      setError('Failed to update user.');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Update Information</h2>

      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter User or Emp ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && <div className="alert alert-success text-center">{success}</div>}

      {userData && (
        <div className="card shadow">
          <div className="card-body">
            <h4 className="card-title mb-4">Edit Details</h4>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    placeholder={userData.firstName || 'First Name'}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="middleName"
                    value={formData.middleName}
                    placeholder={userData.middleName || 'Middle Name'}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    placeholder={userData.lastname || 'Last Name'}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={formData.age}
                    placeholder={userData.age?.toString() || 'Age'}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">{userData.gender || 'Select Gender'}</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    placeholder={userData.address || 'Address'}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    placeholder={userData.city || 'City'}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNo"
                    value={formData.phoneNo}
                    placeholder={userData.phoneNumber || 'Phone Number'}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="mail"
                    value={formData.mail}
                    placeholder={userData.email || 'Email'}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="d-grid gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdate}
                  disabled={updateLoading}
                >
                  {updateLoading ? 'Updating...' : 'Update Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
