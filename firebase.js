import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKz4LhJcThTJ1ZowKYMV7rVlKwDhuXz3g",
  authDomain: "rolebased-test-1.firebaseapp.com",
  databaseURL: "https://rolebased-test-1-default-rtdb.firebaseio.com",
  projectId: "rolebased-test-1",
  storageBucket: "rolebased-test-1.firebasestorage.app",
  messagingSenderId: "951301430114",
  appId: "1:951301430114:web:17cae16a755c2cbc086a3b",
  measurementId: "G-CFC2EF9MQF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
