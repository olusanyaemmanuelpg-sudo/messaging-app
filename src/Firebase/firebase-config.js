// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3qnzuXzfPmlyAgs9METnS0v90y2C94u8",
  authDomain: "deji-messaging.firebaseapp.com",
  projectId: "deji-messaging",
  storageBucket: "deji-messaging.firebasestorage.app",
  messagingSenderId: "866667929070",
  appId: "1:866667929070:web:d0f87b5be88a9c8569c2ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const Provider = new GoogleAuthProvider()