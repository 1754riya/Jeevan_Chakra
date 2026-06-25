import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsHshuYm3nBNisnarj5_f7SiY-qGGnD6Q",
  authDomain: "jeevan-chakkar.firebaseapp.com",
  projectId: "jeevan-chakkar",
  storageBucket: "jeevan-chakkar.firebasestorage.app",
  messagingSenderId: "269525505276",
  appId: "1:269525505276:web:1492ed8a78081d8fe23379",
  measurementId: "G-0F3ZC2RYEM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

