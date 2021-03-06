import { initializeApp } from 'firebase/app';
import { 
  getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged,
  signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import { 
  getFirestore, collection, doc, setDoc, addDoc, 
  getDocs, query, where, updateDoc, deleteDoc, getDoc, limit, orderBy, startAfter,
  enableIndexedDbPersistence,
} from 'firebase/firestore';
import { 
  getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject,
} from 'firebase/storage';

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
const firebaseStorage = getStorage();

// for enabling cache when user disconnects from internet
enableIndexedDbPersistence(db).catch((error) => {
  console.log(`Firebase cache has an error in it ${error.code}`);
});
const usersCollection = collection(db, 'users');
const songsCollection = collection(db, 'songs');
const commentsCollection = collection(db, 'comments');

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
  // related to storage 
  firebaseStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  songsCollection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteObject,
  deleteDoc,
  getDoc,
  limit,
  orderBy,
  startAfter,
  commentsCollection,
};
