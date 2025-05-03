// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIuRRdhBotjAT4jrNoMthK9peR8LSycNw",
  authDomain: "expensetracker-4df28.firebaseapp.com",
  projectId: "expensetracker-4df28",
  storageBucket: "expensetracker-4df28.firebasestorage.app",
  messagingSenderId: "36409570532",
  appId: "1:36409570532:web:700fa4d5c7baccce2ce8f1",
  measurementId: "G-6W16D0C13W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, doc, setDoc, signInWithPopup, signOut };
