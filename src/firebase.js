// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfMeRzDNX9Bs6OdUnZpR3FZq2kdxZCdjU",
  authDomain: "fixer-finder-cfc7b.firebaseapp.com",
  projectId: "fixer-finder-cfc7b",
  storageBucket: "fixer-finder-cfc7b.appspot.com",
  messagingSenderId: "545132949703",
  appId: "1:545132949703:web:be212bb2b02d2636c7cee2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)