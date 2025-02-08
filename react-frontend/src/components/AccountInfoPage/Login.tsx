import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authSlice';
const App: React.FC = () => {
  const [identifier, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
      const response = await axios.post(config.apiUrl + 'login', {
        identifier,
        password
      });
      if (response.status === 200) {
        // Login successful, redirect to dashboard
        // window.location.href = '/dashboard-info';
        //store the token in local storage
        // Dispatch action to store token and user data
        dispatch(setAuthData({ token: response.data.token, user: response.data.loggedinUser }));
        // localStorage.setItem('token', response.data.token);
        //store the loggedinUser data in local storage
        // localStorage.setItem('user', JSON.stringify(response.data.loggedinUser));
        //with out reload the page go to the dashboard-info
        navigate('/dashboard-info');
        // console.log('Login successful', localStorage.getItem('token'), localStorage.getItem('user'));
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // print the error message
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = (field: 'password' | 'confirmPassword') => {
    setShowPassword((prevShowPassword) => ({ ...prevShowPassword, [field]: !prevShowPassword[field] }));
  };
  return (
    <div className="App">
        <div className="login-page">
          <div className="container col-md-3">
              <div className="login-heading-text">
                <p className="heading-text-center text-center ">লগইন </p>
                <div className="heading-border text-center"></div>
              </div>
              <div className="reg-form">
                <form onSubmit={handleSubmit} className="row g-4">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control input-design"
                      placeholder="ইমেইল * ফোন নাম্বার *"
                      value={identifier}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className='input-group flex-nowrap'>
                    <input
                      type={showPassword.password ? "text" : "password"}
                      className="form-control input-design w-auto"
                      placeholder="পাসওয়ার্ড *"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                      className="input-group-text"
                      type="button"
                      onClick={() => handleTogglePassword("password")}
                    >
                      <i className={showPassword.password ? "fas fa-eye-slash" : "fas fa-eye"} />
                    </button>
                    </div>
                    
                  </div>
                  <p className="m-0 my-2 mb-0">
                    <a href="#0">পাসওয়ার্ড ভুলে গেছেন?</a>
                  </p>
                  <div className="login-btn">
                    <button type="submit" className={`theme-btn ${!(identifier && password) ? 'disabled' : ''}`} disabled={(identifier && password) ? false : true}>
                      {loading ?<span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if={loading}></span> লগইন হচ্ছে</span> : 'লগইন করুন'}
                    </button>
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <p>
                    যদি অ্যাকাউন্ট না থাকে |{' '}
                    <Link to="/registration">নিবন্ধন করুন</Link>
                  </p>
                </form>
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;