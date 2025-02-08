import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import { useDispatch } from 'react-redux';
import { clearAuthData } from '../../store/authSlice';
export default function TopBar() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);    
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const dispatch = useDispatch();
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(config.apiUrl + 'logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        //store the token in local storage
        // Clear Redux state
       dispatch(clearAuthData());
        // localStorage.removeItem('token');
        //store the loggedinUser data in local storage
        // localStorage.removeItem('user');
        //with out reload the page go to the dashboard-info
        navigate('/login');
        // console.log('Login successful', localStorage.getItem('token'), localStorage.getItem('user'));
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
        <ul className="d-column p-0 flex-wrap">
            <li className="active"><i className="fa-solid fa-user"></i> <Link to="/dashboard-info" >Account Info</Link></li>
            {userData && userData.type === 'ADMIN' || userData.type === 'SUPERADMIN' ? <li><i className="fa-solid fa-user"></i> <Link to="/product-upload">Product Upload</Link></li> : ''} 
            <li><i className="fa-solid fa-user"></i> <Link to="/dashboard-order">Orders</Link></li>
            <li><i className="fa-solid fa-lock"></i> <Link to="/password">Change Password</Link></li>
            <li><i className="fa-solid fa-right-from-bracket"></i> <a href="#" onClick={handleSubmit} aria-disabled={loading}>
            {loading ?<span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if={loading}></span> Loging out</span> : 'Logout'}  
            </a></li>
        </ul>
        <div className="heading-border"></div>
    </div>
  )
}
