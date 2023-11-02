// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore'

import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAoA9N6hQeRv5nc8d-sW_rNl47dQ_Z9Ag',
  authDomain: 'newest-republic.firebaseapp.com',
  projectId: 'newest-republic',
  storageBucket: 'newest-republic.appspot.com',
  messagingSenderId: '261837809370',
  appId: '1:261837809370:web:a2fe26027714254550e7e3',
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
const app = !firebase.apps.length ? initializeApp(firebaseConfig) : firebase.app()

export default app