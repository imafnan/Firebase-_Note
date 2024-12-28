import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC3i8DPzzBI7Q25knbkWVs0H8iwD2BQrdA",
  authDomain: "notesproject-451b4.firebaseapp.com",
  projectId: "notesproject-451b4",
  storageBucket: "notesproject-451b4.firebasestorage.app",
  messagingSenderId: "93429050519",
  appId: "1:93429050519:web:8fcb58361d80ad973c8dd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
