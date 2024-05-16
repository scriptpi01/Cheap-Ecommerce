import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, updateDoc, addDoc, Timestamp } from 'firebase/firestore';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageUpdate = () => {
            setCartItems(JSON.parse(localStorage.getItem('cart')) || []);
        };

        window.addEventListener('storage', handleStorageUpdate);
        return () => window.removeEventListener('storage', handleStorageUpdate);
    }, []);

    const handleRemoveFromCart = (index) => {
        const newCartItems = cartItems.filter((_, i) => i !== index);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        setCartItems(newCartItems);
        window.dispatchEvent(new Event('storage'));
        toast.error('Item removed from cart!');
    };

    const handleQuantityChange = (index, delta) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity += delta;
        if (newCartItems[index].quantity < 1) {
            newCartItems[index].quantity = 1;  // Ensure you can't have less than 1 item
        }
        newCartItems[index].totalPrice = parseFloat(newCartItems[index].price.substring(1)) * newCartItems[index].quantity;  // Recalculate total price based on new quantity
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        setCartItems(newCartItems);
        window.dispatchEvent(new Event('storage'));
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.info("Your cart is empty.");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored in localStorage
            const orderItems = [];
            let totalAmount = 0;
            const sellerMap = new Map();

            // Update the quantities in the database before checkout
            for (const item of cartItems) {
                console.log(`Updating product: ${item.name}`);
                const q = query(collection(db, 'Products'), where('product_name', '==', item.name));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const productDoc = querySnapshot.docs[0];
                    const productData = productDoc.data();
                    const newQuantity = productData.quantity - item.quantity;

                    if (newQuantity < 0) {
                        toast.error(`Not enough stock for ${item.name}.`);
                        return;
                    }

                    await updateDoc(productDoc.ref, { quantity: newQuantity });
                    console.log(`Product ${item.name} updated successfully.`);

                    // Add item to orderItems array
                    const orderItem = {
                        product_name: item.name,
                        price: parseFloat(item.price.substring(1)),
                        quantity: item.quantity,
                        total: item.totalPrice,
                        seller: productData.username // Include seller's username directly in the item
                    };

                    orderItems.push(orderItem);
                    totalAmount += item.totalPrice;

                    // Group items by seller
                    if (!sellerMap.has(productData.username)) {
                        sellerMap.set(productData.username, []);
                    }
                    sellerMap.get(productData.username).push(orderItem);
                } else {
                    toast.error(`Product ${item.name} not found in the database.`);
                    return;
                }
            }

            // Create a new order document
            await addDoc(collection(db, 'Orders'), {
                uid: user.uid,
                username: user.username,
                orderDate: Timestamp.now(),
                totalAmount: totalAmount,
                status: 'completed',
                orderItems: orderItems
            });

            // Create separate sales records for each seller
            for (const [seller, items] of sellerMap.entries()) {
                const sellerTotalAmount = items.reduce((sum, item) => sum + item.total, 0);

                await addDoc(collection(db, 'Sales'), {
                    sellerUsername: seller,
                    orderDate: Timestamp.now(),
                    totalAmount: sellerTotalAmount,
                    status: 'completed',
                    orderItems: items,
                    buyerUsername: user.username
                });
            }

            localStorage.setItem('checkout_cart', JSON.stringify(cartItems)); // Save cart items for checkout display
            navigate('/checkout-success');  // Navigate to the checkout success page
            localStorage.removeItem('cart'); // Clear the cart
            window.dispatchEvent(new Event('storage')); // Trigger the storage event to update other components
            setCartItems([]); // Clear local state
            toast.success("Checkout successful!");
        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error("An error occurred during checkout. Please try again.");
        }
    };

    return (
        <div className="cart-container">
            <h1>Your Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <table className="cart-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button className="b" onClick={() => handleQuantityChange(index, -1)}>-</button>
                                    {item.quantity}
                                    <button className="b" onClick={() => handleQuantityChange(index, 1)}>+</button>
                                </td>
                                <td>${item.totalPrice.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleRemoveFromCart(index)} className="remove-button">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div className="total">
                Total: ${cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
            </div>
            <div className='c'>
                <button onClick={handleCheckout} className="checkout-button">Checkout</button>
            </div>
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover />
        </div>
    );
};

export default Cart;
