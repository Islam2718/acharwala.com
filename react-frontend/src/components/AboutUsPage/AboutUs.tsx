import React from 'react';
import config from '../../config';
const App: React.FC = () => {
  return (
    <div className="App">
      <div className="about-page py-5">
        <div className="container">
          <div className="about">
            <div className="row">
              <div className="col-md-6 col-sm-12 mr-auto ">
                  <h2>About Us</h2>
                  <div className="about-content py-3">
                    <p>
                      Welcome to Sun Glow Internationl, where we believe in providing quality products and an exceptional shopping experience for our customers.
                    </p>
                    <p>
                      At Sun Glow Internationl, we are passionate about our customers. Our goal is to offer a curated selection of Food type that meets the highest standards of quality and style.
                    </p>
                    <p>
                      Started in 2021, Sun Glow Internationl has quickly grown to become a trusted industry. Our commitment to customer satisfaction, innovation, and ethical business practices sets us apart.
                    </p>
                    <p>
                      Why choose Sun Glow Internationl ?
                    </p>
                    <ul>
                      <li>Wide Selection: Discover a diverse range of Food all Category to suit every taste and need.</li>
                      <li>Quality Assurance: We source products from reputable suppliers, ensuring that each item meets our strict quality standards.</li>
                      <li>Customer Satisfaction: Our dedicated support team is here to assist you at every step, providing prompt and friendly service.</li>
                      <li>Secure Shopping: Shop with confidence on our secure platform, with multiple payment options for your convenience.</li>
                    </ul>
                    <p>
                      Thank you for choosing Sun Glow Internationl. We look forward to serving you and making your shopping experience memorable.
                    </p>
                  </div>
              </div>
              <div className="col-md-6 col-sm-12 mr-auto ">
                <div className="about-img d-flex ">
                  <img src={`${config.fileUrl}/about/about.png`} alt=""/>
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
