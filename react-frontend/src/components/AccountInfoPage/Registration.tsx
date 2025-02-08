import axios from 'axios';
import config from '../../config';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const App: React.FC = () => {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
      password: false,
      confirmPassword: false
    });
  const navigate = useNavigate();
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(config.apiUrl + 'register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      });
      if (response.status === 201) {
        const responseLogin = await axios.post(config.apiUrl + 'login', {
          identifier: formData.email || formData.phone,
          password: formData.password
        })
        if (responseLogin.status === 200) {
          //store the token in local storage
          localStorage.setItem('token', responseLogin.data.token);
          //store the loggedinUser data in local storage
          localStorage.setItem('user', JSON.stringify(responseLogin.data.loggedinUser));
          //with out reload the page go to the dashboard-info
          navigate('/dashboard-info');
          console.log('Login successful', localStorage.getItem('token'), localStorage.getItem('user'));
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = (field: 'password' | 'confirmPassword') => {
    setShowPassword((prevShowPassword) => ({ ...prevShowPassword, [field]: !prevShowPassword[field] }));
  };
  return (
    <div className="App">
        <div className="registration-page py-5">
          <div className="container col-md-3">
              <p className="heading-text-center text-center">নিবন্ধন </p>
              <div className="heading-border text-center"></div>
              <div className="reg-form">
                  <form className="row g-4" onSubmit={handleSubmit}>
                    <div className="col-md-12"> 
                      <input type="text" className="form-control input-design" placeholder="নাম*" required onChange={(event) => setFormData({ ...formData, name: event.target.value })}/>
                    </div>
                    <div className="col-md-12">
                      <input type="email" className="form-control input-design" placeholder="ই-মেইল*" required onChange={(event) => setFormData({ ...formData, email: event.target.value })}/>
                    </div>
                    <div className="col-md-12">
                      <input type="number" className="form-control input-design" placeholder="ফোন*" required onChange={(event) => setFormData({ ...formData, phone: event.target.value })}/>
                    </div>
                    <div className="col-md-12">
                      <input type="text" className="form-control input-design"  placeholder="ঠিকানা" onChange={(event) => setFormData({ ...formData, address: event.target.value })}/>
                    </div>
                    <div className="col-md-12">
                      <div className='input-group'>
                        <input type={showPassword.password ? "text" : "password"} className="form-control input-design w-auto" placeholder=" পাসওয়ার্ড*" required onChange={(event) => setFormData({ ...formData, password: event.target.value })}/>
                        <button
                          className="input-group-text w-auto"
                          type="button"
                          onClick={() => handleTogglePassword("password")}
                        >
                          <i className={showPassword.password ? "fas fa-eye-slash" : "fas fa-eye"} />
                        </button>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className='input-group'>
                        <input type={showPassword.password ? "text" : "password"} className="form-control input-design w-auto" placeholder="কনফার্ম পাসওয়ার্ড*" required onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}/>
                        <button
                          className="input-group-text w-auto"
                          type="button"
                          onClick={() => handleTogglePassword("password")}
                        >
                          <i className={showPassword.password ? "fas fa-eye-slash" : "fas fa-eye"} />
                        </button>
                      </div>
                    </div>
                    <p>ইতিমধ্যে এবং অ্যাকাউন্ট আছে | <Link to="/login">লগইন</Link></p>
                    <button type="submit" className={`theme-btn ${!(formData.name && formData.email && formData.phone && formData.password) ? 'disabled' : ''}`} disabled={!(formData.name && formData.email && formData.phone && formData.password) || loading}>
                    {loading ?<span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if={loading}></span> অপেক্ষা করুন</span> : 'নিবন্ধন করুন'} 
                    </button>
                  </form>
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;