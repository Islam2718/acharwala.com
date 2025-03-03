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
          {/* <div className="row">
          {Array.isArray(productArray) && productArray.map((product) => (
                // product.is_featured==1 and OfferedProductArray.is_offered==1 condition 
                product.is_featured ? (
                  <div className="col-md-6 col-sm-6 col-6 my-3" key={product.id}>
                    <div className="offer-product-left">
                      <div className="card">                          
                            {/* <span className="offer-btn">Stock</span> 
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
                        {/* <span className="offer-btn">Stock</span> 
                    <Link to={`/product-details/${product.id}`}>
                        <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                          {/* <img src={`${config.fileUrl}products/product-1.jpg`} alt="" className="img-fluid p-2"/> 
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
          </div> */}
          <div className='row'>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 my-2 m-auto">
                <div className="card">
                    {/* <span className="stock-btn">Stock</span> */}
                    <Link to={`/product-details`}>
                      <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                          <img src={`./assets/acharwala-img/product-befor.jpg`} alt="n/a" className="img-fluid p-2 befor-image"/>
                          <img src={`./assets/acharwala-img/product-after.jpg`} alt="n/a" className="img-fluid p-2 after-image"/>
                      </div>
                    </Link>
                    <div className="card-body">
                      <h6>আমড়ার মোরব্বা</h6>
                      <span>500 gm</span>, <span> 250 gm</span> 
                        <div className="price-cart d-flex justify-content-between">
                            <ul className="price list-unstyled d-flex gap-2 m-0">
                                {/* {product.price ? (<li>&#2547; {formatter.format(product.price)}</li>) : (<li>--</li>)} */}
                                <li><del>300.00 ৳</del> 265.00 ৳</li>
                            </ul>
                            <ul className="cart list-unstyled d-flex gap-2 m-0">
                                <li><button className='btn py-0 px-1 fs-5'><i className="fa-solid fa-cart-plus"></i></button></li>
                                <li><button className='btn py-0 px-1 fs-5'><i className="fa-regular fa-heart"></i></button></li>
                            </ul>
                        </div>
                    </div>
                  </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 my-2 m-auto">
                <div className="card">
                    {/* <span className="stock-btn">Stock</span> */}
                    <Link to={`/product-details`}>
                      <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                          <img src={`./assets/acharwala-img/product-befor.jpg`} alt="n/a" className="img-fluid p-2 befor-image"/>
                          <img src={`./assets/acharwala-img/product-after.jpg`} alt="n/a" className="img-fluid p-2 after-image"/>
                      </div>
                    </Link>
                    <div className="card-body">
                      <h6>আমড়ার মোরব্বা</h6>
                      <span>500 gm</span>, <span> 250 gm</span> 
                        <div className="price-cart d-flex justify-content-between">
                            <ul className="price list-unstyled d-flex gap-2 m-0">
                                {/* {product.price ? (<li>&#2547; {formatter.format(product.price)}</li>) : (<li>--</li>)} */}
                                <li><del>300.00 ৳</del> 265.00 ৳</li>
                            </ul>
                            <ul className="cart list-unstyled d-flex gap-2 m-0">
                                <li><button className='btn py-0 px-1 fs-5'><i className="fa-solid fa-cart-plus"></i></button></li>
                                <li><button className='btn py-0 px-1 fs-5'><i className="fa-regular fa-heart"></i></button></li>
                            </ul>
                        </div>
                    </div>
                  </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 my-2 m-auto">
                <div className="card">
                    {/* <span className="stock-btn">Stock</span> */}
                    <Link to={`/product-details`}>
                      <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                          <img src={`./assets/acharwala-img/product-befor.jpg`} alt="n/a" className="img-fluid p-2 befor-image"/>
                          <img src={`./assets/acharwala-img/product-after.jpg`} alt="n/a" className="img-fluid p-2 after-image"/>
                      </div>
                    </Link>
                    <div className="card-body">
                      <h6>আমড়ার মোরব্বা</h6>
                      <span>500 gm</span>, <span> 250 gm</span> 
                        <div className="price-cart d-flex justify-content-between">
                            <ul className="price list-unstyled d-flex gap-2 m-0">
                                {/* {product.price ? (<li>&#2547; {formatter.format(product.price)}</li>) : (<li>--</li>)} */}
                                <li><del>300.00 ৳</del> 265.00 ৳</li>
                            </ul>
                            <ul className="cart list-unstyled d-flex gap-2 m-0">
                                <li><button className='btn py-0 px-1 fs-5'><i className="fa-solid fa-cart-plus"></i></button></li>
                                <li><button className='btn py-0 px-1 fs-5'><i className="fa-regular fa-heart"></i></button></li>
                            </ul>
                        </div>
                    </div>
                  </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6 my-2 m-auto">
                <div className="card">
                    {/* <span className="stock-btn">Stock</span> */}
                    <Link to={`/product-details`}>
                      <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                          <img src={`./assets/acharwala-img/product-befor.jpg`} alt="n/a" className="img-fluid p-2 befor-image"/>
                          <img src={`./assets/acharwala-img/product-after.jpg`} alt="n/a" className="img-fluid p-2 after-image"/>
                      </div>
                    </Link>
                    <div className="card-body">
                      <h6>আমড়ার মোরব্বা</h6>
                      <span>500 gm</span>, <span> 250 gm</span> 
                        <div className="price-cart d-flex justify-content-between">
                            <ul className="price list-unstyled d-flex gap-2 m-0">
                                {/* {product.price ? (<li>&#2547; {formatter.format(product.price)}</li>) : (<li>--</li>)} */}
                                <li><del>300.00 ৳</del> 265.00 ৳</li>
                            </ul>
                            <ul className="cart list-unstyled d-flex gap-2 m-0">
                                <li><button className='btn py-0 px-1 fs-5'><i className="fa-solid fa-cart-plus"></i></button></li>
                                <li><button className='btn py-0 px-1 fs-5'><i className="fa-regular fa-heart"></i></button></li>
                            </ul>
                        </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </section>
      {/* ------------offer products start---------- */}

      {/* --------------Best Selling part start--------- */}
      {/* --------------New Product part start--------- */}
      <section className="faq-area py-5">
        <div className='container'>
          <p className='heading-text'> আপনার সকল জিজ্ঞাসা </p>
          <div className='heading-border'></div>
            <div className='row mt-3'>
              <div className='col-md-10 mx-auto'>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        <i className="fa-solid fa-plus"></i> <i className="fa-solid fa-minus"></i> &nbsp; <strong>কোন কোন ক্ষেত্রে হ্যাপি রিটার্ন প্রযোজ্য হবে?</strong> 
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                      <div className="accordion-body">
                        -শুধুমাত্র আচারে সমস্যার ক্ষেত্রে রিটার্ন প্রযোজ্য হবে। ত্রুটিহীন আচারের ক্ষেত্রে আচারওয়ালা  রিটার্ন দিতে বাধ্য থাকবে না।  
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                      <i className="fa-solid fa-plus"></i> <i className="fa-solid fa-minus"></i> &nbsp; <strong>ত্রুটিযুক্ত প্রোডাক্টের ক্ষেত্রে কোন কোন ত্রুটি গ্রহণযোগ্য হবে?</strong>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                      <div className="accordion-body">
                      <ul>
                        <li>আচারের জার ভাঙা হলে (আনপ্যাকিং ভিডিও থাকতে হবে।)</li>
                        <li>ভুল আচার ডেলিভারি</li>
                        <li>আচার মিসিং</li>
                        <li>ফিজিক্যালি ড্যামেজড প্রোডাক্ট</li>
                        <li>নির্ধারিত মূল্যের চেয়ে বেশি রাখা</li>
                        <li>অর্ডারের বিল মিসিং( কম/বেশি রাখা)</li>
                        </ul> 
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                      <i className="fa-solid fa-plus"></i> <i className="fa-solid fa-minus"></i> &nbsp; <strong>কতো দিনের মাঝে প্রোডাক্ট রিটার্ন করতে পারবো?</strong>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                      <div className="accordion-body">
                        আচারে কোন ত্রুটি থাকতে হাতে পাবার ৫ দিনের মধ্যে আচারের  সমস্যা ডিটেইলসসহ জানাতে হবে। ৫ দিন অতিক্রম হয়ে গেলে আচারওয়ালা  রিটার্ন দিতে বাধ্য থাকবে না।
                      </div>
                    </div>
                  </div>
                </div>
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