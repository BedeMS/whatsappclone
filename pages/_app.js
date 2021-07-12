import { useEffect } from "react";
import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "../pages/login";
import Loading from "../components/Loading";
import firebase from "firebase";

function MyApp({ Component, pageProps }) {
  // This piece of will check wether or not there is a user logged in or not,
  // if there is, user will be that value, if there isn't then user will be empty
  // making if a falsy value
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      // This is where we store our users info. B/C firebase is noSql
      // we go into our collections (users), find the user doc
      // based on his/her id created by firebase then we are using set.
      // Set: lets us create these fields in the document if they haven't
      // been filled yet.
      // Difference bt Set and Update in db/firebase
      // https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
