// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, Persistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEoeGfzTPKKLMBAGCu2UdC4vlgvhK4IdU",
  authDomain: "tvmaze-app-dfce7.firebaseapp.com",
  databaseURL: "https://tvmaze-app-dfce7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tvmaze-app-dfce7",
  storageBucket: "tvmaze-app-dfce7.appspot.com",
  messagingSenderId: "231187153217",
  appId: "1:231187153217:web:6d97179549425579ace1c0",
};

// Init di firebase//
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
