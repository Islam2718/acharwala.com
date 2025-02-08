import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';
import config from '../../../config';
import { Link } from 'react-router-dom';

interface Category {
  id: number,
  name: string,
  description: string,
  thumb: string,
  status: number,
  user_id: number,
  store_id: number,
  // user: null,
  // store: null
}

interface ProductArray {
  id: number;
  name: string;
  slug: "";
  description: string;
  short_description: string;
  thumb: string;
  images: [];
  price: null;
  unit: string;
  is_featured: 0;
  is_offered: 0 ;
  category_id: number;
  user_id: number;
  status: string;
}

const App: React.FC = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [productArray, setProductArray] = useState<ProductArray[]>([]);
  const formatter = new Intl.NumberFormat('bn-BD');

  const fetchCategory = async () => {
    try {
      let allCategoryData: Category[] = [];
      let currentPage = 1;
  
      while (true) {
        const response = await axios.get<{ data: { data: Category[] } }>(
          `${config.apiUrl}category?page=${currentPage}`
        );
        if (response.status === 200) {
          const responseData = response.data.data;
          if (responseData.data.length === 0) {
            break;
          }
  
          // Concatenate the current page's data to the overall array
          allCategoryData = [...allCategoryData, ...responseData.data];
  
          currentPage++;
        } else {
          console.error('Failed to fetch site information');
          break;
        }
      }
  
      // Set the state with all the data
      setCategory(allCategoryData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get<{ data: { data: ProductArray[] } }>(config.apiUrl+'product');
        
      if (response.status === 200) {
        setProductArray(response.data.data.data); 
        console.log('_product_list', response.data.data.data); 
      } else {
        console.error('Failed to fetch product data');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  

  useEffect(() => {
    fetchCategory();  
    fetchProductData();             
},[0]); 

  return (
    <div className="App">
      {/* --------Category Slider Start-------- */}
      <section className="category-slider mb-5">
        <div className="slider-body">
          <div className="container">
            <div className="border-text mt-1">
              {/* <p className="heading-text">ক্যাটাগরি সমূহ</p>
              <div className="heading-border"></div>  */}
            </div>
            <div className="slider-area">
              <Swiper 
                slidesPerView={6} 
                spaceBetween={30} 
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                breakpoints={{
                  325: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                className="categorySwiper"  
                modules={[Autoplay, Pagination, Navigation]}>
                {category.map((categoryItem) => (
                  <SwiperSlide key={categoryItem.id} className="slider-item ">
                    <Link to={`/product?category=${categoryItem.id}`}>
                      <div className="caregory-slider-img d-flex justify-content-center">
                        <img src={`${config.fileUrl1}${categoryItem.thumb}`} alt="" />
                        {/* <img src="assets/img/category/oil-1.png" alt=""/> */}
                      </div>
                      <div className="category-slider-content">
                        <h6>{categoryItem.name}</h6>
                        {/* <p>{categoryItem.description}</p> */}
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        </div>
      </section>
      {/* --------Category Slider Start-------- */}
    </div>
  );
}

export default App;