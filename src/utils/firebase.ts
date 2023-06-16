import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { config } from './config';
 
   
// Initialize Firebase
const firebaseApp = initializeApp(config)

export const storeDb = getFirestore(firebaseApp)