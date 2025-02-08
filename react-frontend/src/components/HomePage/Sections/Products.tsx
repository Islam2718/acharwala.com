import React, {useEffect, useState } from 'react';
import config from '../../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import { addToWishlist } from '../../../store/wishlistSlice';
interface ProductArray {
  quantity: any;
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

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {

  const [productArray, setProductArray] = useState<ProductArray[]>([]);
  const formatter = new Intl.NumberFormat('bn-BD');

  const fetchProductData = async () => {
    try {
      const response = await axios.get<{ data: { data: ProductArray[] } }>(config.apiUrl+'product?size=100&page=1');
        
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
  // const addToCart = (product: ProductArray) => {
  //   const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
  //   // Check if the product already exists in the cart
  //   const productExists = existingCart.some((existingProduct: ProductArray) => existingProduct.id === product.id);
  
  //   let updatedCart;
  
  //   if (productExists) {
  //     // Update quantity and totalPrice for existing product
  //     updatedCart = existingCart.map((existingProduct: ProductArray) => {
  //       if (existingProduct.id === product.id) {
  //         return {
  //           ...existingProduct,
  //           quantity: (existingProduct.quantity ?? 1) + product.quantity,
  //           totalPrice: (existingProduct.price ?? 0) * ((existingProduct.quantity ?? 1) + product.quantity),
  //         };
  //       } else {
  //         return existingProduct;
  //       }
  //     });
  //   } else {
  //     // Add the new product to the cart
  //     updatedCart = [
  //       ...existingCart,
  //       {
  //         ...product,
  //         totalPrice: (product.price ?? 0) * product.quantity,
  //       },
  //     ];
  //   }
  
  //   // Update localStorage
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   console.log("Cart updated successfully.");
  // };
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
        <div className="products my-5 mb-5">
          <div className="container">
          <p className="heading-text">প্রোডাক্ট সমূহ </p>
          <div className="heading-border"></div> 
            <div className="row">
            {/* {Array.isArray(productArray) && productArray.map((product) => ( */}
              {Array.isArray(productArray) && productArray.map((product) => (
                product.is_top ? (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-6 my-2 m-auto" key={product.id}>
                      <div className="card">
                              {/* <span className="stock-btn">Stock</span> */}
                            <Link to={`/product-details/${product.id}`}>
                              <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
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
                                          <li><button className='btn py-0 px-1 fs-5' onClick={() => handleAddToCart({ ...product, price: product.price ?? 0 })}><i className="fa-solid fa-cart-plus"></i></button></li>
                                          <li><button className='btn py-0 px-1 fs-5' onClick={() => handleAddToWishlist({ ...product, price: product.price ?? 0 }) }><i className="fa-regular fa-heart"></i></button></li>
                                      </ul>
                                  </div>
                              </div>
                      </div>
                  </div>
                ): 
                null
                ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Product;
