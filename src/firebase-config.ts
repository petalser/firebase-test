import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyD8zjrpDgUrqDH_Vq1fXrirfFNQQPBESGc",
    authDomain: "petalsertest.firebaseapp.com",
    projectId: "petalsertest",
    storageBucket: "petalsertest.appspot.com",
    messagingSenderId: "291660255689",
    appId: "1:291660255689:web:04054fafa26aebd17c1818"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();