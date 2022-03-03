import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAGdDeqZMXZ-vjvuDZ1xRube8KLj7I7zWQ",
  authDomain: "whatsapp-clone-7fefc.firebaseapp.com",
  projectId: "whatsapp-clone-7fefc",
  storageBucket: "whatsapp-clone-7fefc.appspot.com",
  messagingSenderId: "218044159643",
  appId: "1:218044159643:web:8a4cc82fc85cd40a58183e",
  measurementId: "G-Y6R0WL6R34"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
