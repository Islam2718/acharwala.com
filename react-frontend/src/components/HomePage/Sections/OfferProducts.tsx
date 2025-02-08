import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import "swiper/css";
import 'swiper/css/pagination';
import config from '../../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { addToWishlist } from '../../../store/wishlistSlice';
interface OfferedProductArray {
  id: number;
  name: string;
  slug: "";
  description: string;
  short_description: string;
  thumb: string;
  images: [];
  price: null;
  unit: string;
  is_top: 0;
  is_featured: 0;
  is_offered: 0 ;
  category_id: number;
  user_id: number;
  status: string;
}
interface ProductProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  thumb: string;
}
const App: React.FC<{ product: ProductProps }> = () => {

  const [productArray, setProductArray] = useState<OfferedProductArray[]>([]);
  const formatter = new Intl.NumberFormat('bn-BD');

  const fetchProductData = async () => {
    try {
      const response = await axios.get<{ data: { data: OfferedProductArray[] } }>(config.apiUrl+'product');
        
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
    fetchProductData();
  }, [0]);
  const dispatch = useDispatch();
  const handleAddToCart = (product: ProductProps) => {
    dispatch(addToCart({
      ...product,
      quantity: product.quantity || 1,
      totalPrice: (product.price || 0) * (product.quantity || 1),
    }));
  };

    const handleAddToWishlist = (product: ProductProps) => {
      console.log('Adding to Wishlist:', product); // Check product details
      dispatch(addToWishlist({
        id: product.id,
        thumb: product.thumb,
        name: product.name,
        price: product.price,
      }));
    };
  return (
    <div className="App">
      {/* ------------offer products start---------- */}
      <section className="offer-products py-2">
        <div className="container">
          <p className="heading-text">  অফার প্রোডাক্ট</p>
          <div className="heading-border"></div> 
          <div className="row">
          {Array.isArray(productArray) && productArray.map((product) => (
                // product.is_featured==1 and OfferedProductArray.is_offered==1 condition 
                product.is_featured ? (
                  <div className="col-md-6 col-sm-6 col-6 my-3" key={product.id}>
                    <div className="offer-product-left">
                      <div className="card">                          
                            {/* <span className="offer-btn">Stock</span> */}
                            <Link to={`/product-details/${product.id}`}>
                              <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                                  <img src={`${config.fileUrl1}${product.thumb}`} key={product.id} alt="" className="img-fluid p-2 w-100" />
                              </div>                    
                            </Link>
                          <div className="card-body">
                              <h6>{product.name}</h6>
                              <div className="price-cart d-flex justify-content-between">
                                  <ul className="price list-unstyled d-flex gap-2 m-0">
                                      {product.price ? (<li>&#2547; {formatter.format(product.price)}</li>) : (<li>--</li>)}
                                  </ul>
                                  <ul className="cart list-unstyled d-flex gap-2 m-0">
                                    <li><button className='btn py-0 px-1 fs-5' onClick={() => handleAddToCart({ ...product, price: product.price ?? 0, quantity: 1 })}><i className="fa-solid fa-cart-plus"></i></button></li>
                                    <li><button className='btn py-0 px-1 fs-5' onClick={() => handleAddToWishlist({ ...product, price: product.price ?? 0, quantity: 1 }) }><i className="fa-regular fa-heart"></i></button></li>
                                  </ul>
                              </div>
                          </div>
                      </div>  
                    </div>
                  </div>
            ): null))}
            <div className="col-md-6 col-sm-12 ">
              <div className="offer-product-right">
                <div className="row">
                {Array.isArray(productArray) && productArray.map((product) => (
                // OfferedProductArray.is_offered == 1
                product.is_offered ? (
                  <div className="col-md-6 col-sm-6 col-6 my-3">
                     <div className="card">
                        {/* <span className="offer-btn">Stock</span> */}
                    <Link to={`/product-details/${product.id}`}>
                        <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                          {/* <img src={`${config.fileUrl}products/product-1.jpg`} alt="" className="img-fluid p-2"/> */}
                          <img src={`${config.fileUrl1}${product.thumb}`} key={product.id} alt="" className="img-fluid p-2" />
                        </div>
                    </Link>
                        <div className="card-body">
                          <h6>{product.name}</h6>
                          <div className="price-cart d-flex justify-content-between">
                              <ul className="price list-unstyled d-flex gap-2 m-0">
                                {product.price ? (<li>&#2547; {formatter.format(product.price)}</li>) : (<li>--</li>)}
                              </ul>
                            <ul className="cart list-unstyled d-flex gap-2 m-0">
                              <li><button className='btn py-0 px-1 fs-5' onClick={() => handleAddToCart({ ...product, price: product.price ?? 0, quantity: 1 })}><i className="fa-solid fa-cart-plus"></i></button></li>
                              <li><button className='btn py-0 px-1 fs-5' onClick={() => handleAddToWishlist({ ...product, price: product.price ?? 0, quantity: 1 }) }><i className="fa-regular fa-heart"></i></button></li>
                            </ul>
                          </div> 
                        </div>
                      </div>
                  </div>
                 ): null ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ------------offer products start---------- */}

      {/* --------------Best Selling part start--------- */}
      {/* --------------New Product part start--------- */}
      <section className="best-selling-part card-design py-5">
        <div className="container">
          <p className="heading-text">নতুন প্রোডাক্ট সমূহ</p>
          <div className="heading-border"></div> 
          <div className="row">
              {/* product.is_top?0:product.is_featured?0:product.is_offered?0: */}
              {Array.isArray(productArray) && productArray.map((product) => (
                // is_top=0, is_fetured=0, is_offered=0 then 
                product.is_top == 0 && product.is_featured == 0 && product.is_offered == 0 ? (                
                  <div className="col-lg-3 col-md-4 col-sm-6 col-6 my-3">
                    <Link to={`/product-details/${product.id}`}>
                     <div className="card">
                        {/* <span className="offer-btn">Stock</span> */}
                        <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                          {/* <img src={`${config.fileUrl}products/product-1.jpg`} alt="" className="img-fluid p-2"/> */}
                          <img src={`${config.fileUrl1}${product.thumb}`} key={product.id} alt="" className="img-fluid p-2" />
                        </div>
                        <div className="card-body">
                          <h6>{product.name}</h6>
                          <div className="price-cart d-flex justify-content-between">
                              <ul className="price list-unstyled d-flex gap-2 m-0">
                                {product.price ? (<li>&#2547; {formatter.format(product.price)}</li>) : (<li>--</li>)}
                              </ul>
                            <ul className="cart list-unstyled d-flex gap-2 m-0">
                              <li><button className='btn py-0 px-1 fs-5' onClick={() => handleAddToCart({ ...product, price: product.price ?? 0, quantity: 1 })}><i className="fa-solid fa-cart-plus"></i></button></li>
                              <li><button className='btn py-0 px-1 fs-5' onClick={() => handleAddToCart({ ...product, price: product.price ?? 0, quantity: 1 })}><i className="fa-regular fa-heart"></i></button></li>
                            </ul>
                          </div> 
                        </div>
                      </div>
                    </Link>
                  </div>
                 ):''))}

            <div className=" my-2 text-end">
              <a href="/product" className="theme-btn btn-sm">আরও দেখুন</a>
            </div>
          </div>
        </div>
      </section>
      {/* --------------New Product part start--------- */}
      {/* --------Category Bootom Start-------- */}
    </div>
  );
}

export default App;