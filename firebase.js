import fb from "firebase";

// We set up Firebase account
// We created a firestore database and authentication
// In settings: we open project settings to create app.
// This process provides us with a backend and database.
// We copy the config code and then npm install firebase
// We create this file firebase.js and paste the config code
const firebaseConfig = {
  apiKey: "AIzaSyD5aStPLDKYoSqjh5f_UQx3vieVX-irrB4",
  authDomain: "whatsapp-2-7e963.firebaseapp.com",
  projectId: "whatsapp-2-7e963",
  storageBucket: "whatsapp-2-7e963.appspot.com",
  messagingSenderId: "895012641014",
  appId: "1:895012641014:web:82cd89357ddb50076974d7",
};

// this connects us to our database which is noSql
// This conditional check wether we've already initialized our
// app or not. If not, initializeApp or else just go ahead and
// use the one that's already been initialized
// const app = !firebase.app.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();

const app = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();

const db = app.firestore();
const auth = app.auth();
// provider is who the account is signed with. google, github, facebook ...
const provider = new fb.auth.GoogleAuthProvider();

export { db, auth, provider };
