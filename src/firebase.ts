import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB2GlvtaGq2mSnjRoQ3aKo4GNwDKHg1MyE',
  authDomain: 'confession-dfdf8.firebaseapp.com',
  databaseURL: 'https://confession-dfdf8-default-rtdb.firebaseio.com',
  projectId: 'confession-dfdf8',
  storageBucket: 'confession-dfdf8.appspot.com',
  messagingSenderId: '763112132247',
  appId: '1:763112132247:web:c7121c53bcdf80c32a63d2',
  measurementId: 'G-MDCWY1P7QS',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
