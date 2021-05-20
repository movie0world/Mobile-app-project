import * as firebase from "firebase";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHFJBAfOpzhjIg3k4pIXXQUlNJ50xM2jk",
  authDomain: "ecom-641fd.firebaseapp.com",
  projectId: "ecom-641fd",
  storageBucket: "ecom-641fd.appspot.com",
  messagingSenderId: "999189686846",
  appId: "1:999189686846:web:5de306bf9e15946153bf6f",
  measurementId: "G-Z355V7F4M1",
};

export default firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
