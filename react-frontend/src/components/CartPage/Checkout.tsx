import React, {useEffect, useState } from 'react';
import { clearCart, clearCart2, removeFromCart, decreaseQuantity, increaseQuantity, selectCartSubtotal } from "../../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "../../store";
import config from '../../config';
import axios from 'axios';
import { promiseHooks } from 'v8';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
interface ShippingInfo {
  id: number;
  type: string;
  title: string;
  shipping_from: string;
  shipping_to: string;
  charge: number;
}
const App: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartSubtotal = useSelector(selectCartSubtotal); // Get subtotal from selector

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleClearCart2 = () => {
    dispatch(clearCart2());
  };
  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo[]>([]);
  const fetchShipping = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}shipping-charge`);
      if (response.status === 200) {
        setShippingInfo(response.data.data);
        console.log('shipping', shippingInfo);
      }
      
    } catch (error) {
      console.error('Error fetching shipping info:', error);
      setShippingInfo([]);
    }
  }
useEffect(() => {
  fetchShipping();
}, []);

const [shippingCharge, setShippingCharge] = useState<number>(0);

const handleShippingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedCharge = Number(event.target.value); // Get the selected charge
  setShippingCharge(selectedCharge); // Update the state
  setFormData((prevFormData) => ({
    ...prevFormData,
    shipping_charge: selectedCharge,
  }))
};
const total = cartSubtotal + shippingCharge || 0;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    customer_type: 'ONLINE',
    postcode: '',
    password: '',
    confirmPassword: '',
    order_items: cartItems,
    sub_total: cartSubtotal,
    total: total,
    payment: 0,
    profit: 1,
    vat: 1,
    tax: 1,
    shipping_charge: 0,
    payment_method: '',
    customer_id: 1,
    user_id: 1,
    status: 1,
    note: '',
    cupon: '',
    discount: 0,
    store_id: 1
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
     console.log(formData);
      if (isChecked) {
        const response = await axios.post(config.apiUrl + 'register', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
          password_confirmation: formData.confirmPassword
        })
        if (response.status === 200) {
          formData.user_id = response.data.data.id;
          const responseorder = await axios.post(config.apiUrl + 'order', formData);
          if (responseorder.status === 201) {
            console.log('Order placed successfully', responseorder.data);
            // Clear the cart
            handleClearCart2();
            // success message tost
            toast.success('Order placed successfully');
            setFormData({
              name: '',
              email: '',
              phone: '',
              address: '',
              city: '',
              customer_type: 'ONLINE',
              postcode: '',
              password: '',
              confirmPassword: '',
              order_items: cartItems,
              sub_total: cartSubtotal,
              total: total,
              payment: 0,
              profit: 1,
              vat: 1,
              tax: 1,
              shipping_charge: 0,
              payment_method: '',
              customer_id: 1,
              user_id: 1,
              status: 1,
              note: '',
              cupon: '',
              discount: 0,
              store_id: 1
            });
            // navigate to invoice
            navigate('/invoice/' + responseorder.data.data.id);
          }
          
        } else {
          setError(response.data.message);
        }
      }
      else{
        const response = await axios.post(config.apiUrl + 'customer', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        })
        formData.customer_id = response.data.data.id;
        const responseorder = await axios.post(config.apiUrl + 'order', formData);
        if (response.status === 201) {
          console.log('Order placed successfully', responseorder.data);
          // Clear the cart
          handleClearCart2();
          // success message tost
          toast.success('Order placed successfully');
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            customer_type: 'ONLINE',
            postcode: '',
            password: '',
            confirmPassword: '',
            order_items: cartItems,
            sub_total: cartSubtotal,
            total: total,
            payment: 0,
            profit: 1,
            vat: 1,
            tax: 1,
            shipping_charge: 0,
            payment_method: '',
            customer_id: 1,
            user_id: 1,
            status: 1,
            note: '',
            cupon: '',
            discount: 0,
            store_id: 1
          });
          // navigate to invoice
          navigate('/invoice/' + responseorder.data.data.id);
        }
      }
      
      
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

// if shipping selected the charge will be addes in the cart subtotal

  return (
    
    <div className="App">
        <div className="shipping-details py-5">
          <div className="container">
            <p className="heading-text-center text-center">Shipping Details</p>
            <div className="heading-border"></div>
            <form action="" onSubmit={handleSubmit}> 
                <div className="row">
                <div className="col-md-6">
                  {/* ----------------shipping address start---------------- */}
                  <div className="shipping-address px-3">
                    <h6 className="py-4">Shipping Address</h6>
                    <div className='row'>
                      <div className="col-md-6 mb-4">
                        <input type="text" className="form-control input-design" placeholder="Name*"  onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                      </div>
                      <div className="col-md-6 mb-4">
                        <input type="email" className="form-control input-design" placeholder="Email*"  onChange={(event) => setFormData({ ...formData, email: event.target.value })}/>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input type="text" className="form-control input-design" placeholder="Phone*" required onChange={(event) => setFormData({ ...formData, phone: event.target.value })}/>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input type="text" className="form-control input-design" placeholder="City*"  onChange={(event) => setFormData({ ...formData, city: event.target.value })}/>
                      </div>
                      <div className="col-12 mb-4">
                        <textarea className="form-control input-text-area" id="inputAddress" placeholder="Address*" rows={3}  onChange={(event) => setFormData({ ...formData, address: event.target.value })}></textarea>
                      </div>
                      <div className="col-md-6 mb-4">
                        <input type="text" className="form-control input-design" placeholder="Postal Code*"  onChange={(event) => setFormData({ ...formData, postcode: event.target.value })}/>
                      </div>
                      <div className="col-md-6 mb-4">
                        <select className="form-select input-design" aria-label="Default select example" onChange={handleShippingChange} required>
                          <option selected>Select Shipping</option>
                          { shippingInfo && shippingInfo.map((shippingInfo) => (
                            <option value={shippingInfo.charge}>{shippingInfo.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12 mb-4">
                        <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineFormCheck"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          <label className="form-check-label" htmlFor="inlineFormCheck">
                            Create an account
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4" style={{display: isChecked ? 'block' : 'none'}}>
                        <input type="password " className="form-control input-design" placeholder="Password*" onChange={(event) => setFormData({ ...formData, password: event.target.value })}/>
                      </div>
                      <div className="col-md-6 mb-4" style={{display: isChecked ? 'block' : 'none'}}>
                        <input type="password" className="form-control input-design" placeholder="Confirm Password*" onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}/>
                      </div>
                    </div>
                  </div>
                  {/* ----------------shipping address end---------------- */}
                </div>
                <div className="col-md-6">
                  {/* ----------------cart details start---------------- */}
                  <div className="cart-details ">
                    <h6 className="py-3">Cart Details</h6>
                    <div className="cart-items">
                      <div>
                        {cartItems.length > 0 ? (
                          <ul style={{ listStyleType: "none", padding: 0 }}>
                            {cartItems.map((item) => (
                              <li
                                key={item.id}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: "10px",
                                  borderBottom: "1px solid #ccc",
                                  paddingBottom: "10px",
                                }}
                              >
                                <div>
                                  <img
                                    src={ config.fileUrl1 + item.thumb}
                                    style={{ maxWidth: "50px", marginRight: "10px" }}
                                  />
                                  {/* content length 10 caracter */}
                                  <strong className=''>{item.name.substring(0, 10) + (item.name.length > 10 ? '...' : '')}</strong>
                                </div>
                                <div>
                                <button
                                  className="btn btn-sm text-danger fw-bold"
                                  onClick={() => dispatch(decreaseQuantity(item.id))}
                                >
                                  -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                  className="btn btn-sm text-success fw-bold"
                                  onClick={() => dispatch(increaseQuantity(item.id))}
                                >
                                  +
                                </button>
                                  &nbsp; X &#2547;{item.price} ={" "}
                                  <strong>&#2547;{item.totalPrice}</strong>
                                  <button onClick={() => handleRemoveFromCart(item.id)} className="btn text-danger fw-bold p-1 fs-6" style={{ marginLeft: "10px" }}>
                                    X
                                  </button>
                                </div>
                                
                              </li>
                            ))}
                          </ul>
                          
                        ) : (
                          <p className="text-center fs-6 fw-bold">কার্টে কিছু নেই</p>
                        )}
                      </div>
                    </div>
                    <div className="custom-border my-3"></div>
                    <div className="cart-price-calculation my-4">
                      <div className="subtotal d-flex justify-content-between">
                          <p>Subtotal</p>
                          <h6>&#2547;{cartSubtotal} /=</h6>
                      </div>
                      <div className="coupon d-flex justify-content-between">
                        {shippingCharge > 0 ? (
                          <>
                            <p>Shipping Charge</p>
                            <h6><h6>{shippingCharge > 0 ? `${shippingCharge}/=` : "--/="}</h6></h6>
                          </>
                        ): (
                          null
                        )}
                        
                      </div>
                      <div className="coupon d-flex justify-content-between">
                        <div className='w-75 d-sm-flex d-none'></div>
                        <div className='input-group w-100'>
                          <input type="text" className="form-control input-design w-auto" placeholder="Cupon Code" />
                          <button className='btn theme-btn btn-sm' style={{padding: '6px 25px'}}>Apply Cupon</button>
                        </div>
                      </div>
                      <div className="total d-flex justify-content-between pt-3">
                          <p>Total</p>
                          <h6>{total}/=</h6>
                      </div>
                    </div>
                    <div className="col-md-12 p-0">
                      <textarea
                        className="form-control input-text-area"
                        placeholder="Note"
                      />
                    </div>
                    <h6 className="py-4">Payment</h6>
                    <div className="col-md-12">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="COD"
                          className="form-check-input"
                          defaultChecked
                          onChange={(event) => setFormData({ ...formData, payment_method: event.target.value })}
                        />
                        <label htmlFor="cod" className="form-check-label">
                          Cash on Delivery (COD)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="bkash"
                          name="paymentMethod"
                          value="Bkash"
                          className="form-check-input"
                          onChange={(event) => setFormData({ ...formData, payment_method: event.target.value })}
                        />
                        <label htmlFor="bkash" className="form-check-label">
                          Bkash
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="nagad"
                          name="paymentMethod"
                          value="Nagad"
                          className="form-check-input"
                          onChange={(event) => setFormData({ ...formData, payment_method: event.target.value })}
                        />
                        <label htmlFor="nagad" className="form-check-label">
                          Nagad
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="other"
                          name="paymentMethod"
                          value="Other"
                          className="form-check-input"
                          onChange={(event) => setFormData({ ...formData, payment_method: event.target.value })}
                        />
                        <label htmlFor="other" className="form-check-label">
                          Other
                        </label>
                      </div>
                    </div>
                    <div className="py-4">
                    <button type="submit" className={`theme-btn ${!(formData.name && formData.email && formData.phone && formData.order_items.length > 0) ? 'disabled' : ''}`} disabled={!(formData.name && formData.email && formData.phone && formData.order_items.length > 0) || loading}>
                    {loading ?<span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if={loading}></span> অপেক্ষা করুন</span> : 'Check Out'} 
                    </button>
                    </div>
                  </div>
                  {/* ----------------cart details end---------------- */}
                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}

export default App;