import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
        <div className="shopping-cart py-5">
          <div className="container">
            <p className="heading-text-center text-center">শপিং কার্ট</p>
            <div className="heading-border"></div>
            <div className="table table-responsive py-4">
                <table className="table">
                  <thead className="thead w-100">
                    <tr className="text-left">
                      <th className="text-left-col col-8">পণ্যের নাম </th>
                      <th className="col-2 text-center">একক দাম</th>
                      <th className="col-1 text-center">পরিমাণ</th>
                      <th className="col-2 text-center">টোটাল</th>
                      <th className="col-1 text-center">অ্যাকশন </th>
                    </tr>
                  </thead>
                  <tbody  className="tbody text-left">
                    <tr className="border-bottom tbody-content">
                      <td className="text-left col-auto"> <img src="assets/img/products/product-1.jpg" alt="" /> সরিষার তেল</td>
                      <td className="text-center col-1">৳ ১,২০০</td>
                      <td className="text-center col-2">
                          <div className="input-group">
                              <button className="btn btn-outline-secondary decrement-btn" type="button">-</button>
                                <input type="number" placeholder="0" className="text-center form-control form-control-sm"/>
                              <button className="btn btn-outline-secondary increment-btn" type="button">+</button>
                          </div>
                      </td>
                      
                      <td className="text-center col-2 p-0 py-2">৳ ১,২০০ /=</td>
                      <td className="text-center col-1 "><a href="#0"><i className="fa-solid fa-xmark"></i></a></td>
                    </tr>
                  </tbody>
                </table>
                {/* checkout button  */}
                <div className="calcultaion-part">
                  <div className="col-md-12 d-flex justify-content-end ">
                    <div className="calculation">
                      <p className="subtotal">সাব-টোটাল <span>৳ ১,২০০</span></p>
                      <div className="coupon d-flex justify-content-between align-items-center p-0">
                        <p>কুপন</p>
                        <input className="form-control text-center form-control-md" list="datalistOptions" id="exampleDataList" placeholder=""/>
                        <div className="theme-btn apply-btn"><a href="#0">এপলাই </a></div>
                      </div>
                      <p className="total my-3">টোটাল <span>৳ ১,২০০</span></p>
                      <span>(শিপিং ফি অন্তর্ভুক্ত নয়)</span>
                      <div className="theme-btn mt-3 ">
                        <a href="/checkout">চেকআউট করুন </a>
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