import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import '../styles/AddProductModal.css';
import { useAuth } from '../context/AuthContext';

const AddProductModal = ({ onSave, onClose, initialData }) => {
    const [product_name, setProductName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [product_detail, setProductDetail] = useState('');
    const [defect_exp_date, setDefectExpDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (initialData) {
            setProductName(initialData.product_name || '');
            setImageUrl(initialData.imageUrl || '');
            setPrice(initialData.price || '');
            setProductDetail(initialData.product_detail || '');
            setDefectExpDate(initialData.defect_exp_date || '');
            setQuantity(initialData.quantity || '');
        }
    }, [initialData]);

    const checkDuplicateProductName = async (name) => {
        const productsRef = collection(db, "Products");
        const q = query(productsRef, where("product_name", "==", name));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    };

    const handleSave = async () => {
        if (!user) {
            alert("You are not logged in!");
            return;
        }

        const isDuplicate = await checkDuplicateProductName(product_name);
        if (isDuplicate && (!initialData || initialData.product_name !== product_name)) {
            alert("A product with the same name already exists. Please use a different name.");
            return;
        }

        const productData = {
            product_name,
            imageUrl,
            price,
            product_detail,
            defect_exp_date,
            quantity: Number(quantity),
            username: user.username,
            uid: user.uid
        };

        try {
            // Check if initialData and initialData.id exist before attempting to update
            if (initialData && initialData.id) {
                const productRef = doc(db, "Products", initialData.id);
                await updateDoc(productRef, productData);
            } else {
                const productsCollectionRef = collection(db, "Products");
                await addDoc(productsCollectionRef, productData);
            }
            setShowSuccess(true);
            setTimeout(() => {
                onClose();
                onSave();
                window.location.reload(); // Reload the page after saving the product and closing the modal
            }, 2000);
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product: " + error.message);
        }
    };

    const isFormValid = () => {
        return product_name && imageUrl && price && product_detail && defect_exp_date && quantity;
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{initialData && initialData.id ? 'Edit Product' : 'Add Product'}</h2>
                <input type="text" placeholder="Product Name" value={product_name} onChange={e => setProductName(e.target.value)} />
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                <input type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                <textarea placeholder="Description" value={product_detail} onChange={e => setProductDetail(e.target.value)} />
                <input type="text" placeholder="Expiration Date" value={defect_exp_date} onChange={e => setDefectExpDate(e.target.value)} />
                <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
                <button onClick={handleSave} disabled={!isFormValid()}>Save Product</button>
                {showSuccess}
            </div>
        </div>
    );
};

export default AddProductModal;
