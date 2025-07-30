import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDJKBnMKMtnMHMhl1i-mU5FlHzx5gsrL5s',
  authDomain: 'dobgo-a1b57.firebaseapp.com',
  projectId: 'dobgo-a1b57',
  storageBucket: 'dobgo-a1b57.appspot.com',
  messagingSenderId: '650435551793',
  appId: '1:650435551793:android:f0d4307606e8fb62c32b10',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);