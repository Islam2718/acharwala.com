import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import axios from 'axios';

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
  copyright: string;
}
interface SocialInfo {
  id: number;
  name: string;
  icon: string;
  image: string;
  link_url: string;
  target: string;
  status: number;
}

const App: React.FC = () =>  {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [socialInfo, setSocialnfo] = useState<SocialInfo[]>([]);

  //function Siteinfo
  const fetchSiteInfo = async () => {
      try {
          const response = await axios.get<{ data: SiteInfo }>(config.apiUrl+'siteinfo');
          if (response.status === 200) {
              setSiteInfo(response.data.data);        
          } else {
              console.error('Failed to fetch site information');
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
 //function Socialinfo
 const fetchSocial = async () => {
  try {
    const response = await axios.get<{ data: SocialInfo[] }>(config.apiUrl + 'social');
    if (response.status === 200) {
      setSocialnfo(response.data.data);
    } else {
      console.error('Failed to fetch social information');
    }
  } catch (error) {
    console.error('Error fetching social data:', error);
  }
};
  useEffect(() => {
      fetchSiteInfo();
      fetchSocial();
      // console.log(siteInfo);                    
  },[]); 
  
  return (
    <div className="App">
      <hr/>
      <footer className="footer">
        <div className="container">
          <div className="row py-4">
            <div className="col-md-4 col-sm-12">
              <div className="footer-left text-sm-start text-center">
                {/* <img src={`${config.fileUrl+siteInfo?.logo}`} alt=""/> */}
                <img src={`${config.fileUrl}logo.png`} alt="" />
                <p className="mb-0 py-4">{siteInfo && siteInfo.description}</p>
                <div className="social-icon mb-5">
                    {socialInfo.map((info) => (
                      <Link to={info.link_url} key={info.id} target={info.target}>
                        <span dangerouslySetInnerHTML={{ __html: info.icon }}></span>
                      </Link>
                    ))}
                  {/* <Link to="#0"><i className="fa-brands fa-twitter twitter"></i></Link> */}
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="footer-center text-sm-start text-center">
                <h5>পেজসমূহ</h5>
                <div className="row">
                    <div className="col-md-6 mt-sm-3">
                      <ul className="p-0">
                        <li><Link to="/about-us">আমাদের সম্পর্কে</Link></li>
                        <li><Link to="/terms-conditions">নিয়ম ও শর্তাবলী</Link></li>
                        <li><Link to="/privacy-policy">গোপনীয়তা নীতি</Link></li>
                        <li><Link to="/return-policy">রিটার্ন পলিসি </Link></li>
                       </ul>
                    </div>
                    <div className="col-md-6 mt-sm-3">
                      <ul className="p-0">
                        <li><Link to="/product">ক্যাটাগরি সমূহ </Link></li>
                        <li><Link to="/product">পণ্য সমূহ </Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/contact-us">যোগাযোগ করুন</Link></li>
                       </ul>
                    </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="footer-right text-sm-start text-center">
                <h5>সাবস্ক্রাইব </h5>
                  <div className='input-group'>
                    <input type="text" className="form-control custom-focous" placeholder="e.g: info@krishikhamar.com" />
                    <button className="input-group-text" id="basic-addon2">সাবস্ক্রাইব করুন</button>
                  </div>
                  <div className="payment-img">
                    <img src={`${config.fileUrl}footer-img/payment_method.png`} alt="" className='img-fluid my-4 w-50'/>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center copyright m-0 text-white" > <span className="text-white" dangerouslySetInnerHTML={{ __html: `&copy; ${siteInfo && siteInfo.copyright}`}}></span></p>
      </footer>
    </div>
  );
}

export default App;