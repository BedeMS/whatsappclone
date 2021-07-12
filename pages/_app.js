import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "../pages/Login";

function MyApp({ Component, pageProps }) {
  // This piece of will check wether or not there is a user logged in or not,
  // if there is, user will be that value, if there isn't then user will be empty
  // making if a falsy value
  const [user] = useAuthState(auth);

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
