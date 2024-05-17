import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const AuthContext = createContext(); // Exporting AuthContext

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        let userFound = null;

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.password === password) {
                userFound = {
                    uid: doc.id, // Adding uid here
                    username: userData.username,
                    roles: userData.roles
                };
                setUser(userFound);
                localStorage.setItem('user', JSON.stringify(userFound));
            }
        });

        if (!userFound) {
            alert("Username or password is incorrect");
        }

        return userFound; // Returning user data including uid and roles
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
