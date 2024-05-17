import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
    const { productName } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            const q = query(collection(db, 'Products'), where('product_name', '==', productName));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setProduct(querySnapshot.docs[0].data());
            } else {
                toast.error('Product not found', {
                    position: "bottom-center", // Position the toast at the bottom-center
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/'); // Redirect to home or an appropriate page
            }
        };

        fetchProduct();
    }, [productName, navigate]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const addToCart = (navigateToCart) => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const newItem = {
            image: product.imageUrl,
            name: product.product_name,
            price: `$${product.price}`,
            quantity: quantity,
            totalPrice: parseFloat(product.price) * quantity
        };
        const existingItemIndex = cartItems.findIndex(item => item.name === newItem.name);

        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += quantity;
            cartItems[existingItemIndex].totalPrice = parseFloat(product.price) * cartItems[existingItemIndex].quantity;
        } else {
            cartItems.push(newItem);
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.dispatchEvent(new Event('storage'));
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
            navigate('/cart');
        }
    };

    const handleQuantityChange = (delta) => {
        const newQuantity = Math.max(1, quantity + delta);
        setQuantity(newQuantity);
    };

    return (
        <div className="product-container">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.product_name} />
            </div>
            <div className="product-info">
                <h1>{product.product_name}</h1>
                <h2>${product.price}</h2>
                <p>Defect / Expired Date: {product.defect_exp_date}</p>
                <p>Seller: {product.username || 'Unknown'} <br/> Description: {product.product_detail}</p> {/* Updated seller information */}
                <div className="quantity-controls-product">
                    <button onClick={() => handleQuantityChange(-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
                <div className="actions">
                    <button onClick={() => addToCart(true)} className="buy-now">Buy Now</button>
                    <button onClick={() => addToCart(false)} className="add-to-cart">Add to Cart</button>
                </div>
            </div>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default ProductDetails;
