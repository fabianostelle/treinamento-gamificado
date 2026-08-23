import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDZ3Uf2jElqGzKyzEsm5kQQkmfygIzGBzI",
  authDomain: "construpaly.firebaseapp.com",
  projectId: "construpaly",
  storageBucket: "construpaly.firebasestorage.app",
  messagingSenderId: "525216918938",
  appId: "1:525216918938:web:8381497da3a2f061a99e23",
  measurementId: "G-PCKBPPBYWY"

}

// Inicializa Firebase
const app = initializeApp(firebaseConfig);


// Autenticação
const auth = getAuth(app);


// Banco de dados Firestore
const db = getFirestore(app);


// Torna as variáveis disponíveis para o restante do projeto
export {
    auth,
    db,
    signInAnonymously,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    query,
    orderBy,
    limit   
};