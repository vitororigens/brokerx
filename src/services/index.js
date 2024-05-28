import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { firebase } from "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAk1NdgtSjDyfOKH9Ri1Dmg1rzGNUONVq8",
  authDomain: "brokerx-6f378.firebaseapp.com",
  projectId: "brokerx-6f378",
  storageBucket: "brokerx-6f378.appspot.com",
  messagingSenderId: "532703018467",
  appId: "1:532703018467:web:f0186fe1867f86b8d734d6",
  measurementId: "G-Z83Z8EBB1N"
};

const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app)
export const database = firebase.firestore()
