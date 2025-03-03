import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';
import config from '../../../config';
import axios from 'axios';

interface Slider {
  id: 1,
  title: string,
  thumb: string,
  link_url: string,
  description: string,
  status: string,
}

const App: React.FC = () => {
  const [slider, setSlider] = useState<Slider[]>([]);

  const fetchSlider = async () => {
    try {
      const response = await axios.get<{ data: Slider}, any>(config.apiUrl + 'slider');
      if (response.status === 200) {
        setSlider(response.data.data);
        console.log('slider', response.data.data);
      } else {
        console.error('Failed to fetch site information');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => { 
    fetchSlider();
  }, [0]);
  return (
    <div className="App">
      <section className='banner-area'>
        <div className='container'>
          <Swiper autoplay={{ delay: 2000, disableOnInteraction: false }} modules={[Autoplay, Pagination, Navigation]}>
            {/* {slider.map((slider) => (
              <SwiperSlide key={slider.id} className='swiper-item'>
                <div className='row'>
                  <div key={slider.id} className='col-md-6 d-flex align-items-center slider-part'>
                    <img src={`${config.fileUrl1}${slider.thumb}`}  className="img-fluid" alt={`${slider.title}`} />
                    <div className="slider-content">
                      <h1><span>{slider.title}</span></h1>
                      <p>{slider.description}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))} */}
            <SwiperSlide className='swiper-item'>
              <div className='row'>
                <div className='col-md-6 d-flex align-items-center slider-part'>
                  <img src={`assets/acharwala-img/banner.jpg`} className="img-fluid" alt=""  />
                  {/* <div className="slider-content">
                      <h1><span>চিনিগুরা পোলাওয়ের</span><br />চাল</h1>
                      <p>সেরা দামে চাল ।</p>
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default App;