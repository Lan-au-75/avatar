// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyByrm4gozLn3aorA8InTUFh_CfEgY2gLc4',
    authDomain: 'avatar-c087b.firebaseapp.com',
    projectId: 'avatar-c087b',
    storageBucket: 'avatar-c087b.appspot.com',
    messagingSenderId: '261466054268',
    appId: '1:261466054268:web:984ec95f805b3f8a4d33f9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
