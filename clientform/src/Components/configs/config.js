import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAtR4iWg6WIZ8sdDIA-if0hJQIImgnQbYw",
  authDomain: "webscrapper-e5be7.firebaseapp.com",
  databaseURL: "https://webscrapper-e5be7.firebaseio.com",
  projectId: "webscrapper-e5be7",
  storageBucket: "webscrapper-e5be7.appspot.com",
  messagingSenderId: "189473582277",
  appId: "1:189473582277:web:e020a33fdb07c9128a54ac",
  measurementId: "G-CQGML023SN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseStorage = firebase.storage();
export const config = firebaseConfig;
