// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjyAWMtY-9_55Xc7HOcF8sKmr67g5TYag",
  authDomain: "appdemo-fotos.firebaseapp.com",
  projectId: "appdemo-fotos",
  storageBucket: "appdemo-fotos.firebasestorage.app",
  messagingSenderId: "400476620449",
  appId: "1:400476620449:web:d0a64f55f9a50d51c5d2e0",
  measurementId: "G-XXTT4RBMMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
