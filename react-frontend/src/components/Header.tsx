import axios  from 'axios';
import React, { useEffect, useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';
import { CategoryContext } from '../components/CategoryContext';
import Cart from './Cart';
import WishList from './WishList';
import { useSelector, useDispatch } from "react-redux";
import { selectTotalQuantity } from "../store/cartSlice";
import { clearAuthData, setAuthData } from '../store/authSlice';
import { copyFile } from 'fs';
import { clearCart } from "../store/cartSlice";
import { json } from 'stream/consumers';
import { RootState } from "../store";
import { clearWishlist } from '../store/wishlistSlice';
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
    copyright_text: string;
}
interface Category {
    id: number;
    name: string;
    description: string;
    thumb: string;
    status: number;
    user_id: number;
    store_id: number;
}

interface UserData {
    type: string;
    name: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    // other properties...
  }

const Header: React.FC = () => {
    // hooks
    const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
    const [categoryData, fetchCategoryData ] = useState<Category[]>([]);
    const [isToggled, setIsToggled] = useState(false);
    const dispatch = useDispatch();
    const totalQuantity = useSelector(selectTotalQuantity);
    const userData2 = useSelector((state: RootState) => state.auth.user);
    
    const navigate = useNavigate();
    //function for siteinfo
    const fetchSiteInfo = async () => {
        try {
            const response = await axios.get<{ data: SiteInfo }>(config.apiUrl+'siteinfo');
            if (response.status === 200) {
                setSiteInfo(response.data.data);    
                console.log('siteinfo',siteInfo);    
            } else {
                console.error('Failed to fetch site information');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleToggle = () => {
        setIsToggled((prev) => !prev);
    };
    const updateLoacalStorage = () => {
        // update the cart in local storage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        console.log('cart header', cart);
        // Update the cart logic here
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('cart header after update', localStorage.getItem('cart'));

        const loadCart = () => {
          const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCart(storedCart);
        };
    
        // Load cart on mount
        loadCart();
    
        // Listen for storage events
        const handleStorageChange = (event: StorageEvent) => {
          if (event.key === "cart") {
            loadCart();
          }
        };
    
        window.addEventListener("storage", handleStorageChange);
    
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      };

    

    const fetchCategory = async () => {
        try {
          const response = await axios.get(config.apiUrl+'category');
          console.log('category', response.data.data.data);
          if (response.status === 200) {
            fetchCategoryData(response.data.data.data);
          } else {
            console.error('Failed to fetch site information');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    const userdata = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        fetchSiteInfo(); 
        fetchCategory();
        if(token && userdata) {
            setUserData(userdata);
        }
        // if (fetchCategoryData()) {
        //     // fetchCategoryData(); 
        //     console.log('categoryData_header', categoryData);
        // }     
              
    },[]); 
      const [cart, setCart] = useState([]);
    
      // Fetch cart data from localStorage
    

    
      const handleRemoveProduct = (id: React.Key | null | undefined) => {
        if (id !== null && id !== undefined) {
          const updatedCart = cart.filter(
            (product) => (product as { id: React.Key | null | undefined }).id !== id
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCart(updatedCart);
        }
      };
      
      const handleClearCart = () => {
        dispatch(clearCart());
      };
      const handleClearWishlist = () => {
        dispatch(clearWishlist());
      };
    
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);    

    const handleLogout = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(config.apiUrl + 'logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          //store the token in local storage
          // Clear Redux state
         dispatch(clearAuthData());
          // localStorage.removeItem('token');
          //store the loggedinUser data in local storage
          // localStorage.removeItem('user');
          //with out reload the page go to the dashboard-info
          navigate('/login');
          // console.log('Login successful', localStorage.getItem('token'), localStorage.getItem('user'));
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      } finally {
        setLoading(false);
      }
    };
    const [query, setQuery] = useState('');
  
    const handleSearch = () => {
      if (query.trim()) {
        navigate(`/product?search-key=${encodeURIComponent(query.trim())}`);
      }
    };
    const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
  
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setShow(false); // Hide on scroll down
        } else {
          setShow(true); // Show on scroll up
        }
  
        setLastScrollY(currentScrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [lastScrollY]);
    return (
        <div className="App">
            <div className={`header ${show ? 'visible' : 'hidden'}`}>
                <section className="header-top">
                    <div className="container">
                        <div className="manu-area d-flex justify-content-between align-items-center">
                         <button onClick={handleToggle} className='d-xl-none d-block menu-open-btn p-2'><img src="assets/img/menu-icon.png" alt="" /></button>
                            <div className="contact w-xl-100">
                                {siteInfo && (
                                    <Link to={`tel: ${siteInfo && siteInfo.phone}`}>
                                        <i className="fa-solid fa-phone"></i>
                                        {siteInfo && siteInfo.phone}
                                    </Link>
                                )}                           
                            </div>  
                            <div className="navmanu w-xl-100 h-0 w-100" >
                                <div className={`navlist p-0 m-0${isToggled ? ' open' : ''}`}>
                                    <div className="close-btn d-flex justify-content-end d-xl-none">                                        
                                        <button onClick={handleToggle} className='d-xl-none d-block close-btn-img pt-3'><i className="fa-solid fa-circle-xmark"></i></button>
                                    </div>  
                                    <ul className='nav-menu-list'>
                                        <li><Link to="/">হোম</Link></li>
                                        {/* <li><Link to="/brands">ব্রান্ড</Link></li> */}
                                        <li>
                                            <Link to="/product" className="accordion-icon">দোকান </Link>
                                            {/* <Link to="/product" className="accordion-icon">পণ্য <i className="fa-solid fa-sort-down"></i></Link> */}
                                            {/* <div className="dropdown">
                                                <div className="row">
                                                    {categoryData && categoryData.map((category, index) => (
                                                        <div key={index} className="col-xl-3 col-sm-12">
                                                            <ul>
                                                                <li key={index}>
                                                                    {/* <Link to={`/product/${category.name.toUpperCase()}`}>{category.name}</Link> 
                                                                    <Link to={`/product/${category.id}`}>{category.name}</Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div> */}
                                        </li>
                                        <li><Link to="/blog">ডিসকাউন্ট</Link></li>
                                        <li><Link to="/contact-us">এক বক্স ভালোবাসা</Link></li>
                                    </ul>                         
                                </div>
                            </div>
                            <div className="shiping-content d-flex justify-content-end w-100">
                                <p className="mb-0 word-wrap"> এখনি অ্যাফিলিয়েট করুন <i className="fa-solid fa-truck-fast"></i></p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="header-bottom py-2">
                    <div className="container">
                        <div className="second-menu d-flex justify-content-between align-items-center">
                            <div className="logo">
                                <Link to="/"><img className="img-fluid btn" src={`${config.fileUrl}logo.png`} alt="" /></Link>
                            </div>                      
                            <div className="input-box d-flex align-items-center justify-content-center  h-100">
                                <input type="text" className="form-control input-design" placeholder="আপনার পণ্যটি  খুজুন ....." value={query}  onChange={(e) => setQuery(e.target.value)} />
                                <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
                            </div>
                            <div className="header-icon d-flex align-items-center justify-content-end h-100">
                                { userData2 ? 
                                <div>
                                    <button className="dropdown-toggle btn p-0" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-user-check"></i></button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li style={{ fontSize: '0.768rem'}}><span className="dropdown-item">{userData2.name}</span></li>
                                            <li><Link className="dropdown-item" to="/dashboard-info" style={{ fontSize: '0.768rem'}}>ড্যাশবোর্ড</Link></li>
                                            <li><Link className="dropdown-item" to="/register" style={{ fontSize: '0.768rem'}}>স্টোর তৈরি করুন</Link></li>
                                            <li><button className="dropdown-item" onClick={handleLogout} style={{ fontSize: '0.768rem'}}>Logout</button></li>
                                        </ul>
                                </div>: 
                                // dropdown of user
                                <div>
                                    <Link to="/login" className='btn p-0'><i className="fa-regular fa-user"></i></Link>
                                    {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><Link className="dropdown-item" to="/login" style={{ fontSize: '0.768rem'}}>লগইন</Link></li>
                                        <li><Link className="dropdown-item" to="/register" style={{ fontSize: '0.768rem'}}>রেজিস্ট্রেশন</Link></li>
                                        <li><Link className="dropdown-item" to="/register" style={{ fontSize: '0.768rem'}}>স্টোর তৈরি করুন</Link></li>
                                    </ul> */}
                                </div>
                                }
                                {/* <Link to="/favorite"><i className="fa-regular fa-heart"></i></Link> */}
                                <button className='position-relative btn p-0'  data-bs-toggle="modal" data-bs-target="#exampleModal2"><i className="fa-regular fa-heart"></i> 
                                    {
                                        wishlistCount > 0 && (
                                        <span className="cart-badge">{wishlistCount}</span>
                                    )}
                                </button>
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={updateLoacalStorage} className='position-relative btn p-0'>
                                    <i className="fa-solid fa-cart-plus"></i>
                                    {totalQuantity > 0 && (
                                        <span className="cart-badge">{totalQuantity}</span>
                                    )}
                                </button>
                                {/* modal of cart */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <hr className="m-0" />
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">কার্ট</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <Cart />
                                {/* {cart.length > 0 ? (
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>পণ্যের নাম</th>
                                            <th>পরিমাণ</th>
                                            <th>মূল্য</th>
                                            <th>মোট</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {cart.length > 0 ? (
                                        cart.map(
                                        (product: {
                                            id: React.Key | null | undefined;
                                            name: string;
                                            quantity: number;
                                            price: number;
                                            totalPrice: number;
                                        }) => (
                                            <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.price}</td>
                                            <td>{product.totalPrice}</td>
                                            <td>
                                                <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemoveProduct(product.id)}
                                                >
                                                Remove
                                                </button>
                                            </td>
                                            </tr>
                                        )
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan={5}>Your cart is empty.</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                ) : (
                                    <p className='text-center fs-4'>কার্টে পণ্য নেই</p>
                                )
                                } */}
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleClearCart} className="btn btn-secondary text-white" data-bs-dismiss="modal" aria-label="Close" disabled={cart.length === 0}>কার্ট মুছে ফেলুন</button>
                                <Link to="/checkout" className={cart.length === 0 ? 'disabled pointer-events-none' : ''} onClick={(e) => cart.length === 0 && e.preventDefault()} ><span data-bs-dismiss="modal" className="theme-btn">Check out</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal of wishlist */}
                <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">পছন্দের পণ্য</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <WishList />
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleClearWishlist} className="btn btn-secondary text-white"  data-bs-dismiss="modal" aria-label="Close">কার্ট মুছে ফেলুন</button>                                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Header;
