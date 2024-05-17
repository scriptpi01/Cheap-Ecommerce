import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import '../styles/MySales.css';

const MySales = () => {
    const { user } = useAuth();
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            if (user) {
                const salesRef = collection(db, 'Sales');
                const q = query(salesRef, where('sellerUsername', '==', user.username));
                const querySnapshot = await getDocs(q);

                const salesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setSales(salesList);
            }
        };

        fetchSales();
    }, [user]);

    const handleDelete = async (saleId) => {
        try {
            await deleteDoc(doc(db, 'Sales', saleId));
            setSales(sales.filter(sale => sale.id !== saleId));
        } catch (error) {
            console.error("Error deleting sale: ", error);
        }
    };

    return (
        <div className="sales-container">
            <div className='aa'><h1>My Sales</h1></div>
            {sales.length > 0 ? (
                sales.map(sale => (
                    <div key={sale.id} className="order-card">
                        <div className="order-header">
                            <h2>Order ID: {sale.id}</h2>
                            <button className="delete-button1" onClick={() => handleDelete(sale.id)}>X</button>
                        </div>
                        <p><strong>Date:</strong> {sale.orderDate.toDate().toLocaleString()}</p>
                        <p><strong>Total Amount:</strong> ${sale.totalAmount.toFixed(2)}</p>
                        <p><strong>Status:</strong> {sale.status}</p>
                        <div className="order-items">
                            {sale.orderItems.map((item, index) => (
                                <div key={index} className="order-item">
                                    <p><strong>{item.product_name}</strong> - ${item.price.toFixed(2)} x {item.quantity} = ${item.total.toFixed(2)}</p>
                                    <p><strong>Buyer:</strong> {sale.buyerUsername}</p>
                                    <p><strong>Address:</strong> {item.address}</p>
                                </div>
                            ))}
                        </div>
                        <p className="total"><strong>Total Cost:</strong> ${sale.totalAmount.toFixed(2)}</p>
                    </div>
                ))
            ) : (
                <p>No sales found for {user?.username}.</p>
            )}
        </div>
    );
};

export default MySales;
