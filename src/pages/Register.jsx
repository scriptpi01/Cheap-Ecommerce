import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config'; // Adjust the import path according to your project structure
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import '../styles/Register.css'; // Ensure the path is correct

const Register = () => {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    firstname: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    address: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const checkUsernameExists = async (username) => {
    const usersRef = collection(db, 'Users');
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if user exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const usernameExists = await checkUsernameExists(userInfo.username);
    if (usernameExists) {
      alert('Username already exists. Please choose another username.');
      setIsLoading(false);
      return;
    }

    try {
      const newUser = {
        username: userInfo.username,
        firstname: userInfo.firstname,
        surname: userInfo.surname,
        email: userInfo.email,
        password: userInfo.password, // Consider using Firebase Authentication for password handling
        roles: isSeller ? ['seller'] : ['buyer'],
        phoneNumber: userInfo.phoneNumber || '',
        address: userInfo.address || '',
        companyName: isSeller ? userInfo.companyName : '',
      };
      await addDoc(collection(db, 'Users'), newUser);
      navigate('/registration-success');
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error registering the user: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="role-switcher">
        <button className={`role-button ${!isSeller ? 'active' : ''}`} onClick={() => setIsSeller(false)}>Buyer</button>
        <button className={`role-button ${isSeller ? 'active' : ''}`} onClick={() => setIsSeller(true)}>Seller</button>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        {isSeller && <input type="text" name="companyName" value={userInfo.companyName} onChange={handleInputChange} placeholder="Company Name" />}
        <input type="text" name="username" value={userInfo.username} onChange={handleInputChange} placeholder="Username" required />
        <input type="text" name="firstname" value={userInfo.firstname} onChange={handleInputChange} placeholder="First Name" required />
        <input type="text" name="surname" value={userInfo.surname} onChange={handleInputChange} placeholder="Surname" required />
        <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} placeholder="Email" required />
        <input type="password" name="password" value={userInfo.password} onChange={handleInputChange} placeholder="Password" required />
        <input type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" required />
        {!isSeller && <input type="text" name="phoneNumber" value={userInfo.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" />}
        {!isSeller && <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} placeholder="Address" />}
        <button type="submit" className="register-button" disabled={isLoading}>{isSeller ? 'Register as Seller' : 'Register as Buyer'}</button>
      </form>
    </div>
  );
};

export default Register;