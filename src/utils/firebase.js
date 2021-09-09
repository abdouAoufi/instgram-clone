import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const fireBaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDVA1OgykgxPQDKM3p9a0j47m_gcRIS7lI",
  authDomain: "instgram-clonee.firebaseapp.com",
  projectId: "instgram-clonee",
  storageBucket: "instgram-clonee.appspot.com",
  messagingSenderId: "786564428559",
  appId: "1:786564428559:web:690599b6a3b0bbce75047a",
  measurementId: "G-Y1BVWXKGER",
});

const db = fireBaseApp.firestore();
const auth = fireBaseApp.auth();
const storage = firebase.storage();

export { db, auth, storage };
