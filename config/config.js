import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCKz9vmuf5bGISdodLE54It-K-Q4PZ6waw",
    authDomain: "myfirstproject-c03ed.firebaseapp.com",
    databaseURL: "https://myfirstproject-c03ed.firebaseio.com",
    projectId: "myfirstproject-c03ed",
    storageBucket: "",
    messagingSenderId: "718202027901",
    appId: "1:718202027901:web:361c23765e7ec458"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const f = firebase;
export const auth = firebase.auth;
export const database = firebase.database;
export const storage = firebase.storage;
