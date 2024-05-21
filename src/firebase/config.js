// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
 ,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth yapısnın referanısnı alma
export const auth = getAuth(app);

// google sağlaycısının referansını alma
export const provider = new GoogleAuthProvider();

// veritbanı referanısnı al
export const db = getFirestore(app);

// storage referansını al
export const storage = getStorage(app);
