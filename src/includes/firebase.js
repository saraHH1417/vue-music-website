import { initializeApp } from 'firebase/app';
import { 
  getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged,
  signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { 
  getFirestore, collection, doc, setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCjk90Xb0KSpYMnSBOTCmxp2HjmNva7RFs',
  authDomain: 'music-dfe9e.firebaseapp.com',
  projectId: 'music-dfe9e',
  storageBucket: 'music-dfe9e.appspot.com',
  appId: '1:143475068718:web:eaac1c50549ae476e534bf',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const usersCollection = collection(db, 'users');

// Initialize Firebase
export {
  firebaseApp,
  getAuth,
  firebaseAuth,
  createUserWithEmailAndPassword,
  usersCollection,
  onAuthStateChanged,
  doc,
  setDoc,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
};
