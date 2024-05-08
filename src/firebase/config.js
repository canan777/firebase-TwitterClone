// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAn7wKXpeHUSfXaqFiOuKfuT_e5NGUR3Zk',
  authDomain: 'hs-twitter-3f8d1.firebaseapp.com',
  projectId: 'hs-twitter-3f8d1',
  storageBucket: 'hs-twitter-3f8d1.appspot.com',
  messagingSenderId: '21274166873',
  appId: '1:21274166873:web:286a76a789420f3ed21348',
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