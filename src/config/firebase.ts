// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2vHSG1AOYdaakRjFcffoItRF_VkYzSCk",
  authDomain: "react-course-2b122.firebaseapp.com",
  projectId: "react-course-2b122",
  storageBucket: "react-course-2b122.appspot.com",
  messagingSenderId: "510421800551",
  appId: "1:510421800551:web:0582b2e55a3162fa0a66c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();