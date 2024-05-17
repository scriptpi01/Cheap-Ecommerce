import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../styles/MyAccount.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({
        firstname: '',
        surname: '',
        username: '',
        address: '',
        email: '',
        phoneNumber: ''
    });
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user) {
                try {
                    console.log("Fetching user info for UID:", user.uid);
                    const userRef = doc(db, "Users", user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        console.log("Fetched user info:", userDoc.data());
                        setUserInfo(userDoc.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user info:", error);
                    toast.error("Failed to fetch user information.");
                }
            }
        };

        fetchUserInfo();
    }, [user]);

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleUserInfoSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                console.log("Updating user info for UID:", user.uid);
                const userRef = doc(db, "Users", user.uid);
                await updateDoc(userRef, userInfo);
                toast.success('User info updated successfully');
                console.log('User info updated:', userInfo);
                window.location.reload();
            } catch (error) {
                console.error("Error updating user info:", error);
                toast.error('Failed to update user information.');
            }
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            console.log("New passwords do not match!");
            toast.error("New passwords do not match!");
            return;
        }

        if (user) {
            try {
                console.log("Updating password for UID:", user.uid);
                const userRef = doc(db, "Users", user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.password === passwords.oldPassword) {
                        await updateDoc(userRef, { password: passwords.newPassword });
                        toast.success('Password updated successfully');
                        console.log('Password updated successfully');
                        window.location.reload();
                    } else {
                        console.log("Old password is incorrect");
                        toast.error("Old password is incorrect");
                    }
                }
            } catch (error) {
                console.error("Error updating password:", error);
                toast.error('Failed to update password.');
            }
        }
    };

    return (
        <div className="account-container">
            <h1>My Account: {userInfo.username}</h1>

            <div className="user-info-container">
                <h2>Personal Information</h2>
                <form onSubmit={handleUserInfoSubmit}>
                    <input
                        type="text"
                        name="firstname"
                        value={userInfo.firstname}
                        onChange={handleUserInfoChange}
                        placeholder="First name"
                    />
                    <input
                        type="text"
                        name="surname"
                        value={userInfo.surname}
                        onChange={handleUserInfoChange}
                        placeholder="Surname"
                    />
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleUserInfoChange}
                        placeholder="Address"
                    />
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleUserInfoChange}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleUserInfoChange}
                        placeholder="Phone number"
                    />
                    <button type="submit" className="save-btn">Save Changes</button>
                </form>
            </div>

            <div className="password-container">
                <h2>Password Settings</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={handlePasswordChange}
                        placeholder="Old password"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="New password"
                    />
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={passwords.confirmNewPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                    />
                    <button type="submit" className="change-password-btn">Change Password</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MyAccount;
