import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: 'AIzaSyC8R_DWAVIxXbm7dKuvkt8EH5Or9ydDeNg',
  appId: '1:620647121506:web:4433647769e16a8b18073b',
  authDomain: 'library-mgt-52d98.firebaseapp.com',
  messagingSenderId: '620647121506',
  projectId: 'library-mgt-52d98',
  storageBucket: 'library-mgt-52d98.appspot.com',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
