// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlS2EzOrtNuZ5njsmb8-Cv4eaVO6ZHO98",
  authDomain: "g00bs-pick-em.firebaseapp.com",
  projectId: "g00bs-pick-em",
  storageBucket: "g00bs-pick-em.appspot.com",
  messagingSenderId: "474646632150",
  appId: "1:474646632150:web:0d4fcebb1bf39452939b77",
  measurementId: "G-JNBTQ1KJZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export the auth and db instances for use in other parts of your app
export { auth, db };
