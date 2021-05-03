import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5FNus8qQ8ue0JhBP99_0TDleX0bo3kRU",
  authDomain: "slack-chat-f168f.firebaseapp.com",
  projectId: "slack-chat-f168f",
  storageBucket: "slack-chat-f168f.appspot.com",
  messagingSenderId: "382019457738",
  appId: "1:382019457738:web:efe9fa4a9f80b565dbda33",
  measurementId: "G-C3X1N4P9DS",
};

var app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
