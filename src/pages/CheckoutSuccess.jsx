import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckoutSuccess.css';

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const cartItems = JSON.parse(localStorage.getItem('checkout_cart')) || []; // Access a separate localStorage key
    const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    const handleGoHome = () => {
        navigate('/home');
        localStorage.removeItem('checkout_cart'); // Clear the checkout data
    };

    return (
        <div className="checkout-success">
            <h1>Checkout Successful!</h1>
            <h2>Your order has been placed.</h2>
            <div className="order-details">
                {cartItems.map((item, index) => (
                    <div key={index} className="order-item">
                        <p>{item.name} - ${item.totalPrice.toFixed(2)}</p>
                    </div>
                ))}
                <p className="total">Total: ${totalAmount.toFixed(2)}</p>
            </div>
            <button style={{ backgroundColor: '#4C9A2A', color: 'white', padding: '10px 20px', borderRadius: '5px' }} onClick={handleGoHome}>
                Back to Home
            </button>
        </div>
    );
};

export default CheckoutSuccess;

