import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, onChildRemoved, onChildChanged, onChildAdded } from "firebase/database";

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

// Get a reference to the database service
const db = getDatabase(app);

export {db as default};

// onChildRemoved(ref(db, 'expenses'), (snapshot) => {
//     console.log(snapshot.key ,snapshot.val());
// });

// onChildChanged(ref(db, 'expenses'), (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// onChildAdded(ref(db, 'expenses'), (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// push(ref(db, 'expenses'), {
//     description: 'House EMI',
//     note: '',
//     amount: 1500000,
//     createdAt: 208908768
// });

// push(ref(db, 'expenses'), {
//     description: 'Car Service',
//     note: 'Honda Car Service',
//     amount: 500000,
//     createdAt: 208908768
// });

// push(ref(db, 'expenses'), {
//     description: 'Electricity Bill',
//     note: '',
//     amount: 50000,
//     createdAt: 208908768
// });