import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import Card1 from '../components/Card1';
import AddProductModal from '../components/AddProductModal';
import '../styles/Home1.css';
import { useAuth } from '../context/AuthContext';

const Home1 = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { user } = useAuth();
  const { searchTerm } = useParams(); // Retrieve the search term from the URL

  const fetchProducts = async () => {
    console.log("Fetching products for user:", user?.uid);
    if (user && user.uid) {
      const productsCollectionRef = collection(db, "Products");
      let q = query(productsCollectionRef, where("uid", "==", user.uid));

      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        console.log("Searching for products with name containing:", searchTerm);
        q = query(productsCollectionRef, 
          where("uid", "==", user.uid),
          where("product_name", ">=", lowerCaseSearchTerm),
          where("product_name", "<=", lowerCaseSearchTerm + '\uf8ff')
        );
      }

      const data = await getDocs(q);
      const products = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log("Products found:", products);
      setItems(products);
    } else {
      console.log("No user or user UID found");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user, searchTerm]); // Refetch products when user or searchTerm changes

  const openModalToAdd = () => {
    setEditItem({ product_name: '', price: '', product_detail: '', defect_exp_date: '', quantity: 0, imageUrl: '', uid: user.uid });
    setShowModal(true);
  };

  const openModalToEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleSave = async (product) => {
    try {
      if (product.id) {
        const productRef = doc(db, "Products", product.id);
        await updateDoc(productRef, product);
      } else {
        const productsCollectionRef = collection(db, "Products");
        await addDoc(productsCollectionRef, product);
      }

      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Product added/updated successfully!");
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="home1">
      {items.map(item => (
        <Card1 
          key={item.id} 
          id={item.id}
          name={item.product_name}
          expired={item.defect_exp_date}
          price={item.price}
          quantity={item.quantity}
          onClick={() => openModalToEdit(item)} 
        />
      ))}
      <div className="card1 add-new-product" onClick={openModalToAdd}>
        <div className="card1-image add-new-image"><span>+</span></div>
        <div className="card1-details"><div>Add New Product</div></div>
      </div>
      {showModal && <AddProductModal onSave={handleSave} onClose={handleClose} initialData={editItem} />}
    </div>
  );
};

export default Home1;
