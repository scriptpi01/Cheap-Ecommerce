import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import '../styles/MyPurchases.css';  // Ensure correct path

const MyPurchases = () => {
    const { username } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(collection(db, 'Orders'), where('username', '==', username));
            const querySnapshot = await getDocs(q);

            const orderList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setOrders(orderList);
        };

        fetchOrders();
    }, [username]);

    const handleDelete = async (orderId) => {
        try {
            await deleteDoc(doc(db, 'Orders', orderId));
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error("Error deleting order: ", error);
        }
    };

    return (
        <div className="purchases-container">
            <div className='aa'><h1>My Purchases</h1></div>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <h2>Order ID: {order.id}</h2>
                            <button className="delete-button1" onClick={() => handleDelete(order.id)}>X</button>
                        </div>
                        <p><strong>Date:</strong> {order.orderDate.toDate().toLocaleString()}</p>
                        <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <div className="order-items">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="order-item">
                                    <p><strong>{item.product_name}</strong> - ${item.price.toFixed(2)} x {item.quantity} = ${item.total.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <p className="total"><strong>Total Cost:</strong> ${order.totalAmount.toFixed(2)}</p>
                    </div>
                ))
            ) : (
                <p>No purchases found for {username}.</p>
            )}
        </div>
    );
};

export default MyPurchases;
