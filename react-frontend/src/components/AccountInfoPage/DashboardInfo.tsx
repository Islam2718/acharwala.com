import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TopBar from './TopBar';
const App: React.FC = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div className="App">
        <div className="dashboard-info info-nav py-5">
          <div className="container">
            <div className='row'>
              <div className='col-md-3'>
                <TopBar />
              </div>
              <div className='col-md-9'>
                <div className="row d-flex justify-content-around">
                  <div className="col-md-9">
                    <div className="acc-bill-info my-5">
                      <h6>Account Info</h6>
                      <div className="items d-flex p-0 m-0">
                        <p ><i className="fa-solid fa-user"></i>Name:</p> <span>{userData && userData.name}</span>
                      </div>
                      <div className="items d-flex p-0 m-0">
                        <p><i className="fa-solid fa-envelope"></i>Email:</p> <span>{userData && userData.email}</span>
                      </div>
                      <div className="items d-flex p-0 m-0">
                        <p><i className="fa-solid fa-phone"></i>Phone:</p> <span>{userData && userData.phone}</span>
                      </div>
                      <div className="items d-flex p-0 m-0">
                        <p><i className="fa-solid fa-address-book"></i>Address:</p> <span>{userData && userData.address}</span>
                      </div>
                    </div>
                    {/* <div className="acc-bill-info">
                      <h6>Billing Info</h6>
                      <div className="items d-flex p-0 m-0">
                        <p ><i className="fa-solid fa-user"></i>Name:</p> <span>{userData && userData.name}</span>
                      </div>
                      <div className="items d-flex p-0 m-0">
                        <p><i className="fa-solid fa-envelope"></i>Email:</p> <span>{userData && userData.email}</span>
                      </div>
                      <div className="items d-flex p-0 m-0">
                        <p><i className="fa-solid fa-phone"></i>Phone:</p> <span>{userData && userData.phone}</span>
                      </div>
                      <div className="items d-flex p-0 m-0">
                        <p><i className="fa-solid fa-address-book"></i>Address:</p> <span>{userData && userData.address}</span>
                      </div>
                    </div> */}
                    <div className="py-4">
                      <Link to="/update-profile " className="theme-btn">Edit</Link>
                    </div>
                  </div>
                  <div className="col-md-3 py-5">
                    <div className="profile-img ">
                      <img src="assets/img/profile.png" alt="" />
                    </div>
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