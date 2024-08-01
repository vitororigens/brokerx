import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyAk1NdgtSjDyfOKH9Ri1Dmg1rzGNUONVq8",
  authDomain: "brokerx-6f378.firebaseapp.com",
  projectId: "brokerx-6f378",
  storageBucket: "brokerx-6f378.appspot.com",
  messagingSenderId: "532703018467",
  appId: "1:532703018467:web:f0186fe1867f86b8d734d6",
  measurementId: "G-Z83Z8EBB1N"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); 
}

export const authFirebase = firebase.auth();
export const database = firebase.firestore();
export const storage = firebase.storage();
export const message = firebase.messaging
