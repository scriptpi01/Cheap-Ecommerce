import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import SearchPage from './pages/BuyerSearchResults';
import MySales from './pages/MySales';
import BuyerSearchResults from './pages/BuyerSearchResults';
import SellerSearchResults from './pages/SellerSearchResults';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Cart from './pages/Cart';
import ProductDetails from './components/ProductDetails';
import Chat from './components/Chat';
import Welcome from './pages/Welcome';
import RegistrationSuccess from './pages/RegistrationSuccess';
import MyAccount from './pages/MyAccount';  // Import MyAccount
import MyPurchases from './pages/MyPurchases';  // Import MyPurchases
import Settings from './pages/Settings';  // Import Settings
import CheckoutSuccess from './pages/CheckoutSuccess'; 
import Home1 from './pages/Home1';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Chat />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home1" element={<Home1 />} />
          {/* <Route path="/search/:searchTerm" element={<SearchPage />} /> */}
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
      </AuthProvider>
    </Router>
  );
};

export default App;
