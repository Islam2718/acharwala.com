import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import config from '../../config';
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist } from '../../store/wishlistSlice';
// import axios from 'axios';



interface Product {
  quantity: number;
  id: number;
  name: string;
  slug: "";
  description: string;
  short_description: string;
  thumb: string;
  images?: string;
  price: number;
  unit: string;
  is_featured: 0;
  is_offered: 0 ;
  is_top: 0;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
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

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [thumbsSwiper] = useState(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const formatter = new Intl.NumberFormat('bn-BD');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${config.apiUrl}product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        console.log('_product',data.data.name);
        setProduct(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();

    // Cleanup function to cancel fetch if component unmounts
    return () => {
      // Add cleanup code here if needed
    };
  }, [id]);

  if (loading) {
    return <div className="container my-5"><div className="col-12 mx-auto alert alert-success text-center">লোড হচ্ছে...</div></div>;
  }

  if (!product) {
    return <div className="container my-5"><div className="col-12 mx-auto alert alert-success text-center">প্রোডাক্ট খুজে পাওয়া যায় নি...</div></div>;
  }

  let images: string[] = [];
  if (typeof product.images === 'string') {
    images = product.images.split(',');
  } else if (Array.isArray(product.images)) {
    images = product.images;
  }


  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: product.quantity || 1,
        totalPrice: (product.price || 0) * (product.quantity || 1),
      })
    );
  };

  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        id: product.id,
        thumb: product.thumb,
        name: product.name,
        price: product.price,
      })
    );
  };

  if (!product) {
    return <p>Product not found.</p>;
  }
  return (
    <div>
      {/* product details section  */}
      <section className="product-details mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="product-showcase-gallery w-100">  
              <Swiper 
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="big-img"
              >
                <SwiperSlide>                  
                  <img src={`${config.fileUrl1}${product?.thumb}`}  className="img-fluid" alt={`${product.name}`} />
                </SwiperSlide>
                {Array.isArray(images) && images.map((image) => (
                  <SwiperSlide key={image}>
                    {/* <img src={image.trim()} className="img-fluid" alt={`Product Image ${image + 1}`} /> */}
                    <img src={`${config.fileUrl1}${image}`} className="img-fluid" alt={`${product.name}`} />
                  </SwiperSlide>                  
                ))}   
              </Swiper>
              <Swiper
                //  onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="small-img mt-3"
              >
                <SwiperSlide>
                  <img src={`${config.fileUrl1}${product?.thumb}`}  alt={`${product.name}`} />
                </SwiperSlide>
                {Array.isArray(images) && images.map((image) => (
                  <SwiperSlide key={image}>
                    <img src={`${config.fileUrl1}${image}`} className="img-fluid" alt={`${product.name}`} />
                  </SwiperSlide>                  
                ))} 
              </Swiper>
              </div>
            </div>
            <div className="col-md-7">
              <div className="product-content">
                  <h3>{product.name} </h3>
                  <div>
                    <span dangerouslySetInnerHTML={{ __html: product.short_description }} />
                  </div>
                  <div className="custom-border"></div>
                  <ul className="price list-unstyled d-flex gap-2 m-0 my-2">
                      <li className='font-weight-bold' style={{ fontSize: '20px' }}>৳ {formatter.format(product.price)}</li>
                      {/* <li>$19.53</li> */}
                  </ul>
                  <div className="custom-border"></div>
                  <p className="p-0 m-0 mt-4">Available - <span className="span-color">In stock</span></p>
                  <p className="m-0"> ক্যাটাগরী:  <span className="span-bold">{product.category.name}</span></p>
                  <div className="cart-btns py-5">
                      <a href="tel:+880171034567" className="theme-btn me-3"><i className="fa-solid fa-phone"></i> +৮৮০ ১৭১০ ০০১৩৩৭ </a> 
                      <button
                        type="button"
                        className="theme-btn"
                        onClick={handleAddToCart}
                        style={{height: '35px'}}
                      >
                        <i className="fa-solid fa-cart-plus"></i> এড টু কার্ট
                      </button>
                      <button
                        type="button"
                        className="outline-btn m-3"
                        onClick={handleAddToWishlist}
                      >
                        <i className="fa-regular fa-heart"></i> উয়িসলিস্ট
                      </button>                   
                  </div>
                  <div className="social-icon">
                      <a href="#0"><i className="fa-brands fa-facebook-f facebook"></i></a>
                      <a href="#0"><i className="fa-brands fa-twitter twitter"></i></a>
                      <a href="#0"><i className="fa-brands fa-linkedin-in linkedin"></i></a>
                      <a href="#0"><i className="fa-brands fa-instagram instagram"></i></a>
                      <a href="#0"><i className="fa-brands fa-youtube youtube"></i></a>
                  </div>
              </div>
            </div>
          </div>
            {product.description ? (
              <div className="product-description my-5">
                <div className="container">
                  <p className="heading-text ">Description</p>
                  <div className="heading-border"></div>
                  <div className="desc">
                      {/* format to html  */}
                      <div dangerouslySetInnerHTML={{ __html: product.description }} />                  
                      {/* <p className='mt-3'><span>সতর্কতা:</span> --</p> */}
                  </div>  
                </div>
              </div>  
            ): (
              null
            )}
                  
        </div>
      </section>

      {/* ----------Call To Action Start ----------*/}
      <section className="call-to-action my-1">
          <div className="action">
          <div className="container">
              <div className="bg-image h-100">
              <div className="row">
                  <div className="col-md-8 action-left">
                  <h1><span>আপনার সমস্ত</span> প্রয়োজন <span>পূরণ করুন!</span></h1>  
                    <button><span>সেরা দামে </span><span></span></button>
                  </div>
                  <div className="col-md-4 action-right d-flex align-items-center justify-content-center">
                  <img src="assets/img/call-to-action/action-image.png" alt="" />
                  </div>
              </div>
              </div>
          </div>
          </div>
      </section>

        {/* ----------Related Products Start ---------- */}
        {}
        <section className="related-product card-design my-5">
            <div className="container">
                {/* <p className="heading-text-center text-center">Related Products</p> */}
                {/* <div className="heading-border"></div> */}
                <div className="row">
                  {/* <div className="col-lg-3 col-md-6 col-sm-12 my-2">
                    <a href="/product-details">
                      <div className="card">
                        <span className="stock-btn">Stock</span>
                        <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                          <img src={`${config.fileUrl}products/product-1.jpg`} alt="" className="img-fluid p-2"/>
                        </div>
                        <div className="card-body">
                          <h6>খাটি সরিষার তেল</h6>
                          <p>M&S Food</p>
                          <div className="price-cart d-flex justify-content-between">
                            <ul className="price list-unstyled d-flex gap-2 m-0">
                                <li><del>&#2547; ২২০</del></li>
                                <li>&#2547; ২০০</li>
                            </ul>
                            <ul className="cart list-unstyled d-flex gap-2 m-0">
                              <li><a href="/cart"><i className="fa-solid fa-cart-plus"></i></a></li>
                              <li><a href="/cart"><i className="fa-regular fa-heart"></i></a></li>
                            </ul>
                          </div> 
                        </div>
                      </div>
                    </a>
                  </div> */}
                  {Array.isArray(product) && product.map((product) => (
                  // is_top=0, is_featured=0, is_offered=0 then 
                  // product.is_top?0:product.is_featured?0:product.is_offered?0:
                        <div className="col-lg-4 col-md-4 col-sm-12 my-2 m-auto" key={product.id}>
                            <div className="card">
                                <Link to={`/product-details/${product.id}`}>
                                    {/* <span className="stock-btn">Stock</span> */}
                                    <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                                        <img src={`${config.fileUrl1}${product.thumb}`} key={product.id} alt="" className="img-fluid p-2" />
                                    </div>
                                    <div className="card-body">
                                        <h6>{product.name}</h6>
                                        <div className="price-cart d-flex justify-content-between">
                                            <ul className="price list-unstyled d-flex gap-2 m-0">
                                                {product.price ? (<li>&#2547; {formatter.format(product.price)}</li>) : (<li>--</li>)}
                                            </ul>
                                            <ul className="cart list-unstyled d-flex gap-2 m-0">
                                                <li><a href="/cart"><i className="fa-solid fa-cart-plus"></i></a></li>
                                                <li><a href="/cart"><i className="fa-regular fa-heart"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                      ))}
                </div>    
            </div>
        </section>

    </div>
  );
};

export default ProductDetails;