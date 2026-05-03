import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCwU5VKtuxWzqMVtjN3aqQ0efzoTijJ3EU',
  authDomain: 'imperium-bank-92acf.firebaseapp.com',
  projectId: 'imperium-bank-92acf',
  storageBucket: 'imperium-bank-92acf.firebasestorage.app',
  messagingSenderId: '5282696863',
  appId: '1:5282696863:web:103609b236e5d7dce51caa',
  databaseURL: 'https://imperium-bank-92acf-default-rtdb.europe-west1.firebasedatabase.app'
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth     = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
