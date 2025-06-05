import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKKa5-_fhxPIfrdUiMxC6345NXrXYoImg",
  authDomain: "project-js-5c5c2.firebaseapp.com",
  projectId: "project-js-5c5c2",
  storageBucket: "project-js-5c5c2.firebasestorage.app",
  messagingSenderId: "88508484731",
  appId: "1:88508484731:web:6b4f5e91c21c69ae2fa6de",
  measurementId: "G-NHYV9FQJS3",
};

// Initialize Firebase
const firebaseProject = initializeApp(firebaseConfig);
export const authentication = getAuth(firebaseProject);
export const db = getFirestore(firebaseProject)
