import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config';
import { CategoryContext } from '../../components/CategoryContext';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist } from '../../store/wishlistSlice';
import { useSearchParams } from 'react-router-dom';

interface ProductArray {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  thumb: string;
  images: string[]; // assuming images are strings
  price: number | null; // assuming price can be null
  unit: string;
  is_featured: number;
  is_offered: number;
  category_id: number;
  user_id: number;
  status: string;
}

interface Category {
  id: number;
  name: string;
}
interface ProductProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  thumb: string;
}

const App: React.FC = () => {
  const [catDataById, setCatDataById] = useState<Category[]>([]);
  const [categoryData, fetchCategoryData ] = useState<Category[]>([]);
  const [productArray, setProductArray] = useState<ProductArray[]>([]);
  const [loading, setLoading] = useState(false);
  
  const formatter = new Intl.NumberFormat('bn-BD');

  const fetchCategoryById = async (catObj: Category) => {
    try {
      // setLoading(true);
      const response = await axios.get(config.apiUrl + 'category/' + catObj.id);    
      if (response.status === 200) {
        setCatDataById(response.data.data.data);
        fetchProductData();
        // setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };
  const fetchCategory = async () => {
    try {
      // setLoading(true);
      const response = await axios.get(config.apiUrl+'category');
      console.log('category', response.data.data.data);
      if (response.status === 200) {
        fetchCategoryData(response.data.data.data);
        // setLoading(false);
      } else {
        console.error('Failed to fetch site information');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    const urlParams = new URLSearchParams(window.location.search);

  const fetchProductData = async () => {
    let response;
    try {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      if( urlParams.get('search-key')) {
        response = await axios.get<{ data: { data: ProductArray[] } }>(config.apiUrl+'product', {
          params: { 'search-key': urlParams.get('search-key'), size: 100, page: 1 },
        })
      }
      else if(urlParams.get('category')) {
        response = await axios.get<{ data: { data: ProductArray[] } }>(config.apiUrl+'product', {
          params: { category: urlParams.get('category'), size: 100, page: 1 },
        })
      }

      else {
        response = await axios.get<{ data: { data: ProductArray[] } }>(config.apiUrl+'product');
      }
      if (response.status === 200) {
        setProductArray(response.data.data.data); 
        setLoading(false);
      } else {
        console.error('Failed to fetch product data');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const { search } = useParams();
  useEffect(() => {
    if (search) {
      fetchProductData();
    }
  }, [search]);

  useEffect(() => {
    fetchProductData();
    // fetchCategoryData(); 
    fetchCategory();
  }, [0]);

  useEffect(() => {
    fetchProductData();
  }, [urlParams.get('category')]);

   const [searchParams] = useSearchParams();
  const query = searchParams.get('search-key'); // Get the 'query' parameter from URL
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (query) {
          const response = await axios.get(config.apiUrl + 'product', {
            params: { 'search-key': query, size: 100, page: 1 },
          });
          if (response.status === 200) {
            setProductArray(response.data.data.data);
          } else {
            console.error('Failed to fetch product data');
          }
        } else {
          console.warn('No query provided');
          setProductArray([]); // Clear the results if no query is provided
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData(); // Call the function whenever 'query' changes
  }, [query]); // 'query' is a dependency for the useEffect
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
      <div className="product-page py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <p className="heading-text">ক্যাটাগরী </p>
              <div className="heading-border"></div>
              <div className="category-link">
                <ul className="p-0">
                <li>
                  <Link to="/product" onClick={() => {
                    // Clear the category parameter
                    urlParams.delete('category');
                    // Call fetchProductData
                    fetchProductData();
                  }}>
                    সবগুলি
                  </Link>
                </li>
                    {categoryData.map((categoryItem) => (
                      <li key={categoryItem.id}>
                        {/* call fetchCategoryById(categoryItem.id)  */}
                        <Link to={`/product?category=${categoryItem.id}`} onClick={() => fetchCategoryById(categoryItem)}>{categoryItem.name}</Link>
                        {/* <link to={`/product/${categoryItem.id}`}>{categoryItem.name}</link> */}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-md-9 col-sm-12">
              <p className="heading-text">
              {categoryData.find(category => category.id === parseInt(urlParams.get('category') ?? ''))?.name || 'সবগুলি'}
              </p>
              <span></span>
              <div className="heading-border"></div>
              <section className="products-area card-design">
                    <div className="container">
                      <div className="row">
                        {loading ? (
                          <div className='text-center'>
                            <span className='spinner-border spinner-border-sm'></span>
                          </div>
                        ): (
                          <>
                            {productArray.length > 0 ? (
                              <>
                                {Array.isArray(productArray) && productArray.map((product) => (
                                // product.is_featured==0 and productArray.is_offered==0 condition 
                                // product.is_featured==0 && product.is_offered==0 &&              
                                  <div className="col-lg-4 col-md-4 col-sm-12 my-2 m-auto" key={product.id}>
                                      <div className="card">
                                          <Link to={`/product-details/${product.id}`}>
                                              {/* <span className="stock-btn">Stock</span> */}
                                              <div className="card-image hover-overlay ripple" data-mdb-ripple-color="light">
                                                  <img src={`${config.fileUrl1}${product.thumb}`} key={product.id} alt="" className="img-fluid p-2" />
                                              </div>
                                          </Link>
                                            <div className="card-body">
                                                <h6>{product.name}</h6>
                                                {/* cat: {product.category_id} */}
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
                                ))}
                              </>
                            ) : (
                              <div className="text-center">
                                <h4>কোনো পণ্য পাওয়া যায়নি</h4>
                              </div>
                            )}
                              
                          </>
                        )}

                      </div>
                    </div>
                  </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;