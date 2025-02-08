import React from 'react';
import CallToAction from '../HomePage/Sections/CallToAction';


const App: React.FC = () => {
  return (
    <div className="App">
      <div className="brand-page py-5">
        <div className="container">
            <p className="heading-text-center text-center">Brands </p>
            <div className="heading-border text-center"></div>
              <div className="row h-0 w-0 mr-auto">
                <div className=" brand-list">
                  <div className="brand-section">
                    <p className="heading-text">Beverages </p>
                    <div className="heading-border"></div>  
                    <div className="row mx-auto mr-auto ">
                      <div className="col-md-2 col-sm-4 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-1.png" alt="" />
                      </div>
                      <div className="col-md-2 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-2.png" alt="" />
                      </div>
                      <div className="col-md-2 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-3.png" alt="" />
                      </div>
                      <div className="col-md-2 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-4.png" alt="" />
                      </div>
                      <div className="col-md-2 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-5.png" alt="" />
                      </div>
                      <div className="col-md-2 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-6.png" alt="" />
                      </div>
                      <div className="col-md-2 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-7.png" alt="" />
                      </div>
                    </div>  
                  </div>     
                  <div className="brand-section py-5">
                    <p className="heading-text">Drinks </p>
                    <div className="heading-border"></div>  
                    <div className="row mx-auto mr-auto ">
                      <div className="col-md-2 col-sm-4 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-1.png" alt="" />
                      </div>
                      <div className="col-md-2 col-sm-4 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-2.png" alt="" />
                      </div>
                      <div className="col-md-2 col-sm-4 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-3.png" alt="" />
                      </div>
                      <div className="col-md-2 col-sm-4 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-4.png" alt="" />
                      </div>
                      <div className="col-md-2 col-sm-4 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-5.png" alt="" />
                      </div>
                      <div className="col-md-2 col-sm-4 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-6.png" alt="" />
                      </div>
                      <div className="col-md-2 col-sm-4 brand-img p-2">
                        <img src="assets/img/brands/beverage/beverage-7.png" alt="" />
                      </div>
                    </div>  
                  </div>     
              </div>
            <CallToAction/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;