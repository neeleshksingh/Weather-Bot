// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-marketplace-bfbae.firebaseapp.com",
  projectId: "real-estate-marketplace-bfbae",
  storageBucket: "real-estate-marketplace-bfbae.appspot.com",
  messagingSenderId: "718577371104",
  appId: "1:718577371104:web:6f8680e98b18b06018cd85"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);