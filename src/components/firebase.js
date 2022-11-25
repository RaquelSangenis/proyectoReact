import { initializeApp } from "firebase/app";
import {getAuth, getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB89DgZ8aCLa5tJN3KdoR3qiXTtKVoPPbE",
  authDomain: "reactproyect-57a8a.firebaseapp.com",
  projectId: "reactproyect-57a8a",
  storageBucket: "reactproyect-57a8a.appspot.com",
  messagingSenderId: "691685539189",
  appId: "1:691685539189:web:8db0ed04b3b30edbe3a73c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);