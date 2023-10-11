// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeigf-BnPrn_r8gmtNnZRCaXbumAPU1Os",
  authDomain: "sajt-1a3d8.firebaseapp.com",
  projectId: "sajt-1a3d8",
  storageBucket: "sajt-1a3d8.appspot.com",
  messagingSenderId: "918434247108",
  appId: "1:918434247108:web:dc2e7f543ffe6f4a5c3491",
  measurementId: "G-P5VL11FMC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);