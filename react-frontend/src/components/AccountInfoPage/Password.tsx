import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import TopBar from './TopBar';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../store/authSlice';
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [new_password, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [email , setEmail] = useState('');

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.email) {
      setEmail(userData.email);
    }
  }, [0]); 
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(config.apiUrl + 'change-password', {
        email,
        password,
        password_confirmation
      });
      if (response.status === 200) {
        // Login successful, redirect to dashboard
        dispatch(setAuthData({ token: response.data.token, user: response.data.loggedinUser }));
        //with out reload the page go to the dashboard-info
        navigate('/dashboard-info');
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
        <div className="password info-nav py-5">
          <div className="container">
            <div className='row'>
              <div className='col-md-3'>
                <TopBar />
              </div>
              <div className='col-md-9'>
                <div className="container col-md-6 py-4 mx-auto">
                  <h6 className="py-4">Account Info</h6>
                  <div className="reg-form">
                      <form className="row g-4" onSubmit={handleSubmit}>
                        <div className="col-md-12">
                          <input type="password" className="form-control input-design" placeholder="Current password*" value={password} onChange={(event) => setPassword(event.target.value)}/>
                        </div>
                        <div className="col-md-12">
                          <div className="input-group">
                            <input
                              type={showPassword.password ? "text" : "password"}
                              className="form-control input-design w-auto"
                              placeholder="Password*"
                              value={new_password}
                              onChange={(event) => setNewPassword(event.target.value)}
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

                        <div className="col-md-12">
                          <div className="input-group">
                            <input
                              type={showPassword.confirmPassword ? "text" : "password"}
                              className="form-control input-design w-auto"
                              placeholder="Confirm Password*"
                              value={password_confirmation}
                              onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                              <button
                                className="input-group-text"
                                type="button"
                                onClick={() => handleTogglePassword("confirmPassword")}
                              >
                                <i className={showPassword.confirmPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                              </button>
                          </div>
                        </div>
                        <div className="col-md-12">
                          {loading ? <button type='submit' className={`theme-btn ${!(password && password_confirmation && password === password_confirmation) ? '' : 'disabled'}`} disabled> <span className='spinner-border spinner-border-sm'></span>  Update</button> : <button type='submit'  className={`theme-btn ${!(password && password_confirmation && password === password_confirmation) ? 'disabled' : ''}`} disabled={( password && password_confirmation && password === password_confirmation) ? false : true}>Update</button>}
                        </div>
                      </form>
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;