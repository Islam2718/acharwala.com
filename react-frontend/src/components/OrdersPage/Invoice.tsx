import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, Link,  } from 'react-router-dom';
import config from '../../config';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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

  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>();
  const fetchOrder = async () => {
    try {
      const response = await axios.get( config.apiUrl + 'order/' + id);
      //response created_at and updated_at format change
      response.data.data.created_at = new Date(response.data.data.created_at).toLocaleString();
      response.data.data.updated_at = new Date(response.data.data.updated_at).toLocaleString();
      setOrder(response.data.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Adding footer
      // pdf.text("Thank you for your purchase!", pageWidth / 2, pageHeight - 20, {
      //   align: "center",
      // });
      // pdf.text("For inquiries, contact support@krishikhamar.com", pageWidth / 2, pageHeight - 15, {
      //   align: "center",
      // });
      pdf.save("krishikhamar_invoice.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };
  return (
    <div className="App">
        <div className="order-details py-5">
          <div className="container">
             <p className="heading-text"><i className="fa-solid fa-bag-shopping"></i> Order Details</p>
              <div className="heading-border"></div>
              <div className="row" ref={invoiceRef}>
                <p className="custom-thead mt-5">Order Information</p>
                <div className="order-info  px-5">

                  <div className="logo-detail">
                    <div className="row d-flex justify-content-between">
                      <div className="col-md-6 left">
                        <img src="https://krishikhamar.com/assets/img/logo.png" alt="" crossOrigin="anonymous"/>
                        <h6>KrishiKhamar</h6>
                        <p className="m-0">Address: <span>123 Street Name, City, Country</span></p>
                        <p className="m-0">Phone: <span> +123456789</span></p>
                      </div>
                      <div className="col-md-6 text-end m-0 right">
                        <p className="m-0">Order Number: {order?.invoice_no}</p>
                        <p className="m-0">Date: {order?.created_at}</p>
                      </div>
                    </div>
                  </div>
                  {/*---------------- billing info start ----------------- */}
                  <div className="billing-info mt-5">
                    <div className="row">
                      <div className="col-md-6 bi-left">
                        <h6>Billing Information</h6>
                        <p className="m-0">Full Name: <span>{order?.user?.name}</span></p>
                        <p className="m-0">Phone: <span>{order?.user?.phone}</span></p>
                        <p className="m-0">Address: <span>{order?.customer?.address} {order?.customer?.city} {order?.customer?.state} {order?.customer?.country}</span></p>
                      </div>
                      <div className="col-md-6 bi-rigth text-end">
                        <p className="m-0">Payment Type: <span>{order?.payment_method}</span></p>
                        <p className="m-0">Status: <span>{order?.status}</span></p>
                      </div>
                    </div>
                  </div>
                  {/*---------------- billing info end ----------------- */}
                  {/* ------------------ product table start ---------------- */}
                  <table className="table my-5">
                    <thead className="thead w-100">
                      <tr className="text-left">
                        <th className="text-left-col col-6">Product Name</th>
                        <th className="col-2 text-center">Unit Price</th>
                        <th className="col-2 text-center">Qty.</th>
                        <th className="col-2 text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody  className="tbody text-left">
                    {order && order?.order_items?.map((item: any) => {
                      return (
                        <tr className="py-5 justify-content-center align-items-center border-bottom" key={item.id}>
                          <td className="text-left col-6"> <img src={ config.fileUrl1 + item?.product?.thumb} alt="" crossOrigin="anonymous" /> {item?.product?.name}</td>
                          <td className="text-center col-2">{item?.product?.price}</td>
                          <td className="text-center col-2">{item?.quantity}</td>
                          <td className="text-center col-2">{item?.total}</td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>  
                  <div className='total-information'>
                    
                    <div className="text-end px-5">
                      <p className="m-0">Subtotal: <span className='fw-bold'>{order?.sub_total}</span></p>
                      <p className="m-0">Discount: <span className='fw-bold'>{order?.discount}</span></p>
                      <p className="m-0">Total: <span className='fw-bold'>{order?.total}</span></p>
                    </div> 
                  </div> 
                  <div className="invoice-footer text-center mt-5">
                    <hr />
                    <p className="m-0">Thank you for your purchase!</p>
                    <p className="m-0">For inquiries, contact us at support@krishikhamar.com</p>
                    <p className="m-0">Visit us: www.krishikhamar.com</p>
                  </div>
                  {/* ------------------ product table end ---------------- */}
                  {/* ------------------ shipping start ---------------- */}
                  {/* <div className="shipping-info mt-5">
                    <div className="container">
                      <div className="row ">
                        <h6 className=" p-0 my-3" >Shipping Information</h6>
                        <p className="m-0">Full Name: <span>John Doe</span></p>
                        <p className="m-0">Phone: <span>qQpFh@example.com</span></p>
                        <p className="m-0">Address: <span>1278, Test House, Test area City: Dhaka, State: Dhaka</span></p>
                      </div>
                    </div>
                  </div> */}
                  {/* ------------------ shipping end ---------------- */}
                  
                    {/* ----------Call To Action End ---------- */}
                    
                </div>
              </div>
              <div className="download-invoice mt-5 d-flex ">
                <button className="theme-btn" onClick={handleDownload}><i className="fa-solid fa-download"></i> Download Invoice</button>
                <button className="btn-cancle ms-3">Cancle</button>
              </div>
            {/* ----------Call To Action Start ----------*/}
            <section className="call-to-action mt-5">
                <div className="action">
                <div className="container">
                    <div className="bg-image h-100">
                    <div className="row">
                        <div className="col-md-8 action-left">
                        <h1><span>Fulfill</span> All Your <span>Needs !</span></h1>
                        <button><span>Best Deal </span> 20% <span>Off</span></button>
                        </div>
                        <div className="col-md-4 action-right d-flex align-items-center justify-content-center">
                        <img src="assets/img/call-to-action/action-image.png" alt="" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
          </div>
        </div>
    </div>
  );
}

export default App;