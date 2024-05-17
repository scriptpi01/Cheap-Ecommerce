import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Card from '../components/Card';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Home.css'; 

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  // If you are using this, ensure it is updated appropriately.

  useEffect(() => {
    const fetchProducts = async () => {
      let q = collection(db, "Products");
      if (searchTerm) {
        q = query(q, where("product_name", "==", searchTerm));
      }
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(product => product.quantity > 0);  // Filter out products with zero quantity

      setItems(productList);
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="home">
      {items.map(item => (
        <Card 
          key={item.id}
          id={item.id}
          name={item.product_name}
          image={item.imageUrl}
          price={`$${item.price}`}
        />
      ))}
      <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Home;
