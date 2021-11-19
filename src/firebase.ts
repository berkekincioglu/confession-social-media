import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';

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

firebase.initializeApp(firebaseConfig);

export default firebase;
