// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmi_4tkAZSWUCFwAQT0OGTP_nZQ5VXTE8",
  authDomain: "gfg-student-chapter-2d063.firebaseapp.com",
  projectId: "gfg-student-chapter-2d063",
  storageBucket: "gfg-student-chapter-2d063.appspot.com",
  messagingSenderId: "281222638031",
  appId: "1:281222638031:web:dab93c6ec59db8b74a0aba",
  measurementId: "G-N09ETJHZZ5"
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