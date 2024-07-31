import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQJa8ZDys0c-aQqJnof6NBY_i55HKODgw",
  authDomain: "todoproject-db21a.firebaseapp.com",
  projectId: "todoproject-db21a",
  storageBucket: "todoproject-db21a.appspot.com",
  messagingSenderId: "242929125839",
  appId: "1:242929125839:web:64daf9bb6f12a677b12aba"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseAuth, firestore };
