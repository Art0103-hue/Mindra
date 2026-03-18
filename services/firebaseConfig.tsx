import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB6FPm9Y9MCxnkhV0h3G40Bo4pqOuERdjs",
  authDomain: "mindra-3ac9b.firebaseapp.com",
  databaseURL: "https://mindra-3ac9b-default-rtdb.firebaseio.com",
  projectId: "mindra-3ac9b",
  storageBucket: "mindra-3ac9b.firebasestorage.app",
  messagingSenderId: "1090642856272",
  appId: "1:1090642856272:web:e3b1de57b04ef7a5794455"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);