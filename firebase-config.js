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
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCe3J1eIoGzKyzEsm5kQQkmfyIzGBzI",
    authDomain: "construplay.firebaseapp.com",
    projectId: "construplay",
    storageBucket: "construplay.firebasestorage.app",
    messagingSenderId: "525216918938",
    appId: "1:525216918938:web:683147da3a2f061a99e23"
};


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
    updateDoc
};