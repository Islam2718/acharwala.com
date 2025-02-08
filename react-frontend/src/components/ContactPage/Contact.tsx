
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import config from '../../config';


interface SiteInfo {
  title: string;
  name: string;
  description: string;
  logo: string;
  icon: string;
  phone: string;
  email: string;
  address: string;
  map_html: string;
}


const App: React.FC = () => {
    // hooks
    const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

    //function
    const fetchSiteInfo = async () => {
        try {
            const response = await axios.get<{ data: SiteInfo }>(config.apiUrl + 'siteinfo');
            if (response.status === 200) {
                setSiteInfo(response.data.data);        
            } else {
                console.error('Failed to fetch site information');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchSiteInfo();
        console.log(siteInfo);                    
    },[]); 
  return (
    <div className="App">
      <div className="contact-page py-5">
        <div className="container">
          <div className="row">
            <div className="contact">
              <div className="container">
                <div className="row">
                  <div className="col-md-5 mr-auto">
                    <h2>যোগাযোগ করুন</h2>
                    <p className="py-4"> {siteInfo?.description}</p>
                    <ul className="list-unstyled contact-info pl-md-5 mb-5">
                      <li className="d-flex info  mb-2">
                        <span className="mr-3"><i className="fa-solid fa-location-dot"></i><span className="icon-map"></span></span> 
                          {siteInfo && (
                            <span>
                                {siteInfo.address}, <br />
                            </span>
                           )}
                          </li>
                      <li className="d-flex info  mb-2"><span className="mr-3"><i className="fa-solid fa-phone"></i><span className="icon-phone"></span></span> {siteInfo && siteInfo.phone} </li>
                      <li className="d-flex info"><span className="mr-3"><i className="fa-solid fa-envelope"></i><span className="icon-envelope-o"></span></span> {siteInfo && siteInfo.email}</li>
                    </ul>
                    <div className="map">
                      <div className="row">
                        <div className="col-md-12">
                          <iframe className="w-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12281.64834202815!2d90.36566285296622!3d23.77033770223302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0b00362c719%3A0x98ffa85ad21b509e!2sShyamoli%20Square%20Shopping%20Mall!5e0!3m2!1sen!2sbd!4v1708694766918!5m2!1sen!2sbd"
                            title="Google Maps"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 my-5">
                    <form className="mb-5" method="post" id="contactForm" name="contactForm">
                      <div className="row">  
                        <div className="col-md-12 form-group">
                          <label htmlFor="name" className="col-form-label">নাম</label>
                          <input type="text" className="form-control input-design" name="name" id="name"/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 form-group">
                          <label htmlFor="email" className="col-form-label">ই-মেইল </label>
                          <input type="text" className="form-control input-design" name="email" id="email"/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 form-group">
                          <label htmlFor="phone" className="col-form-label">ফোন</label>
                          <input type="text" className="form-control input-design" name="phone" id="phone"/>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 form-group">
                          <label htmlFor="message" className="col-form-label">মেসেজ </label>
                          <textarea className="form-control input-design" name="message" id="message" cols={30} rows={7}></textarea>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 py-3">
                          <input type="submit" value="সেন্ড করুন " className="theme-btn py-2 px-4"/>
                          <span className="submitting"></span>
                        </div>
                      </div>
                    </form>
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