import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import './App.css';
const Home = lazy(() => import('./pages/Home'));
const MySales = lazy(() => import('./pages/MySales'));
const BuyerSearchResults = lazy(() => import('./pages/BuyerSearchResults'));
const SellerSearchResults = lazy(() => import('./pages/SellerSearchResults'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const Welcome = lazy(() => import('./pages/Welcome'));
const RegistrationSuccess = lazy(() => import('./pages/RegistrationSuccess'));
const MyAccount = lazy(() => import('./pages/MyAccount'));
const MyPurchases = lazy(() => import('./pages/MyPurchases'));
const Settings = lazy(() => import('./pages/Settings'));
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'));
const Home1 = lazy(() => import('./pages/Home1'));

const App = () => {
  return (
    <Router basename="/Cheap-Ecommerce">
      <AuthProvider>
        <Navbar />
        <Chat />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home1" element={<Home1 />} />
            <Route path="/buyer-search/:searchTerm" element={<BuyerSearchResults />} />
            <Route path="/seller-search/:searchTerm" element={<SellerSearchResults />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/product/:productName" element={<ProductDetails />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/my-account/:username" element={<MyAccount />} />
            <Route path="/my-purchases/:username" element={<MyPurchases />} />
            <Route path="/my-sales/:username" element={<MySales />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;
