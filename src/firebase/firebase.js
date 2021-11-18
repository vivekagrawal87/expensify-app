import { initializeApp } from 'firebase/app';
import { getDatabase, 
  ref, 
  push, 
  onValue, 
  onChildRemoved, 
  onChildChanged, 
  onChildAdded } from "firebase/database";

import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

const app = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();

// Get a reference to the database service
const db = getDatabase(app);

export {googleAuthProvider, db as default};