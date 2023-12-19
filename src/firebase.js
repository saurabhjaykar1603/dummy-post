// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBD-a9JQnl3V3Ct8EECXrHuY6ZiSDz7L08",
  authDomain: "dummy-post-23cc2.firebaseapp.com",
  projectId: "dummy-post-23cc2",
  storageBucket: "dummy-post-23cc2.appspot.com",
  messagingSenderId: "317824872723",
  appId: "1:317824872723:web:2a629e10481885be1f6ae6",
  measurementId: "G-MHQXQF3VF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
