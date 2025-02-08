// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/HomePage/Home';
import AboutUs from './components/AboutUsPage/AboutUs';
import Product from './components/ProductPage/Product';
import Search from './components/ProductPage/Search';
import Contact from './components/ContactPage/Contact';
import Brand from './components/BrandPage/Brand';
import ProductDetails from './components/ProductPage/ProductDetails';
import Cart from './components/CartPage/Cart';
import CartCheckout from './components/CartPage/Checkout';
import Invoice from './components/OrdersPage/Invoice';
import OrderTrackInvoice from './components/OrdersPage/OrderTrackInvoice';
import Registartion from './components/AccountInfoPage/Registration';
import Login from './components/AccountInfoPage/Login';
import Password from './components/AccountInfoPage/Password';
import DashboardInfo from './components/AccountInfoPage/DashboardInfo';
import UpdateProfile from './components/AccountInfoPage/UpdateProfile';
import DashboardOrder from './components/AccountInfoPage/DashboardOrder';
import CallToAction from './components/HomePage/Sections/CallToAction';
import TermsConditions from './components/PrivacyAndTerms/TermsCondition';
import PrivacyPolicy from './components/PrivacyAndTerms/PrivacyPolicy';
import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/BlogPage/Blog';
import BlogDetails from './components/BlogPage/BlogDetails';
import ProductUpload from './components/AccountInfoPage/ProductUpload';

const App: React.FC = () => {
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');  
    if (!token && !userData) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  const PrivetAdminRouter = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || '');
    console.log('userData headersaf sdflkjsdflk', userData);
    const allowedTypes = ['ADMIN', 'SUPERADMIN'];

    if (!allowedTypes.includes(userData.type)) {
      return <Navigate to="/dashboard-info" replace />;
    }
    return children;
  };

  const AuthoCheckRouter = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : null;
    if (token && userData) {
      return <Navigate to="/dashboard-info" replace />;
    }
    return children;
  }


  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/product/:categoryname" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product-details/:id" element={<ProductDetails />}  />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CartCheckout />} />
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/order-track-invoice" element={<OrderTrackInvoice />} />
         
          <Route path="/call-to-action" element={<CallToAction />} />
          <Route path="/brands" element={<Brand />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
          
          
          <Route path="/registration"
           element={
            <AuthoCheckRouter>
              <Registartion />
           </AuthoCheckRouter>
          }
            />
          <Route path="/login" 
          element={
            <AuthoCheckRouter>
              <Login />
            </AuthoCheckRouter>
          } />
          {/* if local storage have the token then go to dashboard other wise redirect the login */}
          <Route path="/password" 
          element={
            <PrivateRoute>
              <Password />
            </PrivateRoute>
          } />
          <Route path="/dashboard-info" 
          element={
            <PrivateRoute>
              <DashboardInfo />
            </PrivateRoute>
          } />
          <Route path="/update-profile" 
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          } />
          <Route path="/product-upload" 
          element={
            <PrivetAdminRouter>
              <ProductUpload />
            </PrivetAdminRouter>
          } />
          <Route path="/dashboard-order" 
          element={
            <PrivateRoute>
              <DashboardOrder />
            </PrivateRoute>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;