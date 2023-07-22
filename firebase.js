// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjziQPJ7sfvWZedlrZAg5UEHxEvcWoWI4",
  authDomain: "codetonic-chat-app.firebaseapp.com",
  projectId: "codetonic-chat-app",
  storageBucket: "codetonic-chat-app.appspot.com",
  messagingSenderId: "275322001056",
  appId: "1:275322001056:web:4057b301b401c6e156dbc5",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
