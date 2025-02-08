import axios from 'axios';
import config from '../../config';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);    
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
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
      localStorage.removeItem('token');
      //store the loggedinUser data in local storage
      localStorage.removeItem('user');
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
    <div className="App">
        <div className="dashboard-info py-5">
          <div className="container">
            <TopBar />
              <form className="g-4">
                <div className="row d-flex justify-content-around">
                    <div className="col-md-9">
                      <div className="acc-bill-info my-5">
                        <h6>Account Info</h6>
                          <div className="col-md-12 my-3">
                            <input type="text" className="form-control input-design" placeholder="Abdul" id="inputPassword4"/>
                          </div>  
                          <div className="col-md-12 my-3">
                            <input type="text" className="form-control input-design" placeholder="Ali" id="inputPassword4"/>
                          </div>  
                          <div className="col-md-12 my-3">
                            <input type="email" className="form-control input-design" placeholder="abdulali@gmail.com *" id="inputPassword4"/>
                          </div>  
                          <div className="col-md-12 my-3">
                            <input type="text" className="form-control input-design" placeholder="017000000" id="inputPassword4"/>
                          </div>  
                          <div className="col-md-12 my-3">
                            <input type="text" className="form-control input-design" placeholder="Dhaka, Bangladesh" id="inputPassword4"/>
                          </div>  
                      </div>
                      {/* <div className="acc-bill-info">
                        <h6>Billing Info</h6>
                        <form className="row g-4">
                          <div className="col-md-12">
                            <input type="text" className="form-control input-design" placeholder="Abdul" id="inputPassword4"/>
                          </div>  
                          <div className="col-md-12">
                            <input type="text" className="form-control input-design" placeholder="Ali" id="inputPassword4"/>
                          </div>  
                          <div className="col-md-12">
                            <input type="email" className="form-control input-design" placeholder="abdulali@gmail.com *" id="inputPassword4"/>
                          </div>  
                          <div className="col-md-12">
                            <input type="text" className="form-control input-design" placeholder="017000000" id="inputPassword4"/>
                          </div>  
                          <div className="col-md-12">
                            <input type="text" className="form-control input-design" placeholder="Dhaka, Bangladesh" id="inputPassword4"/>
                          </div>  
                        </form>
                      </div> */}
                      <div className=" my-4">
                        <button type="submit" className="theme-btn">Update</button>
                      </div>
                    </div>
                  <div className="col-md-3 py-5">
                    <div className="profile-img ">
                      <img src="assets/img/profile.png" alt="" />
                      <input type="text" className="form-control input-design my-4" placeholder="Upload Photo" id="inputPassword4" />
                    </div>
                  </div>
                </div>
              </form>
          </div>
              
        </div>
    </div>
  );
}

export default App;