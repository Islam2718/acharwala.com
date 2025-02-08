import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
        <div className="order-details order-track py-5">
            <div className="container col-md-3 py-2">
              <h6 className="py-2">Order Track</h6>
              <div className="reg-form">
                  <form className="row g-4">
                    <div className="col-md-12">
                      <input type="password" className="form-control input-design" placeholder="Current password*"/>
                    </div>
                    <div className="col-md-12">
                      <input type="password" className="form-control input-design" placeholder="New Password*"/>
                    </div>
                    <div className="col-md-12">
                      <input type="password" className="form-control input-design" placeholder="Confirm Password*"/>
                    </div>
                    <div className="col-md-12">
                      <a href="#0" className="theme-btn">Update</a>
                    </div>
                  </form>
              </div>
            </div>
          <div className="container">
             <p className="heading-text"><i className="fa-solid fa-bag-shopping"></i> Order Details</p>
              <div className="heading-border"></div>
              <div className="row">
                <p className="custom-thead mt-5">Order Information</p>
                <div className="order-info  px-5">
                  <div className="logo-detail">
                    <div className="row d-flex justify-content-between">
                      <div className="col-md-6 left">
                        <img src="assets/img/logo.png" alt="" />
                        <h6>Sun Glow International</h6>
                        <p className="m-0">Address: <span>123 Street Name, City, Country</span></p>
                        <p className="m-0">Phone: <span> +123456789</span></p>
                      </div>
                      <div className="col-md-6 text-end m-0 right">
                        <p className="m-0">Order Number: 1234567890</p>
                        <p className="m-0">Date: Oct 12, 2023 02:10</p>
                      </div>
                    </div>
                  </div>
                  {/*---------------- billing info start ----------------- */}
                  <div className="billing-info mt-5">
                    <div className="row">
                      <div className="col-md-6 bi-left">
                        <h6>Billing Information</h6>
                        <p className="m-0">Full Name: <span>John Doe</span></p>
                        <p className="m-0">Phone: <span>qQpFh@example.com</span></p>
                        <p className="m-0">Address: <span>1278, Test House, Test area City: Dhaka, State: Dhaka</span></p>
                      </div>
                      <div className="col-md-6 bi-rigth text-end">
                        <p className="m-0">Payment Type: Cash on Delivery</p>
                        <p className="m-0">Status: <span>Pending</span></p>
                      </div>
                    </div>
                  </div>
                  {/*---------------- billing info end ----------------- */}
                  {/* ------------------ product table start ---------------- */}
                  <table className="table my-5">
                    <thead className="thead w-100">
                      <tr className="text-left">
                        <th className="text-left-col col-6">Product Name</th>
                        <th className="col-2 text-center">Unit Price</th>
                        <th className="col-2 text-center">Qty.</th>
                        <th className="col-2 text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody  className="tbody text-left">
                      <tr className="py-5 justify-content-center align-items-center border-bottom">
                        <td className="text-left col-6"> <img src="assets/img/products/product-3.png" alt="" /> Jergens Soothing Aloe</td>
                        <td className="text-center col-2">$1250</td>
                        <td className="text-center col-2">2</td>
                        <td className="text-center col-2">$1250 /=</td>
                      </tr>
                    </tbody>
                </table>   
                  {/* ------------------ product table end ---------------- */}
                  {/* ------------------ shipping start ---------------- */}
                  <div className="shipping-info mt-5">
                    <div className="container">
                      <div className="row ">
                        <h6 className=" p-0 my-3" >Shipping Information</h6>
                        <p className="m-0">Full Name: <span>John Doe</span></p>
                        <p className="m-0">Phone: <span>qQpFh@example.com</span></p>
                        <p className="m-0">Address: <span>1278, Test House, Test area City: Dhaka, State: Dhaka</span></p>
                      </div>
                    </div>
                  </div>
                  {/* ------------------ shipping end ---------------- */}
                  <div className="download-invoice mt-5 d-flex ">
                     <button className="theme-btn"><i className="fa-solid fa-download"></i> Download Invoice</button>
                     <button className="btn-cancle ms-3">Cancle</button>
                  </div>
                    {/* ----------Call To Action Start ----------*/}
                    <section className="call-to-action mt-5">
                        <div className="action">
                        <div className="container">
                            <div className="bg-image h-100">
                            <div className="row">
                                <div className="col-md-8 action-left">
                                <h1><span>Fulfill</span> All Your <span>Needs !</span></h1>
                                <button><span>Best Deal </span> 20% <span>Off</span></button>
                                </div>
                                <div className="col-md-4 action-right d-flex align-items-center justify-content-center">
                                <img src="assets/img/call-to-action/action-image.png" alt="" />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </section>
                    {/* ----------Call To Action End ---------- */}
                </div>
              </div>
          </div>
        </div>
    </div>
  );
}

export default App;