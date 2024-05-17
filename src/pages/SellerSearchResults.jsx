import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import Card1 from '../components/Card1';
import AddProductModal from '../components/AddProductModal';
import '../styles/Home1.css'; // Ensure the correct path
import { AuthContext } from '../context/AuthContext';

const SellerSearchResults = () => {
    const { searchTerm } = useParams();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            if (user && user.uid) {
                // Fetch all products for the logged-in user
                const productsCollectionRef = collection(db, "Products");
                const q = query(productsCollectionRef, where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setItems(products);
            }
        };

        fetchProducts();
    }, [user?.uid]);

    // Filter items based on the searchTerm
    useEffect(() => {
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = items.filter(item => 
                item.product_name.toLowerCase().includes(lowerCaseSearchTerm)
            );
            setFilteredItems(filtered);
        } else {
            setFilteredItems(items);
        }
    }, [searchTerm, items]);

    const openModalToEdit = (item) => {
        setEditItem(item);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditItem(null);  // Reset edit item on close
    };

    const handleSave = async (product) => {
        try {
            const productRef = doc(db, "Products", product.id);
            await updateDoc(productRef, product);
            setShowModal(false);
            // Refetch products to reflect changes
            const productsCollectionRef = collection(db, "Products");
            const q = query(productsCollectionRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(products);
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Product added/updated successfully!");
        }
    };

    return (
        <div className="home1">
            {filteredItems.map(item => (
                <Card1
                    key={item.id}
                    id={item.id}
                    name={item.product_name}
                    expired={item.defect_exp_date}
                    price={item.price}
                    quantity={item.quantity}
                    imageUrl={item.imageUrl}
                    onClick={() => openModalToEdit(item)}
                />
            ))}
            {showModal && <AddProductModal onSave={handleSave} onClose={handleClose} initialData={editItem} />}
        </div>
    );
};

export default SellerSearchResults;
