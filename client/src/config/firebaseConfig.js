// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG7ZcUbMn7ExVlIix3BBAvWbtE_8ctCtc",
  authDomain: "gfgsc-88d2f.firebaseapp.com",
  projectId: "gfgsc-88d2f",
  storageBucket: "gfgsc-88d2f.appspot.com",
  messagingSenderId: "699126970418",
  appId: "1:699126970418:web:70181d380f76b98350242b",
  measurementId: "G-3RH6G56GGT"
};

// Initialize Firebase
let app;
let analytics;
let auth;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization error:", error.message);
}

export { auth, analytics };