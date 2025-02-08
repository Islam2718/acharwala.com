import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import TopBar from './TopBar';
interface User {
  id: number;
  name: string;
  phone: string;
  phone_verified_at: string;
  email: string;
  firstname: string;
  lastname: string;
  profile_img: string | null;
  type: string;
  national_id_no: string | null;
  gender: string | null;
  dob: string | null;
  address: string | null;
  facebook_id: string | null;
  google_id: string | null;
  scopes: string | null;
  created_at: string;
  updated_at: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  dateofbirth: string | null;
  gender: string;
  user_id: number;
  store_id: number;
  created_at: string | null;
  updated_at: string | null;
}

interface OrderItem {
  id: number;
  buy_price: number;
  sell_price: number;
  quantity: number;
  discount: number | null;
  total: number;
  order_id: number;
  product_id: number;
  customer_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  product: Product[];
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  thumb: string;
  images: string | null;
  price: number;
  unit: string;
  is_top: number;
  is_featured: number;
  is_offered: number;
  status: number;
  category_id: number;
  user_id: number | null;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: number;
  invoice_no: string;
  customer_type: string;
  payment_method: string;
  total: number;
  discount: number;
  sub_total: number;
  payment: number;
  due: number | null;
  profit: number;
  vat: number;
  tax: number;
  status: number;
  customer_id: number;
  store_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  customer: Customer;
  order_items: OrderItem[];
}
const App: React.FC = () => {
  const [order, setOrder] = useState<Order[] | null>();
    const [loading, setLoading] = useState(false);
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.get( config.apiUrl + 'order');
      //response created_at and updated_at format change
      response.data.data.created_at = new Date(response.data.data.data.created_at).toLocaleString();
      response.data.data.updated_at = new Date(response.data.data.data.updated_at).toLocaleString();
      setOrder(response.data.data.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="App">
        <div className="dashboard-info info-nav py-5">
          <div className="container">
            <div className='row'>
                <div className='col-md-3'>
                  <TopBar />
                </div>
                <div className='col-md-9'>
                  <div className="table table-responsive py-4">
                  {loading ?<div className='text-center'><span className="spinner-border spinner-border text-center" role="status" aria-hidden="true" v-if={loading}></span></div> : 
                    <table className="table">
                      <thead className="thead w-100">
                        <tr className="text-left">
                          <th className="col-2">Order Id</th>
                          <th className="col-2 text-center">Date</th>
                          <th className="col-2 text-center">Total</th>
                          <th className="col-2 text-center">Status</th>
                          <th className="col-2 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody  className="tbody text-left">
                          { order && order?.map((item: any) => (
                            <tr className="py-5 justify-content-center align-items-center border-bottom" key={item.id}>
                              <td className="text-left col-2"> {item?.invoice_no}</td>
                              <td className="text-center col-2">{item?.created_at}</td>
                              <td className="text-center col-2">{item?.total}</td>
                              <td className="text-center col-2">{item?.status}</td>
                              <td className="text-center"><Link to={`../invoice/${item?.id}`} className="theme-btn">View</Link></td>
                            </tr>
                          ))}
                        
                      </tbody>
                    </table> 
                  }
                    {order && order?.length === 0 && <div className="text-center">No order found</div>}
                
                  </div>
              </div>
            </div>
           

          </div>
        </div>
    </div>
  );
}

export default App;