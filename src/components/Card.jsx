import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import '../styles/Card.css';

const Card = ({ id, image, name, price }) => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Get user from useAuth

    const addToCart = (navigateToCart) => {
        if (!user) { // Check if user is not logged in
            toast.info('Please log in to add items to your cart.');
            navigate('/login');
            return;
        }

        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const newItem = { id, image, name, price, quantity: 1, totalPrice: parseFloat(price.replace('$', '')) };
        const existingItemIndex = cartItems.findIndex(item => item.name === newItem.name);

        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += 1;
            cartItems[existingItemIndex].totalPrice += newItem.totalPrice;
        } else {
            cartItems.push(newItem);
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.dispatchEvent(new Event('storage')); // Update the cart across sessions/pages
        toast.success('Item added to cart!', {
            position: "bottom-center", // Position the toast at the bottom-center
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        if (navigateToCart) {
            navigate('/cart'); // Navigate to the cart page after adding the item
        }
    };

    return (
        <div className="card" onClick={() => navigate(`/product/${encodeURIComponent(name)}`)}>
            <img src={image} alt={name} className="card-image" />
            <div className="card-details">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <div className="card-actions">
                <button className="buy-button" onClick={(e) => {
                    e.stopPropagation();
                    addToCart(true); // Pass true to navigate to the cart
                }}>Buy Now</button>
                <button className="cart-button" onClick={(e) => {
                    e.stopPropagation();
                    addToCart(false); // Pass false to not navigate (just add to cart)
                }}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Card;
