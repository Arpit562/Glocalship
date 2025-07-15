// Import Firebase SDKs
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Optional
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDgxr64ebpPdvMCEqJgWKyXRgT75ieGqic",
  authDomain: "delivery-47401.firebaseapp.com",
  projectId: "delivery-47401",
  storageBucket: "delivery-47401.appspot.com", // ✅ corrected
  messagingSenderId: "732574402525",
  appId: "1:732574402525:web:9e34edc68676b7e80a1834",
  // measurementId: "G-EXPW4R4J19" // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Optional, causes ad blocker issue

// Exports
export const auth = getAuth(app);
export { onAuthStateChanged };
export const db = getFirestore(app);
export const storage = getStorage(app);
