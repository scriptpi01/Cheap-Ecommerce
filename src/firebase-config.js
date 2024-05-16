// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhiC43Q_sObKvrw4NeGt1NyLNd6e07TVY",
  authDomain: "cheap-ecommerce.firebaseapp.com",
  projectId: "cheap-ecommerce",
  storageBucket: "cheap-ecommerce.appspot.com",
  messagingSenderId: "935346907226",
  appId: "1:935346907226:web:9346fa23fd1326f7d95063",
  measurementId: "G-LKYGZ933P2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };