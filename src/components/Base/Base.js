import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyDJzgfLrC7nOT_zsL80IWI8FDXFO4IfMTs",
  authDomain: "sohai-app.firebaseapp.com",
  projectId: "sohai-app",
  storageBucket: "sohai-app.appspot.com",
  messagingSenderId: "165057345651",
  appId: "1:165057345651:web:1e988faa4c891dd5c55206",
});
