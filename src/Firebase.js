// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
//import "firebase/analytics";

// Add the Firebase products that you want to use
//import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyDf0AY6QGYa3xvsK9LK82iCcChXJCwqCzo",
  authDomain: "products-d64db.firebaseapp.com",
  databaseURL: "https://products-d64db.firebaseio.com",
  projectId: "products-d64db",
  storageBucket: "products-d64db.appspot.com",
  messagingSenderId: "765588370130",
  appId: "1:765588370130:web:ffdc9a9b15b211cd53730b",
  measurementId: "G-WT2675FFB1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase.analytics();
//firebase.auth();
//firebase.firestore();

export default firebase;
