import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLzotYnVHHpKNzaEaXQOh_ZZa5KFmfOYE",
  authDomain: "translato-f661a.firebaseapp.com",
  projectId: "translato-f661a",
  storageBucket: "translato-f661a.appspot.com",
  messagingSenderId: "404889878319",
  appId: "1:404889878319:web:12c45ce02dea7d4550abda",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
