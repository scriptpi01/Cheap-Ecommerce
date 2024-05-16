import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Card from '../components/Card';
import '../styles/Home.css';

const BuyerSearchResults = () => {
    const { searchTerm } = useParams();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "Products"));
            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(products);
        };

        fetchProducts();
    }, []);

    // Filter items whenever the searchTerm or items list changes
    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = items.filter(item => item.product_name.toLowerCase().includes(lowerCaseSearchTerm));
        setFilteredItems(filtered);
    }, [searchTerm, items]);

    return (
        <div className="home">
            {filteredItems.map(item => (
                <Card key={item.id} image={item.imageUrl} name={item.product_name} price={`$${item.price}`} />
            ))}
        </div>
    );
};

export default BuyerSearchResults;
