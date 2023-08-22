// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBP9RFc0CqSUzcwdZ_rPn4MOnSJjJ3RJqw",
    authDomain: "replica-with-fire-auth.firebaseapp.com",
    projectId: "replica-with-fire-auth",
    storageBucket: "replica-with-fire-auth.appspot.com",
    messagingSenderId: "768848977451",
    appId: "1:768848977451:web:d4086bd7f1046bc137546e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;