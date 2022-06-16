// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB1pJ-rPmo0ew2yaH1Oe3zB7p-RiNAHOxk",
  authDomain: "ticket-9c5fa.firebaseapp.com",
  projectId: "ticket-9c5fa",
  storageBucket: "ticket-9c5fa.appspot.com",
  messagingSenderId: "585936140456",
  appId: "1:585936140456:web:0efd5df1897c854ea42a9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
