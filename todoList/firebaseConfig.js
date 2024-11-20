import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYMnKR8kL3vvW0lc-ZhMZJVZUjZ2vEitc",
  authDomain: "todolist-429d3.firebaseapp.com",
  projectId: "todolist-429d3",
  storageBucket: "todolist-429d3.firebasestorage.app",
  messagingSenderId: "255509064499",
  appId: "1:255509064499:web:4e067cd0bbaf7821206c46"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_STORAGE = getFirestore(FIREBASE_APP);