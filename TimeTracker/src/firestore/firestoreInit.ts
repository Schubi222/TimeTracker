import { initializeApp } from "firebase/app";
import firebaseConfig from "./../config/firebase"
import {getFirestore} from "firebase/firestore"

const firebaseApp = initializeApp(firebaseConfig);

export default getFirestore(firebaseApp)